import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
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

export function Card({ filterWords, searchId, clearSearch }) {
  const [index, setIndex] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const { words, updateWords } = useContext(AppContext);

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

  const currentWord = searchId
    ? words.find((w) => w.id === searchId)
    : filterWords[index];

  useEffect(() => {
    if (
      Boolean(dataRemembered) &&
      Boolean(currentWord) &&
      dataRemembered?.updateWord?.id === currentWord.id
    ) {
      const newWords = words.map((w) => {
        if (w.id === currentWord.id) {
          return {
            ...currentWord,
            isRemembered: dataRemembered?.updateWord?.isRemembered,
          };
        }
        return w;
      });
      updateWords(newWords);
    }
    if (
      Boolean(dataInterested) &&
      Boolean(currentWord) &&
      dataInterested?.updateWord?.id === currentWord.id
    ) {
      const newWords = words.map((w) => {
        if (w.id === currentWord.id) {
          return {
            ...currentWord,
            isInterested: dataInterested?.updateWord?.isInterested,
          };
        }
        return w;
      });
      updateWords(newWords);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInterested, dataRemembered]);

  if (!Boolean(filterWords) || !filterWords.length || !currentWord) {
    return <p className="adr-center">No item found!!!</p>;
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
    <>
      {searchId && (
        <div className="adr-back-link" onClick={clearSearch}>
          Go back
        </div>
      )}
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
      {!searchId && (
        <div className="adr-button-group">
          <button
            disabled={index === 0}
            onClick={goBack}
            className="adr-button btn-outline"
          >
            Prev
          </button>
          <div className="adr-index">{`${index + 1} / ${
            filterWords.length
          }`}</div>
          <button
            disabled={index === filterWords.length - 1}
            onClick={goNext}
            className="adr-button"
          >
            Next
          </button>
        </div>
      )}
      <div className="adr-divider" />
      <div className="adr-row">
        <button className="adr-button btn-full" onClick={handleShow}>
          {isShow ? 'English' : 'Vietnamese'}
        </button>
      </div>
      <div className="adr-row">
        <button
          className="adr-button btn-full"
          onClick={handleRemember}
          disabled={loadingRemembered}
        >
          {currentWord.isRemembered ? 'Skip Remembered' : 'Remembered'}
        </button>
      </div>
      <div className="adr-row">
        <button
          className="adr-button btn-full"
          onClick={handleInterest}
          disabled={loadingInterested}
        >
          {currentWord.isInterested ? 'Skip Interested' : 'Interested'}
        </button>
      </div>
    </>
  );
}
