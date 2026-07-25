
// // // // // // FilterSidebar.jsx
// // // // // import React, { useState, useRef } from 'react';
// // // // // import './FilterSidebar.css';

// // // // // const FilterSidebar = ({ 
// // // // //   filters, 
// // // // //   onFilterChange, 
// // // // //   onResetFilters, 
// // // // //   totalResults,
// // // // //   filterOptions = {
// // // // //     regions: [],
// // // // //     floorCounts: [],
// // // // //     constructionYears: [],
// // // // //     amenities: [],
// // // // //     minYear: 1320,
// // // // //     maxYear: 1405,
// // // // //     minArea: 20,
// // // // //     maxArea: 500,
// // // // //     minPrice: 0,
// // // // //     maxPrice: Infinity
// // // // //   }
// // // // // }) => {
// // // // //   const [expandedSections, setExpandedSections] = useState({
// // // // //     regions: true,
// // // // //     floorCounts: true,
// // // // //     constructionYears: true,
// // // // //     amenities: true,
// // // // //     areaRange: true,
// // // // //     yearRange: true,
// // // // //     priceRange: true
// // // // //   });

// // // // //   // State برای مقادیر موقت محدوده‌ها - مستقیماً از filters می‌گیریم
// // // // //   const [tempYearMin, setTempYearMin] = useState(filters.yearMin || filterOptions.minYear || 1320);
// // // // //   const [tempYearMax, setTempYearMax] = useState(filters.yearMax || filterOptions.maxYear || 1405);
  
// // // // //   const [tempAreaMin, setTempAreaMin] = useState(filters.areaMin || filterOptions.minArea || 20);
// // // // //   const [tempAreaMax, setTempAreaMax] = useState(filters.areaMax || filterOptions.maxArea || 500);
  
// // // // //   const [tempPriceMin, setTempPriceMin] = useState(
// // // // //     filters.priceMin !== undefined && filters.priceMin !== null ? filters.priceMin : ''
// // // // //   );
// // // // //   const [tempPriceMax, setTempPriceMax] = useState(
// // // // //     filters.priceMax !== undefined && filters.priceMax !== null ? filters.priceMax : ''
// // // // //   );

// // // // //   // Refs برای تایمرهای تاخیر
// // // // //   const yearTimeoutRef = useRef(null);
// // // // //   const areaTimeoutRef = useRef(null);
// // // // //   const priceTimeoutRef = useRef(null);

// // // // //   const toggleSection = (section) => {
// // // // //     setExpandedSections(prev => ({
// // // // //       ...prev,
// // // // //       [section]: !prev[section]
// // // // //     }));
// // // // //   };

// // // // //   const handleCheckboxChange = (section, value) => {
// // // // //     const currentSelection = filters[section] || [];
// // // // //     const newSelection = currentSelection.includes(value)
// // // // //       ? currentSelection.filter(item => item !== value)
// // // // //       : [...currentSelection, value];
    
// // // // //     onFilterChange({ [section]: newSelection });
// // // // //   };

// // // // //   // =============== توابع تبدیل اعداد به حروف فارسی ===============
// // // // //   const numberToPersianWords = (num) => {
// // // // //     if (num === 0 || num === '0') return 'صفر';
// // // // //     if (!num && num !== 0) return '';
    
// // // // //     const numValue = typeof num === 'string' ? parseInt(num.replace(/,/g, '')) : num;
// // // // //     if (isNaN(numValue)) return '';

// // // // //     const units = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
// // // // //     const tens = ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
// // // // //     const hundreds = ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
// // // // //     const thousands = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

// // // // //     const convertChunk = (n) => {
// // // // //       if (n === 0) return '';
      
// // // // //       let result = '';
// // // // //       const h = Math.floor(n / 100);
// // // // //       const t = Math.floor((n % 100) / 10);
// // // // //       const u = n % 10;

// // // // //       if (h > 0) {
// // // // //         result += hundreds[h];
// // // // //       }

// // // // //       if (t > 0) {
// // // // //         if (result) result += ' و ';
// // // // //         if (t === 1 && u > 0) {
// // // // //           const teens = ['', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
// // // // //           result += teens[u];
// // // // //           return result;
// // // // //         }
// // // // //         result += tens[t];
// // // // //       }

// // // // //       if (u > 0 && t !== 1) {
// // // // //         if (result) result += ' و ';
// // // // //         result += units[u];
// // // // //       }

// // // // //       return result;
// // // // //     };

// // // // //     let n = numValue;
// // // // //     if (n < 1000) {
// // // // //       return convertChunk(n) || 'صفر';
// // // // //     }

// // // // //     let result = '';
// // // // //     let chunkIndex = 0;

// // // // //     while (n > 0) {
// // // // //       const chunk = n % 1000;
// // // // //       if (chunk > 0) {
// // // // //         const chunkWords = convertChunk(chunk);
// // // // //         if (chunkWords) {
// // // // //           const thousandWord = thousands[chunkIndex];
// // // // //           const prefix = result ? ' و ' : '';
// // // // //           result = chunkWords + (thousandWord ? ' ' + thousandWord : '') + prefix + result;
// // // // //         }
// // // // //       }
// // // // //       n = Math.floor(n / 1000);
// // // // //       chunkIndex++;
// // // // //     }

// // // // //     return result || 'صفر';
// // // // //   };

// // // // //   const formatPriceWithWords = (price) => {
// // // // //     if (!price && price !== 0) return '';
// // // // //     if (price === 0) return 'صفر تومان';
    
// // // // //     const numValue = typeof price === 'string' ? parseInt(price.replace(/,/g, '')) : price;
// // // // //     if (isNaN(numValue)) return '';

// // // // //     if (numValue >= 1000000000) {
// // // // //       const billions = numValue / 1000000000;
// // // // //       if (Number.isInteger(billions)) {
// // // // //         return `${numberToPersianWords(billions)} میلیارد تومان`;
// // // // //       }
// // // // //       const billionPart = Math.floor(billions);
// // // // //       const millionPart = Math.round((billions - billionPart) * 1000);
// // // // //       let result = '';
// // // // //       if (billionPart > 0) result += `${numberToPersianWords(billionPart)} میلیارد`;
// // // // //       if (millionPart > 0) {
// // // // //         if (result) result += ' و ';
// // // // //         result += `${numberToPersianWords(millionPart)} میلیون`;
// // // // //       }
// // // // //       return result + ' تومان';
// // // // //     } else if (numValue >= 1000000) {
// // // // //       const millions = numValue / 1000000;
// // // // //       if (Number.isInteger(millions)) {
// // // // //         return `${numberToPersianWords(millions)} میلیون تومان`;
// // // // //       }
// // // // //       const millionPart = Math.floor(millions);
// // // // //       const thousandPart = Math.round((millions - millionPart) * 1000);
// // // // //       let result = '';
// // // // //       if (millionPart > 0) result += `${numberToPersianWords(millionPart)} میلیون`;
// // // // //       if (thousandPart > 0) {
// // // // //         if (result) result += ' و ';
// // // // //         result += `${numberToPersianWords(thousandPart)} هزار`;
// // // // //       }
// // // // //       return result + ' تومان';
// // // // //     } else if (numValue >= 1000) {
// // // // //       const thousands = numValue / 1000;
// // // // //       if (Number.isInteger(thousands)) {
// // // // //         return `${numberToPersianWords(thousands)} هزار تومان`;
// // // // //       }
// // // // //       return `${numberToPersianWords(numValue)} تومان`;
// // // // //     }
// // // // //     return `${numberToPersianWords(numValue)} تومان`;
// // // // //   };

// // // // //   // =============== تابع جداکننده ۳ رقم ۳ رقم ===============
// // // // //   const formatNumberWithCommas = (num) => {
// // // // //     if (num === undefined || num === null || num === '') return '';
// // // // //     const numStr = String(num).replace(/,/g, '');
// // // // //     if (numStr === '' || isNaN(numStr)) return '';
// // // // //     return Number(numStr).toLocaleString('en-US');
// // // // //   };

// // // // //   // =============== توابع مدیریت محدوده سال ===============
// // // // //   const handleYearMinChange = (e) => {
// // // // //     const value = e.target.value;
// // // // //     const numValue = value === '' ? '' : Number(value);
// // // // //     setTempYearMin(numValue);
    
// // // // //     if (yearTimeoutRef.current) clearTimeout(yearTimeoutRef.current);
// // // // //     yearTimeoutRef.current = setTimeout(() => {
// // // // //       if (numValue !== '' && !isNaN(numValue)) {
// // // // //         const validMin = Math.min(Math.max(numValue, filterOptions.minYear || 1320), filterOptions.maxYear || 1405);
// // // // //         const validMax = Math.min(Math.max(tempYearMax || filterOptions.maxYear || 1405, filterOptions.minYear || 1320), filterOptions.maxYear || 1405);
// // // // //         const finalMin = Math.min(validMin, validMax);
// // // // //         const finalMax = Math.max(validMin, validMax);
// // // // //         setTempYearMin(finalMin);
// // // // //         setTempYearMax(finalMax);
// // // // //         onFilterChange({ yearMin: finalMin, yearMax: finalMax });
// // // // //       }
// // // // //     }, 500);
// // // // //   };

// // // // //   const handleYearMaxChange = (e) => {
// // // // //     const value = e.target.value;
// // // // //     const numValue = value === '' ? '' : Number(value);
// // // // //     setTempYearMax(numValue);
    
// // // // //     if (yearTimeoutRef.current) clearTimeout(yearTimeoutRef.current);
// // // // //     yearTimeoutRef.current = setTimeout(() => {
// // // // //       if (numValue !== '' && !isNaN(numValue)) {
// // // // //         const validMin = Math.min(Math.max(tempYearMin || filterOptions.minYear || 1320, filterOptions.minYear || 1320), filterOptions.maxYear || 1405);
// // // // //         const validMax = Math.min(Math.max(numValue, filterOptions.minYear || 1320), filterOptions.maxYear || 1405);
// // // // //         const finalMin = Math.min(validMin, validMax);
// // // // //         const finalMax = Math.max(validMin, validMax);
// // // // //         setTempYearMin(finalMin);
// // // // //         setTempYearMax(finalMax);
// // // // //         onFilterChange({ yearMin: finalMin, yearMax: finalMax });
// // // // //       }
// // // // //     }, 500);
// // // // //   };

// // // // //   const resetYearRange = () => {
// // // // //     const defaultMin = filterOptions.minYear || 1320;
// // // // //     const defaultMax = filterOptions.maxYear || 1405;
// // // // //     setTempYearMin(defaultMin);
// // // // //     setTempYearMax(defaultMax);
// // // // //     onFilterChange({ yearMin: defaultMin, yearMax: defaultMax });
// // // // //   };

// // // // //   // =============== توابع مدیریت محدوده متراژ ===============
// // // // //   const handleAreaMinChange = (e) => {
// // // // //     const value = e.target.value;
// // // // //     const numValue = value === '' ? '' : Number(value);
// // // // //     setTempAreaMin(numValue);
    
// // // // //     if (areaTimeoutRef.current) clearTimeout(areaTimeoutRef.current);
// // // // //     areaTimeoutRef.current = setTimeout(() => {
// // // // //       if (numValue !== '' && !isNaN(numValue)) {
// // // // //         const validMin = Math.min(Math.max(numValue, filterOptions.minArea || 20), filterOptions.maxArea || 500);
// // // // //         const validMax = Math.min(Math.max(tempAreaMax || filterOptions.maxArea || 500, filterOptions.minArea || 20), filterOptions.maxArea || 500);
// // // // //         const finalMin = Math.min(validMin, validMax);
// // // // //         const finalMax = Math.max(validMin, validMax);
// // // // //         setTempAreaMin(finalMin);
// // // // //         setTempAreaMax(finalMax);
// // // // //         onFilterChange({ areaMin: finalMin, areaMax: finalMax });
// // // // //       }
// // // // //     }, 500);
// // // // //   };

// // // // //   const handleAreaMaxChange = (e) => {
// // // // //     const value = e.target.value;
// // // // //     const numValue = value === '' ? '' : Number(value);
// // // // //     setTempAreaMax(numValue);
    
// // // // //     if (areaTimeoutRef.current) clearTimeout(areaTimeoutRef.current);
// // // // //     areaTimeoutRef.current = setTimeout(() => {
// // // // //       if (numValue !== '' && !isNaN(numValue)) {
// // // // //         const validMin = Math.min(Math.max(tempAreaMin || filterOptions.minArea || 20, filterOptions.minArea || 20), filterOptions.maxArea || 500);
// // // // //         const validMax = Math.min(Math.max(numValue, filterOptions.minArea || 20), filterOptions.maxArea || 500);
// // // // //         const finalMin = Math.min(validMin, validMax);
// // // // //         const finalMax = Math.max(validMin, validMax);
// // // // //         setTempAreaMin(finalMin);
// // // // //         setTempAreaMax(finalMax);
// // // // //         onFilterChange({ areaMin: finalMin, areaMax: finalMax });
// // // // //       }
// // // // //     }, 500);
// // // // //   };

// // // // //   const resetAreaRange = () => {
// // // // //     const defaultMin = filterOptions.minArea || 20;
// // // // //     const defaultMax = filterOptions.maxArea || 500;
// // // // //     setTempAreaMin(defaultMin);
// // // // //     setTempAreaMax(defaultMax);
// // // // //     onFilterChange({ areaMin: defaultMin, areaMax: defaultMax });
// // // // //   };

// // // // //   // =============== توابع مدیریت محدوده قیمت ===============
// // // // //   const handlePriceMinChange = (e) => {
// // // // //     const value = e.target.value;
// // // // //     const cleanValue = value.replace(/,/g, '');
// // // // //     const numValue = cleanValue === '' ? '' : Number(cleanValue);
// // // // //     setTempPriceMin(numValue);
    
// // // // //     if (priceTimeoutRef.current) clearTimeout(priceTimeoutRef.current);
// // // // //     priceTimeoutRef.current = setTimeout(() => {
// // // // //       const min = numValue === '' ? undefined : Number(numValue);
// // // // //       const max = tempPriceMax === '' ? undefined : Number(tempPriceMax);
// // // // //       onFilterChange({ priceMin: min, priceMax: max });
// // // // //     }, 500);
// // // // //   };

// // // // //   const handlePriceMaxChange = (e) => {
// // // // //     const value = e.target.value;
// // // // //     const cleanValue = value.replace(/,/g, '');
// // // // //     const numValue = cleanValue === '' ? '' : Number(cleanValue);
// // // // //     setTempPriceMax(numValue);
    
// // // // //     if (priceTimeoutRef.current) clearTimeout(priceTimeoutRef.current);
// // // // //     priceTimeoutRef.current = setTimeout(() => {
// // // // //       const min = tempPriceMin === '' ? undefined : Number(tempPriceMin);
// // // // //       const max = numValue === '' ? undefined : Number(numValue);
// // // // //       onFilterChange({ priceMin: min, priceMax: max });
// // // // //     }, 500);
// // // // //   };

// // // // //   const resetPriceRange = () => {
// // // // //     setTempPriceMin('');
// // // // //     setTempPriceMax('');
// // // // //     onFilterChange({ priceMin: undefined, priceMax: undefined });
// // // // //   };

// // // // //   const clearAllFilters = () => {
// // // // //     onResetFilters();
// // // // //     resetYearRange();
// // // // //     resetAreaRange();
// // // // //     resetPriceRange();
// // // // //   };

// // // // //   const getSelectedCount = () => {
// // // // //     let count = 0;
// // // // //     Object.values(filters).forEach(arr => {
// // // // //       if (Array.isArray(arr)) count += arr.length;
// // // // //     });
    
// // // // //     const defaultMinYear = filterOptions.minYear || 1320;
// // // // //     const defaultMaxYear = filterOptions.maxYear || 1405;
// // // // //     const defaultMinArea = filterOptions.minArea || 20;
// // // // //     const defaultMaxArea = filterOptions.maxArea || 500;
    
// // // // //     if (filters.yearMin !== defaultMinYear || filters.yearMax !== defaultMaxYear) count++;
// // // // //     if (filters.areaMin !== defaultMinArea || filters.areaMax !== defaultMaxArea) count++;
// // // // //     if (filters.priceMin !== undefined || filters.priceMax !== undefined) count++;
    
// // // // //     return count;
// // // // //   };

// // // // //   const getActiveFilters = () => {
// // // // //     const activeFilters = [];

// // // // //     const filterLabels = {
// // // // //       regions: filterOptions.regions,
// // // // //       floorCounts: filterOptions.floorCounts,
// // // // //       constructionYears: filterOptions.constructionYears,
// // // // //       amenities: filterOptions.amenities
// // // // //     };

// // // // //     Object.keys(filterLabels).forEach(key => {
// // // // //       const selected = filters[key] || [];
// // // // //       const options = filterLabels[key] || [];
      
// // // // //       selected.forEach(id => {
// // // // //         const option = options.find(opt => opt.id === id);
// // // // //         if (option) {
// // // // //           activeFilters.push({
// // // // //             id: `${key}-${id}`,
// // // // //             label: option.label,
// // // // //             type: key,
// // // // //             value: id
// // // // //           });
// // // // //         }
// // // // //       });
// // // // //     });

// // // // //     const defaultMinYear = filterOptions.minYear || 1320;
// // // // //     const defaultMaxYear = filterOptions.maxYear || 1405;
    
// // // // //     if (filters.yearMin !== defaultMinYear || filters.yearMax !== defaultMaxYear) {
// // // // //       activeFilters.push({
// // // // //         id: 'year-range',
// // // // //         label: `سال ${filters.yearMin} تا ${filters.yearMax}`,
// // // // //         type: 'yearRange',
// // // // //         value: 'year-range'
// // // // //       });
// // // // //     }

// // // // //     const defaultMinArea = filterOptions.minArea || 20;
// // // // //     const defaultMaxArea = filterOptions.maxArea || 500;
    
// // // // //     if (filters.areaMin !== defaultMinArea || filters.areaMax !== defaultMaxArea) {
// // // // //       activeFilters.push({
// // // // //         id: 'area-range',
// // // // //         label: `${filters.areaMin} - ${filters.areaMax} متر مربع`,
// // // // //         type: 'areaRange',
// // // // //         value: 'area-range'
// // // // //       });
// // // // //     }

// // // // //     if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
// // // // //       const minText = filters.priceMin !== undefined && filters.priceMin !== null ? formatPriceWithWords(filters.priceMin) : 'هر قیمت';
// // // // //       const maxText = filters.priceMax !== undefined && filters.priceMax !== null ? formatPriceWithWords(filters.priceMax) : 'هر قیمت';
// // // // //       const priceText = `${minText} تا ${maxText}`;
// // // // //       activeFilters.push({
// // // // //         id: 'price-range',
// // // // //         label: priceText,
// // // // //         type: 'priceRange',
// // // // //         value: 'price-range'
// // // // //       });
// // // // //     }

// // // // //     return activeFilters;
// // // // //   };

// // // // //   const removeFilter = (filter) => {
// // // // //     if (filter.type === 'yearRange') {
// // // // //       resetYearRange();
// // // // //     } else if (filter.type === 'areaRange') {
// // // // //       resetAreaRange();
// // // // //     } else if (filter.type === 'priceRange') {
// // // // //       resetPriceRange();
// // // // //     } else {
// // // // //       const currentSelection = filters[filter.type] || [];
// // // // //       const newSelection = currentSelection.filter(item => item !== filter.value);
// // // // //       onFilterChange({ [filter.type]: newSelection });
// // // // //     }
// // // // //   };

// // // // //   // =============== رندر فیلتر محدوده قیمت ===============
// // // // //   const renderPriceRangeFilter = () => {
// // // // //     const minDisplay = tempPriceMin !== '' && tempPriceMin !== null && tempPriceMin !== undefined 
// // // // //       ? formatNumberWithCommas(tempPriceMin) : '';
// // // // //     const maxDisplay = tempPriceMax !== '' && tempPriceMax !== null && tempPriceMax !== undefined 
// // // // //       ? formatNumberWithCommas(tempPriceMax) : '';
    
// // // // //     const minWords = tempPriceMin !== '' && tempPriceMin !== null ? numberToPersianWords(tempPriceMin) : '';
// // // // //     const maxWords = tempPriceMax !== '' && tempPriceMax !== null ? numberToPersianWords(tempPriceMax) : '';

// // // // //     return (
// // // // //       <div className="filter-section">
// // // // //         <div 
// // // // //           className="filter-section-header" 
// // // // //           onClick={() => toggleSection('priceRange')}
// // // // //         >
// // // // //           <div className="filter-section-title">
// // // // //             <span className="icon">💰</span>
// // // // //             <span>محدوده قیمت (تومان)</span>
// // // // //           </div>
// // // // //           <span className="filter-section-toggle">
// // // // //             {expandedSections.priceRange ? '−' : '+'}
// // // // //           </span>
// // // // //         </div>
        
// // // // //         {expandedSections.priceRange && (
// // // // //           <div className="filter-section-content">
// // // // //             <div className="range-filter">
// // // // //               <div className="range-inputs">
// // // // //                 <div className="range-input-group">
// // // // //                   <label>حداقل</label>
// // // // //                   <input
// // // // //                     type="text"
// // // // //                     value={minDisplay}
// // // // //                     onChange={handlePriceMinChange}
// // // // //                     className="range-input price-input"
// // // // //                     placeholder="مثلا ۱۰۰,۰۰۰,۰۰۰"
// // // // //                     dir="ltr"
// // // // //                   />
// // // // //                   {minWords && (
// // // // //                     <span className="price-words">{minWords} تومان</span>
// // // // //                   )}
// // // // //                 </div>
// // // // //                 <div className="range-input-group">
// // // // //                   <label>حداکثر</label>
// // // // //                   <input
// // // // //                     type="text"
// // // // //                     value={maxDisplay}
// // // // //                     onChange={handlePriceMaxChange}
// // // // //                     className="range-input price-input"
// // // // //                     placeholder="مثلا ۵۰۰,۰۰۰,۰۰۰"
// // // // //                     dir="ltr"
// // // // //                   />
// // // // //                   {maxWords && (
// // // // //                     <span className="price-words">{maxWords} تومان</span>
// // // // //                   )}
// // // // //                 </div>
// // // // //               </div>
// // // // //               <div className="range-actions">
// // // // //                 <button onClick={resetPriceRange} className="reset-range-btn">
// // // // //                   ریست
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     );
// // // // //   };

// // // // //   // =============== رندر فیلتر محدوده سال ===============
// // // // //   const renderYearRangeFilter = () => {
// // // // //     return (
// // // // //       <div className="filter-section">
// // // // //         <div 
// // // // //           className="filter-section-header" 
// // // // //           onClick={() => toggleSection('yearRange')}
// // // // //         >
// // // // //           <div className="filter-section-title">
// // // // //             <span className="icon">📅</span>
// // // // //             <span>محدوده سال ساخت</span>
// // // // //           </div>
// // // // //           <span className="filter-section-toggle">
// // // // //             {expandedSections.yearRange ? '−' : '+'}
// // // // //           </span>
// // // // //         </div>
        
// // // // //         {expandedSections.yearRange && (
// // // // //           <div className="filter-section-content">
// // // // //             <div className="range-filter">
// // // // //               <div className="range-inputs">
// // // // //                 <div className="range-input-group">
// // // // //                   <label>از سال</label>
// // // // //                   <input
// // // // //                     type="number"
// // // // //                     min={filterOptions.minYear || 1320}
// // // // //                     max={filterOptions.maxYear || 1405}
// // // // //                     value={tempYearMin}
// // // // //                     onChange={handleYearMinChange}
// // // // //                     className="range-input"
// // // // //                     step="1"
// // // // //                   />
// // // // //                 </div>
// // // // //                 <div className="range-input-group">
// // // // //                   <label>تا سال</label>
// // // // //                   <input
// // // // //                     type="number"
// // // // //                     min={filterOptions.minYear || 1320}
// // // // //                     max={filterOptions.maxYear || 1405}
// // // // //                     value={tempYearMax}
// // // // //                     onChange={handleYearMaxChange}
// // // // //                     className="range-input"
// // // // //                     step="1"
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>
// // // // //               <div className="range-actions">
// // // // //                 <button onClick={resetYearRange} className="reset-range-btn">
// // // // //                   ریست
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     );
// // // // //   };

// // // // //   // =============== رندر فیلتر محدوده متراژ ===============
// // // // //   const renderAreaRangeFilter = () => {
// // // // //     return (
// // // // //       <div className="filter-section">
// // // // //         <div 
// // // // //           className="filter-section-header" 
// // // // //           onClick={() => toggleSection('areaRange')}
// // // // //         >
// // // // //           <div className="filter-section-title">
// // // // //             <span className="icon">📐</span>
// // // // //             <span>متراژ (متر مربع)</span>
// // // // //           </div>
// // // // //           <span className="filter-section-toggle">
// // // // //             {expandedSections.areaRange ? '−' : '+'}
// // // // //           </span>
// // // // //         </div>
        
// // // // //         {expandedSections.areaRange && (
// // // // //           <div className="filter-section-content">
// // // // //             <div className="range-filter">
// // // // //               <div className="range-inputs">
// // // // //                 <div className="range-input-group">
// // // // //                   <label>حداقل</label>
// // // // //                   <input
// // // // //                     type="number"
// // // // //                     min={filterOptions.minArea || 20}
// // // // //                     max={filterOptions.maxArea || 500}
// // // // //                     value={tempAreaMin}
// // // // //                     onChange={handleAreaMinChange}
// // // // //                     className="range-input"
// // // // //                     step="1"
// // // // //                   />
// // // // //                 </div>
// // // // //                 <div className="range-input-group">
// // // // //                   <label>حداکثر</label>
// // // // //                   <input
// // // // //                     type="number"
// // // // //                     min={filterOptions.minArea || 20}
// // // // //                     max={filterOptions.maxArea || 500}
// // // // //                     value={tempAreaMax}
// // // // //                     onChange={handleAreaMaxChange}
// // // // //                     className="range-input"
// // // // //                     step="1"
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>
// // // // //               <div className="range-actions">
// // // // //                 <button onClick={resetAreaRange} className="reset-range-btn">
// // // // //                   ریست
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     );
// // // // //   };

// // // // //   // =============== رندر فیلترهای دیگر ===============
// // // // //   const renderRegionFilter = () => {
// // // // //     if (!filterOptions.regions?.length) return null;

// // // // //     return (
// // // // //       <div className="filter-section">
// // // // //         <div 
// // // // //           className="filter-section-header" 
// // // // //           onClick={() => toggleSection('regions')}
// // // // //         >
// // // // //           <div className="filter-section-title">
// // // // //             <span className="icon">📍</span>
// // // // //             <span>منطقه</span>
// // // // //           </div>
// // // // //           <span className="filter-section-toggle">
// // // // //             {expandedSections.regions ? '−' : '+'}
// // // // //           </span>
// // // // //         </div>
        
// // // // //         {expandedSections.regions && (
// // // // //           <div className="filter-section-content">
// // // // //             {filterOptions.regions.map(option => (
// // // // //               <label key={option.id} className="filter-checkbox">
// // // // //                 <input
// // // // //                   type="checkbox"
// // // // //                   checked={filters.regions?.includes(option.id)}
// // // // //                   onChange={() => handleCheckboxChange('regions', option.id)}
// // // // //                 />
// // // // //                 <span className="checkbox-label">{option.label}</span>
// // // // //                 <span className="filter-count">{option.count}</span>
// // // // //               </label>
// // // // //             ))}
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     );
// // // // //   };

// // // // //   const renderFloorFilter = () => {
// // // // //     if (!filterOptions.floorCounts?.length) return null;

// // // // //     return (
// // // // //       <div className="filter-section">
// // // // //         <div 
// // // // //           className="filter-section-header" 
// // // // //           onClick={() => toggleSection('floorCounts')}
// // // // //         >
// // // // //           <div className="filter-section-title">
// // // // //             <span className="icon">🏢</span>
// // // // //             <span>تعداد طبقات</span>
// // // // //           </div>
// // // // //           <span className="filter-section-toggle">
// // // // //             {expandedSections.floorCounts ? '−' : '+'}
// // // // //           </span>
// // // // //         </div>
        
// // // // //         {expandedSections.floorCounts && (
// // // // //           <div className="filter-section-content">
// // // // //             {filterOptions.floorCounts.map(option => (
// // // // //               <label key={option.id} className="filter-checkbox">
// // // // //                 <input
// // // // //                   type="checkbox"
// // // // //                   checked={filters.floorCounts?.includes(option.id)}
// // // // //                   onChange={() => handleCheckboxChange('floorCounts', option.id)}
// // // // //                 />
// // // // //                 <span className="checkbox-label">{option.label}</span>
// // // // //                 <span className="filter-count">{option.count}</span>
// // // // //               </label>
// // // // //             ))}
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     );
// // // // //   };

// // // // //   const renderYearFilter = () => {
// // // // //     if (!filterOptions.constructionYears?.length) return null;

// // // // //     const sortedYears = [...filterOptions.constructionYears].sort((a, b) => 
// // // // //       parseInt(b.id) - parseInt(a.id)
// // // // //     );

// // // // //     return (
// // // // //       <div className="filter-section">
// // // // //         <div 
// // // // //           className="filter-section-header" 
// // // // //           onClick={() => toggleSection('constructionYears')}
// // // // //         >
// // // // //           <div className="filter-section-title">
// // // // //             <span className="icon">📅</span>
// // // // //             <span>سال ساخت</span>
// // // // //           </div>
// // // // //           <span className="filter-section-toggle">
// // // // //             {expandedSections.constructionYears ? '−' : '+'}
// // // // //           </span>
// // // // //         </div>
        
// // // // //         {expandedSections.constructionYears && (
// // // // //           <div className="filter-section-content">
// // // // //             {sortedYears.map(option => (
// // // // //               <label key={option.id} className="filter-checkbox">
// // // // //                 <input
// // // // //                   type="checkbox"
// // // // //                   checked={filters.constructionYears?.includes(option.id)}
// // // // //                   onChange={() => handleCheckboxChange('constructionYears', option.id)}
// // // // //                 />
// // // // //                 <span className="checkbox-label">
// // // // //                   <span>سال {option.label}</span>
// // // // //                   {getYearBadge(option.id)}
// // // // //                 </span>
// // // // //                 <span className="filter-count">{option.count}</span>
// // // // //               </label>
// // // // //             ))}
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     );
// // // // //   };

// // // // //   const renderAmenitiesFilter = () => {
// // // // //     if (!filterOptions.amenities?.length) return null;

// // // // //     const amenityIcons = {
// // // // //       elevator: '🛗',
// // // // //       parking: '🅿️',
// // // // //       pool: '🏊',
// // // // //       storeRoom: '📦'
// // // // //     };

// // // // //     return (
// // // // //       <div className="filter-section">
// // // // //         <div 
// // // // //           className="filter-section-header" 
// // // // //           onClick={() => toggleSection('amenities')}
// // // // //         >
// // // // //           <div className="filter-section-title">
// // // // //             <span className="icon">✨</span>
// // // // //             <span>امکانات</span>
// // // // //           </div>
// // // // //           <span className="filter-section-toggle">
// // // // //             {expandedSections.amenities ? '−' : '+'}
// // // // //           </span>
// // // // //         </div>
        
// // // // //         {expandedSections.amenities && (
// // // // //           <div className="filter-section-content">
// // // // //             {filterOptions.amenities.map(option => (
// // // // //               <label key={option.id} className="filter-checkbox">
// // // // //                 <input
// // // // //                   type="checkbox"
// // // // //                   checked={filters.amenities?.includes(option.id)}
// // // // //                   onChange={() => handleCheckboxChange('amenities', option.id)}
// // // // //                 />
// // // // //                 <span className="checkbox-label">
// // // // //                   <span className="amenity-icon">{amenityIcons[option.id] || '•'}</span>
// // // // //                   <span>{option.label}</span>
// // // // //                 </span>
// // // // //                 <span className="filter-count">{option.count}</span>
// // // // //               </label>
// // // // //             ))}
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     );
// // // // //   };

// // // // //   const selectedCount = getSelectedCount();
// // // // //   const activeFilters = getActiveFilters();

// // // // //   const getYearBadge = (year) => {
// // // // //     const currentYear = new Date().getFullYear() - 621;
// // // // //     const age = currentYear - parseInt(year);
    
// // // // //     if (age <= 2) {
// // // // //       return <span className="badge-new">نوساز</span>;
// // // // //     } else if (age <= 5) {
// // // // //       return <span className="badge-good">ممتاز</span>;
// // // // //     } else if (age >= 30) {
// // // // //       return <span className="badge-old">قدیمی</span>;
// // // // //     }
// // // // //     return null;
// // // // //   };

// // // // //   return (
// // // // //     <div className="filter-sidebar">
// // // // //       <div className="filter-sidebar-header">
// // // // //         <div className="filter-sidebar-title">
// // // // //           <span>فیلترها</span>
// // // // //           {selectedCount > 0 && (
// // // // //             <span className="filter-badge">{selectedCount}</span>
// // // // //           )}
// // // // //         </div>
// // // // //         {selectedCount > 0 && (
// // // // //           <button onClick={clearAllFilters} className="clear-all-btn">
// // // // //             حذف همه
// // // // //           </button>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* نمایش فیلترهای فعال */}
// // // // //       {activeFilters.length > 0 && (
// // // // //         <div className="active-filters-container">
// // // // //           <div className="active-filters-title">فیلترهای انتخاب شده:</div>
// // // // //           <div className="active-filters-list">
// // // // //             {activeFilters.map(filter => (
// // // // //               <div key={filter.id} className="active-filter-tag">
// // // // //                 <span title={filter.label}>{filter.label}</span>
// // // // //                 <button 
// // // // //                   className="remove-filter-btn"
// // // // //                   onClick={() => removeFilter(filter)}
// // // // //                   title="حذف فیلتر"
// // // // //                 >
// // // // //                   ✕
// // // // //                 </button>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       <div className="filter-sidebar-content">
// // // // //         {renderRegionFilter()}
// // // // //         {renderPriceRangeFilter()}
// // // // //         {renderAreaRangeFilter()}
// // // // //         {renderFloorFilter()}
// // // // //         {renderYearRangeFilter()}
// // // // //         {renderYearFilter()}
// // // // //         {renderAmenitiesFilter()}
// // // // //       </div>

// // // // //       <div className="filter-sidebar-footer">
// // // // //         <div className="total-results">
// // // // //           <span>تعداد نتایج:</span>
// // // // //           <span className="total-results-number">{totalResults}</span>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default FilterSidebar;

// // // // // FilterSidebar.jsx
// // // // import React, { useState, useRef } from 'react';
// // // // import './FilterSidebar.css';

// // // // const FilterSidebar = ({ 
// // // //   filters, 
// // // //   onFilterChange, 
// // // //   onResetFilters, 
// // // //   totalResults,
// // // //   filterOptions = {
// // // //     regions: [],
// // // //     floorCounts: [],
// // // //     constructionYears: [],
// // // //     amenities: [],
// // // //     minYear: 1320,
// // // //     maxYear: 1405,
// // // //     minArea: 20,
// // // //     maxArea: 500,
// // // //     minPrice: 0,
// // // //     maxPrice: Infinity
// // // //   }
// // // // }) => {
// // // //   const [expandedSections, setExpandedSections] = useState({
// // // //     regions: true,
// // // //     floorCounts: true,
// // // //     constructionYears: true,
// // // //     amenities: true,
// // // //     areaRange: true,
// // // //     yearRange: true,
// // // //     priceRange: true
// // // //   });

// // // //   // State برای مقادیر موقت محدوده‌ها - مستقیماً از filters می‌گیریم
// // // //   const [tempYearMin, setTempYearMin] = useState(filters.yearMin || filterOptions.minYear || 1320);
// // // //   const [tempYearMax, setTempYearMax] = useState(filters.yearMax || filterOptions.maxYear || 1405);
  
// // // //   const [tempAreaMin, setTempAreaMin] = useState(filters.areaMin || filterOptions.minArea || 20);
// // // //   const [tempAreaMax, setTempAreaMax] = useState(filters.areaMax || filterOptions.maxArea || 500);
  
// // // //   const [tempPriceMin, setTempPriceMin] = useState(
// // // //     filters.priceMin !== undefined && filters.priceMin !== null ? filters.priceMin : ''
// // // //   );
// // // //   const [tempPriceMax, setTempPriceMax] = useState(
// // // //     filters.priceMax !== undefined && filters.priceMax !== null ? filters.priceMax : ''
// // // //   );

// // // //   // Refs برای تایمرهای تاخیر
// // // //   const yearTimeoutRef = useRef(null);
// // // //   const areaTimeoutRef = useRef(null);
// // // //   const priceTimeoutRef = useRef(null);

// // // //   const toggleSection = (section) => {
// // // //     setExpandedSections(prev => ({
// // // //       ...prev,
// // // //       [section]: !prev[section]
// // // //     }));
// // // //   };

// // // //   const handleCheckboxChange = (section, value) => {
// // // //     const currentSelection = filters[section] || [];
// // // //     const newSelection = currentSelection.includes(value)
// // // //       ? currentSelection.filter(item => item !== value)
// // // //       : [...currentSelection, value];
    
// // // //     onFilterChange({ [section]: newSelection });
// // // //   };

// // // //   // =============== توابع تبدیل اعداد به حروف فارسی ===============
// // // //   const numberToPersianWords = (num) => {
// // // //     if (num === 0 || num === '0') return 'صفر';
// // // //     if (!num && num !== 0) return '';
    
// // // //     const numValue = typeof num === 'string' ? parseInt(num.replace(/,/g, '')) : num;
// // // //     if (isNaN(numValue)) return '';

// // // //     const units = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
// // // //     const tens = ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
// // // //     const hundreds = ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
// // // //     const thousands = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

// // // //     const convertChunk = (n) => {
// // // //       if (n === 0) return '';
      
// // // //       let result = '';
// // // //       const h = Math.floor(n / 100);
// // // //       const t = Math.floor((n % 100) / 10);
// // // //       const u = n % 10;

// // // //       if (h > 0) {
// // // //         result += hundreds[h];
// // // //       }

// // // //       if (t > 0) {
// // // //         if (result) result += ' و ';
// // // //         if (t === 1 && u > 0) {
// // // //           const teens = ['', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
// // // //           result += teens[u];
// // // //           return result;
// // // //         }
// // // //         result += tens[t];
// // // //       }

// // // //       if (u > 0 && t !== 1) {
// // // //         if (result) result += ' و ';
// // // //         result += units[u];
// // // //       }

// // // //       return result;
// // // //     };

// // // //     let n = numValue;
// // // //     if (n < 1000) {
// // // //       return convertChunk(n) || 'صفر';
// // // //     }

// // // //     let result = '';
// // // //     let chunkIndex = 0;

// // // //     while (n > 0) {
// // // //       const chunk = n % 1000;
// // // //       if (chunk > 0) {
// // // //         const chunkWords = convertChunk(chunk);
// // // //         if (chunkWords) {
// // // //           const thousandWord = thousands[chunkIndex];
// // // //           const prefix = result ? ' و ' : '';
// // // //           result = chunkWords + (thousandWord ? ' ' + thousandWord : '') + prefix + result;
// // // //         }
// // // //       }
// // // //       n = Math.floor(n / 1000);
// // // //       chunkIndex++;
// // // //     }

// // // //     return result || 'صفر';
// // // //   };

// // // //   const formatPriceWithWords = (price) => {
// // // //     if (!price && price !== 0) return '';
// // // //     if (price === 0) return 'صفر تومان';
    
// // // //     const numValue = typeof price === 'string' ? parseInt(price.replace(/,/g, '')) : price;
// // // //     if (isNaN(numValue)) return '';

// // // //     if (numValue >= 1000000000) {
// // // //       const billions = numValue / 1000000000;
// // // //       if (Number.isInteger(billions)) {
// // // //         return `${numberToPersianWords(billions)} میلیارد تومان`;
// // // //       }
// // // //       const billionPart = Math.floor(billions);
// // // //       const millionPart = Math.round((billions - billionPart) * 1000);
// // // //       let result = '';
// // // //       if (billionPart > 0) result += `${numberToPersianWords(billionPart)} میلیارد`;
// // // //       if (millionPart > 0) {
// // // //         if (result) result += ' و ';
// // // //         result += `${numberToPersianWords(millionPart)} میلیون`;
// // // //       }
// // // //       return result + ' تومان';
// // // //     } else if (numValue >= 1000000) {
// // // //       const millions = numValue / 1000000;
// // // //       if (Number.isInteger(millions)) {
// // // //         return `${numberToPersianWords(millions)} میلیون تومان`;
// // // //       }
// // // //       const millionPart = Math.floor(millions);
// // // //       const thousandPart = Math.round((millions - millionPart) * 1000);
// // // //       let result = '';
// // // //       if (millionPart > 0) result += `${numberToPersianWords(millionPart)} میلیون`;
// // // //       if (thousandPart > 0) {
// // // //         if (result) result += ' و ';
// // // //         result += `${numberToPersianWords(thousandPart)} هزار`;
// // // //       }
// // // //       return result + ' تومان';
// // // //     } else if (numValue >= 1000) {
// // // //       const thousands = numValue / 1000;
// // // //       if (Number.isInteger(thousands)) {
// // // //         return `${numberToPersianWords(thousands)} هزار تومان`;
// // // //       }
// // // //       return `${numberToPersianWords(numValue)} تومان`;
// // // //     }
// // // //     return `${numberToPersianWords(numValue)} تومان`;
// // // //   };

// // // //   // =============== تابع جداکننده ۳ رقم ۳ رقم ===============
// // // //   const formatNumberWithCommas = (num) => {
// // // //     if (num === undefined || num === null || num === '') return '';
// // // //     const numStr = String(num).replace(/,/g, '');
// // // //     if (numStr === '' || isNaN(numStr)) return '';
// // // //     return Number(numStr).toLocaleString('en-US');
// // // //   };

// // // //   // =============== توابع مدیریت محدوده سال ===============
// // // //   const handleYearMinChange = (e) => {
// // // //     const value = e.target.value;
// // // //     const numValue = value === '' ? '' : Number(value);
// // // //     setTempYearMin(numValue);
    
// // // //     if (yearTimeoutRef.current) clearTimeout(yearTimeoutRef.current);
// // // //     yearTimeoutRef.current = setTimeout(() => {
// // // //       if (numValue !== '' && !isNaN(numValue)) {
// // // //         const validMin = Math.min(Math.max(numValue, filterOptions.minYear || 1320), filterOptions.maxYear || 1405);
// // // //         const validMax = Math.min(Math.max(tempYearMax || filterOptions.maxYear || 1405, filterOptions.minYear || 1320), filterOptions.maxYear || 1405);
// // // //         const finalMin = Math.min(validMin, validMax);
// // // //         const finalMax = Math.max(validMin, validMax);
// // // //         setTempYearMin(finalMin);
// // // //         setTempYearMax(finalMax);
// // // //         onFilterChange({ yearMin: finalMin, yearMax: finalMax });
// // // //       }
// // // //     }, 500);
// // // //   };

// // // //   const handleYearMaxChange = (e) => {
// // // //     const value = e.target.value;
// // // //     const numValue = value === '' ? '' : Number(value);
// // // //     setTempYearMax(numValue);
    
// // // //     if (yearTimeoutRef.current) clearTimeout(yearTimeoutRef.current);
// // // //     yearTimeoutRef.current = setTimeout(() => {
// // // //       if (numValue !== '' && !isNaN(numValue)) {
// // // //         const validMin = Math.min(Math.max(tempYearMin || filterOptions.minYear || 1320, filterOptions.minYear || 1320), filterOptions.maxYear || 1405);
// // // //         const validMax = Math.min(Math.max(numValue, filterOptions.minYear || 1320), filterOptions.maxYear || 1405);
// // // //         const finalMin = Math.min(validMin, validMax);
// // // //         const finalMax = Math.max(validMin, validMax);
// // // //         setTempYearMin(finalMin);
// // // //         setTempYearMax(finalMax);
// // // //         onFilterChange({ yearMin: finalMin, yearMax: finalMax });
// // // //       }
// // // //     }, 500);
// // // //   };

// // // //   const resetYearRange = () => {
// // // //     const defaultMin = filterOptions.minYear || 1320;
// // // //     const defaultMax = filterOptions.maxYear || 1405;
// // // //     setTempYearMin(defaultMin);
// // // //     setTempYearMax(defaultMax);
// // // //     onFilterChange({ yearMin: defaultMin, yearMax: defaultMax });
// // // //   };

// // // //   // =============== توابع مدیریت محدوده متراژ ===============
// // // //   const handleAreaMinChange = (e) => {
// // // //     const value = e.target.value;
// // // //     const numValue = value === '' ? '' : Number(value);
// // // //     setTempAreaMin(numValue);
    
// // // //     if (areaTimeoutRef.current) clearTimeout(areaTimeoutRef.current);
// // // //     areaTimeoutRef.current = setTimeout(() => {
// // // //       if (numValue !== '' && !isNaN(numValue)) {
// // // //         const validMin = Math.min(Math.max(numValue, filterOptions.minArea || 20), filterOptions.maxArea || 500);
// // // //         const validMax = Math.min(Math.max(tempAreaMax || filterOptions.maxArea || 500, filterOptions.minArea || 20), filterOptions.maxArea || 500);
// // // //         const finalMin = Math.min(validMin, validMax);
// // // //         const finalMax = Math.max(validMin, validMax);
// // // //         setTempAreaMin(finalMin);
// // // //         setTempAreaMax(finalMax);
// // // //         onFilterChange({ areaMin: finalMin, areaMax: finalMax });
// // // //       }
// // // //     }, 500);
// // // //   };

// // // //   const handleAreaMaxChange = (e) => {
// // // //     const value = e.target.value;
// // // //     const numValue = value === '' ? '' : Number(value);
// // // //     setTempAreaMax(numValue);
    
// // // //     if (areaTimeoutRef.current) clearTimeout(areaTimeoutRef.current);
// // // //     areaTimeoutRef.current = setTimeout(() => {
// // // //       if (numValue !== '' && !isNaN(numValue)) {
// // // //         const validMin = Math.min(Math.max(tempAreaMin || filterOptions.minArea || 20, filterOptions.minArea || 20), filterOptions.maxArea || 500);
// // // //         const validMax = Math.min(Math.max(numValue, filterOptions.minArea || 20), filterOptions.maxArea || 500);
// // // //         const finalMin = Math.min(validMin, validMax);
// // // //         const finalMax = Math.max(validMin, validMax);
// // // //         setTempAreaMin(finalMin);
// // // //         setTempAreaMax(finalMax);
// // // //         onFilterChange({ areaMin: finalMin, areaMax: finalMax });
// // // //       }
// // // //     }, 500);
// // // //   };

// // // //   const resetAreaRange = () => {
// // // //     const defaultMin = filterOptions.minArea || 20;
// // // //     const defaultMax = filterOptions.maxArea || 500;
// // // //     setTempAreaMin(defaultMin);
// // // //     setTempAreaMax(defaultMax);
// // // //     onFilterChange({ areaMin: defaultMin, areaMax: defaultMax });
// // // //   };

// // // //   // =============== توابع مدیریت محدوده قیمت ===============
// // // //   const handlePriceMinChange = (e) => {
// // // //     const value = e.target.value;
// // // //     const cleanValue = value.replace(/,/g, '');
// // // //     const numValue = cleanValue === '' ? '' : Number(cleanValue);
// // // //     setTempPriceMin(numValue);
    
// // // //     if (priceTimeoutRef.current) clearTimeout(priceTimeoutRef.current);
// // // //     priceTimeoutRef.current = setTimeout(() => {
// // // //       const min = numValue === '' ? undefined : Number(numValue);
// // // //       const max = tempPriceMax === '' ? undefined : Number(tempPriceMax);
// // // //       onFilterChange({ priceMin: min, priceMax: max });
// // // //     }, 500);
// // // //   };

// // // //   const handlePriceMaxChange = (e) => {
// // // //     const value = e.target.value;
// // // //     const cleanValue = value.replace(/,/g, '');
// // // //     const numValue = cleanValue === '' ? '' : Number(cleanValue);
// // // //     setTempPriceMax(numValue);
    
// // // //     if (priceTimeoutRef.current) clearTimeout(priceTimeoutRef.current);
// // // //     priceTimeoutRef.current = setTimeout(() => {
// // // //       const min = tempPriceMin === '' ? undefined : Number(tempPriceMin);
// // // //       const max = numValue === '' ? undefined : Number(numValue);
// // // //       onFilterChange({ priceMin: min, priceMax: max });
// // // //     }, 500);
// // // //   };

// // // //   const resetPriceRange = () => {
// // // //     setTempPriceMin('');
// // // //     setTempPriceMax('');
// // // //     onFilterChange({ priceMin: undefined, priceMax: undefined });
// // // //   };

// // // //   const clearAllFilters = () => {
// // // //     onResetFilters();
// // // //     resetYearRange();
// // // //     resetAreaRange();
// // // //     resetPriceRange();
// // // //   };

// // // //   const getSelectedCount = () => {
// // // //     let count = 0;
    
// // // //     // شمارش فیلترهای چک‌باکس
// // // //     Object.values(filters).forEach(arr => {
// // // //       if (Array.isArray(arr)) count += arr.length;
// // // //     });
    
// // // //     // فقط اگر سال با مقدار پیش‌فرض تفاوت داشت
// // // //     const defaultMinYear = filterOptions.minYear || 1320;
// // // //     const defaultMaxYear = filterOptions.maxYear || 1405;
// // // //     const yearMin = filters.yearMin !== undefined ? filters.yearMin : defaultMinYear;
// // // //     const yearMax = filters.yearMax !== undefined ? filters.yearMax : defaultMaxYear;
    
// // // //     if (yearMin !== defaultMinYear || yearMax !== defaultMaxYear) count++;
    
// // // //     // فقط اگر متراژ با مقدار پیش‌فرض تفاوت داشت
// // // //     const defaultMinArea = filterOptions.minArea || 20;
// // // //     const defaultMaxArea = filterOptions.maxArea || 500;
// // // //     const areaMin = filters.areaMin !== undefined ? filters.areaMin : defaultMinArea;
// // // //     const areaMax = filters.areaMax !== undefined ? filters.areaMax : defaultMaxArea;
    
// // // //     if (areaMin !== defaultMinArea || areaMax !== defaultMaxArea) count++;
    
// // // //     // فقط اگر قیمت تعیین شده باشد
// // // //     if (filters.priceMin !== undefined || filters.priceMax !== undefined) count++;
    
// // // //     return count;
// // // //   };

// // // //   const getActiveFilters = () => {
// // // //     const activeFilters = [];

// // // //     const filterLabels = {
// // // //       regions: filterOptions.regions,
// // // //       floorCounts: filterOptions.floorCounts,
// // // //       constructionYears: filterOptions.constructionYears,
// // // //       amenities: filterOptions.amenities
// // // //     };

// // // //     Object.keys(filterLabels).forEach(key => {
// // // //       const selected = filters[key] || [];
// // // //       const options = filterLabels[key] || [];
      
// // // //       selected.forEach(id => {
// // // //         const option = options.find(opt => opt.id === id);
// // // //         if (option) {
// // // //           activeFilters.push({
// // // //             id: `${key}-${id}`,
// // // //             label: option.label,
// // // //             type: key,
// // // //             value: id
// // // //           });
// // // //         }
// // // //       });
// // // //     });

// // // //     // فقط اگر سال با مقدار پیش‌فرض تفاوت داشت نمایش بده
// // // //     const defaultMinYear = filterOptions.minYear || 1320;
// // // //     const defaultMaxYear = filterOptions.maxYear || 1405;
    
// // // //     const yearMin = filters.yearMin !== undefined ? filters.yearMin : defaultMinYear;
// // // //     const yearMax = filters.yearMax !== undefined ? filters.yearMax : defaultMaxYear;
    
// // // //     if (yearMin !== defaultMinYear || yearMax !== defaultMaxYear) {
// // // //       activeFilters.push({
// // // //         id: 'year-range',
// // // //         label: `سال ${yearMin} تا ${yearMax}`,
// // // //         type: 'yearRange',
// // // //         value: 'year-range'
// // // //       });
// // // //     }

// // // //     // فقط اگر متراژ با مقدار پیش‌فرض تفاوت داشت نمایش بده
// // // //     const defaultMinArea = filterOptions.minArea || 20;
// // // //     const defaultMaxArea = filterOptions.maxArea || 500;
    
// // // //     const areaMin = filters.areaMin !== undefined ? filters.areaMin : defaultMinArea;
// // // //     const areaMax = filters.areaMax !== undefined ? filters.areaMax : defaultMaxArea;
    
// // // //     if (areaMin !== defaultMinArea || areaMax !== defaultMaxArea) {
// // // //       activeFilters.push({
// // // //         id: 'area-range',
// // // //         label: `${areaMin} - ${areaMax} متر مربع`,
// // // //         type: 'areaRange',
// // // //         value: 'area-range'
// // // //       });
// // // //     }

// // // //     // فقط اگر قیمت تعیین شده باشد نمایش بده
// // // //     if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
// // // //       const minText = filters.priceMin !== undefined && filters.priceMin !== null ? formatPriceWithWords(filters.priceMin) : 'هر قیمت';
// // // //       const maxText = filters.priceMax !== undefined && filters.priceMax !== null ? formatPriceWithWords(filters.priceMax) : 'هر قیمت';
// // // //       const priceText = `${minText} تا ${maxText}`;
// // // //       activeFilters.push({
// // // //         id: 'price-range',
// // // //         label: priceText,
// // // //         type: 'priceRange',
// // // //         value: 'price-range'
// // // //       });
// // // //     }

// // // //     return activeFilters;
// // // //   };

// // // //   const removeFilter = (filter) => {
// // // //     if (filter.type === 'yearRange') {
// // // //       resetYearRange();
// // // //     } else if (filter.type === 'areaRange') {
// // // //       resetAreaRange();
// // // //     } else if (filter.type === 'priceRange') {
// // // //       resetPriceRange();
// // // //     } else {
// // // //       const currentSelection = filters[filter.type] || [];
// // // //       const newSelection = currentSelection.filter(item => item !== filter.value);
// // // //       onFilterChange({ [filter.type]: newSelection });
// // // //     }
// // // //   };

// // // //   // =============== رندر فیلتر محدوده قیمت ===============
// // // //   const renderPriceRangeFilter = () => {
// // // //     const minDisplay = tempPriceMin !== '' && tempPriceMin !== null && tempPriceMin !== undefined 
// // // //       ? formatNumberWithCommas(tempPriceMin) : '';
// // // //     const maxDisplay = tempPriceMax !== '' && tempPriceMax !== null && tempPriceMax !== undefined 
// // // //       ? formatNumberWithCommas(tempPriceMax) : '';
    
// // // //     const minWords = tempPriceMin !== '' && tempPriceMin !== null ? numberToPersianWords(tempPriceMin) : '';
// // // //     const maxWords = tempPriceMax !== '' && tempPriceMax !== null ? numberToPersianWords(tempPriceMax) : '';

// // // //     return (
// // // //       <div className="filter-section">
// // // //         <div 
// // // //           className="filter-section-header" 
// // // //           onClick={() => toggleSection('priceRange')}
// // // //         >
// // // //           <div className="filter-section-title">
// // // //             <span className="icon">💰</span>
// // // //             <span>محدوده قیمت (تومان)</span>
// // // //           </div>
// // // //           <span className="filter-section-toggle">
// // // //             {expandedSections.priceRange ? '−' : '+'}
// // // //           </span>
// // // //         </div>
        
// // // //         {expandedSections.priceRange && (
// // // //           <div className="filter-section-content">
// // // //             <div className="range-filter">
// // // //               <div className="range-inputs">
// // // //                 <div className="range-input-group">
// // // //                   <label>حداقل</label>
// // // //                   <input
// // // //                     type="text"
// // // //                     value={minDisplay}
// // // //                     onChange={handlePriceMinChange}
// // // //                     className="range-input price-input"
// // // //                     placeholder="مثلا ۱۰۰,۰۰۰,۰۰۰"
// // // //                     dir="ltr"
// // // //                   />
// // // //                   {minWords && (
// // // //                     <span className="price-words">{minWords} تومان</span>
// // // //                   )}
// // // //                 </div>
// // // //                 <div className="range-input-group">
// // // //                   <label>حداکثر</label>
// // // //                   <input
// // // //                     type="text"
// // // //                     value={maxDisplay}
// // // //                     onChange={handlePriceMaxChange}
// // // //                     className="range-input price-input"
// // // //                     placeholder="مثلا ۵۰۰,۰۰۰,۰۰۰"
// // // //                     dir="ltr"
// // // //                   />
// // // //                   {maxWords && (
// // // //                     <span className="price-words">{maxWords} تومان</span>
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //               <div className="range-actions">
// // // //                 <button onClick={resetPriceRange} className="reset-range-btn">
// // // //                   ریست
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     );
// // // //   };

// // // //   // =============== رندر فیلتر محدوده سال ===============
// // // //   const renderYearRangeFilter = () => {
// // // //     return (
// // // //       <div className="filter-section">
// // // //         <div 
// // // //           className="filter-section-header" 
// // // //           onClick={() => toggleSection('yearRange')}
// // // //         >
// // // //           <div className="filter-section-title">
// // // //             <span className="icon">📅</span>
// // // //             <span>محدوده سال ساخت</span>
// // // //           </div>
// // // //           <span className="filter-section-toggle">
// // // //             {expandedSections.yearRange ? '−' : '+'}
// // // //           </span>
// // // //         </div>
        
// // // //         {expandedSections.yearRange && (
// // // //           <div className="filter-section-content">
// // // //             <div className="range-filter">
// // // //               <div className="range-inputs">
// // // //                 <div className="range-input-group">
// // // //                   <label>از سال</label>
// // // //                   <input
// // // //                     type="number"
// // // //                     min={filterOptions.minYear || 1320}
// // // //                     max={filterOptions.maxYear || 1405}
// // // //                     value={tempYearMin}
// // // //                     onChange={handleYearMinChange}
// // // //                     className="range-input"
// // // //                     step="1"
// // // //                   />
// // // //                 </div>
// // // //                 <div className="range-input-group">
// // // //                   <label>تا سال</label>
// // // //                   <input
// // // //                     type="number"
// // // //                     min={filterOptions.minYear || 1320}
// // // //                     max={filterOptions.maxYear || 1405}
// // // //                     value={tempYearMax}
// // // //                     onChange={handleYearMaxChange}
// // // //                     className="range-input"
// // // //                     step="1"
// // // //                   />
// // // //                 </div>
// // // //               </div>
// // // //               <div className="range-actions">
// // // //                 <button onClick={resetYearRange} className="reset-range-btn">
// // // //                   ریست
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     );
// // // //   };

// // // //   // =============== رندر فیلتر محدوده متراژ ===============
// // // //   const renderAreaRangeFilter = () => {
// // // //     return (
// // // //       <div className="filter-section">
// // // //         <div 
// // // //           className="filter-section-header" 
// // // //           onClick={() => toggleSection('areaRange')}
// // // //         >
// // // //           <div className="filter-section-title">
// // // //             <span className="icon">📐</span>
// // // //             <span>متراژ (متر مربع)</span>
// // // //           </div>
// // // //           <span className="filter-section-toggle">
// // // //             {expandedSections.areaRange ? '−' : '+'}
// // // //           </span>
// // // //         </div>
        
// // // //         {expandedSections.areaRange && (
// // // //           <div className="filter-section-content">
// // // //             <div className="range-filter">
// // // //               <div className="range-inputs">
// // // //                 <div className="range-input-group">
// // // //                   <label>حداقل</label>
// // // //                   <input
// // // //                     type="number"
// // // //                     min={filterOptions.minArea || 20}
// // // //                     max={filterOptions.maxArea || 500}
// // // //                     value={tempAreaMin}
// // // //                     onChange={handleAreaMinChange}
// // // //                     className="range-input"
// // // //                     step="1"
// // // //                   />
// // // //                 </div>
// // // //                 <div className="range-input-group">
// // // //                   <label>حداکثر</label>
// // // //                   <input
// // // //                     type="number"
// // // //                     min={filterOptions.minArea || 20}
// // // //                     max={filterOptions.maxArea || 500}
// // // //                     value={tempAreaMax}
// // // //                     onChange={handleAreaMaxChange}
// // // //                     className="range-input"
// // // //                     step="1"
// // // //                   />
// // // //                 </div>
// // // //               </div>
// // // //               <div className="range-actions">
// // // //                 <button onClick={resetAreaRange} className="reset-range-btn">
// // // //                   ریست
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     );
// // // //   };

// // // //   // =============== رندر فیلترهای دیگر ===============
// // // //   const renderRegionFilter = () => {
// // // //     if (!filterOptions.regions?.length) return null;

// // // //     return (
// // // //       <div className="filter-section">
// // // //         <div 
// // // //           className="filter-section-header" 
// // // //           onClick={() => toggleSection('regions')}
// // // //         >
// // // //           <div className="filter-section-title">
// // // //             <span className="icon">📍</span>
// // // //             <span>منطقه</span>
// // // //           </div>
// // // //           <span className="filter-section-toggle">
// // // //             {expandedSections.regions ? '−' : '+'}
// // // //           </span>
// // // //         </div>
        
// // // //         {expandedSections.regions && (
// // // //           <div className="filter-section-content">
// // // //             {filterOptions.regions.map(option => (
// // // //               <label key={option.id} className="filter-checkbox">
// // // //                 <input
// // // //                   type="checkbox"
// // // //                   checked={filters.regions?.includes(option.id)}
// // // //                   onChange={() => handleCheckboxChange('regions', option.id)}
// // // //                 />
// // // //                 <span className="checkbox-label">{option.label}</span>
// // // //                 <span className="filter-count">{option.count}</span>
// // // //               </label>
// // // //             ))}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     );
// // // //   };

// // // //   const renderFloorFilter = () => {
// // // //     if (!filterOptions.floorCounts?.length) return null;

// // // //     return (
// // // //       <div className="filter-section">
// // // //         <div 
// // // //           className="filter-section-header" 
// // // //           onClick={() => toggleSection('floorCounts')}
// // // //         >
// // // //           <div className="filter-section-title">
// // // //             <span className="icon">🏢</span>
// // // //             <span>تعداد طبقات</span>
// // // //           </div>
// // // //           <span className="filter-section-toggle">
// // // //             {expandedSections.floorCounts ? '−' : '+'}
// // // //           </span>
// // // //         </div>
        
// // // //         {expandedSections.floorCounts && (
// // // //           <div className="filter-section-content">
// // // //             {filterOptions.floorCounts.map(option => (
// // // //               <label key={option.id} className="filter-checkbox">
// // // //                 <input
// // // //                   type="checkbox"
// // // //                   checked={filters.floorCounts?.includes(option.id)}
// // // //                   onChange={() => handleCheckboxChange('floorCounts', option.id)}
// // // //                 />
// // // //                 <span className="checkbox-label">{option.label}</span>
// // // //                 <span className="filter-count">{option.count}</span>
// // // //               </label>
// // // //             ))}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     );
// // // //   };

// // // //   const renderYearFilter = () => {
// // // //     if (!filterOptions.constructionYears?.length) return null;

// // // //     const sortedYears = [...filterOptions.constructionYears].sort((a, b) => 
// // // //       parseInt(b.id) - parseInt(a.id)
// // // //     );

// // // //     return (
// // // //       <div className="filter-section">
// // // //         {/* <div 
// // // //           className="filter-section-header" 
// // // //           onClick={() => toggleSection('constructionYears')}
// // // //         >
// // // //           <div className="filter-section-title">
// // // //             <span className="icon">📅</span>
// // // //             <span>سال ساخت</span>
// // // //           </div>
// // // //           <span className="filter-section-toggle">
// // // //             {expandedSections.constructionYears ? '−' : '+'}
// // // //           </span>
// // // //         </div> */}
        
// // // //         {/* {expandedSections.constructionYears && (
// // // //           <div className="filter-section-content">
// // // //             {sortedYears.map(option => (
// // // //               <label key={option.id} className="filter-checkbox">
// // // //                 <input
// // // //                   type="checkbox"
// // // //                   checked={filters.constructionYears?.includes(option.id)}
// // // //                   onChange={() => handleCheckboxChange('constructionYears', option.id)}
// // // //                 />
// // // //                 <span className="checkbox-label">
// // // //                   <span>سال {option.label}</span>
// // // //                   {getYearBadge(option.id)}
// // // //                 </span>
// // // //                 <span className="filter-count">{option.count}</span>
// // // //               </label>
// // // //             ))}
// // // //           </div>
// // // //         )} */}
// // // //       </div>
// // // //     );
// // // //   };

// // // //   const renderAmenitiesFilter = () => {
// // // //     if (!filterOptions.amenities?.length) return null;

// // // //     const amenityIcons = {
// // // //       elevator: '🛗',
// // // //       parking: '🅿️',
// // // //       pool: '🏊',
// // // //       storeRoom: '📦'
// // // //     };

// // // //     return (
// // // //       <div className="filter-section">
// // // //         <div 
// // // //           className="filter-section-header" 
// // // //           onClick={() => toggleSection('amenities')}
// // // //         >
// // // //           <div className="filter-section-title">
// // // //             <span className="icon">✨</span>
// // // //             <span>امکانات</span>
// // // //           </div>
// // // //           <span className="filter-section-toggle">
// // // //             {expandedSections.amenities ? '−' : '+'}
// // // //           </span>
// // // //         </div>
        
// // // //         {expandedSections.amenities && (
// // // //           <div className="filter-section-content">
// // // //             {filterOptions.amenities.map(option => (
// // // //               <label key={option.id} className="filter-checkbox">
// // // //                 <input
// // // //                   type="checkbox"
// // // //                   checked={filters.amenities?.includes(option.id)}
// // // //                   onChange={() => handleCheckboxChange('amenities', option.id)}
// // // //                 />
// // // //                 <span className="checkbox-label">
// // // //                   <span className="amenity-icon">{amenityIcons[option.id] || '•'}</span>
// // // //                   <span>{option.label}</span>
// // // //                 </span>
// // // //                 <span className="filter-count">{option.count}</span>
// // // //               </label>
// // // //             ))}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     );
// // // //   };

// // // //   const selectedCount = getSelectedCount();
// // // //   const activeFilters = getActiveFilters();

// // // //   const getYearBadge = (year) => {
// // // //     const currentYear = new Date().getFullYear() - 621;
// // // //     const age = currentYear - parseInt(year);
    
// // // //     if (age <= 2) {
// // // //       return <span className="badge-new">نوساز</span>;
// // // //     } else if (age <= 5) {
// // // //       return <span className="badge-good">ممتاز</span>;
// // // //     } else if (age >= 30) {
// // // //       return <span className="badge-old">قدیمی</span>;
// // // //     }
// // // //     return null;
// // // //   };

// // // //   return (
// // // //     <div className="filter-sidebar">
// // // //       <div className="filter-sidebar-header">
// // // //         <div className="filter-sidebar-title">
// // // //           <span>فیلترها</span>
// // // //           {selectedCount > 0 && (
// // // //             <span className="filter-badge">{selectedCount}</span>
// // // //           )}
// // // //         </div>
// // // //         {selectedCount > 0 && (
// // // //           <button onClick={clearAllFilters} className="clear-all-btn">
// // // //             حذف همه
// // // //           </button>
// // // //         )}
// // // //       </div>

// // // //       {/* نمایش فیلترهای فعال */}
// // // //       {activeFilters.length > 0 && (
// // // //         <div className="active-filters-container">
// // // //           <div className="active-filters-title">فیلترهای انتخاب شده:</div>
// // // //           <div className="active-filters-list">
// // // //             {activeFilters.map(filter => (
// // // //               <div key={filter.id} className="active-filter-tag">
// // // //                 <span title={filter.label}>{filter.label}</span>
// // // //                 <button 
// // // //                   className="remove-filter-btn"
// // // //                   onClick={() => removeFilter(filter)}
// // // //                   title="حذف فیلتر"
// // // //                 >
// // // //                   ✕
// // // //                 </button>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       <div className="filter-sidebar-content">
// // // //         {renderRegionFilter()}
// // // //         {renderPriceRangeFilter()}
// // // //         {renderAreaRangeFilter()}
// // // //         {renderFloorFilter()}
// // // //         {renderYearRangeFilter()}
// // // //         {renderYearFilter()}
// // // //         {renderAmenitiesFilter()}
// // // //       </div>

// // // //       <div className="filter-sidebar-footer">
// // // //         <div className="total-results">
// // // //           <span>تعداد نتایج:</span>
// // // //           <span className="total-results-number">{totalResults}</span>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default FilterSidebar;

// // // // FilterSidebar.jsx
// // // import React, { useState, useRef } from 'react';
// // // import './FilterSidebar.css';

// // // const FilterSidebar = ({ 
// // //   filters, 
// // //   onFilterChange, 
// // //   onResetFilters, 
// // //   totalResults,
// // //   filterOptions = {
// // //     regions: [],
// // //     floorCounts: [],
// // //     constructionYears: [],
// // //     amenities: [],
// // //     minYear: 1320,
// // //     maxYear: 1405,
// // //     minArea: 20,
// // //     maxArea: 500,
// // //     minPrice: 0,
// // //     maxPrice: Infinity
// // //   }
// // // }) => {
// // //   const [expandedSections, setExpandedSections] = useState({
// // //     regions: false,
// // //     floorCounts: false,
// // //     constructionYears: false,
// // //     amenities: false,
// // //     areaRange: false,
// // //     yearRange: false,
// // //     priceRange: false
// // //   });

// // //   // State برای مقادیر موقت محدوده‌ها - مستقیماً از filters می‌گیریم
// // //   const [tempYearMin, setTempYearMin] = useState(filters.yearMin || '');
// // //   const [tempYearMax, setTempYearMax] = useState(filters.yearMax || '');
  
// // //   const [tempAreaMin, setTempAreaMin] = useState(filters.areaMin || '');
// // //   const [tempAreaMax, setTempAreaMax] = useState(filters.areaMax || '');
  
// // //   const [tempPriceMin, setTempPriceMin] = useState(
// // //     filters.priceMin !== undefined && filters.priceMin !== null ? filters.priceMin : ''
// // //   );
// // //   const [tempPriceMax, setTempPriceMax] = useState(
// // //     filters.priceMax !== undefined && filters.priceMax !== null ? filters.priceMax : ''
// // //   );

// // //   // Refs برای تایمرهای تاخیر
// // //   const yearTimeoutRef = useRef(null);
// // //   const areaTimeoutRef = useRef(null);
// // //   const priceTimeoutRef = useRef(null);

// // //   const toggleSection = (section) => {
// // //     setExpandedSections(prev => ({
// // //       ...prev,
// // //       [section]: !prev[section]
// // //     }));
// // //   };

// // //   const handleCheckboxChange = (section, value) => {
// // //     const currentSelection = filters[section] || [];
// // //     const newSelection = currentSelection.includes(value)
// // //       ? currentSelection.filter(item => item !== value)
// // //       : [...currentSelection, value];
    
// // //     onFilterChange({ [section]: newSelection });
// // //   };

// // //   // =============== توابع تبدیل اعداد به حروف فارسی ===============
// // //   const numberToPersianWords = (num) => {
// // //     if (num === 0 || num === '0') return 'صفر';
// // //     if (!num && num !== 0) return '';
    
// // //     const numValue = typeof num === 'string' ? parseInt(num.replace(/,/g, '')) : num;
// // //     if (isNaN(numValue)) return '';

// // //     const units = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
// // //     const tens = ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
// // //     const hundreds = ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
// // //     const thousands = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

// // //     const convertChunk = (n) => {
// // //       if (n === 0) return '';
      
// // //       let result = '';
// // //       const h = Math.floor(n / 100);
// // //       const t = Math.floor((n % 100) / 10);
// // //       const u = n % 10;

// // //       if (h > 0) {
// // //         result += hundreds[h];
// // //       }

// // //       if (t > 0) {
// // //         if (result) result += ' و ';
// // //         if (t === 1 && u > 0) {
// // //           const teens = ['', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
// // //           result += teens[u];
// // //           return result;
// // //         }
// // //         result += tens[t];
// // //       }

// // //       if (u > 0 && t !== 1) {
// // //         if (result) result += ' و ';
// // //         result += units[u];
// // //       }

// // //       return result;
// // //     };

// // //     let n = numValue;
// // //     if (n < 1000) {
// // //       return convertChunk(n) || 'صفر';
// // //     }

// // //     let result = '';
// // //     let chunkIndex = 0;

// // //     while (n > 0) {
// // //       const chunk = n % 1000;
// // //       if (chunk > 0) {
// // //         const chunkWords = convertChunk(chunk);
// // //         if (chunkWords) {
// // //           const thousandWord = thousands[chunkIndex];
// // //           const prefix = result ? ' و ' : '';
// // //           result = chunkWords + (thousandWord ? ' ' + thousandWord : '') + prefix + result;
// // //         }
// // //       }
// // //       n = Math.floor(n / 1000);
// // //       chunkIndex++;
// // //     }

// // //     return result || 'صفر';
// // //   };

// // //   const formatPriceWithWords = (price) => {
// // //     if (!price && price !== 0) return '';
// // //     if (price === 0) return 'صفر تومان';
    
// // //     const numValue = typeof price === 'string' ? parseInt(price.replace(/,/g, '')) : price;
// // //     if (isNaN(numValue)) return '';

// // //     if (numValue >= 1000000000) {
// // //       const billions = numValue / 1000000000;
// // //       if (Number.isInteger(billions)) {
// // //         return `${numberToPersianWords(billions)} میلیارد تومان`;
// // //       }
// // //       const billionPart = Math.floor(billions);
// // //       const millionPart = Math.round((billions - billionPart) * 1000);
// // //       let result = '';
// // //       if (billionPart > 0) result += `${numberToPersianWords(billionPart)} میلیارد`;
// // //       if (millionPart > 0) {
// // //         if (result) result += ' و ';
// // //         result += `${numberToPersianWords(millionPart)} میلیون`;
// // //       }
// // //       return result + ' تومان';
// // //     } else if (numValue >= 1000000) {
// // //       const millions = numValue / 1000000;
// // //       if (Number.isInteger(millions)) {
// // //         return `${numberToPersianWords(millions)} میلیون تومان`;
// // //       }
// // //       const millionPart = Math.floor(millions);
// // //       const thousandPart = Math.round((millions - millionPart) * 1000);
// // //       let result = '';
// // //       if (millionPart > 0) result += `${numberToPersianWords(millionPart)} میلیون`;
// // //       if (thousandPart > 0) {
// // //         if (result) result += ' و ';
// // //         result += `${numberToPersianWords(thousandPart)} هزار`;
// // //       }
// // //       return result + ' تومان';
// // //     } else if (numValue >= 1000) {
// // //       const thousands = numValue / 1000;
// // //       if (Number.isInteger(thousands)) {
// // //         return `${numberToPersianWords(thousands)} هزار تومان`;
// // //       }
// // //       return `${numberToPersianWords(numValue)} تومان`;
// // //     }
// // //     return `${numberToPersianWords(numValue)} تومان`;
// // //   };

// // //   // =============== تابع جداکننده ۳ رقم ۳ رقم ===============
// // //   const formatNumberWithCommas = (num) => {
// // //     if (num === undefined || num === null || num === '') return '';
// // //     const numStr = String(num).replace(/,/g, '');
// // //     if (numStr === '' || isNaN(numStr)) return '';
// // //     return Number(numStr).toLocaleString('en-US');
// // //   };

// // //   // =============== توابع مدیریت محدوده سال ===============
// // //   const handleYearMinChange = (e) => {
// // //     const value = e.target.value;
// // //     const numValue = value === '' ? '' : Number(value);
// // //     setTempYearMin(numValue);
    
// // //     if (yearTimeoutRef.current) clearTimeout(yearTimeoutRef.current);
// // //     yearTimeoutRef.current = setTimeout(() => {
// // //       if (numValue !== '' && !isNaN(numValue)) {
// // //         onFilterChange({ yearMin: numValue });
// // //       } else {
// // //         onFilterChange({ yearMin: undefined });
// // //       }
// // //     }, 500);
// // //   };

// // //   const handleYearMaxChange = (e) => {
// // //     const value = e.target.value;
// // //     const numValue = value === '' ? '' : Number(value);
// // //     setTempYearMax(numValue);
    
// // //     if (yearTimeoutRef.current) clearTimeout(yearTimeoutRef.current);
// // //     yearTimeoutRef.current = setTimeout(() => {
// // //       if (numValue !== '' && !isNaN(numValue)) {
// // //         onFilterChange({ yearMax: numValue });
// // //       } else {
// // //         onFilterChange({ yearMax: undefined });
// // //       }
// // //     }, 500);
// // //   };

// // //   const resetYearRange = () => {
// // //     setTempYearMin('');
// // //     setTempYearMax('');
// // //     onFilterChange({ yearMin: undefined, yearMax: undefined });
// // //   };

// // //   // =============== توابع مدیریت محدوده متراژ ===============
// // //   const handleAreaMinChange = (e) => {
// // //     const value = e.target.value;
// // //     const numValue = value === '' ? '' : Number(value);
// // //     setTempAreaMin(numValue);
    
// // //     if (areaTimeoutRef.current) clearTimeout(areaTimeoutRef.current);
// // //     areaTimeoutRef.current = setTimeout(() => {
// // //       if (numValue !== '' && !isNaN(numValue)) {
// // //         onFilterChange({ areaMin: numValue });
// // //       } else {
// // //         onFilterChange({ areaMin: undefined });
// // //       }
// // //     }, 500);
// // //   };

// // //   const handleAreaMaxChange = (e) => {
// // //     const value = e.target.value;
// // //     const numValue = value === '' ? '' : Number(value);
// // //     setTempAreaMax(numValue);
    
// // //     if (areaTimeoutRef.current) clearTimeout(areaTimeoutRef.current);
// // //     areaTimeoutRef.current = setTimeout(() => {
// // //       if (numValue !== '' && !isNaN(numValue)) {
// // //         onFilterChange({ areaMax: numValue });
// // //       } else {
// // //         onFilterChange({ areaMax: undefined });
// // //       }
// // //     }, 500);
// // //   };

// // //   const resetAreaRange = () => {
// // //     setTempAreaMin('');
// // //     setTempAreaMax('');
// // //     onFilterChange({ areaMin: undefined, areaMax: undefined });
// // //   };

// // //   // =============== توابع مدیریت محدوده قیمت ===============
// // //   const handlePriceMinChange = (e) => {
// // //     const value = e.target.value;
// // //     const cleanValue = value.replace(/,/g, '');
// // //     const numValue = cleanValue === '' ? '' : Number(cleanValue);
// // //     setTempPriceMin(numValue);
    
// // //     if (priceTimeoutRef.current) clearTimeout(priceTimeoutRef.current);
// // //     priceTimeoutRef.current = setTimeout(() => {
// // //       const min = numValue === '' ? undefined : Number(numValue);
// // //       const max = tempPriceMax === '' ? undefined : Number(tempPriceMax);
// // //       onFilterChange({ priceMin: min, priceMax: max });
// // //     }, 500);
// // //   };

// // //   const handlePriceMaxChange = (e) => {
// // //     const value = e.target.value;
// // //     const cleanValue = value.replace(/,/g, '');
// // //     const numValue = cleanValue === '' ? '' : Number(cleanValue);
// // //     setTempPriceMax(numValue);
    
// // //     if (priceTimeoutRef.current) clearTimeout(priceTimeoutRef.current);
// // //     priceTimeoutRef.current = setTimeout(() => {
// // //       const min = tempPriceMin === '' ? undefined : Number(tempPriceMin);
// // //       const max = numValue === '' ? undefined : Number(numValue);
// // //       onFilterChange({ priceMin: min, priceMax: max });
// // //     }, 500);
// // //   };

// // //   const resetPriceRange = () => {
// // //     setTempPriceMin('');
// // //     setTempPriceMax('');
// // //     onFilterChange({ priceMin: undefined, priceMax: undefined });
// // //   };

// // //   const clearAllFilters = () => {
// // //     onResetFilters();
// // //     resetYearRange();
// // //     resetAreaRange();
// // //     resetPriceRange();
// // //   };

// // //   const getSelectedCount = () => {
// // //     let count = 0;
    
// // //     // شمارش فیلترهای چک‌باکس
// // //     Object.values(filters).forEach(arr => {
// // //       if (Array.isArray(arr)) count += arr.length;
// // //     });
    
// // //     // فقط اگر سال مقدار داشته باشد
// // //     if (filters.yearMin !== undefined || filters.yearMax !== undefined) count++;
    
// // //     // فقط اگر متراژ مقدار داشته باشد
// // //     if (filters.areaMin !== undefined || filters.areaMax !== undefined) count++;
    
// // //     // فقط اگر قیمت تعیین شده باشد
// // //     if (filters.priceMin !== undefined || filters.priceMax !== undefined) count++;
    
// // //     return count;
// // //   };

// // //   const getActiveFilters = () => {
// // //     const activeFilters = [];

// // //     const filterLabels = {
// // //       regions: filterOptions.regions,
// // //       floorCounts: filterOptions.floorCounts,
// // //       constructionYears: filterOptions.constructionYears,
// // //       amenities: filterOptions.amenities
// // //     };

// // //     Object.keys(filterLabels).forEach(key => {
// // //       const selected = filters[key] || [];
// // //       const options = filterLabels[key] || [];
      
// // //       selected.forEach(id => {
// // //         const option = options.find(opt => opt.id === id);
// // //         if (option) {
// // //           activeFilters.push({
// // //             id: `${key}-${id}`,
// // //             label: option.label,
// // //             type: key,
// // //             value: id
// // //           });
// // //         }
// // //       });
// // //     });

// // //     // فقط اگر سال مقدار داشته باشد نمایش بده
// // //     if (filters.yearMin !== undefined || filters.yearMax !== undefined) {
// // //       const minText = filters.yearMin !== undefined ? filters.yearMin : 'هر سال';
// // //       const maxText = filters.yearMax !== undefined ? filters.yearMax : 'هر سال';
// // //       activeFilters.push({
// // //         id: 'year-range',
// // //         label: `سال ${minText} تا ${maxText}`,
// // //         type: 'yearRange',
// // //         value: 'year-range'
// // //       });
// // //     }

// // //     // فقط اگر متراژ مقدار داشته باشد نمایش بده
// // //     if (filters.areaMin !== undefined || filters.areaMax !== undefined) {
// // //       const minText = filters.areaMin !== undefined ? filters.areaMin : 'هر متراژ';
// // //       const maxText = filters.areaMax !== undefined ? filters.areaMax : 'هر متراژ';
// // //       activeFilters.push({
// // //         id: 'area-range',
// // //         label: `${minText} - ${maxText} متر مربع`,
// // //         type: 'areaRange',
// // //         value: 'area-range'
// // //       });
// // //     }

// // //     // فقط اگر قیمت تعیین شده باشد نمایش بده
// // //     if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
// // //       const minText = filters.priceMin !== undefined && filters.priceMin !== null ? formatPriceWithWords(filters.priceMin) : 'هر قیمت';
// // //       const maxText = filters.priceMax !== undefined && filters.priceMax !== null ? formatPriceWithWords(filters.priceMax) : 'هر قیمت';
// // //       const priceText = `${minText} تا ${maxText}`;
// // //       activeFilters.push({
// // //         id: 'price-range',
// // //         label: priceText,
// // //         type: 'priceRange',
// // //         value: 'price-range'
// // //       });
// // //     }

// // //     return activeFilters;
// // //   };

// // //   const removeFilter = (filter) => {
// // //     if (filter.type === 'yearRange') {
// // //       resetYearRange();
// // //     } else if (filter.type === 'areaRange') {
// // //       resetAreaRange();
// // //     } else if (filter.type === 'priceRange') {
// // //       resetPriceRange();
// // //     } else {
// // //       const currentSelection = filters[filter.type] || [];
// // //       const newSelection = currentSelection.filter(item => item !== filter.value);
// // //       onFilterChange({ [filter.type]: newSelection });
// // //     }
// // //   };

// // //   // =============== رندر فیلتر محدوده قیمت ===============
// // //   const renderPriceRangeFilter = () => {
// // //     const minDisplay = tempPriceMin !== '' && tempPriceMin !== null && tempPriceMin !== undefined 
// // //       ? formatNumberWithCommas(tempPriceMin) : '';
// // //     const maxDisplay = tempPriceMax !== '' && tempPriceMax !== null && tempPriceMax !== undefined 
// // //       ? formatNumberWithCommas(tempPriceMax) : '';
    
// // //     const minWords = tempPriceMin !== '' && tempPriceMin !== null ? numberToPersianWords(tempPriceMin) : '';
// // //     const maxWords = tempPriceMax !== '' && tempPriceMax !== null ? numberToPersianWords(tempPriceMax) : '';

// // //     return (
// // //       <div className="filter-section">
// // //         <div 
// // //           className="filter-section-header" 
// // //           onClick={() => toggleSection('priceRange')}
// // //         >
// // //           <div className="filter-section-title">
// // //             <span className="icon">💰</span>
// // //             <span>محدوده قیمت (تومان)</span>
// // //           </div>
// // //           <span className="filter-section-toggle">
// // //             {expandedSections.priceRange ? '−' : '+'}
// // //           </span>
// // //         </div>
        
// // //         {expandedSections.priceRange && (
// // //           <div className="filter-section-content">
// // //             <div className="range-filter">
// // //               <div className="range-inputs">
// // //                 <div className="range-input-group">
// // //                   <label>حداقل</label>
// // //                   <input
// // //                     type="text"
// // //                     value={minDisplay}
// // //                     onChange={handlePriceMinChange}
// // //                     className="range-input price-input"
// // //                     placeholder="مثلا ۱۰۰,۰۰۰,۰۰۰"
// // //                     dir="ltr"
// // //                   />
// // //                   {minWords && (
// // //                     <span className="price-words">{minWords} تومان</span>
// // //                   )}
// // //                 </div>
// // //                 <div className="range-input-group">
// // //                   <label>حداکثر</label>
// // //                   <input
// // //                     type="text"
// // //                     value={maxDisplay}
// // //                     onChange={handlePriceMaxChange}
// // //                     className="range-input price-input"
// // //                     placeholder="مثلا ۵۰۰,۰۰۰,۰۰۰"
// // //                     dir="ltr"
// // //                   />
// // //                   {maxWords && (
// // //                     <span className="price-words">{maxWords} تومان</span>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //               <div className="range-actions">
// // //                 <button onClick={resetPriceRange} className="reset-range-btn">
// // //                   ریست
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     );
// // //   };

// // //   // =============== رندر فیلتر محدوده سال ===============
// // //   const renderYearRangeFilter = () => {
// // //     return (
// // //       <div className="filter-section">
// // //         <div 
// // //           className="filter-section-header" 
// // //           onClick={() => toggleSection('yearRange')}
// // //         >
// // //           <div className="filter-section-title">
// // //             <span className="icon">📅</span>
// // //             <span> سال ساخت</span>
// // //           </div>
// // //           <span className="filter-section-toggle">
// // //             {expandedSections.yearRange ? '−' : '+'}
// // //           </span>
// // //         </div>
        
// // //         {expandedSections.yearRange && (
// // //           <div className="filter-section-content">
// // //             <div className="range-filter">
// // //               <div className="range-inputs">
// // //                 <div className="range-input-group">
// // //                   <label>از سال</label>
// // //                   <input
// // //                     type="number"
// // //                     value={tempYearMin}
// // //                     onChange={handleYearMinChange}
// // //                     className="range-input"
// // //                     placeholder="مثلا ۱۳۸۰"
// // //                     step="1"
// // //                   />
// // //                 </div>
// // //                 <div className="range-input-group">
// // //                   <label>تا سال</label>
// // //                   <input
// // //                     type="number"
// // //                     value={tempYearMax}
// // //                     onChange={handleYearMaxChange}
// // //                     className="range-input"
// // //                     placeholder="مثلا ۱۴۰۰"
// // //                     step="1"
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div className="range-actions">
// // //                 <button onClick={resetYearRange} className="reset-range-btn">
// // //                   ریست
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     );
// // //   };

// // //   // =============== رندر فیلتر محدوده متراژ ===============
// // //   const renderAreaRangeFilter = () => {
// // //     return (
// // //       <div className="filter-section">
// // //         <div 
// // //           className="filter-section-header" 
// // //           onClick={() => toggleSection('areaRange')}
// // //         >
// // //           <div className="filter-section-title">
// // //             <span className="icon">📐</span>
// // //             <span>متراژ (متر مربع)</span>
// // //           </div>
// // //           <span className="filter-section-toggle">
// // //             {expandedSections.areaRange ? '−' : '+'}
// // //           </span>
// // //         </div>
        
// // //         {expandedSections.areaRange && (
// // //           <div className="filter-section-content">
// // //             <div className="range-filter">
// // //               <div className="range-inputs">
// // //                 <div className="range-input-group">
// // //                   <label>حداقل</label>
// // //                   <input
// // //                     type="number"
// // //                     value={tempAreaMin}
// // //                     onChange={handleAreaMinChange}
// // //                     className="range-input"
// // //                     placeholder="مثلا ۵۰"
// // //                     step="1"
// // //                   />
// // //                 </div>
// // //                 <div className="range-input-group">
// // //                   <label>حداکثر</label>
// // //                   <input
// // //                     type="number"
// // //                     value={tempAreaMax}
// // //                     onChange={handleAreaMaxChange}
// // //                     className="range-input"
// // //                     placeholder="مثلا ۲۰۰"
// // //                     step="1"
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div className="range-actions">
// // //                 <button onClick={resetAreaRange} className="reset-range-btn">
// // //                   ریست
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     );
// // //   };

// // //   // =============== رندر فیلترهای دیگر ===============
// // //   const renderRegionFilter = () => {
// // //     if (!filterOptions.regions?.length) return null;

// // //     return (
// // //       <div className="filter-section">
// // //         <div 
// // //           className="filter-section-header" 
// // //           onClick={() => toggleSection('regions')}
// // //         >
// // //           <div className="filter-section-title">
// // //             <span className="icon">📍</span>
// // //             <span>منطقه</span>
// // //           </div>
// // //           <span className="filter-section-toggle">
// // //             {expandedSections.regions ? '−' : '+'}
// // //           </span>
// // //         </div>
        
// // //         {expandedSections.regions && (
// // //           <div className="filter-section-content">
// // //             {filterOptions.regions.map(option => (
// // //               <label key={option.id} className="filter-checkbox">
// // //                 <input
// // //                   type="checkbox"
// // //                   checked={filters.regions?.includes(option.id)}
// // //                   onChange={() => handleCheckboxChange('regions', option.id)}
// // //                 />
// // //                 <span className="checkbox-label">{option.label}</span>
// // //                 <span className="filter-count">{option.count}</span>
// // //               </label>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     );
// // //   };

// // //   const renderFloorFilter = () => {
// // //     if (!filterOptions.floorCounts?.length) return null;

// // //     return (
// // //       <div className="filter-section">
// // //         <div 
// // //           className="filter-section-header" 
// // //           onClick={() => toggleSection('floorCounts')}
// // //         >
// // //           <div className="filter-section-title">
// // //             <span className="icon">🏢</span>
// // //             <span>تعداد طبقات</span>
// // //           </div>
// // //           <span className="filter-section-toggle">
// // //             {expandedSections.floorCounts ? '−' : '+'}
// // //           </span>
// // //         </div>
        
// // //         {expandedSections.floorCounts && (
// // //           <div className="filter-section-content">
// // //             {filterOptions.floorCounts.map(option => (
// // //               <label key={option.id} className="filter-checkbox">
// // //                 <input
// // //                   type="checkbox"
// // //                   checked={filters.floorCounts?.includes(option.id)}
// // //                   onChange={() => handleCheckboxChange('floorCounts', option.id)}
// // //                 />
// // //                 <span className="checkbox-label">{option.label}</span>
// // //                 <span className="filter-count">{option.count}</span>
// // //               </label>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     );
// // //   };

// // //   const renderYearFilter = () => {
// // //     if (!filterOptions.constructionYears?.length) return null;

// // //     const sortedYears = [...filterOptions.constructionYears].sort((a, b) => 
// // //       parseInt(b.id) - parseInt(a.id)
// // //     );

// // //     return (
// // //       <div className="filter-section">
// // //         {/* <div 
// // //           className="filter-section-header" 
// // //           onClick={() => toggleSection('constructionYears')}
// // //         >
// // //           <div className="filter-section-title">
// // //             <span className="icon">📅</span>
// // //             <span>سال ساخت</span>
// // //           </div>
// // //           <span className="filter-section-toggle">
// // //             {expandedSections.constructionYears ? '−' : '+'}
// // //           </span>
// // //         </div>
        
// // //         {expandedSections.constructionYears && (
// // //           <div className="filter-section-content">
// // //             {sortedYears.map(option => (
// // //               <label key={option.id} className="filter-checkbox">
// // //                 <input
// // //                   type="checkbox"
// // //                   checked={filters.constructionYears?.includes(option.id)}
// // //                   onChange={() => handleCheckboxChange('constructionYears', option.id)}
// // //                 />
// // //                 <span className="checkbox-label">
// // //                   <span>سال {option.label}</span>
// // //                   {getYearBadge(option.id)}
// // //                 </span>
// // //                 <span className="filter-count">{option.count}</span>
// // //               </label>
// // //             ))}
// // //           </div>
// // //         )} */}
// // //       </div>
// // //     );
// // //   };

// // //   const renderAmenitiesFilter = () => {
// // //     if (!filterOptions.amenities?.length) return null;

// // //     const amenityIcons = {
// // //       elevator: '🛗',
// // //       parking: '🅿️',
// // //       pool: '🏊',
// // //       storeRoom: '📦'
// // //     };

// // //     return (
// // //       <div className="filter-section">
// // //         <div 
// // //           className="filter-section-header" 
// // //           onClick={() => toggleSection('amenities')}
// // //         >
// // //           <div className="filter-section-title">
// // //             <span className="icon">✨</span>
// // //             <span>امکانات</span>
// // //           </div>
// // //           <span className="filter-section-toggle">
// // //             {expandedSections.amenities ? '−' : '+'}
// // //           </span>
// // //         </div>
        
// // //         {expandedSections.amenities && (
// // //           <div className="filter-section-content">
// // //             {filterOptions.amenities.map(option => (
// // //               <label key={option.id} className="filter-checkbox">
// // //                 <input
// // //                   type="checkbox"
// // //                   checked={filters.amenities?.includes(option.id)}
// // //                   onChange={() => handleCheckboxChange('amenities', option.id)}
// // //                 />
// // //                 <span className="checkbox-label">
// // //                   <span className="amenity-icon">{amenityIcons[option.id] || '•'}</span>
// // //                   <span>{option.label}</span>
// // //                 </span>
// // //                 <span className="filter-count">{option.count}</span>
// // //               </label>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     );
// // //   };

// // //   const selectedCount = getSelectedCount();
// // //   const activeFilters = getActiveFilters();

// // //   const getYearBadge = (year) => {
// // //     const currentYear = new Date().getFullYear() - 621;
// // //     const age = currentYear - parseInt(year);
    
// // //     if (age <= 2) {
// // //       return <span className="badge-new">نوساز</span>;
// // //     } else if (age <= 5) {
// // //       return <span className="badge-good">ممتاز</span>;
// // //     } else if (age >= 30) {
// // //       return <span className="badge-old">قدیمی</span>;
// // //     }
// // //     return null;
// // //   };

// // //   return (
// // //     <div className="filter-sidebar">
// // //       <div className="filter-sidebar-header">
// // //         <div className="filter-sidebar-title">
// // //           <span>فیلترها</span>
// // //           {selectedCount > 0 && (
// // //             <span className="filter-badge">{selectedCount}</span>
// // //           )}
// // //         </div>
// // //         {selectedCount > 0 && (
// // //           <button onClick={clearAllFilters} className="clear-all-btn">
// // //             حذف همه
// // //           </button>
// // //         )}
// // //       </div>

// // //       {/* نمایش فیلترهای فعال */}
// // //       {activeFilters.length > 0 && (
// // //         <div className="active-filters-container">
// // //           <div className="active-filters-title">فیلترهای انتخاب شده:</div>
// // //           <div className="active-filters-list">
// // //             {activeFilters.map(filter => (
// // //               <div key={filter.id} className="active-filter-tag">
// // //                 <span title={filter.label}>{filter.label}</span>
// // //                 <button 
// // //                   className="remove-filter-btn"
// // //                   onClick={() => removeFilter(filter)}
// // //                   title="حذف فیلتر"
// // //                 >
// // //                   ✕
// // //                 </button>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}

// // //       <div className="filter-sidebar-content">
// // //         {renderRegionFilter()}
// // //         {renderPriceRangeFilter()}
// // //         {renderAreaRangeFilter()}
// // //         {renderFloorFilter()}
// // //         {renderYearRangeFilter()}
// // //         {renderYearFilter()}
// // //         {renderAmenitiesFilter()}
// // //       </div>

// // //       <div className="filter-sidebar-footer">
// // //         <div className="total-results">
// // //           <span>تعداد نتایج:</span>
// // //           <span className="total-results-number">{totalResults}</span>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default FilterSidebar;

// // // FilterSidebar.jsx
// // import React, { useState, useRef } from 'react';
// // import './FilterSidebar.css';

// // const FilterSidebar = ({ 
// //   filters, 
// //   onFilterChange, 
// //   onResetFilters, 
// //   totalResults,
// //   filterOptions = {
// //     regions: [],
// //     floorCounts: [],
// //     constructionYears: [],
// //     amenities: [],
// //     minYear: 1320,
// //     maxYear: 1405,
// //     minArea: 20,
// //     maxArea: 500,
// //     minPrice: 0,
// //     maxPrice: Infinity
// //   }
// // }) => {
// //   const [expandedSections, setExpandedSections] = useState({
// //     regions: false,
// //     floorCounts: false,
// //     constructionYears: false,
// //     amenities: false,
// //     areaRange: false,
// //     yearRange: false,
// //     priceRange: false,
// //     floorRange: false
// //   });

// //   // State برای مقادیر موقت محدوده‌ها
// //   const [tempYearMin, setTempYearMin] = useState(filters.yearMin || '');
// //   const [tempYearMax, setTempYearMax] = useState(filters.yearMax || '');
  
// //   const [tempAreaMin, setTempAreaMin] = useState(filters.areaMin || '');
// //   const [tempAreaMax, setTempAreaMax] = useState(filters.areaMax || '');
  
// //   const [tempPriceMin, setTempPriceMin] = useState(
// //     filters.priceMin !== undefined && filters.priceMin !== null ? filters.priceMin : ''
// //   );
// //   const [tempPriceMax, setTempPriceMax] = useState(
// //     filters.priceMax !== undefined && filters.priceMax !== null ? filters.priceMax : ''
// //   );

// //   const [tempFloorMin, setTempFloorMin] = useState(filters.floorMin || '');
// //   const [tempFloorMax, setTempFloorMax] = useState(filters.floorMax || '');

// //   // Refs برای تایمرهای تاخیر
// //   const yearTimeoutRef = useRef(null);
// //   const areaTimeoutRef = useRef(null);
// //   const priceTimeoutRef = useRef(null);
// //   const floorTimeoutRef = useRef(null);

// //   const toggleSection = (section) => {
// //     setExpandedSections(prev => ({
// //       ...prev,
// //       [section]: !prev[section]
// //     }));
// //   };

// //   const handleCheckboxChange = (section, value) => {
// //     const currentSelection = filters[section] || [];
// //     const newSelection = currentSelection.includes(value)
// //       ? currentSelection.filter(item => item !== value)
// //       : [...currentSelection, value];
    
// //     onFilterChange({ [section]: newSelection });
// //   };

// //   // =============== توابع تبدیل اعداد به حروف فارسی ===============
// //   const numberToPersianWords = (num) => {
// //     if (num === 0 || num === '0') return 'صفر';
// //     if (!num && num !== 0) return '';
    
// //     const numValue = typeof num === 'string' ? parseInt(num.replace(/,/g, '')) : num;
// //     if (isNaN(numValue)) return '';

// //     const units = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
// //     const tens = ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
// //     const hundreds = ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
// //     const thousands = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

// //     const convertChunk = (n) => {
// //       if (n === 0) return '';
      
// //       let result = '';
// //       const h = Math.floor(n / 100);
// //       const t = Math.floor((n % 100) / 10);
// //       const u = n % 10;

// //       if (h > 0) {
// //         result += hundreds[h];
// //       }

// //       if (t > 0) {
// //         if (result) result += ' و ';
// //         if (t === 1 && u > 0) {
// //           const teens = ['', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
// //           result += teens[u];
// //           return result;
// //         }
// //         result += tens[t];
// //       }

// //       if (u > 0 && t !== 1) {
// //         if (result) result += ' و ';
// //         result += units[u];
// //       }

// //       return result;
// //     };

// //     let n = numValue;
// //     if (n < 1000) {
// //       return convertChunk(n) || 'صفر';
// //     }

// //     let result = '';
// //     let chunkIndex = 0;

// //     while (n > 0) {
// //       const chunk = n % 1000;
// //       if (chunk > 0) {
// //         const chunkWords = convertChunk(chunk);
// //         if (chunkWords) {
// //           const thousandWord = thousands[chunkIndex];
// //           const prefix = result ? ' و ' : '';
// //           result = chunkWords + (thousandWord ? ' ' + thousandWord : '') + prefix + result;
// //         }
// //       }
// //       n = Math.floor(n / 1000);
// //       chunkIndex++;
// //     }

// //     return result || 'صفر';
// //   };

// //   const formatPriceWithWords = (price) => {
// //     if (!price && price !== 0) return '';
// //     if (price === 0) return 'صفر تومان';
    
// //     const numValue = typeof price === 'string' ? parseInt(price.replace(/,/g, '')) : price;
// //     if (isNaN(numValue)) return '';

// //     if (numValue >= 1000000000) {
// //       const billions = numValue / 1000000000;
// //       if (Number.isInteger(billions)) {
// //         return `${numberToPersianWords(billions)} میلیارد تومان`;
// //       }
// //       const billionPart = Math.floor(billions);
// //       const millionPart = Math.round((billions - billionPart) * 1000);
// //       let result = '';
// //       if (billionPart > 0) result += `${numberToPersianWords(billionPart)} میلیارد`;
// //       if (millionPart > 0) {
// //         if (result) result += ' و ';
// //         result += `${numberToPersianWords(millionPart)} میلیون`;
// //       }
// //       return result + ' تومان';
// //     } else if (numValue >= 1000000) {
// //       const millions = numValue / 1000000;
// //       if (Number.isInteger(millions)) {
// //         return `${numberToPersianWords(millions)} میلیون تومان`;
// //       }
// //       const millionPart = Math.floor(millions);
// //       const thousandPart = Math.round((millions - millionPart) * 1000);
// //       let result = '';
// //       if (millionPart > 0) result += `${numberToPersianWords(millionPart)} میلیون`;
// //       if (thousandPart > 0) {
// //         if (result) result += ' و ';
// //         result += `${numberToPersianWords(thousandPart)} هزار`;
// //       }
// //       return result + ' تومان';
// //     } else if (numValue >= 1000) {
// //       const thousands = numValue / 1000;
// //       if (Number.isInteger(thousands)) {
// //         return `${numberToPersianWords(thousands)} هزار تومان`;
// //       }
// //       return `${numberToPersianWords(numValue)} تومان`;
// //     }
// //     return `${numberToPersianWords(numValue)} تومان`;
// //   };

// //   // =============== تابع جداکننده ۳ رقم ۳ رقم ===============
// //   const formatNumberWithCommas = (num) => {
// //     if (num === undefined || num === null || num === '') return '';
// //     const numStr = String(num).replace(/,/g, '');
// //     if (numStr === '' || isNaN(numStr)) return '';
// //     return Number(numStr).toLocaleString('en-US');
// //   };

// //   // =============== توابع مدیریت محدوده سال ===============
// //   const handleYearMinChange = (e) => {
// //     const value = e.target.value;
// //     const numValue = value === '' ? '' : Number(value);
// //     setTempYearMin(numValue);
    
// //     if (yearTimeoutRef.current) clearTimeout(yearTimeoutRef.current);
// //     yearTimeoutRef.current = setTimeout(() => {
// //       if (numValue !== '' && !isNaN(numValue)) {
// //         onFilterChange({ yearMin: numValue });
// //       } else {
// //         onFilterChange({ yearMin: undefined });
// //       }
// //     }, 500);
// //   };

// //   const handleYearMaxChange = (e) => {
// //     const value = e.target.value;
// //     const numValue = value === '' ? '' : Number(value);
// //     setTempYearMax(numValue);
    
// //     if (yearTimeoutRef.current) clearTimeout(yearTimeoutRef.current);
// //     yearTimeoutRef.current = setTimeout(() => {
// //       if (numValue !== '' && !isNaN(numValue)) {
// //         onFilterChange({ yearMax: numValue });
// //       } else {
// //         onFilterChange({ yearMax: undefined });
// //       }
// //     }, 500);
// //   };

// //   const resetYearRange = () => {
// //     setTempYearMin('');
// //     setTempYearMax('');
// //     onFilterChange({ yearMin: undefined, yearMax: undefined });
// //   };

// //   // =============== توابع مدیریت محدوده متراژ ===============
// //   const handleAreaMinChange = (e) => {
// //     const value = e.target.value;
// //     const numValue = value === '' ? '' : Number(value);
// //     setTempAreaMin(numValue);
    
// //     if (areaTimeoutRef.current) clearTimeout(areaTimeoutRef.current);
// //     areaTimeoutRef.current = setTimeout(() => {
// //       if (numValue !== '' && !isNaN(numValue)) {
// //         onFilterChange({ areaMin: numValue });
// //       } else {
// //         onFilterChange({ areaMin: undefined });
// //       }
// //     }, 500);
// //   };

// //   const handleAreaMaxChange = (e) => {
// //     const value = e.target.value;
// //     const numValue = value === '' ? '' : Number(value);
// //     setTempAreaMax(numValue);
    
// //     if (areaTimeoutRef.current) clearTimeout(areaTimeoutRef.current);
// //     areaTimeoutRef.current = setTimeout(() => {
// //       if (numValue !== '' && !isNaN(numValue)) {
// //         onFilterChange({ areaMax: numValue });
// //       } else {
// //         onFilterChange({ areaMax: undefined });
// //       }
// //     }, 500);
// //   };

// //   const resetAreaRange = () => {
// //     setTempAreaMin('');
// //     setTempAreaMax('');
// //     onFilterChange({ areaMin: undefined, areaMax: undefined });
// //   };

// //   // =============== توابع مدیریت محدوده قیمت ===============
// //   const handlePriceMinChange = (e) => {
// //     const value = e.target.value;
// //     const cleanValue = value.replace(/,/g, '');
// //     const numValue = cleanValue === '' ? '' : Number(cleanValue);
// //     setTempPriceMin(numValue);
    
// //     if (priceTimeoutRef.current) clearTimeout(priceTimeoutRef.current);
// //     priceTimeoutRef.current = setTimeout(() => {
// //       const min = numValue === '' ? undefined : Number(numValue);
// //       const max = tempPriceMax === '' ? undefined : Number(tempPriceMax);
// //       onFilterChange({ priceMin: min, priceMax: max });
// //     }, 500);
// //   };

// //   const handlePriceMaxChange = (e) => {
// //     const value = e.target.value;
// //     const cleanValue = value.replace(/,/g, '');
// //     const numValue = cleanValue === '' ? '' : Number(cleanValue);
// //     setTempPriceMax(numValue);
    
// //     if (priceTimeoutRef.current) clearTimeout(priceTimeoutRef.current);
// //     priceTimeoutRef.current = setTimeout(() => {
// //       const min = tempPriceMin === '' ? undefined : Number(tempPriceMin);
// //       const max = numValue === '' ? undefined : Number(numValue);
// //       onFilterChange({ priceMin: min, priceMax: max });
// //     }, 500);
// //   };

// //   const resetPriceRange = () => {
// //     setTempPriceMin('');
// //     setTempPriceMax('');
// //     onFilterChange({ priceMin: undefined, priceMax: undefined });
// //   };

// //   // =============== توابع مدیریت محدوده طبقات ===============
// //   const handleFloorMinChange = (e) => {
// //     const value = e.target.value;
// //     const numValue = value === '' ? '' : Number(value);
// //     setTempFloorMin(numValue);
    
// //     if (floorTimeoutRef.current) clearTimeout(floorTimeoutRef.current);
// //     floorTimeoutRef.current = setTimeout(() => {
// //       if (numValue !== '' && !isNaN(numValue)) {
// //         onFilterChange({ floorMin: numValue });
// //       } else {
// //         onFilterChange({ floorMin: undefined });
// //       }
// //     }, 500);
// //   };

// //   const handleFloorMaxChange = (e) => {
// //     const value = e.target.value;
// //     const numValue = value === '' ? '' : Number(value);
// //     setTempFloorMax(numValue);
    
// //     if (floorTimeoutRef.current) clearTimeout(floorTimeoutRef.current);
// //     floorTimeoutRef.current = setTimeout(() => {
// //       if (numValue !== '' && !isNaN(numValue)) {
// //         onFilterChange({ floorMax: numValue });
// //       } else {
// //         onFilterChange({ floorMax: undefined });
// //       }
// //     }, 500);
// //   };

// //   const resetFloorRange = () => {
// //     setTempFloorMin('');
// //     setTempFloorMax('');
// //     onFilterChange({ floorMin: undefined, floorMax: undefined });
// //   };

// //   const clearAllFilters = () => {
// //     onResetFilters();
// //     resetYearRange();
// //     resetAreaRange();
// //     resetPriceRange();
// //     resetFloorRange();
// //   };

// //   const getSelectedCount = () => {
// //     let count = 0;
    
// //     // شمارش فیلترهای چک‌باکس
// //     Object.values(filters).forEach(arr => {
// //       if (Array.isArray(arr)) count += arr.length;
// //     });
    
// //     // فقط اگر سال مقدار داشته باشد
// //     if (filters.yearMin !== undefined || filters.yearMax !== undefined) count++;
    
// //     // فقط اگر متراژ مقدار داشته باشد
// //     if (filters.areaMin !== undefined || filters.areaMax !== undefined) count++;
    
// //     // فقط اگر قیمت تعیین شده باشد
// //     if (filters.priceMin !== undefined || filters.priceMax !== undefined) count++;
    
// //     // فقط اگر طبقات مقدار داشته باشد
// //     if (filters.floorMin !== undefined || filters.floorMax !== undefined) count++;
    
// //     return count;
// //   };

// //   const getActiveFilters = () => {
// //     const activeFilters = [];

// //     const filterLabels = {
// //       regions: filterOptions.regions,
// //       constructionYears: filterOptions.constructionYears,
// //       amenities: filterOptions.amenities
// //     };

// //     Object.keys(filterLabels).forEach(key => {
// //       const selected = filters[key] || [];
// //       const options = filterLabels[key] || [];
      
// //       selected.forEach(id => {
// //         const option = options.find(opt => opt.id === id);
// //         if (option) {
// //           activeFilters.push({
// //             id: `${key}-${id}`,
// //             label: option.label,
// //             type: key,
// //             value: id
// //           });
// //         }
// //       });
// //     });

// //     // فقط اگر سال مقدار داشته باشد نمایش بده
// //     if (filters.yearMin !== undefined || filters.yearMax !== undefined) {
// //       const minText = filters.yearMin !== undefined ? filters.yearMin : 'هر سال';
// //       const maxText = filters.yearMax !== undefined ? filters.yearMax : 'هر سال';
// //       activeFilters.push({
// //         id: 'year-range',
// //         label: `سال ${minText} تا ${maxText}`,
// //         type: 'yearRange',
// //         value: 'year-range'
// //       });
// //     }

// //     // فقط اگر متراژ مقدار داشته باشد نمایش بده
// //     if (filters.areaMin !== undefined || filters.areaMax !== undefined) {
// //       const minText = filters.areaMin !== undefined ? filters.areaMin : 'هر متراژ';
// //       const maxText = filters.areaMax !== undefined ? filters.areaMax : 'هر متراژ';
// //       activeFilters.push({
// //         id: 'area-range',
// //         label: `${minText} - ${maxText} متر مربع`,
// //         type: 'areaRange',
// //         value: 'area-range'
// //       });
// //     }

// //     // فقط اگر قیمت تعیین شده باشد نمایش بده
// //     if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
// //       const minText = filters.priceMin !== undefined && filters.priceMin !== null ? formatPriceWithWords(filters.priceMin) : 'هر قیمت';
// //       const maxText = filters.priceMax !== undefined && filters.priceMax !== null ? formatPriceWithWords(filters.priceMax) : 'هر قیمت';
// //       const priceText = `${minText} تا ${maxText}`;
// //       activeFilters.push({
// //         id: 'price-range',
// //         label: priceText,
// //         type: 'priceRange',
// //         value: 'price-range'
// //       });
// //     }

// //     // فقط اگر طبقات مقدار داشته باشد نمایش بده
// //     if (filters.floorMin !== undefined || filters.floorMax !== undefined) {
// //       const minText = filters.floorMin !== undefined ? filters.floorMin : 'همکف';
// //       const maxText = filters.floorMax !== undefined ? filters.floorMax : '۵ و بالاتر';
      
// //       let displayMin = minText;
// //       let displayMax = maxText;
      
// //       if (minText === 0) displayMin = 'همکف';
// //       if (maxText === 5 || maxText === '۵') displayMax = '۵ و بالاتر';
      
// //       activeFilters.push({
// //         id: 'floor-range',
// //         label: `طبقه ${displayMin} تا ${displayMax}`,
// //         type: 'floorRange',
// //         value: 'floor-range'
// //       });
// //     }

// //     return activeFilters;
// //   };

// //   const removeFilter = (filter) => {
// //     if (filter.type === 'yearRange') {
// //       resetYearRange();
// //     } else if (filter.type === 'areaRange') {
// //       resetAreaRange();
// //     } else if (filter.type === 'priceRange') {
// //       resetPriceRange();
// //     } else if (filter.type === 'floorRange') {
// //       resetFloorRange();
// //     } else {
// //       const currentSelection = filters[filter.type] || [];
// //       const newSelection = currentSelection.filter(item => item !== filter.value);
// //       onFilterChange({ [filter.type]: newSelection });
// //     }
// //   };

// //   // =============== رندر فیلتر محدوده قیمت ===============
// //   const renderPriceRangeFilter = () => {
// //     const minDisplay = tempPriceMin !== '' && tempPriceMin !== null && tempPriceMin !== undefined 
// //       ? formatNumberWithCommas(tempPriceMin) : '';
// //     const maxDisplay = tempPriceMax !== '' && tempPriceMax !== null && tempPriceMax !== undefined 
// //       ? formatNumberWithCommas(tempPriceMax) : '';
    
// //     const minWords = tempPriceMin !== '' && tempPriceMin !== null ? numberToPersianWords(tempPriceMin) : '';
// //     const maxWords = tempPriceMax !== '' && tempPriceMax !== null ? numberToPersianWords(tempPriceMax) : '';

// //     return (
// //       <div className="filter-section">
// //         <div 
// //           className="filter-section-header" 
// //           onClick={() => toggleSection('priceRange')}
// //         >
// //           <div className="filter-section-title">
// //             <span className="icon">💰</span>
// //             <span>محدوده قیمت (تومان)</span>
// //           </div>
// //           <span className="filter-section-toggle">
// //             {expandedSections.priceRange ? '−' : '+'}
// //           </span>
// //         </div>
        
// //         {expandedSections.priceRange && (
// //           <div className="filter-section-content">
// //             <div className="range-filter">
// //               <div className="range-inputs">
// //                 <div className="range-input-group">
// //                   <label>حداقل</label>
// //                   <input
// //                     type="text"
// //                     value={minDisplay}
// //                     onChange={handlePriceMinChange}
// //                     className="range-input price-input"
// //                     placeholder="مثلا ۱۰۰,۰۰۰,۰۰۰"
// //                     dir="ltr"
// //                   />
// //                   {minWords && (
// //                     <span className="price-words">{minWords} تومان</span>
// //                   )}
// //                 </div>
// //                 <div className="range-input-group">
// //                   <label>حداکثر</label>
// //                   <input
// //                     type="text"
// //                     value={maxDisplay}
// //                     onChange={handlePriceMaxChange}
// //                     className="range-input price-input"
// //                     placeholder="مثلا ۵۰۰,۰۰۰,۰۰۰"
// //                     dir="ltr"
// //                   />
// //                   {maxWords && (
// //                     <span className="price-words">{maxWords} تومان</span>
// //                   )}
// //                 </div>
// //               </div>
// //               <div className="range-actions">
// //                 <button onClick={resetPriceRange} className="reset-range-btn">
// //                   ریست
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   // =============== رندر فیلتر محدوده سال ===============
// //   const renderYearRangeFilter = () => {
// //     return (
// //       <div className="filter-section">
// //         <div 
// //           className="filter-section-header" 
// //           onClick={() => toggleSection('yearRange')}
// //         >
// //           <div className="filter-section-title">
// //             <span className="icon">📅</span>
// //             <span>محدوده سال ساخت</span>
// //           </div>
// //           <span className="filter-section-toggle">
// //             {expandedSections.yearRange ? '−' : '+'}
// //           </span>
// //         </div>
        
// //         {expandedSections.yearRange && (
// //           <div className="filter-section-content">
// //             <div className="range-filter">
// //               <div className="range-inputs">
// //                 <div className="range-input-group">
// //                   <label>از سال</label>
// //                   <input
// //                     type="number"
// //                     value={tempYearMin}
// //                     onChange={handleYearMinChange}
// //                     className="range-input"
// //                     placeholder="مثلا ۱۳۸۰"
// //                     step="1"
// //                   />
// //                 </div>
// //                 <div className="range-input-group">
// //                   <label>تا سال</label>
// //                   <input
// //                     type="number"
// //                     value={tempYearMax}
// //                     onChange={handleYearMaxChange}
// //                     className="range-input"
// //                     placeholder="مثلا ۱۴۰۰"
// //                     step="1"
// //                   />
// //                 </div>
// //               </div>
// //               <div className="range-actions">
// //                 <button onClick={resetYearRange} className="reset-range-btn">
// //                   ریست
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   // =============== رندر فیلتر محدوده متراژ ===============
// //   const renderAreaRangeFilter = () => {
// //     return (
// //       <div className="filter-section">
// //         <div 
// //           className="filter-section-header" 
// //           onClick={() => toggleSection('areaRange')}
// //         >
// //           <div className="filter-section-title">
// //             <span className="icon">📐</span>
// //             <span>متراژ (متر مربع)</span>
// //           </div>
// //           <span className="filter-section-toggle">
// //             {expandedSections.areaRange ? '−' : '+'}
// //           </span>
// //         </div>
        
// //         {expandedSections.areaRange && (
// //           <div className="filter-section-content">
// //             <div className="range-filter">
// //               <div className="range-inputs">
// //                 <div className="range-input-group">
// //                   <label>حداقل</label>
// //                   <input
// //                     type="number"
// //                     value={tempAreaMin}
// //                     onChange={handleAreaMinChange}
// //                     className="range-input"
// //                     placeholder="مثلا ۵۰"
// //                     step="1"
// //                   />
// //                 </div>
// //                 <div className="range-input-group">
// //                   <label>حداکثر</label>
// //                   <input
// //                     type="number"
// //                     value={tempAreaMax}
// //                     onChange={handleAreaMaxChange}
// //                     className="range-input"
// //                     placeholder="مثلا ۲۰۰"
// //                     step="1"
// //                   />
// //                 </div>
// //               </div>
// //               <div className="range-actions">
// //                 <button onClick={resetAreaRange} className="reset-range-btn">
// //                   ریست
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   // =============== رندر فیلتر محدوده طبقات ===============
// //   const renderFloorRangeFilter = () => {
// //     const floorOptions = [
// //       { value: 0, label: 'همکف' },
// //       { value: 1, label: '۱' },
// //       { value: 2, label: '۲' },
// //       { value: 3, label: '۳' },
// //       { value: 4, label: '۴' },
// //       { value: 5, label: '۵ و بالاتر' }
// //     ];

// //     return (
// //       <div className="filter-section">
// //         <div 
// //           className="filter-section-header" 
// //           onClick={() => toggleSection('floorRange')}
// //         >
// //           <div className="filter-section-title">
// //             <span className="icon">🏢</span>
// //             <span>تعداد طبقات</span>
// //           </div>
// //           <span className="filter-section-toggle">
// //             {expandedSections.floorRange ? '−' : '+'}
// //           </span>
// //         </div>
        
// //         {expandedSections.floorRange && (
// //           <div className="filter-section-content">
// //             <div className="range-filter">
// //               <div className="range-inputs">
// //                 <div className="range-input-group">
// //                   <label>از طبقه</label>
// //                   <select
// //                     value={tempFloorMin}
// //                     onChange={(e) => {
// //                       const value = e.target.value;
// //                       const numValue = value === '' ? '' : Number(value);
// //                       setTempFloorMin(numValue);
// //                       if (floorTimeoutRef.current) clearTimeout(floorTimeoutRef.current);
// //                       floorTimeoutRef.current = setTimeout(() => {
// //                         if (numValue !== '' && !isNaN(numValue)) {
// //                           onFilterChange({ floorMin: numValue });
// //                         } else {
// //                           onFilterChange({ floorMin: undefined });
// //                         }
// //                       }, 300);
// //                     }}
// //                     className="range-input select-input"
// //                   >
// //                     <option value="">انتخاب کنید</option>
// //                     {floorOptions.map(option => (
// //                       <option key={option.value} value={option.value}>
// //                         {option.label}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>
// //                 <div className="range-input-group">
// //                   <label>تا طبقه</label>
// //                   <select
// //                     value={tempFloorMax}
// //                     onChange={(e) => {
// //                       const value = e.target.value;
// //                       const numValue = value === '' ? '' : Number(value);
// //                       setTempFloorMax(numValue);
// //                       if (floorTimeoutRef.current) clearTimeout(floorTimeoutRef.current);
// //                       floorTimeoutRef.current = setTimeout(() => {
// //                         if (numValue !== '' && !isNaN(numValue)) {
// //                           onFilterChange({ floorMax: numValue });
// //                         } else {
// //                           onFilterChange({ floorMax: undefined });
// //                         }
// //                       }, 300);
// //                     }}
// //                     className="range-input select-input"
// //                   >
// //                     <option value="">انتخاب کنید</option>
// //                     {floorOptions.map(option => (
// //                       <option key={option.value} value={option.value}>
// //                         {option.label}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>
// //               </div>
// //               <div className="range-actions">
// //                 <button onClick={resetFloorRange} className="reset-range-btn">
// //                   ریست
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   // =============== رندر فیلترهای دیگر ===============
// //   const renderRegionFilter = () => {
// //     if (!filterOptions.regions?.length) return null;

// //     return (
// //       <div className="filter-section">
// //         <div 
// //           className="filter-section-header" 
// //           onClick={() => toggleSection('regions')}
// //         >
// //           <div className="filter-section-title">
// //             <span className="icon">📍</span>
// //             <span>منطقه</span>
// //           </div>
// //           <span className="filter-section-toggle">
// //             {expandedSections.regions ? '−' : '+'}
// //           </span>
// //         </div>
        
// //         {expandedSections.regions && (
// //           <div className="filter-section-content">
// //             {filterOptions.regions.map(option => (
// //               <label key={option.id} className="filter-checkbox">
// //                 <input
// //                   type="checkbox"
// //                   checked={filters.regions?.includes(option.id)}
// //                   onChange={() => handleCheckboxChange('regions', option.id)}
// //                 />
// //                 <span className="checkbox-label">{option.label}</span>
// //                 <span className="filter-count">{option.count}</span>
// //               </label>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   const renderFloorFilter = () => {
// //     if (!filterOptions.floorCounts?.length) return null;

// //     return (
// //       <div className="filter-section">
// //         <div 
// //           className="filter-section-header" 
// //           onClick={() => toggleSection('floorCounts')}
// //         >
// //           <div className="filter-section-title">
// //             <span className="icon">🏢</span>
// //             <span>تعداد طبقات</span>
// //           </div>
// //           <span className="filter-section-toggle">
// //             {expandedSections.floorCounts ? '−' : '+'}
// //           </span>
// //         </div>
        
// //         {expandedSections.floorCounts && (
// //           <div className="filter-section-content">
// //             {filterOptions.floorCounts.map(option => (
// //               <label key={option.id} className="filter-checkbox">
// //                 <input
// //                   type="checkbox"
// //                   checked={filters.floorCounts?.includes(option.id)}
// //                   onChange={() => handleCheckboxChange('floorCounts', option.id)}
// //                 />
// //                 <span className="checkbox-label">{option.label}</span>
// //                 <span className="filter-count">{option.count}</span>
// //               </label>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   const renderYearFilter = () => {
// //     if (!filterOptions.constructionYears?.length) return null;

// //     const sortedYears = [...filterOptions.constructionYears].sort((a, b) => 
// //       parseInt(b.id) - parseInt(a.id)
// //     );

// //     return (
// //       <div className="filter-section">
// //         <div 
// //           className="filter-section-header" 
// //           onClick={() => toggleSection('constructionYears')}
// //         >
// //           <div className="filter-section-title">
// //             <span className="icon">📅</span>
// //             <span>سال ساخت</span>
// //           </div>
// //           <span className="filter-section-toggle">
// //             {expandedSections.constructionYears ? '−' : '+'}
// //           </span>
// //         </div>
        
// //         {expandedSections.constructionYears && (
// //           <div className="filter-section-content">
// //             {sortedYears.map(option => (
// //               <label key={option.id} className="filter-checkbox">
// //                 <input
// //                   type="checkbox"
// //                   checked={filters.constructionYears?.includes(option.id)}
// //                   onChange={() => handleCheckboxChange('constructionYears', option.id)}
// //                 />
// //                 <span className="checkbox-label">
// //                   <span>سال {option.label}</span>
// //                   {getYearBadge(option.id)}
// //                 </span>
// //                 <span className="filter-count">{option.count}</span>
// //               </label>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   const renderAmenitiesFilter = () => {
// //     if (!filterOptions.amenities?.length) return null;

// //     const amenityIcons = {
// //       elevator: '🛗',
// //       parking: '🅿️',
// //       pool: '🏊',
// //       storeRoom: '📦'
// //     };

// //     return (
// //       <div className="filter-section">
// //         <div 
// //           className="filter-section-header" 
// //           onClick={() => toggleSection('amenities')}
// //         >
// //           <div className="filter-section-title">
// //             <span className="icon">✨</span>
// //             <span>امکانات</span>
// //           </div>
// //           <span className="filter-section-toggle">
// //             {expandedSections.amenities ? '−' : '+'}
// //           </span>
// //         </div>
        
// //         {expandedSections.amenities && (
// //           <div className="filter-section-content">
// //             {filterOptions.amenities.map(option => (
// //               <label key={option.id} className="filter-checkbox">
// //                 <input
// //                   type="checkbox"
// //                   checked={filters.amenities?.includes(option.id)}
// //                   onChange={() => handleCheckboxChange('amenities', option.id)}
// //                 />
// //                 <span className="checkbox-label">
// //                   <span className="amenity-icon">{amenityIcons[option.id] || '•'}</span>
// //                   <span>{option.label}</span>
// //                 </span>
// //                 <span className="filter-count">{option.count}</span>
// //               </label>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   const selectedCount = getSelectedCount();
// //   const activeFilters = getActiveFilters();

// //   const getYearBadge = (year) => {
// //     const currentYear = new Date().getFullYear() - 621;
// //     const age = currentYear - parseInt(year);
    
// //     if (age <= 2) {
// //       return <span className="badge-new">نوساز</span>;
// //     } else if (age <= 5) {
// //       return <span className="badge-good">ممتاز</span>;
// //     } else if (age >= 30) {
// //       return <span className="badge-old">قدیمی</span>;
// //     }
// //     return null;
// //   };

// //   return (
// //     <div className="filter-sidebar">
// //       <div className="filter-sidebar-header">
// //         <div className="filter-sidebar-title">
// //           <span>فیلترها</span>
// //           {selectedCount > 0 && (
// //             <span className="filter-badge">{selectedCount}</span>
// //           )}
// //         </div>
// //         {selectedCount > 0 && (
// //           <button onClick={clearAllFilters} className="clear-all-btn">
// //             حذف همه
// //           </button>
// //         )}
// //       </div>

// //       {/* نمایش فیلترهای فعال */}
// //       {activeFilters.length > 0 && (
// //         <div className="active-filters-container">
// //           <div className="active-filters-title">فیلترهای انتخاب شده:</div>
// //           <div className="active-filters-list">
// //             {activeFilters.map(filter => (
// //               <div key={filter.id} className="active-filter-tag">
// //                 <span title={filter.label}>{filter.label}</span>
// //                 <button 
// //                   className="remove-filter-btn"
// //                   onClick={() => removeFilter(filter)}
// //                   title="حذف فیلتر"
// //                 >
// //                   ✕
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       <div className="filter-sidebar-content">
// //         {renderRegionFilter()}
// //         {renderPriceRangeFilter()}
// //         {renderAreaRangeFilter()}
// //         {renderFloorRangeFilter()}
// //         {renderYearRangeFilter()}
// //         {renderYearFilter()}
// //         {renderAmenitiesFilter()}
// //       </div>

// //       <div className="filter-sidebar-footer">
// //         <div className="total-results">
// //           <span>تعداد نتایج:</span>
// //           <span className="total-results-number">{totalResults}</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FilterSidebar;

// // FilterSidebar.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import './FilterSidebar.css';

// const FilterSidebar = ({ 
//   filters, 
//   onFilterChange, 
//   onResetFilters, 
//   totalResults,
//   selectedCityId,
//   filterOptions = {
//     regions: [],
//     floorCounts: [],
//     constructionYears: [],
//     amenities: [],
//     minYear: 1320,
//     maxYear: 1405,
//     minArea: 20,
//     maxArea: 500,
//     minPrice: 0,
//     maxPrice: Infinity
//   }
// }) => {
//   const [expandedSections, setExpandedSections] = useState({
//     regions: false,
//     floorCounts: false,
//     constructionYears: false,
//     amenities: false,
//     areaRange: false,
//     yearRange: false,
//     priceRange: false,
//     floorRange: false
//   });

//   // State برای مناطق
//   const [regionsData, setRegionsData] = useState([]);
//   const [filteredRegions, setFilteredRegions] = useState([]);
//   const [searchRegion, setSearchRegion] = useState('');
//   const [isLoadingRegions, setIsLoadingRegions] = useState(false);
//   const [expandedRegions, setExpandedRegions] = useState({});

//   // State برای مقادیر موقت محدوده‌ها
//   const [tempYearMin, setTempYearMin] = useState(filters.yearMin || '');
//   const [tempYearMax, setTempYearMax] = useState(filters.yearMax || '');
  
//   const [tempAreaMin, setTempAreaMin] = useState(filters.areaMin || '');
//   const [tempAreaMax, setTempAreaMax] = useState(filters.areaMax || '');
  
//   const [tempPriceMin, setTempPriceMin] = useState(
//     filters.priceMin !== undefined && filters.priceMin !== null ? filters.priceMin : ''
//   );
//   const [tempPriceMax, setTempPriceMax] = useState(
//     filters.priceMax !== undefined && filters.priceMax !== null ? filters.priceMax : ''
//   );

//   const [tempFloorMin, setTempFloorMin] = useState(filters.floorMin || '');
//   const [tempFloorMax, setTempFloorMax] = useState(filters.floorMax || '');

//   // Refs برای تایمرهای تاخیر
//   const yearTimeoutRef = useRef(null);
//   const areaTimeoutRef = useRef(null);
//   const priceTimeoutRef = useRef(null);
//   const floorTimeoutRef = useRef(null);
//   const searchTimeoutRef = useRef(null);

//   // =============== دریافت مناطق از API ===============
//   useEffect(() => {
//     if (selectedCityId) {
//       fetchRegions(selectedCityId);
//     }
//   }, [selectedCityId]);

//   const fetchRegions = async (cityId) => {
//     setIsLoadingRegions(true);
//     try {
//       const response = await fetch('https://localhost:7178/api/RealEstatePage/GetRegionsWithChildrenLinq', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(cityId)
//       });
      
//       const result = await response.json();
      
//       if (result.status === 200 && result.data) {
//         // تبدیل داده به فرمت مورد نظر
//         const formattedRegions = result.data.map(item => ({
//           id: item.id,
//           name: item.parentName,
//           children: item.childrenNames ? item.childrenNames.split(',').map(name => name.trim()) : []
//         }));
        
//         setRegionsData(formattedRegions);
//         setFilteredRegions(formattedRegions);
        
//         // همه مناطق به صورت پیش‌فرض باز باشند
//         const expanded = {};
//         formattedRegions.forEach(region => {
//           expanded[region.id] = true;
//         });
//         setExpandedRegions(expanded);
//       }
//     } catch (error) {
//       console.error('Error fetching regions:', error);
//     } finally {
//       setIsLoadingRegions(false);
//     }
//   };

//   // =============== جستجوی مناطق ===============
//   const handleRegionSearch = (e) => {
//     const value = e.target.value;
//     setSearchRegion(value);
    
//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }
    
//     searchTimeoutRef.current = setTimeout(() => {
//       if (value.trim() === '') {
//         setFilteredRegions(regionsData);
//         return;
//       }
      
//       const searchTerm = value.trim().toLowerCase();
//       const filtered = regionsData.filter(region => {
//         // جستجو در نام منطقه
//         if (region.name.toLowerCase().includes(searchTerm)) return true;
//         // جستجو در زیرمنطقه‌ها
//         if (region.children.some(child => child.toLowerCase().includes(searchTerm))) return true;
//         return false;
//       });
      
//       setFilteredRegions(filtered);
//     }, 300);
//   };

//   // =============== توگل باز/بسته شدن منطقه ===============
//   const toggleRegion = (regionId) => {
//     setExpandedRegions(prev => ({
//       ...prev,
//       [regionId]: !prev[regionId]
//     }));
//   };

//   // =============== انتخاب زیرمنطقه ===============
//   const handleSubRegionCheck = (regionId, subRegionName) => {
//     const currentSelection = filters.regions || [];
//     const regionKey = `${regionId}-${subRegionName}`;
    
//     const newSelection = currentSelection.includes(regionKey)
//       ? currentSelection.filter(item => item !== regionKey)
//       : [...currentSelection, regionKey];
    
//     onFilterChange({ regions: newSelection });
//   };

//   // =============== انتخاب کل منطقه ===============
//   const handleRegionCheck = (regionId) => {
//     const region = regionsData.find(r => r.id === regionId);
//     if (!region) return;
    
//     const currentSelection = filters.regions || [];
//     const regionKeys = region.children.map(child => `${regionId}-${child}`);
    
//     // بررسی اینکه آیا همه زیرمنطقه‌ها انتخاب شده‌اند
//     const allSelected = regionKeys.every(key => currentSelection.includes(key));
    
//     let newSelection;
//     if (allSelected) {
//       // حذف همه زیرمنطقه‌های این منطقه
//       newSelection = currentSelection.filter(item => !regionKeys.includes(item));
//     } else {
//       // اضافه کردن همه زیرمنطقه‌ها
//       const toAdd = regionKeys.filter(key => !currentSelection.includes(key));
//       newSelection = [...currentSelection, ...toAdd];
//     }
    
//     onFilterChange({ regions: newSelection });
//   };

//   // =============== بررسی وضعیت انتخاب منطقه ===============
//   const getRegionCheckStatus = (regionId) => {
//     const region = regionsData.find(r => r.id === regionId);
//     if (!region) return { checked: false, indeterminate: false };
    
//     const currentSelection = filters.regions || [];
//     const regionKeys = region.children.map(child => `${regionId}-${child}`);
    
//     const selectedCount = regionKeys.filter(key => currentSelection.includes(key)).length;
    
//     if (selectedCount === 0) return { checked: false, indeterminate: false };
//     if (selectedCount === regionKeys.length) return { checked: true, indeterminate: false };
//     return { checked: false, indeterminate: true };
//   };

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const handleCheckboxChange = (section, value) => {
//     const currentSelection = filters[section] || [];
//     const newSelection = currentSelection.includes(value)
//       ? currentSelection.filter(item => item !== value)
//       : [...currentSelection, value];
    
//     onFilterChange({ [section]: newSelection });
//   };

//   // =============== توابع تبدیل اعداد به حروف فارسی ===============
//   const numberToPersianWords = (num) => {
//     if (num === 0 || num === '0') return 'صفر';
//     if (!num && num !== 0) return '';
    
//     const numValue = typeof num === 'string' ? parseInt(num.replace(/,/g, '')) : num;
//     if (isNaN(numValue)) return '';

//     const units = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
//     const tens = ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
//     const hundreds = ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
//     const thousands = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

//     const convertChunk = (n) => {
//       if (n === 0) return '';
      
//       let result = '';
//       const h = Math.floor(n / 100);
//       const t = Math.floor((n % 100) / 10);
//       const u = n % 10;

//       if (h > 0) {
//         result += hundreds[h];
//       }

//       if (t > 0) {
//         if (result) result += ' و ';
//         if (t === 1 && u > 0) {
//           const teens = ['', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
//           result += teens[u];
//           return result;
//         }
//         result += tens[t];
//       }

//       if (u > 0 && t !== 1) {
//         if (result) result += ' و ';
//         result += units[u];
//       }

//       return result;
//     };

//     let n = numValue;
//     if (n < 1000) {
//       return convertChunk(n) || 'صفر';
//     }

//     let result = '';
//     let chunkIndex = 0;

//     while (n > 0) {
//       const chunk = n % 1000;
//       if (chunk > 0) {
//         const chunkWords = convertChunk(chunk);
//         if (chunkWords) {
//           const thousandWord = thousands[chunkIndex];
//           const prefix = result ? ' و ' : '';
//           result = chunkWords + (thousandWord ? ' ' + thousandWord : '') + prefix + result;
//         }
//       }
//       n = Math.floor(n / 1000);
//       chunkIndex++;
//     }

//     return result || 'صفر';
//   };

//   const formatPriceWithWords = (price) => {
//     if (!price && price !== 0) return '';
//     if (price === 0) return 'صفر تومان';
    
//     const numValue = typeof price === 'string' ? parseInt(price.replace(/,/g, '')) : price;
//     if (isNaN(numValue)) return '';

//     if (numValue >= 1000000000) {
//       const billions = numValue / 1000000000;
//       if (Number.isInteger(billions)) {
//         return `${numberToPersianWords(billions)} میلیارد تومان`;
//       }
//       const billionPart = Math.floor(billions);
//       const millionPart = Math.round((billions - billionPart) * 1000);
//       let result = '';
//       if (billionPart > 0) result += `${numberToPersianWords(billionPart)} میلیارد`;
//       if (millionPart > 0) {
//         if (result) result += ' و ';
//         result += `${numberToPersianWords(millionPart)} میلیون`;
//       }
//       return result + ' تومان';
//     } else if (numValue >= 1000000) {
//       const millions = numValue / 1000000;
//       if (Number.isInteger(millions)) {
//         return `${numberToPersianWords(millions)} میلیون تومان`;
//       }
//       const millionPart = Math.floor(millions);
//       const thousandPart = Math.round((millions - millionPart) * 1000);
//       let result = '';
//       if (millionPart > 0) result += `${numberToPersianWords(millionPart)} میلیون`;
//       if (thousandPart > 0) {
//         if (result) result += ' و ';
//         result += `${numberToPersianWords(thousandPart)} هزار`;
//       }
//       return result + ' تومان';
//     } else if (numValue >= 1000) {
//       const thousands = numValue / 1000;
//       if (Number.isInteger(thousands)) {
//         return `${numberToPersianWords(thousands)} هزار تومان`;
//       }
//       return `${numberToPersianWords(numValue)} تومان`;
//     }
//     return `${numberToPersianWords(numValue)} تومان`;
//   };

//   // =============== تابع جداکننده ۳ رقم ۳ رقم ===============
//   const formatNumberWithCommas = (num) => {
//     if (num === undefined || num === null || num === '') return '';
//     const numStr = String(num).replace(/,/g, '');
//     if (numStr === '' || isNaN(numStr)) return '';
//     return Number(numStr).toLocaleString('en-US');
//   };

//   // =============== توابع مدیریت محدوده سال ===============
//   const handleYearMinChange = (e) => {
//     const value = e.target.value;
//     const numValue = value === '' ? '' : Number(value);
//     setTempYearMin(numValue);
    
//     if (yearTimeoutRef.current) clearTimeout(yearTimeoutRef.current);
//     yearTimeoutRef.current = setTimeout(() => {
//       if (numValue !== '' && !isNaN(numValue)) {
//         onFilterChange({ yearMin: numValue });
//       } else {
//         onFilterChange({ yearMin: undefined });
//       }
//     }, 500);
//   };

//   const handleYearMaxChange = (e) => {
//     const value = e.target.value;
//     const numValue = value === '' ? '' : Number(value);
//     setTempYearMax(numValue);
    
//     if (yearTimeoutRef.current) clearTimeout(yearTimeoutRef.current);
//     yearTimeoutRef.current = setTimeout(() => {
//       if (numValue !== '' && !isNaN(numValue)) {
//         onFilterChange({ yearMax: numValue });
//       } else {
//         onFilterChange({ yearMax: undefined });
//       }
//     }, 500);
//   };

//   const resetYearRange = () => {
//     setTempYearMin('');
//     setTempYearMax('');
//     onFilterChange({ yearMin: undefined, yearMax: undefined });
//   };

//   // =============== توابع مدیریت محدوده متراژ ===============
//   const handleAreaMinChange = (e) => {
//     const value = e.target.value;
//     const numValue = value === '' ? '' : Number(value);
//     setTempAreaMin(numValue);
    
//     if (areaTimeoutRef.current) clearTimeout(areaTimeoutRef.current);
//     areaTimeoutRef.current = setTimeout(() => {
//       if (numValue !== '' && !isNaN(numValue)) {
//         onFilterChange({ areaMin: numValue });
//       } else {
//         onFilterChange({ areaMin: undefined });
//       }
//     }, 500);
//   };

//   const handleAreaMaxChange = (e) => {
//     const value = e.target.value;
//     const numValue = value === '' ? '' : Number(value);
//     setTempAreaMax(numValue);
    
//     if (areaTimeoutRef.current) clearTimeout(areaTimeoutRef.current);
//     areaTimeoutRef.current = setTimeout(() => {
//       if (numValue !== '' && !isNaN(numValue)) {
//         onFilterChange({ areaMax: numValue });
//       } else {
//         onFilterChange({ areaMax: undefined });
//       }
//     }, 500);
//   };

//   const resetAreaRange = () => {
//     setTempAreaMin('');
//     setTempAreaMax('');
//     onFilterChange({ areaMin: undefined, areaMax: undefined });
//   };

//   // =============== توابع مدیریت محدوده قیمت ===============
//   const handlePriceMinChange = (e) => {
//     const value = e.target.value;
//     const cleanValue = value.replace(/,/g, '');
//     const numValue = cleanValue === '' ? '' : Number(cleanValue);
//     setTempPriceMin(numValue);
    
//     if (priceTimeoutRef.current) clearTimeout(priceTimeoutRef.current);
//     priceTimeoutRef.current = setTimeout(() => {
//       const min = numValue === '' ? undefined : Number(numValue);
//       const max = tempPriceMax === '' ? undefined : Number(tempPriceMax);
//       onFilterChange({ priceMin: min, priceMax: max });
//     }, 500);
//   };

//   const handlePriceMaxChange = (e) => {
//     const value = e.target.value;
//     const cleanValue = value.replace(/,/g, '');
//     const numValue = cleanValue === '' ? '' : Number(cleanValue);
//     setTempPriceMax(numValue);
    
//     if (priceTimeoutRef.current) clearTimeout(priceTimeoutRef.current);
//     priceTimeoutRef.current = setTimeout(() => {
//       const min = tempPriceMin === '' ? undefined : Number(tempPriceMin);
//       const max = numValue === '' ? undefined : Number(numValue);
//       onFilterChange({ priceMin: min, priceMax: max });
//     }, 500);
//   };

//   const resetPriceRange = () => {
//     setTempPriceMin('');
//     setTempPriceMax('');
//     onFilterChange({ priceMin: undefined, priceMax: undefined });
//   };

//   // =============== توابع مدیریت محدوده طبقات ===============
//   const handleFloorMinChange = (e) => {
//     const value = e.target.value;
//     const numValue = value === '' ? '' : Number(value);
//     setTempFloorMin(numValue);
    
//     if (floorTimeoutRef.current) clearTimeout(floorTimeoutRef.current);
//     floorTimeoutRef.current = setTimeout(() => {
//       if (numValue !== '' && !isNaN(numValue)) {
//         onFilterChange({ floorMin: numValue });
//       } else {
//         onFilterChange({ floorMin: undefined });
//       }
//     }, 500);
//   };

//   const handleFloorMaxChange = (e) => {
//     const value = e.target.value;
//     const numValue = value === '' ? '' : Number(value);
//     setTempFloorMax(numValue);
    
//     if (floorTimeoutRef.current) clearTimeout(floorTimeoutRef.current);
//     floorTimeoutRef.current = setTimeout(() => {
//       if (numValue !== '' && !isNaN(numValue)) {
//         onFilterChange({ floorMax: numValue });
//       } else {
//         onFilterChange({ floorMax: undefined });
//       }
//     }, 500);
//   };

//   const resetFloorRange = () => {
//     setTempFloorMin('');
//     setTempFloorMax('');
//     onFilterChange({ floorMin: undefined, floorMax: undefined });
//   };

//   const clearAllFilters = () => {
//     onResetFilters();
//     resetYearRange();
//     resetAreaRange();
//     resetPriceRange();
//     resetFloorRange();
//   };

//   const getSelectedCount = () => {
//     let count = 0;
    
//     // شمارش فیلترهای چک‌باکس
//     Object.values(filters).forEach(arr => {
//       if (Array.isArray(arr)) count += arr.length;
//     });
    
//     if (filters.yearMin !== undefined || filters.yearMax !== undefined) count++;
//     if (filters.areaMin !== undefined || filters.areaMax !== undefined) count++;
//     if (filters.priceMin !== undefined || filters.priceMax !== undefined) count++;
//     if (filters.floorMin !== undefined || filters.floorMax !== undefined) count++;
    
//     return count;
//   };

//   const getActiveFilters = () => {
//     const activeFilters = [];

//     const filterLabels = {
//       constructionYears: filterOptions.constructionYears,
//       amenities: filterOptions.amenities
//     };

//     Object.keys(filterLabels).forEach(key => {
//       const selected = filters[key] || [];
//       const options = filterLabels[key] || [];
      
//       selected.forEach(id => {
//         const option = options.find(opt => opt.id === id);
//         if (option) {
//           activeFilters.push({
//             id: `${key}-${id}`,
//             label: option.label,
//             type: key,
//             value: id
//           });
//         }
//       });
//     });

//     // مناطق انتخاب شده
//     const selectedRegions = filters.regions || [];
//     if (selectedRegions.length > 0) {
//       const regionLabels = selectedRegions.map(key => {
//         const [regionId, ...subNameParts] = key.split('-');
//         const subName = subNameParts.join('-');
//         const region = regionsData.find(r => r.id === parseInt(regionId));
//         return region ? `${region.name} - ${subName}` : subName;
//       });
      
//       // فقط ۳ مورد اول نمایش داده شود و بقیه با ...
//       const displayLabels = regionLabels.length > 3 
//         ? `${regionLabels.slice(0, 3).join('، ')} و ${regionLabels.length - 3} مورد دیگر`
//         : regionLabels.join('، ');
      
//       activeFilters.push({
//         id: 'regions',
//         label: `مناطق: ${displayLabels}`,
//         type: 'regions',
//         value: 'regions'
//       });
//     }

//     if (filters.yearMin !== undefined || filters.yearMax !== undefined) {
//       const minText = filters.yearMin !== undefined ? filters.yearMin : 'هر سال';
//       const maxText = filters.yearMax !== undefined ? filters.yearMax : 'هر سال';
//       activeFilters.push({
//         id: 'year-range',
//         label: `سال ${minText} تا ${maxText}`,
//         type: 'yearRange',
//         value: 'year-range'
//       });
//     }

//     if (filters.areaMin !== undefined || filters.areaMax !== undefined) {
//       const minText = filters.areaMin !== undefined ? filters.areaMin : 'هر متراژ';
//       const maxText = filters.areaMax !== undefined ? filters.areaMax : 'هر متراژ';
//       activeFilters.push({
//         id: 'area-range',
//         label: `${minText} - ${maxText} متر مربع`,
//         type: 'areaRange',
//         value: 'area-range'
//       });
//     }

//     if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
//       const minText = filters.priceMin !== undefined && filters.priceMin !== null ? formatPriceWithWords(filters.priceMin) : 'هر قیمت';
//       const maxText = filters.priceMax !== undefined && filters.priceMax !== null ? formatPriceWithWords(filters.priceMax) : 'هر قیمت';
//       const priceText = `${minText} تا ${maxText}`;
//       activeFilters.push({
//         id: 'price-range',
//         label: priceText,
//         type: 'priceRange',
//         value: 'price-range'
//       });
//     }

//     if (filters.floorMin !== undefined || filters.floorMax !== undefined) {
//       const minText = filters.floorMin !== undefined ? filters.floorMin : 'همکف';
//       const maxText = filters.floorMax !== undefined ? filters.floorMax : '۵ و بالاتر';
      
//       let displayMin = minText;
//       let displayMax = maxText;
      
//       if (minText === 0) displayMin = 'همکف';
//       if (maxText === 5 || maxText === '۵') displayMax = '۵ و بالاتر';
      
//       activeFilters.push({
//         id: 'floor-range',
//         label: `طبقه ${displayMin} تا ${displayMax}`,
//         type: 'floorRange',
//         value: 'floor-range'
//       });
//     }

//     return activeFilters;
//   };

//   const removeFilter = (filter) => {
//     if (filter.type === 'yearRange') {
//       resetYearRange();
//     } else if (filter.type === 'areaRange') {
//       resetAreaRange();
//     } else if (filter.type === 'priceRange') {
//       resetPriceRange();
//     } else if (filter.type === 'floorRange') {
//       resetFloorRange();
//     } else if (filter.type === 'regions') {
//       onFilterChange({ regions: [] });
//     } else {
//       const currentSelection = filters[filter.type] || [];
//       const newSelection = currentSelection.filter(item => item !== filter.value);
//       onFilterChange({ [filter.type]: newSelection });
//     }
//   };

//   // =============== رندر فیلتر منطقه ===============
//   const renderRegionFilter = () => {
//     if (isLoadingRegions) {
//       return (
//         <div className="filter-section">
//           <div className="filter-section-header">
//             <div className="filter-section-title">
//               <span className="icon">📍</span>
//               <span>منطقه</span>
//             </div>
//           </div>
//           <div className="filter-section-content">
//             <div className="loading-regions">در حال بارگذاری مناطق...</div>
//           </div>
//         </div>
//       );
//     }

//     if (!regionsData.length) return null;

//     return (
//       <div className="filter-section">
//         <div 
//           className="filter-section-header" 
//           onClick={() => toggleSection('regions')}
//         >
//           <div className="filter-section-title">
//             <span className="icon">📍</span>
//             <span>منطقه</span>
//             <span className="region-count">
//               {filters.regions?.length > 0 && `(${filters.regions.length})`}
//             </span>
//           </div>
//           <span className="filter-section-toggle">
//             {expandedSections.regions ? '−' : '+'}
//           </span>
//         </div>
        
//         {expandedSections.regions && (
//           <div className="filter-section-content">
//             {/* جستجوی منطقه */}
//             <div className="region-search">
//               <input
//                 type="text"
//                 value={searchRegion}
//                 onChange={handleRegionSearch}
//                 placeholder="جستجوی منطقه یا محله..."
//                 className="region-search-input"
//               />
//             </div>

//             {/* لیست مناطق */}
//             <div className="regions-list">
//               {filteredRegions.map(region => {
//                 const status = getRegionCheckStatus(region.id);
//                 const isExpanded = expandedRegions[region.id];
                
//                 return (
//                   <div key={region.id} className="region-item">
//                     <div className="region-parent">
//                       <label className="filter-checkbox region-checkbox">
//                         <input
//                           type="checkbox"
//                           checked={status.checked}
//                           ref={el => {
//                             if (el) {
//                               el.indeterminate = status.indeterminate;
//                             }
//                           }}
//                           onChange={() => handleRegionCheck(region.id)}
//                         />
//                         <span className="checkbox-label region-label">{region.name}</span>
//                       </label>
//                       <button 
//                         className="region-toggle-btn"
//                         onClick={() => toggleRegion(region.id)}
//                       >
//                         {isExpanded ? '−' : '+'}
//                       </button>
//                     </div>
                    
//                     {isExpanded && region.children.length > 0 && (
//                       <div className="region-children">
//                         {region.children.map(child => {
//                           const regionKey = `${region.id}-${child}`;
//                           const isChecked = (filters.regions || []).includes(regionKey);
                          
//                           return (
//                             <label key={child} className="filter-checkbox sub-region-checkbox">
//                               <input
//                                 type="checkbox"
//                                 checked={isChecked}
//                                 onChange={() => handleSubRegionCheck(region.id, child)}
//                               />
//                               <span className="checkbox-label">{child}</span>
//                             </label>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
              
//               {filteredRegions.length === 0 && (
//                 <div className="no-regions-found">منطقه‌ای یافت نشد</div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // =============== رندر فیلتر محدوده قیمت ===============
//   const renderPriceRangeFilter = () => {
//     const minDisplay = tempPriceMin !== '' && tempPriceMin !== null && tempPriceMin !== undefined 
//       ? formatNumberWithCommas(tempPriceMin) : '';
//     const maxDisplay = tempPriceMax !== '' && tempPriceMax !== null && tempPriceMax !== undefined 
//       ? formatNumberWithCommas(tempPriceMax) : '';
    
//     const minWords = tempPriceMin !== '' && tempPriceMin !== null ? numberToPersianWords(tempPriceMin) : '';
//     const maxWords = tempPriceMax !== '' && tempPriceMax !== null ? numberToPersianWords(tempPriceMax) : '';

//     return (
//       <div className="filter-section">
//         <div 
//           className="filter-section-header" 
//           onClick={() => toggleSection('priceRange')}
//         >
//           <div className="filter-section-title">
//             <span className="icon">💰</span>
//             <span>محدوده قیمت (تومان)</span>
//           </div>
//           <span className="filter-section-toggle">
//             {expandedSections.priceRange ? '−' : '+'}
//           </span>
//         </div>
        
//         {expandedSections.priceRange && (
//           <div className="filter-section-content">
//             <div className="range-filter">
//               <div className="range-inputs">
//                 <div className="range-input-group">
//                   <label>حداقل</label>
//                   <input
//                     type="text"
//                     value={minDisplay}
//                     onChange={handlePriceMinChange}
//                     className="range-input price-input"
//                     placeholder="مثلا ۱۰۰,۰۰۰,۰۰۰"
//                     dir="ltr"
//                   />
//                   {minWords && (
//                     <span className="price-words">{minWords} تومان</span>
//                   )}
//                 </div>
//                 <div className="range-input-group">
//                   <label>حداکثر</label>
//                   <input
//                     type="text"
//                     value={maxDisplay}
//                     onChange={handlePriceMaxChange}
//                     className="range-input price-input"
//                     placeholder="مثلا ۵۰۰,۰۰۰,۰۰۰"
//                     dir="ltr"
//                   />
//                   {maxWords && (
//                     <span className="price-words">{maxWords} تومان</span>
//                   )}
//                 </div>
//               </div>
//               <div className="range-actions">
//                 <button onClick={resetPriceRange} className="reset-range-btn">
//                   ریست
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // =============== رندر فیلتر محدوده سال ===============
//   const renderYearRangeFilter = () => {
//     return (
//       <div className="filter-section">
//         <div 
//           className="filter-section-header" 
//           onClick={() => toggleSection('yearRange')}
//         >
//           <div className="filter-section-title">
//             <span className="icon">📅</span>
//             <span>محدوده سال ساخت</span>
//           </div>
//           <span className="filter-section-toggle">
//             {expandedSections.yearRange ? '−' : '+'}
//           </span>
//         </div>
        
//         {expandedSections.yearRange && (
//           <div className="filter-section-content">
//             <div className="range-filter">
//               <div className="range-inputs">
//                 <div className="range-input-group">
//                   <label>از سال</label>
//                   <input
//                     type="number"
//                     value={tempYearMin}
//                     onChange={handleYearMinChange}
//                     className="range-input"
//                     placeholder="مثلا ۱۳۸۰"
//                     step="1"
//                   />
//                 </div>
//                 <div className="range-input-group">
//                   <label>تا سال</label>
//                   <input
//                     type="number"
//                     value={tempYearMax}
//                     onChange={handleYearMaxChange}
//                     className="range-input"
//                     placeholder="مثلا ۱۴۰۰"
//                     step="1"
//                   />
//                 </div>
//               </div>
//               <div className="range-actions">
//                 <button onClick={resetYearRange} className="reset-range-btn">
//                   ریست
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // =============== رندر فیلتر محدوده متراژ ===============
//   const renderAreaRangeFilter = () => {
//     return (
//       <div className="filter-section">
//         <div 
//           className="filter-section-header" 
//           onClick={() => toggleSection('areaRange')}
//         >
//           <div className="filter-section-title">
//             <span className="icon">📐</span>
//             <span>متراژ (متر مربع)</span>
//           </div>
//           <span className="filter-section-toggle">
//             {expandedSections.areaRange ? '−' : '+'}
//           </span>
//         </div>
        
//         {expandedSections.areaRange && (
//           <div className="filter-section-content">
//             <div className="range-filter">
//               <div className="range-inputs">
//                 <div className="range-input-group">
//                   <label>حداقل</label>
//                   <input
//                     type="number"
//                     value={tempAreaMin}
//                     onChange={handleAreaMinChange}
//                     className="range-input"
//                     placeholder="مثلا ۵۰"
//                     step="1"
//                   />
//                 </div>
//                 <div className="range-input-group">
//                   <label>حداکثر</label>
//                   <input
//                     type="number"
//                     value={tempAreaMax}
//                     onChange={handleAreaMaxChange}
//                     className="range-input"
//                     placeholder="مثلا ۲۰۰"
//                     step="1"
//                   />
//                 </div>
//               </div>
//               <div className="range-actions">
//                 <button onClick={resetAreaRange} className="reset-range-btn">
//                   ریست
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // =============== رندر فیلتر محدوده طبقات ===============
//   const renderFloorRangeFilter = () => {
//     const floorOptions = [
//       { value: 0, label: 'همکف' },
//       { value: 1, label: '۱' },
//       { value: 2, label: '۲' },
//       { value: 3, label: '۳' },
//       { value: 4, label: '۴' },
//       { value: 5, label: '۵ و بالاتر' }
//     ];

//     return (
//       <div className="filter-section">
//         <div 
//           className="filter-section-header" 
//           onClick={() => toggleSection('floorRange')}
//         >
//           <div className="filter-section-title">
//             <span className="icon">🏢</span>
//             <span>تعداد طبقات</span>
//           </div>
//           <span className="filter-section-toggle">
//             {expandedSections.floorRange ? '−' : '+'}
//           </span>
//         </div>
        
//         {expandedSections.floorRange && (
//           <div className="filter-section-content">
//             <div className="range-filter">
//               <div className="range-inputs">
//                 <div className="range-input-group">
//                   <label>از طبقه</label>
//                   <select
//                     value={tempFloorMin}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       const numValue = value === '' ? '' : Number(value);
//                       setTempFloorMin(numValue);
//                       if (floorTimeoutRef.current) clearTimeout(floorTimeoutRef.current);
//                       floorTimeoutRef.current = setTimeout(() => {
//                         if (numValue !== '' && !isNaN(numValue)) {
//                           onFilterChange({ floorMin: numValue });
//                         } else {
//                           onFilterChange({ floorMin: undefined });
//                         }
//                       }, 300);
//                     }}
//                     className="range-input select-input"
//                   >
//                     <option value="">انتخاب کنید</option>
//                     {floorOptions.map(option => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="range-input-group">
//                   <label>تا طبقه</label>
//                   <select
//                     value={tempFloorMax}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       const numValue = value === '' ? '' : Number(value);
//                       setTempFloorMax(numValue);
//                       if (floorTimeoutRef.current) clearTimeout(floorTimeoutRef.current);
//                       floorTimeoutRef.current = setTimeout(() => {
//                         if (numValue !== '' && !isNaN(numValue)) {
//                           onFilterChange({ floorMax: numValue });
//                         } else {
//                           onFilterChange({ floorMax: undefined });
//                         }
//                       }, 300);
//                     }}
//                     className="range-input select-input"
//                   >
//                     <option value="">انتخاب کنید</option>
//                     {floorOptions.map(option => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="range-actions">
//                 <button onClick={resetFloorRange} className="reset-range-btn">
//                   ریست
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderFloorFilter = () => {
//     if (!filterOptions.floorCounts?.length) return null;

//     return (
//       <div className="filter-section">
//         <div 
//           className="filter-section-header" 
//           onClick={() => toggleSection('floorCounts')}
//         >
//           <div className="filter-section-title">
//             <span className="icon">🏢</span>
//             <span>تعداد طبقات</span>
//           </div>
//           <span className="filter-section-toggle">
//             {expandedSections.floorCounts ? '−' : '+'}
//           </span>
//         </div>
        
//         {expandedSections.floorCounts && (
//           <div className="filter-section-content">
//             {filterOptions.floorCounts.map(option => (
//               <label key={option.id} className="filter-checkbox">
//                 <input
//                   type="checkbox"
//                   checked={filters.floorCounts?.includes(option.id)}
//                   onChange={() => handleCheckboxChange('floorCounts', option.id)}
//                 />
//                 <span className="checkbox-label">{option.label}</span>
//                 <span className="filter-count">{option.count}</span>
//               </label>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderYearFilter = () => {
//     if (!filterOptions.constructionYears?.length) return null;

//     const sortedYears = [...filterOptions.constructionYears].sort((a, b) => 
//       parseInt(b.id) - parseInt(a.id)
//     );

//     return (
//       <div className="filter-section">
//         <div 
//           className="filter-section-header" 
//           onClick={() => toggleSection('constructionYears')}
//         >
//           <div className="filter-section-title">
//             <span className="icon">📅</span>
//             <span>سال ساخت</span>
//           </div>
//           <span className="filter-section-toggle">
//             {expandedSections.constructionYears ? '−' : '+'}
//           </span>
//         </div>
        
//         {expandedSections.constructionYears && (
//           <div className="filter-section-content">
//             {sortedYears.map(option => (
//               <label key={option.id} className="filter-checkbox">
//                 <input
//                   type="checkbox"
//                   checked={filters.constructionYears?.includes(option.id)}
//                   onChange={() => handleCheckboxChange('constructionYears', option.id)}
//                 />
//                 <span className="checkbox-label">
//                   <span>سال {option.label}</span>
//                   {getYearBadge(option.id)}
//                 </span>
//                 <span className="filter-count">{option.count}</span>
//               </label>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderAmenitiesFilter = () => {
//     if (!filterOptions.amenities?.length) return null;

//     const amenityIcons = {
//       elevator: '🛗',
//       parking: '🅿️',
//       pool: '🏊',
//       storeRoom: '📦'
//     };

//     return (
//       <div className="filter-section">
//         <div 
//           className="filter-section-header" 
//           onClick={() => toggleSection('amenities')}
//         >
//           <div className="filter-section-title">
//             <span className="icon">✨</span>
//             <span>امکانات</span>
//           </div>
//           <span className="filter-section-toggle">
//             {expandedSections.amenities ? '−' : '+'}
//           </span>
//         </div>
        
//         {expandedSections.amenities && (
//           <div className="filter-section-content">
//             {filterOptions.amenities.map(option => (
//               <label key={option.id} className="filter-checkbox">
//                 <input
//                   type="checkbox"
//                   checked={filters.amenities?.includes(option.id)}
//                   onChange={() => handleCheckboxChange('amenities', option.id)}
//                 />
//                 <span className="checkbox-label">
//                   <span className="amenity-icon">{amenityIcons[option.id] || '•'}</span>
//                   <span>{option.label}</span>
//                 </span>
//                 <span className="filter-count">{option.count}</span>
//               </label>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const selectedCount = getSelectedCount();
//   const activeFilters = getActiveFilters();

//   const getYearBadge = (year) => {
//     const currentYear = new Date().getFullYear() - 621;
//     const age = currentYear - parseInt(year);
    
//     if (age <= 2) {
//       return <span className="badge-new">نوساز</span>;
//     } else if (age <= 5) {
//       return <span className="badge-good">ممتاز</span>;
//     } else if (age >= 30) {
//       return <span className="badge-old">قدیمی</span>;
//     }
//     return null;
//   };

//   return (
//     <div className="filter-sidebar">
//       <div className="filter-sidebar-header">
//         <div className="filter-sidebar-title">
//           <span>فیلترها</span>
//           {selectedCount > 0 && (
//             <span className="filter-badge">{selectedCount}</span>
//           )}
//         </div>
//         {selectedCount > 0 && (
//           <button onClick={clearAllFilters} className="clear-all-btn">
//             حذف همه
//           </button>
//         )}
//       </div>

//       {activeFilters.length > 0 && (
//         <div className="active-filters-container">
//           <div className="active-filters-title">فیلترهای انتخاب شده:</div>
//           <div className="active-filters-list">
//             {activeFilters.map(filter => (
//               <div key={filter.id} className="active-filter-tag">
//                 <span title={filter.label}>{filter.label}</span>
//                 <button 
//                   className="remove-filter-btn"
//                   onClick={() => removeFilter(filter)}
//                   title="حذف فیلتر"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="filter-sidebar-content">
//         {renderRegionFilter()}
//         {renderPriceRangeFilter()}
//         {renderAreaRangeFilter()}
//         {renderFloorRangeFilter()}
//         {renderYearRangeFilter()}
//         {renderYearFilter()}
//         {renderAmenitiesFilter()}
//       </div>

//       <div className="filter-sidebar-footer">
//         <div className="total-results">
//           <span>تعداد نتایج:</span>
//           <span className="total-results-number">{totalResults}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;

// FilterSidebar.jsx
import React, { useState, useRef, useEffect } from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onResetFilters, 
  totalResults,
  selectedCityId,
  filterOptions = {
    regions: [],
    floorCounts: [],
    constructionYears: [],
    amenities: [],
    minYear: 1320,
    maxYear: 1405,
    minArea: 20,
    maxArea: 500,
    minPrice: 0,
    maxPrice: Infinity
  }
}) => {
  const [expandedSections, setExpandedSections] = useState({
    regions: false,
    floorCounts: false,
    constructionYears: false,
    amenities: false,
    areaRange: false,
    yearRange: false,
    priceRange: false,
    floorRange: false
  });

  // State برای مناطق
  const [regionsData, setRegionsData] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [searchRegion, setSearchRegion] = useState('');
  const [isLoadingRegions, setIsLoadingRegions] = useState(false);
  const [expandedRegions, setExpandedRegions] = useState({});

  // State برای مقادیر موقت محدوده‌ها
  const [tempYearMin, setTempYearMin] = useState(filters.yearMin || '');
  const [tempYearMax, setTempYearMax] = useState(filters.yearMax || '');
  
  const [tempAreaMin, setTempAreaMin] = useState(filters.areaMin || '');
  const [tempAreaMax, setTempAreaMax] = useState(filters.areaMax || '');
  
  const [tempPriceMin, setTempPriceMin] = useState(
    filters.priceMin !== undefined && filters.priceMin !== null ? filters.priceMin : ''
  );
  const [tempPriceMax, setTempPriceMax] = useState(
    filters.priceMax !== undefined && filters.priceMax !== null ? filters.priceMax : ''
  );

  const [tempFloorMin, setTempFloorMin] = useState(filters.floorMin || '');
  const [tempFloorMax, setTempFloorMax] = useState(filters.floorMax || '');

  // Refs برای تایمرهای تاخیر
  const yearTimeoutRef = useRef(null);
  const areaTimeoutRef = useRef(null);
  const priceTimeoutRef = useRef(null);
  const floorTimeoutRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // =============== دریافت مناطق از API ===============
         const savedCity = localStorage.getItem('selectedCity');
         
              const city = JSON.parse(savedCity);
  useEffect(() => {
      
    if (savedCity) {
      fetchRegions(city.id);
    }
  }, [savedCity]);

  const fetchRegions = async (cityId) => {
    setIsLoadingRegions(true);
    try {
      const response = await fetch('https://localhost:7178/api/RealEstatePage/GetRegionsWithChildrenLinq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cityId)
      });
      
      const result = await response.json();
      
      if (result.status === 200 && result.data) {
        const formattedRegions = result.data.map(item => ({
          id: item.id,
          name: item.parentName,
          children: item.childrenNames ? item.childrenNames.split(',').map(name => name.trim()) : []
        }));
        
        setRegionsData(formattedRegions);
        setFilteredRegions(formattedRegions);
        
        const expanded = {};
        formattedRegions.forEach(region => {
          expanded[region.id] = true;
        });
        setExpandedRegions(expanded);
      }
    } catch (error) {
      console.error('Error fetching regions:', error);
    } finally {
      setIsLoadingRegions(false);
    }
  };

  // =============== جستجوی مناطق ===============
  const handleRegionSearch = (e) => {
    const value = e.target.value;
    setSearchRegion(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      if (value.trim() === '') {
        setFilteredRegions(regionsData);
        return;
      }
      
      const searchTerm = value.trim().toLowerCase();
      const filtered = regionsData.filter(region => {
        if (region.name.toLowerCase().includes(searchTerm)) return true;
        if (region.children.some(child => child.toLowerCase().includes(searchTerm))) return true;
        return false;
      });
      
      setFilteredRegions(filtered);
    }, 300);
  };

  // =============== توگل باز/بسته شدن منطقه ===============
  const toggleRegion = (regionId) => {
    setExpandedRegions(prev => ({
      ...prev,
      [regionId]: !prev[regionId]
    }));
  };

  // =============== انتخاب زیرمنطقه ===============
  const handleSubRegionCheck = (regionId, subRegionName) => {
    const currentSelection = filters.regions || [];
    const regionKey = `${regionId}-${subRegionName}`;
    
    const newSelection = currentSelection.includes(regionKey)
      ? currentSelection.filter(item => item !== regionKey)
      : [...currentSelection, regionKey];
    
    onFilterChange({ regions: newSelection });
  };

  // =============== انتخاب کل منطقه ===============
  const handleRegionCheck = (regionId) => {
    const region = regionsData.find(r => r.id === regionId);
    if (!region) return;
    
    const currentSelection = filters.regions || [];
    const regionKeys = region.children.map(child => `${regionId}-${child}`);
    
    const allSelected = regionKeys.every(key => currentSelection.includes(key));
    
    let newSelection;
    if (allSelected) {
      newSelection = currentSelection.filter(item => !regionKeys.includes(item));
    } else {
      const toAdd = regionKeys.filter(key => !currentSelection.includes(key));
      newSelection = [...currentSelection, ...toAdd];
    }
    
    onFilterChange({ regions: newSelection });
  };

  // =============== بررسی وضعیت انتخاب منطقه ===============
  const getRegionCheckStatus = (regionId) => {
    const region = regionsData.find(r => r.id === regionId);
    if (!region) return { checked: false, indeterminate: false };
    
    const currentSelection = filters.regions || [];
    const regionKeys = region.children.map(child => `${regionId}-${child}`);
    
    const selectedCount = regionKeys.filter(key => currentSelection.includes(key)).length;
    
    if (selectedCount === 0) return { checked: false, indeterminate: false };
    if (selectedCount === regionKeys.length) return { checked: true, indeterminate: false };
    return { checked: false, indeterminate: true };
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (section, value) => {
    const currentSelection = filters[section] || [];
    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter(item => item !== value)
      : [...currentSelection, value];
    
    onFilterChange({ [section]: newSelection });
  };

  // =============== توابع تبدیل اعداد به حروف فارسی ===============
  const numberToPersianWords = (num) => {
    if (num === 0 || num === '0') return 'صفر';
    if (!num && num !== 0) return '';
    
    const numValue = typeof num === 'string' ? parseInt(num.replace(/,/g, '')) : num;
    if (isNaN(numValue)) return '';

    const units = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
    const tens = ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
    const hundreds = ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
    const thousands = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

    const convertChunk = (n) => {
      if (n === 0) return '';
      
      let result = '';
      const h = Math.floor(n / 100);
      const t = Math.floor((n % 100) / 10);
      const u = n % 10;

      if (h > 0) {
        result += hundreds[h];
      }

      if (t > 0) {
        if (result) result += ' و ';
        if (t === 1 && u > 0) {
          const teens = ['', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
          result += teens[u];
          return result;
        }
        result += tens[t];
      }

      if (u > 0 && t !== 1) {
        if (result) result += ' و ';
        result += units[u];
      }

      return result;
    };

    let n = numValue;
    if (n < 1000) {
      return convertChunk(n) || 'صفر';
    }

    let result = '';
    let chunkIndex = 0;

    while (n > 0) {
      const chunk = n % 1000;
      if (chunk > 0) {
        const chunkWords = convertChunk(chunk);
        if (chunkWords) {
          const thousandWord = thousands[chunkIndex];
          const prefix = result ? ' و ' : '';
          result = chunkWords + (thousandWord ? ' ' + thousandWord : '') + prefix + result;
        }
      }
      n = Math.floor(n / 1000);
      chunkIndex++;
    }

    return result || 'صفر';
  };

  const formatPriceWithWords = (price) => {
    if (!price && price !== 0) return '';
    if (price === 0) return 'صفر تومان';
    
    const numValue = typeof price === 'string' ? parseInt(price.replace(/,/g, '')) : price;
    if (isNaN(numValue)) return '';

    if (numValue >= 1000000000) {
      const billions = numValue / 1000000000;
      if (Number.isInteger(billions)) {
        return `${numberToPersianWords(billions)} میلیارد تومان`;
      }
      const billionPart = Math.floor(billions);
      const millionPart = Math.round((billions - billionPart) * 1000);
      let result = '';
      if (billionPart > 0) result += `${numberToPersianWords(billionPart)} میلیارد`;
      if (millionPart > 0) {
        if (result) result += ' و ';
        result += `${numberToPersianWords(millionPart)} میلیون`;
      }
      return result + ' تومان';
    } else if (numValue >= 1000000) {
      const millions = numValue / 1000000;
      if (Number.isInteger(millions)) {
        return `${numberToPersianWords(millions)} میلیون تومان`;
      }
      const millionPart = Math.floor(millions);
      const thousandPart = Math.round((millions - millionPart) * 1000);
      let result = '';
      if (millionPart > 0) result += `${numberToPersianWords(millionPart)} میلیون`;
      if (thousandPart > 0) {
        if (result) result += ' و ';
        result += `${numberToPersianWords(thousandPart)} هزار`;
      }
      return result + ' تومان';
    } else if (numValue >= 1000) {
      const thousands = numValue / 1000;
      if (Number.isInteger(thousands)) {
        return `${numberToPersianWords(thousands)} هزار تومان`;
      }
      return `${numberToPersianWords(numValue)} تومان`;
    }
    return `${numberToPersianWords(numValue)} تومان`;
  };

  // =============== تابع جداکننده ۳ رقم ۳ رقم ===============
  const formatNumberWithCommas = (num) => {
    if (num === undefined || num === null || num === '') return '';
    const numStr = String(num).replace(/,/g, '');
    if (numStr === '' || isNaN(numStr)) return '';
    return Number(numStr).toLocaleString('en-US');
  };

  // =============== توابع مدیریت محدوده سال ===============
  const handleYearMinChange = (e) => {
    const value = e.target.value;
    const numValue = value === '' ? '' : Number(value);
    setTempYearMin(numValue);
    
    if (yearTimeoutRef.current) clearTimeout(yearTimeoutRef.current);
    yearTimeoutRef.current = setTimeout(() => {
      if (numValue !== '' && !isNaN(numValue)) {
        onFilterChange({ yearMin: numValue });
      } else {
        onFilterChange({ yearMin: undefined });
      }
    }, 500);
  };

  const handleYearMaxChange = (e) => {
    const value = e.target.value;
    const numValue = value === '' ? '' : Number(value);
    setTempYearMax(numValue);
    
    if (yearTimeoutRef.current) clearTimeout(yearTimeoutRef.current);
    yearTimeoutRef.current = setTimeout(() => {
      if (numValue !== '' && !isNaN(numValue)) {
        onFilterChange({ yearMax: numValue });
      } else {
        onFilterChange({ yearMax: undefined });
      }
    }, 500);
  };

  const resetYearRange = () => {
    setTempYearMin('');
    setTempYearMax('');
    onFilterChange({ yearMin: undefined, yearMax: undefined });
  };

  // =============== توابع مدیریت محدوده متراژ ===============
  const handleAreaMinChange = (e) => {
    const value = e.target.value;
    const numValue = value === '' ? '' : Number(value);
    setTempAreaMin(numValue);
    
    if (areaTimeoutRef.current) clearTimeout(areaTimeoutRef.current);
    areaTimeoutRef.current = setTimeout(() => {
      if (numValue !== '' && !isNaN(numValue)) {
        onFilterChange({ areaMin: numValue });
      } else {
        onFilterChange({ areaMin: undefined });
      }
    }, 500);
  };

  const handleAreaMaxChange = (e) => {
    const value = e.target.value;
    const numValue = value === '' ? '' : Number(value);
    setTempAreaMax(numValue);
    
    if (areaTimeoutRef.current) clearTimeout(areaTimeoutRef.current);
    areaTimeoutRef.current = setTimeout(() => {
      if (numValue !== '' && !isNaN(numValue)) {
        onFilterChange({ areaMax: numValue });
      } else {
        onFilterChange({ areaMax: undefined });
      }
    }, 500);
  };

  const resetAreaRange = () => {
    setTempAreaMin('');
    setTempAreaMax('');
    onFilterChange({ areaMin: undefined, areaMax: undefined });
  };

  // =============== توابع مدیریت محدوده قیمت ===============
  const handlePriceMinChange = (e) => {
    const value = e.target.value;
    const cleanValue = value.replace(/,/g, '');
    const numValue = cleanValue === '' ? '' : Number(cleanValue);
    setTempPriceMin(numValue);
    
    if (priceTimeoutRef.current) clearTimeout(priceTimeoutRef.current);
    priceTimeoutRef.current = setTimeout(() => {
      const min = numValue === '' ? undefined : Number(numValue);
      const max = tempPriceMax === '' ? undefined : Number(tempPriceMax);
      onFilterChange({ priceMin: min, priceMax: max });
    }, 500);
  };

  const handlePriceMaxChange = (e) => {
    const value = e.target.value;
    const cleanValue = value.replace(/,/g, '');
    const numValue = cleanValue === '' ? '' : Number(cleanValue);
    setTempPriceMax(numValue);
    
    if (priceTimeoutRef.current) clearTimeout(priceTimeoutRef.current);
    priceTimeoutRef.current = setTimeout(() => {
      const min = tempPriceMin === '' ? undefined : Number(tempPriceMin);
      const max = numValue === '' ? undefined : Number(numValue);
      onFilterChange({ priceMin: min, priceMax: max });
    }, 500);
  };

  const resetPriceRange = () => {
    setTempPriceMin('');
    setTempPriceMax('');
    onFilterChange({ priceMin: undefined, priceMax: undefined });
  };

  // =============== توابع مدیریت محدوده طبقات ===============
  const handleFloorMinChange = (e) => {
    const value = e.target.value;
    const numValue = value === '' ? '' : Number(value);
    setTempFloorMin(numValue);
    
    if (floorTimeoutRef.current) clearTimeout(floorTimeoutRef.current);
    floorTimeoutRef.current = setTimeout(() => {
      if (numValue !== '' && !isNaN(numValue)) {
        onFilterChange({ floorMin: numValue });
      } else {
        onFilterChange({ floorMin: undefined });
      }
    }, 500);
  };

  const handleFloorMaxChange = (e) => {
    const value = e.target.value;
    const numValue = value === '' ? '' : Number(value);
    setTempFloorMax(numValue);
    
    if (floorTimeoutRef.current) clearTimeout(floorTimeoutRef.current);
    floorTimeoutRef.current = setTimeout(() => {
      if (numValue !== '' && !isNaN(numValue)) {
        onFilterChange({ floorMax: numValue });
      } else {
        onFilterChange({ floorMax: undefined });
      }
    }, 500);
  };

  const resetFloorRange = () => {
    setTempFloorMin('');
    setTempFloorMax('');
    onFilterChange({ floorMin: undefined, floorMax: undefined });
  };

  const clearAllFilters = () => {
    onResetFilters();
    resetYearRange();
    resetAreaRange();
    resetPriceRange();
    resetFloorRange();
  };

  const getSelectedCount = () => {
    let count = 0;
    
    Object.values(filters).forEach(arr => {
      if (Array.isArray(arr)) count += arr.length;
    });
    
    if (filters.yearMin !== undefined || filters.yearMax !== undefined) count++;
    if (filters.areaMin !== undefined || filters.areaMax !== undefined) count++;
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) count++;
    if (filters.floorMin !== undefined || filters.floorMax !== undefined) count++;
    
    return count;
  };

  const getActiveFilters = () => {
    const activeFilters = [];

    // =============== فیلترهای چک‌باکس ===============
    const filterLabels = {
      regions: filterOptions.regions,
      constructionYears: filterOptions.constructionYears,
      amenities: filterOptions.amenities
    };

    Object.keys(filterLabels).forEach(key => {
      const selected = filters[key] || [];
      const options = filterLabels[key] || [];
      
      selected.forEach(id => {
        const option = options.find(opt => opt.id === id);
        if (option) {
          activeFilters.push({
            id: `${key}-${id}`,
            label: option.label,
            type: key,
            value: id
          });
        }
      });
    });

    // =============== مناطق انتخاب شده از API ===============
    const selectedRegions = filters.regions || [];
    if (selectedRegions.length > 0) {
      const regionLabels = selectedRegions.map(key => {
        const parts = key.split('-');
        const regionId = parseInt(parts[0]);
        const subName = parts.slice(1).join('-');
        const region = regionsData.find(r => r.id === regionId);
        return region ? `${region.name} - ${subName}` : subName;
      });
      
      const displayLabels = regionLabels.length > 3 
        ? `${regionLabels.slice(0, 3).join('، ')} و ${regionLabels.length - 3} مورد دیگر`
        : regionLabels.join('، ');
      
      activeFilters.push({
        id: 'regions-filter',
        label: `مناطق: ${displayLabels}`,
        type: 'regions',
        value: 'regions'
      });
    }

    // =============== محدوده سال ===============
    if (filters.yearMin !== undefined || filters.yearMax !== undefined) {
      const minText = filters.yearMin !== undefined ? filters.yearMin : 'هر سال';
      const maxText = filters.yearMax !== undefined ? filters.yearMax : 'هر سال';
      activeFilters.push({
        id: 'year-range',
        label: `سال ${minText} تا ${maxText}`,
        type: 'yearRange',
        value: 'year-range'
      });
    }

    // =============== محدوده متراژ ===============
    if (filters.areaMin !== undefined || filters.areaMax !== undefined) {
      const minText = filters.areaMin !== undefined ? filters.areaMin : 'هر متراژ';
      const maxText = filters.areaMax !== undefined ? filters.areaMax : 'هر متراژ';
      activeFilters.push({
        id: 'area-range',
        label: `${minText} - ${maxText} متر مربع`,
        type: 'areaRange',
        value: 'area-range'
      });
    }

    // =============== محدوده قیمت ===============
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      const minText = filters.priceMin !== undefined && filters.priceMin !== null ? formatPriceWithWords(filters.priceMin) : 'هر قیمت';
      const maxText = filters.priceMax !== undefined && filters.priceMax !== null ? formatPriceWithWords(filters.priceMax) : 'هر قیمت';
      const priceText = `${minText} تا ${maxText}`;
      activeFilters.push({
        id: 'price-range',
        label: priceText,
        type: 'priceRange',
        value: 'price-range'
      });
    }

    // =============== محدوده طبقات ===============
    if (filters.floorMin !== undefined || filters.floorMax !== undefined) {
      const minText = filters.floorMin !== undefined ? filters.floorMin : 'همکف';
      const maxText = filters.floorMax !== undefined ? filters.floorMax : '۵ و بالاتر';
      
      let displayMin = minText;
      let displayMax = maxText;
      
      if (minText === 0) displayMin = 'همکف';
      if (maxText === 5 || maxText === '۵') displayMax = '۵ و بالاتر';
      
      activeFilters.push({
        id: 'floor-range',
        label: `طبقه ${displayMin} تا ${displayMax}`,
        type: 'floorRange',
        value: 'floor-range'
      });
    }

    return activeFilters;
  };

  const removeFilter = (filter) => {
    if (filter.type === 'yearRange') {
      resetYearRange();
    } else if (filter.type === 'areaRange') {
      resetAreaRange();
    } else if (filter.type === 'priceRange') {
      resetPriceRange();
    } else if (filter.type === 'floorRange') {
      resetFloorRange();
    } else if (filter.type === 'regions') {
      onFilterChange({ regions: [] });
    } else {
      const currentSelection = filters[filter.type] || [];
      const newSelection = currentSelection.filter(item => item !== filter.value);
      onFilterChange({ [filter.type]: newSelection });
    }
  };

  // =============== رندر فیلتر منطقه ===============
  const renderRegionFilter = () => {
    if (isLoadingRegions) {
      return (
        <div className="filter-section">
          <div className="filter-section-header">
            <div className="filter-section-title">
              <span className="icon">📍</span>
              <span>منطقه</span>
            </div>
          </div>
          <div className="filter-section-content">
            <div className="loading-regions">در حال بارگذاری مناطق...</div>
          </div>
        </div>
      );
    }

    if (!regionsData.length) return null;

    return (
      <div className="filter-section">
        <div 
          className="filter-section-header" 
          onClick={() => toggleSection('regions')}
        >
          <div className="filter-section-title">
            <span className="icon">📍</span>
            <span>منطقه</span>
            <span className="region-count">
              {filters.regions?.length > 0 && `(${filters.regions.length})`}
            </span>
          </div>
          <span className="filter-section-toggle">
            {expandedSections.regions ? '−' : '+'}
          </span>
        </div>
        
        {expandedSections.regions && (
          <div className="filter-section-content">
            <div className="region-search">
              <input
                type="text"
                value={searchRegion}
                onChange={handleRegionSearch}
                placeholder="جستجوی منطقه یا محله..."
                className="region-search-input"
              />
            </div>

            <div className="regions-list">
              {filteredRegions.map(region => {
                const status = getRegionCheckStatus(region.id);
                const isExpanded = expandedRegions[region.id];
                
                return (
                  <div key={region.id} className="region-item">
                    <div className="region-parent">
                      <label className="filter-checkbox region-checkbox">
                        <input
                          type="checkbox"
                          checked={status.checked}
                          ref={el => {
                            if (el) {
                              el.indeterminate = status.indeterminate;
                            }
                          }}
                          onChange={() => handleRegionCheck(region.id)}
                        />
                        <span className="checkbox-label region-label">{region.name}</span>
                      </label>
                      <button 
                        className="region-toggle-btn"
                        onClick={() => toggleRegion(region.id)}
                      >
                        {isExpanded ? '−' : '+'}
                      </button>
                    </div>
                    
                    {isExpanded && region.children.length > 0 && (
                      <div className="region-children">
                        {region.children.map(child => {
                          const regionKey = `${region.id}-${child}`;
                          const isChecked = (filters.regions || []).includes(regionKey);
                          
                          return (
                            <label key={child} className="filter-checkbox sub-region-checkbox">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleSubRegionCheck(region.id, child)}
                              />
                              <span className="checkbox-label">{child}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              
              {filteredRegions.length === 0 && (
                <div className="no-regions-found">منطقه‌ای یافت نشد</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // =============== رندر فیلتر محدوده قیمت ===============
  const renderPriceRangeFilter = () => {
    const minDisplay = tempPriceMin !== '' && tempPriceMin !== null && tempPriceMin !== undefined 
      ? formatNumberWithCommas(tempPriceMin) : '';
    const maxDisplay = tempPriceMax !== '' && tempPriceMax !== null && tempPriceMax !== undefined 
      ? formatNumberWithCommas(tempPriceMax) : '';
    
    const minWords = tempPriceMin !== '' && tempPriceMin !== null ? numberToPersianWords(tempPriceMin) : '';
    const maxWords = tempPriceMax !== '' && tempPriceMax !== null ? numberToPersianWords(tempPriceMax) : '';

    return (
      <div className="filter-section">
        <div 
          className="filter-section-header" 
          onClick={() => toggleSection('priceRange')}
        >
          <div className="filter-section-title">
            <span className="icon">💰</span>
            <span>محدوده قیمت (تومان)</span>
          </div>
          <span className="filter-section-toggle">
            {expandedSections.priceRange ? '−' : '+'}
          </span>
        </div>
        
        {expandedSections.priceRange && (
          <div className="filter-section-content">
            <div className="range-filter">
              <div className="range-inputs">
                <div className="range-input-group">
                  <label>حداقل</label>
                  <input
                    type="text"
                    value={minDisplay}
                    onChange={handlePriceMinChange}
                    className="range-input price-input"
                    placeholder="مثلا ۱۰۰,۰۰۰,۰۰۰"
                    dir="ltr"
                  />
                  {minWords && (
                    <span className="price-words">{minWords} تومان</span>
                  )}
                </div>
                <div className="range-input-group">
                  <label>حداکثر</label>
                  <input
                    type="text"
                    value={maxDisplay}
                    onChange={handlePriceMaxChange}
                    className="range-input price-input"
                    placeholder="مثلا ۵۰۰,۰۰۰,۰۰۰"
                    dir="ltr"
                  />
                  {maxWords && (
                    <span className="price-words">{maxWords} تومان</span>
                  )}
                </div>
              </div>
              <div className="range-actions">
                <button onClick={resetPriceRange} className="reset-range-btn">
                  ریست
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // =============== رندر فیلتر محدوده سال ===============
  const renderYearRangeFilter = () => {
    return (
      <div className="filter-section">
        <div 
          className="filter-section-header" 
          onClick={() => toggleSection('yearRange')}
        >
          <div className="filter-section-title">
            <span className="icon">📅</span>
            <span>محدوده سال ساخت</span>
          </div>
          <span className="filter-section-toggle">
            {expandedSections.yearRange ? '−' : '+'}
          </span>
        </div>
        
        {expandedSections.yearRange && (
          <div className="filter-section-content">
            <div className="range-filter">
              <div className="range-inputs">
                <div className="range-input-group">
                  <label>از سال</label>
                  <input
                    type="number"
                    value={tempYearMin}
                    onChange={handleYearMinChange}
                    className="range-input"
                    placeholder="مثلا ۱۳۸۰"
                    step="1"
                  />
                </div>
                <div className="range-input-group">
                  <label>تا سال</label>
                  <input
                    type="number"
                    value={tempYearMax}
                    onChange={handleYearMaxChange}
                    className="range-input"
                    placeholder="مثلا ۱۴۰۰"
                    step="1"
                  />
                </div>
              </div>
              <div className="range-actions">
                <button onClick={resetYearRange} className="reset-range-btn">
                  ریست
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // =============== رندر فیلتر محدوده متراژ ===============
  const renderAreaRangeFilter = () => {
    return (
      <div className="filter-section">
        <div 
          className="filter-section-header" 
          onClick={() => toggleSection('areaRange')}
        >
          <div className="filter-section-title">
            <span className="icon">📐</span>
            <span>متراژ (متر مربع)</span>
          </div>
          <span className="filter-section-toggle">
            {expandedSections.areaRange ? '−' : '+'}
          </span>
        </div>
        
        {expandedSections.areaRange && (
          <div className="filter-section-content">
            <div className="range-filter">
              <div className="range-inputs">
                <div className="range-input-group">
                  <label>حداقل</label>
                  <input
                    type="number"
                    value={tempAreaMin}
                    onChange={handleAreaMinChange}
                    className="range-input"
                    placeholder="مثلا ۵۰"
                    step="1"
                  />
                </div>
                <div className="range-input-group">
                  <label>حداکثر</label>
                  <input
                    type="number"
                    value={tempAreaMax}
                    onChange={handleAreaMaxChange}
                    className="range-input"
                    placeholder="مثلا ۲۰۰"
                    step="1"
                  />
                </div>
              </div>
              <div className="range-actions">
                <button onClick={resetAreaRange} className="reset-range-btn">
                  ریست
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // =============== رندر فیلتر محدوده طبقات ===============
  const renderFloorRangeFilter = () => {
    const floorOptions = [
      { value: 0, label: 'همکف' },
      { value: 1, label: '۱' },
      { value: 2, label: '۲' },
      { value: 3, label: '۳' },
      { value: 4, label: '۴' },
      { value: 5, label: '۵ و بالاتر' }
    ];

    return (
      <div className="filter-section">
        <div 
          className="filter-section-header" 
          onClick={() => toggleSection('floorRange')}
        >
          <div className="filter-section-title">
            <span className="icon">🏢</span>
            <span>تعداد طبقات</span>
          </div>
          <span className="filter-section-toggle">
            {expandedSections.floorRange ? '−' : '+'}
          </span>
        </div>
        
        {expandedSections.floorRange && (
          <div className="filter-section-content">
            <div className="range-filter">
              <div className="range-inputs">
                <div className="range-input-group">
                  <label>از طبقه</label>
                  <select
                    value={tempFloorMin}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numValue = value === '' ? '' : Number(value);
                      setTempFloorMin(numValue);
                      if (floorTimeoutRef.current) clearTimeout(floorTimeoutRef.current);
                      floorTimeoutRef.current = setTimeout(() => {
                        if (numValue !== '' && !isNaN(numValue)) {
                          onFilterChange({ floorMin: numValue });
                        } else {
                          onFilterChange({ floorMin: undefined });
                        }
                      }, 300);
                    }}
                    className="range-input select-input"
                  >
                    <option value="">انتخاب کنید</option>
                    {floorOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="range-input-group">
                  <label>تا طبقه</label>
                  <select
                    value={tempFloorMax}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numValue = value === '' ? '' : Number(value);
                      setTempFloorMax(numValue);
                      if (floorTimeoutRef.current) clearTimeout(floorTimeoutRef.current);
                      floorTimeoutRef.current = setTimeout(() => {
                        if (numValue !== '' && !isNaN(numValue)) {
                          onFilterChange({ floorMax: numValue });
                        } else {
                          onFilterChange({ floorMax: undefined });
                        }
                      }, 300);
                    }}
                    className="range-input select-input"
                  >
                    <option value="">انتخاب کنید</option>
                    {floorOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="range-actions">
                <button onClick={resetFloorRange} className="reset-range-btn">
                  ریست
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // =============== رندر فیلترهای دیگر ===============
  const renderFloorFilter = () => {
    if (!filterOptions.floorCounts?.length) return null;

    return (
      <div className="filter-section">
        <div 
          className="filter-section-header" 
          onClick={() => toggleSection('floorCounts')}
        >
          <div className="filter-section-title">
            <span className="icon">🏢</span>
            <span>تعداد طبقات</span>
          </div>
          <span className="filter-section-toggle">
            {expandedSections.floorCounts ? '−' : '+'}
          </span>
        </div>
        
        {expandedSections.floorCounts && (
          <div className="filter-section-content">
            {filterOptions.floorCounts.map(option => (
              <label key={option.id} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.floorCounts?.includes(option.id)}
                  onChange={() => handleCheckboxChange('floorCounts', option.id)}
                />
                <span className="checkbox-label">{option.label}</span>
                <span className="filter-count">{option.count}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderYearFilter = () => {
    if (!filterOptions.constructionYears?.length) return null;

    const sortedYears = [...filterOptions.constructionYears].sort((a, b) => 
      parseInt(b.id) - parseInt(a.id)
    );

    return (
      <div className="filter-section">
        <div 
          className="filter-section-header" 
          onClick={() => toggleSection('constructionYears')}
        >
          <div className="filter-section-title">
            <span className="icon">📅</span>
            <span>سال ساخت</span>
          </div>
          <span className="filter-section-toggle">
            {expandedSections.constructionYears ? '−' : '+'}
          </span>
        </div>
        
        {expandedSections.constructionYears && (
          <div className="filter-section-content">
            {sortedYears.map(option => (
              <label key={option.id} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.constructionYears?.includes(option.id)}
                  onChange={() => handleCheckboxChange('constructionYears', option.id)}
                />
                <span className="checkbox-label">
                  <span>سال {option.label}</span>
                  {getYearBadge(option.id)}
                </span>
                <span className="filter-count">{option.count}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderAmenitiesFilter = () => {
    if (!filterOptions.amenities?.length) return null;

    const amenityIcons = {
      elevator: '🛗',
      parking: '🅿️',
      pool: '🏊',
      storeRoom: '📦'
    };

    return (
      <div className="filter-section">
        <div 
          className="filter-section-header" 
          onClick={() => toggleSection('amenities')}
        >
          <div className="filter-section-title">
            <span className="icon">✨</span>
            <span>امکانات</span>
          </div>
          <span className="filter-section-toggle">
            {expandedSections.amenities ? '−' : '+'}
          </span>
        </div>
        
        {expandedSections.amenities && (
          <div className="filter-section-content">
            {filterOptions.amenities.map(option => (
              <label key={option.id} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.amenities?.includes(option.id)}
                  onChange={() => handleCheckboxChange('amenities', option.id)}
                />
                <span className="checkbox-label">
                  <span className="amenity-icon">{amenityIcons[option.id] || '•'}</span>
                  <span>{option.label}</span>
                </span>
                <span className="filter-count">{option.count}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  const selectedCount = getSelectedCount();
  const activeFilters = getActiveFilters();

  const getYearBadge = (year) => {
    const currentYear = new Date().getFullYear() - 621;
    const age = currentYear - parseInt(year);
    
    if (age <= 2) {
      return <span className="badge-new">نوساز</span>;
    } else if (age <= 5) {
      return <span className="badge-good">ممتاز</span>;
    } else if (age >= 30) {
      return <span className="badge-old">قدیمی</span>;
    }
    return null;
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-sidebar-header">
        <div className="filter-sidebar-title">
          <span>فیلترها</span>
          {selectedCount > 0 && (
            <span className="filter-badge">{selectedCount}</span>
          )}
        </div>
        {selectedCount > 0 && (
          <button onClick={clearAllFilters} className="clear-all-btn">
            حذف همه
          </button>
        )}
      </div>

      {activeFilters.length > 0 && (
        <div className="active-filters-container">
          <div className="active-filters-title">فیلترهای انتخاب شده:</div>
          <div className="active-filters-list">
            {activeFilters.map(filter => (
              <div key={filter.id} className="active-filter-tag">
                <span title={filter.label}>{filter.label}</span>
                <button 
                  className="remove-filter-btn"
                  onClick={() => removeFilter(filter)}
                  title="حذف فیلتر"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="filter-sidebar-content">
        {renderRegionFilter()}
        {renderPriceRangeFilter()}
        {renderAreaRangeFilter()}
        {renderFloorRangeFilter()}
        {renderYearRangeFilter()}
        {renderYearFilter()}
        {renderAmenitiesFilter()}
      </div>

      <div className="filter-sidebar-footer">
        <div className="total-results">
          <span>تعداد نتایج:</span>
          <span className="total-results-number">{totalResults}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;