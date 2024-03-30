// ModeNavbar.js

import React from 'react';

  function ModeNavbar({mode}) {
    const containerStyle = {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      background: '#34623F',
      padding: '10px',
      borderRadius: '30px',
    };

    const buttonStyle = {
      background: '#418250',  
      padding: '8px 20px',
      borderRadius: '20px',
      border: 'none',
      color: '#fff',
      cursor: 'default',
      transition: 'background-color 0.3s ease',
    };
    const activeModeStyle = {
      ...buttonStyle,
      background: '#007bff', 
    };
    let activeMode;
    activeMode = (mode)
    return (
      <div style={containerStyle}>
        <div style={activeMode === 'Work' ? activeModeStyle : buttonStyle}> Work </div>
        <div style={activeMode === 'ShortBreak' ? activeModeStyle : buttonStyle}> ShortBreak </div>
        <div style={activeMode === 'LongBreak' ? activeModeStyle : buttonStyle}> LongBreak </div>
      </div>
    );
  }

  export default ModeNavbar;