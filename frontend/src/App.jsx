import { useEffect, useState } from 'react'
import Footer from './components/Footer';
import Settings from './components/Settings';
import Home from './pages/Home';
import Focus from './pages/Focus';
import Tasks from './pages/Tasks';
import './App.css'

function App() {
  // Page affichée
  const [activePage, setActivePage] = useState('Home');

  // Panneau des paramètres
  const [showSettings, setShowSettings] = useState(false);
  const [settingsClosing, setSettingsClosing] = useState(false);

  // Plein écran
  const [isFullscreen, setIsFullscreen] = useState(false);

  function toggleParameter() {
    if (!showSettings) {
      setShowSettings(true);
    } else {
      // Lance l'animation de fermeture, le démontage se fait à la fin
      setSettingsClosing(true);
    }
  }

  function onSettingsClosed() {
    setShowSettings(false);
    setSettingsClosing(false);
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  // Met à jour isFullscreen
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  return (
    <>
      {/* Header */}
      <header>
        <h1>Dashr</h1>
        <p>"Time to shine"</p>
      </header>

      {/* Main */}
      {activePage === 'Home' && <Home />}
      {activePage === 'Focus' && <Focus />}
      {activePage === 'Tasks' && <Tasks />}

      {showSettings && <Settings onClose={toggleParameter} closing={settingsClosing} onClosed={onSettingsClosed} />}

      {/* Footer */}
      <Footer
        activePage={activePage}
        setActivePage={setActivePage}
        toggleParameter={toggleParameter}
        toggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
      />
    </>
  )
}

export default App
