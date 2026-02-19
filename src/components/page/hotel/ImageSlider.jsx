import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = ({ images, hotelName }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // اگه images تعریف نشده یا خالی بود، یه عکس پیش‌فرض نشون بده
  if (!images || images.length === 0) {
    return (
      <div style={{
        width: '100%',
        height: '160px',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ color: '#999' }}>عکس موجود نیست</span>
      </div>
    );
  }

  // تنظیمات اسلایدر
  const settings = {
    dots: true,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: images.length > 1,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: images.length > 1,
    beforeChange: (current, next) => setCurrentSlide(next),
    customPaging: (i) => (
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: i === currentSlide ? '#fff' : 'rgba(255,255,255,0.5)',
        margin: '0 4px',
        transition: 'all 0.3s'
      }} />
    )
  };

  // استایل کاستوم برای دکمه‌های قبلی و بعدی
  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    color: '#333',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
  };

  // کامپوننت کاستوم برای دکمه بعدی
  const NextArrow = (props) => {
    const { onClick, currentSlide } = props;
    // اگه آخرین اسلاید باشه و infinite false باشه، دکمه رو نشون نده
    if (!settings.infinite && currentSlide === images.length - 1) {
      return null;
    }
    return (
      <button style={{...arrowStyle, right: '10px'}} onClick={onClick}>
        ❯
      </button>
    );
  };

  // کامپوننت کاستوم برای دکمه قبلی
  const PrevArrow = (props) => {
    const { onClick, currentSlide } = props;
    // اگه اولین اسلاید باشه و infinite false باشه، دکمه رو نشون نده
    if (!settings.infinite && currentSlide === 0) {
      return null;
    }
    return (
      <button style={{...arrowStyle, left: '10px'}} onClick={onClick}>
        ❮
      </button>
    );
  };

  // به‌روزرسانی تنظیمات با دکمه‌های کاستوم
  const sliderSettings = {
    ...settings,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  // اگه فقط یک عکس باشه، اسلایدر ساده نشون بده
  if (images.length === 1) {
    return (
      <div style={{
        width: '100%',
        height: '160px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img 
          src={images[0]} 
          alt={hotelName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      height: '160px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Slider {...sliderSettings}>
        {images.map((img, index) => (
          <div key={index}>
            <img 
              src={img} 
              alt={`${hotelName} - ${index + 1}`}
              style={{
                width: '100%',
                height: '160px',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400';
              }}
            />
          </div>
        ))}
      </Slider>
      
      {/* نمایش شماره عکس */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: 'white',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        zIndex: 2
      }}>
        {currentSlide + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageSlider;