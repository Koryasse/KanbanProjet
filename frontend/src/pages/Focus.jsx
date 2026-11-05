import { useEffect, useState } from "react";
import restartIcon from '../assets/img/icons/restart.svg'

// Durée de chaque mode (en secondes)
const DURATIONS = {
  rush: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

// Texte affiché sur chaque bouton
const LABELS = {
  rush: "Rush",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

function Focus() {
  const [mode, setMode] = useState("rush");
  const [timeLeft, setTimeLeft] = useState(DURATIONS.rush);
  const [isRunning, setIsRunning] = useState(false);

  // Toutes les secondes, on enlève 1 au temps restant
  useEffect(() => {
    if (!isRunning) return;

    // Arrivé à zéro : on arrête le timer
    if (timeLeft === 0) {
      setIsRunning(false);
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  // Change de mode et remet le timer au début
  function changeMode(newMode) {
    setMode(newMode);
    setTimeLeft(DURATIONS[newMode]);
    setIsRunning(false);
  }

  // Remet le timer du mode actuel au début
  function restartTimer() {
    setTimeLeft(DURATIONS[mode]);
    setIsRunning(false);
  }

  // Lance ou met en pause
  function toggleTimer() {
    if (timeLeft > 0) setIsRunning(!isRunning);
  }

  // Format "MM:SS"
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <main className="dashboard-main">
      <div className="focus-content">
        <div className="focus-modes">
          {Object.keys(DURATIONS).map((key) => (
            <button
              key={key}
              className={mode === key ? "btn active" : "btn"}
              onClick={() => changeMode(key)}
            >
              {LABELS[key]}
            </button>
          ))}
        </div>

        <h1>{minutes}:{seconds}</h1>

        <div className="focus-controls">
          <button className="btn" onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>
          <button className="restartBtn" onClick={restartTimer}>
            <img src={restartIcon} alt="restart icon" />
          </button>
        </div>
      </div>
    </main>
  );
}

export default Focus;
