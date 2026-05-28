import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="nav">
      <h1 className="nav-title">ReactWidgets</h1>
      <button className={`nav-toggle ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
      <div className={`nav-links ${open ? 'open' : ''}`}>
        <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
        <NavLink to="/widgets" onClick={closeMenu}>Widgets</NavLink>
        <NavLink to="/portfolio" onClick={closeMenu}>Portfolio</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/blog" onClick={closeMenu}>Blog</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
      </div>
    </nav>
  );
}
