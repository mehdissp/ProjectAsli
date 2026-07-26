
// // // // RealEstatePage.jsx

// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import { useLocation } from 'react-router-dom';
// // // import RealEstateCard from './RealEstateCard';
// // // import FilterSidebar from './FilterSidebar';
// // // import SortBar from './SortBar';
// // // import SkeletonCardRealEstate from './SkeletonCardRealEstate';
// // // import MobileFilterMenu from './MobileFilterMenu';
// // // import Header from './Header';
// // // import Pagination from './Pagination';
// // // import './RealEstatePage.css';

// // // const RealEstatePageDetail = () => {
// // //       const location = useLocation();
// // //     const { tabId, type } = location.state || {};
// // //   const [properties, setProperties] = useState([]);
// // //   const [filteredProperties, setFilteredProperties] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [sortBy, setSortBy] = useState('پیشنهاد ویژه');
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [totalPages, setTotalPages] = useState(1);
// // //   const [totalCount, setTotalCount] = useState(0);
// // //   const [filters, setFilters] = useState({
// // //     regions: [],
// // //     floorCounts: [],
// // //     constructionYears: [],
// // //     amenities: []
// // //   });

// // //   // state برای responsive
// // //   const [screenSize, setScreenSize] = useState({
// // //     isMobile: window.innerWidth < 768,
// // //     isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
// // //     isDesktop: window.innerWidth >= 1024,
// // //     width: window.innerWidth
// // //   });

// // //   // بررسی سایز صفحه
// // //   useEffect(() => {
// // //     const handleResize = () => {
// // //       const width = window.innerWidth;
// // //       setScreenSize({
// // //         isMobile: width < 768,
// // //         isTablet: width >= 768 && width < 1024,
// // //         isDesktop: width >= 1024,
// // //         width: width
// // //       });
// // //     };

// // //     handleResize();
// // //     window.addEventListener('resize', handleResize);
// // //     return () => window.removeEventListener('resize', handleResize);
// // //   }, []);

// // //   // دریافت داده از API
// // //   const fetchProperties = useCallback(async (page = currentPage) => {
// // //     setLoading(true);
// // //     setError(null);
    
// // //     try {
// // //       const queryParams = new URLSearchParams({
// // //             tabId: tabId || '1',
// // //         pageNumber: page.toString(),
// // //         pageSize: '12'
// // //       });

// // //       const response = await fetch(
// // //         `https://localhost:7178/api/RealEstatePage/GetRandomLastItemRealEstatesWithCategoryAsync?${queryParams}`
// // //       );

// // //       if (!response.ok) {
// // //         throw new Error(`HTTP error! status: ${response.status}`);
// // //       }

// // //       const result = await response.json();
      
// // //       if (result.status === 200 && result.data) {
// // //              let images = [];
// // //                 const baseImageUrl = 'https://localhost:7178/uploads/images';
// // //                       images = [baseImageUrl]
// // //         // اضافه کردن عکس تصادفی برای نمایش
// // //         const itemsWithImages = result.data.items.map(item => ({
// // //           ...item,
// // //           imageUrl: [`https://localhost:7178/${item.address}`] // عکس تصادفی
// // //         }));
        
// // //         setProperties(itemsWithImages);
// // //         setFilteredProperties(itemsWithImages);
// // //         setTotalPages(result.data.totalPages);
// // //         setTotalCount(result.data.totalCount);
// // //         setCurrentPage(result.data.pageNumber);
// // //       }
// // //     } catch (err) {
// // //       console.error('Error fetching properties:', err);
// // //       setError('خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [currentPage]);

// // //   // بارگذاری اولیه
// // //   useEffect(() => {
// // //     fetchProperties(currentPage);
// // //   }, [currentPage, fetchProperties]);

// // //   // اعمال مرتب‌سازی
// // //   useEffect(() => {
// // //     if (properties.length === 0) return;

// // //     let result = [...properties];

// // //     switch(sortBy) {
// // //       case 'جدیدترین':
// // //         result.sort((a, b) => b.constructionYear - a.constructionYear);
// // //         break;
// // //       case 'قدیمی‌ترین':
// // //         result.sort((a, b) => a.constructionYear - b.constructionYear);
// // //         break;
// // //       case 'بیشترین امکانات':
// // //         result.sort((a, b) => {
// // //           const amenitiesA = [a.isHasElevator, a.isHasParking, a.isHasPool, a.isHasStoreRoom].filter(Boolean).length;
// // //           const amenitiesB = [b.isHasElevator, b.isHasParking, b.isHasPool, b.isHasStoreRoom].filter(Boolean).length;
// // //           return amenitiesB - amenitiesA;
// // //         });
// // //         break;
// // //       default:
// // //         break;
// // //     }

// // //     setFilteredProperties(result);
// // //   }, [sortBy, properties]);

// // //   const updateFilters = (newFilters) => {
// // //     setFilters(prev => ({ ...prev, ...newFilters }));
// // //     setCurrentPage(1);
// // //   };

// // //   const resetFilters = () => {
// // //     setFilters({
// // //       regions: [],
// // //       floorCounts: [],
// // //       constructionYears: [],
// // //       amenities: []
// // //     });
// // //     setCurrentPage(1);
// // //   };

// // //   const handlePageChange = (page) => {
// // //     setCurrentPage(page);
// // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // //   };

// // //   // استخراج گزینه‌های فیلتر
// // //   const getFilterOptionsFromData = () => {
// // //     const uniqueRegions = [...new Set(properties.map(p => p.regionName))];
// // //     const uniqueFloorCounts = [...new Set(properties.map(p => p.countFloor).filter(count => count > 0))];
// // //     const uniqueYears = [...new Set(properties.map(p => p.constructionYear))];
    
// // //     const amenities = [
// // //       { id: 'elevator', label: 'آسانسور', count: properties.filter(p => p.isHasElevator).length },
// // //       { id: 'parking', label: 'پارکینگ', count: properties.filter(p => p.isHasParking).length },
// // //       { id: 'pool', label: 'استخر', count: properties.filter(p => p.isHasPool).length },
// // //       { id: 'storeRoom', label: 'انباری', count: properties.filter(p => p.isHasStoreRoom).length }
// // //     ];

// // //     return {
// // //       regions: uniqueRegions.map(region => ({
// // //         id: region,
// // //         label: region,
// // //         count: properties.filter(p => p.regionName === region).length
// // //       })),
// // //       floorCounts: uniqueFloorCounts.map(count => ({
// // //         id: count.toString(),
// // //         label: `${count} طبقه`,
// // //         count: properties.filter(p => p.countFloor === count).length
// // //       })),
// // //       constructionYears: uniqueYears.map(year => ({
// // //         id: year.toString(),
// // //         label: year.toString(),
// // //         count: properties.filter(p => p.constructionYear === year).length
// // //       })),
// // //       amenities: amenities.filter(a => a.count > 0)
// // //     };
// // //   };

// // //   const filterOptions = properties.length > 0 ? getFilterOptionsFromData() : {
// // //     regions: [],
// // //     floorCounts: [],
// // //     constructionYears: [],
// // //     amenities: []
// // //   };

// // //   // تعداد ستون‌ها بر اساس سایز صفحه
// // //   const getColumnsCount = () => {
// // //     if (screenSize.isMobile) return 1;
// // //     if (screenSize.isTablet) return 2;
// // //     return 4; // دسکتاپ ۳ ستون
// // //   };

// // //   // رندر ملک‌ها با بنر بین ردیف‌ها
// // //   const renderPropertiesWithBanners = () => {
// // //     const items = [];
// // //     const columnsCount = getColumnsCount();
// // //     const rows = Math.ceil(filteredProperties.length / columnsCount);
    
// // //     for (let row = 0; row < rows; row++) {
// // //       const startIdx = row * columnsCount;
// // //       const rowProperties = filteredProperties.slice(startIdx, startIdx + columnsCount);
      
// // //       items.push(
// // //         <div 
// // //           key={`row-${row}`} 
// // //           className="property-row"
// // //         >
// // //           {rowProperties.map(property => (
// // //             <RealEstateCard key={property.id} property={property} />
// // //           ))}
// // //         </div>
// // //       );

// // //       // اضافه کردن بنر بین ردیف‌های زوج
// // //       if ((row + 1) % 2 === 0 && row < rows - 1) {
// // //         items.push(
// // //           <div key={`banner-${row}`} className="banner-container">
// // //             <div className="ad-banner">
// // //               <span>آگهی ویژه</span>
// // //             </div>
// // //           </div>
// // //         );
// // //       }
// // //     }

// // //     return items;
// // //   };

// // //   return (
// // //     <div className="real-estate-page">
// // //       {/* هدر */}
// // //       {/* <Header totalCount={totalCount} /> */}

// // //       <div className="real-estate-page-container">
    
// // //         {/* <div className="real-estate-header">
// // //           <div className="property-breadcrumb">
// // //             <span>خانه</span>
// // //             <span className="separator">/</span>
// // //             <span>املاک</span>
// // //             <span className="separator">/</span>
// // //             <span className="current">لیست آگهی‌ها</span>
// // //           </div>
          
// // //           <div className="property-header-row">
// // //             <h1 className="property-title">لیست املاک</h1>
// // //             <div className="property-date">
// // //               <span className="date-range">
// // //                 {new Date().toLocaleDateString('fa-IR')}
// // //               </span>
// // //             </div>
// // //           </div>
          
// // //            <p className="property-count">
// // //             {totalCount.toLocaleString('fa-IR')} ملک یافت شد
// // //           </p> 
// // //         </div> */}

// // //         {/* نوار مرتب‌سازی */}
// // //         {/* <div className="sort-bar-container">
// // //           <SortBar 
// // //             currentSort={sortBy} 
// // //             onSortChange={setSortBy}
// // //             options={[
// // //               { value: 'پیشنهاد ویژه', label: 'پیشنهاد ویژه' },
// // //               { value: 'جدیدترین', label: 'جدیدترین' },
// // //               { value: 'قدیمی‌ترین', label: 'قدیمی‌ترین' },
// // //               { value: 'بیشترین امکانات', label: 'بیشترین امکانات' }
// // //             ]}
// // //           />
// // //         </div> */}
        
// // //         {/* محتوای اصلی */}
// // //         <div className="real-estate-content">
// // //           {/* سایدبار فیلتر - فقط در دسکتاپ و تبلت */}
// // //           {!screenSize.isMobile && (
// // //             <div className="real-estate-sidebar">
// // //               <FilterSidebar 
// // //                 filters={filters}
// // //                 onFilterChange={updateFilters}
// // //                 onResetFilters={resetFilters}
// // //                 totalResults={filteredProperties.length}
// // //                 filterOptions={filterOptions}
// // //               />
// // //             </div>
// // //           )}

// // //           {/* لیست املاک */}
// // //           <div className="real-estate-list">
// // //             {loading ? (
// // //               <div className="property-grid skeleton-grid">
// // //                 {[...Array(6)].map((_, index) => (
// // //                   <div key={index} className="skeleton-wrapper">
// // //                     <SkeletonCardRealEstate />
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             ) : error ? (
// // //               <div className="error-container">
// // //                 <div className="error-message">{error}</div>
// // //                 <button onClick={() => fetchProperties(currentPage)} className="retry-button">
// // //                   تلاش مجدد
// // //                 </button>
// // //               </div>
// // //             ) : (
// // //               <>
// // //                 <div className="properties-with-banners">
// // //                   {renderPropertiesWithBanners()}
// // //                 </div>

// // //                 {totalPages > 1 && (
// // //                   <Pagination
// // //                     currentPage={currentPage}
// // //                     totalPages={totalPages}
// // //                     onPageChange={handlePageChange}
// // //                   />
// // //                 )}
// // //               </>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* منوی فیلتر موبایل */}
// // //         <MobileFilterMenu 
// // //           filters={filters}
// // //           onFilterChange={updateFilters}
// // //           onResetFilters={resetFilters}
// // //           totalResults={filteredProperties.length}
// // //           filterOptions={filterOptions}
// // //           isMobile={screenSize.isMobile}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default RealEstatePageDetail;

// // // RealEstatePage.jsx
// // import React, { useState, useEffect, useCallback } from 'react';
// // import { useLocation } from 'react-router-dom';
// // import RealEstateCard from './RealEstateCard';
// // import FilterSidebar from './FilterSidebar';
// // import SortBar from './SortBar';
// // import SkeletonCardRealEstate from './SkeletonCardRealEstate';
// // import MobileFilterMenu from './MobileFilterMenu';
// // import Header from './Header';
// // import Pagination from './Pagination';
// // import './RealEstatePage.css';

// // const RealEstatePageDetail = () => {
// //   const location = useLocation();
// //   const { tabId, type } = location.state || {};
// //   const [properties, setProperties] = useState([]);
// //   const [filteredProperties, setFilteredProperties] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [sortBy, setSortBy] = useState('پیشنهاد ویژه');
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const [totalCount, setTotalCount] = useState(0);
// //   const [filters, setFilters] = useState({
// //     regions: [],
// //     floorCounts: [],
// //     constructionYears: [],
// //     amenities: [],
// //     yearMin: undefined,
// //     yearMax: undefined,
// //     areaMin: undefined,
// //     areaMax: undefined,
// //     priceMin: undefined,
// //     priceMax: undefined,
// //     floorMin: undefined,
// //     floorMax: undefined,
// //     roomMin: undefined,
// //     roomMax: undefined
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
// //     };

// //     handleResize();
// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   // =============== ساخت پارامترهای فیلتر ===============
// //   const buildFilterParams = useCallback(() => {
// //     const params = new URLSearchParams();
    
// //     // پارامترهای پایه
// //     params.append('tabId', tabId || '1');
// //     params.append('pageNumber', currentPage.toString());
// //     params.append('pageSize', '12');

// //     // =============== فیلتر مناطق (محله‌ها) ===============
// //     if (filters.regions && filters.regions.length > 0) {
// //       // استخراج childId ها از کلیدهای انتخاب شده
// //       const childIds = filters.regions.map(key => {
// //         const parts = key.split('-');
// //         return parseInt(parts[1]); // childId
// //       }).filter(id => !isNaN(id));
      
// //       if (childIds.length > 0) {
// //         params.append('childIds', childIds.join(','));
// //       }
// //     }

// //     // =============== فیلتر محدوده قیمت ===============
// //     if (filters.priceMin !== undefined && filters.priceMin !== null && filters.priceMin !== '') {
// //       params.append('priceMin', filters.priceMin.toString());
// //     }
// //     if (filters.priceMax !== undefined && filters.priceMax !== null && filters.priceMax !== '') {
// //       params.append('priceMax', filters.priceMax.toString());
// //     }

// //     // =============== فیلتر محدوده متراژ ===============
// //     if (filters.areaMin !== undefined && filters.areaMin !== null && filters.areaMin !== '') {
// //       params.append('areaMin', filters.areaMin.toString());
// //     }
// //     if (filters.areaMax !== undefined && filters.areaMax !== null && filters.areaMax !== '') {
// //       params.append('areaMax', filters.areaMax.toString());
// //     }

// //     // =============== فیلتر محدوده سال ساخت ===============
// //     if (filters.yearMin !== undefined && filters.yearMin !== null && filters.yearMin !== '') {
// //       params.append('yearMin', filters.yearMin.toString());
// //     }
// //     if (filters.yearMax !== undefined && filters.yearMax !== null && filters.yearMax !== '') {
// //       params.append('yearMax', filters.yearMax.toString());
// //     }

// //     // =============== فیلتر محدوده طبقات ===============
// //     if (filters.floorMin !== undefined && filters.floorMin !== null && filters.floorMin !== '') {
// //       params.append('floorMin', filters.floorMin.toString());
// //     }
// //     if (filters.floorMax !== undefined && filters.floorMax !== null && filters.floorMax !== '') {
// //       params.append('floorMax', filters.floorMax.toString());
// //     }

// //     // =============== فیلتر محدوده اتاق ===============
// //     if (filters.roomMin !== undefined && filters.roomMin !== null && filters.roomMin !== '') {
// //       params.append('roomMin', filters.roomMin.toString());
// //     }
// //     if (filters.roomMax !== undefined && filters.roomMax !== null && filters.roomMax !== '') {
// //       params.append('roomMax', filters.roomMax.toString());
// //     }

// //     // =============== فیلتر امکانات ===============
// //     if (filters.amenities && filters.amenities.length > 0) {
// //       // تبدیل به فرمت مورد نیاز API
// //       const amenitiesParams = [];
// //       if (filters.amenities.includes('elevator')) amenitiesParams.push('isHasElevator=true');
// //       if (filters.amenities.includes('parking')) amenitiesParams.push('isHasParking=true');
// //       if (filters.amenities.includes('pool')) amenitiesParams.push('isHasPool=true');
// //       if (filters.amenities.includes('storeRoom')) amenitiesParams.push('isHasStoreRoom=true');
      
// //       if (amenitiesParams.length > 0) {
// //         params.append('amenities', amenitiesParams.join('&'));
// //       }
// //     }

// //     // =============== فیلتر سال ساخت (چک‌باکس) ===============
// //     if (filters.constructionYears && filters.constructionYears.length > 0) {
// //       params.append('constructionYears', filters.constructionYears.join(','));
// //     }
// //   console.log('=== پارامترهای نهایی ===');
// //   console.log('URLSearchParams size:', [...params].length);
// //   console.log('All params:', params.toString());
// //   console.log('All params entries:', [...params.entries()]);
// //     return params;
// //   }, [filters, currentPage, tabId]);

// //   // =============== دریافت داده از API با فیلترها ===============
// //   const fetchProperties = useCallback(async () => {
// //     setLoading(true);
// //     setError(null);
    
// //     try {
// //       const params = buildFilterParams();
// //       console.log('paramsssssssssssssssssssssssssss',params);
// //       const url = `https://localhost:7178/api/RealEstatePage/GetRandomLastItemRealEstatesWithCategoryAsync?${params}`;
      
// //       console.log('Fetching URL:', url); // برای دیباگ

// //       const response = await fetch(url);

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const result = await response.json();
      
// //       if (result.status === 200 && result.data) {
// //         const itemsWithImages = result.data.items.map(item => ({
// //           ...item,
// //           imageUrl: [`https://localhost:7178/${item.address}`]
// //         }));
        
// //         setProperties(itemsWithImages);
// //         setFilteredProperties(itemsWithImages);
// //         setTotalPages(result.data.totalPages);
// //         setTotalCount(result.data.totalCount);
// //         setCurrentPage(result.data.pageNumber);
// //       }
// //     } catch (err) {
// //       console.error('Error fetching properties:', err);
// //       setError('خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [buildFilterParams]);

// //   // =============== بارگذاری با تغییر فیلترها یا صفحه ===============
// //   useEffect(() => {
// //     fetchProperties();
// //   }, [fetchProperties]);

// //   // =============== اعمال مرتب‌سازی ===============
// //   useEffect(() => {
// //     if (properties.length === 0) return;

// //     let result = [...properties];

// //     switch(sortBy) {
// //       case 'جدیدترین':
// //         result.sort((a, b) => b.constructionYear - a.constructionYear);
// //         break;
// //       case 'قدیمی‌ترین':
// //         result.sort((a, b) => a.constructionYear - b.constructionYear);
// //         break;
// //       case 'بیشترین امکانات':
// //         result.sort((a, b) => {
// //           const amenitiesA = [a.isHasElevator, a.isHasParking, a.isHasPool, a.isHasStoreRoom].filter(Boolean).length;
// //           const amenitiesB = [b.isHasElevator, b.isHasParking, b.isHasPool, b.isHasStoreRoom].filter(Boolean).length;
// //           return amenitiesB - amenitiesA;
// //         });
// //         break;
// //       default:
// //         break;
// //     }

// //     setFilteredProperties(result);
// //   }, [sortBy, properties]);

// //   // =============== به‌روزرسانی فیلترها ===============
// //   const updateFilters = (newFilters) => {
// //     setFilters(prev => ({ ...prev, ...newFilters }));
// //     setCurrentPage(1); // رفتن به صفحه اول
// //   };

// //   // =============== ریست فیلترها ===============
// //   const resetFilters = () => {
// //     setFilters({
// //       regions: [],
// //       floorCounts: [],
// //       constructionYears: [],
// //       amenities: [],
// //       yearMin: undefined,
// //       yearMax: undefined,
// //       areaMin: undefined,
// //       areaMax: undefined,
// //       priceMin: undefined,
// //       priceMax: undefined,
// //       floorMin: undefined,
// //       floorMax: undefined,
// //       roomMin: undefined,
// //       roomMax: undefined
// //     });
// //     setCurrentPage(1);
// //   };

// //   const handlePageChange = (page) => {
// //     setCurrentPage(page);
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   };

// //   // =============== استخراج گزینه‌های فیلتر ===============
// //   const getFilterOptionsFromData = () => {
// //     const uniqueRegions = [...new Set(properties.map(p => p.regionName))];
// //     const uniqueFloorCounts = [...new Set(properties.map(p => p.countFloor).filter(count => count > 0))];
// //     const uniqueYears = [...new Set(properties.map(p => p.constructionYear))];
    
// //     const amenities = [
// //       { id: 'elevator', label: 'آسانسور', count: properties.filter(p => p.isHasElevator).length },
// //       { id: 'parking', label: 'پارکینگ', count: properties.filter(p => p.isHasParking).length },
// //       { id: 'pool', label: 'استخر', count: properties.filter(p => p.isHasPool).length },
// //       { id: 'storeRoom', label: 'انباری', count: properties.filter(p => p.isHasStoreRoom).length }
// //     ];

// //     return {
// //       regions: uniqueRegions.map(region => ({
// //         id: region,
// //         label: region,
// //         count: properties.filter(p => p.regionName === region).length
// //       })),
// //       floorCounts: uniqueFloorCounts.map(count => ({
// //         id: count.toString(),
// //         label: `${count} طبقه`,
// //         count: properties.filter(p => p.countFloor === count).length
// //       })),
// //       constructionYears: uniqueYears.map(year => ({
// //         id: year.toString(),
// //         label: year.toString(),
// //         count: properties.filter(p => p.constructionYear === year).length
// //       })),
// //       amenities: amenities.filter(a => a.count > 0)
// //     };
// //   };

// //   const filterOptions = properties.length > 0 ? getFilterOptionsFromData() : {
// //     regions: [],
// //     floorCounts: [],
// //     constructionYears: [],
// //     amenities: []
// //   };

// //   // =============== تعداد ستون‌ها بر اساس سایز صفحه ===============
// //   const getColumnsCount = () => {
// //     if (screenSize.isMobile) return 1;
// //     if (screenSize.isTablet) return 2;
// //     return 4;
// //   };

// //   // =============== رندر ملک‌ها با بنر بین ردیف‌ها ===============
// //   const renderPropertiesWithBanners = () => {
// //     const items = [];
// //     const columnsCount = getColumnsCount();
// //     const rows = Math.ceil(filteredProperties.length / columnsCount);
    
// //     for (let row = 0; row < rows; row++) {
// //       const startIdx = row * columnsCount;
// //       const rowProperties = filteredProperties.slice(startIdx, startIdx + columnsCount);
      
// //       items.push(
// //         <div key={`row-${row}`} className="property-row">
// //           {rowProperties.map(property => (
// //             <RealEstateCard key={property.id} property={property} />
// //           ))}
// //         </div>
// //       );

// //       if ((row + 1) % 2 === 0 && row < rows - 1) {
// //         items.push(
// //           <div key={`banner-${row}`} className="banner-container">
// //             <div className="ad-banner">
// //               <span>آگهی ویژه</span>
// //             </div>
// //           </div>
// //         );
// //       }
// //     }

// //     return items;
// //   };

// //   return (
// //     <div className="real-estate-page">
// //       <div className="real-estate-page-container">
// //         {/* محتوای اصلی */}
// //         <div className="real-estate-content">
// //           {/* سایدبار فیلتر */}
// //           {!screenSize.isMobile && (
// //             <div className="real-estate-sidebar">
// //               <FilterSidebar 
// //                 filters={filters}
// //                 onFilterChange={updateFilters}
// //                 onResetFilters={resetFilters}
// //                 totalResults={filteredProperties.length}
// //                 filterOptions={filterOptions}
// //               />
// //             </div>
// //           )}

// //           {/* لیست املاک */}
// //           <div className="real-estate-list">
// //             {loading ? (
// //               <div className="property-grid skeleton-grid">
// //                 {[...Array(6)].map((_, index) => (
// //                   <div key={index} className="skeleton-wrapper">
// //                     <SkeletonCardRealEstate />
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : error ? (
// //               <div className="error-container">
// //                 <div className="error-message">{error}</div>
// //                 <button onClick={() => fetchProperties()} className="retry-button">
// //                   تلاش مجدد
// //                 </button>
// //               </div>
// //             ) : (
// //               <>
// //                 <div className="properties-with-banners">
// //                   {renderPropertiesWithBanners()}
// //                 </div>

// //                 {totalPages > 1 && (
// //                   <Pagination
// //                     currentPage={currentPage}
// //                     totalPages={totalPages}
// //                     onPageChange={handlePageChange}
// //                   />
// //                 )}
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* منوی فیلتر موبایل */}
// //         <MobileFilterMenu 
// //           filters={filters}
// //           onFilterChange={updateFilters}
// //           onResetFilters={resetFilters}
// //           totalResults={filteredProperties.length}
// //           filterOptions={filterOptions}
// //           isMobile={screenSize.isMobile}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default RealEstatePageDetail;

// // RealEstatePage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { useLocation } from 'react-router-dom';
// import RealEstateCard from './RealEstateCard';
// import FilterSidebar from './FilterSidebar';
// import SortBar from './SortBar';
// import SkeletonCardRealEstate from './SkeletonCardRealEstate';
// import MobileFilterMenu from './MobileFilterMenu';
// import Header from './Header';
// import Pagination from './Pagination';
// import './RealEstatePage.css';

// const RealEstatePageDetail = () => {
//   const location = useLocation();
//   const { tabId, type } = location.state || {};
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortBy, setSortBy] = useState('پیشنهاد ویژه');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const [filters, setFilters] = useState({
//     regions: [],
//     floorCounts: [],
//     constructionYears: [],
//     amenities: [],
//     yearMin: undefined,
//     yearMax: undefined,
//     areaMin: undefined,
//     areaMax: undefined,
//     priceMin: undefined,
//     priceMax: undefined,
//     floorMin: undefined,
//     floorMax: undefined,
//     roomMin: undefined,
//     roomMax: undefined
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

//   // =============== ساخت پارامترهای فیلتر برای API ===============
//   const buildFilterParams = useCallback(() => {
//     const params = new URLSearchParams();
//         const savedCity = localStorage.getItem('selectedCity');
//           const city = JSON.parse(savedCity);
//     // پارامترهای پایه
//     params.append('TabId', tabId || '1');
//     params.append('PageNumber', currentPage.toString());
//     params.append('PageSize', '20');
//     params.append('RegionId',city.id)
//     // =============== فیلتر مناطق (ChildIds) ===============
//     if (filters.regions && filters.regions.length > 0) {
//       const childIds = filters.regions.map(key => {
//         const parts = key.split('-');
//         return parseInt(parts[1]);
//       }).filter(id => !isNaN(id));
      
//       if (childIds.length > 0) {
//         params.append('ChildIds', childIds.join(','));
//       }
//     }

//     // =============== فیلتر سال ساخت (ConstructionYears) ===============
//     if (filters.constructionYears && filters.constructionYears.length > 0) {
//       params.append('ConstructionYears', filters.constructionYears.join(','));
//     }

//     // =============== فیلتر محدوده قیمت (با تبدیل به long) ===============
//     if (filters.priceMin !== undefined && filters.priceMin !== null && filters.priceMin !== '') {
//       params.append('PriceMin', Math.round(Number(filters.priceMin)).toString());
//     }
//     if (filters.priceMax !== undefined && filters.priceMax !== null && filters.priceMax !== '') {
//       params.append('PriceMax', Math.round(Number(filters.priceMax)).toString());
//     }

//     // =============== فیلتر محدوده متراژ ===============
//     if (filters.areaMin !== undefined && filters.areaMin !== null && filters.areaMin !== '') {
//       params.append('AreaMin', Math.round(Number(filters.areaMin)).toString());
//     }
//     if (filters.areaMax !== undefined && filters.areaMax !== null && filters.areaMax !== '') {
//       params.append('AreaMax', Math.round(Number(filters.areaMax)).toString());
//     }

//     // =============== فیلتر محدوده سال ساخت ===============
//     if (filters.yearMin !== undefined && filters.yearMin !== null && filters.yearMin !== '') {
//       params.append('YearMin', Math.round(Number(filters.yearMin)).toString());
//     }
//     if (filters.yearMax !== undefined && filters.yearMax !== null && filters.yearMax !== '') {
//       params.append('YearMax', Math.round(Number(filters.yearMax)).toString());
//     }

//     // =============== فیلتر محدوده طبقات ===============
//     if (filters.floorMin !== undefined && filters.floorMin !== null && filters.floorMin !== '') {
//       params.append('FloorMin', Math.round(Number(filters.floorMin)).toString());
//     }
//     if (filters.floorMax !== undefined && filters.floorMax !== null && filters.floorMax !== '') {
//       params.append('FloorMax', Math.round(Number(filters.floorMax)).toString());
//     }

//     // =============== فیلتر محدوده اتاق ===============
//     if (filters.roomMin !== undefined && filters.roomMin !== null && filters.roomMin !== '') {
//       params.append('RoomMin', Math.round(Number(filters.roomMin)).toString());
//     }
//     if (filters.roomMax !== undefined && filters.roomMax !== null && filters.roomMax !== '') {
//       params.append('RoomMax', Math.round(Number(filters.roomMax)).toString());
//     }

//     // =============== فیلتر امکانات ===============
//     if (filters.amenities && filters.amenities.length > 0) {
//       if (filters.amenities.includes('elevator')) params.append('IsHasElevator', 'true');
//       if (filters.amenities.includes('parking')) params.append('IsHasParking', 'true');
//       if (filters.amenities.includes('pool')) params.append('IsHasPool', 'true');
//       if (filters.amenities.includes('storeRoom')) params.append('IsHasStoreRoom', 'true');
//     }

//     // =============== مرتب‌سازی - فقط در صورت انتخاب غیر از پیش‌فرض ===============
//     if (sortBy && sortBy !== 'پیشنهاد ویژه') {
//       params.append('SortBy', sortBy);
//     }

//     console.log('=== پارامترهای نهایی ===');
//     console.log('All params:', params.toString());
    
//     return params;
//   }, [filters, currentPage, tabId, sortBy]);

//   // =============== دریافت داده از API با فیلترها ===============
//   const fetchProperties = useCallback(async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const params = buildFilterParams();
      
//       // حذف پارامترهای خالی
//       const filteredParams = new URLSearchParams();
//       for (const [key, value] of params.entries()) {
//         if (value && value !== '' && value !== 'undefined' && value !== 'null') {
//           filteredParams.append(key, value);
//         }
//       }
      
//       const url = `https://localhost:7178/api/RealEstatePage/GetRandomLastItemRealEstatesWithCategoryAsync?${filteredParams.toString()}`;
      
//       console.log('Fetching URL:', url);

//       const response = await fetch(url);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Error response:', errorText);
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       const result = await response.json();
      
//       if (result.status === 200 && result.data) {
//         const itemsWithImages = result.data.items.map(item => ({
//           ...item,
//           imageUrl: [`https://localhost:7178/${item.address}`]
//         }));
        
//         setProperties(itemsWithImages);
//         setFilteredProperties(itemsWithImages);
//         setTotalPages(result.data.totalPages);
//         setTotalCount(result.data.totalCount);
//         setCurrentPage(result.data.pageNumber);
//       }
//     } catch (err) {
//       console.error('Error fetching properties:', err);
//       setError('خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.');
//     } finally {
//       setLoading(false);
//     }
//   }, [buildFilterParams]);

//   // =============== بارگذاری با تغییر فیلترها یا صفحه ===============
//   useEffect(() => {
//     fetchProperties();
//   }, [fetchProperties]);

//   // =============== اعمال مرتب‌سازی (در صورت عدم ارسال به API) ===============
//   useEffect(() => {
//     if (properties.length === 0) return;

//     // اگر مرتب‌سازی پیش‌فرض است یا به API ارسال شده، نیازی به مرتب‌سازی مجدد نیست
//     if (sortBy === 'پیشنهاد ویژه') {
//       setFilteredProperties(properties);
//       return;
//     }

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
//         break;
//     }

//     setFilteredProperties(result);
//   }, [sortBy, properties]);

//   // =============== به‌روزرسانی فیلترها ===============
//   const updateFilters = (newFilters) => {
//     setFilters(prev => ({ ...prev, ...newFilters }));
//     setCurrentPage(1);
//   };

//   // =============== ریست فیلترها ===============
//   const resetFilters = () => {
//     setFilters({
//       regions: [],
//       floorCounts: [],
//       constructionYears: [],
//       amenities: [],
//       yearMin: undefined,
//       yearMax: undefined,
//       areaMin: undefined,
//       areaMax: undefined,
//       priceMin: undefined,
//       priceMax: undefined,
//       floorMin: undefined,
//       floorMax: undefined,
//       roomMin: undefined,
//       roomMax: undefined
//     });
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // =============== استخراج گزینه‌های فیلتر ===============
//   const getFilterOptionsFromData = () => {
//     if (properties.length === 0) {
//       return {
//         regions: [],
//         floorCounts: [],
//         constructionYears: [],
//         amenities: []
//       };
//     }

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
//         label: year.toString(),
//         count: properties.filter(p => p.constructionYear === year).length
//       })),
//       amenities: amenities.filter(a => a.count > 0)
//     };
//   };

//   const filterOptions = getFilterOptionsFromData();

//   // =============== تعداد ستون‌ها بر اساس سایز صفحه ===============
//   const getColumnsCount = () => {
//     if (screenSize.isMobile) return 1;
//     if (screenSize.isTablet) return 2;
//     return 4;
//   };

//   // =============== رندر ملک‌ها با بنر بین ردیف‌ها ===============
//   const renderPropertiesWithBanners = () => {
//     const items = [];
//     const columnsCount = getColumnsCount();
//     const rows = Math.ceil(filteredProperties.length / columnsCount);
    
//     for (let row = 0; row < rows; row++) {
//       const startIdx = row * columnsCount;
//       const rowProperties = filteredProperties.slice(startIdx, startIdx + columnsCount);
      
//       items.push(
//         <div key={`row-${row}`} className="property-row">
//           {rowProperties.map(property => (
//             <RealEstateCard key={property.id} property={property} />
//           ))}
//         </div>
//       );

//       if ((row + 1) % 2 === 0 && row < rows - 1) {
//         items.push(
//           <div key={`banner-${row}`} className="banner-container">
//             <div className="ad-banner">
//               <span>آگهی ویژه</span>
//             </div>
//           </div>
//         );
//       }
//     }

//     return items;
//   };

//   return (
//     <div className="real-estate-page">
//       <div className="real-estate-page-container">
//         {/* محتوای اصلی */}
//         <div className="real-estate-content">
//           {/* سایدبار فیلتر */}
//           {!screenSize.isMobile && (
//             <div className="real-estate-sidebar">
//               <FilterSidebar 
//                 filters={filters}
//                 onFilterChange={updateFilters}
//                 onResetFilters={resetFilters}
//                 totalResults={filteredProperties.length}
//                 filterOptions={filterOptions}
//               />
//             </div>
//           )}

//           {/* لیست املاک */}
//           <div className="real-estate-list">
//             {loading ? (
//               <div className="property-grid skeleton-grid">
//                 {[...Array(6)].map((_, index) => (
//                   <div key={index} className="skeleton-wrapper">
//                     <SkeletonCardRealEstate />
//                   </div>
//                 ))}
//               </div>
//             ) : error ? (
//               <div className="error-container">
//                 <div className="error-message">{error}</div>
//                 <button onClick={() => fetchProperties()} className="retry-button">
//                   تلاش مجدد
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <div className="properties-with-banners">
//                   {renderPropertiesWithBanners()}
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

//         {/* منوی فیلتر موبایل */}
//         <MobileFilterMenu 
//           filters={filters}
//           onFilterChange={updateFilters}
//           onResetFilters={resetFilters}
//           totalResults={filteredProperties.length}
//           filterOptions={filterOptions}
//           isMobile={screenSize.isMobile}
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
    amenities: [],
    yearMin: undefined,
    yearMax: undefined,
    areaMin: undefined,
    areaMax: undefined,
    priceMin: undefined,
    priceMax: undefined,
    floorMin: undefined,
    floorMax: undefined,
    roomMin: undefined,
    roomMax: undefined
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

  // =============== ساخت پارامترهای فیلتر برای API ===============
  const buildFilterParams = useCallback(() => {
    const params = new URLSearchParams();
        const savedCity = localStorage.getItem('selectedCity');
          const city = JSON.parse(savedCity);
    // پارامترهای پایه
    params.append('TabId', tabId || '1');
    params.append('PageNumber', currentPage.toString());
    params.append('PageSize', '20');
    params.append('RegionId',city.id)
    // =============== فیلتر مناطق (ChildIds) ===============
    if (filters.regions && filters.regions.length > 0) {
      const childIds = filters.regions.map(key => {
        const parts = key.split('-');
        return parseInt(parts[1]);
      }).filter(id => !isNaN(id));
      
      if (childIds.length > 0) {
        params.append('ChildIds', childIds.join(','));
      }
    }

    // =============== فیلتر سال ساخت (ConstructionYears) ===============
    if (filters.constructionYears && filters.constructionYears.length > 0) {
      params.append('ConstructionYears', filters.constructionYears.join(','));
    }

    // =============== فیلتر محدوده قیمت (با تبدیل به long) ===============
    if (filters.priceMin !== undefined && filters.priceMin !== null && filters.priceMin !== '') {
      params.append('PriceMin', Math.round(Number(filters.priceMin)).toString());
    }
    if (filters.priceMax !== undefined && filters.priceMax !== null && filters.priceMax !== '') {
      params.append('PriceMax', Math.round(Number(filters.priceMax)).toString());
    }

    // =============== فیلتر محدوده متراژ ===============
    if (filters.areaMin !== undefined && filters.areaMin !== null && filters.areaMin !== '') {
      params.append('AreaMin', Math.round(Number(filters.areaMin)).toString());
    }
    if (filters.areaMax !== undefined && filters.areaMax !== null && filters.areaMax !== '') {
      params.append('AreaMax', Math.round(Number(filters.areaMax)).toString());
    }

    // =============== فیلتر محدوده سال ساخت ===============
    if (filters.yearMin !== undefined && filters.yearMin !== null && filters.yearMin !== '') {
      params.append('YearMin', Math.round(Number(filters.yearMin)).toString());
    }
    if (filters.yearMax !== undefined && filters.yearMax !== null && filters.yearMax !== '') {
      params.append('YearMax', Math.round(Number(filters.yearMax)).toString());
    }

    // =============== فیلتر محدوده طبقات ===============
    if (filters.floorMin !== undefined && filters.floorMin !== null && filters.floorMin !== '') {
      params.append('FloorMin', Math.round(Number(filters.floorMin)).toString());
    }
    if (filters.floorMax !== undefined && filters.floorMax !== null && filters.floorMax !== '') {
      params.append('FloorMax', Math.round(Number(filters.floorMax)).toString());
    }

    // =============== فیلتر محدوده اتاق ===============
    if (filters.roomMin !== undefined && filters.roomMin !== null && filters.roomMin !== '') {
      params.append('RoomMin', Math.round(Number(filters.roomMin)).toString());
    }
    if (filters.roomMax !== undefined && filters.roomMax !== null && filters.roomMax !== '') {
      params.append('RoomMax', Math.round(Number(filters.roomMax)).toString());
    }

    // =============== فیلتر امکانات ===============
    if (filters.amenities && filters.amenities.length > 0) {
      if (filters.amenities.includes('elevator')) params.append('IsHasElevator', 'true');
      if (filters.amenities.includes('parking')) params.append('IsHasParking', 'true');
      if (filters.amenities.includes('pool')) params.append('IsHasPool', 'true');
      if (filters.amenities.includes('storeRoom')) params.append('IsHasStoreRoom', 'true');
    }

    // =============== مرتب‌سازی - فقط در صورت انتخاب غیر از پیش‌فرض ===============
    if (sortBy && sortBy !== 'پیشنهاد ویژه') {
      params.append('SortBy', sortBy);
    }

    console.log('=== پارامترهای نهایی ===');
    console.log('All params:', params.toString());
    
    return params;
  }, [filters, currentPage, tabId, sortBy]);

  // =============== دریافت داده از API با فیلترها ===============
  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = buildFilterParams();
      
      // حذف پارامترهای خالی
      const filteredParams = new URLSearchParams();
      for (const [key, value] of params.entries()) {
        if (value && value !== '' && value !== 'undefined' && value !== 'null') {
          filteredParams.append(key, value);
        }
      }
      
      const url = `https://localhost:7178/api/RealEstatePage/GetRandomLastItemRealEstatesWithCategoryAsync?${filteredParams.toString()}`;
      
      console.log('Fetching URL:', url);

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      
      if (result.status === 200 && result.data) {
        const itemsWithImages = result.data.items.map(item => ({
          ...item,
          imageUrl: [`https://localhost:7178/${item.address}`]
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
  }, [buildFilterParams]);

  // =============== بارگذاری با تغییر فیلترها یا صفحه ===============
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // =============== اعمال مرتب‌سازی (در صورت عدم ارسال به API) ===============
  useEffect(() => {
    if (properties.length === 0) return;

    // اگر مرتب‌سازی پیش‌فرض است یا به API ارسال شده، نیازی به مرتب‌سازی مجدد نیست
    if (sortBy === 'پیشنهاد ویژه') {
      setFilteredProperties(properties);
      return;
    }

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

  // =============== به‌روزرسانی فیلترها ===============
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  // =============== ریست فیلترها ===============
  const resetFilters = () => {
    setFilters({
      regions: [],
      floorCounts: [],
      constructionYears: [],
      amenities: [],
      yearMin: undefined,
      yearMax: undefined,
      areaMin: undefined,
      areaMax: undefined,
      priceMin: undefined,
      priceMax: undefined,
      floorMin: undefined,
      floorMax: undefined,
      roomMin: undefined,
      roomMax: undefined
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =============== استخراج گزینه‌های فیلتر ===============
  const getFilterOptionsFromData = () => {
    if (properties.length === 0) {
      return {
        regions: [],
        floorCounts: [],
        constructionYears: [],
        amenities: []
      };
    }

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

  const filterOptions = getFilterOptionsFromData();

  // =============== تعداد ستون‌ها بر اساس سایز صفحه ===============
  const getColumnsCount = () => {
    if (screenSize.isMobile) return 1;
    if (screenSize.isTablet) return 2;
    return 4;
  };

  // =============== رندر محتوای لیست ===============
  const renderContent = () => {
    if (loading) {
      return (
        <div className="property-grid skeleton-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="skeleton-wrapper">
              <SkeletonCardRealEstate />
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <div className="error-message">{error}</div>
          <button onClick={() => fetchProperties()} className="retry-button">
            تلاش مجدد
          </button>
        </div>
      );
    }

    // =============== بررسی خالی بودن نتایج ===============
    if (filteredProperties.length === 0) {
      return (
        <div className="empty-state-container">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">رکوردی یافت نشد</h3>
          <p className="empty-state-description">
            با توجه به فیلترهای انتخاب شده، هیچ ملکی یافت نشد.
          </p>
          <p className="empty-state-hint">
            می‌توانید فیلترهای خود را تغییر دهید یا حذف کنید.
          </p>
          <button 
            className="empty-state-button"
            onClick={resetFilters}
          >
            حذف همه فیلترها
          </button>
        </div>
      );
    }

    // =============== نمایش نتایج ===============
    return (
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
    );
  };

  // =============== رندر ملک‌ها با بنر بین ردیف‌ها ===============
  const renderPropertiesWithBanners = () => {
    const items = [];
    const columnsCount = getColumnsCount();
    const rows = Math.ceil(filteredProperties.length / columnsCount);
    
    for (let row = 0; row < rows; row++) {
      const startIdx = row * columnsCount;
      const rowProperties = filteredProperties.slice(startIdx, startIdx + columnsCount);
      
      items.push(
        <div key={`row-${row}`} className="property-row">
          {rowProperties.map(property => (
            <RealEstateCard key={property.id} property={property} />
          ))}
        </div>
      );

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
      <div className="real-estate-page-container">
        {/* محتوای اصلی */}
        <div className="real-estate-content">
          {/* سایدبار فیلتر */}
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
            {renderContent()}
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