// Header.jsx
import React from 'react';
import './Header.css';

const Header = ({ totalCount }) => {
  return (
    <header className="real-estate-header">
      <div className="header-container">
        <div className="header-logo">
          <h1>املاک</h1>
        </div>
        
        <div className="header-search">
          <input 
            type="text" 
            placeholder="جستجو در آگهی‌ها..." 
            className="search-input"
          />
          <button className="search-button">
            <span>🔍</span>
          </button>
        </div>

        <div className="header-stats">
          <span className="stats-badge">
            {totalCount.toLocaleString('fa-IR')} آگهی
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;