// ModeNavbar.js

import React from 'react';

  function ModeNavbar({mode}) {
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
      <nav className='navbar'>
        <div style={activeMode === 'Work' ? activeModeStyle : buttonStyle}> Work </div>
        <div style={activeMode === 'ShortBreak' ? activeModeStyle : buttonStyle}> ShortBreak </div>
        <div style={activeMode === 'LongBreak' ? activeModeStyle : buttonStyle}> LongBreak </div>
      </nav>
    );
  }

  export default ModeNavbar;
