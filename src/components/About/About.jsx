import React, { useEffect, useState } from 'react';
import './About.css';

const loadingMessage = "Loading data...";

export default function About() {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  const totalPages = Math.ceil(teams.length / perPage);
  const start = (currentPage - 1) * perPage;
  const paginatedTeams = teams.slice(start, start + perPage);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("x-apisports-key", "4fe9e0ce8cd2912c85a042d463687969");
    const requestOptions = { method: 'GET', headers: myHeaders, redirect: 'follow' };

    fetch("https://v3.football.api-sports.io/countries", requestOptions)
      .then((res) => {
        if(!res.ok){
          throw Error("fetching error")
        }
        return res.json()
      })
      .then((data) => {
        if (data?.response) {
          setTeams(data.response);
          setCurrentPage(1);
        }
        setIsLoading(false)
        setError(null)
      })
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      });
  }, []);
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
        <h2>Teams</h2>
        <p className="team-subtitle">Data fetched via useEffect on page load.</p>
        <div className="team-grid">
          {error && <p>{error} </p> }
          {isLoading && loadingMessage }
          {teams && paginatedTeams.map((item, i) => (
            <div className="team-card" key={item.code || i}>
              <div className="team-avatar">{(item.name || '?').charAt(0)}</div>
              <h3>{item.name || 'Unknown'}</h3>
              <span className="team-role">{item.code || ''}</span>
            </div>
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
