import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import './styles.css';
import { AppContext, INTERESTED_TAB, REMEMBERED_TAB } from '../App';
import { gql, useMutation } from '@apollo/client';

const UPDATE_IS_REMEMBERED = gql`
  mutation UpdateIsRemembered($id: ID!, $isRemembered: Boolean!) {
    updateWord(where: { id: $id }, data: { isRemembered: $isRemembered }) {
      id
      isRemembered
    }
  }
`;

const UPDATE_IS_INTERESTED = gql`
  mutation UpdateIsInterested($id: ID!, $isInterested: Boolean!) {
    updateWord(where: { id: $id }, data: { isInterested: $isInterested }) {
      id
      isInterested
    }
  }
`;

const PUBLISH_WORD = gql`
  mutation PublishWord($id: ID!) {
    publishWord(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

export function Home() {
  const [index, setIndex] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);
  const { words, tab } = useContext(AppContext);
  const [
    updateIsRemembered,
    { data: dataRemembered, loading: loadingRemembered },
  ] = useMutation(UPDATE_IS_REMEMBERED);
  const [
    updateIsInterested,
    { data: dataInterested, loading: loadingInterested },
  ] = useMutation(UPDATE_IS_INTERESTED);
  const [publishWord] = useMutation(PUBLISH_WORD);

  const goNext = () => {
    setIndex(() => index + 1);
    setIsShow(false);
  };

  const goBack = () => {
    setIndex(() => index - 1);
    setIsShow(false);
  };

  const handleShow = () => {
    setIsShow((isShow) => !isShow);
  };

  const getWordList = useCallback(() => {
    if (tab === REMEMBERED_TAB) {
      return words.filter((w) => w.isRemembered);
    }
    if (tab === INTERESTED_TAB) {
      return words.filter((w) => w.isInterested);
    }
    return words;
  }, [tab, words]);

  const filterWords = useMemo(() => getWordList(), [getWordList]);

  useEffect(() => {
    setCurrentWord(filterWords[index]);
  }, [filterWords, index]);

  useEffect(() => {
    if (
      Boolean(dataRemembered) &&
      dataRemembered?.updateWord?.id === currentWord.id
    ) {
      setCurrentWord({
        ...currentWord,
        isRemembered: dataRemembered?.updateWord?.isRemembered,
      });
    }
    if (
      Boolean(dataInterested) &&
      dataInterested?.updateWord?.id === currentWord.id
    ) {
      setCurrentWord({
        ...currentWord,
        isInterested: dataInterested?.updateWord?.isInterested,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInterested, dataRemembered]);

  if (!Boolean(filterWords) || !filterWords.length || !currentWord) {
    return <p className="adr-center">Không có từ nào!!!</p>;
  }

  const primaryText = isShow
    ? currentWord.vietnamText
    : currentWord.englishText;
  const exampleList = isShow
    ? currentWord.vietnamExample
    : currentWord.englishExample;

  const handleRemember = () => {
    updateIsRemembered({
      variables: {
        id: currentWord.id,
        isRemembered: !currentWord.isRemembered,
      },
    });
    publishWord({
      variables: { id: currentWord.id },
    });
  };

  const handleInterest = () => {
    updateIsInterested({
      variables: {
        id: currentWord.id,
        isInterested: !currentWord.isInterested,
      },
    });
    publishWord({
      variables: { id: currentWord.id },
    });
  };

  return (
    <div className="home-container">
      <div className="adr-card">
        <div className="adr-primary-text">{primaryText}</div>
        <div>{`(${currentWord.wordType}) ${currentWord.pronounce}`}</div>
        {currentWord.relatedWords && (
          <div>{`Từ liên quan: ${currentWord.relatedWords}`}</div>
        )}
        <div>
          {exampleList && exampleList.length && (
            <ul className="adr-ul">
              {exampleList.map((exampleText) => (
                <li key={exampleText}>
                  <div>{exampleText}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="adr-button-group">
        <button
          disabled={index === 0}
          onClick={goBack}
          className="adr-button btn-outline"
        >
          Trước
        </button>
        <div className="adr-index">{`${index + 1} / ${words.length}`}</div>
        <button
          disabled={index === words.length - 1}
          onClick={goNext}
          className="adr-button"
        >
          Sau
        </button>
      </div>
      <div className="adr-divider" />
      <div className="adr-row">
        <button className="adr-button btn-full" onClick={handleShow}>
          {isShow ? 'Xem tiếng Anh' : 'Xem tiếng Việt'}
        </button>
      </div>
      <div className="adr-row">
        <button
          className="adr-button btn-full"
          onClick={handleRemember}
          disabled={loadingRemembered}
        >
          {currentWord.isRemembered ? 'Bỏ đã thuộc' : 'Đã thuộc'}
        </button>
      </div>
      <div className="adr-row">
        <button
          className="adr-button btn-full"
          onClick={handleInterest}
          disabled={loadingInterested}
        >
          {currentWord.isInterested ? 'Bỏ quan tâm' : 'Quan tâm'}
        </button>
      </div>
    </div>
  );
}
