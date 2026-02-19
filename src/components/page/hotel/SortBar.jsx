import React from 'react';

const SortBar = ({ currentSort, onSortChange }) => {
  const sortOptions = [
    'پیشنهاد مستربناط',
    'بالاترین قیمت',
    'کمترین قیمت',
    'بالاترین امتیاز'
  ];

  const barStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '12px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  };

  return (
    <div style={barStyle}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        <span style={{
          fontSize: '14px',
          color: '#7f8c8d',
          whiteSpace: 'nowrap'
        }}>
          مرتب‌سازی:
        </span>
        
        {sortOptions.map((option) => (
          <button
            key={option}
            onClick={() => onSortChange(option)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: currentSort === option ? '#3498db' : '#ecf0f1',
              color: currentSort === option ? 'white' : '#34495e',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortBar;