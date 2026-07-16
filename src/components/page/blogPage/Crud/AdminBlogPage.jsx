// src/pages/AdminBlogPage.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  FaNewspaper, FaTrash, FaCheck, FaTimes, FaSpinner, 
  FaSearch, FaFilter, FaEye, FaCalendarAlt, FaUser,
  FaExclamationTriangle, FaEdit, FaPlus, FaSort,
  FaChevronLeft, FaChevronRight, FaHome, FaTag
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // اضافه کردن useNavigate
import './AdminBlogPage.css';

const API_BASE_URL = 'https://localhost:7178/api';

const AdminBlogPage = () => {
  const navigate = useNavigate(); // اضافه کردن navigate
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState(null); // all, published, draft

  // دریافت دسته‌بندی‌ها
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Post/GetCategoryPostsDTOs`);
      const result = await response.json();
      if (result.status === 200 && result.data) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error('خطا در دریافت دسته‌بندی‌ها:', error);
    }
  };

  // دریافت مقالات
  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const requestBody = {
        categoryId: selectedCategory || null,
        searchStream: searchTerm || null,
        pageSize: pagination.pageSize || 10,
        pageNumber: page || 1,
        isPublished:filterStatus
      };
      console.log('درخواست',requestBody)
 const token = localStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE_URL}/Post/GetPostCategoryDtoAdmin`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('خطا در دریافت مقالات');
      }

      const result = await response.json();

      if (result.status === 200 && result.data) {
        // اضافه کردن فیلدهای مدیریتی به هر مقاله
        const postsWithStatus = result.data.items.map(post => ({
          ...post,
          isPublished: post.isPublished !== false, // پیش‌فرض منتشر شده
          createdAtPersian: post.createdAtPersianRelative || post.createdAt
        }));
        
        setPosts(postsWithStatus);
        setPagination({
          pageNumber: result.data.pageNumber || page,
          pageSize: result.data.pageSize || pagination.pageSize,
          totalCount: result.data.totalCount || 0,
          totalPages: result.data.totalPages || 1
        });
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('❌ خطا:', error);
      setError('مشکل در دریافت مقالات');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, [searchTerm, selectedCategory,filterStatus]);

  // جستجو
  const handleSearch = () => {
    fetchPosts(1);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // تغییر صفحه
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchPosts(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // حذف مقاله
  const handleDeletePost = async () => {
    if (!selectedPost) return;
    
    setActionLoading(true);
    try {
      // اینجا API حذف رو فراخوانی کن
      // const response = await fetch(`${API_BASE_URL}/Post/DeletePost/${selectedPost.id}`, {
      //   method: 'DELETE',
      //   headers: { 'Content-Type': 'application/json' }
      // });
      
      // شبیه‌سازی حذف
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // حذف از لیست
      setPosts(posts.filter(p => p.id !== selectedPost.id));
      setShowDeleteModal(false);
      setSelectedPost(null);
      showSuccess('مقاله با موفقیت حذف شد');
    } catch (error) {
      console.error('خطا در حذف مقاله:', error);
      setError('خطا در حذف مقاله');
    } finally {
      setActionLoading(false);
    }
  };

  // انتشار/عدم انتشار مقاله
  const handleTogglePublish = async () => {
    if (!selectedPost) return;
    
    setActionLoading(true);
    try {
      // اینجا API انتشار رو فراخوانی کن
      // const response = await fetch(`${API_BASE_URL}/Post/TogglePublish/${selectedPost.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' }
      // });
      
      // شبیه‌سازی
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // به‌روزرسانی وضعیت در لیست
      setPosts(posts.map(p => 
        p.id === selectedPost.id 
          ? { ...p, isPublished: !p.isPublished }
          : p
      ));
      
      setShowPublishModal(false);
      setSelectedPost(null);
      showSuccess(selectedPost.isPublished ? 'مقاله با موفقیت غیرفعال شد' : 'مقاله با موفقیت منتشر شد');
    } catch (error) {
      console.error('خطا در تغییر وضعیت:', error);
      setError('خطا در تغییر وضعیت مقاله');
    } finally {
      setActionLoading(false);
    }
  };

  // نمایش پیام موفقیت
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // باز کردن مودال حذف
  const openDeleteModal = (post) => {
    setSelectedPost(post);
    setShowDeleteModal(true);
  };

  // باز کردن مودال انتشار
  const openPublishModal = (post) => {
    setSelectedPost(post);
    setShowPublishModal(true);
  };

  // بستن مودال‌ها
  const closeModals = () => {
    setShowDeleteModal(false);
    setShowPublishModal(false);
    setSelectedPost(null);
  };

  // فرمت تاریخ
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch {
      return dateString;
    }
  };

  // تابع کمکی برای کوتاه کردن متن
  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // دریافت وضعیت انتشار
  const getStatusBadge = (post) => {
    if (post.isPublished) {
      return <span className="status-badge published"><FaCheck /> منتشر شده</span>;
    }
    return <span className="status-badge draft"><FaTimes /> پیش‌نویس</span>;
  };

  return (
    <>
      <Helmet>
        <title>مدیریت مقالات | پنل ادمین</title>
      </Helmet>

      <div className="admin-blog-page">
        {/* هدر */}
        <div className="admin-blog-header">
          <div className="admin-blog-header-content">
            <div className="admin-blog-title-section">
              <h1 className="admin-blog-title">
                <FaNewspaper className="admin-blog-title-icon" />
                مدیریت مقالات
              </h1>
              <span className="admin-blog-count">{pagination.totalCount} مقاله</span>
            </div>
            <Link to="/blogCreate" className="admin-blog-add-btn">
              <FaPlus /> مقاله جدید
            </Link>
          </div>
        </div>

        {/* پیام موفقیت */}
        {successMessage && (
          <div className="admin-blog-success">
            <FaCheck />
            <span>{successMessage}</span>
          </div>
        )}

        {/* خطا */}
        {error && (
          <div className="admin-blog-error">
            <FaExclamationTriangle />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="admin-blog-error-close">
              <FaTimes />
            </button>
          </div>
        )}

        {/* ابزارهای جستجو و فیلتر */}
        <div className="admin-blog-tools">
          <div className="admin-blog-search">
            <FaSearch className="admin-blog-search-icon" />
            <input
              type="text"
              className="admin-blog-search-input"
              placeholder="جستجو در مقالات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <button className="admin-blog-search-btn" onClick={handleSearch}>
              جستجو
            </button>
            {searchTerm && (
              <button 
                className="admin-blog-search-clear"
                onClick={() => setSearchTerm('')}
              >
                <FaTimes />
              </button>
            )}
          </div>

          <div className="admin-blog-filters">
            <select 
              className="admin-blog-filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">همه دسته‌بندی‌ها</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
<select 
    className="admin-blog-filter-select"
    value={filterStatus === null ? 'all' : filterStatus ? 'published' : 'draft'}
    onChange={(e) => {
        const value = e.target.value;
        console.log('📌 Selected value:', value);
        
        if (value === 'all') {
            setFilterStatus(null);
        } else if (value === 'published') {
            setFilterStatus(true);
        } else if (value === 'draft') {
            setFilterStatus(false);
        }
    }}
>
    <option value='all'>همه وضعیت‌ها</option>
    <option value="published">منتشر شده</option>
    <option value="draft">پیش‌نویس</option>
</select>
          </div>
        </div>

        {/* لیست مقالات */}
        <div className="admin-blog-content">
          {loading ? (
            <div className="admin-blog-loading">
              <FaSpinner className="admin-blog-spinner" />
              <span>در حال بارگذاری مقالات...</span>
            </div>
          ) : posts.length === 0 ? (
            <div className="admin-blog-empty">
              <FaNewspaper className="admin-blog-empty-icon" />
              <h3>هیچ مقاله‌ای یافت نشد</h3>
              <p>اولین مقاله خود را ایجاد کنید</p>
              <Link to="/BlogCreate" className="admin-blog-empty-btn">
                <FaPlus /> ایجاد مقاله جدید
              </Link>
            </div>
          ) : (
            <>
              {/* جدول دسکتاپ */}
              <div className="admin-blog-table-wrapper">
                <table className="admin-blog-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>تصویر</th>
                      <th>عنوان</th>
                      <th>دسته‌بندی</th>
                      <th>وضعیت</th>
                      <th>بازدید</th>
                      <th>تاریخ</th>
                      <th>عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, index) => (
                      <tr key={post.id}>
                        <td>{(pagination.pageNumber - 1) * pagination.pageSize + index + 1}</td>
                        <td>
                          {post.imageUrl ? (
                            <img 
                              src={`https://localhost:7178/uploads/posts/${post.imageUrl}`}
                              alt={post.title}
                              className="admin-blog-table-image"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/50x50/7d0000/ffffff?text=بدون+تصویر';
                              }}
                            />
                          ) : (
                            <div className="admin-blog-table-image-placeholder">
                              <FaNewspaper />
                            </div>
                          )}
                        </td>
                        <td className="admin-blog-table-title">
                          <Link to={`/blog/post/${post.slug || post.id}/${post.id}`} target="_blank">
                            {truncateText(post.title, 40)}
                          </Link>
                        </td>
                        <td>
                          <span className="admin-blog-table-category">
                            <FaTag />
                            {post.categoryPostName || 'بدون دسته'}
                          </span>
                        </td>
                        <td>{getStatusBadge(post)}</td>
                        <td>{post.countView || 0}</td>
                        <td>
                          <span className="admin-blog-table-date">
                            <FaCalendarAlt />
                            {post.createdAtPersianRelative || formatDate(post.createdAt)}
                          </span>
                        </td>
                        <td>
                          <div className="admin-blog-table-actions">
                            <button 
                              className="admin-blog-action-btn view"
                              onClick={() => window.open(`/blog/post/${post.slug || post.id}/${post.id}`, '_blank')}
                              title="مشاهده"
                            >
                              <FaEye />
                            </button>
                            <button 
                              className="admin-blog-action-btn edit"
                              onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                              title="ویرایش"
                            >
                              <FaEdit />
                            </button>
                            <button 
                              className={`admin-blog-action-btn ${post.isPublished ? 'unpublish' : 'publish'}`}
                              onClick={() => openPublishModal(post)}
                              title={post.isPublished ? 'عدم انتشار' : 'انتشار'}
                            >
                              {post.isPublished ? <FaTimes /> : <FaCheck />}
                            </button>
                            <button 
                              className="admin-blog-action-btn delete"
                              onClick={() => openDeleteModal(post)}
                              title="حذف"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* کارت‌های موبایل */}
              <div className="admin-blog-cards">
                {posts.map((post, index) => (
                  <div key={post.id} className="admin-blog-card">
                    <div className="admin-blog-card-header">
                      <div className="admin-blog-card-image">
                        {post.imageUrl ? (
                          <img 
                            src={`https://localhost:7178/uploads/posts/${post.imageUrl}`}
                            alt={post.title}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/80x80/7d0000/ffffff?text=بدون+تصویر';
                            }}
                          />
                        ) : (
                          <div className="admin-blog-card-image-placeholder">
                            <FaNewspaper />
                          </div>
                        )}
                      </div>
                      <div className="admin-blog-card-info">
                        <h3 className="admin-blog-card-title">
                          <Link to={`/blog/post/${post.slug || post.id}/${post.id}`} target="_blank">
                            {truncateText(post.title, 50)}
                          </Link>
                        </h3>
                        <div className="admin-blog-card-meta">
                          <span className="admin-blog-card-category">
                            <FaTag />
                            {post.categoryPostName || 'بدون دسته'}
                          </span>
                          {getStatusBadge(post)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="admin-blog-card-body">
                      <p className="admin-blog-card-summary">
                        {truncateText(post.summary || post.title, 120)}
                      </p>
                      <div className="admin-blog-card-footer">
                        <span className="admin-blog-card-date">
                          <FaCalendarAlt />
                          {post.createdAtPersianRelative || formatDate(post.createdAt)}
                        </span>
                        <span className="admin-blog-card-views">
                          <FaEye /> {post.countView || 0}
                        </span>
                      </div>
                    </div>

                    <div className="admin-blog-card-actions">
                      <button 
                        className="admin-blog-action-btn view"
                        onClick={() => window.open(`/blog/post/${post.slug || post.id}/${post.id}`, '_blank')}
                        title="مشاهده"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="admin-blog-action-btn edit"
                        onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                        title="ویرایش"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className={`admin-blog-action-btn ${post.isPublished ? 'unpublish' : 'publish'}`}
                        onClick={() => openPublishModal(post)}
                        title={post.isPublished ? 'عدم انتشار' : 'انتشار'}
                      >
                        {post.isPublished ? <FaTimes /> : <FaCheck />}
                      </button>
                      <button 
                        className="admin-blog-action-btn delete"
                        onClick={() => openDeleteModal(post)}
                        title="حذف"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* صفحه‌بندی */}
              {pagination.totalPages > 1 && (
                <div className="admin-blog-pagination">
                  <button
                    className="admin-blog-page-btn"
                    onClick={() => handlePageChange(pagination.pageNumber - 1)}
                    disabled={pagination.pageNumber === 1}
                  >
                    <FaChevronRight />
                  </button>
                  
                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    const isActive = pageNum === pagination.pageNumber;
                    if (
                      pageNum === 1 ||
                      pageNum === pagination.totalPages ||
                      (pageNum >= pagination.pageNumber - 1 && pageNum <= pagination.pageNumber + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          className={`admin-blog-page-btn ${isActive ? 'active' : ''}`}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    if (pageNum === pagination.pageNumber - 2 || pageNum === pagination.pageNumber + 2) {
                      return <span key={pageNum} className="admin-blog-page-dots">...</span>;
                    }
                    return null;
                  })}
                  
                  <button
                    className="admin-blog-page-btn"
                    onClick={() => handlePageChange(pagination.pageNumber + 1)}
                    disabled={pagination.pageNumber === pagination.totalPages}
                  >
                    <FaChevronLeft />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* مودال حذف */}
        {showDeleteModal && selectedPost && (
          <div className="admin-blog-modal-overlay" onClick={closeModals}>
            <div className="admin-blog-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-blog-modal-header">
                <FaExclamationTriangle className="admin-blog-modal-icon danger" />
                <h2>حذف مقاله</h2>
              </div>
              <div className="admin-blog-modal-body">
                <p>آیا از حذف مقاله زیر اطمینان دارید؟</p>
                <div className="admin-blog-modal-post">
                  <strong>{selectedPost.title}</strong>
                  <span className="admin-blog-modal-post-category">
                    {selectedPost.categoryPostName}
                  </span>
                </div>
                <p className="admin-blog-modal-warning">
                  این عمل غیرقابل بازگشت است!
                </p>
              </div>
              <div className="admin-blog-modal-footer">
                <button className="admin-blog-modal-btn cancel" onClick={closeModals}>
                  انصراف
                </button>
                <button 
                  className="admin-blog-modal-btn delete" 
                  onClick={handleDeletePost}
                  disabled={actionLoading}
                >
                  {actionLoading ? <FaSpinner className="spinner" /> : 'حذف'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* مودال انتشار */}
        {showPublishModal && selectedPost && (
          <div className="admin-blog-modal-overlay" onClick={closeModals}>
            <div className="admin-blog-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-blog-modal-header">
                <FaCheck className="admin-blog-modal-icon publish" />
                <h2>{selectedPost.isPublished ? 'عدم انتشار' : 'انتشار'} مقاله</h2>
              </div>
              <div className="admin-blog-modal-body">
                <p>
                  آیا از {selectedPost.isPublished ? 'عدم انتشار' : 'انتشار'} مقاله زیر اطمینان دارید؟
                </p>
                <div className="admin-blog-modal-post">
                  <strong>{selectedPost.title}</strong>
                  <span className="admin-blog-modal-post-category">
                    {selectedPost.categoryPostName}
                  </span>
                </div>
                <p className="admin-blog-modal-info">
                  {selectedPost.isPublished 
                    ? 'با عدم انتشار، این مقاله از دید کاربران مخفی خواهد شد.' 
                    : 'با انتشار، این مقاله برای همه کاربران قابل مشاهده خواهد بود.'}
                </p>
              </div>
              <div className="admin-blog-modal-footer">
                <button className="admin-blog-modal-btn cancel" onClick={closeModals}>
                  انصراف
                </button>
                <button 
                  className={`admin-blog-modal-btn ${selectedPost.isPublished ? 'unpublish' : 'publish'}`}
                  onClick={handleTogglePublish}
                  disabled={actionLoading}
                >
                  {actionLoading ? <FaSpinner className="spinner" /> : (selectedPost.isPublished ? 'عدم انتشار' : 'انتشار')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminBlogPage;