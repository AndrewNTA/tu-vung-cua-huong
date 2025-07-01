import React, { useContext, useState } from 'react';
import { Card } from './Card';
import { AppContext } from '../App';

export function PracticePage() {
  const { words } = useContext(AppContext);
  const [practiceWords, setPractiveWords] = useState(null);

  const handleStartPractive = (start, end) => {
    const filterWords = words.slice(start, end);
    setPractiveWords(filterWords);
  };

  const handleGoBack = () => {
    setPractiveWords(null);
  };
  if (!practiceWords) {
    return (
      <div className="adr-page-container">
        <div className="adr-page-title">Practice Page</div>
        <div
          className="adr-practive-item"
          onClick={() => handleStartPractive(0, 30)}
        >
          From 1 to 30
        </div>
        <div
          className="adr-practive-item"
          onClick={() => handleStartPractive(30, 60)}
        >
          From 31 to 60
        </div>
        <div
          className="adr-practive-item"
          onClick={() => handleStartPractive(60, 90)}
        >
          From 61 to 90
        </div>
        <div
          className="adr-practive-item"
          onClick={() => handleStartPractive(90, 120)}
        >
          From 91 to 120
        </div>
        <div
          className="adr-practive-item"
          onClick={() => handleStartPractive(120, 150)}
        >
          From 121 to 150
        </div>
        <div
          className="adr-practive-item"
          onClick={() => handleStartPractive(150, 180)}
        >
          From 151 to 180
        </div>
        <div
          className="adr-practive-item"
          onClick={() => handleStartPractive(180, 210)}
        >
          From 181 to 210
        </div>
        <div
          className="adr-practive-item"
          onClick={() => handleStartPractive(210, 240)}
        >
          From 211 to 240
        </div>
        <div
          className="adr-practive-item"
          onClick={() => handleStartPractive(240, 270)}
        >
          From 241 to 270
        </div>
        <div
          className="adr-practive-item"
          onClick={() => handleStartPractive(270, 300)}
        >
          From 271 to 300
        </div>
      </div>
    );
  }
  return (
    <div className="adr-page-container">
      <div className="adr-page-title">Practice Page</div>
      <div className="adr-back-link" onClick={handleGoBack}>
        Back to practive dashboard
      </div>
      <Card filterWords={practiceWords} />
    </div>
  );
}
