// SortBar.jsx
import React, { useState } from 'react';
import './SortBar.css';

const SortBar = ({ currentSort, onSortChange, options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultOptions = [
    { value: 'پیشنهاد ویژه', label: 'پیشنهاد ویژه' },
    { value: 'جدیدترین', label: 'جدیدترین' },
    { value: 'قدیمی‌ترین', label: 'قدیمی‌ترین' },
    { value: 'بیشترین امکانات', label: 'بیشترین امکانات' }
  ];

  const sortOptions = options.length > 0 ? options : defaultOptions;

  const handleSortChange = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="sort-bar">
      <div className="sort-bar-container">
        <div className="sort-label">
          <span className="sort-icon">⇅</span>
          <span>مرتب‌سازی:</span>
        </div>
        
        {/* دسکتاپ */}
        <div className="sort-desktop">
          {sortOptions.map(option => (
            <button
              key={option.value}
              className={`sort-button ${currentSort === option.value ? 'active' : ''}`}
              onClick={() => onSortChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* موبایل */}
        <div className="sort-mobile">
          <button 
            className="sort-dropdown-button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{currentSort}</span>
            <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
          </button>
          
          {isOpen && (
            <div className="sort-dropdown-menu">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  className={`sort-dropdown-item ${currentSort === option.value ? 'active' : ''}`}
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="results-count-mobile">
        {/* اینجا می‌توانید تعداد نتایج را نمایش دهید */}
      </div>
    </div>
  );
};

export default SortBar;