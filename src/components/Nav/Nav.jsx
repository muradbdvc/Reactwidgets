import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext';
import './Nav.css';

const WIDGETS = [
  { to: '/widgets', label: 'All Widgets', icon: '🧩' },
  { to: '/widgets', label: 'Weather', icon: '🌤️', hash: 'weather' },
  { to: '/widgets', label: 'Calculator', icon: '🧮', hash: 'calculator' },
  { to: '/widgets', label: 'Pomodoro', icon: '⏱️', hash: 'pomodoro' },
  { to: '/widgets', label: 'Code Tester', icon: '💻', hash: 'code' },
  { to: '/widgets', label: 'Football Scores', icon: '⚽', hash: 'football' },
  { to: '/widgets', label: 'FIFA Scoreboard', icon: '🏆', hash: 'fifa' },
];

const PAGES = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/portfolio', label: 'Portfolio', icon: '💼' },
  { to: '/about', label: 'About', icon: 'ℹ️' },
  { to: '/blog', label: 'Blog', icon: '📝' },
  { to: '/contact', label: 'Contact', icon: '📧' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const { user } = useAuth();

  const closeMenu = () => {
    setOpen(false);
    setActiveMega(null);
  };

  return (
    <nav className="nav" onMouseLeave={() => setActiveMega(null)}>
      <NavLink to="/" end onClick={closeMenu}><h1 className="nav-title">ReactWidgets</h1></NavLink>
      <button className={`nav-toggle ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
      <div className={`nav-links ${open ? 'open' : ''}`}>
        <NavLink to="/" end onClick={closeMenu}>Home</NavLink>

        <div className="mega-trigger" onMouseEnter={() => setActiveMega('widgets')}>
          <span className="mega-trigger-link">Widgets ▾</span>
          <div className={`mega-dropdown ${activeMega === 'widgets' ? 'mega-open' : ''}`}>
            <div className="mega-grid mega-grid-widgets">
              {WIDGETS.map((w) => (
                <NavLink key={w.label} to={w.to} onClick={closeMenu} className="mega-item">
                  <span className="mega-icon">{w.icon}</span>
                  <span className="mega-label">{w.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="mega-trigger" onMouseEnter={() => setActiveMega('pages')}>
          <span className="mega-trigger-link">Pages ▾</span>
          <div className={`mega-dropdown mega-dropdown-sm ${activeMega === 'pages' ? 'mega-open' : ''}`}>
            <div className="mega-grid mega-grid-pages">
              {PAGES.map((p) => (
                <NavLink key={p.label} to={p.to} end={p.to === '/'} onClick={closeMenu} className="mega-item">
                  <span className="mega-icon">{p.icon}</span>
                  <span className="mega-label">{p.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <NavLink to="/login" onClick={closeMenu} className="nav-login">{user ? 'Account' : 'Sign In'}</NavLink>
      </div>
    </nav>
  );
}
