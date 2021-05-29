import './APOD.css';

import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const key = process.env.REACT_APP_APOD_API_KEY;
const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`;

export default function APOD() {
  const [fact, setFact] = useState();
  const [isImage, setIsImage] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [error, setError] = useState();

  async function getFacts() {
    try {
      let response = await fetch(url);
      let data = await response.json();
      setFact(data);
      if (data.media_type === 'image') setIsImage(true);
      if (data.url.includes('youtube')) setIsVideo(true);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  useEffect(() => {
    getFacts();
  }, []);

  return (
    <>
      {error && <div>Error: {error.message}</div>}
      {fact && (
        <>
          <h1>NASA Astronomy Picture of the Day</h1>
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
            <section className='description'>
              <h2>📷 {fact.title}</h2>
              <small>{new Date(fact.date).toDateString()}</small>
              <p className='explanation'>{fact.explanation}</p>
              <small>Copyright: {fact.copyright}</small>
            </section>
          </section>
        </>
      )}
    </>
  );
}
