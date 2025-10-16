// components/common/LoadingSpinner/LoadingSpinner.jsx
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  text = 'در حال بارگذاری...',
  overlay = false,
  fullScreen = false 
}) => {
  const spinnerClass = `loading-spinner ${size} ${color} ${overlay ? 'overlay' : ''} ${fullScreen ? 'full-screen' : ''}`;

  if (fullScreen) {
    return (
      <div className="loading-spinner-fullscreen">
        <div className="spinner-container">
          <div className="spinner-circle">
            <div className="spinner-inner"></div>
          </div>
          <div className="spinner-text">{text}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={spinnerClass}>
      <div className="spinner-content">
        <div className="spinner-circle">
          <div className="spinner-inner"></div>
        </div>
        {text && <div className="spinner-text">{text}</div>}
      </div>
    </div>
  );
};

// انواع مختلف Loading Spinner
export const DotSpinner = ({ text = 'در حال بارگذاری...' }) => (
  <div className="dot-spinner">
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
    {text && <div className="dot-spinner-text">{text}</div>}
  </div>
);

export const PulseSpinner = ({ text = 'در حال بارگذاری...' }) => (
  <div className="pulse-spinner">
    <div className="pulse"></div>
    {text && <div className="pulse-text">{text}</div>}
  </div>
);

export const WaveSpinner = ({ text = 'در حال بارگذاری...' }) => (
  <div className="wave-spinner">
    <div className="wave"></div>
    <div className="wave"></div>
    <div className="wave"></div>
    {text && <div className="wave-text">{text}</div>}
  </div>
);

export default LoadingSpinner;