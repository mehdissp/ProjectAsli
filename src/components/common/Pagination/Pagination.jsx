// components/common/Pagination/Pagination.jsx
import React from 'react';
import './Pagination.css';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems,
  pageSize,
  onPageChange, 
  disabled = false 
}) => {
  const getPageNumbers = () => {
    const delta = 10;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <div className="pagination-info">
        صفحه {currentPage.toLocaleString()} از {totalPages.toLocaleString()}
      </div>
      
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || disabled}
          title="صفحه اول"
        >
          ⟪
        </button>
        
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || disabled}
          title="صفحه قبلی"
        >
          ⟨
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`pagination-btn ${page === currentPage ? 'active' : ''} ${
              page === '...' ? 'dots' : ''
            }`}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...' || disabled}
          >
            {page === '...' ? '...' : page.toLocaleString()}
          </button>
        ))}

        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || disabled}
          title="صفحه بعدی"
        >
          ⟩
        </button>
        
        <button
          className="pagination-btn"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || disabled}
          title="صفحه آخر"
        >
          ⟫
        </button>
      </div>
    </div>
  );
};

export default Pagination;