import React, { useState, useEffect } from 'react';
import { getUserId, setUserId } from '../utils/getUserId';
import { API_BASE_URL } from '../Config';

const GamePlay = ({ watch, onGameEnd }) => {
  if (!watch) {
    return (
      <div className="error-message">
        <h2>Error getting watch</h2>
      </div>
    );
  }

  const [guesses, setGuesses] = useState(Array(5).fill('')); // Initialize with 5 empty placeholders
  const [imageIndex, setImageIndex] = useState(0);
  const [guess, setGuess] = useState({ make: '', model: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [name, setName] = useState(null);
  const [isMagnified, setIsMagnified] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const userId = getUserId();
  const MAX_GUESSES = 5;

  useEffect(() => {
    if (!userId) {
      fetch(`${API_BASE_URL}/api/user/create`, {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((newUser) => {
          setUserId(newUser.user.id);
          setIsLoggedIn(true);
          setCurrentUser(newUser.user);
          setName(newUser.user.name);
        });
    } else {
      fetch(`${API_BASE_URL}/api/user/id/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setIsLoggedIn(true);
          setCurrentUser(data.user);
          setUserId(data.user.id);
          setName(data.user.name);
        } else {
          fetch(`${API_BASE_URL}/api/user/create`, {
            method: 'POST',
          })
          .then((res) => res.json())
          .then((newUser) => {
            setUserId(newUser.user.id);
            setIsLoggedIn(true);
            setCurrentUser(newUser.user);
            setName(newUser.user.name);
          });
        }
      })
    }
  }, [userId]);

  const magnify = () => {
    setIsMagnified((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const guessText = `${guess.make.trim()} ${guess.model.trim()}`;
    const newGuesses = [...guesses];
    const currentGuessIndex = newGuesses.findIndex((g) => g === ''); // Find the first empty placeholder
    const correctAnswer = `${watch.watchMake} ${watch.watchModel}`.toLowerCase();

    if (currentGuessIndex !== -1) {
      newGuesses[currentGuessIndex] = guessText; // Replace the placeholder with the player's guess
    }

    if (guessText.toLowerCase() === correctAnswer) {
      setIsCorrect(true);
      const newScore = 10 - currentGuessIndex * 2;
      setScore(newScore);
      onGameEnd(true, newScore, name, currentGuessIndex + 1, watch); // Pass the name to the onGameEnd callback
    } else if (currentGuessIndex + 1 >= MAX_GUESSES) {
      setScore(0);
      onGameEnd(false, score, name, MAX_GUESSES, watch); // Pass the name to the onGameEnd callback
    } else {
      setImageIndex((prev) => Math.min(prev + 1, watch.imageSet.length - 1));
    }

    setGuesses(newGuesses);
    setGuess({ make: '', model: '' });
  };

  return (
    <div>
      <h1 className="title">Guess the watch - {name}</h1>
      <div className="image-wrapper">
        <img 
          onClick={magnify}
          className={`zoom-image ${isMagnified ? 'zoom-image--expanded' : ''}`}
          src={'/images/' + watch.date + '/' + watch.imageSet[imageIndex]} alt={`Zoom level ${imageIndex}`} />
      </div>
      {!isCorrect && guesses.filter((g) => g !== '').length < MAX_GUESSES ? (
        <form onSubmit={handleSubmit} className="guess-form">
          <input
            type="text"
            placeholder={isLoggedIn ? name : 'Enter your name'}
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoggedIn}
          />
          <input
            type="text"
            placeholder="Make"
            autoFocus="true"
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
          <button type="submit">Submit Guess</button>
        </form>
      ) : (
        <div className="game-over">
          <h2>{isCorrect ? 'Correct!' : 'Game Over'}</h2>
          <p>Score: {score}</p>
          <p>Player: {name}</p>
        </div>
      )}
      <ul className="guess-history">
        {guesses.map((g, i) => (
          <li key={i}>
            Guess {i + 1}: {g || <span className="placeholder">- -</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GamePlay;