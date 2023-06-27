import React, { useState } from 'react';
import './App.css';
import { TWordDefinition } from './types';

import Definition from './Definition';



const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

function App() {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [wordDefinition, setWordDefinition] = useState<TWordDefinition | null>(null);
  
  const setWord = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentWord(e.target.value);
  };

  const searchWord = async (e: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const response = await fetch(BASE_URL + currentWord);
    const data = await response.json();
    setWordDefinition(data);
    console.log(data)
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
      {!!wordDefinition && <Definition wordDefinition={wordDefinition} />}
    </div>
  );
}

export default App;
