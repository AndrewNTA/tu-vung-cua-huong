import React, { useContext, useState } from 'react';
import { AppContext } from '../App';

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

const getFilterResult = (key = '', all = []) => {
  const formatedKey = key.toLowerCase();
  return all.filter((w) => {
    const englishText = w.englishText.toLowerCase();
    return englishText.includes(formatedKey);
  });
};

export const Search = () => {
  const { words } = useContext(AppContext);
  const [filterResult, setFilterResult] = useState(null);

  const handleSearch = debounce((e) => {
    const searchKey = e.target.value;
    if (!searchKey) {
      setFilterResult(null);
      return;
    }
    const filtered = getFilterResult(searchKey, words);
    setFilterResult(filtered);
  }, 300);

  return (
    <div className="adr-search-container">
      <input
        className="adr-search-input"
        type="text"
        id="search-input"
        name="search-input"
        onChange={handleSearch}
      />
      {filterResult && (
        <div className="adr-search-result">
          {filterResult.map((i) => {
            return (
              <div key={i.id} className="adr-search-item">
                {i.englishText}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
