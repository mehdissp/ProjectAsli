// // import React, { useState, useEffect } from 'react';
// // import './CityModal.css';

// // const CityModal = ({ isOpen, onClose, onSelect, selectedCity }) => {
// //   const [provinces, setProvinces] = useState([]);
// //   const [cities, setCities] = useState([]);
// //   const [selectedProvince, setSelectedProvince] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [viewMode, setViewMode] = useState('provinces'); // 'provinces' or 'cities'
// //   const [popularCities] = useState([
// //     { id: 1, name: 'تهران', province_name: 'تهران' },
// //     { id: 2, name: 'مشهد', province_name: 'خراسان رضوی' },
// //     { id: 3, name: 'اصفهان', province_name: 'اصفهان' },
// //     { id: 4, name: 'شیراز', province_name: 'فارس' },
// //     { id: 5, name: 'کرج', province_name: 'البرز' },
// //     { id: 6, name: 'تبریز', province_name: 'آذربایجان شرقی' },
// //   ]);

// //   useEffect(() => {
// //     if (isOpen) {
// //       loadProvinces();
// //     }
// //   }, [isOpen]);

// //   const loadProvinces = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await fetch('https://iran-locations-api.liara.run/api/v1/provinces');
// //       const data = await response.json();
// //       setProvinces(data.data || []);
// //     } catch (error) {
// //       console.error('Error loading provinces:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const loadCities = async (provinceId) => {
// //     setLoading(true);
// //     try {
// //       const response = await fetch(`https://iran-locations-api.liara.run/api/v1/cities?province_id=${provinceId}`);
// //       const data = await response.json();
// //       setCities(data.data || []);
// //     } catch (error) {
// //       console.error('Error loading cities:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleProvinceSelect = (province) => {
// //     setSelectedProvince(province);
// //     loadCities(province.id);
// //     setViewMode('cities');
// //   };

// //   const handleCitySelect = (city) => {
// //     onSelect(city);
// //     onClose();
// //   };

// //   const handleBack = () => {
// //     setViewMode('provinces');
// //     setSelectedProvince(null);
// //     setSearchTerm('');
// //   };

// //   const filteredProvinces = provinces.filter(province =>
// //     province.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const filteredCities = cities.filter(city =>
// //     city.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const filteredPopularCities = popularCities.filter(city =>
// //     city.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   if (!isOpen) return null;

// //   return (
// //     <div className="city-modal-overlay" onClick={onClose}>
// //       <div className="city-modal-container" onClick={(e) => e.stopPropagation()}>
// //         {/* هدر مودال */}
// //         <div className="city-modal-header">
// //           <div className="city-modal-header-content">
// //             <button className="city-modal-back-btn" onClick={handleBack}>
// //               ←
// //             </button>
// //             <h2 className="city-modal-title">
// //               {viewMode === 'provinces' ? 'انتخاب استان' : `شهرهای ${selectedProvince?.name}`}
// //             </h2>
// //             <button className="city-modal-close-btn" onClick={onClose}>
// //               ✕
// //             </button>
// //           </div>
// //         </div>

// //         {/* جستجو */}
// //         <div className="city-modal-search">
// //           <div className="city-search-box">
// //             <span className="search-icon">🔍</span>
// //             <input
// //               type="text"
// //               placeholder={viewMode === 'provinces' ? 'جستجوی استان...' : 'جستجوی شهر...'}
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="city-search-input"
// //               autoFocus
// //             />
// //             {searchTerm && (
// //               <button className="search-clear" onClick={() => setSearchTerm('')}>
// //                 ✕
// //               </button>
// //             )}
// //           </div>
// //         </div>

// //         {/* محتوای اصلی */}
// //         <div className="city-modal-content">
// //           {loading ? (
// //             <div className="city-loading">
// //               <div className="loading-spinner"></div>
// //               <p>در حال بارگذاری...</p>
// //             </div>
// //           ) : (
// //             <>
// //               {/* نمایش استان‌ها */}
// //               {viewMode === 'provinces' && (
// //                 <>
// //                   {/* شهرهای پرطرفدار */}
// //                   {!searchTerm && (
// //                     <div className="city-section">
// //                       <div className="city-section-title">
// //                         <span>⭐</span>
// //                         <h3>شهرهای پرطرفدار</h3>
// //                       </div>
// //                       <div className="city-grid">
// //                         {filteredPopularCities.map(city => (
// //                           <div
// //                             key={city.id}
// //                             className="city-card popular"
// //                             onClick={() => onSelect(city)}
// //                           >
// //                             <span className="city-card-icon">🏙️</span>
// //                             <div className="city-card-info">
// //                               <div className="city-card-name">{city.name}</div>
// //                               <div className="city-card-province">{city.province_name}</div>
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   )}

// //                   {/* تمام استان‌ها */}
// //                   <div className="city-section">
// //                     <div className="city-section-title">
// //                       <span>📍</span>
// //                       <h3>انتخاب بر اساس استان</h3>
// //                     </div>
// //                     <div className="province-grid">
// //                       {filteredProvinces.map(province => (
// //                         <div
// //                           key={province.id}
// //                           className="province-card"
// //                           onClick={() => handleProvinceSelect(province)}
// //                         >
// //                           <div className="province-card-icon">
// //                             {province.name === 'تهران' ? '🏛️' : '🏢'}
// //                           </div>
// //                           <div className="province-card-name">{province.name}</div>
// //                           <div className="province-card-arrow">→</div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </>
// //               )}

// //               {/* نمایش شهرها */}
// //               {viewMode === 'cities' && (
// //                 <div className="city-section">
// //                   <div className="city-section-title">
// //                     <span>🏙️</span>
// //                     <h3>شهرهای {selectedProvince?.name}</h3>
// //                   </div>
// //                   <div className="city-grid">
// //                     {filteredCities.map(city => (
// //                       <div
// //                         key={city.id}
// //                         className={`city-card ${selectedCity?.id === city.id ? 'active' : ''}`}
// //                         onClick={() => handleCitySelect(city)}
// //                       >
// //                         <span className="city-card-icon">📍</span>
// //                         <div className="city-card-info">
// //                           <div className="city-card-name">{city.name}</div>
// //                         </div>
// //                         {selectedCity?.id === city.id && (
// //                           <span className="city-check-mark">✓</span>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </>
// //           )}
// //         </div>

// //         {/* فوتر مودال */}
// //         <div className="city-modal-footer">
// //           <button className="city-modal-footer-btn" onClick={onClose}>
// //             بعداً
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CityModal;

// import React, { useState, useEffect } from 'react';
// import './CityModal.css';
// import cityService from '../../services/cityService';

// const CityModal = ({ isOpen, onClose, onSelect, selectedCity }) => {
//   const [cities, setCities] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       loadCities();
//     }
//   }, [isOpen]);

//   const loadCities = async () => {
//     setLoading(true);
//     try {
//       const data = await cityService.getCities();
//       setCities(data);
//     } catch (error) {
//       console.error('Error loading cities:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCitySelect = (city) => {
//     onSelect(city);
//     onClose();
//   };

//   // فیلتر کردن شهرها بر اساس جستجو
//   const filteredCities = cities.filter(city =>
//     city.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     city.persianName?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (!isOpen) return null;

//   return (
//     <div className="city-modal-overlay" onClick={onClose}>
//       <div className="city-modal-container" onClick={(e) => e.stopPropagation()}>
//         {/* هدر مودال */}
//         <div className="city-modal-header">
//           <div className="city-modal-header-content">
//             <h2 className="city-modal-title">📍 انتخاب شهر</h2>
//             <button className="city-modal-close-btn" onClick={onClose}>
//               ✕
//             </button>
//           </div>
//         </div>

//         {/* جستجو */}
//         <div className="city-modal-search">
//           <div className="city-search-box">
//             <span className="search-icon">🔍</span>
//             <input
//               type="text"
//               placeholder="جستجوی شهر..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="city-search-input"
//               autoFocus
//             />
//             {searchTerm && (
//               <button className="search-clear" onClick={() => setSearchTerm('')}>
//                 ✕
//               </button>
//             )}
//           </div>
//         </div>

//         {/* محتوای اصلی */}
//         <div className="city-modal-content">
//           {loading ? (
//             <div className="city-loading">
//               <div className="loading-spinner"></div>
//               <p>در حال بارگذاری شهرها...</p>
//             </div>
//           ) : filteredCities.length === 0 ? (
//             <div className="no-city-result">
//               <span>🔍</span>
//               <p>شهری یافت نشد</p>
//             </div>
//           ) : (
//             <div className="city-grid">
//               {filteredCities.map((city, index) => (
//                 <div
//                   key={city.id || index}
//                   className={`city-card ${selectedCity?.id === city.id ? 'active' : ''}`}
//                   onClick={() => handleCitySelect(city)}
//                 >
//                   <span className="city-card-icon">📍</span>
//                   <div className="city-card-info">
//                     <div className="city-card-name">{city.name || city.persianName}</div>
//                   </div>
//                   {selectedCity?.id === city.id && (
//                     <span className="city-check-mark">✓</span>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CityModal;

import React, { useState, useEffect } from 'react';
import './CityModal.css';
import cityService from '../../services/cityService';
import { useCity } from '../../context/CityContext';
import { useNavigate } from 'react-router-dom';

const CityModal = ({ isOpen, onClose }) => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const { selectedCity, changeCity } = useCity();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      loadCities();
    }
  }, [isOpen]);

  const loadCities = async () => {
    setLoading(true);
    try {
      const data = await cityService.getCities();
      setCities(data);
    } catch (error) {
      console.error('Error loading cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (city) => {
    changeCity(city);
    onClose();
    
    // اگر در صفحه نقشه هستیم، رفرش کن
    if (window.location.pathname === '/map-search') {
      navigate('/map-search', { replace: true });
      window.location.reload();
    }
  };

  const filteredCities = cities.filter(city =>
    city.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.persianName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="city-modal-overlay" onClick={onClose}>
      <div className="city-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="city-modal-header">
          <div className="city-modal-header-content">
            <h2 className="city-modal-title">📍 انتخاب شهر</h2>
            <button className="city-modal-close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div className="city-modal-search">
          <div className="city-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="جستجوی شهر..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="city-search-input"
              autoFocus
            />
            {searchTerm && (
              <button className="search-clear" onClick={() => setSearchTerm('')}>
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="city-modal-content">
          {loading ? (
            <div className="city-loading">
              <div className="loading-spinner"></div>
              <p>در حال بارگذاری شهرها...</p>
            </div>
          ) : filteredCities.length === 0 ? (
            <div className="no-city-result">
              <span>🔍</span>
              <p>شهری یافت نشد</p>
            </div>
          ) : (
            <div className="city-grid">
              {filteredCities.map((city, index) => (
                <div
                  key={city.id || index}
                  className={`city-card ${selectedCity?.id === city.id ? 'active' : ''}`}
                  onClick={() => handleCitySelect(city)}
                >
                  <span className="city-card-icon">📍</span>
                  <div className="city-card-info">
                    <div className="city-card-name">{city.name || city.persianName}</div>
                  </div>
                  {selectedCity?.id === city.id && (
                    <span className="city-check-mark">✓</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityModal;