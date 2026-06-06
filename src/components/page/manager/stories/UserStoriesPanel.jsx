// // // UserStoriesPanel.js
// // import React, { useState, useEffect, useCallback } from 'react';
// // import { panelService } from '../../../../services/panelService';
// // import './UserStoriesPanel.css';

// // const UserStoriesPanel = () => {
// //     const [stories, setStories] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [showAddModal, setShowAddModal] = useState(false);
// //     const [selectedRealEstate, setSelectedRealEstate] = useState('');
// //     const [storyText, setStoryText] = useState('');
// //     const [storyImage, setStoryImage] = useState(null);
// //     const [storyImagePreview, setStoryImagePreview] = useState(null);
// //     const [uploading, setUploading] = useState(false);
// //     const [toast, setToast] = useState(null);
// //     const [properties, setProperties] = useState([]);

// //     const showToast = (message, type = 'success') => {
// //         setToast({ message, type });
// //         setTimeout(() => setToast(null), 3000);
// //     };

// //     const fetchStories = useCallback(async () => {
// //         setLoading(true);
// //         try {
// //             const data = await panelService.GetStories();
// //             setStories(data || []);
// //         } catch (error) {
// //             console.error('Error fetching stories:', error);
// //             showToast('خطا در دریافت استوری‌ها', 'error');
// //         } finally {
// //             setLoading(false);
// //         }
// //     }, []);

// //     const fetchProperties = useCallback(async () => {
// //         try {
// //             const data = await panelService.GetRealEstatePanel();
// //             if (data && Array.isArray(data)) {
// //                 const activeProperties = data.filter(p => p.status === 'منتشر شد' || p.status === 'فعال');
// //                 setProperties(activeProperties);
// //             }
// //         } catch (error) {
// //             console.error('Error fetching properties:', error);
// //         }
// //     }, []);

// //     useEffect(() => {
// //         fetchStories();
// //         fetchProperties();
// //     }, [fetchStories, fetchProperties]);

// //     const handleImageSelect = (e) => {
// //         const file = e.target.files[0];
// //         if (file) {
// //             if (file.size > 5 * 1024 * 1024) {
// //                 showToast('حجم عکس نباید بیشتر از 5 مگابایت باشد', 'error');
// //                 return;
// //             }
// //             if (!file.type.startsWith('image/')) {
// //                 showToast('فایل انتخابی باید عکس باشد', 'error');
// //                 return;
// //             }
// //             setStoryImage(file);
// //             setStoryImagePreview(URL.createObjectURL(file));
// //         }
// //     };

// //     const handleSubmitStory = async (e) => {
// //         e.preventDefault();
        
// //         if (!storyText && !storyImage && !selectedRealEstate) {
// //             showToast('لطفاً حداقل متن، عکس یا ملک را وارد کنید', 'error');
// //             return;
// //         }

// //         setUploading(true);

// //         try {
// //             let uploadedImagePath = null;
            
// //             // آپلود عکس اگر انتخاب شده باشد
// //             if (storyImage) {
// //                 uploadedImagePath = await panelService.UploadStoryImage(storyImage);
// //             }

// //             // ساخت داده استوری
// //             const storyData = {
// //                 title: storyText || null,
// //                 realEstateId: selectedRealEstate || null,
// //                 imagePath: uploadedImagePath || null
// //             };

// //             await panelService.InsertStory(storyData);
            
// //             showToast('استوری با موفقیت ثبت شد', 'success');
            
// //             // ریست فرم
// //             setStoryText('');
// //             setStoryImage(null);
// //             setStoryImagePreview(null);
// //             setSelectedRealEstate('');
// //             setShowAddModal(false);
            
// //             // بروزرسانی لیست استوری‌ها
// //             fetchStories();
            
// //         } catch (error) {
// //             console.error('Error inserting story:', error);
// //             showToast('خطا در ثبت استوری', 'error');
// //         } finally {
// //             setUploading(false);
// //         }
// //     };

// //     const handleDeleteStory = async (storyId) => {
// //         if (!window.confirm('آیا از حذف این استوری مطمئن هستید؟')) return;
        
// //         try {
// //             await panelService.DeleteStory(storyId);
// //             showToast('استوری با موفقیت حذف شد', 'success');
// //             fetchStories();
// //         } catch (error) {
// //             console.error('Error deleting story:', error);
// //             showToast('خطا در حذف استوری', 'error');
// //         }
// //     };

// //     const getStoryTypeLabel = (story) => {
// //         if (story.isRealEstate) {
// //             return { text: 'ملک', icon: '🏠', class: 'story-property' };
// //         } else if (story.title) {
// //             return { text: 'متن', icon: '📝', class: 'story-text' };
// //         } else if (story.urlImage) {
// //             return { text: 'تصویر', icon: '🖼️', class: 'story-image' };
// //         }
// //         return { text: 'متفرقه', icon: '📌', class: 'story-other' };
// //     };

// //     return (
// //         <div className="user-stories-panel">
// //             {toast && (
// //                 <div className={`stories-toast ${toast.type}`}>
// //                     {toast.message}
// //                 </div>
// //             )}

// //             <div className="stories-header">
// //                 <div>
// //                     <h2>📸 استوری‌های من</h2>
// //                     <p className="stories-subtitle">مدیریت استوری‌های ثبت شده</p>
// //                 </div>
// //                 <button className="stories-add-btn" onClick={() => setShowAddModal(true)}>
// //                     + ثبت استوری جدید
// //                 </button>
// //             </div>

// //             {loading ? (
// //                 <div className="stories-loading">
// //                     <div className="stories-spinner"></div>
// //                     <p>در حال بارگذاری...</p>
// //                 </div>
// //             ) : stories.length === 0 ? (
// //                 <div className="stories-empty">
// //                     <div className="stories-empty-icon">📸</div>
// //                     <h4>هیچ استوری ثبت نشده است</h4>
// //                     <p>اولین استوری خود را ثبت کنید</p>
// //                     <button onClick={() => setShowAddModal(true)}>ثبت استوری جدید</button>
// //                 </div>
// //             ) : (
// //                 <div className="stories-grid">
// //                     {stories.map((story) => {
// //                         const typeInfo = getStoryTypeLabel(story);
// //                         return (
// //                             <div key={story.id} className={`story-card ${typeInfo.class}`}>
// //                                 <button 
// //                                     className="story-delete"
// //                                     onClick={() => handleDeleteStory(story.id)}
// //                                     title="حذف استوری"
// //                                 >
// //                                     ✕
// //                                 </button>
                                
// //                                 <div className="story-type-badge">
// //                                     {typeInfo.icon} {typeInfo.text}
// //                                 </div>
                                
// //                                 {story.urlImage && (
// //                                     <div className="story-image-container">
// //                                         <img 
// //                                             src={`https://localhost:7178${story.urlImage}`} 
// //                                             alt="Story" 
// //                                             className="story-image-display"
// //                                         />
// //                                     </div>
// //                                 )}
                                
// //                                 {story.title && (
// //                                     <div className="story-text-content">
// //                                         <p>{story.title}</p>
// //                                     </div>
// //                                 )}
                                
// //                                 {story.isRealEstate && story.titleReal && (
// //                                     <div className="story-realestate-content">
// //                                         <div className="story-realestate-image">
// //                                             <img 
// //                                                 src={`https://localhost:7178${story.imgReal}`} 
// //                                                 alt={story.titleReal}
// //                                             />
// //                                         </div>
// //                                         <div className="story-realestate-info">
// //                                             <h4>{story.titleReal}</h4>
// //                                             <a href={story.linkReal} target="_blank" rel="noopener noreferrer">
// //                                                 مشاهده ملک →
// //                                             </a>
// //                                         </div>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         );
// //                     })}
// //                 </div>
// //             )}

// //             {/* مودال افزودن استوری */}
// //             {showAddModal && (
// //                 <div className="stories-modal-overlay" onClick={() => setShowAddModal(false)}>
// //                     <div className="stories-modal" onClick={(e) => e.stopPropagation()}>
// //                         <div className="stories-modal-header">
// //                             <h3>📸 ثبت استوری جدید</h3>
// //                             <button onClick={() => setShowAddModal(false)}>✕</button>
// //                         </div>
                        
// //                         <form onSubmit={handleSubmitStory}>
// //                             <div className="stories-form-group">
// //                                 <label>متن استوری (اختیاری)</label>
// //                                 <textarea
// //                                     value={storyText}
// //                                     onChange={(e) => setStoryText(e.target.value)}
// //                                     placeholder="متن استوری خود را وارد کنید..."
// //                                     rows="3"
// //                                 />
// //                             </div>
                            
// //                             <div className="stories-form-group">
// //                                 <label>انتخاب ملک (اختیاری)</label>
// //                                 <select
// //                                     value={selectedRealEstate}
// //                                     onChange={(e) => setSelectedRealEstate(e.target.value)}
// //                                 >
// //                                     <option value="">بدون ملک</option>
// //                                     {properties.map(property => (
// //                                         <option key={property.id} value={property.id}>
// //                                             {property.title} - {property.region}
// //                                         </option>
// //                                     ))}
// //                                 </select>
// //                             </div>
                            
// //                             <div className="stories-form-group">
// //                                 <label>عکس استوری (اختیاری)</label>
// //                                 <div className="stories-image-upload">
// //                                     <input
// //                                         type="file"
// //                                         accept="image/*"
// //                                         onChange={handleImageSelect}
// //                                         id="story-image-input"
// //                                         style={{ display: 'none' }}
// //                                     />
// //                                     {storyImagePreview ? (
// //                                         <div className="stories-image-preview">
// //                                             <img src={storyImagePreview} alt="Preview" />
// //                                             <button
// //                                                 type="button"
// //                                                 onClick={() => {
// //                                                     setStoryImage(null);
// //                                                     setStoryImagePreview(null);
// //                                                 }}
// //                                             >
// //                                                 حذف
// //                                             </button>
// //                                         </div>
// //                                     ) : (
// //                                         <button
// //                                             type="button"
// //                                             className="stories-upload-btn"
// //                                             onClick={() => document.getElementById('story-image-input').click()}
// //                                         >
// //                                             📸 انتخاب عکس
// //                                         </button>
// //                                     )}
// //                                 </div>
// //                                 <small>حداکثر حجم: 5 مگابایت | فرمت‌های مجاز: jpg, png, webp</small>
// //                             </div>
                            
// //                             <div className="stories-modal-actions">
// //                                 <button type="submit" className="stories-submit" disabled={uploading}>
// //                                     {uploading ? 'در حال ارسال...' : 'ثبت استوری'}
// //                                 </button>
// //                                 <button type="button" onClick={() => setShowAddModal(false)}>
// //                                     انصراف
// //                                 </button>
// //                             </div>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default UserStoriesPanel;

// // UserStoriesPanel.js
// import React, { useState, useEffect, useCallback } from 'react';
// import { panelService } from '../../../../services/panelService';
// import './UserStoriesPanel.css';

// const UserStoriesPanel = () => {
//     const [stories, setStories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [selectedRealEstate, setSelectedRealEstate] = useState('');
//     const [storyText, setStoryText] = useState('');
//     const [storyImage, setStoryImage] = useState(null);
//     const [storyImagePreview, setStoryImagePreview] = useState(null);
//     const [uploading, setUploading] = useState(false);
//     const [toast, setToast] = useState(null);
//     const [properties, setProperties] = useState([]);
//     const [selectedStoryForView, setSelectedStoryForView] = useState(null);
//     const [storyViewIndex, setStoryViewIndex] = useState(0);
//     const [storyProgress, setStoryProgress] = useState(0);

//     const showToast = (message, type = 'success') => {
//         setToast({ message, type });
//         setTimeout(() => setToast(null), 3000);
//     };

//     const fetchStories = useCallback(async () => {
//         setLoading(true);
//         try {
//             const data = await panelService.GetStories();
//             setStories(data || []);
//         } catch (error) {
//             console.error('Error fetching stories:', error);
//             showToast('خطا در دریافت استوری‌ها', 'error');
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     const fetchProperties = useCallback(async () => {
//         try {
//             const data = await panelService.GetRealEstatePanel();
//             if (data && Array.isArray(data)) {
//                 const activeProperties = data.filter(p => p.status === 'منتشر شد' || p.status === 'فعال');
//                 setProperties(activeProperties);
//             }
//         } catch (error) {
//             console.error('Error fetching properties:', error);
//         }
//     }, []);

//     useEffect(() => {
//         fetchStories();
//         fetchProperties();
//     }, [fetchStories, fetchProperties]);

//     const handleImageSelect = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             if (file.size > 10 * 1024 * 1024) {
//                 showToast('حجم عکس نباید بیشتر از 10 مگابایت باشد', 'error');
//                 return;
//             }
//             if (!file.type.startsWith('image/')) {
//                 showToast('فایل انتخابی باید عکس باشد', 'error');
//                 return;
//             }
//             setStoryImage(file);
//             setStoryImagePreview(URL.createObjectURL(file));
//         }
//     };

//     const handleSubmitStory = async (e) => {
//         e.preventDefault();
        
//         if (!storyText && !storyImage && !selectedRealEstate) {
//             showToast('لطفاً حداقل متن، عکس یا ملک را وارد کنید', 'error');
//             return;
//         }

//         setUploading(true);

//         try {
//             let uploadedImagePath = null;
            
//             if (storyImage) {
//                 uploadedImagePath = await panelService.UploadStoryImage(storyImage);
//             }

//             const storyData = {
//                 title: storyText || null,
//                 realEstateId: selectedRealEstate || null,
//                 imagePath: uploadedImagePath || null
//             };

//             await panelService.InsertStory(storyData);
            
//             showToast('استوری با موفقیت ثبت شد', 'success');
            
//             setStoryText('');
//             setStoryImage(null);
//             setStoryImagePreview(null);
//             setSelectedRealEstate('');
//             setShowAddModal(false);
//             fetchStories();
            
//         } catch (error) {
//             console.error('Error inserting story:', error);
//             showToast('خطا در ثبت استوری', 'error');
//         } finally {
//             setUploading(false);
//         }
//     };

//     const handleDeleteStory = async (storyId, e) => {
//         e.stopPropagation();
//         if (!window.confirm('آیا از حذف این استوری مطمئن هستید؟')) return;
        
//         try {
//             await panelService.DeleteStory(storyId);
//             showToast('استوری با موفقیت حذف شد', 'success');
//             fetchStories();
//         } catch (error) {
//             console.error('Error deleting story:', error);
//             showToast('خطا در حذف استوری', 'error');
//         }
//     };

//     const handleViewStory = (story, index) => {
//         setSelectedStoryForView(story);
//         setStoryViewIndex(index);
//         setStoryProgress(0);
//     };

//     const closeStoryView = () => {
//         setSelectedStoryForView(null);
//         setStoryViewIndex(0);
//         setStoryProgress(0);
//     };

//     const nextStory = () => {
//         if (storyViewIndex + 1 < stories.length) {
//             setStoryViewIndex(storyViewIndex + 1);
//             setStoryProgress(0);
//         } else {
//             closeStoryView();
//         }
//     };

//     const prevStory = () => {
//         if (storyViewIndex - 1 >= 0) {
//             setStoryViewIndex(storyViewIndex - 1);
//             setStoryProgress(0);
//         }
//     };

//     // Auto progress for story viewing
//     useEffect(() => {
//         if (selectedStoryForView) {
//             const interval = setInterval(() => {
//                 setStoryProgress(prev => {
//                     if (prev >= 100) {
//                         clearInterval(interval);
//                         nextStory();
//                         return 0;
//                     }
//                     return prev + 2;
//                 });
//             }, 50);
//             return () => clearInterval(interval);
//         }
//     }, [selectedStoryForView, storyViewIndex]);

//     const currentStory = stories[storyViewIndex];

//     return (
//         <div className="user-stories-panel">
//             {toast && (
//                 <div className={`stories-toast ${toast.type}`}>
//                     <span>{toast.message}</span>
//                 </div>
//             )}

//             {/* Header */}
//             <div className="stories-header">
//                 <div className="stories-header-info">
//                     <h2>📸 استوری‌های من</h2>
//                     <p>استوری‌های خود را ثبت و مدیریت کنید</p>
//                 </div>
//                 <button className="stories-add-btn" onClick={() => setShowAddModal(true)}>
//                     <span>+</span> ثبت استوری جدید
//                 </button>
//             </div>

//             {/* Stories Ring - Instagram Style */}
//             {!loading && stories.length > 0 && (
//                 <div className="stories-ring-container">
//                     <div className="stories-ring-scroll">
//                         {stories.map((story, index) => {
//                             const isWatched = false; // می‌توانید وضعیت دیده شدن را اضافه کنید
//                             const storyImageUrl = story.urlImage || (story.isRealEstate ? story.imgReal : null);
//                             return (
//                                 <div 
//                                     key={story.id} 
//                                     className={`story-ring-item ${isWatched ? 'watched' : ''}`}
//                                     onClick={() => handleViewStory(story, index)}
//                                 >
//                                     <div className="story-ring-gradient">
//                                         <div className="story-ring-image">
//                                             {storyImageUrl ? (
//                                                 <img 
//                                                     src={`https://localhost:7178${storyImageUrl}`} 
//                                                     alt="Story"
//                                                     onError={(e) => {
//                                                         e.target.src = '/api/placeholder/150/150';
//                                                     }}
//                                                 />
//                                             ) : (
//                                                 <div className="story-ring-placeholder">
//                                                     {story.title ? '📝' : '🏠'}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                     <span className="story-ring-name">
//                                         {story.title ? story.title.substring(0, 10) : (story.titleReal ? story.titleReal.substring(0, 10) : 'استوری')}
//                                         {(story.title?.length > 10 || story.titleReal?.length > 10) && '...'}
//                                     </span>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             )}

//             {/* Stories Grid */}
//             {loading ? (
//                 <div className="stories-loading">
//                     <div className="stories-spinner"></div>
//                     <p>در حال بارگذاری استوری‌ها...</p>
//                 </div>
//             ) : stories.length === 0 ? (
//                 <div className="stories-empty">
//                     <div className="stories-empty-animation">
//                         <div className="stories-empty-icon">📸</div>
//                         <div className="stories-empty-particles">
//                             <span>✨</span>
//                             <span>⭐</span>
//                             <span>🌟</span>
//                         </div>
//                     </div>
//                     <h4>هنوز استوری ثبت نکرده‌اید!</h4>
//                     <p>اولین استوری خود را ثبت کنید و لحظات خود را به اشتراک بگذارید</p>
//                     <button className="stories-empty-btn" onClick={() => setShowAddModal(true)}>
//                         ✨ ثبت اولین استوری
//                     </button>
//                 </div>
//             ) : (
//                 <div className="stories-grid">
//                     {stories.map((story, index) => {
//                         const storyImageUrl = story.urlImage || (story.isRealEstate ? story.imgReal : null);
//                         return (
//                             <div 
//                                 key={story.id} 
//                                 className="story-card-modern"
//                                 onClick={() => handleViewStory(story, index)}
//                             >
//                                 <button 
//                                     className="story-card-delete"
//                                     onClick={(e) => handleDeleteStory(story.id, e)}
//                                 >
//                                     ✕
//                                 </button>
                                
//                                 <div className="story-card-media">
//                                     {storyImageUrl ? (
//                                         <img 
//                                             src={`https://localhost:7178${storyImageUrl}`} 
//                                             alt="Story"
//                                             onError={(e) => {
//                                                 e.target.src = '/api/placeholder/400/500';
//                                             }}
//                                         />
//                                     ) : story.title ? (
//                                         <div className="story-card-text-only">
//                                             <div className="story-text-bubble">
//                                                 <span className="story-text-icon">💬</span>
//                                                 <p>{story.title}</p>
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <div className="story-card-placeholder">
//                                             <span>🏠</span>
//                                         </div>
//                                     )}
                                    
//                                     <div className="story-card-overlay">
//                                         <div className="story-card-type">
//                                             {story.isRealEstate ? (
//                                                 <span className="type-badge property">
//                                                     🏠 ملک
//                                                 </span>
//                                             ) : story.title ? (
//                                                 <span className="type-badge text">
//                                                     💬 متن
//                                                 </span>
//                                             ) : story.urlImage ? (
//                                                 <span className="type-badge image">
//                                                     📷 عکس
//                                                 </span>
//                                             ) : null}
//                                         </div>
//                                     </div>
//                                 </div>
                                
//                                 <div className="story-card-info">
//                                     {story.titleReal && (
//                                         <div className="story-card-property">
//                                             <strong>{story.titleReal}</strong>
//                                         </div>
//                                     )}
//                                     {story.title && !story.titleReal && (
//                                         <div className="story-card-caption">
//                                             {story.title.length > 50 ? story.title.substring(0, 50) + '...' : story.title}
//                                         </div>
//                                     )}
//                                     <div className="story-card-date">
//                                         {new Date().toLocaleDateString('fa-IR')}
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}

//             {/* Story View Modal - Instagram Style */}
//             {selectedStoryForView && currentStory && (
//                 <div className="story-view-modal" onClick={closeStoryView}>
//                     <div className="story-view-container" onClick={(e) => e.stopPropagation()}>
//                         {/* Progress Bar */}
//                         <div className="story-progress-container">
//                             <div className="story-progress-bar">
//                                 <div 
//                                     className="story-progress-fill" 
//                                     style={{ width: `${storyProgress}%` }}
//                                 />
//                             </div>
//                         </div>
                        
//                         {/* Close Button */}
//                         <button className="story-view-close" onClick={closeStoryView}>
//                             ✕
//                         </button>
                        
//                         {/* Navigation Buttons */}
//                         {storyViewIndex > 0 && (
//                             <button className="story-nav-prev" onClick={prevStory}>
//                                 ◀
//                             </button>
//                         )}
//                         {storyViewIndex + 1 < stories.length && (
//                             <button className="story-nav-next" onClick={nextStory}>
//                                 ▶
//                             </button>
//                         )}
                        
//                         {/* Story Content */}
//                         <div className="story-view-content">
//                             {currentStory.urlImage ? (
//                                 <img 
//                                     src={`https://localhost:7178${currentStory.urlImage}`} 
//                                     alt="Story"
//                                     className="story-view-image"
//                                 />
//                             ) : currentStory.isRealEstate && currentStory.imgReal ? (
//                                 <div className="story-view-realestate">
//                                     <img 
//                                         src={`https://localhost:7178${currentStory.imgReal}`} 
//                                         alt={currentStory.titleReal}
//                                         className="story-view-image"
//                                     />
//                                     <div className="story-view-realestate-overlay">
//                                         <div className="story-view-realestate-info">
//                                             <h3>{currentStory.titleReal}</h3>
//                                             <a href={currentStory.linkReal} className="story-view-link">
//                                                 مشاهده ملک →
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ) : currentStory.title ? (
//                                 <div className="story-view-text">
//                                     <div className="story-view-text-bubble">
//                                         <p>{currentStory.title}</p>
//                                     </div>
//                                 </div>
//                             ) : null}
                            
//                             {/* User Info */}
//                             <div className="story-view-user">
//                                 <div className="story-view-user-avatar">
//                                     {currentStory.isRealEstate ? '🏠' : (currentStory.urlImage ? '📷' : '💬')}
//                                 </div>
//                                 <div className="story-view-user-info">
//                                     <strong>استوری من</strong>
//                                     <span>الان</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Add Story Modal - Modern Design */}
//             {showAddModal && (
//                 <div className="stories-modal-overlay" onClick={() => setShowAddModal(false)}>
//                     <div className="stories-modal-modern" onClick={(e) => e.stopPropagation()}>
//                         <div className="stories-modal-header-modern">
//                             <h3>✨ ثبت استوری جدید</h3>
//                             <button onClick={() => setShowAddModal(false)}>✕</button>
//                         </div>
                        
//                         <form onSubmit={handleSubmitStory}>
//                             <div className="stories-form-group-modern">
//                                 <label>متن استوری</label>
//                                 <textarea
//                                     value={storyText}
//                                     onChange={(e) => setStoryText(e.target.value)}
//                                     placeholder="چه چیزی می‌خواهید به اشتراک بگذارید؟..."
//                                     rows="3"
//                                     maxLength="500"
//                                 />
//                                 <span className="char-count">{storyText.length}/500</span>
//                             </div>
                            
//                             <div className="stories-form-group-modern">
//                                 <label>ارتباط با ملک (اختیاری)</label>
//                                 <div className="property-select-modern">
//                                     <select
//                                         value={selectedRealEstate}
//                                         onChange={(e) => setSelectedRealEstate(e.target.value)}
//                                     >
//                                         <option value="">بدون ملک</option>
//                                         {properties.map(property => (
//                                             <option key={property.id} value={property.id}>
//                                                 🏠 {property.title} - {property.region}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
                            
//                             <div className="stories-form-group-modern">
//                                 <label>افزودن عکس</label>
//                                 <div className="image-upload-modern">
//                                     {storyImagePreview ? (
//                                         <div className="image-preview-modern">
//                                             <img src={storyImagePreview} alt="Preview" />
//                                             <button
//                                                 type="button"
//                                                 className="remove-image-btn"
//                                                 onClick={() => {
//                                                     setStoryImage(null);
//                                                     setStoryImagePreview(null);
//                                                 }}
//                                             >
//                                                 ✕
//                                             </button>
//                                             <div className="image-preview-overlay">
//                                                 <span>📷 عکس شما</span>
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <label className="upload-area-modern">
//                                             <input
//                                                 type="file"
//                                                 accept="image/*"
//                                                 onChange={handleImageSelect}
//                                                 style={{ display: 'none' }}
//                                             />
//                                             <div className="upload-content">
//                                                 <span className="upload-icon">📸</span>
//                                                 <span>برای آپلود عکس کلیک کنید</span>
//                                                 <small>jpg, png, webp - حداکثر 10MB</small>
//                                             </div>
//                                         </label>
//                                     )}
//                                 </div>
//                             </div>
                            
//                             <div className="stories-modal-actions-modern">
//                                 <button type="submit" className="stories-submit-modern" disabled={uploading}>
//                                     {uploading ? (
//                                         <>
//                                             <span className="btn-spinner"></span>
//                                             در حال ثبت...
//                                         </>
//                                     ) : (
//                                         '✨ انتشار استوری'
//                                     )}
//                                 </button>
//                                 <button type="button" onClick={() => setShowAddModal(false)}>
//                                     انصراف
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserStoriesPanel;

// UserStoriesPanel.js - نسخه یونیک شده با کلاس‌های یکتا

import React, { useState, useEffect, useCallback } from 'react';
import { panelService } from '../../../../services/panelService';
import './UserStoriesPanel.css';

const UserStoriesPanel = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedRealEstate, setSelectedRealEstate] = useState('');
    const [storyText, setStoryText] = useState('');
    const [storyImage, setStoryImage] = useState(null);
    const [storyImagePreview, setStoryImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [usrToast, setUsrToast] = useState(null);
    const [properties, setProperties] = useState([]);
    const [selectedStoryForView, setSelectedStoryForView] = useState(null);
    const [storyViewIndex, setStoryViewIndex] = useState(0);
    const [storyProgress, setStoryProgress] = useState(0);

    const showUsrToast = (message, type = 'success') => {
        setUsrToast({ message, type });
        setTimeout(() => setUsrToast(null), 3000);
    };

    const fetchStories = useCallback(async () => {
        setLoading(true);
        try {
            const data = await panelService.GetStories();
            setStories(data || []);
        } catch (error) {
            console.error('Error fetching stories:', error);
            showUsrToast('خطا در دریافت استوری‌ها', 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchProperties = useCallback(async () => {
        try {
            const data = await panelService.GetRealEstatePanel();
            if (data && Array.isArray(data)) {
                const activeProperties = data.filter(p => p.status === 'منتشر شد' || p.status === 'فعال');
                setProperties(activeProperties);
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    }, []);

    useEffect(() => {
        fetchStories();
        fetchProperties();
    }, [fetchStories, fetchProperties]);

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                showUsrToast('حجم عکس نباید بیشتر از 10 مگابایت باشد', 'error');
                return;
            }
            if (!file.type.startsWith('image/')) {
                showUsrToast('فایل انتخابی باید عکس باشد', 'error');
                return;
            }
            setStoryImage(file);
            setStoryImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmitStory = async (e) => {
        e.preventDefault();
        
        if (!storyText && !storyImage && !selectedRealEstate) {
            showUsrToast('لطفاً حداقل متن، عکس یا ملک را وارد کنید', 'error');
            return;
        }

        setUploading(true);

        try {
            let uploadedImagePath = null;
            
            if (storyImage) {
                uploadedImagePath = await panelService.UploadStoryImage(storyImage);
            }

            const storyData = {
                title: storyText || null,
                realEstateId: selectedRealEstate || null,
                imagePath: uploadedImagePath || null
            };

            await panelService.InsertStory(storyData);
            
            showUsrToast('استوری با موفقیت ثبت شد', 'success');
            
            setStoryText('');
            setStoryImage(null);
            setStoryImagePreview(null);
            setSelectedRealEstate('');
            setShowAddModal(false);
            fetchStories();
            
        } catch (error) {
            console.error('Error inserting story:', error);
            showUsrToast('خطا در ثبت استوری', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteStory = async (storyId, e) => {
        e.stopPropagation();
        if (!window.confirm('آیا از حذف این استوری مطمئن هستید؟')) return;
        
        try {
            await panelService.DeleteStory(storyId);
            showUsrToast('استوری با موفقیت حذف شد', 'success');
            fetchStories();
        } catch (error) {
            console.error('Error deleting story:', error);
            showUsrToast('خطا در حذف استوری', 'error');
        }
    };

    const handleViewStory = (story, index) => {
        setSelectedStoryForView(story);
        setStoryViewIndex(index);
        setStoryProgress(0);
    };

    const closeStoryView = () => {
        setSelectedStoryForView(null);
        setStoryViewIndex(0);
        setStoryProgress(0);
    };

    const nextStory = () => {
        if (storyViewIndex + 1 < stories.length) {
            setStoryViewIndex(storyViewIndex + 1);
            setStoryProgress(0);
        } else {
            closeStoryView();
        }
    };

    const prevStory = () => {
        if (storyViewIndex - 1 >= 0) {
            setStoryViewIndex(storyViewIndex - 1);
            setStoryProgress(0);
        }
    };

    useEffect(() => {
        if (selectedStoryForView) {
            const interval = setInterval(() => {
                setStoryProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        nextStory();
                        return 0;
                    }
                    return prev + 2;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [selectedStoryForView, storyViewIndex]);

    const currentStory = stories[storyViewIndex];

    return (
        <div className="usr-stories-panel">
            {usrToast && (
                <div className={`usr-stories-toast ${usrToast.type}`}>
                    <span>{usrToast.message}</span>
                </div>
            )}

            <div className="usr-stories-header">
                <div className="usr-stories-header-info">
                    <h2>📸 استوری‌های من</h2>
                    <p>استوری‌های خود را ثبت و مدیریت کنید</p>
                </div>
                <button className="usr-stories-add-btn" onClick={() => setShowAddModal(true)}>
                    <span>+</span> ثبت استوری جدید
                </button>
            </div>

            {/* Stories Grid - فقط مربع‌ها، بدون دایره */}
            {loading ? (
                <div className="usr-stories-loading">
                    <div className="usr-stories-spinner"></div>
                    <p>در حال بارگذاری استوری‌ها...</p>
                </div>
            ) : stories.length === 0 ? (
                <div className="usr-stories-empty">
                    <div className="usr-stories-empty-animation">
                        <div className="usr-stories-empty-icon">📸</div>
                        <div className="usr-stories-empty-particles">
                            <span>✨</span>
                            <span>⭐</span>
                            <span>🌟</span>
                        </div>
                    </div>
                    <h4>هنوز استوری ثبت نکرده‌اید!</h4>
                    <p>اولین استوری خود را ثبت کنید و لحظات خود را به اشتراک بگذارید</p>
                    <button className="usr-stories-empty-btn" onClick={() => setShowAddModal(true)}>
                        ✨ ثبت اولین استوری
                    </button>
                </div>
            ) : (
                <div className="usr-stories-grid">
                    {stories.map((story, index) => {
                        const storyImageUrl = story.urlImage || (story.isRealEstate ? story.imgReal : null);
                        return (
                            <div 
                                key={story.id} 
                                className="usr-story-card"
                                onClick={() => handleViewStory(story, index)}
                            >
                                <button 
                                    className="usr-story-card-delete"
                                    onClick={(e) => handleDeleteStory(story.id, e)}
                                >
                                    ✕
                                </button>
                                
                                <div className="usr-story-card-media">
                                    {storyImageUrl ? (
                                        <img 
                                            src={`https://localhost:7178${storyImageUrl}`} 
                                            alt="Story"
                                            onError={(e) => {
                                                e.target.src = '/api/placeholder/400/500';
                                            }}
                                        />
                                    ) : story.title ? (
                                        <div className="usr-story-card-text-only">
                                            <div className="usr-story-text-bubble">
                                                <span className="usr-story-text-icon">💬</span>
                                                <p>{story.title}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="usr-story-card-placeholder">
                                            <span>🏠</span>
                                        </div>
                                    )}
                                    
                                    <div className="usr-story-card-overlay">
                                        <div className="usr-story-card-type">
                                            {story.isRealEstate ? (
                                                <span className="usr-type-badge usr-type-property">
                                                    🏠 ملک
                                                </span>
                                            ) : story.title ? (
                                                <span className="usr-type-badge usr-type-text">
                                                    💬 متن
                                                </span>
                                            ) : story.urlImage ? (
                                                <span className="usr-type-badge usr-type-image">
                                                    📷 عکس
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="usr-story-card-info">
                                    {story.titleReal && (
                                        <div className="usr-story-card-property">
                                            <strong>{story.titleReal}</strong>
                                        </div>
                                    )}
                                    {story.title && !story.titleReal && (
                                        <div className="usr-story-card-caption">
                                            {story.title.length > 50 ? story.title.substring(0, 50) + '...' : story.title}
                                        </div>
                                    )}
                                    <div className="usr-story-card-date">
                                        {new Date().toLocaleDateString('fa-IR')}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Story View Modal */}
            {selectedStoryForView && currentStory && (
                <div className="usr-story-view-modal" onClick={closeStoryView}>
                    <div className="usr-story-view-container" onClick={(e) => e.stopPropagation()}>
                        <div className="usr-story-progress-container">
                            <div className="usr-story-progress-bar">
                                <div 
                                    className="usr-story-progress-fill" 
                                    style={{ width: `${storyProgress}%` }}
                                />
                            </div>
                        </div>
                        
                        <button className="usr-story-view-close" onClick={closeStoryView}>
                            ✕
                        </button>
                        
                        {storyViewIndex > 0 && (
                            <button className="usr-story-nav-prev" onClick={prevStory}>
                                ◀
                            </button>
                        )}
                        {storyViewIndex + 1 < stories.length && (
                            <button className="usr-story-nav-next" onClick={nextStory}>
                                ▶
                            </button>
                        )}
                        
                        <div className="usr-story-view-content">
                            {currentStory.urlImage ? (
                                <img 
                                    src={`https://localhost:7178${currentStory.urlImage}`} 
                                    alt="Story"
                                    className="usr-story-view-image"
                                />
                            ) : currentStory.isRealEstate && currentStory.imgReal ? (
                                <div className="usr-story-view-realestate">
                                    <img 
                                        src={`https://localhost:7178${currentStory.imgReal}`} 
                                        alt={currentStory.titleReal}
                                        className="usr-story-view-image"
                                    />
                                    <div className="usr-story-view-realestate-overlay">
                                        <div className="usr-story-view-realestate-info">
                                            <h3>{currentStory.titleReal}</h3>
                                            <a href={currentStory.linkReal} className="usr-story-view-link">
                                                مشاهده ملک →
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ) : currentStory.title ? (
                                <div className="usr-story-view-text">
                                    <div className="usr-story-view-text-bubble">
                                        <p>{currentStory.title}</p>
                                    </div>
                                </div>
                            ) : null}
                            
                            <div className="usr-story-view-user">
                                <div className="usr-story-view-user-avatar">
                                    {currentStory.isRealEstate ? '🏠' : (currentStory.urlImage ? '📷' : '💬')}
                                </div>
                                <div className="usr-story-view-user-info">
                                    <strong>استوری من</strong>
                                    <span>الان</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Story Modal */}
            {showAddModal && (
                <div className="usr-stories-modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="usr-stories-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="usr-stories-modal-header">
                            <h3>✨ ثبت استوری جدید</h3>
                            <button onClick={() => setShowAddModal(false)}>✕</button>
                        </div>
                        
                        <form onSubmit={handleSubmitStory}>
                            <div className="usr-stories-form-group">
                                <label>متن استوری</label>
                                <textarea
                                    value={storyText}
                                    onChange={(e) => setStoryText(e.target.value)}
                                    placeholder="چه چیزی می‌خواهید به اشتراک بگذارید؟..."
                                    rows="3"
                                    maxLength="500"
                                />
                                <span className="usr-char-count">{storyText.length}/500</span>
                            </div>
                            
                            <div className="usr-stories-form-group">
                                <label>ارتباط با ملک (اختیاری)</label>
                                <div className="usr-property-select">
                                    <select
                                        value={selectedRealEstate}
                                        onChange={(e) => setSelectedRealEstate(e.target.value)}
                                    >
                                        <option value="">بدون ملک</option>
                                        {properties.map(property => (
                                            <option key={property.id} value={property.id}>
                                                🏠 {property.title} - {property.region}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="usr-stories-form-group">
                                <label>افزودن عکس</label>
                                <div className="usr-image-upload">
                                    {storyImagePreview ? (
                                        <div className="usr-image-preview">
                                            <img src={storyImagePreview} alt="Preview" />
                                            <button
                                                type="button"
                                                className="usr-remove-image-btn"
                                                onClick={() => {
                                                    setStoryImage(null);
                                                    setStoryImagePreview(null);
                                                }}
                                            >
                                                ✕
                                            </button>
                                            <div className="usr-image-preview-overlay">
                                                <span>📷 عکس شما</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="usr-upload-area">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageSelect}
                                                style={{ display: 'none' }}
                                            />
                                            <div className="usr-upload-content">
                                                <span className="usr-upload-icon">📸</span>
                                                <span>برای آپلود عکس کلیک کنید</span>
                                                <small>jpg, png, webp - حداکثر 10MB</small>
                                            </div>
                                        </label>
                                    )}
                                </div>
                            </div>
                            
                            <div className="usr-stories-modal-actions">
                                <button type="submit" className="usr-stories-submit" disabled={uploading}>
                                    {uploading ? (
                                        <>
                                            <span className="usr-btn-spinner"></span>
                                            در حال ثبت...
                                        </>
                                    ) : (
                                        '✨ انتشار استوری'
                                    )}
                                </button>
                                <button type="button" onClick={() => setShowAddModal(false)}>
                                    انصراف
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserStoriesPanel;