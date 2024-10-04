import React, { useState, useEffect, useCallback } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ModeNavbar from './ModeNavbar';

const Timer = ({ settings }) => {
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('Work');
  const [prevMode, setPrevMode] = useState('Work');
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    setTimeLeft(settings.workDuration * 60);
    setMode('Work');
    setPrevMode('Work');
    setSessionCount(0);
  }, [settings]);

  const getInitialTime = useCallback((mode) => {
    switch (mode) {
      case 'Work':
        return settings.workDuration * 60;
      case 'ShortBreak':
        return settings.shortBreakDuration * 60;
      case 'LongBreak':
        return settings.longBreakDuration * 60;
      default:
        return 5 * 60;
    }
  }, [settings]);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft === 0) {
            switch (mode) {
              case 'Work':
                setMode('ShortBreak');
                setTimeLeft(getInitialTime('ShortBreak'));
                break;
              case 'ShortBreak':
                if (prevMode === 'ShortBreak' && sessionCount === 4) {
                  setMode('LongBreak');
                  setTimeLeft(getInitialTime('LongBreak'));
                } else {
                  setMode('Work');
                  setTimeLeft(getInitialTime('Work'));
                }
                break;
              case 'LongBreak':
                setMode('Work');
                setTimeLeft(getInitialTime('Work'));
                pauseTimer();
                break;
              default:
                break;
            }
          } else {
            return prevTimeLeft - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, mode, prevMode, sessionCount, getInitialTime]);

  useEffect(() => {
    if (mode === 'Work' && prevMode === 'ShortBreak') {
      setSessionCount(prevSessionCount => prevSessionCount + 1);
    }
    setPrevMode(mode);
  }, [mode, prevMode]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setMode('Work');
    setPrevMode('Work');
    setSessionCount(0);
    setTimeLeft(settings.workDuration * 60);
    setIsActive(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const buttonStyle = {
    cursor: 'pointer',
    width: '80px',
    height: '30px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '25px',
    backgroundColor: '#247336',
    color: 'white',
    fontSize: '14px',
  };

  return (
    <div>
      <ModeNavbar mode={mode} setMode={setMode} />
      <br></br>
      <CircularProgressbarWithChildren
        value={(timeLeft / getInitialTime(mode)) * 100}
        strokeWidth={7.5}
        styles={buildStyles({
          pathTransitionDuration: 0.5,
          pathColor: '#1b7ce3',
          trailColor: '#eee',
        })}
      >
        <div className='blackText' style={{ fontSize: 50, marginTop: -5 }}>
          <strong>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</strong>
        </div>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={startTimer}>Start</button>
          <button style={buttonStyle} onClick={pauseTimer}>Pause</button>
          <button style={buttonStyle} onClick={resetTimer}>Reset</button>
        </div>
      </CircularProgressbarWithChildren>
      <br></br>
      <div className='blackText' style={{ fontSize: 20, fontWeight: 'bold' }}>Session : {sessionCount}</div >
    </div>
  );
};

export default Timer;
