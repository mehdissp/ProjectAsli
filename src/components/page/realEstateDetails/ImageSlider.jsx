// // // ImageSlider.jsx
// // import React, { useState } from 'react';

// // const ImageSlider = ({ images = [], hotelName = '' }) => {
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //     console.log(images,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
// //   // اگه عکس نبود، یه پلیس هولدر نشون بده
// //   if (!images || images.length === 0) {
// //     return (
// //       <div style={{
// //         width: '100%',
// //         height: '180px',
// //         backgroundColor: '#e0e0e0',
// //         display: 'flex',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         color: '#999',
// //         fontSize: '14px'
// //       }}>
// //         <span>📸 بدون عکس</span>
// //       </div>
// //     );
// //   }

// //   const goToPrevious = (e) => {
// //     e.stopPropagation();
// //     const isFirstSlide = currentIndex === 0;
// //     const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
// //     setCurrentIndex(newIndex);
// //   };

// //   const goToNext = (e) => {
// //     e.stopPropagation();
// //     const isLastSlide = currentIndex === images.length - 1;
// //     const newIndex = isLastSlide ? 0 : currentIndex + 1;
// //     setCurrentIndex(newIndex);
// //   };

// //   const sliderContainerStyle = {
// //     position: 'relative',
// //     width: '100%',
// //     height: '180px',
// //     overflow: 'hidden'
// //   };

// //   const imageStyle = {
// //     width: '100%',
// //     height: '100%',
// //     objectFit: 'cover',
// //     transition: 'transform 0.3s ease'
// //   };

// //   const arrowStyle = {
// //     position: 'absolute',
// //     top: '50%',
// //     transform: 'translateY(-50%)',
// //     backgroundColor: 'rgba(255, 255, 255, 0.7)',
// //     border: 'none',
// //     borderRadius: '50%',
// //     width: '30px',
// //     height: '30px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     cursor: 'pointer',
// //     fontSize: '16px',
// //     color: '#333',
// //     boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
// //     zIndex: 5,
// //     transition: 'background 0.2s'
// //   };

// //   const dotsContainerStyle = {
// //     position: 'absolute',
// //     bottom: '10px',
// //     left: '50%',
// //     transform: 'translateX(-50%)',
// //     display: 'flex',
// //     gap: '6px',
// //     zIndex: 5
// //   };

// //   const dotStyle = (isActive) => ({
// //     width: '8px',
// //     height: '8px',
// //     borderRadius: '50%',
// //     backgroundColor: isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)',
// //     cursor: 'pointer',
// //     transition: 'all 0.2s',
// //     border: isActive ? '2px solid #3498db' : 'none'
// //   });

// //   return (
// //     <div style={sliderContainerStyle}>
// //       {/* عکس اصلی */}
// //       <img 
// //         src={images[currentIndex]} 
// //         alt={`${hotelName} - ${currentIndex + 1}`}
// //         style={imageStyle}
// //         onError={(e) => {
// //           e.target.onerror = null;
// //           e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
// //         }}
// //       />

// //       {/* دکمه قبلی - فقط اگه بیشتر از ۱ عکس باشه */}
// //       {images.length > 1 && (
// //         <>
// //           <button 
// //             onClick={goToPrevious}
// //             style={{
// //               ...arrowStyle,
// //               left: '5px'
// //             }}
// //             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'}
// //             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'}
// //           >
// //             ‹
// //           </button>

// //           {/* دکمه بعدی */}
// //           <button 
// //             onClick={goToNext}
// //             style={{
// //               ...arrowStyle,
// //               right: '5px'
// //             }}
// //             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'}
// //             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'}
// //           >
// //             ›
// //           </button>

// //           {/* نقطه‌ها */}
// //           <div style={dotsContainerStyle}>
// //             {images.map((_, index) => (
// //               <button
// //                 key={index}
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   setCurrentIndex(index);
// //                 }}
// //                 style={dotStyle(index === currentIndex)}
// //                 onMouseEnter={(e) => {
// //                   if (index !== currentIndex) {
// //                     e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
// //                   }
// //                 }}
// //                 onMouseLeave={(e) => {
// //                   if (index !== currentIndex) {
// //                     e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
// //                   }
// //                 }}
// //               />
// //             ))}
// //           </div>
// //         </>
// //       )}

// //       {/* شمارنده عکس - برای وقتی که بیشتر از ۱ عکس هست */}
// //       {images.length > 1 && (
// //         <div style={{
// //           position: 'absolute',
// //           top: '10px',
// //           left: '10px',
// //           backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //           color: 'white',
// //           padding: '2px 8px',
// //           borderRadius: '12px',
// //           fontSize: '11px',
// //           zIndex: 5
// //         }}>
// //           {currentIndex + 1} / {images.length}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ImageSlider;

// // ImageSlider.jsx

// import React, { useState, useEffect } from 'react';

// const ImageSlider = ({ images = [], hotelName = '' }) => {
//     console.log(images ,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [imageError, setImageError] = useState({});
//   const [validImages, setValidImages] = useState([]);
  
//   console.log("Images received in slider:", images);
//   console.log("Type of images:", typeof images);
//   console.log("Is array?", Array.isArray(images));

//   // تبدیل images به آرایه - همیشه قبل از return
//   useEffect(() => {
//     let imageArray = [];
    
//     if (Array.isArray(images)) {
//       imageArray = images.filter(img => img && typeof img === 'string');
//     } else if (typeof images === 'string') {
//       imageArray = [images];
//     } else if (images && typeof images === 'object') {
//       imageArray = Object.values(images).filter(img => img && typeof img === 'string');
//     }
    
//     console.log("Valid images after processing:", imageArray);
//     setValidImages(imageArray);
//   }, [images]);

//   // مدیریت خطای عکس - همیشه قبل از return
//   useEffect(() => {
//     if (imageError[currentIndex] && validImages.length > 1) {
//       const nextIndex = (currentIndex + 1) % validImages.length;
//       if (nextIndex !== currentIndex) {
//         setCurrentIndex(nextIndex);
//       }
//     }
//   }, [imageError, currentIndex, validImages.length]);

//   const goToPrevious = (e) => {
//     e.stopPropagation();
//     const isFirstSlide = currentIndex === 0;
//     const newIndex = isFirstSlide ? validImages.length - 1 : currentIndex - 1;
//     setCurrentIndex(newIndex);
//   };

//   const goToNext = (e) => {
//     e.stopPropagation();
//     const isLastSlide = currentIndex === validImages.length - 1;
//     const newIndex = isLastSlide ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//   };

//   const handleImageError = (index) => {
//     console.log(`Image error at index ${index}:`, validImages[index]);
//     setImageError(prev => ({ ...prev, [index]: true }));
//   };

//   const sliderContainerStyle = {
//     position: 'relative',
//     width: '100%',
//     height: '180px',
//     overflow: 'hidden'
//   };

//   const imageStyle = {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     transition: 'transform 0.3s ease'
//   };

//   const arrowStyle = {
//     position: 'absolute',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     border: 'none',
//     borderRadius: '50%',
//     width: '30px',
//     height: '30px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     cursor: 'pointer',
//     fontSize: '16px',
//     color: '#333',
//     boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
//     zIndex: 5,
//     transition: 'background 0.2s'
//   };

//   const dotsContainerStyle = {
//     position: 'absolute',
//     bottom: '10px',
//     left: '50%',
//     transform: 'translateX(-50%)',
//     display: 'flex',
//     gap: '6px',
//     zIndex: 5
//   };

//   const dotStyle = (isActive) => ({
//     width: '8px',
//     height: '8px',
//     borderRadius: '50%',
//     backgroundColor: isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)',
//     cursor: 'pointer',
//     transition: 'all 0.2s',
//     border: isActive ? '2px solid #3498db' : 'none'
//   });

//   // حالا می‌تونیم return کنیم
//   if (!validImages || validImages.length === 0) {
//     return (
//       <div style={{
//         width: '100%',
//         height: '180px',
//         backgroundColor: '#e0e0e0',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: '#999',
//         fontSize: '14px'
//       }}>
//         <span>📸 بدون عکس</span>
//       </div>
//     );
//   }

//   return (
//     <div style={sliderContainerStyle}>
//       {/* عکس اصلی */}
//       {!imageError[currentIndex] ? (
//         <img 
//           src={validImages[currentIndex]} 
//           alt={`${hotelName} - ${currentIndex + 1}`}
//           style={imageStyle}
//           onError={() => handleImageError(currentIndex)}
//         />
//       ) : (
//         <div style={{
//           ...imageStyle,
//           backgroundColor: '#f0f0f0',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           color: '#999'
//         }}>
//                  <img 
//           src='https://localhost:7178/uploads/images/noHome.png' 
//           alt={`${hotelName} - ${currentIndex + 1}`}
//           style={imageStyle}
//           onError={() => handleImageError(currentIndex)}
//         />
//         </div>
//       )}

//       {/* دکمه قبلی - فقط اگه بیشتر از ۱ عکس باشه */}
//       {validImages.length > 1 && (
//         <>
//           <button 
//             onClick={goToPrevious}
//             style={{
//               ...arrowStyle,
//               left: '5px'
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'}
//             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'}
//           >
//             ‹
//           </button>

//           <button 
//             onClick={goToNext}
//             style={{
//               ...arrowStyle,
//               right: '5px'
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'}
//             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'}
//           >
//             ›
//           </button>

//           <div style={dotsContainerStyle}>
//             {validImages.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setCurrentIndex(index);
//                 }}
//                 style={dotStyle(index === currentIndex)}
//                 onMouseEnter={(e) => {
//                   if (index !== currentIndex) {
//                     e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (index !== currentIndex) {
//                     e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
//                   }
//                 }}
//               />
//             ))}
//           </div>
//         </>
//       )}

//       {validImages.length > 1 && (
//         <div style={{
//           position: 'absolute',
//           top: '10px',
//           left: '10px',
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           color: 'white',
//           padding: '2px 8px',
//           borderRadius: '12px',
//           fontSize: '11px',
//           zIndex: 5
//         }}>
//           {currentIndex + 1} / {validImages.length}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageSlider;

// ImageSlider.jsx
// ImageSlider.jsx
// ImageSlider.jsx
import React, { useState, useEffect } from 'react';

// ایمپورت FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight, 
  faImage,
  faCamera
} from '@fortawesome/free-solid-svg-icons';

const ImageSlider = ({ images = [], hotelName = '', propertyId = '' }) => {
  console.log(images, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState({});
  const [validImages, setValidImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  console.log("Images received in slider:", images);
  console.log("Type of images:", typeof images);
  console.log("Is array?", Array.isArray(images));

  // عکس پیش‌فرض برای وقتی عکسی نیست
  const defaultImage = 'https://localhost:7178/uploads/images/noHome.png';

  // تبدیل images به آرایه
  useEffect(() => {
    let imageArray = [];
    
    if (Array.isArray(images)) {
      imageArray = images.filter(img => img && typeof img === 'string');
    } else if (typeof images === 'string') {
      imageArray = [images];
    } else if (images && typeof images === 'object') {
      imageArray = Object.values(images).filter(img => img && typeof img === 'string');
    }
    
    console.log("Valid images after processing:", imageArray);
    setValidImages(imageArray);
    setIsLoading(false);
  }, [images]);

  // مدیریت خطای عکس
  useEffect(() => {
    if (imageError[currentIndex] && validImages.length > 1) {
      const nextIndex = (currentIndex + 1) % validImages.length;
      if (nextIndex !== currentIndex) {
        setCurrentIndex(nextIndex);
      }
    }
  }, [imageError, currentIndex, validImages.length]);

  const goToPrevious = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? validImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const isLastSlide = currentIndex === validImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleImageError = (index) => {
    console.log(`Image error at index ${index}:`, validImages[index]);
    setImageError(prev => ({ ...prev, [index]: true }));
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const sliderContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px 8px 0 0'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#333',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 10,
    transition: 'all 0.2s',
    backdropFilter: 'blur(4px)'
  };

  const dotsContainerStyle = {
    position: 'absolute',
    bottom: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '6px 12px',
    borderRadius: '30px',
    backdropFilter: 'blur(4px)'
  };

  const dotStyle = (isActive) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
    padding: 0,
    transform: isActive ? 'scale(1.2)' : 'scale(1)'
  });

  // حالت لودینگ
  if (isLoading) {
    return (
      <div style={{
        ...sliderContainerStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0'
      }}>
        <div style={{ textAlign: 'center' }}>
          <FontAwesomeIcon icon={faImage} size="2x" color="#ccc" />
          <p style={{ margin: '8px 0 0', color: '#999', fontSize: '12px' }}>در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // حالت بدون عکس - نمایش عکس پیش‌فرض با شمارنده 0/0
  if (!validImages || validImages.length === 0) {
    return (
      <div style={sliderContainerStyle}>
        <img 
          src={defaultImage}
          alt="بدون عکس"
          style={imageStyle}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        {/* شمارنده 0/0 */}
  
      </div>
    );
  }

  // اگه عکس فعلی خطا داره، عکس پیش‌فرض نشون بده با شمارنده مناسب
  if (imageError[currentIndex]) {
    return (
      <div style={sliderContainerStyle}>
        <img 
          src={defaultImage}
          alt="خطا در بارگذاری عکس"
          style={imageStyle}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        {/* شمارنده عکس */}
      

        {/* دکمه قبلی */}
        {validImages.length > 1 && (
          <button 
            onClick={goToPrevious}
            style={{
              ...arrowStyle,
              left: '12px'
            }}
            aria-label="عکس قبلی"
            title="عکس قبلی"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="sm" />
          </button>
        )}

        {/* دکمه بعدی */}
        {validImages.length > 1 && (
          <button 
            onClick={goToNext}
            style={{
              ...arrowStyle,
              right: '12px'
            }}
            aria-label="عکس بعدی"
            title="عکس بعدی"
          >
            <FontAwesomeIcon icon={faChevronRight} size="sm" />
          </button>
        )}
      </div>
    );
  }

  // حالت عادی - عکس اصلی نمایش داده میشه
  return (
    <div 
      style={sliderContainerStyle}
      itemScope
      itemType="https://schema.org/ImageGallery"
    >
      {/* عکس اصلی */}
      <img 
        src={validImages[currentIndex]} 
        alt={`${hotelName || 'ملک'} - تصویر ${currentIndex + 1} از ${validImages.length}`}
        style={imageStyle}
        onError={() => handleImageError(currentIndex)}
        onLoad={handleImageLoad}
        loading="lazy"
      />

      {/* شمارنده عکس */}
  

      {/* دکمه قبلی */}
      {validImages.length > 1 && (
        <button 
          onClick={goToPrevious}
          style={{
            ...arrowStyle,
            left: '12px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
          aria-label="عکس قبلی"
          title="عکس قبلی"
        >
          <FontAwesomeIcon icon={faChevronLeft} size="sm" />
        </button>
      )}

      {/* دکمه بعدی */}
      {validImages.length > 1 && (
        <button 
          onClick={goToNext}
          style={{
            ...arrowStyle,
            right: '12px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
          aria-label="عکس بعدی"
          title="عکس بعدی"
        >
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </button>
      )}

      {/* نقطه‌ها */}
      {validImages.length > 1 && (
        <div 
          style={dotsContainerStyle}
          role="tablist"
          aria-label="انتخاب عکس"
        >
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              style={dotStyle(index === currentIndex)}
              onMouseEnter={(e) => {
                if (index !== currentIndex) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentIndex) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                }
              }}
              aria-label={`عکس شماره ${index + 1}`}
              aria-selected={index === currentIndex}
              role="tab"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;