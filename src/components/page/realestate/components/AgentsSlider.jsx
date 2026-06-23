// src/components/AgentsSlider.jsx
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaStar, FaHome, FaPhone, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './AgentsSlider.css';

const AgentsSlider = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://localhost:7178/api/RealEstatePage/GetIndependentAgent');
        const result = await response.json();
        
        if (result.status === 200 && result.data) {
          setAgents(result.data);
        }
      } catch (error) {
        console.error('خطا در دریافت مشاوران:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  // دکمه‌های سفارشی اسلایدر
  const NextArrow = ({ onClick }) => (
    <button className="slick-arrow slick-next-custom" onClick={onClick}>
      <FaArrowLeft />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button className="slick-arrow slick-prev-custom" onClick={onClick}>
      <FaArrowRight />
    </button>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    arrows: true,
    rtl: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          centerMode: true,
          centerPadding: '30px'
        }
      }
    ]
  };

  if (loading) {
    return (
      <div className="agents-slider-container">
        <div className="agents-header">
          <span className="header-badge">👨‍💼 متخصصین</span>
          <h2 className="agents-title">مشاوران <span>مستقل</span></h2>
        </div>
        <div className="agents-skeleton">
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} className="skeleton-item">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-name"></div>
              <div className="skeleton-stats"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="agents-slider-container">
      <div className="agents-header">
        <span className="header-badge">👨‍💼 متخصصین</span>
        <h2 className="agents-title">
          مشاوران <span>مستقل</span>
        </h2>
        <p className="agents-subtitle">حرفه‌ای‌ترین مشاوران املاک</p>
      </div>

      {agents.length > 0 ? (
        <div className="agents-slider-wrapper">
          <Slider {...sliderSettings}>
            {agents.map((agent) => (
              <div key={agent.userId} className="agent-slide">
                <div className="agent-card">
                  <div className="agent-avatar-container">
              
                      <img 
                        src={`https://localhost:7178${agent.avatar}`}
                        alt={agent.fullName}
                        className="agent-avatar"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23667eea"/%3E%3Ctext x="50" y="58" text-anchor="middle" fill="white" font-size="40" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E';
                        }}
                      />
            
                    <div className="agent-score">
                      <FaStar className="score-icon" />
                      <span>{agent.score || '۵۰'}</span>
                    </div>
                  </div>
                  
                  <h3 className="agent-name">{agent.fullName}</h3>
                  
                  <div className="agent-info-row">
                    <div className="agent-info-item">
                      <FaHome className="info-icon" />
                      <span className="info-number">{agent.totalRealEstate}</span>
                      <span className="info-label">ملک</span>
                    </div>
                    <div className="agent-info-divider"></div>
                    <div className="agent-info-item">
                      <span className="info-number">۱۲+</span>
                      <span className="info-label">مشتری</span>
                    </div>
                  </div>

                  <button className="agent-call-btn">
                    <FaPhone className="call-icon" />
                    تماس با مشاور
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="agents-empty">
          <p>هیچ مشاوری یافت نشد</p>
        </div>
      )}
    </div>
  );
};

export default AgentsSlider;