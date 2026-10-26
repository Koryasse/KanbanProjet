import Dock from './Dock/Dock';
import HomeIcon from '../assets/img/icons/home.svg';
import TimerIcon from '../assets/img/icons/timer.svg';
import TasksIcon from '../assets/img/icons/tasks.svg';
import SettingsIcon from '../assets/img/icons/settings.svg';
import FullScreenIcon from '../assets/img/icons/fullscreen.svg';
import FullScreenExitIcon from '../assets/img/icons/fullscreenExit.svg';

function Footer({ activePage, setActivePage, toggleParameter, toggleFullscreen, isFullscreen }) {
  
  // Liens vers les pages de l'application
  const items = [
    {
      label: 'Home',
      className: activePage === 'Home' ? 'dock-item--active' : '',
      onClick: () => setActivePage('Home'),
      icon: <img src={HomeIcon} alt="Home" />,
    },
    {
      label: 'Focus',
      className: activePage === 'Focus' ? 'dock-item--active' : '',
      onClick: () => setActivePage('Focus'),
      icon: <img src={TimerIcon} alt="Focus" />,
    },
    {
      label: 'Tasks',
      className: activePage === 'Tasks' ? 'dock-item--active' : '',
      onClick: () => setActivePage('Tasks'),
      icon: <img src={TasksIcon} alt="Tasks" />,
    },
    {
      label: 'Settings',
      onClick: toggleParameter,
      icon: <img src={SettingsIcon} alt="Settings" />,
    },
    {
      label: isFullscreen ? 'Exit Fullscreen' : 'Fullscreen',
      onClick: toggleFullscreen,
      icon: <img src={isFullscreen ? FullScreenExitIcon : FullScreenIcon} alt="Fullscreen" />,
    },
  ];

  return (
    <footer>
      <Dock items={items} magnification={52} baseItemSize={44} panelHeight={52} />
    </footer>
  );
}

export default Footer;
