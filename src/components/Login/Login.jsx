import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    login(email.trim());
    navigate('/');
  };

  if (user) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-icon">✓</div>
          <h2>Logged In</h2>
          <p className="login-email">{user.email}</p>
          <button className="login-btn logout-btn" onClick={logout}>Log Out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Sign In</h2>
        <p className="login-subtitle">Enter any email &amp; password to continue.</p>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
}
