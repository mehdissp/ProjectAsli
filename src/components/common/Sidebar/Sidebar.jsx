import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { menus, user, logout } = useAuth();
  const location = useLocation();

  const renderMenuItems = (menuItems, level = 0) => {
       console.log(menuItems)
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
            <span className="menu-icon">{item.icon || '📄'}</span>
            <span className="menu-text">{item.label}</span>
            <div className="active-indicator"></div>
          </NavLink>
        )}
      </div>
    ));
  };

  const MenuGroup = ({ item, level }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
      <div className="menu-group">
        <div 
          className="menu-header"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="menu-icon">{item.icon || '📁'}</span>
          <span className="menu-text">{item.title}</span>
          <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
            ▼
          </span>
        </div>
        
        <div className={`submenu ${isExpanded ? 'expanded' : ''}`}>
         
          {renderMenuItems(item.lebal, level + 1)}
        </div>
      </div>
    );
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">🚀</div>
            <span className="logo-text">سیستم مدیریت</span>
          </div>
          <button 
            className="sidebar-close"
            onClick={onClose}
            aria-label="بستن منو"
          >
            ✕
          </button>
        </div>

        <div className="user-info">
          <div className="user-avatar">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="user-details">
            <div className="user-name">{user?.username || 'کاربر'}</div>
            <div className="user-role">{user?.role || 'مدیر سیستم'}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="section-label">منوی اصلی</div>
            {renderMenuItems(menus)}
          </div>
        </nav>

        <div className="sidebar-footer">
          <button 
            onClick={logout}
            className="logout-btn btn btn-secondary"
          >
            <span className="logout-icon">🚪</span>
            خروج
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;