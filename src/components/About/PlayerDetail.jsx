import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import playersData from '../../data/players.json';
import './About.css';

function findPlayer(country, playerId) {
  const key = country.toLowerCase();
  const list = playersData[key] || playersData._fallback || [];
  return list.find((p) => p.id === Number(playerId)) || null;
}

export default function PlayerDetail() {
  const { name, playerId } = useParams();
  const location = useLocation();
  const decoded = decodeURIComponent(name);

  const fromState = location.state?.player;
  const fromJson = findPlayer(decoded, playerId);
  const player = fromState || fromJson;

  if (!player) {
    return (
      <div className="about-page">
        <Link to={`/about/country/${name}`} className="back-link">← Back to {decoded}</Link>
        <p className="error-msg">Player not found.</p>
      </div>
    );
  }

  return (
    <div className="about-page">
      <Link to={`/about/country/${name}`} className="back-link">← Back to {decoded}</Link>
      <div className="player-profile">
        <div className="profile-card">
          <img
            src={player.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=667eea&color=fff&size=120&bold=true`}
            alt={player.name}
            className="profile-img"
          />
          <h1 className="profile-name">{player.name}</h1>
          <span className="profile-position">{player.position || 'Unknown Position'}</span>
        </div>
        <div className="profile-details">
          <div className="profile-stats">
            {player.number != null && (
              <div className="stat-box">
                <span className="stat-label">Jersey</span>
                <span className="stat-value">#{player.number}</span>
              </div>
            )}
            <div className="stat-box">
              <span className="stat-label">Age</span>
              <span className="stat-value">{player.age ?? '-'}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Country</span>
              <span className="stat-value">{decoded}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
