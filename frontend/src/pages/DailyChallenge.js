import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GamePlay from './Gameplay';
import { getUserId } from '../utils/getUserId';
import WatchLoadingAnimation from './WatchLoadingAnimation';

const DailyChallenge = () => {
  const [dailyWatch, setDailyWatch] = useState(null);
  const [status, setStatus] = useState(null); // Track if the user has already played
  const [submitted, setSubmitted] = useState(false); // Track if the game is submitted
  const navigate = useNavigate();
  const userId = getUserId();

  useEffect(() => {
    fetch(`http://localhost:5000/api/daily/${userId}`)
      .then(res => res.json())
      .then(setStatus);
  }, [userId]);

  useEffect(() => {
    const fetchDailyChallenge = async () => {
      const res = await fetch('http://localhost:5000/api/daily');
      const data = await res.json();
      setDailyWatch(data);
    };

    fetchDailyChallenge();
  }, []);

  const handleGameEnd = (isCorrect, score, name, guesses) => {
    setSubmitted(true);

    const saveResult = async () => {
      const res = await fetch('http://localhost:5000/api/daily', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          username: name || 'Anonymous',
          make: dailyWatch.watchMake,
          model: dailyWatch.watchModel,
          guesses: guesses,
          score: score,
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
  };

  if (!dailyWatch) return (
    <div className="loading-container">
      <WatchLoadingAnimation />
    </div>
  );

  if (status?.played && !submitted) {
    return (
      <div className="container">
        <h2>You've already played today!</h2>
        <p>Score: {status.score}</p>
        <a href={`/result/${status.resultId}`} className="link">View your result</a>
        
        <h3>Want to play again?: <a href={`/freeplay`} className="link">Freeplay</a></h3>
      </div>
    );
  }

  return (
    <div className="container">
      <GamePlay watch={dailyWatch} onGameEnd={handleGameEnd} />
    </div>
  );
};

export default DailyChallenge;