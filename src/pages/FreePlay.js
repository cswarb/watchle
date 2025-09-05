import React, { useEffect, useState } from 'react';
import GamePlay from './Gameplay';
import { API_BASE_URL } from '../Config';

const FreePlay = () => {
  const [watches, setWatches] = useState([]);
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [gameResult, setGameResult] = useState(null); // Track the game result

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
    setGameResult({ isCorrect, score, date: watch.date, watch: watch }); // Set the game result
    setSelectedWatch(null); // Reset to allow replay
  };

  return (
    <div className="container">
      {!selectedWatch ? (
        <>
          {gameResult && (
            <div className={`game-result ${gameResult.isCorrect ? 'success' : 'failure'}`}>
              <h2>{gameResult.isCorrect ? 'Congratulations!' : 'Game Over'}</h2>
              <p>Your Score: {gameResult.score}</p>
              <img className="watch-image" src={'/images/' + gameResult.date + '/' + gameResult.watch.imageSet[gameResult.watch.imageSet[gameResult.watch.imageSet.length - 1]]} alt={`${gameResult.watch.watchMake} ${gameResult.watch.watchModel}`} />
            </div>
          )}

          <h2>Free Play Mode</h2>
          <h3>Select a Watch</h3>
          <ul className="watch-list">
            {watches.map((watch, index) => (
              <li key={index} className="watch-item" onClick={() => handleSelectWatch(watch)}>
                <img className="watch-image" src={'/images/' + watch.date + '/' + watch.imageSet[0]} alt={`${watch.watchMake} ${watch.watchModel}`} />
                <div className="watch-details">
                  <p className="watch-make-model">Watch #{index + 1} ({watch.date})</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <GamePlay watch={selectedWatch} onGameEnd={handleGameEnd} />
      )}
    </div>
  );
};

export default FreePlay;