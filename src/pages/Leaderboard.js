import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import { API_BASE_URL } from '../Config';
import { getUserId } from '../utils/getUserId';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const userId = getUserId();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/daily/stats/leaderboard`)
      .then(res => res.json())
      .then(setEntries);

    // Fetch current user data
    fetch(`${API_BASE_URL}/api/user/${userId}`)
      .then(res => res.json())
      .then(setCurrentUser);
  }, []);

  return (
    <div className="container">
      <h1>Daily Leaderboard</h1>

      {entries && entries.length < 1 ? (
        <p>No results</p>
      ) : (
        <ul className="leaderboard-list">
          {entries?.map((entry, index) => (
            <li
              key={index}
              className={`leaderboard-item ${currentUser?.username === entry.username ? 'highlight' : ''}`}
            >
              <span className="leaderboard-rank">{index + 1}.</span>
              <span className="leaderboard-username">{entry.username || 'Anonymous'}</span>
              <span className="leaderboard-details">
                {entry.make} {entry.model}
              </span>
              <span className="leaderboard-score">{entry.score} pts</span>
              <span className="leaderboard-guesses">({entry.guesses} guesses)</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;