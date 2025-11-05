
// // components/project/Project/UserSelectionModal.jsx
// import React from 'react';
// import { FaTimes, FaCheck, FaUser, FaSearch } from 'react-icons/fa';
// import './TagSelectionModal.css';

// const TagSelectionModal = ({
//   isOpen,
//   onClose,
//   projectName,
//   tags,
//   selectedTags,
//   onTagToggle,
//   onSelectAll,
//   onDeselectAll,
//   onSave,
//   loading,
//   error
// }) => {
//   if (!isOpen) return null;
// console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%',tags)
//   // محاسبه تعداد کاربران انتخاب شده بر اساس isCheck
//   const selectedCount = tags.filter(tags => tags.isCheck).length;

//   return (
//     <div className="modal-overlay">
//       <div className="user-selection-modal">
//         {/* Header */}
//         <div className="modal-header">
//           <h2>
//             <FaUser className="header-icon" />
      
//           </h2>
//           <button className="close-btn" onClick={onClose}>
//             <FaTimes />
//           </button>
//         </div>

//         {/* Project Info */}
//         <div className="project-info-section">
//           <h3>پروژه: {projectName}</h3>
//           <p>کاربران تگ ها برای دسترسی به این پروژه را انتخاب کنید</p>
//         </div>

//         {/* Actions */}
//         <div className="selection-actions">
//           <div className="selected-count">
//             <FaCheck />
//             {selectedCount} تعداد تگ مجاز برای پروژه
//           </div>
//           <div className="selection-buttons">
//             <button 
//               className="btn btn-outline"
//               onClick={onSelectAll}
//               disabled={loading}
//             >
//               انتخاب همه
//             </button>
//             <button 
//               className="btn btn-outline"
//               onClick={onDeselectAll}
//               disabled={loading}
//             >
//               لغو همه
//             </button>
//           </div>
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="error-banner">
//             <span className="error-icon">⚠️</span>
//             {error}
//           </div>
//         )}

//         {/* Users Grid */}
//         <div className="users-grid-container">
//           <div className="users-grid">
//             {tags.length === 0 ? (
//               <div className="no-users">
//                 <FaUser className="no-users-icon" />
//                 <p>هیچ تگی یافت نشد</p>
//               </div>
//             ) : (
//               tags.map(user => (
//                 <div 
//                   key={user.id} 
//                   className={`usercard ${user.isCheck ? 'selected' : ''}`}
//                                   style={{ backgroundColor: user.color }}
//                   onClick={() => onTagToggle(user.id, !user.isCheck)}
//                 >
//                   <div className="user-checkbox">
//                     <input
//                       type="checkbox"
//                       checked={user.isCheck || false}
//                       onChange={() => onTagToggle(user.id, !user.isCheck)}
//                       id={`user-${user.id}`}
//                     />
//                     <label htmlFor={`user-${user.id}`}></label>
//                   </div>
                  
//                   <div className="user-info"
         
//                   >

//                     <div className="user-username"
                
//                      >
//                       {user.tagName}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="modal-footer">
//           <button 
//             className="btn btn-secondary"
//             onClick={onClose}
//             disabled={loading}
//           >
//             انصراف
//           </button>
//           <button 
//             className="btn btn-primary"
//             onClick={onSave}
//             disabled={loading || tags.length === 0}
//           >
//             {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TagSelectionModal;


import React, { useState, useEffect } from 'react';
import { FaTimes, FaCheck, FaTag, FaSearch } from 'react-icons/fa';
import './TagSelectionModal.css';

const TagSelectionModal = ({
  isOpen,
  onClose,
  projectName,
  tags = [],
  selectedTags = new Set(),
  onTagToggle,
  onSelectAll,
  onDeselectAll,
  onSave,
  loading = false,
  error = null
}) => {
  const [localTags, setLocalTags] = useState([]);
  const [localSelectedTags, setLocalSelectedTags] = useState(new Set());

  // وقتی tags از props عوض شد، state داخلی را آپدیت کن
  useEffect(() => {
    if (tags && tags.length > 0) {
      setLocalTags(tags);
      
      // ایجاد Set از تگ‌های انتخاب شده بر اساس isCheck
      const selected = new Set();
      tags.forEach(tag => {
        if (tag.isCheck) {
          selected.add(tag.id);
        }
      });
      setLocalSelectedTags(selected);
    }
  }, [tags]);

  // مدیریت کلیک روی تگ
  const handleTagClick = (tagId) => {
    const newSelectedTags = new Set(localSelectedTags);
    
    if (newSelectedTags.has(tagId)) {
      newSelectedTags.delete(tagId);
    } else {
      newSelectedTags.add(tagId);
    }
    
    setLocalSelectedTags(newSelectedTags);
    
    // آپدیت localTags برای تغییر isCheck
    setLocalTags(prevTags => 
      prevTags.map(tag => 
        tag.id === tagId 
          ? { ...tag, isCheck: !tag.isCheck }
          : tag
      )
    );
    
    // فراخوانی تابع callback اگر وجود دارد
    if (onTagToggle) {
      onTagToggle(tagId, !localSelectedTags.has(tagId));
    }
  };

  // انتخاب همه تگ‌ها
  const handleSelectAll = () => {
    const allTagIds = new Set(localTags.map(tag => tag.id));
    setLocalSelectedTags(allTagIds);
    
    // آپدیت isCheck در همه تگ‌ها
    setLocalTags(prevTags => 
      prevTags.map(tag => ({ ...tag, isCheck: true }))
    );
    
    if (onSelectAll) {
      onSelectAll();
    }
  };

  // لغو انتخاب همه تگ‌ها
  const handleDeselectAll = () => {
    setLocalSelectedTags(new Set());
    
    // آپدیت isCheck در همه تگ‌ها
    setLocalTags(prevTags => 
      prevTags.map(tag => ({ ...tag, isCheck: false }))
    );
    
    if (onDeselectAll) {
      onDeselectAll();
    }
  };

  // ذخیره تغییرات
  const handleSave = () => {
    if (onSave) {
      onSave();
    }
  };

  if (!isOpen) return null;

  console.log('تگ‌های فعلی:', localTags);
  console.log('تگ‌های انتخاب شده:', localSelectedTags);

  // محاسبه تعداد تگ‌های انتخاب شده
  const selectedCount = localSelectedTags.size;
  return (
    <div className="modal-overlay">
      <div className="user-selection-modal">
        {/* Header */}
        <div className="modal-header">
          <h2>
            <FaTag className="header-icon" />
            مدیریت تگ‌های پروژه
          </h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Project Info */}
        <div className="project-info-section">
          <h3>پروژه: {projectName}</h3>
          <p>تگ‌های مجاز برای این پروژه را انتخاب کنید</p>
        </div>

        {/* Actions */}
        <div className="selection-actions">
          <div className="selected-count">
            <FaCheck />
            {selectedCount} تگ انتخاب شده از {(tags || []).length}
          </div>
          <div className="selection-buttons">
             <button 
              className="btn btn-outline"
              onClick={handleSelectAll}
              disabled={loading || localTags.length === 0}
            >
              انتخاب همه
            </button>
            <button 
              className="btn btn-outline"
              onClick={handleDeselectAll}
              disabled={loading || selectedCount === 0}
            >
              لغو همه
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {/* Tags Grid */}
        <div className="users-grid-container">
          <div className="users-grid">
            {(tags || []).length === 0 ? (
              <div className="no-users">
                <FaTag className="no-users-icon" />
                <p>هیچ تگی یافت نشد</p>
              </div>
            ) : (
              (localTags || []).map(tag => (
                <div 
                  key={tag.id} 
                  className={`usercard ${tag.isCheck ? 'selected' : ''}`}
                               onChange={() => handleTagClick(tag.id)}
                  style={{ 
                    // backgroundColor: tag.color || '#667eea',
                    borderColor: tag.color || '#667eea',
        '--tag-color': tag.color || '#667eea'
                  }}
                  onClick={() =>  handleTagClick(tag.id)}
                >
                  <div className="user-checkbox">
                    <input
                      type="checkbox"
                      checked={tag.isCheck || false}
                       onChange={() => handleTagClick(tag.id)}
                           onClick={(e) => e.stopPropagation()}
                      id={`tag-${tag.id}`}
                    />
                        <label htmlFor={`tag-${tag.id}`}></label>
                  </div>
                  
                  <div className="user-info">
                    <div className="user-username"
                               style={{ 
                   
        '--tag-color': tag.color || '#667eea'
                  }}
                    >
                      {tag.tagName || tag.name || 'بدون نام'}
                    </div>
                   
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button 
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            انصراف
          </button>
          <button 
            className="btn btn-primary"
            onClick={onSave}
            disabled={loading || (tags || []).length === 0}
          >
            {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
          </button>
        </div>
      </div>
    </div>
  );
};

// تابع کمکی برای تشخیص رنگ متن مناسب بر اساس رنگ پس‌زمینه
const getContrastColor = (hexcolor) => {
  // اگر hexcolor تعریف نشده باشد
  if (!hexcolor) return '#000000';
  
  // حذف # از ابتدا
  const hex = hexcolor.replace('#', '');
  
  // تبدیل به RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // محاسبه روشنایی
  const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
  // اگر روشن باشد متن سیاه، اگر تیره باشد متن سفید
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

export default TagSelectionModal;