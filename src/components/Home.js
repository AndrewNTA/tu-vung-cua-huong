import React, { useContext, useState } from 'react';
import './styles.css';
import { Menu } from './Menu';
import { AppContext } from '../App';

export function Home() {
  const [index, setIndex] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const { words } = useContext(AppContext);

  const goNext = () => {
    setIndex(() => index + 1);
    setIsShow(false);
  };

  const goBack = () => {
    setIndex(() => index - 1);
    setIsShow(false);
  };

  const showText = () => {
    setIsShow(true);
  };

  if (!Boolean(words) || !words.length) {
    return null;
  }

  const currentWord = words[index];
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
          <div>{`Related words: ${currentWord.relatedWords}`}</div>
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
          Back
        </button>
        <button
          disabled={index === words.length - 1}
          onClick={goNext}
          className="adr-button"
        >
          Next
        </button>
      </div>
      <div className="adr-divider" />
      <div className="adr-row">
        <button className="adr-button btn-full" onClick={showText}>
          Xem nghĩa
        </button>
      </div>
      <div className="adr-row">
        <button className="adr-button btn-full">Đã thuộc</button>
      </div>
      <div className="adr-row">
        <button className="adr-button btn-full">Quan tâm</button>
      </div>
      <Menu />
    </div>
  );
}
