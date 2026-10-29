import { useEffect, useState } from "react";
import restartIcon from '../assets/img/icons/restart.svg'

// Durées de chaque mode (en minutes)
const MODES = {
  rush: { label: "Rush", minutes: 25 },
  shortBreak: { label: "Short Break", minutes: 5 },
  longBreak: { label: "Long Break", minutes: 15 },
};

function Focus() {
  const [mode, setMode] = useState("rush");
  const [timeLeft, setTimeLeft] = useState(MODES.rush.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Décompte chaque seconde quand le timer tourne
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft(t => Math.max(t - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Arrête le timer une fois à zéro
  useEffect(() => {
    if (timeLeft === 0) setIsRunning(false);
  }, [timeLeft]);

  function changeMode(newMode) {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(MODES[newMode].minutes * 60);
  }

  function toggleTimer() {
    if (timeLeft === 0) return;
    setIsRunning(!isRunning);
  }

  function restartTimer() {
    setIsRunning(false);
    setTimeLeft(MODES[mode].minutes * 60);
  }

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <main>
      <div className="focus">
        <div className="focus-modes">
          {Object.entries(MODES).map(([key, { label }]) => (
            <button
              key={key}
              className={mode === key ? "active" : ""}
              onClick={() => changeMode(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <h1>{minutes}:{seconds}</h1>
        <div className="focus-controls">
          <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>
          <button onClick={restartTimer}><img src={restartIcon} alt="restart icon" /></button>
        </div>
      </div>
    </main>
  );
}

export default Focus;
