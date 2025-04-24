import React, { useEffect, useState } from 'react';
import { getUserId } from '../utils/getUserId';
import './styles.css';

const zoomLevels = [
  'zoom0.jpg',
  'zoom1.jpg',
  'zoom2.jpg',
  'zoom3.jpg',
  'zoom4.jpg',
];

const DailyChallenge = () => {
  const [status, setStatus] = useState(null);
  const [guess, setGuess] = useState({ make: '', model: '' });
  const [guesses, setGuesses] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [score, setScore] = useState(0);

  const userId = getUserId();

  useEffect(() => {
    fetch(`http://localhost:5000/api/daily/${userId}`)
      .then(res => res.json())
      .then(setStatus);
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const guessText = `${guess.make.trim()} ${guess.model.trim()}`;
    const newGuesses = [...guesses, guessText];

    const isCorrect = guessText.toLowerCase() === "rolex submariner";
    const finalScore = isCorrect ? (10 - (newGuesses.length - 1) * 2) : 0;

    if (newGuesses.length >= 5 || isCorrect) {
      const res = await fetch('http://localhost:5000/api/daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          username: 'Anonymous',
          make: guess.make,
          model: guess.model,
          guesses: newGuesses.length,
          score: finalScore,
        }),
      });

      const result = await res.json();
      setSubmitted(true);
      setScore(finalScore);
      setStatus({ ...status, played: true, resultId: result.resultId });
    } else {
      setImageIndex((prev) => Math.min(prev + 1, zoomLevels.length - 1));
    }

    setGuesses(newGuesses);
    setGuess({ make: '', model: '' });
  };

  if (!status) return <p className="loading">Loading...</p>;
  if (status.played && !submitted) {
    return (
      <div className="container">
        <h2>You've already played today!</h2>
        <p>Score: {status.score}</p>
        <a href={`/result/${status.resultId}`} className="link">View your result</a>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Guess the Watch</h1>
      <div className="image-wrapper">
        <img
          src={`/images/${zoomLevels[imageIndex]}`}
          alt="Zoomed Watch"
          className="zoom-image"
        />
      </div>

      {!submitted ? (
        <>
          <form onSubmit={handleSubmit} className="guess-form">
            <input
              type="text"
              placeholder="Make"
              value={guess.make}
              onChange={(e) => setGuess({ ...guess, make: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Model"
              value={guess.model}
              onChange={(e) => setGuess({ ...guess, model: e.target.value })}
              required
            />
            <button type="submit" disabled={guesses.length >= 5}>Guess</button>
          </form>
          <p className="guess-count">Guesses left: {5 - guesses.length}</p>
          <ul className="guess-history">
            {guesses.map((g, i) => <li key={i}>{g}</li>)}
          </ul>
        </>
      ) : (
        <div className="game-over">
          <h2>Game Over</h2>
          <p>Score: {score}</p>
          <a href={`/result/${status.resultId}`} className="link">Share your result</a>
        </div>
      )}
    </div>
  );
};

export default DailyChallenge;