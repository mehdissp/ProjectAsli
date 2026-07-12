// import React, { useState, useEffect } from 'react';
// import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
// import './BookmarkIcon.css';

// const BookmarkIcon = ({ propertyId, onToggle }) => {
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     checkBookmark();
//   }, [propertyId]);

//   const checkBookmark = async () => {
//     try {
//       const token = localStorage.getItem('auth_token');
//       const response = await fetch(
//         `https://localhost:7178/api/Bookmark/CheckBookmark?propertyId=${propertyId}`,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.ok) {
//         const result = await response.json();
//         setIsBookmarked(result.data !== null);
//       }
//     } catch (error) {
//       console.error('Error checking bookmark:', error);
//     }
//   };

//   const handleToggle = (e) => {
//     e.stopPropagation();
//     setLoading(true);
//     // اینجا فقط وضعیت بوکمارک رو عوض میکنیم، مودال اصلی کار ذخیره رو انجام میده
//     setIsBookmarked(!isBookmarked);
//     if (onToggle) {
//       onToggle(propertyId);
//     }
//     setLoading(false);
//   };

//   return (
//     <button 
//       className={`bookmark-icon-btn ${isBookmarked ? 'active' : ''}`}
//       onClick={handleToggle}
//       disabled={loading}
//       title={isBookmarked ? 'حذف از بوکمارک' : 'افزودن به بوکمارک'}
//     >
//       {loading ? (
//         <span className="bookmark-loading">⏳</span>
//       ) : isBookmarked ? (
//         <FaBookmark className="bookmark-icon filled" />
//       ) : (
//         <FaRegBookmark className="bookmark-icon empty" />
//       )}
//     </button>
//   );
// };

// export default BookmarkIcon;

import React, { useState, useEffect } from 'react';
import { FaBookmark, FaTimes, FaSave, FaTrash, FaStickyNote } from 'react-icons/fa';
import './BookmarkModal.css';

const BookmarkModal = ({ isOpen, onClose, property, onBookmarkSaved, onBookmarkDeleted }) => {
  const [note, setNote] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [existingNote, setExistingNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);

  // بررسی بوکمارک موجود
  useEffect(() => {
    if (isOpen && property) {
      checkBookmark();
    }
  }, [isOpen, property]);

  const checkBookmark = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(
        `https://localhost:7178/api/Bookmark/CheckBookmark?propertyId=${property.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          setIsBookmarked(true);
          setBookmarkId(result.data.id);
          setNote(result.data.note || '');
          setExistingNote(result.data.note || '');
        } else {
          setIsBookmarked(false);
          setNote('');
          setExistingNote('');
          setBookmarkId(null);
        }
      }
    } catch (error) {
      console.error('Error checking bookmark:', error);
    }
  };

  const handleSaveBookmark = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      
      const url = isBookmarked 
        ? `https://localhost:7178/api/Bookmark/UpdateBookmark/${bookmarkId}`
        : 'https://localhost:7178/api/Bookmark/CreateBookmark';
      
      const method = isBookmarked ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          propertyId: property.id,
          note: note
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === 200) {
          setIsBookmarked(true);
          if (onBookmarkSaved) {
            onBookmarkSaved(property.id, note);
          }
          onClose();
        }
      }
    } catch (error) {
      console.error('Error saving bookmark:', error);
      alert('خطا در ذخیره بوکمارک');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBookmark = async () => {
    if (!window.confirm('آیا از حذف این بوکمارک اطمینان دارید؟')) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(
        `https://localhost:7178/api/Bookmark/DeleteBookmark/${bookmarkId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        setIsBookmarked(false);
        setNote('');
        setExistingNote('');
        setBookmarkId(null);
        if (onBookmarkDeleted) {
          onBookmarkDeleted(property.id);
        }
        onClose();
      }
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      alert('خطا در حذف بوکمارک');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !property) return null;

  return (
    <div className="bookmark-modal-overlay" onClick={onClose}>
      <div className="bookmark-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="bookmark-modal-header">
          <div className="header-icon">
            <FaBookmark className={isBookmarked ? 'bookmarked' : ''} />
          </div>
          <h3>{isBookmarked ? 'ویرایش بوکمارک' : 'افزودن به بوکمارک'}</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="bookmark-modal-body">
          <div className="property-info">
            <h4 className="property-title">{property.title}</h4>
            <div className="property-meta">
              <span>{property.categoryName}</span>
              <span>•</span>
              <span>{property.regionName}</span>
            </div>
          </div>

          <div className="note-section">
            <div className="note-label">
              <FaStickyNote className="note-icon" />
              <span>یادداشت</span>
              <span className="note-char-count">{note.length}/500</span>
            </div>
            <textarea
              className="note-textarea"
              placeholder="یادداشت خود را در مورد این ملک بنویسید..."
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 500))}
              maxLength={500}
              rows={5}
            />
            {isBookmarked && existingNote && (
              <div className="previous-note">
                <small>یادداشت قبلی:</small>
                <p>{existingNote}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bookmark-modal-footer">
          {isBookmarked && (
            <button 
              className="delete-btn"
              onClick={handleDeleteBookmark}
              disabled={loading}
            >
              <FaTrash />
              حذف بوکمارک
            </button>
          )}
          <button 
            className="save-btn"
            onClick={handleSaveBookmark}
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner">⏳</span>
            ) : (
              <>
                <FaSave />
                {isBookmarked ? 'به‌روزرسانی' : 'ذخیره'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkModal;