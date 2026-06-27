import React, { useReducer, useEffect, useRef, useState } from 'react';
import './ScoreBoard.css';

const TEAMS = [
  { name: 'Mexico', code: 'mx' },
  { name: 'Canada', code: 'ca' },
  { name: 'Spain', code: 'es' },
  { name: 'Brazil', code: 'br' },
  { name: 'Germany', code: 'de' },
  { name: 'France', code: 'fr' },
  { name: 'Uruguay', code: 'uy' },
  { name: 'Italy', code: 'it' },
  { name: 'Argentina', code: 'ar' },
  { name: 'Australia', code: 'au' },
];

const INITIAL_MATCHES = [
  { id: 1, home: TEAMS[0], away: TEAMS[1], homeScore: 0, awayScore: 0, started: false, finished: false, startedAt: null },
  { id: 2, home: TEAMS[2], away: TEAMS[3], homeScore: 0, awayScore: 0, started: false, finished: false, startedAt: null },
  { id: 3, home: TEAMS[4], away: TEAMS[5], homeScore: 0, awayScore: 0, started: false, finished: false, startedAt: null },
  { id: 4, home: TEAMS[6], away: TEAMS[7], homeScore: 0, awayScore: 0, started: false, finished: false, startedAt: null },
  { id: 5, home: TEAMS[8], away: TEAMS[9], homeScore: 0, awayScore: 0, started: false, finished: false, startedAt: null },
];

function reducer(state, action) {
  switch (action.type) {
    case 'START_GAME': {
      const now = Date.now();
      return state.map((m) =>
        m.id === action.id ? { ...m, started: true, startedAt: now } : m
      );
    }
    case 'SCORE': {
      return state.map((m) => {
        if (m.id !== action.id || !m.started || m.finished) return m;
        if (action.team === 'home') return { ...m, homeScore: m.homeScore + 1 };
        if (action.team === 'away') return { ...m, awayScore: m.awayScore + 1 };
        return m;
      });
    }
    case 'FINISH_GAME': {
      return state.map((m) =>
        m.id === action.id ? { ...m, finished: true, started: false } : m
      );
    }
    case 'RESET': {
      return INITIAL_MATCHES.map((m) => ({ ...m }));
    }
    default:
      return state;
  }
}

export default function ScoreBoard() {
  const [matches, dispatch] = useReducer(reducer, INITIAL_MATCHES.map((m) => ({ ...m })));
  const [view, setView] = useState('current');
  const [countdown, setCountdown] = useState(5);
  const [phase, setPhase] = useState('countdown');
  const intervalsRef = useRef([]);

  useEffect(() => {
    if (phase !== 'countdown') return;
    if (countdown <= 0) {
      setPhase('playing');
      [1, 2, 3, 4, 5].forEach((id) => dispatch({ type: 'START_GAME', id }));
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdown]);

  useEffect(() => {
    if (phase !== 'playing') return;

    const scoreInt = setInterval(() => {
      const active = matches.filter((m) => m.started && !m.finished);
      if (active.length === 0) return;
      const match = active[Math.floor(Math.random() * active.length)];
      const team = Math.random() > 0.5 ? 'home' : 'away';
      dispatch({ type: 'SCORE', id: match.id, team });
    }, 2500);

    const finishInt = setInterval(() => {
      const active = matches.filter((m) => m.started && !m.finished);
      if (active.length === 0) return;
      const match = active[Math.floor(Math.random() * active.length)];
      dispatch({ type: 'FINISH_GAME', id: match.id });
    }, 8000);

    intervalsRef.current = [scoreInt, finishInt];
    return () => {
      intervalsRef.current.forEach(clearInterval);
    };
  }, [phase, matches]);

  const handleReset = () => {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
    dispatch({ type: 'RESET' });
    setCountdown(5);
    setPhase('countdown');
    setView('current');
  };

  const sortedSummary = [...matches]
    .filter((m) => m.finished)
    .sort((a, b) => {
      const totalA = a.homeScore + a.awayScore;
      const totalB = b.homeScore + b.awayScore;
      if (totalB !== totalA) return totalB - totalA;
      return (b.startedAt || 0) - (a.startedAt || 0);
    });

  const displayMatches = view === 'current' ? matches : sortedSummary;

  return (
    <div className="sb-widget">
      <div className="sb-header">
        <div className="sb-header-left">
          <h2 className="sb-title">🏆 FIFA World Cup</h2>
          <span className="sb-badge">Scoreboard</span>
        </div>
        <button className="sb-reset" onClick={handleReset}>↻</button>
      </div>

      <div className="sb-tabs">
        <button className={`sb-tab ${view === 'current' ? 'sb-tab-active' : ''}`} onClick={() => setView('current')}>Current Games</button>
        <button className={`sb-tab ${view === 'summary' ? 'sb-tab-active' : ''}`} onClick={() => setView('summary')}>Summary</button>
      </div>

      {phase === 'countdown' && (
        <div className="sb-countdown">
          <span className="sb-countdown-num">{countdown}</span>
          <span className="sb-countdown-label">Games starting in...</span>
        </div>
      )}

      <div className="sb-grid">
        {displayMatches.map((m) => (
          <div key={m.id} className={`sb-card ${m.started ? 'sb-card-live' : ''} ${m.finished ? 'sb-card-done' : ''}`}>
            <div className="sb-teams">
              <div className="sb-team">
                <img src={`https://flagcdn.com/${m.home.code}.svg`} alt={m.home.name} className="sb-flag" />
                <span>{m.home.name}</span>
              </div>
              <div className="sb-score-display">
                <span className="sb-score-num">{m.homeScore}</span>
                <span className="sb-score-divider">:</span>
                <span className="sb-score-num">{m.awayScore}</span>
              </div>
              <div className="sb-team sb-team-away">
                <span>{m.away.name}</span>
                <img src={`https://flagcdn.com/${m.away.code}.svg`} alt={m.away.name} className="sb-flag" />
              </div>
            </div>
            <div className="sb-status">
              {m.finished ? <span className="sb-status-ft">FT</span> :
               m.started ? <span className="sb-status-live">LIVE</span> :
               <span className="sb-status-wait">Waiting</span>}
            </div>
          </div>
        ))}
        {view === 'summary' && sortedSummary.length === 0 && (
          <p className="sb-empty">No finished games yet.</p>
        )}
      </div>
    </div>
  );
}
