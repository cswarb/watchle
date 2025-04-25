import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../Config';

const ResultPage = () => {
  const { resultId } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/daily/result/${resultId}`)
      .then(res => res.json())
      .then(setResult);
  }, [resultId]);

  if (!result) return <p>Loading result...</p>;

  return (
    <div className="container">
      <h1><strong>In today's round </strong> {result.username || 'Anonymous'} guessed:</h1>
      <p><strong>Watch:</strong> {result.make} {result.model}</p>
      <p><strong>Score:</strong> {result.score}</p>
      <p><strong>Guesses it took:</strong> {result.guesses}</p>
    </div>
  );
};

export default ResultPage;