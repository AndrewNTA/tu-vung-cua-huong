import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Card } from './Card';

export function InterestedPage() {
  const { words } = useContext(AppContext);
  const interestedWords = words.filter((w) => w.isInterested);
  return (
    <div className="adr-page-container">
      <div className="adr-page-title">Interested Page</div>
      <Card filterWords={interestedWords}/>
    </div>
  );
}
