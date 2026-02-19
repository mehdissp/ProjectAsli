import React from 'react';
import ImageSlider from './ImageSlider';

const HotelCard = ({ hotel }) => {
  // اگه hotel تعریف نشده بود، چیزی نشون نده
  if (!hotel) return null;

  // ساخت ستاره‌ها
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{
          color: i < hotel.stars ? '#f1c40f' : '#e0e0e0',
          fontSize: '14px',
          marginLeft: '2px'
        }}>
          ★
        </span>
      );
    }
    return stars;
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, boxShadow 0.2s',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      }}
    >
      {/* اسلایدر عکس - با چک کردن وجود images */}
      <ImageSlider images={hotel.images || []} hotelName={hotel.name || ''} />
      
      <div style={{ padding: '12px', flex: 1 }}>
        {/* نام هتل */}
        <h3 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '5px',
          color: '#2c3e50',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {hotel.name || 'بدون نام'}
        </h3>
        
        {/* موقعیت */}
        <p style={{
          fontSize: '12px',
          color: '#7f8c8d',
          marginBottom: '8px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          📍 {hotel.location || 'نامشخص'}
        </p>
        
        {/* ستاره‌ها */}
        <div style={{ marginBottom: '10px' }}>
          {renderStars()}
        </div>
        
        {/* امکانات */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          marginBottom: '12px'
        }}>
          {(hotel.amenities || []).slice(0, 2).map((item, index) => (
            <span key={index} style={{
              backgroundColor: '#ecf0f1',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '10px',
              color: '#34495e'
            }}>
              {item}
            </span>
          ))}
          {(hotel.amenities || []).length > 2 && (
            <span style={{
              backgroundColor: '#ecf0f1',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '10px',
              color: '#34495e'
            }}>
              +{(hotel.amenities || []).length - 2}
            </span>
          )}
        </div>
        
        {/* قیمت و امتیاز */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #ecf0f1',
          paddingTop: '10px',
          marginTop: 'auto'
        }}>
          <div>
            <span style={{
              fontSize: '10px',
              color: '#95a5a6',
              display: 'block'
            }}>
              هر شب
            </span>
            <span style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#3498db'
            }}>
              {hotel.price ? `${Math.floor(hotel.price / 1000000)}.${Math.floor((hotel.price % 1000000) / 100000)}M` : 'نامشخص'}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{
              backgroundColor: hotel.score >= 7 ? '#27ae60' : '#f39c12',
              color: 'white',
              padding: '4px 6px',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '11px'
            }}>
              {hotel.score || '۰'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;