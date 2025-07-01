import React, { useContext } from 'react';
import { Card } from './Card';
import { AppContext } from '../App';

export function RememberedPage() {
  const { words } = useContext(AppContext);
  const rememberedWords = words.filter((w) => w.isRemembered);
  return (
    <div className="adr-page-container">
      <div className="adr-page-title">Remembered Page</div>
      <Card filterWords={rememberedWords} />
    </div>
  );
}
