import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DailyChallenge from './pages/DailyChallenge';
import FreePlay from './pages/FreePlay';
import ResultPage from './pages/ResultPage';
import Leaderboard from './pages/Leaderboard';
import './pages/styles.css';
import JsonLd from './json-ld';
import { gameSchema, websiteSchema } from './schemas';

function App() {
  return (
    <>
      <JsonLd schema={gameSchema} />
      <JsonLd schema={websiteSchema} />
      <Router>
        <nav className="navbar">
          <div className="nav-container">
            <span className="logo">
              <Link to="/">
                Guess The Watch
              </Link>
              </span>
            <div className="nav-links">
              <Link to="/">Free Play</Link>
              <Link to="/leaderboard">Leaderboard</Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<FreePlay />} />
          <Route path="/freeplay" element={<FreePlay />} />
          <Route path="/result/:resultId" element={<ResultPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;