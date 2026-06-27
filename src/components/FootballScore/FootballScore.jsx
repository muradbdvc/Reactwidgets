import React, { useEffect, useState } from 'react';
import './FootballScore.css';

export default function FootballScore() {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const isWorldCup = (m) => {
    const c = (m.competition || '').toLowerCase();
    return c.includes('world cup') || c.includes('fifa world');
  };

  const fetchScores = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('https://sportscore.com/api/widget/matches/?sport=football&limit=50');
      if (!res.ok) throw Error(`HTTP ${res.status}`);
      const data = await res.json();
      const wc = (data?.matches || []).filter(isWorldCup);
      if (wc.length) setMatches(wc);
      else throw Error('No World Cup fixtures found');
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const statusLabel = (m) => {
    if (m.status === 'live') return m.time ? `${m.time}'` : 'LIVE';
    if (m.status === 'finished') return 'FT';
    if (m.status === 'scheduled' || m.status === 'pending') {
      if (m.time) {
        const d = new Date(m.time);
        return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      }
      return 'Scheduled';
    }
    return m.status_text || m.status || '';
  };

  const isLive = (m) => m.status === 'live';

  const grouped = matches.reduce((acc, m) => {
    const name = m.competition || 'Other';
    if (!acc[name]) acc[name] = { logo: m.competition_logo, matches: [] };
    acc[name].matches.push(m);
    return acc;
  }, {});

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const liveMatches = matches.filter(isLive);
  const completedMatches = matches.filter((m) => !isLive(m));

  const groupByDateAndLeague = (list) => {
    const map = {};
    list.forEach((m) => {
      const dateKey = m.time ? m.time.split('T')[0] : 'unknown';
      const leagueName = m.competition || 'Other';
      const key = `${dateKey}||${leagueName}`;
      if (!map[key]) {
        map[key] = { date: dateKey, league: leagueName, logo: m.competition_logo, matches: [] };
      }
      map[key].matches.push(m);
    });
    return Object.values(map).sort((a, b) => b.date.localeCompare(a.date) || a.league.localeCompare(b.league));
  };

  const liveGroups = liveMatches.length ? [{ date: 'LIVE', league: null, logo: null, matches: liveMatches }] : [];
  const completedGroups = groupByDateAndLeague(completedMatches);
  const allGroups = [...liveGroups, ...completedGroups];

  return (
    <div className="football-widget">
      <div className="fw-header">
        <div className="fw-header-left">
          <h2 className="fw-title">🏆 World Cup</h2>
          {liveMatches.length > 0 && <span className="fw-live-badge">LIVE</span>}
        </div>
        <div className="fw-header-right">
          <a href="https://sportscore.com" target="_blank" rel="noopener noreferrer" className="fw-attribution">SportScore</a>
          <button className="fw-refresh" onClick={fetchScores} disabled={isLoading}>
            {isLoading ? '...' : '↻'}
          </button>
        </div>
      </div>

      {error && <p className="fw-error">{error}</p>}
      {isLoading && <p className="fw-loading">Loading fixtures...</p>}

      <div className="fw-list">
        {allGroups.map((group, gi) => (
          <div key={`${group.date}-${group.league || 'live'}-${gi}`} className="fw-league-group">
            <div className="fw-league-header">
              {group.date === 'LIVE' ? (
                <span className="fw-date-live">LIVE</span>
              ) : (
                <span className="fw-date-label">{formatDate(group.date)}</span>
              )}
              {group.league && (
                <>
                  {group.logo && <img src={group.logo} alt="" className="fw-league-logo" />}
                  <span className="fw-league-name">{group.league}</span>
                </>
              )}
            </div>
            {group.matches.map((m, mi) => {
              const live = isLive(m);
              const key = `${m.home}-${m.away}-${m.time || mi}`;
              return (
                <div className={`fw-card ${live ? 'fw-card-live' : ''}`} key={key}>
                  <div className="fw-row">
                    <div className="fw-team">
                      {m.home_logo && <img src={m.home_logo} alt="" className="fw-logo" />}
                      <span>{m.home}</span>
                    </div>
                    <div className="fw-score-wrap">
                      {live && <span className="fw-live-pulse">{statusLabel(m)}</span>}
                      <div className="fw-score">
                        <span className={`fw-score-num ${m.home_score != null && m.away_score != null && m.home_score > m.away_score ? 'fw-score-win' : ''}`}>
                          {m.home_score != null ? m.home_score : '-'}
                        </span>
                        <span className="fw-colon">:</span>
                        <span className={`fw-score-num ${m.home_score != null && m.away_score != null && m.away_score > m.home_score ? 'fw-score-win' : ''}`}>
                          {m.away_score != null ? m.away_score : '-'}
                        </span>
                      </div>
                      {!live && <span className="fw-status-tag">{statusLabel(m)}</span>}
                    </div>
                    <div className="fw-team fw-team-away">
                      <span>{m.away}</span>
                      {m.away_logo && <img src={m.away_logo} alt="" className="fw-logo" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
