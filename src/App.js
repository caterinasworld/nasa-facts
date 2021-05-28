import './App.css';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const key = process.env.REACT_APP_API_KEY;

export default function App() {
  const [fact, setFact] = useState();
  const [isImage, setIsImage] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`;

  async function getFacts() {
    try {
      let response = await fetch(url);
      let data = await response.json();
      setFact(data);
      if (data.media_type === 'image') setIsImage(true);
      if (data.url.includes('youtube')) setIsVideo(true);
    } catch (error) {
      console.error('This is the error', error);
    }
  }

  useEffect(() => {
    getFacts();
  }, []);

  return (
    <div className='App'>
      {fact && (
        <main>
          <h1>{fact.title}</h1>
          <section className='content'>
            {isImage && (
              <figure className='figure'>
                <img src={fact.url} alt={fact.title} />
              </figure>
            )}
            {isVideo && (
              <div className='player-wrapper'>
                <ReactPlayer
                  className='react-player'
                  url={fact.url}
                  width='100%'
                  height='100%'
                />
              </div>
            )}
            <p className='description'>{fact.explanation}</p>
          </section>
        </main>
      )}
    </div>
  );
}
