// App.js
import './App.css';
import Settings from './components/Settings';
import Timer from './components/Timer';
import { useState } from 'react';
function App() {
  const [settingsVisible, setSettingsVisible] = useState(false); // Define settingsVisible state
  const [settings, setSettings] = useState({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
  });

  const handleUpdateSettings = (newSettings) => {
    setSettings(newSettings);
    setSettingsVisible(false);
  };

  const handleSettingsClick = () => {
    setSettingsVisible(true);
  };

  const handleCloseSettings = () => {
    setSettingsVisible(false);
  };

  return (
    <main>
      <div className="App">
        <h1 className='blackText'>Pomodoro</h1>
        <Timer settings={settings} />
        <button className="settings-button" onClick={handleSettingsClick}><i class="fi fi-sr-settings"></i></button>
        {settingsVisible && <Settings settings={settings} onUpdateSettings={handleUpdateSettings} onClose={handleCloseSettings} />}
      </div>
    </main>
  );
}

export default App;
