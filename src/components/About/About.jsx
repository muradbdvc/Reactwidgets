import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const perPage = 20;

  const fetchCountries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
      if (!res.ok) throw Error('Failed to fetch countries');
      const data = await res.json();
      const mapped = data
        .filter((c) => c.name?.common)
        .map((c) => ({ name: c.name.common, code: c.cca2 }))
        .sort((a, b) => a.name.localeCompare(b.name));
      setTeams(mapped);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const filtered = teams.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (currentPage - 1) * perPage;
  const paginatedTeams = filtered.slice(start, start + perPage);

  return (
    <div className="about-page">
    <div className="about-hero">
        <div className="hero-content">
          <h1>Modern Web Widgets<br />Built with React</h1>
          <p>
            A collection of interactive mini-apps — Weather, Calculator, Pomodoro Timer,
            and Code Tester — crafted with React 19, Vite 8, and Tailwind CSS 4.
          </p>
          <div className="hero-buttons">
            <a href="/widgets" className="btn-primary">Explore Widgets</a>
            <a href="/contact" className="btn-secondary">Get in Touch</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="phone-mockup">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="screen-header">
                <span className="screen-dot" />
                <span className="screen-dot" />
                <span className="screen-dot" />
              </div>
              <div className="screen-body">
                <div className="screen-card" />
                <div className="screen-row">
                  <div className="screen-square" />
                  <div className="screen-square" />
                </div>
                <div className="screen-bar" />
                <div className="screen-circle" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="trusted-bar">
        <span className="trusted-label">Trusted by</span>
        <div className="trusted-logos">
          <span className="logo-placeholder">⚛️ React</span>
          <span className="logo-placeholder">⚡ Vite</span>
          <span className="logo-placeholder">🎨 Tailwind</span>
          <span className="logo-placeholder">📦 Node</span>
          <span className="logo-placeholder">☁️ Vercel</span>
        </div>
      </div>

      <div className="team-section">
        <h2>Countries</h2>
        <p className="team-subtitle">Search a country to browse its football players.</p>
        <input
          type="text"
          className="search-input"
          placeholder="Search country..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        />
        {error && <p className="error-msg">{error}</p>}
        {isLoading && <p className="loading-msg">Loading countries...</p>}
        <div className="team-grid">
          {paginatedTeams.map((item, i) => (
            <Link to={`/about/country/${encodeURIComponent(item.name)}`} className="team-card" key={item.code || i}>
              <div className="team-avatar">{(item.name || '?').charAt(0)}</div>
              <h3>{item.name}</h3>
              <span className="team-role">{item.code || ''}</span>
            </Link>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
            <span>{currentPage} / {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
}
