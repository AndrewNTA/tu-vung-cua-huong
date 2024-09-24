import React, { useEffect, useRef, useState } from 'react';
import { Home } from './components/Home';
import { useLazyQuery, gql } from '@apollo/client';

const WORDS_QUERY = gql`
  query Words($skip: Int) {
    words(first: 100, skip: $skip, orderBy: publishedAt_DESC) {
      id
      englishText
    }
  }
`;

export const AppContext = React.createContext({
  words: null,
});

function App() {
  const skipNumber = useRef(null);
  // Flag to check should add to product list
  const flag = useRef(null);
  const [getWords, { data }] = useLazyQuery(WORDS_QUERY);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);

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

  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <div className="App">
      <AppContext.Provider
        value={{
          words,
        }}
      >
        <Home />
      </AppContext.Provider>
    </div>
  );
}

export default App;
