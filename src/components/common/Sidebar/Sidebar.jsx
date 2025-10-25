// // // import React from 'react';
// // // import { NavLink, useLocation } from 'react-router-dom';
// // // import { useAuth } from '../../../context/AuthContext';
// // // import './Sidebar.css';

// // // const Sidebar = ({ isOpen, onClose }) => {
// // //   const { menus, user, logout } = useAuth();
// // //   const location = useLocation();

// // //   const renderMenuItems = (menuItems, level = 0) => {
// // //        console.log(menuItems)
// // //     return menuItems.map((item) => (
// // //       <div key={item.id} className={`menu-item level-${level}`}>
// // //         {item.children && item.children.length > 0 ? (
// // //           <MenuGroup item={item} level={level} />
// // //         ) : (
// // //           <NavLink
// // //             to={item.path}
// // //             className={({ isActive }) => 
// // //               `menu-link ${isActive ? 'active' : ''}`
// // //             }
// // //             onClick={onClose}
// // //           >
// // //             <span className="menu-icon">{item.icon || '📄'}</span>
// // //             <span className="menu-text">{item.label}</span>
// // //             <div className="active-indicator"></div>
// // //           </NavLink>
// // //         )}
// // //       </div>
// // //     ));
// // //   };

// // //   const MenuGroup = ({ item, level }) => {
// // //     const [isExpanded, setIsExpanded] = React.useState(false);

// // //     return (
// // //       <div className="menu-group">
// // //         <div 
// // //           className="menu-header"
// // //           onClick={() => setIsExpanded(!isExpanded)}
// // //         >
// // //           <span className="menu-icon">{item.icon || '📁'}</span>
// // //           <span className="menu-text">{item.title}</span>
// // //           <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
// // //             ▼
// // //           </span>
// // //         </div>
        
// // //         <div className={`submenu ${isExpanded ? 'expanded' : ''}`}>
         
// // //           {renderMenuItems(item.lebal, level + 1)}
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <>
// // //       <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
// // //         <div className="sidebar-header">
// // //           <div className="logo">
// // //             <div className="logo-icon">🚀</div>
// // //             <span className="logo-text">سیستم مدیریت</span>
// // //           </div>
// // //           <button 
// // //             className="sidebar-close"
// // //             onClick={onClose}
// // //             aria-label="بستن منو"
// // //           >
// // //             ✕
// // //           </button>
// // //         </div>

// // //         <div className="user-info">
// // //           <div className="user-avatar">
// // //             {user?.name?.charAt(0) || 'U'}
// // //           </div>
// // //           <div className="user-details">
// // //             <div className="user-name">{user?.username || 'کاربر'}</div>
// // //             <div className="user-role">{user?.role || 'مدیر سیستم'}</div>
// // //           </div>
// // //         </div>

// // //         <nav className="sidebar-nav">
// // //           <div className="nav-section">
// // //             <div className="section-label">منوی اصلی</div>
// // //             {renderMenuItems(menus)}
// // //           </div>
// // //         </nav>

// // //         <div className="sidebar-footer">
// // //           <button 
// // //             onClick={logout}
// // //             className="logout-btn btn btn-secondary"
// // //           >
// // //             <span className="logout-icon">🚪</span>
// // //             خروج
// // //           </button>
// // //         </div>
// // //       </aside>
// // //     </>
// // //   );
// // // };

// // // export default Sidebar;

// // import React from 'react';
// // import { NavLink, useLocation } from 'react-router-dom';
// // import { useAuth } from '../../../context/AuthContext';
// // import { 
// //   FaPencilAlt, 
// //   FaHome, 
// //   FaProjectDiagram, 
// //   FaFile,
// //   FaFolder,
// //   FaRocket,
// //   FaSignOutAlt,
// //   FaTimes,FaUser
// // } from 'react-icons/fa';
// // import { BiSolidDashboard,BiLogoWindows   } from "react-icons/bi";
// // import './Sidebar.css';

// // // مپینگ آیکون‌های string به کامپوننت‌های React
// // const iconComponents = {
// //   BiSolidDashboard: BiSolidDashboard,
// //   FaHome: FaHome,
// //   FaUser:FaUser,
// //   BiLogoWindows: BiLogoWindows,
// //   FaFile: FaFile,
// //   FaFolder: FaFolder,
// //   FaRocket: FaRocket,
// //   FaSignOutAlt: FaSignOutAlt,
// //   FaTimes: FaTimes,
// //   // اضافه کردن سایر آیکون‌ها
// // };

// // const Sidebar = ({ isOpen, onClose }) => {
// //   const { menus, user, logout } = useAuth();
// //   const location = useLocation();

// //   // تابع helper برای رندر آیکون
// //   const renderIcon = (iconName) => {
// //     if (!iconName) return <FaFile />;
    
// //     const IconComponent = iconComponents[iconName];
// //     if (IconComponent) {
// //       return <IconComponent />;
// //     }
    
// //     // اگر آیکون شناخته شده نیست، به عنوان متن نمایش بده
// //     return <span>{iconName}</span>;
// //   };

// //   const renderMenuItems = (menuItems, level = 0) => {
// //     return menuItems.map((item) => (
// //       <div key={item.id} className={`menu-item level-${level}`}>
// //         {item.children && item.children.length > 0 ? (
// //           <MenuGroup item={item} level={level} />
// //         ) : (
// //           <NavLink
// //             to={item.path}
// //             className={({ isActive }) => 
// //               `menu-link ${isActive ? 'active' : ''}`
// //             }
// //             onClick={onClose}
// //           >
// //             <span className="menu-icon">
// //               {renderIcon(item.icon)}
// //             </span>
// //             <span className="menu-text">{item.label}</span>
// //             <div className="active-indicator"></div>
// //           </NavLink>
// //         )}
// //       </div>
// //     ));
// //   };

// //   const MenuGroup = ({ item, level }) => {
// //     const [isExpanded, setIsExpanded] = React.useState(false);

// //     return (
// //       <div className="menu-group">
// //         <div 
// //           className="menu-header"
// //           onClick={() => setIsExpanded(!isExpanded)}
// //         >
// //           <span className="menu-icon">
// //             {renderIcon(item.icon)}
// //           </span>
// //           <span className="menu-text">{item.title}</span>
// //           <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
// //             ▼
// //           </span>
// //         </div>
        
// //         <div className={`submenu ${isExpanded ? 'expanded' : ''}`}>
// //           {renderMenuItems(item.lebal, level + 1)}
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <>
// //       <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
// //         <div className="sidebar-header">
// //           <div className="logo">
// //             <div className="logo-icon">
// //               <FaRocket />
// //             </div>
// //             <span className="logo-text">سیستم مدیریت</span>
// //           </div>
// //           <button 
// //             className="sidebar-close"
// //             onClick={onClose}
// //             aria-label="بستن منو"
// //           >
// //             <FaTimes />
// //           </button>
// //         </div>

// //         <div className="user-info">
// //           <div className="user-avatar">
// //             {user?.name?.charAt(0) || 'U'}
// //           </div>
// //           <div className="user-details">
// //             <div className="user-name">{user?.username || 'کاربر'}</div>
// //             <div className="user-role">{user?.role || 'مدیر سیستم'}</div>
// //           </div>
// //         </div>

// //         <nav className="sidebar-nav">
// //           <div className="nav-section">
// //             <div className="section-label">منوی اصلی</div>
// //             {renderMenuItems(menus)}
// //           </div>
// //         </nav>

// //         <div className="sidebar-footer">
// //           <button 
// //             onClick={logout}
// //             className="logout-btn btn btn-secondary"
// //           >
// //             <span className="logout-icon">
// //               <FaSignOutAlt />
// //             </span>
// //             خروج
// //           </button>
// //         </div>
// //       </aside>
// //     </>
// //   );
// // };

// // export default Sidebar;



// // import React, { useState, useEffect } from 'react';
// // import { NavLink, useLocation } from 'react-router-dom';
// // import { useAuth } from '../../../context/AuthContext';
// // import { 
// //   FaPencilAlt, 
// //   FaHome, 
// //   FaProjectDiagram, 
// //   FaFile,
// //   FaFolder,
// //   FaRocket,
// //   FaSignOutAlt,
// //   FaTimes,
// //   FaUser,
// //   FaChevronDown,
// //   FaChevronRight
// // } from 'react-icons/fa';
// // import { BiSolidDashboard, BiLogoWindows } from "react-icons/bi";
// // import './Sidebar.css';

// // // مپینگ آیکون‌های string به کامپوننت‌های React
// // const iconComponents = {
// //   BiSolidDashboard: BiSolidDashboard,
// //   FaHome: FaHome,
// //   FaUser: FaUser,
// //   BiLogoWindows: BiLogoWindows,
// //   FaFile: FaFile,
// //   FaFolder: FaFolder,
// //   FaRocket: FaRocket,
// //   FaSignOutAlt: FaSignOutAlt,
// //   FaTimes: FaTimes,
// //   // اضافه کردن سایر آیکون‌ها
// // };

// // const Sidebar = ({ isOpen, onClose }) => {
// //   const { menus, user, logout } = useAuth();
// //   const location = useLocation();
// //   const [expandedGroups, setExpandedGroups] = useState({});

// //   // تابع helper برای رندر آیکون
// //   const renderIcon = (iconName) => {
// //     if (!iconName) return <FaFile />;
    
// //     const IconComponent = iconComponents[iconName];
// //     if (IconComponent) {
// //       return <IconComponent />;
// //     }
    
// //     // اگر آیکون شناخته شده نیست، به عنوان متن نمایش بده
// //     return <span>{iconName}</span>;
// //   };

// //   // مدیریت باز و بسته شدن منوهای گروهی
// //   const toggleGroup = (groupId) => {
// //     setExpandedGroups(prev => ({
// //       ...prev,
// //       [groupId]: !prev[groupId]
// //     }));
// //   };

// //   const renderMenuItems = (menuItems, level = 0) => {
// //     return menuItems.map((item) => (
// //       <div key={item.id} className={`menu-item level-${level}`}>
// //         {item.children && item.children.length > 0 ? (
// //           <MenuGroup item={item} level={level} />
// //         ) : (
// //           <NavLink
// //             to={item.path}
// //             className={({ isActive }) => 
// //               `menu-link ${isActive ? 'active' : ''}`
// //             }
// //             onClick={onClose}
// //           >
// //             <span className="menu-icon">
// //               {renderIcon(item.icon)}
// //             </span>
// //             <span className="menu-text">{item.label}</span>
// //             <div className="active-indicator"></div>
// //           </NavLink>
// //         )}
// //       </div>
// //     ));
// //   };

// //   const MenuGroup = ({ item, level }) => {
// //     const isExpanded = expandedGroups[item.id] || false;

// //     return (
// //       <div className="menu-group">
// //         <div 
// //           className="menu-header"
// //           onClick={() => toggleGroup(item.id)}
// //         >
// //           <span className="menu-icon">
// //             {renderIcon(item.icon)}
// //           </span>
// //           <span className="menu-text">{item.title}</span>
// //           <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
// //             {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
// //           </span>
// //         </div>
        
// //         <div className={`submenu ${isExpanded ? 'expanded' : ''}`}>
// //           {renderMenuItems(item.children || item.lebal || [], level + 1)}
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <>
// //       <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
// //         <div className="sidebar-header">
// //           <div className="logo">
// //             <div className="logo-icon">
// //               <FaRocket />
// //             </div>
// //             <span className="logo-text">سیستم مدیریت</span>
// //           </div>
// //           <button 
// //             className="sidebar-close"
// //             onClick={onClose}
// //             aria-label="بستن منو"
// //           >
// //             <FaTimes />
// //           </button>
// //         </div>

// //         <div className="user-info">
// //           <div className="user-avatar">
// //             {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
// //           </div>
// //           <div className="user-details">
// //             <div className="user-name">{user?.username || 'کاربر'}</div>
// //             <div className="user-role">{user?.role || 'مدیر سیستم'}</div>
// //           </div>
// //         </div>

// //         <nav className="sidebar-nav">
// //           <div className="nav-section">
// //             <div className="section-label">منوی اصلی</div>
// //             {renderMenuItems(menus)}
// //           </div>
// //         </nav>

// //         <div className="sidebar-footer">
// //           <div className="current-time">
// //             {new Date().toLocaleTimeString('fa-IR', { 
// //               hour: '2-digit', 
// //               minute: '2-digit',
// //               hour12: true 
// //             })}
// //           </div>
// //           <button 
// //             onClick={logout}
// //             className="logout-btn"
// //           >
// //             <span className="logout-icon">
// //               <FaSignOutAlt />
// //             </span>
// //             خروج از سیستم
// //           </button>
// //         </div>
// //       </aside>
      
// //       {/* Overlay برای موبایل */}
// //       {isOpen && (
// //         <div 
// //           className="sidebar-overlay"
// //           onClick={onClose}
// //         />
// //       )}
// //     </>
// //   );
// // };

// // export default Sidebar;

// import React, { useState, useEffect } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import { useAuth } from '../../../context/AuthContext';
// import { 
//   FaPencilAlt, 
//   FaHome, 
//   FaProjectDiagram, 
//   FaFile,
//   FaFolder,
//   FaRocket,
//   FaSignOutAlt,
//   FaTimes,
//   FaUser,
//   FaChevronDown,
//   FaChevronRight
// } from 'react-icons/fa';
// import { BiSolidDashboard, BiLogoWindows } from "react-icons/bi";
// import './Sidebar.css';

// // مپینگ آیکون‌های string به کامپوننت‌های React
// const iconComponents = {
//   BiSolidDashboard: BiSolidDashboard,
//   FaHome: FaHome,
//   FaUser: FaUser,
//   BiLogoWindows: BiLogoWindows,
//   FaFile: FaFile,
//   FaFolder: FaFolder,
//   FaRocket: FaRocket,
//   FaSignOutAlt: FaSignOutAlt,
//   FaTimes: FaTimes,
//   // اضافه کردن سایر آیکون‌ها
// };

// const Sidebar = ({ isOpen, onClose }) => {
//   const { menus, user, logout } = useAuth();
//   const location = useLocation();
//   const [expandedGroups, setExpandedGroups] = useState({});

//   // تابع helper برای رندر آیکون
//   const renderIcon = (iconName) => {
//     if (!iconName) return <FaFile />;
    
//     const IconComponent = iconComponents[iconName];
//     if (IconComponent) {
//       return <IconComponent />;
//     }
    
//     // اگر آیکون شناخته شده نیست، به عنوان متن نمایش بده
//     return <span>{iconName}</span>;
//   };

//   // مدیریت باز و بسته شدن منوهای گروهی
//   const toggleGroup = (groupId) => {
//     setExpandedGroups(prev => ({
//       ...prev,
//       [groupId]: !prev[groupId]
//     }));
//   };

//   const renderMenuItems = (menuItems, level = 0) => {
//     return menuItems.map((item) => (
//       <div key={item.id} className={`menu-item level-${level}`}>
//         {item.children && item.children.length > 0 ? (
//           <MenuGroup item={item} level={level} />
//         ) : (
//           <NavLink
//             to={item.path}
//             className={({ isActive }) => 
//               `menu-link ${isActive ? 'active' : ''}`
//             }
//             onClick={onClose}
//           >
//             <span className="menu-icon">
//               {renderIcon(item.icon)}
//             </span>
//             <span className="menu-text">{item.label}</span>
//             <div className="active-indicator"></div>
//           </NavLink>
//         )}
//       </div>
//     ));
//   };

//   const MenuGroup = ({ item, level }) => {
//     const isExpanded = expandedGroups[item.id] || false;

//     return (
//       <div className="menu-group">
//         <div 
//           className="menu-header"
//           onClick={() => toggleGroup(item.id)}
//         >
//           <span className="menu-icon">
//             {renderIcon(item.icon)}
//           </span>
//           <span className="menu-text">{item.title}</span>
//           <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
//             {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
//           </span>
//         </div>
        
//         <div className={`submenu ${isExpanded ? 'expanded' : ''}`}>
//           {renderMenuItems(item.children || item.lebal || [], level + 1)}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
//         <div className="sidebar-header">
//           <div className="logo">
//             <div className="logo-icon">
//               <FaRocket />
//             </div>
//             <span className="logo-text">سیستم مدیریت</span>
//           </div>
//           <button 
//             className="sidebar-close"
//             onClick={onClose}
//             aria-label="بستن منو"
//           >
//             <FaTimes />
//           </button>
//         </div>

//         {/* بخش کاربر - فاصله کاهش یافته */}
//         <div className="user-info-compact">
//           <div className="user-avatar-compact">
//             {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
//           </div>
//           <div className="user-details-compact">
//             <div className="user-name-compact">{user?.username || 'کاربر'}</div>
//             <div className="user-role-compact">{user?.role || 'مدیر سیستم'}</div>
//           </div>
//         </div>

//         <nav className="sidebar-nav">
//           <div className="nav-section">
//             <div className="section-label">منوی اصلی</div>
//             {renderMenuItems(menus)}
//           </div>
//         </nav>

//         <div className="sidebar-footer">
//           <div className="current-time">
//             {new Date().toLocaleTimeString('fa-IR', { 
//               hour: '2-digit', 
//               minute: '2-digit',
//               hour12: true 
//             })}
//           </div>
//           <button 
//             onClick={logout}
//             className="logout-btn"
//           >
//             <span className="logout-icon">
//               <FaSignOutAlt />
//             </span>
//             خروج از سیستم
//           </button>
//         </div>
//       </aside>
      
//       {/* Overlay برای موبایل */}
//       {isOpen && (
//         <div 
//           className="sidebar-overlay"
//           onClick={onClose}
//         />
//       )}
//     </>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import { useAuth } from '../../../context/AuthContext';
// import { 
//   FaPencilAlt, 
//   FaHome, 
//   FaProjectDiagram, 
//   FaFile,
//   FaFolder,
//   FaRocket,
//   FaSignOutAlt,
//   FaTimes,
//   FaUser,
//   FaChevronDown,
//   FaChevronRight,
//   FaCog,
//   FaChartBar,
//   FaDatabase,
//   FaShieldAlt
// } from 'react-icons/fa';
// import { BiSolidDashboard, BiLogoWindows } from "react-icons/bi";
// import './Sidebar.css';

// // مپینگ آیکون‌های string به کامپوننت‌های React
// const iconComponents = {
//   BiSolidDashboard: BiSolidDashboard,
//   FaHome: FaHome,
//   FaUser: FaUser,
//   BiLogoWindows: BiLogoWindows,
//   FaFile: FaFile,
//   FaFolder: FaFolder,
//   FaRocket: FaRocket,
//   FaSignOutAlt: FaSignOutAlt,
//   FaTimes: FaTimes,
//   FaCog: FaCog,
//   FaChartBar: FaChartBar,
//   FaDatabase: FaDatabase,
//   FaShieldAlt: FaShieldAlt,
//   // اضافه کردن سایر آیکون‌ها
// };

// const Sidebar = ({ isOpen, onClose }) => {
//   const { menus, user, logout } = useAuth();
//   const location = useLocation();
//   const [expandedGroups, setExpandedGroups] = useState({});

//   // تابع helper برای رندر آیکون
//   const renderIcon = (iconName) => {
//     if (!iconName) return <FaFile />;
    
//     const IconComponent = iconComponents[iconName];
//     if (IconComponent) {
//       return <IconComponent />;
//     }
    
//     // اگر آیکون شناخته شده نیست، به عنوان متن نمایش بده
//     return <span>{iconName}</span>;
//   };

//   // مدیریت باز و بسته شدن منوهای گروهی
//   const toggleGroup = (groupId) => {
//     setExpandedGroups(prev => ({
//       ...prev,
//       [groupId]: !prev[groupId]
//     }));
//   };

//   const renderMenuItems = (menuItems, level = 0) => {
//     return menuItems.map((item) => (
//       <div key={item.id} className={`menu-item level-${level}`}>
//         {item.children && item.children.length > 0 ? (
//           <MenuGroup item={item} level={level} />
//         ) : (
//           <NavLink
//             to={item.path}
//             className={({ isActive }) => 
//               `menu-link ${isActive ? 'active' : ''}`
//             }
//             onClick={onClose}
//           >
//             <span className="menu-icon">
//               {renderIcon(item.icon)}
//             </span>
//             <span className="menu-text">{item.label}</span>
//             <div className="active-indicator"></div>
//           </NavLink>
//         )}
//       </div>
//     ));
//   };

//   const MenuGroup = ({ item, level }) => {
//     const isExpanded = expandedGroups[item.id] || false;

//     return (
//       <div className="menu-group">
//         <div 
//           className="menu-header"
//           onClick={() => toggleGroup(item.id)}
//         >
//           <span className="menu-icon">
//             {renderIcon(item.icon)}
//           </span>
//           <span className="menu-text">{item.title}</span>
//           <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
//             {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
//           </span>
//         </div>
        
//         <div className={`submenu ${isExpanded ? 'expanded' : ''}`}>
//           {renderMenuItems(item.children || item.lebal || [], level + 1)}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <aside className={`sidebar black-theme ${isOpen ? 'open' : ''}`}>
//         <div className="sidebar-header">
//           <div className="logo">
//             <div className="logo-icon">
//               <FaRocket />
//             </div>
//             <span className="logo-text">سیستم مدیریت</span>
//           </div>
//           <button 
//             className="sidebar-close"
//             onClick={onClose}
//             aria-label="بستن منو"
//           >
//             <FaTimes />
//           </button>
//         </div>

//         {/* بخش کاربر کامپکت */}
//         <div className="user-info-compact">
//           <div className="user-avatar-compact">
//             {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
//           </div>
//           <div className="user-details-compact">
//             <div className="user-name-compact">{user?.username || 'کاربر'}</div>
//             <div className="user-role-compact">{user?.role || 'مدیر سیستم'}</div>
//           </div>
//         </div>

//         <nav className="sidebar-nav">
//           <div className="nav-section">
//             <div className="section-label">منوی اصلی</div>
//             {renderMenuItems(menus)}
//           </div>
//         </nav>

//         <div className="sidebar-footer">
//           <div className="current-time">
//             {new Date().toLocaleTimeString('fa-IR', { 
//               hour: '2-digit', 
//               minute: '2-digit',
//               hour12: true 
//             })}
//           </div>
//           <button 
//             onClick={logout}
//             className="logout-btn"
//           >
//             <span className="logout-icon">
//               <FaSignOutAlt />
//             </span>
//             خروج از سیستم
//           </button>
//         </div>
//       </aside>
      
//       {/* Overlay برای موبایل */}
//       {isOpen && (
//         <div 
//           className="sidebar-overlay"
//           onClick={onClose}
//         />
//       )}
//     </>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { 
  FaPencilAlt, 
  FaHome, 
  FaProjectDiagram, 
  FaFile,
  FaFolder,
  FaRocket,
  FaSignOutAlt,
  FaTimes,
  FaUser,
  FaChevronDown,
  FaChevronRight,
  FaUserCircle
} from 'react-icons/fa';
import { BiSolidDashboard, BiLogoWindows } from "react-icons/bi";
import './Sidebar.css';

// مپینگ آیکون‌های string به کامپوننت‌های React
const iconComponents = {
  BiSolidDashboard: BiSolidDashboard,
  FaHome: FaHome,
  FaUser: FaUser,
  BiLogoWindows: BiLogoWindows,
  FaFile: FaFile,
  FaFolder: FaFolder,
  FaRocket: FaRocket,
  FaSignOutAlt: FaSignOutAlt,
  FaTimes: FaTimes,
  FaUserCircle: FaUserCircle,
};

const Sidebar = ({ isOpen, onClose }) => {
  const { menus, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedGroups, setExpandedGroups] = useState({});

  // تابع helper برای رندر آیکون
  const renderIcon = (iconName) => {
    if (!iconName) return <FaFile />;
    
    const IconComponent = iconComponents[iconName];
    if (IconComponent) {
      return <IconComponent />;
    }
    
    // اگر آیکون شناخته شده نیست، به عنوان متن نمایش بده
    return <span>{iconName}</span>;
  };

  // مدیریت باز و بسته شدن منوهای گروهی
  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  // تابع برای رفتن به صفحه پروفایل
  const handleProfileClick = () => {
    navigate('/profile');
    if (isOpen) onClose(); // بستن سایدبار در حالت موبایل
  };

  const renderMenuItems = (menuItems, level = 0) => {
    return menuItems.map((item) => (
      <div key={item.id} className={`menu-item level-${level}`}>
        {item.children && item.children.length > 0 ? (
          <MenuGroup item={item} level={level} />
        ) : (
          <NavLink
            to={item.path}
            className={({ isActive }) => 
              `menu-link ${isActive ? 'active' : ''}`
            }
            onClick={onClose}
          >
            <span className="menu-icon">
              {renderIcon(item.icon)}
            </span>
            <span className="menu-text">{item.label}</span>
            <div className="active-indicator"></div>
          </NavLink>
        )}
      </div>
    ));
  };

  const MenuGroup = ({ item, level }) => {
    const isExpanded = expandedGroups[item.id] || false;

    return (
      <div className="menu-group">
        <div 
          className="menu-header"
          onClick={() => toggleGroup(item.id)}
        >
          <span className="menu-icon">
            {renderIcon(item.icon)}
          </span>
          <span className="menu-text">{item.title}</span>
          <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
            {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        </div>
        
        <div className={`submenu ${isExpanded ? 'expanded' : ''}`}>
          {renderMenuItems(item.children || item.lebal || [], level + 1)}
        </div>
      </div>
    );
  };

  return (
    <>
      <aside className={`sidebar black-theme ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <FaRocket />
            </div>
            <span className="logo-text">سیستم مدیریت</span>
          </div>
          <button 
            className="sidebar-close"
            onClick={onClose}
            aria-label="بستن منو"
          >
            <FaTimes />
          </button>
        </div>

        {/* بخش کاربر کامپکت - قابل کلیک */}
        <div 
          className="user-info-compact clickable"
          onClick={handleProfileClick}
          style={{cursor: 'pointer'}}
        >
          <div className="user-avatar-compact">
            {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
          </div>
          <div className="user-details-compact">
            <div className="user-name-compact">{user?.username || 'کاربر'}</div>
            <div className="user-role-compact">{user?.role || 'مدیر سیستم'}</div>
          </div>
          <div className="profile-arrow">
            <FaUserCircle />
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="section-label">منوی اصلی</div>
            {renderMenuItems(menus)}
            
            {/* آیتم پروفایل در منو */}
            <div className="menu-item">
              <NavLink
                to="/profile"
                className={({ isActive }) => 
                  `menu-link ${isActive ? 'active' : ''}`
                }
                onClick={onClose}
              >
                <span className="menu-icon">
                  <FaUser />
                </span>
                <span className="menu-text">پروفایل من</span>
                <div className="active-indicator"></div>
              </NavLink>
            </div>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="current-time">
            {new Date().toLocaleTimeString('fa-IR', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </div>
          <button 
            onClick={logout}
            className="logout-btn"
          >
            <span className="logout-icon">
              <FaSignOutAlt />
            </span>
            خروج از سیستم
          </button>
        </div>
      </aside>
      
      {/* Overlay برای موبایل */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;