// MobileFilterMenu.jsx
import React, { useState } from 'react';
import FilterSidebar from './FilterSidebar';
import './MobileFilterMenu.css';

const MobileFilterMenu = ({ 
  filters, 
  onFilterChange, 
  onResetFilters, 
  totalResults,
  filterOptions,
  isMobile 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isMobile) return null;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const getSelectedCount = () => {
    let count = 0;
    Object.values(filters).forEach(arr => {
      if (Array.isArray(arr)) count += arr.length;
    });
    return count;
  };

  const selectedCount = getSelectedCount();

  return (
    <>
      {/* دکمه فیلتر موبایل */}
      <button className="mobile-filter-button" onClick={toggleMenu}>
        <span className="filter-icon">⚙️</span>
        <span>فیلترها</span>
        {selectedCount > 0 && (
          <span className="filter-badge-mobile">{selectedCount}</span>
        )}
      </button>

      {/* منوی فیلتر */}
      {isOpen && (
        <div className="mobile-filter-overlay">
          <div className="mobile-filter-container">
            <div className="mobile-filter-header">
              <h3 className="mobile-filter-title">فیلترها</h3>
              <button className="mobile-filter-close" onClick={closeMenu}>
                ✕
              </button>
            </div>

            <div className="mobile-filter-content">
              <FilterSidebar 
                filters={filters}
                onFilterChange={onFilterChange}
                onResetFilters={onResetFilters}
                totalResults={totalResults}
                filterOptions={filterOptions}
              />
            </div>

            <div className="mobile-filter-footer">
              <button className="mobile-filter-apply" onClick={closeMenu}>
                مشاهده {totalResults} نتیجه
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileFilterMenu;