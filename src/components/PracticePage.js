import React, { useContext, useState } from 'react';
import { Card } from './Card';
import { AppContext } from '../App';

export function PracticePage() {
  const { words } = useContext(AppContext);
  const [startPractive, setStartPractive] = useState(false);

  const handleStartPractive = () => {
    setStartPractive(true);
  };
  if (!startPractive) {
    return <div>Hello</div>
  }
  return (
    <div className="adr-page-container">
      <div className="adr-page-title">Practice Page</div>
      <Card filterWords={words} />
    </div>
  );
}
