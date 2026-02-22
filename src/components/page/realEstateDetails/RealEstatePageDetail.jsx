// // RealEstatePage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import RealEstateCard from './RealEstateCard';
// import FilterSidebar from './FilterSidebar';
// import SortBar from './SortBar';
// import SkeletonCardRealEstate from './SkeletonCardRealEstate';
// import MobileFilterMenu from './MobileFilterMenu';
// import Header from './Header';
// import Pagination from './Pagination';
// import './RealEstatePage.css';

// const RealEstatePageDetail = () => {
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortBy, setSortBy] = useState('پیشنهاد ویژه');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const [filters, setFilters] = useState({
//     constructionYears: [],
//     amenities: [],
//     floorCounts: [],
//     regions: []
//   });
  
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

//   // دریافت داده از API
//   const fetchProperties = useCallback(async (page = currentPage) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       // ساخت query parameters
//       const queryParams = new URLSearchParams({
//         tabId: '1',
//         pageNumber: page.toString(),
//         pageSize: '10'
//       });

//       // اضافه کردن فیلترها به query params
//       if (filters.constructionYears.length > 0) {
//         filters.constructionYears.forEach(year => 
//           queryParams.append('constructionYears', year)
//         );
//       }
      
//       if (filters.regions.length > 0) {
//         filters.regions.forEach(region => 
//           queryParams.append('regions', region)
//         );
//       }

//       const response = await fetch(
//         `https://localhost:7178/api/RealEstatePage/GetRandomLastItemRealEstatesWithCategoryAsync?${queryParams}`
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
      
//       if (result.status === 200 && result.data) {
//         setProperties(result.data.items);
//         setFilteredProperties(result.data.items);
//         setTotalPages(result.data.totalPages);
//         setTotalCount(result.data.totalCount);
//         setCurrentPage(result.data.pageNumber);
//       } else {
//         throw new Error('Invalid response format');
//       }
//     } catch (err) {
//       console.error('Error fetching properties:', err);
//       setError('خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.');
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, filters]);

//   // بارگذاری اولیه و هنگام تغییر صفحه/فیلتر
//   useEffect(() => {
//     fetchProperties(currentPage);
//   }, [currentPage, fetchProperties]);

//   // اعمال مرتب‌سازی محلی (چون API مرتب‌سازی ندارد)
//   useEffect(() => {
//     if (properties.length === 0) return;

//     let result = [...properties];

//     switch(sortBy) {
//       case 'جدیدترین':
//         result.sort((a, b) => b.constructionYear - a.constructionYear);
//         break;
//       case 'قدیمی‌ترین':
//         result.sort((a, b) => a.constructionYear - b.constructionYear);
//         break;
//       case 'بیشترین امکانات':
//         result.sort((a, b) => {
//           const amenitiesA = [a.isHasElevator, a.isHasParking, a.isHasPool, a.isHasStoreRoom].filter(Boolean).length;
//           const amenitiesB = [b.isHasElevator, b.isHasParking, b.isHasPool, b.isHasStoreRoom].filter(Boolean).length;
//           return amenitiesB - amenitiesA;
//         });
//         break;
//       default:
//         // مرتب‌سازی پیش‌فرض (براساس id یا هر معیار دیگر)
//         break;
//     }

//     setFilteredProperties(result);
//   }, [sortBy, properties]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const updateFilters = (newFilters) => {
//     setFilters(prev => ({ ...prev, ...newFilters }));
//     setCurrentPage(1); // بازگشت به صفحه اول پس از اعمال فیلتر
//   };

//   const resetFilters = () => {
//     setFilters({
//       constructionYears: [],
//       amenities: [],
//       floorCounts: [],
//       regions: []
//     });
//     setCurrentPage(1);
//   };

//   // استخراج گزینه‌های فیلتر از داده‌ها
//   const getFilterOptionsFromData = () => {
//     const uniqueRegions = [...new Set(properties.map(p => p.regionName))];
//     const uniqueFloorCounts = [...new Set(properties.map(p => p.countFloor).filter(count => count > 0))];
//     const uniqueYears = [...new Set(properties.map(p => p.constructionYear))];
    
//     const amenities = [
//       { id: 'elevator', label: 'آسانسور', count: properties.filter(p => p.isHasElevator).length },
//       { id: 'parking', label: 'پارکینگ', count: properties.filter(p => p.isHasParking).length },
//       { id: 'pool', label: 'استخر', count: properties.filter(p => p.isHasPool).length },
//       { id: 'storeRoom', label: 'انباری', count: properties.filter(p => p.isHasStoreRoom).length }
//     ];

//     return {
//       regions: uniqueRegions.map(region => ({
//         id: region,
//         label: region,
//         count: properties.filter(p => p.regionName === region).length
//       })),
//       floorCounts: uniqueFloorCounts.map(count => ({
//         id: count.toString(),
//         label: `${count} طبقه`,
//         count: properties.filter(p => p.countFloor === count).length
//       })),
//       constructionYears: uniqueYears.map(year => ({
//         id: year.toString(),
//         label: `سال ${year}`,
//         count: properties.filter(p => p.constructionYear === year).length
//       })),
//       amenities: amenities.filter(a => a.count > 0)
//     };
//   };

//   const filterOptions = properties.length > 0 ? getFilterOptionsFromData() : {
//     regions: [],
//     floorCounts: [],
//     constructionYears: [],
//     amenities: []
//   };

//   const getColumnsCount = () => {
//     if (screenSize.isMobile) return 1;
//     if (screenSize.isTablet) return 2;
//     return 4;
//   };

//   if (error) {
//     return (
//       <div className="error-container">
//         <div className="error-message">{error}</div>
//         <button onClick={() => fetchProperties(currentPage)} className="retry-button">
//           تلاش مجدد
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="real-estate-page">
//       <Header totalCount={totalCount} />
      
//       <div className="real-estate-page-container">
//         <div className="sort-bar-container">
//           <SortBar 
//             currentSort={sortBy} 
//             onSortChange={setSortBy}
//             options={[
//               { value: 'پیشنهاد ویژه', label: 'پیشنهاد ویژه' },
//               { value: 'جدیدترین', label: 'جدیدترین' },
//               { value: 'قدیمی‌ترین', label: 'قدیمی‌ترین' },
//               { value: 'بیشترین امکانات', label: 'بیشترین امکانات' }
//             ]}
//           />
//         </div>
        
//         <div className="real-estate-content" style={{ 
//           flexDirection: screenSize.isMobile ? 'column' : 'row' 
//         }}>
//           {!screenSize.isMobile && (
//             <div className="real-estate-sidebar">
//      <FilterSidebar 
//   filters={filters}
//   onFilterChange={updateFilters}
//   onResetFilters={resetFilters}
//   totalResults={filteredProperties.length}
//   filterOptions={filterOptions}
// />
//             </div>
//           )}

//           <div className="real-estate-list">
//             {loading ? (
//               <div 
//                 className="real-estate-grid skeleton-grid"
//                 style={{
//                   display: 'grid',
//                   gridTemplateColumns: `repeat(${getColumnsCount()}, minmax(0, 1fr))`,
//                   gap: '16px'
//                 }}
//               >
//                 {[...Array(8)].map((_, index) => (
//                   <div key={index} style={{ width: '100%', minWidth: 0 }}>
//                     <SkeletonCardRealEstate />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <>
//                 <div className="results-info">
//                   <span>تعداد {totalCount} ملک یافت شد</span>
//                 </div>
                
//                 <div 
//                   className="real-estate-grid"
//                   style={{
//                     display: 'grid',
//                     gridTemplateColumns: `repeat(${getColumnsCount()}, minmax(0, 1fr))`,
//                     gap: '16px'
//                   }}
//                 >
//                   {filteredProperties.map(property => (
//                     <RealEstateCard key={property.id} property={property} />
//                   ))}
//                 </div>

//                 {totalPages > 1 && (
//                   <Pagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={handlePageChange}
//                   />
//                 )}
//               </>
//             )}
//           </div>
//         </div>

//         <MobileFilterMenu 
//           filters={filters}
//           onFilterChange={updateFilters}
//           onResetFilters={resetFilters}
//           totalResults={filteredProperties.length}
//           filterOptions={filterOptions}
//           isMobile={screenSize.isMobile}
//           type="realestate"
//         />
//       </div>
//     </div>
//   );
// };

// export default RealEstatePageDetail;
// RealEstatePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import RealEstateCard from './RealEstateCard';
import FilterSidebar from './FilterSidebar';
import SortBar from './SortBar';
import SkeletonCardRealEstate from './SkeletonCardRealEstate';
import MobileFilterMenu from './MobileFilterMenu';
import Header from './Header';
import Pagination from './Pagination';
import './RealEstatePage.css';

const RealEstatePageDetail = () => {
      const location = useLocation();
    const { tabId, type } = location.state || {};
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('پیشنهاد ویژه');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({
    regions: [],
    floorCounts: [],
    constructionYears: [],
    amenities: []
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
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // دریافت داده از API
  const fetchProperties = useCallback(async (page = currentPage) => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams({
            tabId: tabId || '1',
        pageNumber: page.toString(),
        pageSize: '12'
      });

      const response = await fetch(
        `https://localhost:7178/api/RealEstatePage/GetRandomLastItemRealEstatesWithCategoryAsync?${queryParams}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === 200 && result.data) {
             let images = [];
                const baseImageUrl = 'https://localhost:7178/uploads/images';
                      images = [baseImageUrl]
        // اضافه کردن عکس تصادفی برای نمایش
        const itemsWithImages = result.data.items.map(item => ({
          ...item,
          imageUrl: [`https://localhost:7178/uploads/images/${item.address}`] // عکس تصادفی
        }));
        
        setProperties(itemsWithImages);
        setFilteredProperties(itemsWithImages);
        setTotalPages(result.data.totalPages);
        setTotalCount(result.data.totalCount);
        setCurrentPage(result.data.pageNumber);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  // بارگذاری اولیه
  useEffect(() => {
    fetchProperties(currentPage);
  }, [currentPage, fetchProperties]);

  // اعمال مرتب‌سازی
  useEffect(() => {
    if (properties.length === 0) return;

    let result = [...properties];

    switch(sortBy) {
      case 'جدیدترین':
        result.sort((a, b) => b.constructionYear - a.constructionYear);
        break;
      case 'قدیمی‌ترین':
        result.sort((a, b) => a.constructionYear - b.constructionYear);
        break;
      case 'بیشترین امکانات':
        result.sort((a, b) => {
          const amenitiesA = [a.isHasElevator, a.isHasParking, a.isHasPool, a.isHasStoreRoom].filter(Boolean).length;
          const amenitiesB = [b.isHasElevator, b.isHasParking, b.isHasPool, b.isHasStoreRoom].filter(Boolean).length;
          return amenitiesB - amenitiesA;
        });
        break;
      default:
        break;
    }

    setFilteredProperties(result);
  }, [sortBy, properties]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      regions: [],
      floorCounts: [],
      constructionYears: [],
      amenities: []
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // استخراج گزینه‌های فیلتر
  const getFilterOptionsFromData = () => {
    const uniqueRegions = [...new Set(properties.map(p => p.regionName))];
    const uniqueFloorCounts = [...new Set(properties.map(p => p.countFloor).filter(count => count > 0))];
    const uniqueYears = [...new Set(properties.map(p => p.constructionYear))];
    
    const amenities = [
      { id: 'elevator', label: 'آسانسور', count: properties.filter(p => p.isHasElevator).length },
      { id: 'parking', label: 'پارکینگ', count: properties.filter(p => p.isHasParking).length },
      { id: 'pool', label: 'استخر', count: properties.filter(p => p.isHasPool).length },
      { id: 'storeRoom', label: 'انباری', count: properties.filter(p => p.isHasStoreRoom).length }
    ];

    return {
      regions: uniqueRegions.map(region => ({
        id: region,
        label: region,
        count: properties.filter(p => p.regionName === region).length
      })),
      floorCounts: uniqueFloorCounts.map(count => ({
        id: count.toString(),
        label: `${count} طبقه`,
        count: properties.filter(p => p.countFloor === count).length
      })),
      constructionYears: uniqueYears.map(year => ({
        id: year.toString(),
        label: year.toString(),
        count: properties.filter(p => p.constructionYear === year).length
      })),
      amenities: amenities.filter(a => a.count > 0)
    };
  };

  const filterOptions = properties.length > 0 ? getFilterOptionsFromData() : {
    regions: [],
    floorCounts: [],
    constructionYears: [],
    amenities: []
  };

  // تعداد ستون‌ها بر اساس سایز صفحه
  const getColumnsCount = () => {
    if (screenSize.isMobile) return 1;
    if (screenSize.isTablet) return 2;
    return 4; // دسکتاپ ۳ ستون
  };

  // رندر ملک‌ها با بنر بین ردیف‌ها
  const renderPropertiesWithBanners = () => {
    const items = [];
    const columnsCount = getColumnsCount();
    const rows = Math.ceil(filteredProperties.length / columnsCount);
    
    for (let row = 0; row < rows; row++) {
      const startIdx = row * columnsCount;
      const rowProperties = filteredProperties.slice(startIdx, startIdx + columnsCount);
      
      items.push(
        <div 
          key={`row-${row}`} 
          className="property-row"
        >
          {rowProperties.map(property => (
            <RealEstateCard key={property.id} property={property} />
          ))}
        </div>
      );

      // اضافه کردن بنر بین ردیف‌های زوج
      if ((row + 1) % 2 === 0 && row < rows - 1) {
        items.push(
          <div key={`banner-${row}`} className="banner-container">
            <div className="ad-banner">
              <span>آگهی ویژه</span>
            </div>
          </div>
        );
      }
    }

    return items;
  };

  return (
    <div className="real-estate-page">
      {/* هدر */}
      {/* <Header totalCount={totalCount} /> */}

      <div className="real-estate-page-container">
        {/* نان و عنوان */}
        <div className="real-estate-header">
          {/* <div className="property-breadcrumb">
            <span>خانه</span>
            <span className="separator">/</span>
            <span>املاک</span>
            <span className="separator">/</span>
            <span className="current">لیست آگهی‌ها</span>
          </div> */}
          
          {/* <div className="property-header-row">
            <h1 className="property-title">لیست املاک</h1>
            <div className="property-date">
              <span className="date-range">
                {new Date().toLocaleDateString('fa-IR')}
              </span>
            </div>
          </div> */}
          
          <p className="property-count">
            {totalCount.toLocaleString('fa-IR')} ملک یافت شد
          </p>
        </div>

        {/* نوار مرتب‌سازی */}
        <div className="sort-bar-container">
          <SortBar 
            currentSort={sortBy} 
            onSortChange={setSortBy}
            options={[
              { value: 'پیشنهاد ویژه', label: 'پیشنهاد ویژه' },
              { value: 'جدیدترین', label: 'جدیدترین' },
              { value: 'قدیمی‌ترین', label: 'قدیمی‌ترین' },
              { value: 'بیشترین امکانات', label: 'بیشترین امکانات' }
            ]}
          />
        </div>
        
        {/* محتوای اصلی */}
        <div className="real-estate-content">
          {/* سایدبار فیلتر - فقط در دسکتاپ و تبلت */}
          {!screenSize.isMobile && (
            <div className="real-estate-sidebar">
              <FilterSidebar 
                filters={filters}
                onFilterChange={updateFilters}
                onResetFilters={resetFilters}
                totalResults={filteredProperties.length}
                filterOptions={filterOptions}
              />
            </div>
          )}

          {/* لیست املاک */}
          <div className="real-estate-list">
            {loading ? (
              <div className="property-grid skeleton-grid">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="skeleton-wrapper">
                    <SkeletonCardRealEstate />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="error-container">
                <div className="error-message">{error}</div>
                <button onClick={() => fetchProperties(currentPage)} className="retry-button">
                  تلاش مجدد
                </button>
              </div>
            ) : (
              <>
                <div className="properties-with-banners">
                  {renderPropertiesWithBanners()}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* منوی فیلتر موبایل */}
        <MobileFilterMenu 
          filters={filters}
          onFilterChange={updateFilters}
          onResetFilters={resetFilters}
          totalResults={filteredProperties.length}
          filterOptions={filterOptions}
          isMobile={screenSize.isMobile}
        />
      </div>
    </div>
  );
};

export default RealEstatePageDetail;