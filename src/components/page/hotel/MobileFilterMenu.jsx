import React, { useState, useEffect } from 'react';

const MobileFilterMenu = ({ filters, onFilterChange, onResetFilters, totalResults, filterOptions, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.stars?.length) count += filters.stars.length;
    if (filters.amenities?.length) count += filters.amenities.length;
    if (filters.meals?.length) count += filters.meals.length;
    if (filters.accommodations?.length) count += filters.accommodations.length;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  // برای دیباگ
  console.log('📱 MobileFilterMenu:', { isMobile, isOpen, activeFilterCount });

  // اگه موبایل نیست، چیزی رندر نکن
  if (!isMobile) {
    return null;
  }

  const menuButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    zIndex: 9999,
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0 4px 12px rgba(52, 152, 219, 0.4)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10000,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'all 0.3s ease'
  };

  const menuStyle = {
    position: 'fixed',
    top: 0,
    right: isOpen ? 0 : '-100%',
    width: '85%',
    maxWidth: '400px',
    height: '100vh',
    backgroundColor: 'white',
    zIndex: 10001,
    transition: 'right 0.3s ease',
    overflowY: 'auto',
    boxShadow: '-4px 0 12px rgba(0,0,0,0.1)'
  };

  return (
    <>
      {/* دکمه همبرگری */}
      <button 
        style={menuButtonStyle}
        onClick={() => {
          console.log('🔘 Button clicked');
          setIsOpen(true);
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
      >
        <span style={{ fontSize: '20px' }}>☰</span>
        <span>فیلترها</span>
        {activeFilterCount > 0 && (
          <span style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '12px',
            marginLeft: '5px',
            minWidth: '20px',
            textAlign: 'center'
          }}>{activeFilterCount}</span>
        )}
      </button>

      {/* اویرلی تیره */}
      <div style={overlayStyle} onClick={() => setIsOpen(false)} />

      {/* منوی فیلتر */}
      <div style={menuStyle}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px',
          borderBottom: '1px solid #ecf0f1',
          backgroundColor: '#f8f9fa',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c3e50' }}>
            فیلترها
          </h3>
          <button 
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#7f8c8d',
              padding: '0 8px'
            }} 
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: '20px' }}>
          {/* نمایش نتایج */}
          <div style={{
            backgroundColor: '#e1f5fe',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <span style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#0288d1',
              display: 'block'
            }}>{totalResults}</span>
            <span style={{ color: '#0288d1' }}>نتیجه</span>
          </div>

          {/* فیلتر ستاره هتل */}
          {filterOptions.stars && filterOptions.stars.length > 0 && (
            <div style={{
              marginBottom: '20px',
              borderBottom: '1px solid #ecf0f1',
              paddingBottom: '15px'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#34495e',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>⭐</span>
                <span>ستاره هتل</span>
              </div>
              {filterOptions.stars.map(star => (
                <label key={star} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 0',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={filters.stars?.includes(star)}
                    onChange={() => {
                      const newStars = filters.stars?.includes(star)
                        ? filters.stars.filter(s => s !== star)
                        : [...(filters.stars || []), star];
                      onFilterChange({ stars: newStars });
                    }}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: '#3498db'
                    }}
                  />
                  <span style={{
                    fontSize: '15px',
                    color: '#555',
                    flex: 1
                  }}>{star} ستاره</span>
                </label>
              ))}
            </div>
          )}

          {/* فیلتر امکانات */}
          {filterOptions.amenities && filterOptions.amenities.length > 0 && (
            <div style={{
              marginBottom: '20px',
              borderBottom: '1px solid #ecf0f1',
              paddingBottom: '15px'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#34495e',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>🔧</span>
                <span>امکانات</span>
              </div>
              {filterOptions.amenities.map(amenity => (
                <label key={amenity} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 0',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={filters.amenities?.includes(amenity)}
                    onChange={() => {
                      const newAmenities = filters.amenities?.includes(amenity)
                        ? filters.amenities.filter(a => a !== amenity)
                        : [...(filters.amenities || []), amenity];
                      onFilterChange({ amenities: newAmenities });
                    }}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: '#3498db'
                    }}
                  />
                  <span style={{
                    fontSize: '15px',
                    color: '#555',
                    flex: 1
                  }}>{amenity}</span>
                </label>
              ))}
            </div>
          )}

          {/* فیلتر نوع وعده غذایی */}
          {filterOptions.meals && filterOptions.meals.length > 0 && (
            <div style={{
              marginBottom: '20px',
              borderBottom: '1px solid #ecf0f1',
              paddingBottom: '15px'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#34495e',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>🍽️</span>
                <span>وعده غذایی</span>
              </div>
              {filterOptions.meals.map(meal => (
                <label key={meal} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 0',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={filters.meals?.includes(meal)}
                    onChange={() => {
                      const newMeals = filters.meals?.includes(meal)
                        ? filters.meals.filter(m => m !== meal)
                        : [...(filters.meals || []), meal];
                      onFilterChange({ meals: newMeals });
                    }}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: '#3498db'
                    }}
                  />
                  <span style={{
                    fontSize: '15px',
                    color: '#555',
                    flex: 1
                  }}>{meal}</span>
                </label>
              ))}
            </div>
          )}

          {/* فیلتر نوع اقامت */}
          {filterOptions.accommodations && filterOptions.accommodations.length > 0 && (
            <div style={{
              marginBottom: '20px',
              borderBottom: '1px solid #ecf0f1',
              paddingBottom: '15px'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#34495e',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>🏨</span>
                <span>نوع اقامت</span>
              </div>
              {filterOptions.accommodations.map(acc => (
                <label key={acc} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 0',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={filters.accommodations?.includes(acc)}
                    onChange={() => {
                      const newAccs = filters.accommodations?.includes(acc)
                        ? filters.accommodations.filter(a => a !== acc)
                        : [...(filters.accommodations || []), acc];
                      onFilterChange({ accommodations: newAccs });
                    }}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: '#3498db'
                    }}
                  />
                  <span style={{
                    fontSize: '15px',
                    color: '#555',
                    flex: 1
                  }}>{acc}</span>
                </label>
              ))}
            </div>
          )}

          {/* دکمه اعمال */}
          <button 
            style={{
              width: '100%',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '20px',
              transition: 'background-color 0.2s'
            }}
            onClick={() => setIsOpen(false)}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
          >
            دیدن {totalResults} نتیجه
          </button>

          {/* دکمه حذف فیلترها */}
          {activeFilterCount > 0 && (
            <button 
              style={{
                width: '100%',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '10px',
                transition: 'background-color 0.2s'
              }}
              onClick={() => {
                onResetFilters();
                setIsOpen(false);
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
            >
              حذف همه فیلترها
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileFilterMenu;