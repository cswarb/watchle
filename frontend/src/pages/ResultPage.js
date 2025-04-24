import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ResultPage = () => {
  const { resultId } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/daily/result/${resultId}`)
      .then(res => res.json())
      .then(setResult);
  }, [resultId]);

  if (!result) return <p>Loading result...</p>;

  return (
    <div>
      <h1>{result.username || 'Anonymous'} guessed:</h1>
      <p>{result.make} {result.model}</p>
      <p>Score: {result.score}</p>
      <p>Guesses: {result.guesses}</p>
    </div>
  );
};

export default ResultPage;