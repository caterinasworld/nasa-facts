import './APOD.css';

import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const key = process.env.REACT_APP_APOD_API_KEY;
const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`;

export default function APOD() {
  let [fact, setFact] = useState();
  let [isImage, setIsImage] = useState(false);
  let [isVideo, setIsVideo] = useState(false);
  let [error, setError] = useState();

  async function getFacts() {
    try {
      let response = await fetch(url);
      let data = await response.json();
      setFact(data);
      if (data.media_type === 'image') setIsImage(true);
      if (data.url.includes('youtube')) setIsVideo(true);
      console.log('second', fact, isImage, isVideo);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  useEffect(() => {
    getFacts();
  });

  return (
    <>
      {error && <div>Error: {error.message}</div>}
      {fact && (
        <>
          <h1 className='h1 center'>
            🎥 Astronomy Picture of the Day - {fact.title}
          </h1>
          <section className='content'>
            {isImage && (
              <figure className='figure'>
                <img src={fact.url} alt={fact.title} />
              </figure>
            )}
            {isVideo && (
              <div>
                <ReactPlayer className='react-player' url={fact.url} />
              </div>
            )}
            <section className='description'>
              <small className='photoDate'>
                {' '}
                📆 {new Date(fact.date).toDateString()}
              </small>
              <p className='explanation'>{fact.explanation}</p>
              {fact.copyright && <small>Copyright: {fact.copyright}</small>}
            </section>
          </section>
        </>
      )}
    </>
  );
}
