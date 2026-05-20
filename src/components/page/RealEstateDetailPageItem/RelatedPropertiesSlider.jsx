// RelatedPropertiesSlider.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaRulerCombined, 
  FaBed, 
  FaTag, 
  FaChevronRight,
  FaChevronLeft,
  FaCamera
} from 'react-icons/fa';

// ایمپورت Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// ایمپورت CSSهای اصلی
import 'swiper/css';
import 'swiper/css/navigation';
import './RelatedPropertiesSlider.css';

const RelatedPropertiesSlider = ({ currentPropertyId, regionName, propertyType }) => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const formatPrice = (price) => {
    if (!price || price === '۰') return 'تماس بگیرید';
    if (typeof price === 'number') {
      return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    }
    return price + ' تومان';
  };

  useEffect(() => {
    const fetchRelatedProperties = async () => {
      setLoading(true);
      
      try {
        // داده نمونه برای نمایش
        setTimeout(() => {
          const sampleData = [
            {
              id: 101,
              title: 'آپارتمان لوکس ۱۲۰ متری منطقه ۱',
              area: 120,
              rooms: 3,
              price: 3250000000,
              regionName: 'منطقه ۱',
              imageUrl: ['https://picsum.photos/id/106/400/300'],
              imageCount: 3,
              type: 1
            },
            {
              id: 102,
              title: 'آپارتمان نوساز ۹۰ متری منطقه ۲',
              area: 90,
              rooms: 2,
              price: 2150000000,
              regionName: 'منطقه ۲',
              imageUrl: ['https://picsum.photos/id/15/400/300'],
              imageCount: 4,
              type: 1
            },
            {
              id: 103,
              title: 'واحد ۱۵۰ متری با چشم انداز',
              area: 150,
              rooms: 4,
              price: 4500000000,
              regionName: 'منطقه ۱',
              imageUrl: ['https://picsum.photos/id/42/400/300'],
              imageCount: 5,
              type: 1
            },
            {
              id: 104,
              title: 'آپارتمان ۸۰ متری منطقه ۳',
              area: 80,
              rooms: 2,
              price: 1850000000,
              regionName: 'منطقه ۳',
              imageUrl: ['https://picsum.photos/id/20/400/300'],
              imageCount: 2,
              type: 1
            },
            {
              id: 105,
              title: 'ملک ۲۰۰ متری لاکچری',
              area: 200,
              rooms: 5,
              price: 7200000000,
              regionName: 'منطقه ۱',
              imageUrl: ['https://picsum.photos/id/30/400/300'],
              imageCount: 6,
              type: 1
            }
          ];
          setProperties(sampleData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('خطا:', error);
        setLoading(false);
      }
    };

    fetchRelatedProperties();
  }, [currentPropertyId, regionName, propertyType]);

  const handlePropertyClick = (propertyId) => {
    navigate(`/realEstateDetailPageItem?id=${propertyId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="related-section">
        <div className="container">
          <h2 className="section-title">🏠 پیشنهادات مشابه</h2>
          <div className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (properties.length === 0) return null;

  return (
    <div className="related-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            🏠 پیشنهادات مشابه در {regionName}
          </h2>
          <div className="section-nav-buttons">
            <button ref={prevRef} className="nav-btn prev-btn" aria-label="قبلی">
              <FaChevronRight />
            </button>
            <button ref={nextRef} className="nav-btn next-btn" aria-label="بعدی">
              <FaChevronLeft />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2.5, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 }
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onInit={(swiper) => {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
          className="related-swiper"
        >
          {properties.map((property) => (
            <SwiperSlide key={property.id}>
              <div 
                className="related-card"
                onClick={() => handlePropertyClick(property.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handlePropertyClick(property.id)}
              >
                <div className="card-image-wrapper">
                  <img 
                    src={property.imageUrl?.[0] || 'https://picsum.photos/400/300'}
                    alt={property.title}
                    className="card-image"
                    loading="lazy"
                  />
                  {property.imageCount > 0 && (
                    <span className="image-count">
                      <FaCamera size={10} />
                      {property.imageCount}
                    </span>
                  )}
                  <span className="property-type-badge sale">فروش</span>
                </div>
                
                <div className="card-content">
                  <h3 className="card-title">{property.title}</h3>
                  
                  <div className="card-location">
                    <FaMapMarkerAlt size={12} />
                    <span>{property.regionName}</span>
                  </div>
                  
                  <div className="card-specs">
                    <div className="spec">
                      <FaRulerCombined size={12} />
                      <span>{property.area} متر²</span>
                    </div>
                    <div className="spec">
                      <FaBed size={12} />
                      <span>{property.rooms} خواب</span>
                    </div>
                  </div>
                  
                  <div className="card-price">
                    <FaTag size={12} />
                    <span>{formatPrice(property.price)}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedPropertiesSlider;