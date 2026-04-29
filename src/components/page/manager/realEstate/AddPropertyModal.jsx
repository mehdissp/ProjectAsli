
// // import React, { useState, useEffect, useRef } from 'react';
// // import NeshanMap from "@neshan-maps-platform/react-openlayers";
// // import { panelService } from '../../../../services/panelService';
// // import "@neshan-maps-platform/react-openlayers/dist/style.css";
// // import LocationSelector from './LocationSelector';
// // import { FaSearch, FaCrosshairs, FaCheckCircle, FaInfoCircle, FaPlus } from 'react-icons/fa';
// // import ReactQuill from 'react-quill-new';
// // import 'react-quill-new/dist/quill.snow.css';
// // import './AddPropertyModal.css';

// // const wgs84ToWebMercator = (lng, lat) => {
// //   const R = 6378137;
// //   return {
// //     x: lng * (Math.PI * R) / 180,
// //     y: Math.log(Math.tan((90 + lat) * Math.PI / 360)) * R
// //   };
// // };

// // const webMercatorToWgs84 = (x, y) => {
// //   const R = 6378137;
// //   return {
// //     lat: (2 * Math.atan(Math.exp(y / R)) - Math.PI / 2) * 180 / Math.PI,
// //     lng: (x * 180) / (Math.PI * R)
// //   };
// // };

// // const formatNumberWithCommas = (value) => {
// //   if (!value) return '';
// //   const cleanValue = value.toString().replace(/[^\d]/g, '');
// //   if (!cleanValue) return '';
// //   return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// // };

// // const convertToPersianWords = (num) => {
// //   if (!num) return '';
// //   const number = parseInt(num.toString().replace(/,/g, ''));
// //   if (isNaN(number) || number === 0) return 'صفر تومان';
  
// //   const units = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
// //   const teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
// //   const tens = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
// //   const hundreds = ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
// //   const thousands = ['', 'هزار', 'میلیون', 'میلیارد'];

// //   const convertSection = (n) => {
// //     if (n === 0) return '';
// //     if (n < 10) return units[n];
// //     if (n < 20) return teens[n - 10];
// //     if (n < 100) {
// //       const ten = Math.floor(n / 10);
// //       const unit = n % 10;
// //       return tens[ten] + (unit > 0 ? ' و ' + units[unit] : '');
// //     }
// //     const hundred = Math.floor(n / 100);
// //     const rest = n % 100;
// //     return hundreds[hundred] + (rest > 0 ? ' و ' + convertSection(rest) : '');
// //   };

// //   let result = '';
// //   let temp = number;
// //   let index = 0;
  
// //   while (temp > 0) {
// //     const section = temp % 1000;
// //     if (section !== 0) {
// //       const sectionText = convertSection(section);
// //       result = sectionText + (thousands[index] ? ' ' + thousands[index] : '') + (result ? ' ' + result : '');
// //     }
// //     temp = Math.floor(temp / 1000);
// //     index++;
// //   }
  
// //   return result + ' تومان';
// // };




// // const AddPropertyModal = ({ isOpen, onClose, onSuccess }) => {
// //   const mapRef = useRef(null);
  
// //   const [activeTab, setActiveTab] = useState('buy');
// //   const [saleTypes, setSaleTypes] = useState([]);
// //   const [rentTypes, setRentTypes] = useState([]);
// //   const [loadingTypes, setLoadingTypes] = useState(false);
// //   const [selectedTransaction, setSelectedTransaction] = useState(null);
// //   const [availableAmenities, setAvailableAmenities] = useState([]);
// //   const [loadingAmenities, setLoadingAmenities] = useState(false);
// //   const [selectedAmenities, setSelectedAmenities] = useState([]); // آرایه‌ای از اشیاء {id, name}
// //   const [amenityInput, setAmenityInput] = useState('');
// //   const [amenitySuggestions, setAmenitySuggestions] = useState([]);
// //   const [isSubmitting, setIsSubmitting] = useState(false);


// //   // بعد از useState های موجود اضافه کنید
// // const [constructionYear, setConstructionYear] = useState('');
// // const [availableYears, setAvailableYears] = useState([]);
  
// // const SearchableSelect = ({ options, value, onChange, placeholder, disabled }) => {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [isOpen, setIsOpen] = useState(false);
// //   const wrapperRef = useRef(null);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
// //         setIsOpen(false);
// //       }
// //     };
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, []);

// //   const filteredOptions = options.filter(option =>
// //     option.toString().includes(searchTerm)
// //   );

// //   const handleSelect = (option) => {
// //     onChange(option);
// //     setSearchTerm('');
// //     setIsOpen(false);
// //   };

// //   return (
// //     <div className="searchable-select" ref={wrapperRef}>
// //       <div className="searchable-select-input" onClick={() => setIsOpen(!isOpen)}>
// //         <input
// //           type="text"
// //           value={searchTerm || (value ? value.toString() : '')}
// //           onChange={(e) => {
// //             setSearchTerm(e.target.value);
// //             setIsOpen(true);
// //           }}
// //           placeholder={placeholder}
// //           disabled={disabled}
// //           onFocus={() => setIsOpen(true)}
// //         />
// //         <span className="dropdown-arrow">▼</span>
// //       </div>
// //       {isOpen && !disabled && (
// //         <div className="searchable-select-dropdown">
// //           {filteredOptions.length > 0 ? (
// //             filteredOptions.map((option, idx) => (
// //               <div
// //                 key={idx}
// //                 className={`searchable-select-option ${value === option ? 'selected' : ''}`}
// //                 onClick={() => handleSelect(option)}
// //               >
// //                 {option}
// //               </div>
// //             ))
// //           ) : (
// //             <div className="searchable-select-no-results">نتیجه‌ای یافت نشد</div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     price: '',
// //     area: '',
// //     address: '',
// //     rooms: 0,
// //     unitsPerFloor: 0,
// //     countFloor: 1,
// //     floor: 1,
// //     hasParking: false,
// //     hasElevator: false,
// //     hasLoan: false,
// //     description: '',
// //     lat: 35.699739,
// //     lng: 51.338097,
// //     showExactLocation: true,
// //     categoryTypeId: null,
// //     transactionTypeId: null,
// //   });
  
// //   const [rentalData, setRentalData] = useState({
// //     rentPrice: '',
// //     depositPrice: '',
// //     isMortgageOnly: false,
// //     contractDuration: 12,
// //   });
  
// //   const [images, setImages] = useState([]);
// //   const [imagePreviews, setImagePreviews] = useState([]);
// //   const [uploadStatus, setUploadStatus] = useState(new Map());
// //   const [uploadProgress, setUploadProgress] = useState(new Map());
// //   const [uploadedCacheIds, setUploadedCacheIds] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [locationSelected, setLocationSelected] = useState(false);
// //   const [mapKey] = useState("web.31c5ea6c425e40cc9b30620a84a8be90");
// //   const [mapCenter, setMapCenter] = useState({ lat: 35.699739, lng: 51.338097 });
// //   const [displayPrice, setDisplayPrice] = useState('');
// //   const [locationInfo, setLocationInfo] = useState({
// //     city: '', cityId: null, cityLat: null, cityLng: null,
// //     region: '', regionId: null, neighborhood: '', neighborhoodId: null, fullAddress: ''
// //   });
  
// //   const quillModules = {
// //     toolbar: [
// //       [{ 'header': [1, 2, 3, 4, false] }],
// //       ['bold', 'italic', 'underline', 'strike'],
// //       [{ 'align': [] }],
// //       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
// //       ['link', 'clean'],
// //       [{ 'direction': 'rtl' }]
// //     ],
// //   };
  
// //   const quillFormats = ['header', 'bold', 'italic', 'underline', 'strike', 'align', 'list', 'bullet', 'link', 'direction'];
  
// //   const updateFormField = (field, value) => {
// //     setFormData(prev => ({ ...prev, [field]: value }));
// //   };



// //   // تابع تولید سال‌ها از 1350 تا سال جاری
// // const generateYears = () => {
// //   const currentYear = new Date().getFullYear();
// //   const persianCurrentYear = currentYear - 621; // تبدیل میلادی به شمسی (تخمینی)
// //   // یا می‌توانید از API تاریخ استفاده کنید، اما برای سادگی:
// //   const shamsiYear = persianCurrentYear;
  
// //   const years = [];
// //   for (let i = 1350; i <= shamsiYear; i++) {
// //     years.push(i);
// //   }
// //   return years.reverse(); // از جدید به قدیم
// // };
// // // در useEffect برای مقداردهی اولیه:
// // useEffect(() => {
// //   setAvailableYears(generateYears());
// // }, []);
  
// //   const handlePriceChange = (e) => {
// //     const rawValue = e.target.value.replace(/[^\d]/g, '');
// //     setDisplayPrice(formatNumberWithCommas(rawValue));
// //     setFormData(prev => ({ ...prev, price: rawValue }));
// //   };
  
// //   const updateLocation = (lat, lng) => {
// //     setFormData(prev => ({ ...prev, lat, lng }));
// //     setMapCenter({ lat, lng });
// //     setLocationSelected(true);
// //   };
  
// //   const uploadSingleImage = async (file, previewUrl) => {
// //     setUploadStatus(prev => new Map(prev).set(previewUrl, 'uploading'));
// //     setUploadProgress(prev => new Map(prev).set(previewUrl, 0));
    
// //     try {
// //       const result = await panelService.UploadTempImage(file, (progress) => {
// //         setUploadProgress(prev => new Map(prev).set(previewUrl, progress));
// //       });
      
// //       if (result && result.cacheId) {
// //         setUploadStatus(prev => new Map(prev).set(previewUrl, 'success'));
// //         setUploadProgress(prev => new Map(prev).set(previewUrl, 100));
// //         setUploadedCacheIds(prev => [...prev, { previewUrl, cacheId: result.cacheId }]);
// //         return result.cacheId;
// //       } else {
// //         throw new Error('cacheId دریافت نشد');
// //       }
// //     } catch (error) {
// //       console.error('خطا در آپلود تصویر:', error);
// //       setUploadStatus(prev => new Map(prev).set(previewUrl, 'error'));
// //       alert(`خطا در آپلود تصویر: ${error.message}`);
// //       return null;
// //     }
// //   };
  

  
// //   const handleImageChange = async (e) => {
// //     const files = Array.from(e.target.files);
    
// //     for (const file of files) {
// //       if (file.size > 10 * 1024 * 1024) {
// //         alert(`حجم فایل ${file.name} بیشتر از 10 مگابایت است`);
// //         continue;
// //       }
      
// //       if (!file.type.startsWith('image/')) {
// //         alert(`فایل ${file.name} از نوع تصویر نیست`);
// //         continue;
// //       }
      
// //       const reader = new FileReader();
      
// //       reader.onloadend = async () => {
// //         const previewUrl = reader.result;
        
// //         setImagePreviews(prev => [...prev, previewUrl]);
// //         setImages(prev => [...prev, file]);
        
// //         await uploadSingleImage(file, previewUrl);
// //       };
      
// //       reader.readAsDataURL(file);
// //     }
// //   };
  
// //   const removeImage = async (index) => {
// //     const removedPreview = imagePreviews[index];
// //     const cacheItem = uploadedCacheIds.find(item => item.previewUrl === removedPreview);
 
// //     if (cacheItem && cacheItem.cacheId) {
// //       await panelService.clearTempImageFromCache(cacheItem.cacheId);
// //     }
    
// //     setImages(prev => prev.filter((_, i) => i !== index));
// //     setImagePreviews(prev => prev.filter((_, i) => i !== index));
// //     setUploadedCacheIds(prev => prev.filter((_, i) => i !== index));
// //     setUploadStatus(prev => {
// //       const newMap = new Map(prev);
// //       newMap.delete(removedPreview);
// //       return newMap;
// //     });
// //     setUploadProgress(prev => {
// //       const newMap = new Map(prev);
// //       newMap.delete(removedPreview);
// //       return newMap;
// //     });
// //   };
  
// //   const fetchTransactionTypes = async () => {
// //     setLoadingTypes(true);
// //     try {
// //       const token = localStorage.getItem('auth_token');
// //       const buyResponse = await fetch('https://localhost:7178/api/RealEstatePage/GetCategoryDtos?tabId=1', {
// //         method: 'GET',
// //         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
// //       });
// //       const buyResult = await buyResponse.json();
      
// //       const rentResponse = await fetch('https://localhost:7178/api/RealEstatePage/GetCategoryDtos?tabId=2', {
// //         method: 'GET',
// //         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
// //       });
// //       const rentResult = await rentResponse.json();
      
// //       if (buyResult.status === 200 && buyResult.data) {
// //         setSaleTypes(buyResult.data.map(item => ({ id: item.id, name: item.title || item.name, icon: item.icon || '💰', description: item.description || 'ثبت ملک برای فروش', categoryTypeId: 1 })));
// //       } else {
// //         setSaleTypes([{ id: 1, name: 'فروش نقدی', icon: '💰', description: 'ثبت ملک برای فروش نقدی', categoryTypeId: 1 }]);
// //       }
      
// //       if (rentResult.status === 200 && rentResult.data) {
// //         setRentTypes(rentResult.data.map(item => ({ id: item.id, name: item.title || item.name, icon: item.icon || '📝', description: item.description || 'ثبت ملک برای رهن و اجاره', categoryTypeId: 2 })));
// //       } else {
// //         setRentTypes([{ id: 3, name: 'رهن کامل', icon: '🔑', description: 'ثبت ملک با رهن کامل', categoryTypeId: 2 }]);
// //       }
// //     } catch (error) {
// //       console.error('خطا در دریافت انواع معامله:', error);
// //     } finally {
// //       setLoadingTypes(false);
// //     }
// //   };
  
// //   const fetchAmenities = async (transactionTypeId) => {
// //     if (!transactionTypeId) return;
// //     setLoadingAmenities(true);
// //     try {
// //       const response = await panelService.GetFacilities(transactionTypeId);
// //       if (response.status === 200 && response.data && response.data.length > 0) {
// //         const amenitiesWithId = response.data.map(item => ({
// //           id: item.id,
// //           name: item.name || item.title
// //         }));
// //         setAvailableAmenities(amenitiesWithId);
// //         setSelectedAmenities([]);
// //       } else {
// //         setAvailableAmenities([]);
// //       }
// //     } catch (error) {
// //       console.error('خطا در دریافت امکانات رفاهی:', error);
// //       setAvailableAmenities([]);
// //     } finally {
// //       setLoadingAmenities(false);
// //     }
// //   };
  
// //   const handleAmenitySearch = (searchText) => {
// //     setAmenityInput(searchText);
// //     if (searchText.trim() && availableAmenities.length > 0) {
// //       const filtered = availableAmenities.filter(amenity => 
// //         amenity.name?.toLowerCase().includes(searchText.toLowerCase())
// //       );
// //       setAmenitySuggestions(filtered.slice(0, 8));
// //     } else {
// //       setAmenitySuggestions([]);
// //     }
// //   };
  
// //   const addAmenity = (amenity) => {
// //     const amenityObj = typeof amenity === 'object' ? amenity : availableAmenities.find(a => a.name === amenity);
    
// //     if (!amenityObj || !amenityObj.id) {
// //       alert('این ویژگی در لیست موجود نیست!');
// //       return;
// //     }
    
// //     if (!selectedAmenities.some(a => a.id === amenityObj.id)) {
// //       setSelectedAmenities([...selectedAmenities, amenityObj]);
// //     }
    
// //     setAmenityInput('');
// //     setAmenitySuggestions([]);
// //   };
  
// //   const removeAmenity = (amenityToRemove) => {
// //     setSelectedAmenities(selectedAmenities.filter(a => a.id !== amenityToRemove.id));
// //   };
  
// //   const handleLocationSelect = (locationData) => {
// //     setLocationInfo(locationData || {
// //       city: '', cityId: null, cityLat: null, cityLng: null,
// //       region: '', regionId: null, neighborhood: '', neighborhoodId: null, fullAddress: ''
// //     });
    
// //     if (locationData) {
// //       const finalLat = locationData.neighborhoodLat || locationData.regionLat || locationData.cityLat;
// //       const finalLng = locationData.neighborhoodLng || locationData.regionLng || locationData.cityLng;
      
// //       setFormData(prev => ({
// //         ...prev,
// //         address: locationData.fullAddress || prev.address,
// //         lat: finalLat || prev.lat,
// //         lng: finalLng || prev.lng
// //       }));
      
// //       if (finalLat && finalLng) {
// //         setMapCenter({ lat: finalLat, lng: finalLng });
// //         setLocationSelected(true);
// //         setTimeout(() => {
// //           if (mapRef.current?.getView()) {
// //             const view = mapRef.current.getView();
// //             const webMercatorCoords = wgs84ToWebMercator(finalLng, finalLat);
// //             view.setCenter([webMercatorCoords.x, webMercatorCoords.y]);
// //           }
// //         }, 100);
// //       }
// //     }
// //   };
  
// //   const validateForm = () => {
// //     if (!formData.title.trim()) {
// //       alert('لطفاً عنوان ملک را وارد کنید');
// //       return false;
// //     }
    
// //     if (activeTab === 'buy' && (!formData.price || parseInt(formData.price) === 0)) {
// //       alert('لطفاً قیمت فروش را وارد کنید');
// //       return false;
// //     }
    
// //     if (!formData.area || parseInt(formData.area) === 0) {
// //       alert('لطفاً متراژ ملک را وارد کنید');
// //       return false;
// //     }
    
// //     if (!locationSelected) {
// //       alert('لطفاً موقعیت ملک را روی نقشه انتخاب کنید');
// //       return false;
// //     }
    
// //     if (!selectedTransaction) {
// //       alert('لطفاً نوع معامله را انتخاب کنید');
// //       return false;
// //     }
    
// //     const hasUploading = Array.from(uploadStatus.values()).some(status => status === 'uploading');
// //     if (hasUploading) {
// //       alert('لطفاً منتظر بمانید تا تصاویر آپلود شوند...');
// //       return false;
// //     }
    
// //     return true;
// //   };
  
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!validateForm()) return;
    
// //     setIsSubmitting(true);
// //     setLoading(true);
    
// //     try {
// //       let finalPrice = 0;
// //       if (activeTab === 'buy') {
// //         finalPrice = parseInt(formData.price) * 10000;
// //       } else {
// //         finalPrice = parseInt(rentalData.rentPrice) * 10000 || 0;
// //       }
      
// //       const cacheIdsOnly = uploadedCacheIds.map(item => item.cacheId);
      
// //       const facilitiesForApi = selectedAmenities.map(amenity => ({
// //         id: amenity.id
// //       }));
      
// //       const submitData = {
// //         title: formData.title,
// //         region: locationInfo.regionId || 0,
// //         sqmeter: parseInt(formData.area),
// //         countFloor: parseInt(formData.countFloor) || 1,
// //         countInFloor: parseInt(formData.unitsPerFloor) || 0,
// //         floor: parseInt(formData.floor) || 1,
// //         countRoom: parseInt(formData.rooms) || 0,
// //         isHasElevator: formData.hasElevator,
// //         isHasStoreRoom: false,
// //         isHasParking: formData.hasParking,
// //         isHaLoan: formData.hasLoan,
// //         lat: formData.lat,
// //         lon: formData.lng,
// //         address: formData.address,
// //         descriptionRows: formData.description,
// //         facilities: facilitiesForApi,
// //         showExactLocation: formData.showExactLocation,
// //         categoryTypeId: formData.categoryTypeId,
// //         price: finalPrice,
// //         rentPrice: activeTab === 'rent' ? (parseInt(rentalData.rentPrice) * 10000 || 0) : 0,
// //         depositPrice: activeTab === 'rent' ? (parseInt(rentalData.depositPrice) * 10000 || 0) : 0,
// //         isMortgageOnly: activeTab === 'rent' ? rentalData.isMortgageOnly : false,
// //         // contractDuration: activeTab === 'rent' ? rentalData.contractDuration : 0,
// //          contractDuration: constructionYear, // اینجا سال ساخت ارسال می‌شود
// //         tempImageCacheIds: cacheIdsOnly
// //       };
      
// //       const response = await fetch('https://localhost:7178/api/RealEstatePage/InsertRealEstate', {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(submitData),
// //       });
      
// //       const result = await response.json();
      
// //       if (result.status === 200) {
// //         onSuccess?.();
// //         onClose();
// //         resetForm();
// //       } else {
// //         throw new Error(result.message || 'خطا در ثبت ملک');
// //       }
// //     } catch (error) {
// //       console.error('Error adding property:', error);
// //       alert(error.message || 'خطا در ثبت ملک');
// //     } finally {
// //       setIsSubmitting(false);
// //       setLoading(false);
// //     }
// //   };
  
// //   const resetForm = () => {
// //     setFormData({
// //       title: '', price: '', area: '', address: '', rooms: 0, unitsPerFloor: 0,
// //       countFloor: 1, floor: 1, hasParking: false, hasElevator: false, hasLoan: false,
// //       description: '', lat: 35.699739, lng: 51.338097, showExactLocation: true,
// //       categoryTypeId: null, transactionTypeId: null,
// //     });
// //     setRentalData({ rentPrice: '', depositPrice: '', isMortgageOnly: false, contractDuration: 12 });
// //     setImages([]);
// //     setImagePreviews([]);
// //     setUploadedCacheIds([]);
// //     setUploadStatus(new Map());
// //     setUploadProgress(new Map());
// //     setLocationSelected(false);
// //     setMapCenter({ lat: 35.699739, lng: 51.338097 });
// //     setSelectedAmenities([]);
// //     setAmenityInput('');
// //     setAmenitySuggestions([]);
// //     setSelectedTransaction(null);
// //     setAvailableAmenities([]);
// //     setDisplayPrice('');
// //     setLocationInfo({
// //       city: '', cityId: null, cityLat: null, cityLng: null,
// //       region: '', regionId: null, neighborhood: '', neighborhoodId: null, fullAddress: ''
// //     });
// //   };
  
// //   useEffect(() => {
// //     if (isOpen) {
// //       fetchTransactionTypes();
// //     } else {
// //       setActiveTab('buy');
// //       setSelectedTransaction(null);
// //       resetForm();
// //     }
// //   }, [isOpen]);
  
// //   useEffect(() => {
// //     if (selectedTransaction?.id) {
// //       fetchAmenities(selectedTransaction.id);
// //     }
// //   }, [selectedTransaction]);
  
// //   const TabSkeleton = () => (
// //     <div className="tab-skeleton">
// //       <div className="skeleton-tab-header">
// //         <div className="skeleton-tab"></div>
// //         <div className="skeleton-tab"></div>
// //       </div>
// //       <div className="skeleton-form">
// //         <div className="skeleton-field"><div className="skeleton-label"></div><div className="skeleton-input"></div></div>
// //         <div className="skeleton-row"><div className="skeleton-field"><div className="skeleton-label"></div><div className="skeleton-input"></div></div><div className="skeleton-field"><div className="skeleton-label"></div><div className="skeleton-input"></div></div></div>
// //         <div className="skeleton-field"><div className="skeleton-label"></div><div className="skeleton-map"></div></div>
// //         <div className="skeleton-actions"></div>
// //       </div>
// //     </div>
// //   );
  
// //   const renderAmenitiesSection = () => {
// //     if (loadingAmenities) {
// //       return (
// //         <div className="add-form-group full-width">
// //           <label>🏢 امکانات رفاهی</label>
// //           <div className="amenities-loading"><div className="loading-spinner-small"></div><span>در حال بارگذاری امکانات...</span></div>
// //         </div>
// //       );
// //     }
    
// //     if (!availableAmenities?.length) {
// //       return (
// //         <div className="add-form-group full-width">
// //           <label>🏢 امکانات رفاهی</label>
// //           <div className="no-amenities-info"><FaInfoCircle /><span>امکانات رفاهی برای این نوع معامله تعریف نشده است</span></div>
// //         </div>
// //       );
// //     }
    
// //     const filteredAmenities = amenityInput.trim() 
// //       ? availableAmenities.filter(a => a.name.toLowerCase().includes(amenityInput.toLowerCase())) 
// //       : availableAmenities;
    
// //     return (
// //       <div className="add-form-group full-width">
// //         <label>🏢 امکانات رفاهی</label>
// //         <div className="amenities-multiselect">
// //           <div className="amenities-search-container">
// //             <input 
// //               type="text" 
// //               value={amenityInput} 
// //               onChange={(e) => handleAmenitySearch(e.target.value)} 
// //               placeholder="جستجو: پارکینگ، انباری، بالکن، ..." 
// //               className="amenities-input" 
// //               autoComplete="off" 
// //             />
// //             {amenityInput && (
// //               <button type="button" className="clear-search-btn" onClick={() => { setAmenityInput(''); setAmenitySuggestions([]); }}>
// //                 ✕
// //               </button>
// //             )}
// //           </div>
          
// //           {amenitySuggestions.length > 0 && (
// //             <div className="amenities-suggestions">
// //               {amenitySuggestions.map((suggestion, idx) => (
// //                 <div key={idx} className="suggestion-item" onClick={() => addAmenity(suggestion)}>
// //                   <span className="suggestion-name">{suggestion.name}</span>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
          
// //           <div className="selected-amenities">
// //             {selectedAmenities.length === 0 ? (
// //               <div className="no-amenities"><FaInfoCircle /> هنوز امکاناتی انتخاب نشده است</div>
// //             ) : (
// //               selectedAmenities.map((amenity, idx) => (
// //                 <div key={idx} className="amenity-tag">
// //                   <span>{amenity.name}</span>
// //                   <button type="button" onClick={() => removeAmenity(amenity)} className="remove-amenity">×</button>
// //                 </div>
// //               ))
// //             )}
// //           </div>
          
// //           <div className="popular-amenities">
// //             <div className="popular-title">
// //               📋 {amenityInput ? `نتایج جستجو برای "${amenityInput}":` : 'تمام امکانات موجود:'}
// //               <span className="result-count">({filteredAmenities.length} مورد)</span>
// //             </div>
// //             <div className="popular-list">
// //               {filteredAmenities.length > 0 ? 
// //                 filteredAmenities.map((amenity, idx) => (
// //                   <button 
// //                     key={idx} 
// //                     type="button" 
// //                     onClick={() => addAmenity(amenity)} 
// //                     disabled={selectedAmenities.some(a => a.id === amenity.id)} 
// //                     className={`popular-amenity-btn ${selectedAmenities.some(a => a.id === amenity.id) ? 'disabled' : ''}`}
// //                   >
// //                     {amenity.name}
// //                   </button>
// //                 )) : (
// //                   <div className="no-search-results">
// //                     <FaInfoCircle /><span>نتیجه‌ای برای "{amenityInput}" یافت نشد</span>
// //                   </div>
// //                 )
// //               }
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };
  
// //   const ImageStatusOverlay = ({ previewUrl }) => {
// //     const status = uploadStatus.get(previewUrl);
// //     const progress = uploadProgress.get(previewUrl) || 0;
    
// //     if (status === 'uploading') {
// //       return (
// //         <div className="image-upload-overlay">
// //           <div className="upload-spinner"></div>
// //           <span>{progress}%</span>
// //         </div>
// //       );
// //     }
    
// //     if (status === 'success') {
// //       return (
// //         <div className="image-upload-overlay success">
// //           <FaCheckCircle />
// //           <span>آپلود شد</span>
// //         </div>
// //       );
// //     }
    
// //     if (status === 'error') {
// //       return (
// //         <div className="image-upload-overlay error">
// //           <span>!</span>
// //           <span>خطا</span>
// //         </div>
// //       );
// //     }
    
// //     return null;
// //   };
  
// //   if (!selectedTransaction) {
// //     return (
// //       <div className="add-modal-overlay" onClick={onClose}>
// //         <div className="add-modal-container" onClick={(e) => e.stopPropagation()}>
// //           <div className="add-modal-header">
// //             <h3>🏠 ثبت ملک جدید</h3>
// //             <button className="add-modal-close" onClick={onClose}>✕</button>
// //           </div>
// //           {loadingTypes ? <TabSkeleton /> : (
// //             <div className="transaction-tabs-container">
// //               <div className="transaction-tabs-header">
// //                 <button className={`transaction-tab ${activeTab === 'buy' ? 'active' : ''}`} onClick={() => setActiveTab('buy')}>
// //                   <span className="tab-icon">💰</span>
// //                   <span className="tab-title">خرید</span>
// //                   <span className="tab-badge">{saleTypes?.length || 0}</span>
// //                 </button>
// //                 <button className={`transaction-tab ${activeTab === 'rent' ? 'active' : ''}`} onClick={() => setActiveTab('rent')}>
// //                   <span className="tab-icon">📝</span>
// //                   <span className="tab-title">رهن و اجاره</span>
// //                   <span className="tab-badge">{rentTypes?.length || 0}</span>
// //                 </button>
// //               </div>
// //               <div className="transaction-tabs-content">
// //                 <div className="transaction-type-grid">
// //                   {(activeTab === 'buy' ? saleTypes : rentTypes)?.map((type, idx) => (
// //                     <button key={idx} className={`transaction-type-card ${activeTab === 'buy' ? 'sale-card' : 'rent-card'}`} onClick={() => { 
// //                       setSelectedTransaction(type); 
// //                       setFormData(prev => ({ ...prev, categoryTypeId: activeTab === 'buy' ? 1 : 2, transactionTypeId: type.id })); 
// //                     }}>
// //                       <div className="card-icon">{type.icon || (activeTab === 'buy' ? '💰' : '📝')}</div>
// //                       <div className="card-title">{type.name}</div>
// //                       <div className="card-desc">{type.description || (activeTab === 'buy' ? 'ثبت ملک برای فروش' : 'ثبت ملک برای رهن و اجاره')}</div>
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     );
// //   }
  
// //   return (
// //     <div className="add-modal-overlay" onClick={onClose}>
// //       <div className="add-modal-container" onClick={(e) => e.stopPropagation()}>
// //         <div className="add-modal-header">
// //           <h3>
// //             {activeTab === 'buy' ? '💰 ثبت ملک برای فروش' : '📝 ثبت ملک برای اجاره'}
// //             <span className="transaction-badge" style={{ background: activeTab === 'buy' ? '#10b981' : '#3b82f6' }}>
// //               {selectedTransaction?.name || (activeTab === 'buy' ? 'فروش' : 'اجاره')}
// //             </span>
// //             <button type="button" className="change-transaction-btn" onClick={() => setSelectedTransaction(null)}>
// //               تغییر نوع معامله
// //             </button>
// //           </h3>
// //           <button className="add-modal-close" onClick={onClose}>✕</button>
// //         </div>
        
// //         <form onSubmit={handleSubmit} className="add-modal-form">
// //           <div className="add-form-row">
// //             <div className="add-form-group full-width">
// //               <label>عنوان ملک *</label>
// //               <input 
// //                 type="text" 
// //                 value={formData.title} 
// //                 onChange={(e) => updateFormField('title', e.target.value)} 
// //                 placeholder="مثال: آپارتمان لوکس در مرکز شهر" 
// //                 required 
// //                 disabled={isSubmitting}
// //               />
// //             </div>
// //           </div>
          
// //           <div className="add-form-group full-width">
// //             <label>📍 موقعیت مکانی *</label>
// //             <LocationSelector onLocationSelect={handleLocationSelect} initialLocation={locationInfo} disabled={isSubmitting} />
// //           </div>
          
// //           <div className="add-form-row">
// //             {activeTab === 'buy' ? (
// //               <div className="add-form-group">
// //                 <label>قیمت فروش (میلیون تومان) *</label>
// //                 <input 
// //                   type="text" 
// //                   value={displayPrice} 
// //                   onChange={handlePriceChange} 
// //                   placeholder="مثال: ۱,۵۰۰" 
// //                   required 
// //                   disabled={isSubmitting}
// //                 />
// //                 {formData.price && (
// //                   <div className="price-in-words">
// //                     <span className="price-words-icon">🔊</span>
// //                     <span>{convertToPersianWords(formData.price)}</span>
// //                   </div>
// //                 )}
// //               </div>
// //             ) : (
// //               <>
// //                 <div className="add-form-group">
// //                   <label>ودیعه (رهن) - تومان</label>
// //                   <input 
// //                     type="text" 
// //                     value={rentalData.depositPrice} 
// //                     onChange={(e) => setRentalData({...rentalData, depositPrice: e.target.value.replace(/[^\d]/g, '')})} 
// //                     placeholder="مثال: 50000000" 
// //                     disabled={isSubmitting}
// //                   />
// //                   <small>مبلغ ودیعه به تومان</small>
// //                 </div>
// //                 <div className="add-form-group">
// //                   <label>اجاره ماهانه - تومان *</label>
// //                   <input 
// //                     type="text" 
// //                     value={rentalData.rentPrice} 
// //                     onChange={(e) => setRentalData({...rentalData, rentPrice: e.target.value.replace(/[^\d]/g, '')})} 
// //                     placeholder="مثال: 2000000" 
// //                     required 
// //                     disabled={isSubmitting}
// //                   />
// //                   <small>قیمت اجاره ماهانه به تومان</small>
// //                 </div>
// //               </>
// //             )}
// //             <div className="add-form-group">
// //               <label>متراژ (متر مربع) *</label>
// //               <input 
// //                 type="number" 
// //                 value={formData.area} 
// //                 onChange={(e) => updateFormField('area', e.target.value)} 
// //                 placeholder="مثال: 120" 
// //                 required 
// //                 disabled={isSubmitting}
// //               />
// //             </div>
// //           </div>
          
// //           {activeTab === 'rent' && (
// //             <div className="add-form-group full-width">
// //               <label className="checkbox-label">
// //                 <input 
// //                   type="checkbox" 
// //                   checked={rentalData.isMortgageOnly} 
// //                   onChange={(e) => setRentalData({...rentalData, isMortgageOnly: e.target.checked})} 
// //                   disabled={isSubmitting}
// //                 /> 
// //                 فقط رهن (بدون اجاره ماهانه)
// //               </label>
// //             </div>
// //           )}
          
// //           <div className="add-form-row">
// //             {/* بعد از فیلد تعداد طبقات یا هر جای مناسبی */}
// // <div className="add-form-group">
// //   <label>🏗️ سال ساخت</label>
// //   <SearchableSelect
// //     options={availableYears}
// //     value={constructionYear}
// //     onChange={(year) => setConstructionYear(year)}
// //     placeholder="انتخاب سال ساخت..."
// //     disabled={isSubmitting}
// //   />
// //   <small>سال ساخت ملک (از 1350 تاکنون)</small>
// // </div>
// //             <div className="add-form-group">
// //               <label>تعداد اتاق</label>
// //               <input 
// //                 type="number" 
// //                 value={formData.rooms} 
// //                 onChange={(e) => updateFormField('rooms', e.target.value)} 
// //                 min="0" 
// //                 max="10" 
// //                 disabled={isSubmitting}
// //               />
// //             </div>
// //             <div className="add-form-group">
// //               <label>تعداد واحد در طبقه 🏢</label>
// //               <input 
// //                 type="number" 
// //                 value={formData.unitsPerFloor} 
// //                 onChange={(e) => updateFormField('unitsPerFloor', e.target.value)} 
// //                 min="0" 
// //                 max="20" 
// //                 placeholder="مثال: 2" 
// //                 disabled={isSubmitting}
// //               />
// //               <small>تعداد واحدهای مسکونی در این طبقه</small>
// //             </div>
// //           </div>
          
// //           <div className="add-form-row">
// //             <div className="add-form-group">
// //               <label>تعداد طبقات ساختمان</label>
// //               <input 
// //                 type="number" 
// //                 value={formData.countFloor} 
// //                 onChange={(e) => updateFormField('countFloor', e.target.value)} 
// //                 min="1" 
// //                 max="20" 
// //                 disabled={isSubmitting}
// //               />
// //             </div>
// //             <div className="add-form-group">
// //               <label>طبقه واحد</label>
// //               <input 
// //                 type="number" 
// //                 value={formData.floor} 
// //                 onChange={(e) => updateFormField('floor', e.target.value)} 
// //                 min="1" 
// //                 disabled={isSubmitting}
// //               />
// //             </div>
// //           </div>
          
// //           <div className="add-form-group full-width">
// //             <label>آدرس دقیق</label>
// //             <textarea 
// //               value={formData.address} 
// //               onChange={(e) => updateFormField('address', e.target.value)} 
// //               placeholder="آدرس کامل ملک" 
// //               rows="2" 
// //               disabled={isSubmitting}
// //             />
// //           </div>
          
// //           <div className="add-form-row">
// //             <div className="add-form-group">
// //               <label><FaInfoCircle style={{ marginLeft: '4px' }} /> عرض جغرافیایی (Latitude)</label>
// //               <input 
// //                 type="number" 
// //                 step="0.000001" 
// //                 value={formData.lat} 
// //                 onChange={(e) => updateLocation(parseFloat(e.target.value), formData.lng)} 
// //                 className="coord-input" 
// //                 disabled={isSubmitting}
// //               />
// //               <small>با جابجایی نشانگر روی نقشه خودکار پر می‌شود</small>
// //             </div>
// //             <div className="add-form-group">
// //               <label><FaInfoCircle style={{ marginLeft: '4px' }} /> طول جغرافیایی (Longitude)</label>
// //               <input 
// //                 type="number" 
// //                 step="0.000001" 
// //                 value={formData.lng} 
// //                 onChange={(e) => updateLocation(formData.lat, parseFloat(e.target.value))} 
// //                 className="coord-input" 
// //                 disabled={isSubmitting}
// //               />
// //               <small>با جابجایی نشانگر روی نقشه خودکار پر می‌شود</small>
// //             </div>
// //           </div>
          
// //           <div className="add-form-group full-width">
// //             <label>امکانات پایه</label>
// //             <div className="add-checkbox-group">
// //               <label>
// //                 <input 
// //                   type="checkbox" 
// //                   checked={formData.hasParking} 
// //                   onChange={(e) => updateFormField('hasParking', e.target.checked)} 
// //                   disabled={isSubmitting}
// //                 /> 
// //                 🚗 پارکینگ
// //               </label>
// //               <label>
// //                 <input 
// //                   type="checkbox" 
// //                   checked={formData.hasElevator} 
// //                   onChange={(e) => updateFormField('hasElevator', e.target.checked)} 
// //                   disabled={isSubmitting}
// //                 /> 
// //                 🛗 آسانسور
// //               </label>
// //               <label>
// //                 <input 
// //                   type="checkbox" 
// //                   checked={formData.hasLoan} 
// //                   onChange={(e) => updateFormField('hasLoan', e.target.checked)} 
// //                   disabled={isSubmitting}
// //                 /> 
// //                 🏦 تسهیلات بانکی
// //               </label>
// //             </div>
// //           </div>
          
// //           {renderAmenitiesSection()}
          
// //           <div className="add-form-group full-width">
// //             <label>تصاویر ملک (حداکثر 10 مگابایت هر تصویر)</label>
// //             <div className="add-image-upload-area">
// //               <input 
// //                 type="file" 
// //                 accept="image/*" 
// //                 multiple 
// //                 onChange={handleImageChange} 
// //                 id="add-image-upload" 
// //                 style={{ display: 'none' }} 
// //                 disabled={isSubmitting} 
// //               />
// //               <label htmlFor="add-image-upload" className="add-upload-label">
// //                 📸 انتخاب تصاویر
// //               </label>
// //               <div className="add-image-previews">
// //                 {imagePreviews.map((preview, index) => (
// //                   <div key={index} className="add-image-preview">
// //                     <img src={preview} alt={`پیش‌نمایش ${index + 1}`} />
// //                     <ImageStatusOverlay previewUrl={preview} />
// //                     <button 
// //                       type="button" 
// //                       onClick={() => removeImage(index)} 
// //                       className="remove-image-btn" 
// //                       disabled={uploadStatus.get(preview) === 'uploading' || isSubmitting}
// //                     >
// //                       ✕
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //             <small>✅ تصاویر به صورت خودکار آپلود می‌شوند. پس از آپلود موفق، هاله سبز نمایش داده می‌شود.</small>
// //           </div>
          
// //           <div className="add-form-group full-width">
// //             <label>توضیحات تکمیلی</label>
// //             <div className="rich-editor-wrapper">
// //               <ReactQuill 
// //                 theme="snow" 
// //                 value={formData.description} 
// //                 onChange={(value) => updateFormField('description', value)} 
// //                 modules={quillModules} 
// //                 formats={quillFormats} 
// //                 placeholder="توضیحات بیشتر درباره ملک... (قابل راست‌چین، بولت، لیست و ...)" 
// //                 className="rtl-quill" 
// //                 readOnly={isSubmitting}
// //               />
// //             </div>
// //             <small>✨ می‌توانید متن را بولت، ایتالیک، راست‌چین و لیست کنید</small>
// //           </div>
          
// //           <div className="add-form-group full-width">
// //             <label>موقعیت روی نقشه *</label>
// //             <div className="add-map-container">
// //               <NeshanMap 
// //                 mapKey={mapKey} 
// //                 center={{ latitude: mapCenter.lat, longitude: mapCenter.lng }} 
// //                 zoom={14} 
// //                 defaultType="dreamy" 
// //                 poi={true} 
// //                 traffic={false} 
// //                 style={{ height: '100%', width: '100%' }} 
// //                 onInit={(map) => { 
// //                   mapRef.current = map; 
// //                   map.on('moveend', () => { 
// //                     if (isSubmitting) return;
// //                     const center = map.getView().getCenter(); 
// //                     const wgs84 = webMercatorToWgs84(center[0], center[1]); 
// //                     updateLocation(wgs84.lat, wgs84.lng); 
// //                   }); 
// //                   map.on('click', (e) => { 
// //                     if (isSubmitting) return;
// //                     const wgs84 = webMercatorToWgs84(e.coordinate[0], e.coordinate[1]); 
// //                     updateLocation(wgs84.lat, wgs84.lng); 
// //                   }); 
// //                 }} 
// //               />
// //               <div className="add-map-marker-overlay">
// //                 <div className="add-location-dot"></div>
// //                 <div className="add-location-ripple"></div>
// //               </div>
// //             </div>
// //             {locationSelected && (
// //               <div className="add-map-success">
// //                 <FaCheckCircle /> موقعیت ملک ثبت شد
// //                 <span className="add-coords">📍 lat: {formData.lat.toFixed(6)} , lng: {formData.lng.toFixed(6)}</span>
// //               </div>
// //             )}
// //             <div className="add-exact-location-toggle">
// //               <label>
// //                 <input 
// //                   type="checkbox" 
// //                   checked={formData.showExactLocation} 
// //                   onChange={(e) => updateFormField('showExactLocation', e.target.checked)} 
// //                   disabled={isSubmitting}
// //                 /> 
// //                 نمایش موقعیت دقیق ملک در صفحه جزئیات
// //               </label>
// //               <small>با فعال بودن این گزینه، موقعیت دقیق ملک روی نقشه نمایش داده می‌شود</small>
// //             </div>
// //           </div>
          
// //           <div className="add-modal-actions">
// //             <button 
// //               type="submit" 
// //               className="add-submit-btn" 
// //               disabled={isSubmitting}
// //             >
// //               {isSubmitting ? (
// //                 <>
// //                   <span className="loading-spinner-small" style={{ display: 'inline-block', marginLeft: '8px' }}></span>
// //                   در حال ثبت...
// //                 </>
// //               ) : (
// //                 '✅ ثبت ملک'
// //               )}
// //             </button>
// //             <button 
// //               type="button" 
// //               className="add-cancel-btn" 
// //               onClick={onClose}
// //               disabled={isSubmitting}
// //             >
// //               انصراف
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddPropertyModal;

// import React, { useState, useEffect, useRef } from 'react';
// import NeshanMap from "@neshan-maps-platform/react-openlayers";
// import { panelService } from '../../../../services/panelService';
// import "@neshan-maps-platform/react-openlayers/dist/style.css";
// import LocationSelector from './LocationSelector';
// import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
// import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';
// import './AddPropertyModal.css';

// const wgs84ToWebMercator = (lng, lat) => {
//   const R = 6378137;
//   return {
//     x: lng * (Math.PI * R) / 180,
//     y: Math.log(Math.tan((90 + lat) * Math.PI / 360)) * R
//   };
// };

// const webMercatorToWgs84 = (x, y) => {
//   const R = 6378137;
//   return {
//     lat: (2 * Math.atan(Math.exp(y / R)) - Math.PI / 2) * 180 / Math.PI,
//     lng: (x * 180) / (Math.PI * R)
//   };
// };

// const formatNumberWithCommas = (value) => {
//   if (!value) return '';
//   const cleanValue = value.toString().replace(/[^\d]/g, '');
//   if (!cleanValue) return '';
//   return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// };

// const convertToPersianWords = (num) => {
//   if (!num) return '';
//   const number = parseInt(num.toString().replace(/,/g, ''));
//   if (isNaN(number) || number === 0) return 'صفر تومان';
  
//   const units = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
//   const teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
//   const tens = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
//   const hundreds = ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
//   const thousands = ['', 'هزار', 'میلیون', 'میلیارد'];

//   const convertSection = (n) => {
//     if (n === 0) return '';
//     if (n < 10) return units[n];
//     if (n < 20) return teens[n - 10];
//     if (n < 100) {
//       const ten = Math.floor(n / 10);
//       const unit = n % 10;
//       return tens[ten] + (unit > 0 ? ' و ' + units[unit] : '');
//     }
//     const hundred = Math.floor(n / 100);
//     const rest = n % 100;
//     return hundreds[hundred] + (rest > 0 ? ' و ' + convertSection(rest) : '');
//   };

//   let result = '';
//   let temp = number;
//   let index = 0;
  
//   while (temp > 0) {
//     const section = temp % 1000;
//     if (section !== 0) {
//       const sectionText = convertSection(section);
//       result = sectionText + (thousands[index] ? ' ' + thousands[index] : '') + (result ? ' ' + result : '');
//     }
//     temp = Math.floor(temp / 1000);
//     index++;
//   }
  
//   return result + ' تومان';
// };

// const SearchableSelect = ({ options, value, onChange, placeholder, disabled }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isOpen, setIsOpen] = useState(false);
//   const wrapperRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const filteredOptions = options.filter(option =>
//     option.toString().includes(searchTerm)
//   );

//   const handleSelect = (option) => {
//     onChange(option);
//     setSearchTerm('');
//     setIsOpen(false);
//   };

//   return (
//     <div className="searchable-select" ref={wrapperRef}>
//       <div className="searchable-select-input" onClick={() => !disabled && setIsOpen(!isOpen)}>
//         <input
//           type="text"
//           value={searchTerm || (value ? value.toString() : '')}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setIsOpen(true);
//           }}
//           placeholder={placeholder}
//           disabled={disabled}
//           onFocus={() => setIsOpen(true)}
//         />
//         <span className="dropdown-arrow">▼</span>
//       </div>
//       {isOpen && !disabled && (
//         <div className="searchable-select-dropdown">
//           {filteredOptions.length > 0 ? (
//             filteredOptions.map((option, idx) => (
//               <div
//                 key={idx}
//                 className={`searchable-select-option ${value === option ? 'selected' : ''}`}
//                 onClick={() => handleSelect(option)}
//               >
//                 {option}
//               </div>
//             ))
//           ) : (
//             <div className="searchable-select-no-results">نتیجه‌ای یافت نشد</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// const ImageStatusOverlay = ({ previewUrl, uploadStatus, uploadProgress }) => {
//   const status = uploadStatus.get(previewUrl);
//   const progress = uploadProgress.get(previewUrl) || 0;
  
//   if (status === 'uploading') {
//     return (
//       <div className="image-upload-overlay">
//         <div className="upload-spinner"></div>
//         <span>{progress}%</span>
//       </div>
//     );
//   }
  
//   if (status === 'success') {
//     return (
//       <div className="image-upload-overlay success">
//         <FaCheckCircle />
//         <span>آپلود شد</span>
//       </div>
//     );
//   }
  
//   if (status === 'error') {
//     return (
//       <div className="image-upload-overlay error">
//         <span>!</span>
//         <span>خطا</span>
//       </div>
//     );
//   }
  
//   return null;
// };

// const AddPropertyModal = ({ isOpen, onClose, onSuccess }) => {
//   const mapRef = useRef(null);
//   const modalRef = useRef(null);
  
//   const [activeTab, setActiveTab] = useState('buy');
//   const [saleTypes, setSaleTypes] = useState([]);
//   const [rentTypes, setRentTypes] = useState([]);
//   const [loadingTypes, setLoadingTypes] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [availableAmenities, setAvailableAmenities] = useState([]);
//   const [loadingAmenities, setLoadingAmenities] = useState(false);
//   const [selectedAmenities, setSelectedAmenities] = useState([]);
//   const [amenityInput, setAmenityInput] = useState('');
//   const [amenitySuggestions, setAmenitySuggestions] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [constructionYear, setConstructionYear] = useState('');
//   const [availableYears, setAvailableYears] = useState([]);

//   const [formData, setFormData] = useState({
//     title: '',
//     price: '',
//     area: '',
//     address: '',
//     rooms: 0,
//     unitsPerFloor: 0,
//     countFloor: 1,
//     floor: 1,
//     hasParking: false,
//     hasElevator: false,
//     hasLoan: false,
//     description: '',
//     lat: 35.699739,
//     lng: 51.338097,
//     showExactLocation: true,
//     categoryTypeId: null,
//     transactionTypeId: null,
//   });
  
//   const [rentalData, setRentalData] = useState({
//     rentPrice: '',
//     depositPrice: '',
//     isMortgageOnly: false,
//     contractDuration: 12,
//   });
  
//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [uploadStatus, setUploadStatus] = useState(new Map());
//   const [uploadProgress, setUploadProgress] = useState(new Map());
//   const [uploadedCacheIds, setUploadedCacheIds] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [locationSelected, setLocationSelected] = useState(false);
//   const [mapKey] = useState("web.31c5ea6c425e40cc9b30620a84a8be90");
//   const [mapCenter, setMapCenter] = useState({ lat: 35.699739, lng: 51.338097 });
//   const [displayPrice, setDisplayPrice] = useState('');
//   const [locationInfo, setLocationInfo] = useState({
//     city: '', cityId: null, cityLat: null, cityLng: null,
//     region: '', regionId: null, neighborhood: '', neighborhoodId: null, fullAddress: ''
//   });
  
//   const quillModules = {
//     toolbar: [
//       [{ 'header': [1, 2, 3, 4, false] }],
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ 'align': [] }],
//       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//       ['link', 'clean'],
//       [{ 'direction': 'rtl' }]
//     ],
//   };
  
//   const quillFormats = ['header', 'bold', 'italic', 'underline', 'strike', 'align', 'list', 'bullet', 'link', 'direction'];
  
//   const updateFormField = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const generateYears = () => {
//     const currentYear = new Date().getFullYear();
//     const persianCurrentYear = currentYear - 621;
//     const years = [];
//     for (let i = 1350; i <= persianCurrentYear; i++) {
//       years.push(i);
//     }
//     return years.reverse();
//   };

//   useEffect(() => {
//     setAvailableYears(generateYears());
//   }, []);
  
//   const handlePriceChange = (e) => {
//     const rawValue = e.target.value.replace(/[^\d]/g, '');
//     setDisplayPrice(formatNumberWithCommas(rawValue));
//     setFormData(prev => ({ ...prev, price: rawValue }));
//   };
  
//   const updateLocation = (lat, lng) => {
//     setFormData(prev => ({ ...prev, lat, lng }));
//     setMapCenter({ lat, lng });
//     setLocationSelected(true);
//   };
  
//   const uploadSingleImage = async (file, previewUrl) => {
//     setUploadStatus(prev => new Map(prev).set(previewUrl, 'uploading'));
//     setUploadProgress(prev => new Map(prev).set(previewUrl, 0));
    
//     try {
//       const result = await panelService.UploadTempImage(file, (progress) => {
//         setUploadProgress(prev => new Map(prev).set(previewUrl, progress));
//       });
      
//       if (result && result.cacheId) {
//         setUploadStatus(prev => new Map(prev).set(previewUrl, 'success'));
//         setUploadProgress(prev => new Map(prev).set(previewUrl, 100));
//         setUploadedCacheIds(prev => [...prev, { previewUrl, cacheId: result.cacheId }]);
//         return result.cacheId;
//       } else {
//         throw new Error('cacheId دریافت نشد');
//       }
//     } catch (error) {
//       console.error('خطا در آپلود تصویر:', error);
//       setUploadStatus(prev => new Map(prev).set(previewUrl, 'error'));
//       alert(`خطا در آپلود تصویر: ${error.message}`);
//       return null;
//     }
//   };
  
//   const handleImageChange = async (e) => {
//     const files = Array.from(e.target.files);
    
//     for (const file of files) {
//       if (file.size > 10 * 1024 * 1024) {
//         alert(`حجم فایل ${file.name} بیشتر از 10 مگابایت است`);
//         continue;
//       }
      
//       if (!file.type.startsWith('image/')) {
//         alert(`فایل ${file.name} از نوع تصویر نیست`);
//         continue;
//       }
      
//       const reader = new FileReader();
      
//       reader.onloadend = async () => {
//         const previewUrl = reader.result;
//         setImagePreviews(prev => [...prev, previewUrl]);
//         setImages(prev => [...prev, file]);
//         await uploadSingleImage(file, previewUrl);
//       };
      
//       reader.readAsDataURL(file);
//     }
//   };
  
//   const removeImage = async (index) => {
//     const removedPreview = imagePreviews[index];
//     const cacheItem = uploadedCacheIds.find(item => item.previewUrl === removedPreview);
 
//     if (cacheItem && cacheItem.cacheId) {
//       await panelService.clearTempImageFromCache(cacheItem.cacheId);
//     }
    
//     setImages(prev => prev.filter((_, i) => i !== index));
//     setImagePreviews(prev => prev.filter((_, i) => i !== index));
//     setUploadedCacheIds(prev => prev.filter((_, i) => i !== index));
//     setUploadStatus(prev => {
//       const newMap = new Map(prev);
//       newMap.delete(removedPreview);
//       return newMap;
//     });
//     setUploadProgress(prev => {
//       const newMap = new Map(prev);
//       newMap.delete(removedPreview);
//       return newMap;
//     });
//   };
  
//   const fetchTransactionTypes = async () => {
//     setLoadingTypes(true);
//     try {
//       const token = localStorage.getItem('auth_token');
//       const buyResponse = await fetch('https://localhost:7178/api/RealEstatePage/GetCategoryDtos?tabId=1', {
//         method: 'GET',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });
//       const buyResult = await buyResponse.json();
      
//       const rentResponse = await fetch('https://localhost:7178/api/RealEstatePage/GetCategoryDtos?tabId=2', {
//         method: 'GET',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });
//       const rentResult = await rentResponse.json();
      
//       if (buyResult.status === 200 && buyResult.data) {
//         setSaleTypes(buyResult.data.map(item => ({ id: item.id, name: item.title || item.name, icon: item.icon || '💰', description: item.description || 'ثبت ملک برای فروش', categoryTypeId: 1 })));
//       } else {
//         setSaleTypes([{ id: 1, name: 'فروش نقدی', icon: '💰', description: 'ثبت ملک برای فروش نقدی', categoryTypeId: 1 }]);
//       }
      
//       if (rentResult.status === 200 && rentResult.data) {
//         setRentTypes(rentResult.data.map(item => ({ id: item.id, name: item.title || item.name, icon: item.icon || '📝', description: item.description || 'ثبت ملک برای رهن و اجاره', categoryTypeId: 2 })));
//       } else {
//         setRentTypes([{ id: 3, name: 'رهن کامل', icon: '🔑', description: 'ثبت ملک با رهن کامل', categoryTypeId: 2 }]);
//       }
//     } catch (error) {
//       console.error('خطا در دریافت انواع معامله:', error);
//     } finally {
//       setLoadingTypes(false);
//     }
//   };
  
//   const fetchAmenities = async (transactionTypeId) => {
//     if (!transactionTypeId) return;
//     setLoadingAmenities(true);
//     try {
//       const response = await panelService.GetFacilities(transactionTypeId);
//       if (response.status === 200 && response.data && response.data.length > 0) {
//         const amenitiesWithId = response.data.map(item => ({
//           id: item.id,
//           name: item.name || item.title
//         }));
//         setAvailableAmenities(amenitiesWithId);
//         setSelectedAmenities([]);
//       } else {
//         setAvailableAmenities([]);
//       }
//     } catch (error) {
//       console.error('خطا در دریافت امکانات رفاهی:', error);
//       setAvailableAmenities([]);
//     } finally {
//       setLoadingAmenities(false);
//     }
//   };
  
//   const handleAmenitySearch = (searchText) => {
//     setAmenityInput(searchText);
//     if (searchText.trim() && availableAmenities.length > 0) {
//       const filtered = availableAmenities.filter(amenity => 
//         amenity.name?.toLowerCase().includes(searchText.toLowerCase())
//       );
//       setAmenitySuggestions(filtered.slice(0, 8));
//     } else {
//       setAmenitySuggestions([]);
//     }
//   };
  
//   const addAmenity = (amenity) => {
//     const amenityObj = typeof amenity === 'object' ? amenity : availableAmenities.find(a => a.name === amenity);
    
//     if (!amenityObj || !amenityObj.id) {
//       alert('این ویژگی در لیست موجود نیست!');
//       return;
//     }
    
//     if (!selectedAmenities.some(a => a.id === amenityObj.id)) {
//       setSelectedAmenities([...selectedAmenities, amenityObj]);
//     }
    
//     setAmenityInput('');
//     setAmenitySuggestions([]);
//   };
  
//   const removeAmenity = (amenityToRemove) => {
//     setSelectedAmenities(selectedAmenities.filter(a => a.id !== amenityToRemove.id));
//   };
  
//   const handleLocationSelect = (locationData) => {
//     setLocationInfo(locationData || {
//       city: '', cityId: null, cityLat: null, cityLng: null,
//       region: '', regionId: null, neighborhood: '', neighborhoodId: null, fullAddress: ''
//     });
    
//     if (locationData) {
//       const finalLat = locationData.neighborhoodLat || locationData.regionLat || locationData.cityLat;
//       const finalLng = locationData.neighborhoodLng || locationData.regionLng || locationData.cityLng;
      
//       setFormData(prev => ({
//         ...prev,
//         address: locationData.fullAddress || prev.address,
//         lat: finalLat || prev.lat,
//         lng: finalLng || prev.lng
//       }));
      
//       if (finalLat && finalLng) {
//         setMapCenter({ lat: finalLat, lng: finalLng });
//         setLocationSelected(true);
//         setTimeout(() => {
//           if (mapRef.current?.getView()) {
//             const view = mapRef.current.getView();
//             const webMercatorCoords = wgs84ToWebMercator(finalLng, finalLat);
//             view.setCenter([webMercatorCoords.x, webMercatorCoords.y]);
//           }
//         }, 100);
//       }
//     }
//   };
  
//   const validateForm = () => {
//     if (!formData.title.trim()) {
//       alert('لطفاً عنوان ملک را وارد کنید');
//       return false;
//     }
    
//     if (activeTab === 'buy' && (!formData.price || parseInt(formData.price) === 0)) {
//       alert('لطفاً قیمت فروش را وارد کنید');
//       return false;
//     }
    
//     if (!formData.area || parseInt(formData.area) === 0) {
//       alert('لطفاً متراژ ملک را وارد کنید');
//       return false;
//     }
    
//     if (!locationSelected) {
//       alert('لطفاً موقعیت ملک را روی نقشه انتخاب کنید');
//       return false;
//     }
    
//     if (!selectedTransaction) {
//       alert('لطفاً نوع معامله را انتخاب کنید');
//       return false;
//     }
    
//     const hasUploading = Array.from(uploadStatus.values()).some(status => status === 'uploading');
//     if (hasUploading) {
//       alert('لطفاً منتظر بمانید تا تصاویر آپلود شوند...');
//       return false;
//     }
    
//     return true;
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsSubmitting(true);
//     setLoading(true);
    
//     try {
//       let finalPrice = 0;
//       if (activeTab === 'buy') {
//         finalPrice = parseInt(formData.price) * 10000;
//       } else {
//         finalPrice = parseInt(rentalData.rentPrice) * 10000 || 0;
//       }
      
//       const cacheIdsOnly = uploadedCacheIds.map(item => item.cacheId);
      
//       const facilitiesForApi = selectedAmenities.map(amenity => ({
//         id: amenity.id
//       }));
      
//       const submitData = {
//         title: formData.title,
//         region: locationInfo.regionId || 0,
//         sqmeter: parseInt(formData.area),
//         countFloor: parseInt(formData.countFloor) || 1,
//         countInFloor: parseInt(formData.unitsPerFloor) || 0,
//         floor: parseInt(formData.floor) || 1,
//         countRoom: parseInt(formData.rooms) || 0,
//         isHasElevator: formData.hasElevator,
//         isHasStoreRoom: false,
//         isHasParking: formData.hasParking,
//         isHaLoan: formData.hasLoan,
//         lat: formData.lat,
//         lon: formData.lng,
//         address: formData.address,
//         descriptionRows: formData.description,
//         facilities: facilitiesForApi,
//         showExactLocation: formData.showExactLocation,
//         categoryTypeId: formData.categoryTypeId,
//         price: finalPrice,
//         rentPrice: activeTab === 'rent' ? (parseInt(rentalData.rentPrice) * 10000 || 0) : 0,
//         depositPrice: activeTab === 'rent' ? (parseInt(rentalData.depositPrice) * 10000 || 0) : 0,
//         isMortgageOnly: activeTab === 'rent' ? rentalData.isMortgageOnly : false,
//         contractDuration: constructionYear,
//         tempImageCacheIds: cacheIdsOnly
//       };
      
//       const response = await fetch('https://localhost:7178/api/RealEstatePage/InsertRealEstate', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(submitData),
//       });
      
//       const result = await response.json();
      
//       if (result.status === 200) {
//         if (onSuccess) onSuccess();
//         handleClose();
//       } else {
//         throw new Error(result.message || 'خطا در ثبت ملک');
//       }
//     } catch (error) {
//       console.error('Error adding property:', error);
//       alert(error.message || 'خطا در ثبت ملک');
//     } finally {
//       setIsSubmitting(false);
//       setLoading(false);
//     }
//   };
  
//   const handleClose = () => {
//     if (!isSubmitting) {
//       resetForm();
//       onClose();
//     }
//   };
  
//   const resetForm = () => {
//     setFormData({
//       title: '', price: '', area: '', address: '', rooms: 0, unitsPerFloor: 0,
//       countFloor: 1, floor: 1, hasParking: false, hasElevator: false, hasLoan: false,
//       description: '', lat: 35.699739, lng: 51.338097, showExactLocation: true,
//       categoryTypeId: null, transactionTypeId: null,
//     });
//     setRentalData({ rentPrice: '', depositPrice: '', isMortgageOnly: false, contractDuration: 12 });
//     setImages([]);
//     setImagePreviews([]);
//     setUploadedCacheIds([]);
//     setUploadStatus(new Map());
//     setUploadProgress(new Map());
//     setLocationSelected(false);
//     setMapCenter({ lat: 35.699739, lng: 51.338097 });
//     setSelectedAmenities([]);
//     setAmenityInput('');
//     setAmenitySuggestions([]);
//     setSelectedTransaction(null);
//     setAvailableAmenities([]);
//     setDisplayPrice('');
//     setConstructionYear('');
//     setLocationInfo({
//       city: '', cityId: null, cityLat: null, cityLng: null,
//       region: '', regionId: null, neighborhood: '', neighborhoodId: null, fullAddress: ''
//     });
//   };
  
//   useEffect(() => {
//     if (isOpen) {
//       fetchTransactionTypes();
//     } else {
//       setActiveTab('buy');
//       setSelectedTransaction(null);
//       resetForm();
//     }
//   }, [isOpen]);
  
//   useEffect(() => {
//     if (selectedTransaction?.id) {
//       fetchAmenities(selectedTransaction.id);
//     }
//   }, [selectedTransaction]);
  
//   const TabSkeleton = () => (
//     <div className="tab-skeleton">
//       <div className="skeleton-tab-header">
//         <div className="skeleton-tab"></div>
//         <div className="skeleton-tab"></div>
//       </div>
//       <div className="skeleton-form">
//         <div className="skeleton-field"><div className="skeleton-label"></div><div className="skeleton-input"></div></div>
//         <div className="skeleton-row"><div className="skeleton-field"><div className="skeleton-label"></div><div className="skeleton-input"></div></div><div className="skeleton-field"><div className="skeleton-label"></div><div className="skeleton-input"></div></div></div>
//         <div className="skeleton-field"><div className="skeleton-label"></div><div className="skeleton-map"></div></div>
//         <div className="skeleton-actions"></div>
//       </div>
//     </div>
//   );
  
//   const renderAmenitiesSection = () => {
//     if (loadingAmenities) {
//       return (
//         <div className="add-form-group full-width">
//           <label>🏢 امکانات رفاهی</label>
//           <div className="amenities-loading"><div className="loading-spinner-small"></div><span>در حال بارگذاری امکانات...</span></div>
//         </div>
//       );
//     }
    
//     if (!availableAmenities?.length) {
//       return (
//         <div className="add-form-group full-width">
//           <label>🏢 امکانات رفاهی</label>
//           <div className="no-amenities-info"><FaInfoCircle /><span>امکانات رفاهی برای این نوع معامله تعریف نشده است</span></div>
//         </div>
//       );
//     }
    
//     const filteredAmenities = amenityInput.trim() 
//       ? availableAmenities.filter(a => a.name.toLowerCase().includes(amenityInput.toLowerCase())) 
//       : availableAmenities;
    
//     return (
//       <div className="add-form-group full-width">
//         <label>🏢 امکانات رفاهی</label>
//         <div className="amenities-multiselect">
//           <div className="amenities-search-container">
//             <input 
//               type="text" 
//               value={amenityInput} 
//               onChange={(e) => handleAmenitySearch(e.target.value)} 
//               placeholder="جستجو: پارکینگ، انباری، بالکن، ..." 
//               className="amenities-input" 
//               autoComplete="off" 
//             />
//             {amenityInput && (
//               <button type="button" className="clear-search-btn" onClick={() => { setAmenityInput(''); setAmenitySuggestions([]); }}>
//                 ✕
//               </button>
//             )}
//           </div>
          
//           {amenitySuggestions.length > 0 && (
//             <div className="amenities-suggestions">
//               {amenitySuggestions.map((suggestion, idx) => (
//                 <div key={idx} className="suggestion-item" onClick={() => addAmenity(suggestion)}>
//                   <span className="suggestion-name">{suggestion.name}</span>
//                 </div>
//               ))}
//             </div>
//           )}
          
//           <div className="selected-amenities">
//             {selectedAmenities.length === 0 ? (
//               <div className="no-amenities"><FaInfoCircle /> هنوز امکاناتی انتخاب نشده است</div>
//             ) : (
//               selectedAmenities.map((amenity, idx) => (
//                 <div key={idx} className="amenity-tag">
//                   <span>{amenity.name}</span>
//                   <button type="button" onClick={() => removeAmenity(amenity)} className="remove-amenity">×</button>
//                 </div>
//               ))
//             )}
//           </div>
          
//           <div className="popular-amenities">
//             <div className="popular-title">
//               📋 {amenityInput ? `نتایج جستجو برای "${amenityInput}":` : 'تمام امکانات موجود:'}
//               <span className="result-count">({filteredAmenities.length} مورد)</span>
//             </div>
//             <div className="popular-list">
//               {filteredAmenities.length > 0 ? 
//                 filteredAmenities.map((amenity, idx) => (
//                   <button 
//                     key={idx} 
//                     type="button" 
//                     onClick={() => addAmenity(amenity)} 
//                     disabled={selectedAmenities.some(a => a.id === amenity.id)} 
//                     className={`popular-amenity-btn ${selectedAmenities.some(a => a.id === amenity.id) ? 'disabled' : ''}`}
//                   >
//                     {amenity.name}
//                   </button>
//                 )) : (
//                   <div className="no-search-results">
//                     <FaInfoCircle /><span>نتیجه‌ای برای "{amenityInput}" یافت نشد</span>
//                   </div>
//                 )
//               }
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   if (!isOpen) return null;
  
//   if (!selectedTransaction) {
//     return (
//       <div className="add-modal-overlay">
//         <div className="add-modal-container" ref={modalRef}>
//           <div className="add-modal-header">
//             <h3>🏠 ثبت ملک جدید</h3>
//             <button className="add-modal-close" onClick={handleClose}>✕</button>
//           </div>
//           {loadingTypes ? <TabSkeleton /> : (
//             <div className="transaction-tabs-container">
//               <div className="transaction-tabs-header">
//                 <button 
//                   className={`transaction-tab ${activeTab === 'buy' ? 'active' : ''}`} 
//                   onClick={() => setActiveTab('buy')}
//                 >
//                   <span className="tab-icon">💰</span>
//                   <span className="tab-title">خرید</span>
//                   <span className="tab-badge">{saleTypes?.length || 0}</span>
//                 </button>
//                 <button 
//                   className={`transaction-tab ${activeTab === 'rent' ? 'active' : ''}`} 
//                   onClick={() => setActiveTab('rent')}
//                 >
//                   <span className="tab-icon">📝</span>
//                   <span className="tab-title">رهن و اجاره</span>
//                   <span className="tab-badge">{rentTypes?.length || 0}</span>
//                 </button>
//               </div>
//               <div className="transaction-tabs-content">
//                 <div className="transaction-type-grid">
//                   {(activeTab === 'buy' ? saleTypes : rentTypes)?.map((type, idx) => (
//                     <button 
//                       key={idx} 
//                       className={`transaction-type-card ${activeTab === 'buy' ? 'sale-card' : 'rent-card'}`} 
//                       onClick={() => { 
//                         setSelectedTransaction(type); 
//                         setFormData(prev => ({ ...prev, categoryTypeId: activeTab === 'buy' ? 1 : 2, transactionTypeId: type.id })); 
//                       }}
//                     >
//                       <div className="card-icon">{type.icon || (activeTab === 'buy' ? '💰' : '📝')}</div>
//                       <div className="card-title">{type.name}</div>
//                       <div className="card-desc">{type.description || (activeTab === 'buy' ? 'ثبت ملک برای فروش' : 'ثبت ملک برای رهن و اجاره')}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="add-modal-overlay">
//       <div className="add-modal-container" ref={modalRef}>
//         <div className="add-modal-header">
//           <h3>
//             {activeTab === 'buy' ? '💰 ثبت ملک برای فروش' : '📝 ثبت ملک برای اجاره'}
//             <span className="transaction-badge" style={{ background: activeTab === 'buy' ? '#10b981' : '#3b82f6' }}>
//               {selectedTransaction?.name || (activeTab === 'buy' ? 'فروش' : 'اجاره')}
//             </span>
//             <button 
//               type="button" 
//               className="change-transaction-btn" 
//               onClick={() => setSelectedTransaction(null)}
//             >
//               تغییر نوع معامله
//             </button>
//           </h3>
//           <button className="add-modal-close" onClick={handleClose}>✕</button>
//         </div>
        
//         <form onSubmit={handleSubmit} className="add-modal-form">
//           {/* فرمت در اینجا به طور کامل قرار میگیره */}
//           <div className="add-form-row">
//             <div className="add-form-group full-width">
//               <label>عنوان ملک *</label>
//               <input 
//                 type="text" 
//                 value={formData.title} 
//                 onChange={(e) => updateFormField('title', e.target.value)} 
//                 placeholder="مثال: آپارتمان لوکس در مرکز شهر" 
//                 required 
//                 disabled={isSubmitting}
//               />
//             </div>
//           </div>
          
//           <div className="add-form-group full-width">
//             <label>📍 موقعیت مکانی *</label>
//             <LocationSelector onLocationSelect={handleLocationSelect} initialLocation={locationInfo} disabled={isSubmitting} />
//           </div>
          
//           <div className="add-form-row">
//             {activeTab === 'buy' ? (
//               <div className="add-form-group">
//                 <label>قیمت فروش (میلیون تومان) *</label>
//                 <input 
//                   type="text" 
//                   value={displayPrice} 
//                   onChange={handlePriceChange} 
//                   placeholder="مثال: ۱,۵۰۰" 
//                   required 
//                   disabled={isSubmitting}
//                 />
//                 {formData.price && (
//                   <div className="price-in-words">
//                     <span className="price-words-icon">🔊</span>
//                     <span>{convertToPersianWords(formData.price)}</span>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <div className="add-form-group">
//                   <label>ودیعه (رهن) - تومان</label>
//                   <input 
//                     type="text" 
//                     value={rentalData.depositPrice} 
//                     onChange={(e) => setRentalData({...rentalData, depositPrice: e.target.value.replace(/[^\d]/g, '')})} 
//                     placeholder="مثال: 50000000" 
//                     disabled={isSubmitting}
//                   />
//                   <small>مبلغ ودیعه به تومان</small>
//                 </div>
//                 <div className="add-form-group">
//                   <label>اجاره ماهانه - تومان *</label>
//                   <input 
//                     type="text" 
//                     value={rentalData.rentPrice} 
//                     onChange={(e) => setRentalData({...rentalData, rentPrice: e.target.value.replace(/[^\d]/g, '')})} 
//                     placeholder="مثال: 2000000" 
//                     required 
//                     disabled={isSubmitting}
//                   />
//                   <small>قیمت اجاره ماهانه به تومان</small>
//                 </div>
//               </>
//             )}
//             <div className="add-form-group">
//               <label>متراژ (متر مربع) *</label>
//               <input 
//                 type="number" 
//                 value={formData.area} 
//                 onChange={(e) => updateFormField('area', e.target.value)} 
//                 placeholder="مثال: 120" 
//                 required 
//                 disabled={isSubmitting}
//               />
//             </div>
//           </div>
          
//           {activeTab === 'rent' && (
//             <div className="add-form-group full-width">
//               <label className="checkbox-label">
//                 <input 
//                   type="checkbox" 
//                   checked={rentalData.isMortgageOnly} 
//                   onChange={(e) => setRentalData({...rentalData, isMortgageOnly: e.target.checked})} 
//                   disabled={isSubmitting}
//                 /> 
//                 فقط رهن (بدون اجاره ماهانه)
//               </label>
//             </div>
//           )}
          
//           <div className="add-form-row">
//             <div className="add-form-group">
//               <label>🏗️ سال ساخت</label>
//               <SearchableSelect
//                 options={availableYears}
//                 value={constructionYear}
//                 onChange={(year) => setConstructionYear(year)}
//                 placeholder="انتخاب سال ساخت..."
//                 disabled={isSubmitting}
//               />
//               <small>سال ساخت ملک (از 1350 تاکنون)</small>
//             </div>
//             <div className="add-form-group">
//               <label>تعداد اتاق</label>
//               <input 
//                 type="number" 
//                 value={formData.rooms} 
//                 onChange={(e) => updateFormField('rooms', e.target.value)} 
//                 min="0" 
//                 max="10" 
//                 disabled={isSubmitting}
//               />
//             </div>
//             <div className="add-form-group">
//               <label>تعداد واحد در طبقه 🏢</label>
//               <input 
//                 type="number" 
//                 value={formData.unitsPerFloor} 
//                 onChange={(e) => updateFormField('unitsPerFloor', e.target.value)} 
//                 min="0" 
//                 max="20" 
//                 placeholder="مثال: 2" 
//                 disabled={isSubmitting}
//               />
//               <small>تعداد واحدهای مسکونی در این طبقه</small>
//             </div>
//           </div>
          
//           <div className="add-form-row">
//             <div className="add-form-group">
//               <label>تعداد طبقات ساختمان</label>
//               <input 
//                 type="number" 
//                 value={formData.countFloor} 
//                 onChange={(e) => updateFormField('countFloor', e.target.value)} 
//                 min="1" 
//                 max="20" 
//                 disabled={isSubmitting}
//               />
//             </div>
//             <div className="add-form-group">
//               <label>طبقه واحد</label>
//               <input 
//                 type="number" 
//                 value={formData.floor} 
//                 onChange={(e) => updateFormField('floor', e.target.value)} 
//                 min="1" 
//                 disabled={isSubmitting}
//               />
//             </div>
//           </div>
          
//           <div className="add-form-group full-width">
//             <label>آدرس دقیق</label>
//             <textarea 
//               value={formData.address} 
//               onChange={(e) => updateFormField('address', e.target.value)} 
//               placeholder="آدرس کامل ملک" 
//               rows="2" 
//               disabled={isSubmitting}
//             />
//           </div>
          
//           <div className="add-form-row">
//             <div className="add-form-group">
//               <label><FaInfoCircle style={{ marginLeft: '4px' }} /> عرض جغرافیایی (Latitude)</label>
//               <input 
//                 type="number" 
//                 step="0.000001" 
//                 value={formData.lat} 
//                 onChange={(e) => updateLocation(parseFloat(e.target.value), formData.lng)} 
//                 className="coord-input" 
//                 disabled={isSubmitting}
//               />
//               <small>با جابجایی نشانگر روی نقشه خودکار پر می‌شود</small>
//             </div>
//             <div className="add-form-group">
//               <label><FaInfoCircle style={{ marginLeft: '4px' }} /> طول جغرافیایی (Longitude)</label>
//               <input 
//                 type="number" 
//                 step="0.000001" 
//                 value={formData.lng} 
//                 onChange={(e) => updateLocation(formData.lat, parseFloat(e.target.value))} 
//                 className="coord-input" 
//                 disabled={isSubmitting}
//               />
//               <small>با جابجایی نشانگر روی نقشه خودکار پر می‌شود</small>
//             </div>
//           </div>
          
//           <div className="add-form-group full-width">
//             <label>امکانات پایه</label>
//             <div className="add-checkbox-group">
//               <label>
//                 <input 
//                   type="checkbox" 
//                   checked={formData.hasParking} 
//                   onChange={(e) => updateFormField('hasParking', e.target.checked)} 
//                   disabled={isSubmitting}
//                 /> 
//                 🚗 پارکینگ
//               </label>
//               <label>
//                 <input 
//                   type="checkbox" 
//                   checked={formData.hasElevator} 
//                   onChange={(e) => updateFormField('hasElevator', e.target.checked)} 
//                   disabled={isSubmitting}
//                 /> 
//                 🛗 آسانسور
//               </label>
//               <label>
//                 <input 
//                   type="checkbox" 
//                   checked={formData.hasLoan} 
//                   onChange={(e) => updateFormField('hasLoan', e.target.checked)} 
//                   disabled={isSubmitting}
//                 /> 
//                 🏦 تسهیلات بانکی
//               </label>
//             </div>
//           </div>
          
//           {renderAmenitiesSection()}
          
//           <div className="add-form-group full-width">
//             <label>تصاویر ملک (حداکثر 10 مگابایت هر تصویر)</label>
//             <div className="add-image-upload-area">
//               <input 
//                 type="file" 
//                 accept="image/*" 
//                 multiple 
//                 onChange={handleImageChange} 
//                 id="add-image-upload" 
//                 style={{ display: 'none' }} 
//                 disabled={isSubmitting} 
//               />
//               <label htmlFor="add-image-upload" className="add-upload-label">
//                 📸 انتخاب تصاویر
//               </label>
//               <div className="add-image-previews">
//                 {imagePreviews.map((preview, index) => (
//                   <div key={index} className="add-image-preview">
//                     <img src={preview} alt={`پیش‌نمایش ${index + 1}`} />
//                     <ImageStatusOverlay 
//                       previewUrl={preview} 
//                       uploadStatus={uploadStatus} 
//                       uploadProgress={uploadProgress} 
//                     />
//                     <button 
//                       type="button" 
//                       onClick={() => removeImage(index)} 
//                       className="remove-image-btn" 
//                       disabled={uploadStatus.get(preview) === 'uploading' || isSubmitting}
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <small>✅ تصاویر به صورت خودکار آپلود می‌شوند. پس از آپلود موفق، هاله سبز نمایش داده می‌شود.</small>
//           </div>
          
//           <div className="add-form-group full-width">
//             <label>توضیحات تکمیلی</label>
//             <div className="rich-editor-wrapper">
//               <ReactQuill 
//                 theme="snow" 
//                 value={formData.description} 
//                 onChange={(value) => updateFormField('description', value)} 
//                 modules={quillModules} 
//                 formats={quillFormats} 
//                 placeholder="توضیحات بیشتر درباره ملک... (قابل راست‌چین، بولت، لیست و ...)" 
//                 className="rtl-quill" 
//                 readOnly={isSubmitting}
//               />
//             </div>
//             <small>✨ می‌توانید متن را بولت، ایتالیک، راست‌چین و لیست کنید</small>
//           </div>
          
//           <div className="add-form-group full-width">
//             <label>موقعیت روی نقشه *</label>
//             <div className="add-map-container">
//               <NeshanMap 
//                 mapKey={mapKey} 
//                 center={{ latitude: mapCenter.lat, longitude: mapCenter.lng }} 
//                 zoom={14} 
//                 defaultType="dreamy" 
//                 poi={true} 
//                 traffic={false} 
//                 style={{ height: '100%', width: '100%' }} 
//                 onInit={(map) => { 
//                   mapRef.current = map; 
//                   map.on('moveend', () => { 
//                     if (isSubmitting) return;
//                     const center = map.getView().getCenter(); 
//                     const wgs84 = webMercatorToWgs84(center[0], center[1]); 
//                     updateLocation(wgs84.lat, wgs84.lng); 
//                   }); 
//                   map.on('click', (e) => { 
//                     if (isSubmitting) return;
//                     const wgs84 = webMercatorToWgs84(e.coordinate[0], e.coordinate[1]); 
//                     updateLocation(wgs84.lat, wgs84.lng); 
//                   }); 
//                 }} 
//               />
//               <div className="add-map-marker-overlay">
//                 <div className="add-location-dot"></div>
//                 <div className="add-location-ripple"></div>
//               </div>
//             </div>
//             {locationSelected && (
//               <div className="add-map-success">
//                 <FaCheckCircle /> موقعیت ملک ثبت شد
//                 <span className="add-coords">📍 lat: {formData.lat.toFixed(6)} , lng: {formData.lng.toFixed(6)}</span>
//               </div>
//             )}
//             <div className="add-exact-location-toggle">
//               <label>
//                 <input 
//                   type="checkbox" 
//                   checked={formData.showExactLocation} 
//                   onChange={(e) => updateFormField('showExactLocation', e.target.checked)} 
//                   disabled={isSubmitting}
//                 /> 
//                 نمایش موقعیت دقیق ملک در صفحه جزئیات
//               </label>
//               <small>با فعال بودن این گزینه، موقعیت دقیق ملک روی نقشه نمایش داده می‌شود</small>
//             </div>
//           </div>
          
//           <div className="add-modal-actions">
//             <button 
//               type="submit" 
//               className="add-submit-btn" 
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <span className="loading-spinner-small" style={{ display: 'inline-block', marginLeft: '8px' }}></span>
//                   در حال ثبت...
//                 </>
//               ) : (
//                 '✅ ثبت ملک'
//               )}
//             </button>
//             <button 
//               type="button" 
//               className="add-cancel-btn" 
//               onClick={handleClose}
//               disabled={isSubmitting}
//             >
//               انصراف
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddPropertyModal;

import React, { useState, useEffect, useRef } from 'react';
import NeshanMap from "@neshan-maps-platform/react-openlayers";
import { panelService } from '../../../../services/panelService';
import "@neshan-maps-platform/react-openlayers/dist/style.css";
import LocationSelector from './LocationSelector';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './AddPropertyModal.css';

const wgs84ToWebMercator = (lng, lat) => {
  const R = 6378137;
  return {
    x: lng * (Math.PI * R) / 180,
    y: Math.log(Math.tan((90 + lat) * Math.PI / 360)) * R
  };
};

const webMercatorToWgs84 = (x, y) => {
  const R = 6378137;
  return {
    lat: (2 * Math.atan(Math.exp(y / R)) - Math.PI / 2) * 180 / Math.PI,
    lng: (x * 180) / (Math.PI * R)
  };
};

const formatNumberWithCommas = (value) => {
  if (!value) return '';
  const cleanValue = value.toString().replace(/[^\d]/g, '');
  if (!cleanValue) return '';
  return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const convertToPersianWords = (num) => {
  if (!num) return '';
  const number = parseInt(num.toString().replace(/,/g, ''));
  if (isNaN(number) || number === 0) return 'صفر تومان';
  
  const units = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
  const teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
  const tens = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
  const hundreds = ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
  const thousands = ['', 'هزار', 'میلیون', 'میلیارد'];

  const convertSection = (n) => {
    if (n === 0) return '';
    if (n < 10) return units[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) {
      const ten = Math.floor(n / 10);
      const unit = n % 10;
      return tens[ten] + (unit > 0 ? ' و ' + units[unit] : '');
    }
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    return hundreds[hundred] + (rest > 0 ? ' و ' + convertSection(rest) : '');
  };

  let result = '';
  let temp = number;
  let index = 0;
  
  while (temp > 0) {
    const section = temp % 1000;
    if (section !== 0) {
      const sectionText = convertSection(section);
      result = sectionText + (thousands[index] ? ' ' + thousands[index] : '') + (result ? ' ' + result : '');
    }
    temp = Math.floor(temp / 1000);
    index++;
  }
  
  return result + ' تومان';
};

const SearchableSelect = ({ options, value, onChange, placeholder, disabled }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.toString().includes(searchTerm)
  );

  const handleSelect = (option) => {
    onChange(option);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="searchable-select" ref={wrapperRef}>
      <div className="searchable-select-input" onClick={() => !disabled && setIsOpen(!isOpen)}>
        <input
          type="text"
          value={searchTerm || (value ? value.toString() : '')}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsOpen(true)}
        />
        <span className="dropdown-arrow">▼</span>
      </div>
      {isOpen && !disabled && (
        <div className="searchable-select-dropdown">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, idx) => (
              <div
                key={idx}
                className={`searchable-select-option ${value === option ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="searchable-select-no-results">نتیجه‌ای یافت نشد</div>
          )}
        </div>
      )}
    </div>
  );
};

const ImageStatusOverlay = ({ previewUrl, uploadStatus, uploadProgress }) => {
  const status = uploadStatus.get(previewUrl);
  const progress = uploadProgress.get(previewUrl) || 0;
  
  if (status === 'uploading') {
    return (
      <div className="image-upload-overlay">
        <div className="upload-spinner"></div>
        <span>{progress}%</span>
      </div>
    );
  }
  
  if (status === 'success') {
    return (
      <div className="image-upload-overlay success">
        <FaCheckCircle />
        <span>آپلود شد</span>
      </div>
    );
  }
  
  if (status === 'error') {
    return (
      <div className="image-upload-overlay error">
        <span>!</span>
        <span>خطا</span>
      </div>
    );
  }
  
  return null;
};

const AddPropertyModal = ({ isOpen, onClose, onSuccess }) => {
  const mapRef = useRef(null);
  const modalRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState('buy');
  const [saleTypes, setSaleTypes] = useState([]);
  const [rentTypes, setRentTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [availableAmenities, setAvailableAmenities] = useState([]);
  const [loadingAmenities, setLoadingAmenities] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [amenityInput, setAmenityInput] = useState('');
  const [amenitySuggestions, setAmenitySuggestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [constructionYear, setConstructionYear] = useState('');
  const [availableYears, setAvailableYears] = useState([]);
  
  // فیلدهای جدید
  const [isRenovated, setIsRenovated] = useState(false);
  const [documentType, setDocumentType] = useState(null); // 0: تک برگ, 1: منگوله دار, 2: قولنامه ای

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    area: '',
    address: '',
    rooms: 0,
    unitsPerFloor: 0,
    countFloor: 1,
    floor: 1,
    hasParking: false,
    hasElevator: false,
    hasLoan: false,
    description: '',
    lat: 35.699739,
    lng: 51.338097,
    showExactLocation: true,
    categoryTypeId: null,
    transactionTypeId: null,
  });
  
  const [rentalData, setRentalData] = useState({
    rentPrice: '',
    depositPrice: '',
    isMortgageOnly: false,
    contractDuration: 12,
  });
  
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(new Map());
  const [uploadProgress, setUploadProgress] = useState(new Map());
  const [uploadedCacheIds, setUploadedCacheIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationSelected, setLocationSelected] = useState(false);
  const [mapKey] = useState("web.31c5ea6c425e40cc9b30620a84a8be90");
  const [mapCenter, setMapCenter] = useState({ lat: 35.699739, lng: 51.338097 });
  const [displayPrice, setDisplayPrice] = useState('');
  const [locationInfo, setLocationInfo] = useState({
    city: '', cityId: null, cityLat: null, cityLng: null,
    region: '', regionId: null, neighborhood: '', neighborhoodId: null, fullAddress: ''
  });
  
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'clean'],
      [{ 'direction': 'rtl' }]
    ],
  };
  
  const quillFormats = ['header', 'bold', 'italic', 'underline', 'strike', 'align', 'list', 'bullet', 'link', 'direction'];
  
  const updateFormField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const persianCurrentYear = currentYear - 621;
    const years = [];
    for (let i = 1350; i <= persianCurrentYear; i++) {
      years.push(i);
    }
    return years.reverse();
  };

  useEffect(() => {
    setAvailableYears(generateYears());
  }, []);
  
  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    setDisplayPrice(formatNumberWithCommas(rawValue));
    setFormData(prev => ({ ...prev, price: rawValue }));
  };
  
  const updateLocation = (lat, lng) => {
    setFormData(prev => ({ ...prev, lat, lng }));
    setMapCenter({ lat, lng });
    setLocationSelected(true);
  };
  
  const uploadSingleImage = async (file, previewUrl) => {
    setUploadStatus(prev => new Map(prev).set(previewUrl, 'uploading'));
    setUploadProgress(prev => new Map(prev).set(previewUrl, 0));
    
    try {
      const result = await panelService.UploadTempImage(file, (progress) => {
        setUploadProgress(prev => new Map(prev).set(previewUrl, progress));
      });
      
      if (result && result.cacheId) {
        setUploadStatus(prev => new Map(prev).set(previewUrl, 'success'));
        setUploadProgress(prev => new Map(prev).set(previewUrl, 100));
        setUploadedCacheIds(prev => [...prev, { previewUrl, cacheId: result.cacheId }]);
        return result.cacheId;
      } else {
        throw new Error('cacheId دریافت نشد');
      }
    } catch (error) {
      console.error('خطا در آپلود تصویر:', error);
      setUploadStatus(prev => new Map(prev).set(previewUrl, 'error'));
      alert(`خطا در آپلود تصویر: ${error.message}`);
      return null;
    }
  };
  
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    
    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        alert(`حجم فایل ${file.name} بیشتر از 10 مگابایت است`);
        continue;
      }
      
      if (!file.type.startsWith('image/')) {
        alert(`فایل ${file.name} از نوع تصویر نیست`);
        continue;
      }
      
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const previewUrl = reader.result;
        setImagePreviews(prev => [...prev, previewUrl]);
        setImages(prev => [...prev, file]);
        await uploadSingleImage(file, previewUrl);
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = async (index) => {
    const removedPreview = imagePreviews[index];
    const cacheItem = uploadedCacheIds.find(item => item.previewUrl === removedPreview);
 
    if (cacheItem && cacheItem.cacheId) {
      await panelService.clearTempImageFromCache(cacheItem.cacheId);
    }
    
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setUploadedCacheIds(prev => prev.filter((_, i) => i !== index));
    setUploadStatus(prev => {
      const newMap = new Map(prev);
      newMap.delete(removedPreview);
      return newMap;
    });
    setUploadProgress(prev => {
      const newMap = new Map(prev);
      newMap.delete(removedPreview);
      return newMap;
    });
  };
  
  const fetchTransactionTypes = async () => {
    setLoadingTypes(true);
    try {
      const token = localStorage.getItem('auth_token');
      const buyResponse = await fetch('https://localhost:7178/api/RealEstatePage/GetCategoryDtos?tabId=1', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      const buyResult = await buyResponse.json();
      
      const rentResponse = await fetch('https://localhost:7178/api/RealEstatePage/GetCategoryDtos?tabId=2', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      const rentResult = await rentResponse.json();
      
      if (buyResult.status === 200 && buyResult.data) {
        setSaleTypes(buyResult.data.map(item => ({ id: item.id, name: item.title || item.name, icon: item.icon || '💰', description: item.description || 'ثبت ملک برای فروش', categoryTypeId: 1 })));
      } else {
        setSaleTypes([{ id: 1, name: 'فروش نقدی', icon: '💰', description: 'ثبت ملک برای فروش نقدی', categoryTypeId: 1 }]);
      }
      
      if (rentResult.status === 200 && rentResult.data) {
        setRentTypes(rentResult.data.map(item => ({ id: item.id, name: item.title || item.name, icon: item.icon || '📝', description: item.description || 'ثبت ملک برای رهن و اجاره', categoryTypeId: 2 })));
      } else {
        setRentTypes([{ id: 3, name: 'رهن کامل', icon: '🔑', description: 'ثبت ملک با رهن کامل', categoryTypeId: 2 }]);
      }
    } catch (error) {
      console.error('خطا در دریافت انواع معامله:', error);
    } finally {
      setLoadingTypes(false);
    }
  };
  
  const fetchAmenities = async (transactionTypeId) => {
    if (!transactionTypeId) return;
    setLoadingAmenities(true);
    try {
      const response = await panelService.GetFacilities(transactionTypeId);
      if (response.status === 200 && response.data && response.data.length > 0) {
        const amenitiesWithId = response.data.map(item => ({
          id: item.id,
          name: item.name || item.title
        }));
        setAvailableAmenities(amenitiesWithId);
        setSelectedAmenities([]);
      } else {
        setAvailableAmenities([]);
      }
    } catch (error) {
      console.error('خطا در دریافت امکانات رفاهی:', error);
      setAvailableAmenities([]);
    } finally {
      setLoadingAmenities(false);
    }
  };
  
  const handleAmenitySearch = (searchText) => {
    setAmenityInput(searchText);
    if (searchText.trim() && availableAmenities.length > 0) {
      const filtered = availableAmenities.filter(amenity => 
        amenity.name?.toLowerCase().includes(searchText.toLowerCase())
      );
      setAmenitySuggestions(filtered.slice(0, 8));
    } else {
      setAmenitySuggestions([]);
    }
  };
  
  const addAmenity = (amenity) => {
    const amenityObj = typeof amenity === 'object' ? amenity : availableAmenities.find(a => a.name === amenity);
    
    if (!amenityObj || !amenityObj.id) {
      alert('این ویژگی در لیست موجود نیست!');
      return;
    }
    
    if (!selectedAmenities.some(a => a.id === amenityObj.id)) {
      setSelectedAmenities([...selectedAmenities, amenityObj]);
    }
    
    setAmenityInput('');
    setAmenitySuggestions([]);
  };
  
  const removeAmenity = (amenityToRemove) => {
    setSelectedAmenities(selectedAmenities.filter(a => a.id !== amenityToRemove.id));
  };
  
  const handleLocationSelect = (locationData) => {
    setLocationInfo(locationData || {
      city: '', cityId: null, cityLat: null, cityLng: null,
      region: '', regionId: null, neighborhood: '', neighborhoodId: null, fullAddress: ''
    });
    
    if (locationData) {
      const finalLat = locationData.neighborhoodLat || locationData.regionLat || locationData.cityLat;
      const finalLng = locationData.neighborhoodLng || locationData.regionLng || locationData.cityLng;
      
      setFormData(prev => ({
        ...prev,
        address: locationData.fullAddress || prev.address,
        lat: finalLat || prev.lat,
        lng: finalLng || prev.lng
      }));
      
      if (finalLat && finalLng) {
        setMapCenter({ lat: finalLat, lng: finalLng });
        setLocationSelected(true);
        setTimeout(() => {
          if (mapRef.current?.getView()) {
            const view = mapRef.current.getView();
            const webMercatorCoords = wgs84ToWebMercator(finalLng, finalLat);
            view.setCenter([webMercatorCoords.x, webMercatorCoords.y]);
          }
        }, 100);
      }
    }
  };
  
  const validateForm = () => {
    if (!formData.title.trim()) {
      alert('لطفاً عنوان ملک را وارد کنید');
      return false;
    }
    
    if (activeTab === 'buy' && (!formData.price || parseInt(formData.price) === 0)) {
      alert('لطفاً قیمت فروش را وارد کنید');
      return false;
    }
    
    if (!formData.area || parseInt(formData.area) === 0) {
      alert('لطفاً متراژ ملک را وارد کنید');
      return false;
    }
    
    if (!locationSelected) {
      alert('لطفاً موقعیت ملک را روی نقشه انتخاب کنید');
      return false;
    }
    
    if (!selectedTransaction) {
      alert('لطفاً نوع معامله را انتخاب کنید');
      return false;
    }
    
    if (documentType === null) {
      alert('لطفاً نوع سند را انتخاب کنید');
      return false;
    }
    
    const hasUploading = Array.from(uploadStatus.values()).some(status => status === 'uploading');
    if (hasUploading) {
      alert('لطفاً منتظر بمانید تا تصاویر آپلود شوند...');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setLoading(true);
    
    try {
      let finalPrice = 0;
      if (activeTab === 'buy') {
        finalPrice = parseInt(formData.price) * 10000;
      } else {
        finalPrice = parseInt(rentalData.rentPrice) * 10000 || 0;
      }
      
      const cacheIdsOnly = uploadedCacheIds.map(item => item.cacheId);
      
      const facilitiesForApi = selectedAmenities.map(amenity => ({
        id: amenity.id
      }));
      
      const submitData = {
        title: formData.title,
        region: locationInfo.regionId || 0,
        sqmeter: parseInt(formData.area),
        countFloor: parseInt(formData.countFloor) || 1,
        countInFloor: parseInt(formData.unitsPerFloor) || 0,
        floor: parseInt(formData.floor) || 1,
        countRoom: parseInt(formData.rooms) || 0,
        isHasElevator: formData.hasElevator,
        isHasStoreRoom: false,
        isHasParking: formData.hasParking,
        isHaLoan: formData.hasLoan,
        lat: formData.lat,
        lon: formData.lng,
        address: formData.address,
        descriptionRows: formData.description,
        facilities: facilitiesForApi,
        showExactLocation: formData.showExactLocation,
        categoryTypeId: formData.categoryTypeId,
        price: finalPrice,
        rentPrice: activeTab === 'rent' ? (parseInt(rentalData.rentPrice) * 10000 || 0) : 0,
        depositPrice: activeTab === 'rent' ? (parseInt(rentalData.depositPrice) * 10000 || 0) : 0,
        isMortgageOnly: activeTab === 'rent' ? rentalData.isMortgageOnly : false,
        contractDuration: constructionYear,
        tempImageCacheIds: cacheIdsOnly,
        isRenovated: isRenovated,
        documentType: documentType
      };
      
      const response = await fetch('https://localhost:7178/api/RealEstatePage/InsertRealEstate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
      
      const result = await response.json();
      
      if (result.status === 200) {
        if (onSuccess) onSuccess();
        handleClose();
      } else {
        throw new Error(result.message || 'خطا در ثبت ملک');
      }
    } catch (error) {
      console.error('Error adding property:', error);
      alert(error.message || 'خطا در ثبت ملک');
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };
  
  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };
  
  const resetForm = () => {
    setFormData({
      title: '', price: '', area: '', address: '', rooms: 0, unitsPerFloor: 0,
      countFloor: 1, floor: 1, hasParking: false, hasElevator: false, hasLoan: false,
      description: '', lat: 35.699739, lng: 51.338097, showExactLocation: true,
      categoryTypeId: null, transactionTypeId: null,
    });
    setRentalData({ rentPrice: '', depositPrice: '', isMortgageOnly: false, contractDuration: 12 });
    setImages([]);
    setImagePreviews([]);
    setUploadedCacheIds([]);
    setUploadStatus(new Map());
    setUploadProgress(new Map());
    setLocationSelected(false);
    setMapCenter({ lat: 35.699739, lng: 51.338097 });
    setSelectedAmenities([]);
    setAmenityInput('');
    setAmenitySuggestions([]);
    setSelectedTransaction(null);
    setAvailableAmenities([]);
    setDisplayPrice('');
    setConstructionYear('');
    setIsRenovated(false);
    setDocumentType(null);
    setLocationInfo({
      city: '', cityId: null, cityLat: null, cityLng: null,
      region: '', regionId: null, neighborhood: '', neighborhoodId: null, fullAddress: ''
    });
  };
  
  useEffect(() => {
    if (isOpen) {
      fetchTransactionTypes();
    } else {
      setActiveTab('buy');
      setSelectedTransaction(null);
      resetForm();
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (selectedTransaction?.id) {
      fetchAmenities(selectedTransaction.id);
    }
  }, [selectedTransaction]);
  
  const TabSkeleton = () => (
    <div className="tab-skeleton">
      <div className="skeleton-tab-header">
        <div className="skeleton-tab"></div>
        <div className="skeleton-tab"></div>
      </div>
      <div className="skeleton-form">
        <div className="skeleton-field"><div className="skeleton-label"></div><div className="skeleton-input"></div></div>
        <div className="skeleton-row"><div className="skeleton-field"><div className="skeleton-label"></div><div className="skeleton-input"></div></div><div className="skeleton-field"><div className="skeleton-label"></div><div className="skeleton-input"></div></div></div>
        <div className="skeleton-field"><div className="skeleton-label"></div><div className="skeleton-map"></div></div>
        <div className="skeleton-actions"></div>
      </div>
    </div>
  );
  
  const renderAmenitiesSection = () => {
    if (loadingAmenities) {
      return (
        <div className="add-form-group full-width">
          <label>🏢 امکانات رفاهی</label>
          <div className="amenities-loading"><div className="loading-spinner-small"></div><span>در حال بارگذاری امکانات...</span></div>
        </div>
      );
    }
    
    if (!availableAmenities?.length) {
      return (
        <div className="add-form-group full-width">
          <label>🏢 امکانات رفاهی</label>
          <div className="no-amenities-info"><FaInfoCircle /><span>امکانات رفاهی برای این نوع معامله تعریف نشده است</span></div>
        </div>
      );
    }
    
    const filteredAmenities = amenityInput.trim() 
      ? availableAmenities.filter(a => a.name.toLowerCase().includes(amenityInput.toLowerCase())) 
      : availableAmenities;
    
    return (
      <div className="add-form-group full-width">
        <label>🏢 امکانات رفاهی</label>
        <div className="amenities-multiselect">
          <div className="amenities-search-container">
            <input 
              type="text" 
              value={amenityInput} 
              onChange={(e) => handleAmenitySearch(e.target.value)} 
              placeholder="جستجو: پارکینگ، انباری، بالکن، ..." 
              className="amenities-input" 
              autoComplete="off" 
            />
            {amenityInput && (
              <button type="button" className="clear-search-btn" onClick={() => { setAmenityInput(''); setAmenitySuggestions([]); }}>
                ✕
              </button>
            )}
          </div>
          
          {amenitySuggestions.length > 0 && (
            <div className="amenities-suggestions">
              {amenitySuggestions.map((suggestion, idx) => (
                <div key={idx} className="suggestion-item" onClick={() => addAmenity(suggestion)}>
                  <span className="suggestion-name">{suggestion.name}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="selected-amenities">
            {selectedAmenities.length === 0 ? (
              <div className="no-amenities"><FaInfoCircle /> هنوز امکاناتی انتخاب نشده است</div>
            ) : (
              selectedAmenities.map((amenity, idx) => (
                <div key={idx} className="amenity-tag">
                  <span>{amenity.name}</span>
                  <button type="button" onClick={() => removeAmenity(amenity)} className="remove-amenity">×</button>
                </div>
              ))
            )}
          </div>
          
          <div className="popular-amenities">
            <div className="popular-title">
              📋 {amenityInput ? `نتایج جستجو برای "${amenityInput}":` : 'تمام امکانات موجود:'}
              <span className="result-count">({filteredAmenities.length} مورد)</span>
            </div>
            <div className="popular-list">
              {filteredAmenities.length > 0 ? 
                filteredAmenities.map((amenity, idx) => (
                  <button 
                    key={idx} 
                    type="button" 
                    onClick={() => addAmenity(amenity)} 
                    disabled={selectedAmenities.some(a => a.id === amenity.id)} 
                    className={`popular-amenity-btn ${selectedAmenities.some(a => a.id === amenity.id) ? 'disabled' : ''}`}
                  >
                    {amenity.name}
                  </button>
                )) : (
                  <div className="no-search-results">
                    <FaInfoCircle /><span>نتیجه‌ای برای "{amenityInput}" یافت نشد</span>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  if (!isOpen) return null;
  
  if (!selectedTransaction) {
    return (
      <div className="add-modal-overlay">
        <div className="add-modal-container" ref={modalRef}>
          <div className="add-modal-header">
            <h3>🏠 ثبت ملک جدید</h3>
            <button className="add-modal-close" onClick={handleClose}>✕</button>
          </div>
          {loadingTypes ? <TabSkeleton /> : (
            <div className="transaction-tabs-container">
              <div className="transaction-tabs-header">
                <button 
                  className={`transaction-tab ${activeTab === 'buy' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('buy')}
                >
                  <span className="tab-icon">💰</span>
                  <span className="tab-title">خرید</span>
                  <span className="tab-badge">{saleTypes?.length || 0}</span>
                </button>
                <button 
                  className={`transaction-tab ${activeTab === 'rent' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('rent')}
                >
                  <span className="tab-icon">📝</span>
                  <span className="tab-title">رهن و اجاره</span>
                  <span className="tab-badge">{rentTypes?.length || 0}</span>
                </button>
              </div>
              <div className="transaction-tabs-content">
                <div className="transaction-type-grid">
                  {(activeTab === 'buy' ? saleTypes : rentTypes)?.map((type, idx) => (
                    <button 
                      key={idx} 
                      className={`transaction-type-card ${activeTab === 'buy' ? 'sale-card' : 'rent-card'}`} 
                      onClick={() => { 
                        setSelectedTransaction(type); 
                        setFormData(prev => ({ ...prev, categoryTypeId: activeTab === 'buy' ? 1 : 2, transactionTypeId: type.id })); 
                      }}
                    >
                      <div className="card-icon">{type.icon || (activeTab === 'buy' ? '💰' : '📝')}</div>
                      <div className="card-title">{type.name}</div>
                      <div className="card-desc">{type.description || (activeTab === 'buy' ? 'ثبت ملک برای فروش' : 'ثبت ملک برای رهن و اجاره')}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="add-modal-overlay">
      <div className="add-modal-container" ref={modalRef}>
        <div className="add-modal-header">
          <h3>
            {activeTab === 'buy' ? '💰 ثبت ملک برای فروش' : '📝 ثبت ملک برای اجاره'}
            <span className="transaction-badge" style={{ background: activeTab === 'buy' ? '#10b981' : '#3b82f6' }}>
              {selectedTransaction?.name || (activeTab === 'buy' ? 'فروش' : 'اجاره')}
            </span>
            <button 
              type="button" 
              className="change-transaction-btn" 
              onClick={() => setSelectedTransaction(null)}
            >
              تغییر نوع معامله
            </button>
          </h3>
          <button className="add-modal-close" onClick={handleClose}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="add-modal-form">
          <div className="add-form-row">
            <div className="add-form-group full-width">
              <label>عنوان ملک *</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={(e) => updateFormField('title', e.target.value)} 
                placeholder="مثال: آپارتمان لوکس در مرکز شهر" 
                required 
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div className="add-form-group full-width">
            <label>📍 موقعیت مکانی *</label>
            <LocationSelector onLocationSelect={handleLocationSelect} initialLocation={locationInfo} disabled={isSubmitting} />
          </div>
          
          <div className="add-form-row">
            {activeTab === 'buy' ? (
              <div className="add-form-group">
                <label>قیمت فروش (میلیون تومان) *</label>
                <input 
                  type="text" 
                  value={displayPrice} 
                  onChange={handlePriceChange} 
                  placeholder="مثال: ۱,۵۰۰" 
                  required 
                  disabled={isSubmitting}
                />
                {formData.price && (
                  <div className="price-in-words">
                    <span className="price-words-icon">🔊</span>
                    <span>{convertToPersianWords(formData.price)}</span>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="add-form-group">
                  <label>ودیعه (رهن) - تومان</label>
                  <input 
                    type="text" 
                    value={rentalData.depositPrice} 
                    onChange={(e) => setRentalData({...rentalData, depositPrice: e.target.value.replace(/[^\d]/g, '')})} 
                    placeholder="مثال: 50000000" 
                    disabled={isSubmitting}
                  />
                  <small>مبلغ ودیعه به تومان</small>
                </div>
                <div className="add-form-group">
                  <label>اجاره ماهانه - تومان *</label>
                  <input 
                    type="text" 
                    value={rentalData.rentPrice} 
                    onChange={(e) => setRentalData({...rentalData, rentPrice: e.target.value.replace(/[^\d]/g, '')})} 
                    placeholder="مثال: 2000000" 
                    required 
                    disabled={isSubmitting}
                  />
                  <small>قیمت اجاره ماهانه به تومان</small>
                </div>
              </>
            )}
            <div className="add-form-group">
              <label>متراژ (متر مربع) *</label>
              <input 
                type="number" 
                value={formData.area} 
                onChange={(e) => updateFormField('area', e.target.value)} 
                placeholder="مثال: 120" 
                required 
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          {activeTab === 'rent' && (
            <div className="add-form-group full-width">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={rentalData.isMortgageOnly} 
                  onChange={(e) => setRentalData({...rentalData, isMortgageOnly: e.target.checked})} 
                  disabled={isSubmitting}
                /> 
                فقط رهن (بدون اجاره ماهانه)
              </label>
            </div>
          )}
          
          <div className="add-form-row">
            <div className="add-form-group">
              <label>🏗️ سال ساخت</label>
              <SearchableSelect
                options={availableYears}
                value={constructionYear}
                onChange={(year) => setConstructionYear(year)}
                placeholder="انتخاب سال ساخت..."
                disabled={isSubmitting}
              />
              <small>سال ساخت ملک (از 1350 تاکنون)</small>
            </div>
            <div className="add-form-group">
              <label>🔨 وضعیت بازسازی</label>
              <div className="renovation-radio-group">
                <label className={`renovation-radio ${!isRenovated ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="renovation"
                    checked={!isRenovated}
                    onChange={() => setIsRenovated(false)}
                    disabled={isSubmitting}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">❌ بازسازی نشده</span>
                </label>
                <label className={`renovation-radio ${isRenovated ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="renovation"
                    checked={isRenovated}
                    onChange={() => setIsRenovated(true)}
                    disabled={isSubmitting}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">✅ بازسازی شده</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="add-form-group full-width">
            <label>📄 نوع سند *</label>
            <div className="document-type-group">
              <button
                type="button"
                className={`document-type-btn ${documentType === 0 ? 'active' : ''}`}
                onClick={() => setDocumentType(0)}
                disabled={isSubmitting}
              >
                <span className="doc-icon">📄</span>
                <span className="doc-title">تک برگ</span>
                <span className="doc-desc">سند رسمی تک برگ</span>
              </button>
              <button
                type="button"
                className={`document-type-btn ${documentType === 1 ? 'active' : ''}`}
                onClick={() => setDocumentType(1)}
                disabled={isSubmitting}
              >
                <span className="doc-icon">📜</span>
                <span className="doc-title">منگوله دار</span>
                <span className="doc-desc">سند قدیمی منگوله دار</span>
              </button>
              <button
                type="button"
                className={`document-type-btn ${documentType === 2 ? 'active' : ''}`}
                onClick={() => setDocumentType(2)}
                disabled={isSubmitting}
              >
                <span className="doc-icon">✍️</span>
                <span className="doc-title">قولنامه ای</span>
                <span className="doc-desc">سند عادی قولنامه ای</span>
              </button>
            </div>
          </div>
          
          <div className="add-form-row">
            <div className="add-form-group">
              <label>تعداد اتاق</label>
              <input 
                type="number" 
                value={formData.rooms} 
                onChange={(e) => updateFormField('rooms', e.target.value)} 
                min="0" 
                max="10" 
                disabled={isSubmitting}
              />
            </div>
            <div className="add-form-group">
              <label>تعداد واحد در طبقه 🏢</label>
              <input 
                type="number" 
                value={formData.unitsPerFloor} 
                onChange={(e) => updateFormField('unitsPerFloor', e.target.value)} 
                min="0" 
                max="20" 
                placeholder="مثال: 2" 
                disabled={isSubmitting}
              />
              <small>تعداد واحدهای مسکونی در این طبقه</small>
            </div>
          </div>
          
          <div className="add-form-row">
            <div className="add-form-group">
              <label>تعداد طبقات ساختمان</label>
              <input 
                type="number" 
                value={formData.countFloor} 
                onChange={(e) => updateFormField('countFloor', e.target.value)} 
                min="1" 
                max="20" 
                disabled={isSubmitting}
              />
            </div>
            <div className="add-form-group">
              <label>طبقه واحد</label>
              <input 
                type="number" 
                value={formData.floor} 
                onChange={(e) => updateFormField('floor', e.target.value)} 
                min="1" 
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div className="add-form-group full-width">
            <label>آدرس دقیق</label>
            <textarea 
              value={formData.address} 
              onChange={(e) => updateFormField('address', e.target.value)} 
              placeholder="آدرس کامل ملک" 
              rows="2" 
              disabled={isSubmitting}
            />
          </div>
          
          <div className="add-form-row">
            <div className="add-form-group">
              <label><FaInfoCircle style={{ marginLeft: '4px' }} /> عرض جغرافیایی (Latitude)</label>
              <input 
                type="number" 
                step="0.000001" 
                value={formData.lat} 
                onChange={(e) => updateLocation(parseFloat(e.target.value), formData.lng)} 
                className="coord-input" 
                disabled={isSubmitting}
              />
              <small>با جابجایی نشانگر روی نقشه خودکار پر می‌شود</small>
            </div>
            <div className="add-form-group">
              <label><FaInfoCircle style={{ marginLeft: '4px' }} /> طول جغرافیایی (Longitude)</label>
              <input 
                type="number" 
                step="0.000001" 
                value={formData.lng} 
                onChange={(e) => updateLocation(formData.lat, parseFloat(e.target.value))} 
                className="coord-input" 
                disabled={isSubmitting}
              />
              <small>با جابجایی نشانگر روی نقشه خودکار پر می‌شود</small>
            </div>
          </div>
          
          <div className="add-form-group full-width">
            <label>امکانات پایه</label>
            <div className="add-checkbox-group">
              <label>
                <input 
                  type="checkbox" 
                  checked={formData.hasParking} 
                  onChange={(e) => updateFormField('hasParking', e.target.checked)} 
                  disabled={isSubmitting}
                /> 
                🚗 پارکینگ
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={formData.hasElevator} 
                  onChange={(e) => updateFormField('hasElevator', e.target.checked)} 
                  disabled={isSubmitting}
                /> 
                🛗 آسانسور
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={formData.hasLoan} 
                  onChange={(e) => updateFormField('hasLoan', e.target.checked)} 
                  disabled={isSubmitting}
                /> 
                🏦 تسهیلات بانکی
              </label>
            </div>
          </div>
          
          {renderAmenitiesSection()}
          
          <div className="add-form-group full-width">
            <label>تصاویر ملک (حداکثر 10 مگابایت هر تصویر)</label>
            <div className="add-image-upload-area">
              <input 
                type="file" 
                accept="image/*" 
                multiple 
                onChange={handleImageChange} 
                id="add-image-upload" 
                style={{ display: 'none' }} 
                disabled={isSubmitting} 
              />
              <label htmlFor="add-image-upload" className="add-upload-label">
                📸 انتخاب تصاویر
              </label>
              <div className="add-image-previews">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="add-image-preview">
                    <img src={preview} alt={`پیش‌نمایش ${index + 1}`} />
                    <ImageStatusOverlay 
                      previewUrl={preview} 
                      uploadStatus={uploadStatus} 
                      uploadProgress={uploadProgress} 
                    />
                    <button 
                      type="button" 
                      onClick={() => removeImage(index)} 
                      className="remove-image-btn" 
                      disabled={uploadStatus.get(preview) === 'uploading' || isSubmitting}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <small>✅ تصاویر به صورت خودکار آپلود می‌شوند. پس از آپلود موفق، هاله سبز نمایش داده می‌شود.</small>
          </div>
          
          <div className="add-form-group full-width">
            <label>توضیحات تکمیلی</label>
            <div className="rich-editor-wrapper">
              <ReactQuill 
                theme="snow" 
                value={formData.description} 
                onChange={(value) => updateFormField('description', value)} 
                modules={quillModules} 
                formats={quillFormats} 
                placeholder="توضیحات بیشتر درباره ملک... (قابل راست‌چین، بولت، لیست و ...)" 
                className="rtl-quill" 
                readOnly={isSubmitting}
              />
            </div>
            <small>✨ می‌توانید متن را بولت، ایتالیک، راست‌چین و لیست کنید</small>
          </div>
          
          <div className="add-form-group full-width">
            <label>موقعیت روی نقشه *</label>
            <div className="add-map-container">
              <NeshanMap 
                mapKey={mapKey} 
                center={{ latitude: mapCenter.lat, longitude: mapCenter.lng }} 
                zoom={14} 
                defaultType="dreamy" 
                poi={true} 
                traffic={false} 
                style={{ height: '100%', width: '100%' }} 
                onInit={(map) => { 
                  mapRef.current = map; 
                  map.on('moveend', () => { 
                    if (isSubmitting) return;
                    const center = map.getView().getCenter(); 
                    const wgs84 = webMercatorToWgs84(center[0], center[1]); 
                    updateLocation(wgs84.lat, wgs84.lng); 
                  }); 
                  map.on('click', (e) => { 
                    if (isSubmitting) return;
                    const wgs84 = webMercatorToWgs84(e.coordinate[0], e.coordinate[1]); 
                    updateLocation(wgs84.lat, wgs84.lng); 
                  }); 
                }} 
              />
              <div className="add-map-marker-overlay">
                <div className="add-location-dot"></div>
                <div className="add-location-ripple"></div>
              </div>
            </div>
            {locationSelected && (
              <div className="add-map-success">
                <FaCheckCircle /> موقعیت ملک ثبت شد
                <span className="add-coords">📍 lat: {formData.lat.toFixed(6)} , lng: {formData.lng.toFixed(6)}</span>
              </div>
            )}
            <div className="add-exact-location-toggle">
              <label>
                <input 
                  type="checkbox" 
                  checked={formData.showExactLocation} 
                  onChange={(e) => updateFormField('showExactLocation', e.target.checked)} 
                  disabled={isSubmitting}
                /> 
                نمایش موقعیت دقیق ملک در صفحه جزئیات
              </label>
              <small>با فعال بودن این گزینه، موقعیت دقیق ملک روی نقشه نمایش داده می‌شود</small>
            </div>
          </div>
          
          <div className="add-modal-actions">
            <button 
              type="submit" 
              className="add-submit-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner-small" style={{ display: 'inline-block', marginLeft: '8px' }}></span>
                  در حال ثبت...
                </>
              ) : (
                '✅ ثبت ملک'
              )}
            </button>
            <button 
              type="button" 
              className="add-cancel-btn" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyModal;