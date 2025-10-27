import React, { useState, useEffect, useRef } from 'react';
import { 
  FaFolder, 
  FaFolderOpen, 
  FaFile, 
  FaCheck, 
  FaSearch,
  FaSync,
  FaDownload,
  FaTrash,
  FaEdit,
  FaChevronRight,
  FaChevronDown,
  FaLink,
  FaCog,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import './MenuAccess.css';
import { menuAccessService } from '../../../services/menuAccess';

const MenuAccess = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const mobileMenuRef = useRef(null);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    if (showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showMobileMenu]);

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await menuAccessService.getMenuAccess();

        setData(response.data);

    } catch (err) {
      setError('خطا در دریافت داده‌ها');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Close mobile menu when an action is performed
  const handleMobileAction = (action) => {
    setShowMobileMenu(false);
    action();
  };

  // Toggle item selection
  const toggleSelection = (itemId) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId);
    } else {
      newSelectedItems.add(itemId);
    }
    setSelectedItems(newSelectedItems);
  };

  // Toggle item expansion
  const toggleExpansion = (itemId) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(itemId)) {
      newExpandedItems.delete(itemId);
    } else {
      newExpandedItems.add(itemId);
    }
    setExpandedItems(newExpandedItems);
  };

  // Select all items
  const selectAll = () => {
    const allIds = getAllItemIds(data);
    setSelectedItems(new Set(allIds));
  };

  // Deselect all items
  const deselectAll = () => {
    setSelectedItems(new Set());
  };

  // Get all item IDs recursively
  const getAllItemIds = (items) => {
    let ids = [];
    items.forEach(item => {
      ids.push(item.id);
      if (item.children && item.children.length > 0) {
        ids = [...ids, ...getAllItemIds(item.children)];
      }
    });
    return ids;
  };

  // Filter data based on search term
  const filterData = (items, searchTerm) => {
    if (!searchTerm) return items;

    return items.filter(item => {
      const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.url?.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (item.children && item.children.length > 0) {
        const filteredChildren = filterData(item.children, searchTerm);
        return matchesSearch || filteredChildren.length > 0;
      }
      
      return matchesSearch;
    });
  };

  // Count total children recursively
  const countChildren = (item) => {
    if (!item.children || item.children.length === 0) return 0;
    
    let count = item.children.length;
    item.children.forEach(child => {
      count += countChildren(child);
    });
    return count;
  };

  // Check if item has children
  const hasChildren = (item) => {
    return item.children && item.children.length > 0;
  };

  // Render tree item
  const renderTreeItem = (item, level = 0) => {
    const isParent = hasChildren(item);
    const isExpanded = expandedItems.has(item.id);
    const isSelected = selectedItems.has(item.id);
    const isSearchMatch = searchTerm && (
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.url?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalChildren = countChildren(item);

    return (
      <div key={item.id} className="tree-item">
        <div 
          className={`item-content level-${level} ${isSelected ? 'selected' : ''} ${isSearchMatch ? 'search-match' : ''} ${isParent ? 'parent-item' : ''}`}
        >
          <div className="item-indentation">
            {Array.from({ length: level }).map((_, index) => (
              <div key={index} className="indentation-line"></div>
            ))}
          </div>

          <div className="item-main">
            {isParent && (
              <button
                className="expand-btn"
                onClick={() => toggleExpansion(item.id)}
              >
                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                <span className={`folder-icon ${isExpanded ? 'open' : ''}`}>
                  {isExpanded ? <FaFolderOpen /> : <FaFolder />}
                </span>
              </button>
            )}
            {!isParent && (
              <div className="file-section">
                <span className="file-icon">
                  {item.url ? <FaLink /> : <FaCog />}
                </span>
              </div>
            )}
            
            <div className="item-checkbox">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSelection(item.id)}
                id={`checkbox-${item.id}`}
              />
              <label htmlFor={`checkbox-${item.id}`}></label>
            </div>

            <div className="item-info">
              <div className="item-header">
                <span className="item-name">{item.name}</span>
                {isParent && !isMobile && (
                  <span className="children-count">
                    ({item.children.length} آیتم)
                  </span>
                )}
              </div>
              
              {item.url && (
                <div className="item-url">
                  {!isMobile && <span className="url-label">Endpoint:</span>}
                  <code className={isMobile ? 'mobile-url' : ''}>{item.url}</code>
                </div>
              )}

              {!isMobile && (
                <div className="item-meta">
                  <span className="item-id">ID: {item.id}</span>
                  {item.parentId && (
                    <span className="parent-id">Parent: {item.parentId}</span>
                  )}
                  {isParent && totalChildren > 0 && (
                    <span className="total-children-badge">
                      کل زیرمجموعه: {totalChildren}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {!isMobile && (
            <div className="item-actions">
              {item.url ? (
                <span className="item-badge api">
                  <FaLink />
                  API Endpoint
                </span>
              ) : isParent ? (
                <span className="item-badge folder">
                  <FaFolder />
                  پوشه
                </span>
              ) : (
                <span className="item-badge file">
                  <FaCog />
                  تنظیمات
                </span>
              )}
              
              {isParent && totalChildren > 0 && (
                <span className="item-badge total-children">
                  {totalChildren} زیرمجموعه
                </span>
              )}
            </div>
          )}
        </div>

        {isParent && isExpanded && (
          <div className="children-container">
            <div className="children-connector">
              <div className="vertical-line"></div>
            </div>
            <div className="children-list">
              {item.children.map(child => renderTreeItem(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const filteredData = filterData(data, searchTerm);

  return (
    <div className="tree-list-page">
      {/* Mobile Header */}
      {isMobile && (
        <div className="mobile-header">
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="منو"
          >
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="mobile-title">
            <FaFolder />
            منوها
          </h1>
          <button 
            className="btn btn-warning mobile-refresh"
            onClick={fetchData}
            disabled={loading}
            aria-label="بروزرسانی"
          >
            <FaSync className={loading ? 'spinning' : ''} />
          </button>
        </div>
      )}

      <div className={`tree-list-header ${isMobile ? 'mobile' : ''}`}>
        <div className="header-content">
          <h1 className="page-title">
            <FaFolder className="title-icon" />
            مدیریت سلسله مراتب منوها
          </h1>
          <p className="page-subtitle">ساختار درختی منوها و endpoints سیستم</p>
        </div>
        
        {!isMobile && (
          <div className="header-actions">
            <button 
              className="btn btn-warning"
              onClick={fetchData}
              disabled={loading}
            >
              <FaSync className={loading ? 'spinning' : ''} />
              بروزرسانی داده‌ها
            </button>
          </div>
        )}
      </div>

      <div className="tree-list-container">
        {/* Mobile Menu Overlay */}
        {isMobile && showMobileMenu && (
          <div 
            className="mobile-menu-overlay"
            onClick={() => setShowMobileMenu(false)}
          />
        )}

        {/* Toolbar */}
        <div 
          ref={mobileMenuRef}
          className={`toolbar ${isMobile ? 'mobile' : ''} ${showMobileMenu ? 'mobile-open' : ''}`}
        >
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder={isMobile ? "جستجو..." : "جستجو در نام منوها، endpoint ها..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              onClick={() => isMobile && setShowMobileMenu(false)}
            />
          </div>

          <div className="selection-actions">
            <span className="selected-count">
              <FaCheck />
              {selectedItems.size} آیتم انتخاب شده
            </span>
            <div className="selection-buttons">
              <button 
                className="btn btn-outline"
                onClick={() => handleMobileAction(selectAll)}
              >
                انتخاب همه
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => handleMobileAction(deselectAll)}
              >
                لغو انتخاب
              </button>
            </div>
          </div>

          <div className="global-actions">
            <button 
              className="btn btn-success"
              onClick={() => setShowMobileMenu(false)}
            >
              <FaDownload />
              {!isMobile && 'خروجی'}
            </button>
            <button 
              className="btn btn-warning"
              onClick={() => setShowMobileMenu(false)}
            >
              <FaEdit />
              {!isMobile && 'ویرایش'}
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => setShowMobileMenu(false)}
            >
              <FaTrash />
              {!isMobile && 'حذف'}
            </button>
          </div>

          {isMobile && (
            <div className="mobile-stats">
              <div className="mobile-stat">
                <FaFolder />
                <span>{data.filter(item => hasChildren(item)).length}</span>
                <small>پوشه</small>
              </div>
              <div className="mobile-stat">
                <FaLink />
                <span>
                  {getAllItemIds(data).filter(id => {
                    const item = data.flatMap(d => [d, ...(d.children || [])]).find(i => i.id === id);
                    return item && item.url;
                  }).length}
                </span>
                <small>API</small>
              </div>
              <div className="mobile-stat">
                <FaCheck />
                <span>{selectedItems.size}</span>
                <small>انتخاب</small>
              </div>
            </div>
          )}
        </div>

        {/* Tree List */}
        <div className="tree-list-content">
          {loading && (
            <div className="loading-state">
              <FaSync className="spinning" />
              <span>در حال دریافت داده‌ها...</span>
            </div>
          )}

          {error && (
            <div className="error-state">
              <span>{error}</span>
              <button 
                className="btn btn-outline"
                onClick={fetchData}
              >
                تلاش مجدد
              </button>
            </div>
          )}

          {!loading && !error && filteredData.length === 0 && (
            <div className="empty-state">
              <FaFolderOpen />
              <span>هیچ داده‌ای مطابق با جستجو یافت نشد</span>
            </div>
          )}

          {!loading && !error && filteredData.length > 0 && (
            <div className="tree-list">
              {!isMobile && (
                <div className="tree-header">
                  <div className="tree-title">
                    <FaFolder className="tree-icon" />
                    ساختار درختی منوها
                  </div>
                  <div className="tree-stats">
                    <span className="stat-item">
                      <FaFolder className="stat-icon folder" />
                      {data.filter(item => hasChildren(item)).length} پوشه
                    </span>
                    <span className="stat-item">
                      <FaLink className="stat-icon api" />
                      {getAllItemIds(data).filter(id => {
                        const item = data.flatMap(d => [d, ...(d.children || [])]).find(i => i.id === id);
                        return item && item.url;
                      }).length} API
                    </span>
                    <span className="stat-item">
                      <FaCheck className="stat-icon selected" />
                      {selectedItems.size} انتخاب شده
                    </span>
                  </div>
                </div>
              )}
              {filteredData.map(item => renderTreeItem(item))}
            </div>
          )}
        </div>

        {/* Selected Items Panel */}
        {selectedItems.size > 0 && (
          <div className={`selected-panel ${isMobile ? 'mobile' : ''}`}>
            <div className="panel-header">
              <h3>
                <FaCheck />
                آیتم‌های انتخاب شده
              </h3>
              <span className="badge">{selectedItems.size}</span>
            </div>
            <div className="selected-items-list">
              {Array.from(selectedItems).map(id => {
                const findItem = (items, targetId) => {
                  for (let item of items) {
                    if (item.id === targetId) return item;
                    if (item.children) {
                      const found = findItem(item.children, targetId);
                      if (found) return found;
                    }
                  }
                  return null;
                };
                
                const item = findItem(data, id);
                const isParent = hasChildren(item);
                return item ? (
                  <div key={id} className="selected-item">
                    <div className="selected-item-icon">
                      {isParent ? (
                        <FaFolder className="yellow-folder" />
                      ) : item.url ? (
                        <FaLink />
                      ) : (
                        <FaCog />
                      )}
                    </div>
                    <div className="selected-item-info">
                      <span className="item-name">{item.name}</span>
                      {item.url && (
                        <span className="item-url">{isMobile ? item.url.split('/').pop() : item.url}</span>
                      )}
                      <div className="selected-item-meta">
                        <span className="item-path">ID: {item.id}</span>
                        {isParent && (
                          <span className="item-children">
                            {item.children.length} فرزند
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuAccess;