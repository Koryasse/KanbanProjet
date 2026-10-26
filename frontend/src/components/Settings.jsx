// Panneau des paramètres, affiché par-dessus la page en cours
function Settings({ onClose }) {
  return (
    <div className="settings-panel">
      <h2>Settings</h2>
      <button onClick={onClose}>Fermer</button>
    </div>
  );
}

export default Settings;
