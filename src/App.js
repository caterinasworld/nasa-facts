import './App.css';
import { useState, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player';

const key = process.env.REACT_APP_API_KEY;

export default function App() {
  const [fact, setFact] = useState();

  const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`;

  let getFacts = useCallback(async () => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      setFact(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getFacts();
  }, [getFacts]);

  return (
    <div className='App'>
      {fact && (
        <>
          <h1>{fact.title}</h1>
          <div className='player-wrapper'>
            <ReactPlayer
              className='react-player'
              url={fact.url}
              width='100%'
              height='100%'
            />
          </div>
          <p className='description'>{fact.explanation}</p>
        </>
      )}
    </div>
  );
}
