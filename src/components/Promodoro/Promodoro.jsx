import React, { useState, useEffect, useRef } from 'react';

export default function PomodoroTimer() {
  // 1. State hooks for tracking configurations and time
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  
  // 2. Local Storage sync for tracking productivity
  const [completedSessions, setCompletedSessions] = useState(() => {
    const saved = localStorage.getItem('pomodoro_sessions');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Keep local storage updated whenever sessions change
  useEffect(() => {
    localStorage.setItem('pomodoro_sessions', completedSessions);
  }, [completedSessions]);

  // 3. Core Interval Engine
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer hit 00:00 - Switch cycles!
            handleCycleCompletion();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // CLEANUP: Always clear intervals to prevent memory leaks
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isBreak]);

  // 4. Handle Cycle Switching
  const handleCycleCompletion = () => {
    setIsActive(false); // Pause briefly
    if (!isBreak) {
      // Finished working -> Start break
      setIsBreak(true);
      setMinutes(5); 
      setSeconds(0);
      setCompletedSessions((prev) => prev + 1);
      alert("Time for a break! Great job.");
    } else {
      // Finished break -> Back to work
      setIsBreak(false);
      setMinutes(25);
      setSeconds(0);
      alert("Break's over! Back to focus mode.");
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  // Helper formatting to always display double digits (e.g., 05 instead of 5)
  const formatTime = (num) => String(num).padStart(2, '0');

  return (
    <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>{isBreak ? "Break Mode ☕" : "Focus Session 🎯"}</h2>
      
      <h1 style={{ fontSize: '4rem', margin: '1rem 0' }}>
        {formatTime(minutes)}:{formatTime(seconds)}
      </h1>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={toggleTimer} style={{ padding: '10px 20px' }}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer} style={{ padding: '10px 20px' }}>
          Reset
        </button>
      </div>

      <p style={{ marginTop: '2rem', opacity: 0.8 }}>
        Sessions completed today: <strong>{completedSessions}</strong>
      </p>
    </div>
  );
}