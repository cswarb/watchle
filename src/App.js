import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DailyChallenge from './pages/DailyChallenge';
import FreePlay from './pages/FreePlay';
import ResultPage from './pages/ResultPage';
import Leaderboard from './pages/Leaderboard';
import './pages/styles.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="nav-container">
          <span className="logo">
            <Link to="/">
              GuessTheWatch
            </Link>
            </span>
          <div className="nav-links">
            <Link to="/">Daily</Link>
            <Link to="/freeplay">Free Play</Link>
            <Link to="/leaderboard">Leaderboard</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<DailyChallenge />} />
        <Route path="/freeplay" element={<FreePlay />} />
        <Route path="/result/:resultId" element={<ResultPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;