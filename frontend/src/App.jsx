import { useEffect, useState } from 'react'
import Footer from './components/Footer';
import Settings from './components/Settings';
import Home from './pages/Home';
import Focus from './pages/Focus';
import Tasks from './pages/Tasks';
import './App.css'

function App() {
  // Page affichée : 'Home', 'Focus' ou 'Tasks'
  const [activePage, setActivePage] = useState('Home');
  // Panneau des paramètres ouvert ou fermé
  const [showSettings, setShowSettings] = useState(false);
  // Plein écran activé ou non
  const [isFullscreen, setIsFullscreen] = useState(false);

  function toggleParameter() {
    setShowSettings(!showSettings);
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  // Met à jour isFullscreen aussi quand on quitte le plein écran avec la touche Échap
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  return (
    <>
      {activePage === 'Home' && <Home />}
      {activePage === 'Focus' && <Focus />}
      {activePage === 'Tasks' && <Tasks />}

      {showSettings && <Settings onClose={toggleParameter} />}

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
