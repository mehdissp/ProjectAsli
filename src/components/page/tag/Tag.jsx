

// import React, { useState, useEffect, useRef } from 'react';
// import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiDroplet } from 'react-icons/fi';
// import Pagination from '../../common/Pagination/Pagination';
// import moment from 'moment-jalaali';
// import { ChromePicker } from 'react-color';
// import { tagservice } from '../../../services/Tag';
// import './Tag.css';

// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const TagManagement = () => {
//   const [tags, setTags] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false); // حالت جدید برای مودال ویرایش
//   const [selectedColor, setSelectedColor] = useState('#3B82F6');
//   const [editColor, setEditColor] = useState('#3B82F6'); // رنگ برای ویرایش
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [showEditColorPicker, setShowEditColorPicker] = useState(false); // color picker برای ویرایش
//   const [loading, setLoading] = useState(false);
//   const [editLoading, setEditLoading] = useState(false); // loading برای ویرایش
//   const colorPickerRef = useRef(null);
//   const editColorPickerRef = useRef(null);

//   // حالت‌های جدید برای صفحه‌بندی
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const [itemsPerPage] = useState(20);

//   // داده‌های فرم جدید
//   const [newTag, setNewTag] = useState({
//     name: '',
//     description: '',
//     color: '#3B82F6'
//   });

//   // داده‌های فرم ویرایش
//   const [editingTag, setEditingTag] = useState({
//     id: null,
//     name: '',
//     description: '',
//     color: '#3B82F6'
//   });

//   const convertToJalaali = (dateString) => {
//     if (!dateString) return 'تعیین نشده';
    
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         if (typeof dateString === 'string' && dateString.includes('/')) {
//           return dateString;
//         }
//         return 'تاریخ نامعتبر';
//       }
      
//       return moment(date).format('jYYYY/jMM/jDD');
//     } catch (error) {
//       console.error('Error converting date:', error);
//       return 'تاریخ نامعتبر';
//     }
//   };

//   // بستن color picker وقتی خارج از آن کلیک می‌شود
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
//         setShowColorPicker(false);
//       }
//       if (editColorPickerRef.current && !editColorPickerRef.current.contains(event.target)) {
//         setShowEditColorPicker(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const fetchTags = async (page = 1) => {
//     setLoading(true);
//     try {
//       const response = await tagservice.getTags(page, itemsPerPage);
//       console.log("data", response.data);
      
//       setTags(response.data.items || response.data);
      
//       setCurrentPage(response.data.currentPage || page);
//       setTotalPages(response.data.totalPages || 1);
//       setTotalItems(response.data.totalItems || response.data.length);
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching tags:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTags(1);
//   }, []);

//   // مدیریت تغییرات فرم افزودن
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTag(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // مدیریت تغییرات فرم ویرایش
//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditingTag(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // مدیریت تغییر رنگ در افزودن
//   const handleColorChange = (color) => {
//     setSelectedColor(color.hex);
//     setNewTag(prev => ({
//       ...prev,
//       color: color.hex
//     }));
//   };

//   // مدیریت تغییر رنگ در ویرایش
//   const handleEditColorChange = (color) => {
//     setEditColor(color.hex);
//     setEditingTag(prev => ({
//       ...prev,
//       color: color.hex
//     }));
//   };

//   // باز کردن مودال ویرایش
//   const handleEditTag = (tag) => {
//     setEditingTag({
//       id: tag.id,
//       name: tag.name,
//       description: tag.descriptionRows || '',
//       color: tag.color
//     });
//     setEditColor(tag.color);
//     setShowEditModal(true);
//   };

//   // سابمیت فرم ویرایش
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!editingTag.name.trim()) {
//                 toast.error('لطفا نام تگ را وارد کنید', {
//             position: "top-left",
//             autoClose: 5000,
//           });
  
//       return;
//     }

//     setEditLoading(true);
//     try {
//       const tagToUpdate = {
//         id: editingTag.id,
//         name: editingTag.name,
//         desc: editingTag.description,
//         color: editingTag.color.replace('#', ''),
//       };

//       const response = await tagservice.updateTag( tagToUpdate);
      
//       // آپدیت تگ در لیست
//       setTags(prev => prev.map(tag => 
//         tag.id === editingTag.id 
//           ? { 
//               ...tag, 
//               name: editingTag.name, 
//               description: editingTag.description,
//               color: editingTag.color
//             }
//           : tag
//       ));
      
//       setShowEditModal(false);
//       setEditLoading(false);
//                  toast.success('تگ با موفقیت ویرایش شد', {
//             position: "top-left",
//             autoClose: 5000,
//           });
//    //   alert('تگ با موفقیت ویرایش شد');
      
//     } catch (error) {
//       console.error('Error updating tag:', error);
//       setEditLoading(false);
//       //alert('خطا در ویرایش تگ');
//                     toast.error('خطا در ویرایش تگ', {
//             position: "top-left",
//             autoClose: 5000,
//           });
//     }
//   };

//   // سابمیت فرم افزودن
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!newTag.name.trim()) {

//                        toast.error('لطفا نام تگ را وارد کنید', {
//             position: "top-left",
//             autoClose: 5000,
//           });

//       return;
//     }

//     setLoading(true);
//     try {
//       const tagToAdd = {
//         id: 0,
//         name: newTag.name,
//         desc: newTag.description,
//         color: newTag.color.replace('#', ''),
//       };

//       const response = await tagservice.createTag(tagToAdd);
//                              toast.success('عملیات با موفقیت انجام شد', {
//             position: "top-left",
//             autoClose: 5000,
//           });
//       const newTagWithId = {
//         ...tagToAdd,
//         id: response.data.id || Date.now(), // استفاده از ID برگشتی از API یا یک ID موقت
//         color: newTag.color,
//         createdAt: new Date().toLocaleDateString('fa-IR'),
//         usageCount: 0
//       };

//       setTags(prev => [...prev, newTagWithId]);
//       setNewTag({
//         name: '',
//         description: '',
//         color: '#3B82F6'
//       });
      
//       setShowAddModal(false);
//       setSelectedColor('#3B82F6');
//       setShowColorPicker(false);
//       setLoading(false);
      
//     } catch (error) {
//       console.error('Error adding tag:', error);
//       setLoading(false);
//       alert('خطا در اضافه کردن تگ');
//     }
//   };

//   // حذف تگ
// const handleDeleteTag = async (id) => {
//   if (window.confirm('آیا از حذف این تگ اطمینان دارید؟')) {
//     try {
//       // ابتدا از API حذف کنیم
//       const response = await tagservice.deleteTag(id);
      
//       // سپس از state حذف کنیم
//       setTags(prev => prev.filter(tag => tag.id !== id));
//                                    toast.success('عملیات با موفقیت انجام شد', {
//             position: "top-left",
//             autoClose: 5000,
//           });

      
//     } catch (error) {
//       console.error('Error deleting tag:', error);
//       alert('خطا در حذف تگ');
//     }
//   }
// };

//   // بستن مودال افزودن
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

//   // بستن مودال ویرایش
//   const handleCloseEditModal = () => {
//     setShowEditModal(false);
//     setEditingTag({
//       id: null,
//       name: '',
//       description: '',
//       color: '#3B82F6'
//     });
//     setEditColor('#3B82F6');
//     setShowEditColorPicker(false);
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
//                                <ToastContainer
//                   position="top-left"
//                   autoClose={5000}
//                   hideProgressBar={false}
//                   newestOnTop={false}
//                   closeOnClick
//                   rtl={true}
//                   pauseOnFocusLoss
//                   draggable
//                   pauseOnHover
//                   theme="light"
//                 />

//       {/* اطلاعات صفحه‌بندی */}
//       {!loading && tags.length > 0 && (
//         <div className="pagination-info">
//           نمایش {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} از {totalItems} تگ
//         </div>
//       )}

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
//           <>
//             <div className="grid">
//               {tags.map(tag => (
//                 <div key={tag.id} className="tag-card">
//                   <div 
//                     className="tag-color-bar"
//                     style={{ backgroundColor: tag.color }}
//                   ></div>
//                   <div className="tag-content">
//                     <div className="tag-header">
//                       <div className="tag-title-section">
//                         <span 
//                           className="tag-color-badge"
//                           style={{ backgroundColor: tag.color }}
//                         ></span>
//                         <h3 className="tag-title">{tag.name}</h3>
//                       </div>
//                       <div className="tag-actions">
//                         <button 
//                           className="btn-icon btn-edit"
//                           onClick={() => handleEditTag(tag)}
//                           title="ویرایش تگ"
//                         >
//                           <FiEdit2 />
//                         </button>
//                         <button 
//                           className="btn-icon btn-delete"
//                           onClick={() => handleDeleteTag(tag.id)}
//                           title="حذف تگ"
//                         >
//                           <FiTrash2 />
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className="tag-details">
//                       <p className="tag-description">{tag.descriptionRows}</p>
                      
//                       <div className="tag-info">
//                         <div className="tag-info-item">
//                           <span className="info-label">رنگ:</span>
//                           <span className="info-value">
//                             <span 
//                               className="color-preview"
//                               style={{ backgroundColor: tag.color }}
//                             ></span>
//                             {tag.color}
//                           </span>
//                         </div>
//                         <div className="tag-info-item">
//                           <span className="info-label">تاریخ ایجاد:</span>
//                           <span className="info-value">{convertToJalaali(tag.createdAt)}</span>
//                         </div>
//                         <div className="tag-info-item">
//                           <span className="info-label">تعداد استفاده:</span>
//                           <span className="info-value usage-count" style={{ backgroundColor: tag.color }}>
//                             {tag.usageCount ? tag.usageCount : 0}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={(page) => {
//                 fetchTags(page);
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//               }}
//             />
//           </>
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
//                 <div className="color-picker-container" ref={colorPickerRef}>
//                   <div className="color-picker-trigger">
//                     <button
//                       type="button"
//                       className="color-trigger-btn"
//                       onClick={() => setShowColorPicker(!showColorPicker)}
//                     >
//                       <FiDroplet />
//                       <span 
//                         className="selected-color-preview"
//                         style={{ backgroundColor: selectedColor }}
//                       ></span>
//                       <span>انتخاب رنگ</span>
//                     </button>
                    
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

//                   {showColorPicker && (
//                     <div className="chrome-picker-wrapper">
//                       <div className="color-picker-header">
//                         <span>انتخاب رنگ</span>
//                         <button 
//                           type="button"
//                           className="close-picker-btn"
//                           onClick={() => setShowColorPicker(false)}
//                         >
//                           <FiX />
//                         </button>
//                       </div>
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

//       {/* مودال ویرایش تگ */}
//       {showEditModal && (
//         <div className="modal-overlay" onClick={handleCloseEditModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>ویرایش تگ</h2>
//               <button className="close-btn" onClick={handleCloseEditModal}>
//                 <FiX />
//               </button>
//             </div>

//             <form onSubmit={handleEditSubmit}>
//               <div className="form-group">
//                 <label>نام تگ *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={editingTag.name}
//                   onChange={handleEditInputChange}
//                   placeholder="نام تگ را وارد کنید"
//                   required
//                   autoFocus
//                 />
//               </div>

//               <div className="form-group">
//                 <label>توضیحات</label>
//                 <textarea
//                   name="description"
//                   value={editingTag.description}
//                   onChange={handleEditInputChange}
//                   placeholder="توضیحات تگ (اختیاری)"
//                   rows="3"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>انتخاب رنگ</label>
//                 <div className="color-picker-container" ref={editColorPickerRef}>
//                   <div className="color-picker-trigger">
//                     <button
//                       type="button"
//                       className="color-trigger-btn"
//                       onClick={() => setShowEditColorPicker(!showEditColorPicker)}
//                     >
//                       <FiDroplet />
//                       <span 
//                         className="selected-color-preview"
//                         style={{ backgroundColor: editColor }}
//                       ></span>
//                       <span>انتخاب رنگ</span>
//                     </button>
                    
//                     <div className="selected-color-info">
//                       <span>رنگ انتخاب شده:</span>
//                       <div className="color-code-display">
//                         <span 
//                           className="color-preview-small"
//                           style={{ backgroundColor: editColor }}
//                         ></span>
//                         <span className="color-code">{editColor}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {showEditColorPicker && (
//                     <div className="chrome-picker-wrapper">
//                       <div className="color-picker-header">
//                         <span>انتخاب رنگ</span>
//                         <button 
//                           type="button"
//                           className="close-picker-btn"
//                           onClick={() => setShowEditColorPicker(false)}
//                         >
//                           <FiX />
//                         </button>
//                       </div>
//                       <ChromePicker
//                         color={editColor}
//                         onChange={handleEditColorChange}
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
//                   onClick={handleCloseEditModal}
//                   disabled={editLoading}
//                 >
//                   انصراف
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={editLoading}
//                 >
//                   {editLoading ? (
//                     <>
//                       <div className="loading-spinner-small"></div>
//                       در حال ویرایش...
//                     </>
//                   ) : (
//                     <>
//                       <FiSave />
//                       ویرایش تگ
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



import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiDroplet, FiSearch } from 'react-icons/fi';
import Pagination from '../../common/Pagination/Pagination';
import moment from 'moment-jalaali';
import { ChromePicker } from 'react-color';
import { tagservice } from '../../../services/Tag';
import './Tag.css';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TagManagement = () => {
  const [tags, setTags] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [editColor, setEditColor] = useState('#3B82F6');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showEditColorPicker, setShowEditColorPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const colorPickerRef = useRef(null);
  const editColorPickerRef = useRef(null);

  // حالت‌های جدید برای صفحه‌بندی
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(24);

  // داده‌های فرم جدید
  const [newTag, setNewTag] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });

  // داده‌های فرم ویرایش
  const [editingTag, setEditingTag] = useState({
    id: null,
    name: '',
    description: '',
    color: '#3B82F6'
  });

  const convertToJalaali = (dateString) => {
    if (!dateString) return 'تعیین نشده';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        if (typeof dateString === 'string' && dateString.includes('/')) {
          return dateString;
        }
        return 'تاریخ نامعتبر';
      }
      
      return moment(date).format('jYYYY/jMM/jDD');
    } catch (error) {
      console.error('Error converting date:', error);
      return 'تاریخ نامعتبر';
    }
  };

  // بستن color picker وقتی خارج از آن کلیک می‌شود
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
      if (editColorPickerRef.current && !editColorPickerRef.current.contains(event.target)) {
        setShowEditColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // تابع fetchTags با قابلیت جستجو
  const fetchTags = useCallback(async (page = 1, searchValue = '') => {
    setLoading(true);
    try {
      const response = await tagservice.getTags(page, itemsPerPage, searchValue);
      console.log("data", response.data);
      
      setTags(response.data.items || response.data);
      
      setCurrentPage(response.data.currentPage || page);
      setTotalPages(response.data.totalPages || 1);
      setTotalItems(response.data.totalCount || response.data.totalItems || response.data.length);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tags:', error);
      setLoading(false);
    }
  }, [itemsPerPage]);

  useEffect(() => {
    fetchTags(1);
  }, [fetchTags]);

  // مدیریت جستجو با تاخیر (Debounce)
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // پاک کردن تایموت قبلی
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // ایجاد تایموت جدید برای جستجو
    const newTimeout = setTimeout(() => {
      fetchTags(1, value);
    }, 500); // تاخیر 500 میلی‌ثانیه

    setSearchTimeout(newTimeout);
  };

  // پاک کردن تایموت هنگام آنمونت
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  // مدیریت تغییرات فرم افزودن
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTag(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // مدیریت تغییرات فرم ویرایش
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTag(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // مدیریت تغییر رنگ در افزودن
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    setNewTag(prev => ({
      ...prev,
      color: color.hex
    }));
  };

  // مدیریت تغییر رنگ در ویرایش
  const handleEditColorChange = (color) => {
    setEditColor(color.hex);
    setEditingTag(prev => ({
      ...prev,
      color: color.hex
    }));
  };

  // باز کردن مودال ویرایش
  const handleEditTag = (tag) => {
    setEditingTag({
      id: tag.id,
      name: tag.name,
      description: tag.descriptionRows || '',
      color: tag.color
    });
    setEditColor(tag.color);
    setShowEditModal(true);
  };

  // سابمیت فرم ویرایش
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!editingTag.name.trim()) {
      toast.error('لطفا نام تگ را وارد کنید', {
        position: "top-left",
        autoClose: 5000,
      });
      return;
    }

    setEditLoading(true);
    try {
      const tagToUpdate = {
        id: editingTag.id,
        name: editingTag.name,
        desc: editingTag.description,
        color: editingTag.color.replace('#', ''),
      };

      const response = await tagservice.updateTag(tagToUpdate);
      
      // رفرش لیست بعد از ویرایش
      await fetchTags(currentPage, searchTerm);
      
      setShowEditModal(false);
      setEditLoading(false);
      toast.success('تگ با موفقیت ویرایش شد', {
        position: "top-left",
        autoClose: 5000,
      });
      
    } catch (error) {
      console.error('Error updating tag:', error);
      setEditLoading(false);
      toast.error('خطا در ویرایش تگ', {
        position: "top-left",
        autoClose: 5000,
      });
    }
  };

  // سابمیت فرم افزودن
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newTag.name.trim()) {
      toast.error('لطفا نام تگ را وارد کنید', {
        position: "top-left",
        autoClose: 5000,
      });
      return;
    }

    setLoading(true);
    try {
      const tagToAdd = {
        id: 0,
        name: newTag.name,
        desc: newTag.description,
        color: newTag.color.replace('#', ''),
      };

      const response = await tagservice.createTag(tagToAdd);
      toast.success('عملیات با موفقیت انجام شد', {
        position: "top-left",
        autoClose: 5000,
      });
      
      // رفرش لیست بعد از افزودن
      await fetchTags(currentPage, searchTerm);
      
      setNewTag({
        name: '',
        description: '',
        color: '#3B82F6'
      });
      
      setShowAddModal(false);
      setSelectedColor('#3B82F6');
      setShowColorPicker(false);
      setLoading(false);
      
    } catch (error) {
      console.error('Error adding tag:', error);
      setLoading(false);
      toast.error('خطا در اضافه کردن تگ', {
        position: "top-left",
        autoClose: 5000,
      });
    }
  };

  // حذف تگ
  const handleDeleteTag = async (id) => {
    if (window.confirm('آیا از حذف این تگ اطمینان دارید؟')) {
      try {
        await tagservice.deleteTag(id);
        // رفرش لیست بعد از حذف
        await fetchTags(currentPage, searchTerm);
        toast.success('عملیات با موفقیت انجام شد', {
          position: "top-left",
          autoClose: 5000,
        });
      } catch (error) {
        console.error('Error deleting tag:', error);
        toast.error('خطا در حذف تگ', {
          position: "top-left",
          autoClose: 5000,
        });
      }
    }
  };

  // بستن مودال افزودن
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

  // بستن مودال ویرایش
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingTag({
      id: null,
      name: '',
      description: '',
      color: '#3B82F6'
    });
    setEditColor('#3B82F6');
    setShowEditColorPicker(false);
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
      
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* نوار جستجو */}
      <div className="search-container">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="جستجو در تگ‌ها (بر اساس نام، توضیحات یا رنگ)..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => {
                setSearchTerm('');
                fetchTags(1, '');
              }}
            >
              <FiX />
            </button>
          )}
        </div>
        
        {/* اطلاعات جستجو */}
        {searchTerm && (
          <div className="search-info">
            <span>
              در حال جستجو برای: "{searchTerm}"
            </span>
          </div>
        )}
      </div>

      {/* اطلاعات صفحه‌بندی */}
      {!loading && tags.length > 0 && (
        <div className="pagination-info">
          نمایش {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} از {totalItems} تگ
          {searchTerm && ` (نتایج جستجو برای: "${searchTerm}")`}
        </div>
      )}

      {/* گرید تگ‌ها */}
      <div className="tags-grid">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>
              {searchTerm ? 'در حال جستجو...' : 'در حال بارگذاری تگ‌ها...'}
            </p>
          </div>
        ) : tags.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏷️</div>
            <h3>
              {searchTerm ? 'تگی یافت نشد' : 'تگی وجود ندارد'}
            </h3>
            <p>
              {searchTerm 
                ? `هیچ تگی با عبارت "${searchTerm}" یافت نشد`
                : 'برای شروع، اولین تگ را ایجاد کنید'
              }
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <FiPlus />
              افزودن تگ
            </button>
            {searchTerm && (
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setSearchTerm('');
                  fetchTags(1, '');
                }}
                style={{ marginTop: '10px' }}
              >
                نمایش همه تگ‌ها
              </button>
            )}
          </div>
        ) : ( 
          <>
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
                          onClick={() => handleEditTag(tag)}
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
                      <p className="tag-description">{tag.descriptionRows}</p>
                      
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
                          <span className="info-value">{convertToJalaali(tag.createdAt)}</span>
                        </div>
                        <div className="tag-info-item">
                          <span className="info-label">تعداد استفاده:</span>
                          <span className="info-value usage-count" style={{ backgroundColor: tag.color }}>
                            {tag.usageCount ? tag.usageCount : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                fetchTags(page, searchTerm);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
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

      {/* مودال ویرایش تگ */}
      {showEditModal && (
        <div className="modal-overlay" onClick={handleCloseEditModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>ویرایش تگ</h2>
              <button className="close-btn" onClick={handleCloseEditModal}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>نام تگ *</label>
                <input
                  type="text"
                  name="name"
                  value={editingTag.name}
                  onChange={handleEditInputChange}
                  placeholder="نام تگ را وارد کنید"
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>توضیحات</label>
                <textarea
                  name="description"
                  value={editingTag.description}
                  onChange={handleEditInputChange}
                  placeholder="توضیحات تگ (اختیاری)"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>انتخاب رنگ</label>
                <div className="color-picker-container" ref={editColorPickerRef}>
                  <div className="color-picker-trigger">
                    <button
                      type="button"
                      className="color-trigger-btn"
                      onClick={() => setShowEditColorPicker(!showEditColorPicker)}
                    >
                      <FiDroplet />
                      <span 
                        className="selected-color-preview"
                        style={{ backgroundColor: editColor }}
                      ></span>
                      <span>انتخاب رنگ</span>
                    </button>
                    
                    <div className="selected-color-info">
                      <span>رنگ انتخاب شده:</span>
                      <div className="color-code-display">
                        <span 
                          className="color-preview-small"
                          style={{ backgroundColor: editColor }}
                        ></span>
                        <span className="color-code">{editColor}</span>
                      </div>
                    </div>
                  </div>

                  {showEditColorPicker && (
                    <div className="chrome-picker-wrapper">
                      <div className="color-picker-header">
                        <span>انتخاب رنگ</span>
                        <button 
                          type="button"
                          className="close-picker-btn"
                          onClick={() => setShowEditColorPicker(false)}
                        >
                          <FiX />
                        </button>
                      </div>
                      <ChromePicker
                        color={editColor}
                        onChange={handleEditColorChange}
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
                  onClick={handleCloseEditModal}
                  disabled={editLoading}
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={editLoading}
                >
                  {editLoading ? (
                    <>
                      <div className="loading-spinner-small"></div>
                      در حال ویرایش...
                    </>
                  ) : (
                    <>
                      <FiSave />
                      ویرایش تگ
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