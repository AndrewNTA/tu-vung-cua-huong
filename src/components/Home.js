import React, { useContext, useState } from 'react';
import './styles.css';
import { AppContext, INTERESTED_TAB, REMEMBERED_TAB } from '../App';

export function Home() {
  const [index, setIndex] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const { words, tab } = useContext(AppContext);

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

  const getWordList = () => {
    if (tab === REMEMBERED_TAB) {
      return words.filter((w) => w.isRemembered);
    }
    if (tab === INTERESTED_TAB) {
      return words.filter((w) => w.isInterested);
    }
    return words;
  };

  const filterWords = getWordList();

  if (!Boolean(filterWords) || !filterWords.length) {
    return <p className='adr-center'>Không có từ nào!!!</p>;
  }

  const currentWord = filterWords[index];
  const primaryText = isShow
    ? currentWord.vietnamText
    : currentWord.englishText;
  const exampleList = isShow
    ? currentWord.vietnamExample
    : currentWord.englishExample;
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
          Sau
        </button>
        <div className="adr-index">{`${index + 1} / ${words.length}`}</div>
        <button
          disabled={index === words.length - 1}
          onClick={goNext}
          className="adr-button"
        >
          Trước
        </button>
      </div>
      <div className="adr-divider" />
      <div className="adr-row">
        <button className="adr-button btn-full" onClick={handleShow}>
          {isShow ? 'Xem tiếng Anh' : 'Xem tiếng Việt'}
        </button>
      </div>
      <div className="adr-row">
        <button className="adr-button btn-full">
          {currentWord.isRemembered ? 'Bỏ đã thuộc' : 'Đã thuộc'}
        </button>
      </div>
      <div className="adr-row">
        <button className="adr-button btn-full">
          {currentWord.isInterested ? 'Bỏ quan tâm' : 'Quan tâm'}
        </button>
      </div>
    </div>
  );
}
