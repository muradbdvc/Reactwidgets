import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import playersData from '../../data/players.json';
import './About.css';

const API_KEY = "4fe9e0ce8cd2912c85a042d463687969";

export default function CountryDetail() {
  const { name } = useParams();
  const [allPlayers, setAllPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [usedMock, setUsedMock] = useState(false);
  const perPage = 20;

  const decoded = decodeURIComponent(name);

  useEffect(() => {
    setAllPlayers([]);
    setPage(1);
    setSearch('');
    setIsLoading(true);
    setError(null);
    setUsedMock(false);

    const myHeaders = new Headers();
    myHeaders.append("x-apisports-key", API_KEY);
    const opts = { method: 'GET', headers: myHeaders, redirect: 'follow' };

    const fetchSquad = async (teamId) => {
      const res = await fetch(`https://v3.football.api-sports.io/players/squads?team=${teamId}`, opts);
      if (!res.ok) throw Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data?.response?.[0]?.players || [];
    };

    (async () => {
      try {
        const res = await fetch(`https://v3.football.api-sports.io/teams?country=${decoded}`, opts);
        if (!res.ok) throw Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!data?.response?.length) throw Error('No teams found');
        const teams = data.response.slice(0, 10);
        const squadPromises = teams.map((t) => fetchSquad(t.team.id));
        const squads = await Promise.all(squadPromises);
        const merged = squads.flat();
        const seen = new Set();
        const unique = merged.filter((p) => {
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        });
        if (unique.length) setAllPlayers(unique);
        else throw Error('No players');
      } catch (err) {
        const key = decoded.toLowerCase();
        const mock = playersData[key] || playersData._fallback;
        setAllPlayers(mock);
        setUsedMock(true);
        setError(null);
      }
      setIsLoading(false);
    })();
  }, [decoded]);

  const filtered = allPlayers.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginatedPlayers = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="about-page">
      <Link to="/about" className="back-link">← Back to Countries</Link>
      <h2 className="detail-title">{decoded}</h2>
      <p className="team-subtitle">
        {allPlayers.length > 0
          ? `${allPlayers.length} players found. ${usedMock ? '(demo data)' : ''}`
          : 'Loading...'}
        {usedMock && <span className="mock-note"> — Use the search to filter by name.</span>}
        {!usedMock && allPlayers.length > 0 && <span> Use the search to filter by name.</span>}
      </p>

      {allPlayers.length > 0 && (
        <input
          type="text"
          className="search-input"
          placeholder="Filter players by name..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
      )}

      {error && !usedMock && <p className="error-msg">{error}</p>}
      {isLoading && <p className="loading-msg">Loading players...</p>}

      <div className="team-grid">
        {paginatedPlayers.map((item) => (
          <Link
            key={item.id}
            to={`/about/country/${encodeURIComponent(decoded)}/player/${item.id}`}
            state={{ player: item }}
            className="team-card"
          >
            <img
              src={item.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=667eea&color=fff&size=80&bold=true`}
              alt={item.name}
              className="team-img"
              onError={(e) => { if (!e.target.src.includes('ui-avatars')) e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=667eea&color=fff&size=80&bold=true`; }}
            />
            <h3>{item.name || 'Unknown'}</h3>
            <span className="team-role">{item.position || ''}</span>
            {item.number != null && <p>#{item.number} · Age {item.age || '-'}</p>}
            {item.number == null && <p>Age {item.age || '-'}</p>}
          </Link>
        ))}
        {!isLoading && !error && filtered.length === 0 && (
          <p className="error-msg" style={{ gridColumn: '1 / -1' }}>
            {allPlayers.length > 0 ? 'No players match your search.' : 'No players found.'}
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
          <span>{page} / {totalPages} ({filtered.length} players)</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}
