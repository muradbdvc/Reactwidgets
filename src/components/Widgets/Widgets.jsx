import React from 'react';
import Weather from '../Weather/Weather';
import Calculator from '../Calculator/Calculator';
import Promodoro from '../Promodoro/Promodoro';
import CodeTester from '../CodeTester/CodeTester';
import FootballScore from '../FootballScore/FootballScore';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import './Widgets.css';

export default function Widgets() {
  return (
    <div className="widgets-page">
      <h2>Widgets</h2>
      <p>Choose a widget below to interact with it.</p>
      <div className="widgets-grid">
        <Weather />
        <Calculator />
        <Promodoro />
        <CodeTester />
        <FootballScore />
        <ScoreBoard />
      </div>
    </div>
  );
}
