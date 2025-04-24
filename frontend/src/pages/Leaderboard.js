import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);

  console.log('entries', entries)

  useEffect(() => {
    fetch('http://localhost:5000/api/daily/leaderboard')
      .then(res => res.json())
      .then(setEntries);
  }, []);

  return (
    <div>
      <h1>Daily Leaderboard</h1>
      <ul>
        {entries?.map((entry, index) => (
          <li key={index}>
            <strong>{entry.username || 'Anonymous'}</strong> — {entry.make} {entry.model} — {entry.score} pts ({entry.guesses} guesses)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;