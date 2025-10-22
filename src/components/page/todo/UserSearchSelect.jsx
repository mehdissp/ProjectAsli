// import { useState, useEffect, useRef, useCallback } from 'react';
// import userService from '../../../services/user';

// const UserSearchSelect = ({ value, onChange, placeholder = "انتخاب مسئول" }) => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isOpen, setIsOpen] = useState(false);
//   const [pagination, setPagination] = useState({
//     pageNumber: 1,
//     pageSize: 10,
//     totalCount: 0,
//     hasMore: false
//   });
  
//   const dropdownRef = useRef(null);

//   // استفاده از useCallback برای جلوگیری از renderهای بی‌جهت
//   const fetchUsers = useCallback(async (pageNumber = 1, search = '', isNewSearch = false) => {
//     try {
//       setLoading(true);
      
//       const response = await userService.getUsersCombo(pageNumber, pagination.pageSize, search);
//         console.log('میاد')
//       console.log(response)
//       const data = response.data || response;
//       if (pageNumber === 1 ) {
//         setUsers(data.items || data.Items || []);
//       } else {
//         setUsers(prev => [...prev, ...(data.items || data.Items || [])]);
//       }
      
//       setPagination(prev => ({
//         ...prev,
//         pageNumber,
//         totalCount: data.totalCount || data.TotalCount || 0,
//         totalPages: data.totalPages || data.TotalPages || 0,
//         hasMore: pageNumber < (data.totalPages || data.TotalPages || 0)
//       }));
      
//     } catch (error) {
//       console.error('❌ Error fetching users:', error);
//       if (pageNumber === 1) {
//         setUsers([]);
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.pageSize]); // وابستگی‌های تابع

//   // لود اولیه - فقط زمانی که کامپوننت mount می‌شود
//   useEffect(() => {
//     if (isOpen) {
//       fetchUsers(1, '', true);
//     }
//   }, [isOpen, fetchUsers]); // فقط وابسته به isOpen

//   // جستجو با debounce - فقط وقتی dropdown باز است
//   useEffect(() => {
//     if (!isOpen) return;
    
//     const timeoutId = setTimeout(() => {
//       fetchUsers(1, searchTerm, true);
//     }, 500);
    
//     return () => clearTimeout(timeoutId);
//   }, [searchTerm, isOpen, fetchUsers]);

//   // بستن dropdown با کلیک خارج
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//         setSearchTerm(''); // ریست جستجو هنگام بستن
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleScroll = (e) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     if (scrollHeight - scrollTop <= clientHeight + 50 && pagination.hasMore && !loading) {
//       fetchUsers(pagination.pageNumber + 1, searchTerm, false);
//     }
//   };

//   const selectedUser = users.find(user => user.id === value || user.Id === value);

//   return (
//     <div className="user-search-select" ref={dropdownRef}>
//       <div 
//         className="select-input"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {selectedUser ? (
//           <span>{selectedUser.fullname || selectedUser.FullName || selectedUser.username || selectedUser.Username}</span>
//         ) : (
//           <span className="placeholder">{placeholder}</span>
//         )}
//         <span className="arrow">▼</span>
//       </div>
      
//       {isOpen && (
//         <div className="dropdown-menu">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="جستجوی کاربر..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input"
//               autoFocus
//             />
//           </div>
          
//           <div className="dropdown-list" onScroll={handleScroll}>
//             {users.map(user => (
//               <div
//                 key={user.id || user.Id}
//                 className={`dropdown-item ${value === (user.id || user.Id) ? 'selected' : ''}`}
//                 onClick={() => {
//                   onChange(user.id || user.Id);
//                   setIsOpen(false);
//                   setSearchTerm('');
//                 }}
//               >
//                 <div className="user-info">
//                   <div className="user-name">
//                     {user.fullname }
//                   </div>
//                   {/* <div className="user-email">{user.email || user.Email}</div> */}
//                 </div>
//               </div>
//             ))}
            
//             {loading && (
//               <div className="loading">📥 در حال بارگذاری...</div>
//             )}
            
//             {!loading && users.length === 0 && (
//               <div className="no-data">👤 کاربری یافت نشد</div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserSearchSelect;


import { useState, useEffect, useRef, useCallback } from 'react';
import userService from '../../../services/user';
import './UserSearchSelect.css';

const UserSearchSelect = ({ value, onChange, placeholder = "انتخاب مسئول" }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 6, // تعداد کمتر برای نمایش فشرده
    totalCount: 0,
    hasMore: false
  });
  
  const dropdownRef = useRef(null);

  const fetchUsers = useCallback(async (pageNumber = 1, search = '', isNewSearch = false) => {
    try {
      setLoading(true);
      
      const response = await userService.getUsersCombo(pageNumber, pagination.pageSize, search);
      const data = response.data || response;
      
      const items = data.items || data.Items || [];
      const totalCount = data.totalCount || data.TotalCount || 0;
      const totalPages = data.totalPages || data.TotalPages || 0;
      
      if (pageNumber === 1 || isNewSearch) {
        setUsers(items);
      } else {
        setUsers(prev => [...prev, ...items]);
      }
      
      setPagination(prev => ({
        ...prev,
        pageNumber,
        totalCount,
        totalPages,
        hasMore: pageNumber < totalPages
      }));
      
    } catch (error) {
      console.error('Error fetching users:', error);
      if (pageNumber === 1) {
        setUsers([]);
      }
    } finally {
      setLoading(false);
    }
  }, [pagination.pageSize]);

  useEffect(() => {
    if (isOpen) {
      fetchUsers(1, '', true);
    }
  }, [isOpen, fetchUsers]);

  useEffect(() => {
    if (!isOpen) return;
    
    const timeoutId = setTimeout(() => {
      fetchUsers(1, searchTerm, true);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm, isOpen, fetchUsers]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 10 && pagination.hasMore && !loading) {
      fetchUsers(pagination.pageNumber + 1, searchTerm, false);
    }
  };

  const selectedUser = users.find(user => user.id === value || user.Id === value);

  return (
    <div className="user-search-select" ref={dropdownRef}>
      <div 
        className="select-input"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="selected-value">
          {selectedUser ? (
            <span className="user-name">
              {selectedUser.fullname || selectedUser.FullName || selectedUser.username || selectedUser.Username}
            </span>
          ) : (
            <span className="placeholder">{placeholder}</span>
          )}
        </div>
        <span className="arrow">▼</span>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          <div className="search-box">
            <input
              type="text"
              placeholder="جستجو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              autoFocus
            />
          </div>
          
          <div className="dropdown-list" onScroll={handleScroll}>
            {users.map(user => (
              <div
                key={user.id || user.Id}
                className={`dropdown-item ${value === (user.id || user.Id) ? 'selected' : ''}`}
                onClick={() => {
                  onChange(user.id || user.Id);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
              >
                <div className="user-info">
                  <div className="user-name">
                    {user.fullname || user.FullName || user.username || user.Username}
                  </div>
            
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="loading">⏳</div>
            )}
            
            {!loading && users.length === 0 && (
              <div className="no-data">👤</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSearchSelect;