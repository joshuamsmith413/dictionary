import React, { useState } from 'react';
import './App.css';
import { TWordDefinition, TError } from './types';

import Definition from './Definition';
import Error from './Error';



const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

function App() {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [wordDefinition, setWordDefinition] = useState<TWordDefinition | null>(null);
  const [error, setError] = useState<TError | null>(null)
  
  const setWord = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentWord(e.target.value);
  };

  const searchWord = async (e: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const response = await fetch(BASE_URL + currentWord);
    const data = await response.json();
    if (data?.title) {
        setError(data);
        setWordDefinition(null);
    } else {
        setWordDefinition(data);
        setError(null);
    }
  };

  return (
    <div className="App">
      <div className="form">
        <form onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => searchWord(e)}>
          <label htmlFor="word">Learn you some</label>
          <br/>
          <input type="text" id="word" value={currentWord} placeholder="enter a word" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWord(e)} />
          <input type="submit" />
        </form>
      </div>
      {(!!wordDefinition && !error) && <Definition wordDefinition={wordDefinition} />}
      {(!!error && !wordDefinition) && <Error error={error} />}
    </div>
  );
}

export default App;
