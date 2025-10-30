// import React, { useState, useEffect } from 'react';
// import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi';
// import { ChromePicker } from 'react-color';
// import './Tag.css';

// const TagManagement = () => {
//   const [tags, setTags] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [selectedColor, setSelectedColor] = useState('#3B82F6');
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // داده‌های فرم جدید
//   const [newTag, setNewTag] = useState({
//     name: '',
//     description: '',
//     color: '#3B82F6'
//   });

//   // شبیه‌سازی دریافت داده از API
//   useEffect(() => {
//     const fetchTags = async () => {
//       setLoading(true);
//       try {
//         setTimeout(() => {
//           const sampleData = [
//             {
//               id: 1,
//               name: 'فوری',
//               description: 'کارهای با اولویت بالا',
//               color: '#EF4444',
//               createdAt: '1402/10/15',
//               usageCount: 15
//             },
//             {
//               id: 2,
//               name: 'توسعه',
//               description: 'تسک‌های مربوط به توسعه',
//               color: '#3B82F6',
//               createdAt: '1402/10/20',
//               usageCount: 8
//             },
//             {
//               id: 3,
//               name: 'باگ',
//               description: 'خطاهای سیستم',
//               color: '#F59E0B',
//               createdAt: '1402/10/25',
//               usageCount: 12
//             }
//           ];
//           setTags(sampleData);
//           setLoading(false);
//         }, 1000);
//       } catch (error) {
//         console.error('Error fetching tags:', error);
//         setLoading(false);
//       }
//     };

//     fetchTags();
//   }, []);

//   // مدیریت تغییرات فرم
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTag(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // مدیریت تغییر رنگ
//   const handleColorChange = (color) => {
//     setSelectedColor(color.hex);
//     setNewTag(prev => ({
//       ...prev,
//       color: color.hex
//     }));
//   };

//   // سابمیت فرم
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!newTag.name.trim()) {
//       alert('لطفا نام تگ را وارد کنید');
//       return;
//     }

//     setLoading(true);
//     try {
//       setTimeout(() => {
//         const tagToAdd = {
//           id: tags.length + 1,
//           name: newTag.name,
//           description: newTag.description,
//           color: newTag.color,
//           createdAt: new Date().toLocaleDateString('fa-IR'),
//           usageCount: 0
//         };

//         setTags(prev => [...prev, tagToAdd]);
//         setShowAddModal(false);
//         setNewTag({
//           name: '',
//           description: '',
//           color: '#3B82F6'
//         });
//         setSelectedColor('#3B82F6');
//         setShowColorPicker(false);
//         setLoading(false);
        
//         alert('تگ با موفقیت اضافه شد');
//       }, 500);

//     } catch (error) {
//       console.error('Error adding tag:', error);
//       setLoading(false);
//       alert('خطا در اضافه کردن تگ');
//     }
//   };

//   // حذف تگ
//   const handleDeleteTag = (id) => {
//     if (window.confirm('آیا از حذف این تگ اطمینان دارید؟')) {
//       setTags(prev => prev.filter(tag => tag.id !== id));
//     }
//   };

//   // بستن مودال
//   const handleCloseModal = () => {
//     setShowAddModal(false);
//     setNewTag({
//       name: '',
//       description: '',
//       color: '#3B82F6'
//     });
//     setSelectedColor('#3B82F6');
//     setShowColorPicker(false);
//   };

//   return (
//     <div className="tag-management-container">
//       {/* هدر صفحه */}
//       <div className="page-header">
//         <div className="header-content">
//           <h1>مدیریت تگ‌ها</h1>
//           <p>مدیریت و سازماندهی تگ‌های سیستم</p>
//         </div>
//         <div className="header-actions">
//           <button 
//             className="btn btn-primary"
//             onClick={() => setShowAddModal(true)}
//           >
//             <FiPlus />
//             افزودن تگ جدید
//           </button>
//         </div>
//       </div>

//       {/* گرید تگ‌ها */}
//       <div className="tags-grid">
//         {loading ? (
//           <div className="loading-container">
//             <div className="loading-spinner"></div>
//             <p>در حال بارگذاری تگ‌ها...</p>
//           </div>
//         ) : tags.length === 0 ? (
//           <div className="empty-state">
//             <div className="empty-icon">🏷️</div>
//             <h3>تگی وجود ندارد</h3>
//             <p>برای شروع، اولین تگ را ایجاد کنید</p>
//             <button 
//               className="btn btn-primary"
//               onClick={() => setShowAddModal(true)}
//             >
//               <FiPlus />
//               افزودن تگ
//             </button>
//           </div>
//         ) : (
//           <div className="grid">
//             {tags.map(tag => (
//               <div key={tag.id} className="tag-card">
//                 <div 
//                   className="tag-color-bar"
//                   style={{ backgroundColor: tag.color }}
//                 ></div>
//                 <div className="tag-content"
//                       style={{ backgroundColor: tag.color }}
//                 >
//                   <div className="tag-header"
                  
//                   >
//                     <div className="tag-title-section">
//                       <span 
//                         className="tag-color-badge"
//                         style={{ backgroundColor: tag.color }}
//                       ></span>
//                       <h3 className="tag-title">{tag.name}</h3>
//                     </div>
//                     <div className="tag-actions">
//                       <button 
//                         className="btn-icon btn-edit"
//                         title="ویرایش تگ"
//                       >
//                         <FiEdit2 />
//                       </button>
//                       <button 
//                         className="btn-icon btn-delete"
//                         onClick={() => handleDeleteTag(tag.id)}
//                         title="حذف تگ"
//                       >
//                         <FiTrash2 />
//                       </button>
//                     </div>
//                   </div>
                  
//                   <div className="tag-details">
//                     <p className="tag-description">{tag.description}</p>
                    
//                     <div className="tag-info">
//                       <div className="tag-info-item">
//                         <span className="info-label">رنگ:</span>
//                         <span className="info-value">
//                           <span 
//                             className="color-preview"
//                             style={{ backgroundColor: tag.color }}
//                           ></span>
//                           {tag.color}
//                         </span>
//                       </div>
//                       <div className="tag-info-item">
//                         <span className="info-label">تاریخ ایجاد:</span>
//                         <span className="info-value">{tag.createdAt}</span>
//                       </div>
//                       <div className="tag-info-item">
//                         <span className="info-label">تعداد استفاده:</span>
//                         <span className="info-value usage-count">{tag.usageCount}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* مودال افزودن تگ جدید */}
//       {showAddModal && (
//         <div className="modal-overlay" onClick={handleCloseModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>افزودن تگ جدید</h2>
//               <button className="close-btn" onClick={handleCloseModal}>
//                 <FiX />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label>نام تگ *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={newTag.name}
//                   onChange={handleInputChange}
//                   placeholder="نام تگ را وارد کنید"
//                   required
//                   autoFocus
//                 />
//               </div>

//               <div className="form-group">
//                 <label>توضیحات</label>
//                 <textarea
//                   name="description"
//                   value={newTag.description}
//                   onChange={handleInputChange}
//                   placeholder="توضیحات تگ (اختیاری)"
//                   rows="3"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>انتخاب رنگ</label>
//                 <div className="color-picker-container">
//                   {/* دکمه نمایش color picker */}
//                   <div className="color-picker-trigger">
//                     <button
//                       type="button"
//                       className="color-trigger-btn"
//                       onClick={() => setShowColorPicker(!showColorPicker)}
//                     >
//                       <span 
//                         className="selected-color-preview"
//                         style={{ backgroundColor: selectedColor }}
//                       ></span>
//                       <span>انتخاب رنگ</span>
//                     </button>
                    
//                     {/* نمایش کد رنگ انتخاب شده */}
//                     <div className="selected-color-info">
//                       <span>رنگ انتخاب شده:</span>
//                       <div className="color-code-display">
//                         <span 
//                           className="color-preview-small"
//                           style={{ backgroundColor: selectedColor }}
//                         ></span>
//                         <span className="color-code">{selectedColor}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Chrome Picker */}
//                   {showColorPicker && (
//                     <div className="chrome-picker-wrapper">
//                       <ChromePicker
//                         color={selectedColor}
//                         onChange={handleColorChange}
//                         disableAlpha={true}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="form-actions">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={handleCloseModal}
//                   disabled={loading}
//                 >
//                   انصراف
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <div className="loading-spinner-small"></div>
//                       در حال ذخیره...
//                     </>
//                   ) : (
//                     <>
//                       <FiSave />
//                       ذخیره تگ
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TagManagement;


import React, { useState, useEffect, useRef } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiDroplet } from 'react-icons/fi';
import { ChromePicker } from 'react-color';
import './Tag.css';

const TagManagement = () => {
  const [tags, setTags] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const colorPickerRef = useRef(null);

  // داده‌های فرم جدید
  const [newTag, setNewTag] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });

  // بستن color picker وقتی خارج از آن کلیک می‌شود
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // شبیه‌سازی دریافت داده از API
  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          const sampleData = [
            {
              id: 1,
              name: 'فوری',
              description: 'کارهای با اولویت بالا',
              color: '#EF4444',
              createdAt: '1402/10/15',
              usageCount: 15
            },
            {
              id: 2,
              name: 'توسعه',
              description: 'تسک‌های مربوط به توسعه',
              color: '#3B82F6',
              createdAt: '1402/10/20',
              usageCount: 8
            },
            {
              id: 3,
              name: 'باگ',
              description: 'خطاهای سیستم',
              color: '#F59E0B',
              createdAt: '1402/10/25',
              usageCount: 12
            }
          ];
          setTags(sampleData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching tags:', error);
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  // مدیریت تغییرات فرم
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTag(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // مدیریت تغییر رنگ
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    setNewTag(prev => ({
      ...prev,
      color: color.hex
    }));
  };

  // سابمیت فرم
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newTag.name.trim()) {
      alert('لطفا نام تگ را وارد کنید');
      return;
    }

    setLoading(true);
    try {
      setTimeout(() => {
        const tagToAdd = {
          id: tags.length + 1,
          name: newTag.name,
          description: newTag.description,
          color: newTag.color,
          createdAt: new Date().toLocaleDateString('fa-IR'),
          usageCount: 0
        };

        setTags(prev => [...prev, tagToAdd]);
        setShowAddModal(false);
        setNewTag({
          name: '',
          description: '',
          color: '#3B82F6'
        });
        setSelectedColor('#3B82F6');
        setShowColorPicker(false);
        setLoading(false);
        
        alert('تگ با موفقیت اضافه شد');
      }, 500);

    } catch (error) {
      console.error('Error adding tag:', error);
      setLoading(false);
      alert('خطا در اضافه کردن تگ');
    }
  };

  // حذف تگ
  const handleDeleteTag = (id) => {
    if (window.confirm('آیا از حذف این تگ اطمینان دارید؟')) {
      setTags(prev => prev.filter(tag => tag.id !== id));
    }
  };

  // بستن مودال
  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewTag({
      name: '',
      description: '',
      color: '#3B82F6'
    });
    setSelectedColor('#3B82F6');
    setShowColorPicker(false);
  };

  return (
    <div className="tag-management-container">
      {/* هدر صفحه */}
      <div className="page-header">
        <div className="header-content">
          <h1>مدیریت تگ‌ها</h1>
          <p>مدیریت و سازماندهی تگ‌های سیستم</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <FiPlus />
            افزودن تگ جدید
          </button>
        </div>
      </div>

      {/* گرید تگ‌ها */}
      <div className="tags-grid">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>در حال بارگذاری تگ‌ها...</p>
          </div>
        ) : tags.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏷️</div>
            <h3>تگی وجود ندارد</h3>
            <p>برای شروع، اولین تگ را ایجاد کنید</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <FiPlus />
              افزودن تگ
            </button>
          </div>
        ) : (
          <div className="grid">
            {tags.map(tag => (
              <div key={tag.id} className="tag-card">
                <div 
                  className="tag-color-bar"
                  style={{ backgroundColor: tag.color }}
                ></div>
                <div className="tag-content">
                  <div className="tag-header">
                    <div className="tag-title-section">
                      <span 
                        className="tag-color-badge"
                        style={{ backgroundColor: tag.color }}
                      ></span>
                      <h3 className="tag-title">{tag.name}</h3>
                    </div>
                    <div className="tag-actions">
                      <button 
                        className="btn-icon btn-edit"
                        title="ویرایش تگ"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="btn-icon btn-delete"
                        onClick={() => handleDeleteTag(tag.id)}
                        title="حذف تگ"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  
                  <div className="tag-details">
                    <p className="tag-description">{tag.description}</p>
                    
                    <div className="tag-info">
                      <div className="tag-info-item">
                        <span className="info-label">رنگ:</span>
                        <span className="info-value">
                          <span 
                            className="color-preview"
                            style={{ backgroundColor: tag.color }}
                          ></span>
                          {tag.color}
                        </span>
                      </div>
                      <div className="tag-info-item">
                        <span className="info-label">تاریخ ایجاد:</span>
                        <span className="info-value">{tag.createdAt}</span>
                      </div>
                      <div className="tag-info-item">
                        <span className="info-label">تعداد استفاده:</span>
                        <span className="info-value usage-count">{tag.usageCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* مودال افزودن تگ جدید */}
      {showAddModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>افزودن تگ جدید</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>نام تگ *</label>
                <input
                  type="text"
                  name="name"
                  value={newTag.name}
                  onChange={handleInputChange}
                  placeholder="نام تگ را وارد کنید"
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>توضیحات</label>
                <textarea
                  name="description"
                  value={newTag.description}
                  onChange={handleInputChange}
                  placeholder="توضیحات تگ (اختیاری)"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>انتخاب رنگ</label>
                <div className="color-picker-container" ref={colorPickerRef}>
                  {/* دکمه نمایش color picker */}
                  <div className="color-picker-trigger">
                    <button
                      type="button"
                      className="color-trigger-btn"
                      onClick={() => setShowColorPicker(!showColorPicker)}
                    >
                      <FiDroplet />
                      <span 
                        className="selected-color-preview"
                        style={{ backgroundColor: selectedColor }}
                      ></span>
                      <span>انتخاب رنگ</span>
                    </button>
                    
                    {/* نمایش کد رنگ انتخاب شده */}
                    <div className="selected-color-info">
                      <span>رنگ انتخاب شده:</span>
                      <div className="color-code-display">
                        <span 
                          className="color-preview-small"
                          style={{ backgroundColor: selectedColor }}
                        ></span>
                        <span className="color-code">{selectedColor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Chrome Picker */}
                  {showColorPicker && (
                    <div className="chrome-picker-wrapper">
                      <div className="color-picker-header">
                        <span>انتخاب رنگ</span>
                        <button 
                          type="button"
                          className="close-picker-btn"
                          onClick={() => setShowColorPicker(false)}
                        >
                          <FiX />
                        </button>
                      </div>
                      <ChromePicker
                        color={selectedColor}
                        onChange={handleColorChange}
                        disableAlpha={true}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                  disabled={loading}
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner-small"></div>
                      در حال ذخیره...
                    </>
                  ) : (
                    <>
                      <FiSave />
                      ذخیره تگ
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagManagement;