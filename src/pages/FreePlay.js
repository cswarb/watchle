import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GamePlay from './Gameplay';
import { API_BASE_URL } from '../Config';
import { getUserId } from '../utils/getUserId';

const FreePlay = () => {
  const [watches, setWatches] = useState([]);
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [status, setStatus] = useState(null); // Track if the user has already played
  const [gameResult, setGameResult] = useState(null); // Track the game result
  const [isMagnified, setIsMagnified] = useState(false); // State to track magnification
  const [submitted, setSubmitted] = useState(false)
  const userId = getUserId();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/daily/${userId}`)
      .then(res => res.json())
      .then(setStatus);
  }, [userId]);

  useEffect(() => {
    const fetchWatches = async () => {
      const res = await fetch(`${API_BASE_URL}/api/freeplay/watches`);
      const data = await res.json();
      setWatches(data);
    };

    fetchWatches();
  }, []);

  const handleSelectWatch = (watch) => {
    setSelectedWatch(watch);
    setGameResult(null); // Reset the game result when a new watch is selected
  };

  const handleGameEnd = (isCorrect, score, name, index, watch) => {
    setSubmitted(true);

    const saveResult = async () => {
      const res = await fetch(`${API_BASE_URL}/api/daily`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          username: name || 'Anonymous',
          make: watch.watchMake,
          model: watch.watchModel,
          guesses: index,
          score: score,
          watchId: watch.date
        }),
      });

      if (res.ok) {
        const resultData = await res.json();
        navigate(`/result/${resultData.resultId}`);
      } else {
        alert('Error saving result');
      }
    };

    saveResult();
    setGameResult({ isCorrect, score, date: watch.date, watch: watch }); // Set the game result
    setSelectedWatch(null); // Reset to allow replay
  };

  const magnify = () => {
    setIsMagnified((prev) => !prev);
  };

  return (
    <div className="container">
      {!selectedWatch ? (
        <>
          {gameResult && (
            <div
              className={`game-result ${gameResult.isCorrect ? 'success' : 'failure'}`}
            >
              <h2>{gameResult.isCorrect ? 'Congratulations!' : 'Game Over'}</h2>
              <p>The watch was a {gameResult.watch.watchMake} {gameResult.watch.watchModel}</p>
              <p>Your Score: {gameResult.score}</p>
              <img
                className={`watch-image ${isMagnified ? 'watch-image--expanded' : ''}`}
                onClick={magnify}
                src={'/images/' + gameResult.date + '/' + gameResult.watch.imageSet[gameResult.watch.imageSet.length - 1]}
                alt={`${gameResult.watch.watchMake} ${gameResult.watch.watchModel}`}
              />
            </div>
          )}

          <h2>Free Play Mode</h2>
          <h3>Select a Watch</h3>
          <ul className="watch-list">
            {watches.map((watch, index) => (
              <li
                key={index}
                className="watch-item"
                onClick={() => handleSelectWatch(watch)}
              >
                <img
                  className="watch-image watch-image--thumbnail"
                  src={'/images/' + watch.date + '/' + watch.imageSet[0]}
                  alt={`${watch.watchMake} ${watch.watchModel}`}
                />
                <div className="watch-details">
                  <p className="watch-make-model">
                    Watch #{index + 1} ({watch.date})
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        // {(status?.played && !submitted) && (
        //   <div className="container">
        //     <h2>You've already played today!</h2>
        //     <p>Score: {status.score}</p>
        //     <a href={`/result/${status.resultId}`} className="link">View your result</a>
        //   </div>
        // )}
        <GamePlay watch={selectedWatch} onGameEnd={handleGameEnd} />
      )}
    </div>
  );
};

export default FreePlay;