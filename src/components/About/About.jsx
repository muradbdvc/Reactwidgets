import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const COUNTRIES = [
  { name: 'Argentina', code: 'AR' },   { name: 'Australia', code: 'AU' }, { name: 'Bangladesh', code: 'BD' },
  { name: 'Austria', code: 'AT' }, { name: 'Belgium', code: 'BE' },
  { name: 'Brazil', code: 'BR' }, { name: 'Cameroon', code: 'CM' },
  { name: 'Canada', code: 'CA' }, { name: 'Chile', code: 'CL' },
  { name: 'China', code: 'CN' }, { name: 'Colombia', code: 'CO' },
  { name: 'Croatia', code: 'HR' }, { name: 'Czech Republic', code: 'CZ' },
  { name: 'Denmark', code: 'DK' }, { name: 'Ecuador', code: 'EC' },
  { name: 'Egypt', code: 'EG' }, { name: 'England', code: 'ENG' },
  { name: 'France', code: 'FR' }, { name: 'Germany', code: 'DE' },
  { name: 'Ghana', code: 'GH' }, { name: 'Greece', code: 'GR' },
  { name: 'Hungary', code: 'HU' }, { name: 'Iceland', code: 'IS' },
  { name: 'India', code: 'IN' }, { name: 'Iran', code: 'IR' },
  { name: 'Italy', code: 'IT' }, { name: 'Ivory Coast', code: 'CI' },
  { name: 'Jamaica', code: 'JM' }, { name: 'Japan', code: 'JP' },
  { name: 'Mexico', code: 'MX' }, { name: 'Morocco', code: 'MA' },
  { name: 'Netherlands', code: 'NL' }, { name: 'Nigeria', code: 'NG' },
  { name: 'Norway', code: 'NO' }, { name: 'Paraguay', code: 'PY' },
  { name: 'Peru', code: 'PE' }, { name: 'Poland', code: 'PL' },
  { name: 'Portugal', code: 'PT' }, { name: 'Romania', code: 'RO' },
  { name: 'Russia', code: 'RU' }, { name: 'Saudi Arabia', code: 'SA' },
  { name: 'Scotland', code: 'SCO' }, { name: 'Senegal', code: 'SN' },
  { name: 'Serbia', code: 'RS' }, { name: 'South Korea', code: 'KR' },
  { name: 'Spain', code: 'ES' }, { name: 'Sweden', code: 'SE' },
  { name: 'Switzerland', code: 'CH' }, { name: 'Turkey', code: 'TR' },
  { name: 'Ukraine', code: 'UA' }, { name: 'United States', code: 'US' },
  { name: 'Uruguay', code: 'UY' }, { name: 'Wales', code: 'WAL' },
];

export default function About() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const perPage = 20;

  const filtered = COUNTRIES.filter((t) =>
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
        <div className="team-grid">
          {paginatedTeams.map((item, i) => (
            <Link to={`/about/country/${encodeURIComponent(item.name)}`} className="team-card" key={item.code || i}>
              <img
                className="flag-img"
                src={`https://flagcdn.com/w80/${item.code === 'ENG' ? 'gb-eng' : item.code === 'SCO' ? 'gb-sct' : item.code === 'WAL' ? 'gb-wls' : item.code.toLowerCase()}.png`}
                alt={item.name}
                loading="lazy"
              />
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
