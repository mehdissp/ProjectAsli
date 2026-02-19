import React, { useState } from 'react';

const FilterSidebar = ({ filters, onFilterChange, onResetFilters, totalResults, filterOptions }) => {
  const [expandedSections, setExpandedSections] = useState({
    stars: true,
    amenities: true,
    meals: true,
    accommodations: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleStarChange = (star) => {
    const newStars = filters.stars.includes(star)
      ? filters.stars.filter(s => s !== star)
      : [...filters.stars, star];
    onFilterChange({ stars: newStars });
  };

  const handleAmenityChange = (amenity) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    onFilterChange({ amenities: newAmenities });
  };

  const handleMealChange = (meal) => {
    const newMeals = filters.meals.includes(meal)
      ? filters.meals.filter(m => m !== meal)
      : [...filters.meals, meal];
    onFilterChange({ meals: newMeals });
  };

  const handleAccommodationChange = (acc) => {
    const newAccs = filters.accommodations.includes(acc)
      ? filters.accommodations.filter(a => a !== acc)
      : [...filters.accommodations, acc];
    onFilterChange({ accommodations: newAccs });
  };

  const sidebarStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    height: 'fit-content',
    position: 'sticky',
    top: '100px'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '1px solid #ecf0f1'
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2c3e50'
  };

  const resetButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#3498db',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '5px 10px',
    borderRadius: '6px'
  };

  const sectionStyle = {
    marginBottom: '20px',
    borderBottom: '1px solid #ecf0f1',
    paddingBottom: '15px'
  };

  const sectionHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '5px 0',
    marginBottom: '10px'
  };

  const sectionTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#34495e',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const optionsContainerStyle = (section) => ({
    maxHeight: expandedSections[section] ? '300px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease'
  });

  const optionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 0',
    cursor: 'pointer'
  };

  const checkboxStyle = {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: '#3498db'
  };

  const labelStyle = {
    fontSize: '14px',
    color: '#555',
    flex: 1
  };

  const countStyle = {
    fontSize: '12px',
    color: '#95a5a6',
    backgroundColor: '#f0f0f0',
    padding: '2px 8px',
    borderRadius: '12px'
  };

  const arrowStyle = {
    fontSize: '12px',
    color: '#7f8c8d',
    transition: 'transform 0.3s'
  };

  const resultsInfoStyle = {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center'
  };

  const resultsNumberStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2c3e50',
    display: 'block'
  };

  const resultsTextStyle = {
    fontSize: '14px',
    color: '#7f8c8d'
  };

  // محاسبه تعداد هر گزینه
  const getOptionCount = (type, value) => {
    // اینجا می‌تونی منطق محاسبه تعداد واقعی رو پیاده‌سازی کنی
    return Math.floor(Math.random() * 10) + 1; // موقت
  };

  return (
    <div style={sidebarStyle}>
      {/* هدر فیلتر */}
      <div style={headerStyle}>
        <span style={titleStyle}>فیلترها</span>
        <button 
          style={resetButtonStyle}
          onClick={onResetFilters}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          حذف فیلترها
        </button>
      </div>

      {/* نمایش نتایج */}
      <div style={resultsInfoStyle}>
        <span style={resultsNumberStyle}>{totalResults}</span>
        <span style={resultsTextStyle}>نتیجه از ۲۱ نتیجه</span>
      </div>

      {/* فیلتر ستاره هتل */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle} onClick={() => toggleSection('stars')}>
          <div style={sectionTitleStyle}>
            <span>⭐</span>
            <span>ستاره هتل</span>
          </div>
          <span style={{...arrowStyle, transform: expandedSections.stars ? 'rotate(180deg)' : 'rotate(0)'}}>
            ▼
          </span>
        </div>
        <div style={optionsContainerStyle('stars')}>
          {filterOptions.stars.map(star => (
            <label key={star} style={optionStyle}>
              <input
                type="checkbox"
                checked={filters.stars.includes(star)}
                onChange={() => handleStarChange(star)}
                style={checkboxStyle}
              />
              <span style={labelStyle}>{star} ستاره</span>
              <span style={countStyle}>{getOptionCount('star', star)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* فیلتر امکانات */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle} onClick={() => toggleSection('amenities')}>
          <div style={sectionTitleStyle}>
            <span>🔧</span>
            <span>امکانات</span>
          </div>
          <span style={{...arrowStyle, transform: expandedSections.amenities ? 'rotate(180deg)' : 'rotate(0)'}}>
            ▼
          </span>
        </div>
        <div style={optionsContainerStyle('amenities')}>
          {filterOptions.amenities.map(amenity => (
            <label key={amenity} style={optionStyle}>
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                style={checkboxStyle}
              />
              <span style={labelStyle}>{amenity}</span>
              <span style={countStyle}>{getOptionCount('amenity', amenity)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* فیلتر نوع خدمات وعده غذایی */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle} onClick={() => toggleSection('meals')}>
          <div style={sectionTitleStyle}>
            <span>🍽️</span>
            <span>نوع خدمات وعده غذایی</span>
          </div>
          <span style={{...arrowStyle, transform: expandedSections.meals ? 'rotate(180deg)' : 'rotate(0)'}}>
            ▼
          </span>
        </div>
        <div style={optionsContainerStyle('meals')}>
          {filterOptions.meals.map(meal => (
            <label key={meal} style={optionStyle}>
              <input
                type="checkbox"
                checked={filters.meals.includes(meal)}
                onChange={() => handleMealChange(meal)}
                style={checkboxStyle}
              />
              <span style={labelStyle}>{meal}</span>
              <span style={countStyle}>{getOptionCount('meal', meal)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* فیلتر نوع محل اقامت */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle} onClick={() => toggleSection('accommodations')}>
          <div style={sectionTitleStyle}>
            <span>🏨</span>
            <span>نوع محل اقامت</span>
          </div>
          <span style={{...arrowStyle, transform: expandedSections.accommodations ? 'rotate(180deg)' : 'rotate(0)'}}>
            ▼
          </span>
        </div>
        <div style={optionsContainerStyle('accommodations')}>
          {filterOptions.accommodations.map(acc => (
            <label key={acc} style={optionStyle}>
              <input
                type="checkbox"
                checked={filters.accommodations.includes(acc)}
                onChange={() => handleAccommodationChange(acc)}
                style={checkboxStyle}
              />
              <span style={labelStyle}>{acc}</span>
              <span style={countStyle}>{getOptionCount('acc', acc)}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;