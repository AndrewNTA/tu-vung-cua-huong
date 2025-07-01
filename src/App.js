import React, { useEffect, useRef, useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { Menu } from './components/Menu';
import './components/styles.css';
import { PracticePage } from './components/PracticePage';
import { HomePage } from './components/HomePage';
import { InterestedPage } from './components/InterestedPage';
import { RememberedPage } from './components/RememberedPage';

const WORDS_QUERY = gql`
  query Words($skip: Int) {
    words(first: 100, skip: $skip) {
      id
      englishText
      vietnamText
      englishExample
      vietnamExample
      wordType
      pronounce
      relatedWords
      isRemembered
      isInterested
    }
  }
`;

export const HOME_TAB = 'home';
export const REMEMBERED_TAB = 'remembered';
export const INTERESTED_TAB = 'interested';
export const PRACTICE_TAB = 'practice';

export const AppContext = React.createContext({
  words: null,
  tab: null,
  updateWords: () => {},
});

function App() {
  const skipNumber = useRef(null);
  // Flag to check should add to product list
  const flag = useRef(null);
  const [getWords, { data }] = useLazyQuery(WORDS_QUERY);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(HOME_TAB);

  useEffect(() => {
    if (!skipNumber.current && words.length === 0) {
      setLoading(true);
      getWords({
        variables: { skip: 0 },
      });
      flag.current = true;
      skipNumber.current = 100;
    }
    if (flag.current && data?.words.length) {
      setLoading(false);
      const newWords = [...words, ...data.words];
      setWords(newWords);
      flag.current = false;
    }
    if (Boolean(skipNumber.current) && data?.words.length === 100) {
      getWords({
        variables: {
          skip: skipNumber.current,
        },
      });
      skipNumber.current = skipNumber.current + 100;
      flag.current = true;
    }
  }, [data?.words, getWords, words]);

  const handleChangeTab = (selectedTab) => {
    setTab(selectedTab);
  };

  if (loading) {
    return <p className="adr-center">Loading...</p>;
  }

  const renderPage = () => {
    if (tab === PRACTICE_TAB) {
      return <PracticePage />;
    }
    if (tab === INTERESTED_TAB) {
      return <InterestedPage />;
    }
    if (tab === REMEMBERED_TAB) {
      return <RememberedPage />;
    }
    return <HomePage />;
  };

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          words,
          tab,
          updateWords: (newWords) => setWords(newWords),
        }}
      >
        {renderPage()}
        <Menu onChange={handleChangeTab} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
