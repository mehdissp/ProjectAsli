// // import React, { useState, useEffect } from 'react';
// // import HotelCard from './HotelCard';
// // import FilterSidebar from './FilterSidebar';
// // import SortBar from './SortBar';
// // import SkeletonCard from './SkeletonCard';
// // import MobileFilterMenu from './MobileFilterMenu';

// // import { hotelsData, getFilterOptions } from '../data/hotelsData';
// // import './HotelPage.css';

// // const HotelPage = () => {
// //   const [hotels, setHotels] = useState([]);
// //   const [filteredHotels, setFilteredHotels] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [sortBy, setSortBy] = useState('پیشنهاد مستربناط');
// //   const [filters, setFilters] = useState({
// //     stars: [],
// //     amenities: [],
// //     meals: [],
// //     accommodations: []
// //   });
// //   const [filterOptions, setFilterOptions] = useState({
// //     stars: [],
// //     amenities: [],
// //     meals: [],
// //     accommodations: []
// //   });
  
// //   // state برای responsive
// //   const [screenSize, setScreenSize] = useState({
// //     isMobile: window.innerWidth < 768,
// //     isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
// //     isDesktop: window.innerWidth >= 1024,
// //     width: window.innerWidth
// //   });

// //   // بررسی سایز صفحه
// //   useEffect(() => {
// //     const handleResize = () => {
// //       const width = window.innerWidth;
// //       setScreenSize({
// //         isMobile: width < 768,
// //         isTablet: width >= 768 && width < 1024,
// //         isDesktop: width >= 1024,
// //         width: width
// //       });
// //       console.log('📱 Screen size changed:', { 
// //         width, 
// //         isMobile: width < 768,
// //         isTablet: width >= 768 && width < 1024,
// //         isDesktop: width >= 1024 
// //       });
// //     };

// //     handleResize(); // مقدار اولیه
// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   // دریافت داده‌های هتل
// //   useEffect(() => {
// //     const fetchHotels = async () => {
// //       setLoading(true);
// //       await new Promise(resolve => setTimeout(resolve, 2000));
// //       setHotels(hotelsData);
// //       setFilteredHotels(hotelsData);
// //       setFilterOptions(getFilterOptions(hotelsData));
// //       setLoading(false);
// //     };

// //     fetchHotels();
// //   }, []);

// //   // اعمال فیلترها و مرتب‌سازی
// //   useEffect(() => {
// //     if (hotels.length === 0) return;

// //     let result = [...hotels];

// //     if (filters.stars.length > 0) {
// //       result = result.filter(hotel => filters.stars.includes(hotel.stars));
// //     }

// //     if (filters.amenities.length > 0) {
// //       result = result.filter(hotel =>
// //         filters.amenities.every(amenity => hotel.amenities.includes(amenity))
// //       );
// //     }

// //     if (filters.meals.length > 0) {
// //       result = result.filter(hotel =>
// //         filters.meals.every(meal => hotel.mealType.includes(meal))
// //       );
// //     }

// //     if (filters.accommodations.length > 0) {
// //       result = result.filter(hotel =>
// //         filters.accommodations.includes(hotel.accommodationType)
// //       );
// //     }

// //     switch(sortBy) {
// //       case 'بالاترین قیمت':
// //         result.sort((a, b) => b.price - a.price);
// //         break;
// //       case 'کمترین قیمت':
// //         result.sort((a, b) => a.price - b.price);
// //         break;
// //       case 'بالاترین امتیاز':
// //         result.sort((a, b) => b.score - a.score);
// //         break;
// //       default:
// //         result.sort((a, b) => b.score - a.score);
// //     }

// //     setFilteredHotels(result);
// //   }, [filters, hotels, sortBy]);

// //   const updateFilters = (newFilters) => {
// //     setFilters(prev => ({ ...prev, ...newFilters }));
// //   };

// //   const resetFilters = () => {
// //     setFilters({
// //       stars: [],
// //       amenities: [],
// //       meals: [],
// //       accommodations: []
// //     });
// //   };

// //   // تعداد ستون‌ها بر اساس سایز صفحه
// //   const getColumnsCount = () => {
// //     if (screenSize.isMobile) return 1;
// //     if (screenSize.isTablet) return 2;
// //     return 3;
// //   };

// //   // رندر هتل‌ها با بنر بین ردیف‌ها
// //   const renderHotelsWithBanners = () => {
// //     const items = [];
// //     const columnsCount = getColumnsCount();
// //     const rows = Math.ceil(filteredHotels.length / columnsCount);
    
// //     for (let row = 0; row < rows; row++) {
// //       const startIdx = row * columnsCount;
// //       const rowHotels = filteredHotels.slice(startIdx, startIdx + columnsCount);
      
// //       items.push(
// //         <div 
// //           key={`row-${row}`} 
// //           className="hotel-row"
// //           style={{
// //             display: 'grid',
// //             gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
// //             gap: screenSize.isMobile ? '12px' : '16px',
// //             marginBottom: '20px'
// //           }}
// //         >
// //           {rowHotels.map(hotel => (
// //             <HotelCard key={hotel.id} hotel={hotel} />
// //           ))}
// //         </div>
// //       );

// //       if ((row + 1) % 2 === 0 && row < rows - 1) {
// //         items.push(
// //           <div key={`banner-${row}`} className="banner-container" style={{ marginBottom: '20px' }}>
         
// //           </div>
// //         );
// //       }
// //     }

// //     return items;
// //   };

// //   console.log('🎯 HotelPage render:', { 
// //     screenSize,
// //     columnsCount: getColumnsCount(),
// //     hotelsCount: filteredHotels.length 
// //   });

// //   return (
// //     <div className="hotel-page">
// //       <div className="hotel-page-container">
// //         {/* هدر صفحه */}
// //         <div className="hotel-header">
// //           <div className="hotel-breadcrumb">
// //             <span>مسترنبلط</span>
// //             <span className="separator">{'<'}</span>
// //             <span>رزرو هتل</span>
// //             <span className="separator">{'<'}</span>
// //             <span className="current">رزرو هتل تهران</span>
// //           </div>
          
// //           <div className="hotel-header-row">
// //             <h1 className="hotel-title">رزرو هتل تهران</h1>
// //             <div className="hotel-date">
// //               <span className="date-range">بهمن ۲۹ - بهمن ۳۰</span>
// //             </div>
// //           </div>
          
// //           <p className="hotel-count">
// //             {filteredHotels.length} هتل یافت شد
// //           </p>
// //         </div>

// //         {/* نوار مرتب‌سازی */}
     
        
// //         {/* محتوای اصلی */}
// //         <div className="hotel-content" style={{ 
// //           flexDirection: screenSize.isMobile ? 'column' : 'row' 
// //         }}>
// //           {/* سایدبار فیلتر - فقط در دسکتاپ و تبلت */}
// //           {!screenSize.isMobile && (
// //             <div className="hotel-sidebar">
// //               <FilterSidebar 
// //                 filters={filters}
// //                 onFilterChange={updateFilters}
// //                 onResetFilters={resetFilters}
// //                 totalResults={filteredHotels.length}
// //                 filterOptions={filterOptions}
// //               />
// //             </div>
// //           )}

// //           {/* لیست هتل‌ها */}
// //           <div className="hotel-list">
// //             {loading ? (
// //               <div 
// //                 className="hotel-grid skeleton-grid"
// //                 style={{
// //                   display: 'grid',
// //                   gridTemplateColumns: `repeat(${getColumnsCount()}, 1fr)`,
// //                   gap: '16px'
// //                 }}
// //               >
// //                 {[...Array(8)].map((_, index) => (
// //                   <SkeletonCard key={index} />
// //                 ))}
// //               </div>
// //             ) : (
// //               <div className="hotels-with-banners">
// //                 {renderHotelsWithBanners()}
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* منوی فیلتر موبایل - همیشه رندر میشه ولی شرط داخل کامپوننت چک میکنه */}
// //         <MobileFilterMenu 
// //           filters={filters}
// //           onFilterChange={updateFilters}
// //           onResetFilters={resetFilters}
// //           totalResults={filteredHotels.length}
// //           filterOptions={filterOptions}
// //           isMobile={screenSize.isMobile}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default HotelPage;

// import React, { useState, useEffect } from 'react';
// import HotelCard from './HotelCard';
// import FilterSidebar from './FilterSidebar';
// import SortBar from './SortBar';
// import SkeletonCard from './SkeletonCard';
// import MobileFilterMenu from './MobileFilterMenu';

// import { hotelsData, getFilterOptions } from '../data/hotelsData';
// import './HotelPage.css';

// const HotelPage = () => {
//   const [hotels, setHotels] = useState([]);
//   const [filteredHotels, setFilteredHotels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sortBy, setSortBy] = useState('پیشنهاد مستربناط');
//   const [filters, setFilters] = useState({
//     stars: [],
//     amenities: [],
//     meals: [],
//     accommodations: []
//   });
//   const [filterOptions, setFilterOptions] = useState({
//     stars: [],
//     amenities: [],
//     meals: [],
//     accommodations: []
//   });
  
//   // state برای responsive
//   const [screenSize, setScreenSize] = useState({
//     isMobile: window.innerWidth < 768,
//     isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
//     isDesktop: window.innerWidth >= 1024,
//     width: window.innerWidth
//   });

//   // بررسی سایز صفحه
//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       setScreenSize({
//         isMobile: width < 768,
//         isTablet: width >= 768 && width < 1024,
//         isDesktop: width >= 1024,
//         width: width
//       });
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // دریافت داده‌های هتل
//   useEffect(() => {
//     const fetchHotels = async () => {
//       setLoading(true);
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       setHotels(hotelsData);
//       setFilteredHotels(hotelsData);
//       setFilterOptions(getFilterOptions(hotelsData));
//       setLoading(false);
//     };

//     fetchHotels();
//   }, []);

//   // اعمال فیلترها و مرتب‌سازی
//   useEffect(() => {
//     if (hotels.length === 0) return;

//     let result = [...hotels];

//     if (filters.stars.length > 0) {
//       result = result.filter(hotel => filters.stars.includes(hotel.stars));
//     }

//     if (filters.amenities.length > 0) {
//       result = result.filter(hotel =>
//         filters.amenities.every(amenity => hotel.amenities.includes(amenity))
//       );
//     }

//     if (filters.meals.length > 0) {
//       result = result.filter(hotel =>
//         filters.meals.every(meal => hotel.mealType.includes(meal))
//       );
//     }

//     if (filters.accommodations.length > 0) {
//       result = result.filter(hotel =>
//         filters.accommodations.includes(hotel.accommodationType)
//       );
//     }

//     switch(sortBy) {
//       case 'بالاترین قیمت':
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case 'کمترین قیمت':
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case 'بالاترین امتیاز':
//         result.sort((a, b) => b.score - a.score);
//         break;
//       default:
//         result.sort((a, b) => b.score - a.score);
//     }

//     setFilteredHotels(result);
//   }, [filters, hotels, sortBy]);

//   const updateFilters = (newFilters) => {
//     setFilters(prev => ({ ...prev, ...newFilters }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       stars: [],
//       amenities: [],
//       meals: [],
//       accommodations: []
//     });
//   };

//   // تعداد ستون‌ها بر اساس سایز صفحه
//   const getColumnsCount = () => {
//     if (screenSize.isMobile) return 1;
//     if (screenSize.isTablet) return 2;
//     return 3; // دسکتاپ ۳ ستون
//   };

//   // رندر هتل‌ها با بنر بین ردیف‌ها
//   const renderHotelsWithBanners = () => {
//     const items = [];
//     const columnsCount = getColumnsCount();
//     const rows = Math.ceil(filteredHotels.length / columnsCount);
    
//     for (let row = 0; row < rows; row++) {
//       const startIdx = row * columnsCount;
//       const rowHotels = filteredHotels.slice(startIdx, startIdx + columnsCount);
      
//       items.push(
//         <div 
//           key={`row-${row}`} 
//           className="hotel-row"
//         >
//           {rowHotels.map(hotel => (
//             <HotelCard key={hotel.id} hotel={hotel} />
//           ))}
//         </div>
//       );

//       // اضافه کردن بنر بعد از هر ۲ ردیف
//       if ((row + 1) % 2 === 0 && row < rows - 1) {
//         items.push(
//           <div key={`banner-${row}`} className="banner-container">
    
//           </div>
//         );
//       }
//     }

//     return items;
//   };

//   return (
//     <div className="hotel-page">
//       <div className="hotel-page-container">
//         {/* هدر صفحه */}
//         <div className="hotel-header">
//           <div className="hotel-breadcrumb">
//             <span>مسترنبلط</span>
//             <span className="separator">{'<'}</span>
//             <span>رزرو هتل</span>
//             <span className="separator">{'<'}</span>
//             <span className="current">رزرو هتل تهران</span>
//           </div>
          
//           <div className="hotel-header-row">
//             <h1 className="hotel-title">رزرو هتل تهران</h1>
//             <div className="hotel-date">
//               <span className="date-range">بهمن ۲۹ - بهمن ۳۰</span>
//             </div>
//           </div>
          
//           <p className="hotel-count">
//             {filteredHotels.length} هتل یافت شد
//           </p>
//         </div>

//         {/* نوار مرتب‌سازی */}
//         <div className="sort-bar-container">
//           <SortBar currentSort={sortBy} onSortChange={setSortBy} />
//         </div>
        
//         {/* محتوای اصلی */}
//         <div className="hotel-content">
//           {/* سایدبار فیلتر - فقط در دسکتاپ و تبلت */}
//           {!screenSize.isMobile && (
//             <div className="hotel-sidebar">
//               <FilterSidebar 
//                 filters={filters}
//                 onFilterChange={updateFilters}
//                 onResetFilters={resetFilters}
//                 totalResults={filteredHotels.length}
//                 filterOptions={filterOptions}
//               />
//             </div>
//           )}

//           {/* لیست هتل‌ها */}
//           <div className="hotel-list">
//             {loading ? (
//               <div className="skeleton-grid">
//                 {[...Array(6)].map((_, index) => (
//                   <SkeletonCard key={index} />
//                 ))}
//               </div>
//             ) : (
//               <div className="hotels-with-banners">
//                 {renderHotelsWithBanners()}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* منوی فیلتر موبایل */}
//         <MobileFilterMenu 
//           filters={filters}
//           onFilterChange={updateFilters}
//           onResetFilters={resetFilters}
//           totalResults={filteredHotels.length}
//           filterOptions={filterOptions}
//           isMobile={screenSize.isMobile}
//         />
//       </div>
//     </div>
//   );
// };

// export default HotelPage;

import React, { useState, useEffect } from 'react';
import HotelCard from './HotelCard';
import FilterSidebar from './FilterSidebar';
import SortBar from './SortBar';
import SkeletonCard from './SkeletonCard';
import MobileFilterMenu from './MobileFilterMenu';
import Header from './Header';  // <==== ایمپورت Header
import { hotelsData, getFilterOptions } from '../data/hotelsData';
import './HotelPage.css';

const HotelPage = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('پیشنهاد مستربناط');
  const [filters, setFilters] = useState({
    stars: [],
    amenities: [],
    meals: [],
    accommodations: []
  });
  const [filterOptions, setFilterOptions] = useState({
    stars: [],
    amenities: [],
    meals: [],
    accommodations: []
  });
  
  // state برای responsive
  const [screenSize, setScreenSize] = useState({
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
    width: window.innerWidth
  });

  // بررسی سایز صفحه
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        width: width
      });
      console.log('📱 Screen size changed:', { 
        width, 
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024 
      });
    };

    handleResize(); // مقدار اولیه
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // دریافت داده‌های هتل
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setHotels(hotelsData);
      setFilteredHotels(hotelsData);
      setFilterOptions(getFilterOptions(hotelsData));
      setLoading(false);
    };

    fetchHotels();
  }, []);

  // اعمال فیلترها و مرتب‌سازی
  useEffect(() => {
    if (hotels.length === 0) return;

    let result = [...hotels];

    if (filters.stars.length > 0) {
      result = result.filter(hotel => filters.stars.includes(hotel.stars));
    }

    if (filters.amenities.length > 0) {
      result = result.filter(hotel =>
        filters.amenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }

    if (filters.meals.length > 0) {
      result = result.filter(hotel =>
        filters.meals.every(meal => hotel.mealType.includes(meal))
      );
    }

    if (filters.accommodations.length > 0) {
      result = result.filter(hotel =>
        filters.accommodations.includes(hotel.accommodationType)
      );
    }

    switch(sortBy) {
      case 'بالاترین قیمت':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'کمترین قیمت':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'بالاترین امتیاز':
        result.sort((a, b) => b.score - a.score);
        break;
      default:
        result.sort((a, b) => b.score - a.score);
    }

    setFilteredHotels(result);
  }, [filters, hotels, sortBy]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      stars: [],
      amenities: [],
      meals: [],
      accommodations: []
    });
  };

  // تعداد ستون‌ها بر اساس سایز صفحه
  const getColumnsCount = () => {
    if (screenSize.isMobile) return 1;
    if (screenSize.isTablet) return 2;
    return 4;
  };

  // رندر هتل‌ها با بنر بین ردیف‌ها
  const renderHotelsWithBanners = () => {
    const items = [];
    const columnsCount = getColumnsCount();
    const rows = Math.ceil(filteredHotels.length / columnsCount);
    
    for (let row = 0; row < rows; row++) {
      const startIdx = row * columnsCount;
      const rowHotels = filteredHotels.slice(startIdx, startIdx + columnsCount);
      
      items.push(
        <div 
          key={`row-${row}`} 
          className="hotel-row"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
            gap: screenSize.isMobile ? '12px' : '16px',
            marginBottom: '20px'
          }}
        >
          {rowHotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      );

      if ((row + 1) % 2 === 0 && row < rows - 1) {
        items.push(
          <div key={`banner-${row}`} className="banner-container" style={{ marginBottom: '20px' }}>
     
          </div>
        );
      }
    }

    return items;
  };

  console.log('🎯 HotelPage render:', { 
    screenSize,
    columnsCount: getColumnsCount(),
    hotelsCount: filteredHotels.length 
  });

  return (
    <div className="hotel-page">
      {/* اضافه کردن Header اینجا - با hotelCount */}
 
      
      <div className="hotel-page-container">
        {/* هدر صفحه قدیمی رو کامنت کردم یا پاکش کن */}
        {/* <div className="hotel-header"> ... </div> */}

        {/* نوار مرتب‌سازی */}
        <div className="sort-bar-container" style={{ marginTop: '20px' }}>
          {/* <SortBar currentSort={sortBy} onSortChange={setSortBy} /> */}
        </div>
        
        {/* محتوای اصلی */}
        <div className="hotel-content" style={{ 
          flexDirection: screenSize.isMobile ? 'column' : 'row' 
        }}>
          {/* سایدبار فیلتر - فقط در دسکتاپ و تبلت */}
          {!screenSize.isMobile && (
            <div className="hotel-sidebar">
              <FilterSidebar 
                filters={filters}
                onFilterChange={updateFilters}
                onResetFilters={resetFilters}
                totalResults={filteredHotels.length}
                filterOptions={filterOptions}
              />
            </div>
          )}

          {/* لیست هتل‌ها */}
          <div className="hotel-list">
            {loading ? (
              <div 
                className="hotel-grid skeleton-grid"
                style={{
                  display: 'grid',
             gridTemplateColumns: `repeat(${getColumnsCount()}, minmax(0, 1fr))`, // <==== تغییر اینجا
                  gap: '16px'
                }}
              >
                {[...Array(8)].map((_, index) => (
                     <div key={index} style={{ width: '100%', minWidth: 0 }}> {/* <==== این wrapper رو اضافه کن */}
        <SkeletonCard />
      </div>
                ))}
              </div>
            ) : (
              <div className="hotels-with-banners">
                {renderHotelsWithBanners()}
              </div>
            )}
          </div>
        </div>

        {/* منوی فیلتر موبایل */}
        <MobileFilterMenu 
          filters={filters}
          onFilterChange={updateFilters}
          onResetFilters={resetFilters}
          totalResults={filteredHotels.length}
          filterOptions={filterOptions}
          isMobile={screenSize.isMobile}
        />
      </div>
    </div>
  );
};

export default HotelPage;