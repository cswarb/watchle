import React, { useEffect, useState } from 'react';
import './Leaderboard.css'; // Import the CSS file for styling

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);

  console.log('entries', entries);

  useEffect(() => {
    fetch('http://localhost:5000/api/daily/stats/leaderboard')
      .then(res => res.json())
      .then(setEntries);
  }, []);

  return (
    <div className="container">
      <h1>Daily Leaderboard</h1>

      {entries && entries.length < 1 ? (
        <p>No results</p>
      ) : (
        <ul className="leaderboard-list">
          {entries?.map((entry, index) => (
            <li key={index} className="leaderboard-item">
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