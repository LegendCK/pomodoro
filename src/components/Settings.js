import React, { useState } from 'react';

const Settings = ({ onUpdateSettings, onClose }) => {
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);

  const handleUpdateSettings = () => {
    onUpdateSettings({
      workDuration,
      shortBreakDuration,
      longBreakDuration,
    });
    onClose();
  };

  return (
    <div className="settings-container">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="settings-content">
            <h2>Settings</h2>
            <div className='timer-head'>
                <strong>Timer (mins)</strong>
            </div>
            <div className='user-input'>
            <label>Work Duration:</label>
            <input type="number" value={workDuration} onChange={(e) => setWorkDuration(parseInt(e.target.value))}/>
            </div>
            <div className='user-input'>
                <label>ShortBreak Duration:</label>
                <input type="number" value={shortBreakDuration} onChange={(e) => setShortBreakDuration(parseInt(e.target.value))}/>
            </div>
            <div className='user-input'>
                <label>LongBreak Duration:</label>
                <input type="number" value={longBreakDuration} onChange={(e) => setLongBreakDuration(parseInt(e.target.value))}/>
            </div>
        </div>             
        <div className="settings-buttons">
            <button className="apply-button" onClick={handleUpdateSettings}>Apply</button>
        </div>
    </div>
  );
};

export default Settings;