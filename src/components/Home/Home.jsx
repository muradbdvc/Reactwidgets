import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-title">ReactWidgets</h1>
        <p className="hero-subtitle">
          A collection of interactive mini-apps built with React.<br />
          Weather, Calculator, Pomodoro Timer & more.
        </p>
        <button className="hero-btn" onClick={() => navigate('/widgets')}>
          Explore Widgets
        </button>
      </div>

      <div className="features">
        <div className="feature-card">
          <span className="feature-icon">🌤️</span>
          <h3>Weather</h3>
          <p>Real-time weather data for any city</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🧮</span>
          <h3>Calculator</h3>
          <p>Clean, modern calculator with all basics</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🍅</span>
          <h3>Pomodoro</h3>
          <p>Stay productive with focus sessions</p>
        </div>
      </div>
    </div>
  );
}
