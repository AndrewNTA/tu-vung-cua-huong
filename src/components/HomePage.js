import React, { useContext } from 'react';
import { Card } from './Card';
import { Search } from './Search';
import { AppContext } from '../App';

export function HomePage() {
  const { words } = useContext(AppContext);
  return (
    <div className="adr-page-container">
      <div className="adr-page-title">Home Page</div>
      <Search />
      <Card filterWords={words} />
    </div>
  );
}
