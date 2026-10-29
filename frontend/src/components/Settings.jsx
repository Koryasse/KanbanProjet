import { useState, useEffect } from "react";
function Settings({ onClose, closing, onClosed }) {

  // Démonte le panneau une fois l'animation de fermeture terminée
  function handleAnimationEnd(e) {
    if (closing && e.animationName === 'slideOutRight') {
      onClosed();
    }
  }

  return (
    <aside className={`settings-overlay${closing ? ' closing' : ''}`} onClick={onClose}>
      <aside className={`settings-panel${closing ? ' closing' : ''}`}
        onClick={e => e.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
      >
        <h2>Settings</h2>
        <button onClick={onClose}>Fermer</button>
      </aside>
    </aside>
  );
}

export default Settings;
