import React, { useEffect, useState } from 'react';
import './About.css';

export default function About() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("x-apisports-key", "4fe9e0ce8cd2912c85a042d463687969");
    const requestOptions = { method: 'GET', headers: myHeaders, redirect: 'follow' };

    fetch("https://v3.football.api-sports.io/teams", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data?.response) setTeams(data.response.slice(0, 4));
      })
      .catch((err) => console.log(err));
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
          {teams && teams.map((item, i) => (
            <div className="team-card" key={item.team?.id || i}>
              <div className="team-avatar">{(item.team?.name || '?').charAt(0)}</div>
              <h3>{item.team?.name || 'Unknown'}</h3>
              <span className="team-role">{item.team?.code || ''}</span>
              <p>{item.team?.country || ''}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
