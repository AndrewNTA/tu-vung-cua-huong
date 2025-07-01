import React, { useContext, useState } from 'react';
import { Card } from './Card';
import { Search } from './Search';
import { AppContext } from '../App';

export function HomePage() {
  const { words } = useContext(AppContext);
  const [searchId, setSearchId] = useState(null);

  const clearSearch = () => {
    setSearchId(null);
  };
  return (
    <div className="adr-page-container">
      <div className="adr-page-title">Home Page</div>
      <Search onDetail={setSearchId} />
      <Card filterWords={words} searchId={searchId} clearSearch={clearSearch} />
    </div>
  );
}
