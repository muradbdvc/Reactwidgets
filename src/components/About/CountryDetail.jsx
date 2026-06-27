import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './About.css';

export default function CountryDetail() {
  const { name } = useParams();
  const [query, setQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const searchPlayers = async () => {
    const term = query.trim();
    if (!term) return;
    setIsLoading(true);
    setError(null);
    setSearched(true);
    try {
      const res = await fetch(`https://www.fotmob.com/api/searchData?term=${encodeURIComponent(term)}`);
      if (!res.ok) throw Error(`HTTP ${res.status}`);
      const data = await res.json();
      const found = data?.players || [];
      setPlayers(found);
      if (!found.length) setError('No players found.');
    } catch (err) {
      setError(err.message);
      setPlayers([]);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') searchPlayers();
  };

  return (
    <div className="about-page">
      <Link to="/about" className="back-link">← Back to Countries</Link>
      <h2 className="detail-title">{decodeURIComponent(name)}</h2>
      <p className="team-subtitle">Search for football players by name.</p>

      <div className="player-search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search player (e.g. Messi, Ronaldo)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="player-search-btn" onClick={searchPlayers} disabled={isLoading || !query.trim()}>
          {isLoading ? '...' : 'Search'}
        </button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      <div className="team-grid">
        {players.map((p) => (
          <div className="team-card" key={p.id}>
            {p.photo && <img src={`https://images.fotmob.com/image_resources/playerimages/${p.id}.png`} alt="" className="team-logo" onError={(e) => { e.target.style.display = 'none'; }} />}
            <h3>{p.name}</h3>
            <span className="team-role">{p.role || p.position || ''}</span>
            {p.team && <p>{p.team}</p>}
          </div>
        ))}
        {searched && !isLoading && !error && players.length === 0 && (
          <p className="error-msg" style={{ gridColumn: '1 / -1' }}>No players found. Try a different search.</p>
        )}
      </div>
    </div>
  );
}
