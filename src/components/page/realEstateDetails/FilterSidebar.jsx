// FilterSidebar.jsx
import React, { useState } from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onResetFilters, 
  totalResults,
  filterOptions = {
    regions: [],
    floorCounts: [],
    constructionYears: [],
    amenities: []
  }
}) => {
  const [expandedSections, setExpandedSections] = useState({
    regions: true,
    floorCounts: true,
    constructionYears: true,
    amenities: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (section, value) => {
    const currentSelection = filters[section] || [];
    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter(item => item !== value)
      : [...currentSelection, value];
    
    onFilterChange({ [section]: newSelection });
  };

  const clearAllFilters = () => {
    onResetFilters();
  };

  const getSelectedCount = () => {
    let count = 0;
    Object.values(filters).forEach(arr => {
      if (Array.isArray(arr)) count += arr.length;
    });
    return count;
  };

  // تبدیل سال شمسی به قرمز/سبز برای نوساز
  const getYearBadge = (year) => {
    const currentYear = new Date().getFullYear() - 621; // تبدیل به شمسی
    const age = currentYear - parseInt(year);
    
    if (age <= 2) {
      return <span className="badge-new">نوساز</span>;
    } else if (age <= 5) {
      return <span className="badge-good">ممتاز</span>;
    } else if (age >= 30) {
      return <span className="badge-old">قدیمی</span>;
    }
    return null;
  };

  // رندر فیلتر منطقه
  const renderRegionFilter = () => {
    if (!filterOptions.regions?.length) return null;

    return (
      <div className="filter-section">
        <div 
          className="filter-section-header" 
          onClick={() => toggleSection('regions')}
        >
          <div className="filter-section-title">
            <span className="icon">📍</span>
            <span>منطقه</span>
          </div>
          <span className="filter-section-toggle">
            {expandedSections.regions ? '−' : '+'}
          </span>
        </div>
        
        {expandedSections.regions && (
          <div className="filter-section-content">
            {filterOptions.regions.map(option => (
              <label key={option.id} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.regions?.includes(option.id)}
                  onChange={() => handleCheckboxChange('regions', option.id)}
                />
                <span className="checkbox-label">{option.label}</span>
                <span className="filter-count">{option.count}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  // رندر فیلتر تعداد طبقات
  const renderFloorFilter = () => {
    if (!filterOptions.floorCounts?.length) return null;

    return (
      <div className="filter-section">
        <div 
          className="filter-section-header" 
          onClick={() => toggleSection('floorCounts')}
        >
          <div className="filter-section-title">
            <span className="icon">🏢</span>
            <span>تعداد طبقات</span>
          </div>
          <span className="filter-section-toggle">
            {expandedSections.floorCounts ? '−' : '+'}
          </span>
        </div>
        
        {expandedSections.floorCounts && (
          <div className="filter-section-content">
            {filterOptions.floorCounts.map(option => (
              <label key={option.id} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.floorCounts?.includes(option.id)}
                  onChange={() => handleCheckboxChange('floorCounts', option.id)}
                />
                <span className="checkbox-label">{option.label}</span>
                <span className="filter-count">{option.count}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  // رندر فیلتر سال ساخت
  const renderYearFilter = () => {
    if (!filterOptions.constructionYears?.length) return null;

    // مرتب‌سازی نزولی سال‌ها
    const sortedYears = [...filterOptions.constructionYears].sort((a, b) => 
      parseInt(b.id) - parseInt(a.id)
    );

    return (
      <div className="filter-section">
        <div 
          className="filter-section-header" 
          onClick={() => toggleSection('constructionYears')}
        >
          <div className="filter-section-title">
            <span className="icon">📅</span>
            <span>سال ساخت</span>
          </div>
          <span className="filter-section-toggle">
            {expandedSections.constructionYears ? '−' : '+'}
          </span>
        </div>
        
        {expandedSections.constructionYears && (
          <div className="filter-section-content">
            {sortedYears.map(option => (
              <label key={option.id} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.constructionYears?.includes(option.id)}
                  onChange={() => handleCheckboxChange('constructionYears', option.id)}
                />
                <span className="checkbox-label">
                  <span>سال {option.label}</span>
                  {getYearBadge(option.id)}
                </span>
                <span className="filter-count">{option.count}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  // رندر فیلتر امکانات
  const renderAmenitiesFilter = () => {
    if (!filterOptions.amenities?.length) return null;

    const amenityIcons = {
      elevator: '🛗',
      parking: '🅿️',
      pool: '🏊',
      storeRoom: '📦'
    };

    return (
      <div className="filter-section">
        <div 
          className="filter-section-header" 
          onClick={() => toggleSection('amenities')}
        >
          <div className="filter-section-title">
            <span className="icon">✨</span>
            <span>امکانات</span>
          </div>
          <span className="filter-section-toggle">
            {expandedSections.amenities ? '−' : '+'}
          </span>
        </div>
        
        {expandedSections.amenities && (
          <div className="filter-section-content">
            {filterOptions.amenities.map(option => (
              <label key={option.id} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.amenities?.includes(option.id)}
                  onChange={() => handleCheckboxChange('amenities', option.id)}
                />
                <span className="checkbox-label">
                  <span className="amenity-icon">{amenityIcons[option.id] || '•'}</span>
                  <span>{option.label}</span>
                </span>
                <span className="filter-count">{option.count}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  const selectedCount = getSelectedCount();

  return (
    <div className="filter-sidebar">
      {/* هدر سایدبار */}
      <div className="filter-sidebar-header">
        <div className="filter-sidebar-title">
          <span>فیلترها</span>
          {selectedCount > 0 && (
            <span className="filter-badge">{selectedCount}</span>
          )}
        </div>
        {selectedCount > 0 && (
          <button onClick={clearAllFilters} className="clear-all-btn">
            حذف همه
          </button>
        )}
      </div>

      {/* محتوای فیلترها */}
      <div className="filter-sidebar-content">
        {renderRegionFilter()}
        {renderFloorFilter()}
        {renderYearFilter()}
        {renderAmenitiesFilter()}
      </div>

      {/* فوتر سایدبار با تعداد نتایج */}
      <div className="filter-sidebar-footer">
        <div className="total-results">
          <span>تعداد نتایج:</span>
          <span className="total-results-number">{totalResults}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;