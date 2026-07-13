import React, { useState, useEffect, useCallback } from 'react';
import { 
  FaNewspaper, FaTag, FaArrowLeft, FaArrowRight, 
  FaSpinner, FaCalendarAlt, FaUser, FaEye,
  FaSearch, FaTimesCircle, FaChevronLeft, FaChevronRight,
  FaAd, FaBullhorn, FaHome
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './BlogPage.css';

const BlogPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 9,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false
  });

  // ===== دریافت دسته‌بندی‌ها =====
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://localhost:7178/api/Post/GetCategoryPostsDTOs', {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('خطا در دریافت دسته‌بندی‌ها');
      
      const result = await response.json();
      if (result.status === 200 && result.data) {
        setCategories(result.data);
        generateSamplePosts(result.data);
      }
    } catch (error) {
      console.error('❌ خطا:', error);
      setError('مشکل در دریافت دسته‌بندی‌ها');
      generateSamplePosts([]);
    } finally {
      setLoading(false);
    }
  };

  // ===== تولید پست‌های نمونه =====
  const generateSamplePosts = (categoriesData) => {
    const samplePosts = [
      {
        id: 1,
        title: "راهنمای خرید آپارتمان در تهران",
        summary: "همه چیز درباره خرید آپارتمان در تهران از انتخاب منطقه تا عقد قرارداد",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
        categoryName: categoriesData[2]?.name || "مقالات ملکی",
        categoryId: categoriesData[2]?.id || 3,
        createdAt: new Date().toISOString(),
        viewCount: 1250,
        authorName: "مشاور املاک"
      },
      {
        id: 2,
        title: "نکات کلیدی در اجاره آپارتمان",
        summary: "قبل از اجاره آپارتمان حتماً این نکات را مطالعه کنید",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
        categoryName: categoriesData[1]?.name || "نکات معاملات ملکی",
        categoryId: categoriesData[1]?.id || 2,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        viewCount: 850,
        authorName: "کارشناس املاک"
      },
      {
        id: 3,
        title: "بازسازی و نوسازی آپارتمان",
        summary: "بهترین روش‌های بازسازی آپارتمان با کمترین هزینه",
        imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500",
        categoryName: categoriesData[3]?.name || "دکوراسیون و بازسازی",
        categoryId: categoriesData[3]?.id || 4,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        viewCount: 2100,
        authorName: "متخصص بازسازی"
      },
      {
        id: 4,
        title: "اخبار روز بازار مسکن",
        summary: "آخرین تحولات بازار مسکن در تابستان ۱۴۰۴",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
        categoryName: categoriesData[0]?.name || "خبر و گزارش",
        categoryId: categoriesData[0]?.id || 1,
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        viewCount: 3200,
        authorName: "تحلیلگر بازار"
      },
      {
        id: 5,
        title: "قوانین جدید خرید و فروش ملک",
        summary: "تغییرات قوانین خرید و فروش ملک در سال ۱۴۰۴",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
        categoryName: categoriesData[1]?.name || "نکات معاملات ملکی",
        categoryId: categoriesData[1]?.id || 2,
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        viewCount: 1800,
        authorName: "مشاور حقوقی"
      },
      {
        id: 6,
        title: "دکوراسیون مدرن آپارتمان",
        summary: "ایده‌های جذاب برای دکوراسیون مدرن آپارتمان",
        imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500",
        categoryName: categoriesData[3]?.name || "دکوراسیون و بازسازی",
        categoryId: categoriesData[3]?.id || 4,
        createdAt: new Date(Date.now() - 432000000).toISOString(),
        viewCount: 950,
        authorName: "طراح داخلی"
      },
      {
        id: 7,
        title: "مقایسه مناطق مختلف تهران برای خرید ملک",
        summary: "کدام منطقه تهران برای سرمایه‌گذاری مناسب‌تر است؟",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
        categoryName: categoriesData[2]?.name || "مقالات ملکی",
        categoryId: categoriesData[2]?.id || 3,
        createdAt: new Date(Date.now() - 518400000).toISOString(),
        viewCount: 1500,
        authorName: "کارشناس سرمایه‌گذاری"
      },
      {
        id: 8,
        title: "مراحل قانونی خرید و فروش ملک",
        summary: "همه مراحل قانونی خرید و فروش ملک از ابتدا تا انتها",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
        categoryName: categoriesData[1]?.name || "نکات معاملات ملکی",
        categoryId: categoriesData[1]?.id || 2,
        createdAt: new Date(Date.now() - 604800000).toISOString(),
        viewCount: 2300,
        authorName: "وکیل پایه یک"
      },
      {
        id: 9,
        title: "سرمایه‌گذاری در املاک تجاری",
        summary: "راهنمای سرمایه‌گذاری در املاک تجاری و اداری",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
        categoryName: categoriesData[2]?.name || "مقالات ملکی",
        categoryId: categoriesData[2]?.id || 3,
        createdAt: new Date(Date.now() - 691200000).toISOString(),
        viewCount: 1100,
        authorName: "مشاور سرمایه‌گذاری"
      },
      {
        id: 10,
        title: "تاثیر نوسانات اقتصادی بر بازار مسکن",
        summary: "بررسی تاثیر تورم و نرخ ارز بر قیمت مسکن",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
        categoryName: categoriesData[0]?.name || "خبر و گزارش",
        categoryId: categoriesData[0]?.id || 1,
        createdAt: new Date(Date.now() - 777600000).toISOString(),
        viewCount: 2800,
        authorName: "تحلیلگر اقتصادی"
      },
      {
        id: 11,
        title: "نکات مهم در عقد قرارداد اجاره",
        summary: "مواردی که باید در قرارداد اجاره حتماً لحاظ کنید",
        imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500",
        categoryName: categoriesData[1]?.name || "نکات معاملات ملکی",
        categoryId: categoriesData[1]?.id || 2,
        createdAt: new Date(Date.now() - 864000000).toISOString(),
        viewCount: 1600,
        authorName: "مشاور حقوقی"
      },
      {
        id: 12,
        title: "طراحی داخلی آپارتمان های کوچک",
        summary: "ایده‌های خلاقانه برای طراحی آپارتمان های کوچک",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
        categoryName: categoriesData[3]?.name || "دکوراسیون و بازسازی",
        categoryId: categoriesData[3]?.id || 4,
        createdAt: new Date(Date.now() - 950400000).toISOString(),
        viewCount: 750,
        authorName: "طراح داخلی"
      }
    ];

    let filteredPosts = samplePosts;
    if (selectedCategory) {
      filteredPosts = samplePosts.filter(p => p.categoryId === selectedCategory.id);
    }

    if (searchTerm) {
      filteredPosts = filteredPosts.filter(p => 
        p.title.includes(searchTerm) || 
        p.summary.includes(searchTerm) ||
        p.categoryName.includes(searchTerm)
      );
    }

    setPosts(filteredPosts);
    setPagination({
      pageNumber: 1,
      pageSize: 9,
      totalCount: filteredPosts.length,
      totalPages: Math.ceil(filteredPosts.length / 9),
      hasNextPage: filteredPosts.length > 9,
      hasPreviousPage: false
    });
  };

  // ===== جستجو =====
  const handleSearch = () => {
    setSearchTerm(searchInput);
    generateSamplePosts(categories);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    generateSamplePosts(categories);
  };

  // ===== انتخاب دسته‌بندی =====
  const handleCategorySelect = (category) => {
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
    setTimeout(() => {
      generateSamplePosts(categories);
    }, 0);
  };

  // ===== تغییر صفحه =====
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, pageNumber: newPage }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ===== رفتن به صفحه مطلب =====
  const handlePostClick = (post) => {
    navigate(`/blog/post/${post.id}`);
  };

  // ===== فرمت تاریخ =====
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // ===== دریافت پست‌های صفحه جاری =====
  const getCurrentPagePosts = () => {
    const startIndex = (pagination.pageNumber - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return posts.slice(startIndex, endIndex);
  };

  if (loading) {
    return (
      <div className="blog-page-wrapper">
        <div className="blog-loading">
          <FaSpinner className="blog-loading-spinner" />
          <span>در حال بارگذاری...</span>
        </div>
      </div>
    );
  }

  const currentPosts = getCurrentPagePosts();

  return (
    <div className="blog-page-wrapper">
      {/* ===== هدر ===== */}
      <div className="blog-header">
        <h1 className="blog-title">وبلاگ مشاور املاک</h1>
        <p className="blog-subtitle">
          آخرین اخبار، مقالات و نکات تخصصی در حوزه املاک و مستغلات
        </p>
        <div className="blog-stats">
          <span className="stat-badge">
            <FaNewspaper /> {posts.length} مطلب
          </span>
          <span className="stat-badge">
            <FaTag /> {categories.length} دسته‌بندی
          </span>
        </div>
      </div>

      {/* ===== سه ستونه ===== */}
      <div className="blog-three-column">

        {/* ===== ستون چپ (تبلیغات) ===== */}
        <div className="blog-sidebar-left">
          <div className="ad-card">
            <div className="ad-badge">تبلیغات</div>
            <div className="ad-content">
              <FaBullhorn className="ad-icon" />
              <h4>خرید و فروش ملک</h4>
              <p>با مشاوران مجرب ما در تماس باشید</p>
              <button className="ad-btn">تماس بگیرید</button>
            </div>
          </div>
          <div className="ad-card">
            <div className="ad-badge">تبلیغات</div>
            <div className="ad-content">
              <FaHome className="ad-icon" />
              <h4>وام مسکن</h4>
              <p>بهترین شرایط وام مسکن را دریافت کنید</p>
              <button className="ad-btn">اطلاعات بیشتر</button>
            </div>
          </div>
          <div className="ad-card">
            <div className="ad-badge">تبلیغات</div>
            <div className="ad-content">
              <img 
                src="https://via.placeholder.com/300x200/7d0000/ffffff?text=تبلیغ+شما" 
                alt="تبلیغات" 
                className="ad-image"
              />
            </div>
          </div>
        </div>

        {/* ===== ستون وسط (مطالب) ===== */}
        <div className="blog-main-content">
          {/* جستجو و دسته‌بندی */}
          <div className="blog-search-section">
            <div className="blog-search-wrapper">
              <FaSearch className="blog-search-icon" />
              <input
                type="text"
                className="blog-search-input"
                placeholder="جستجو در مطالب..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
              {searchInput && (
                <button className="blog-search-clear" onClick={handleClearSearch}>
                  <FaTimesCircle />
                </button>
              )}
              <button className="blog-search-btn" onClick={handleSearch}>
                جستجو
              </button>
            </div>

            <div className="blog-categories-scroll">
              <button 
                className={`category-btn ${!selectedCategory ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(null);
                  generateSamplePosts(categories);
                }}
              >
                همه
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory?.id === category.id ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(category)}
                >
                  <FaTag className="category-icon-small" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* فیلترهای فعال */}
          {(selectedCategory || searchTerm) && (
            <div className="blog-filters">
              {selectedCategory && (
                <span className="filter-tag">
                  {selectedCategory.name}
                  <button 
                    className="remove-filter"
                    onClick={() => {
                      setSelectedCategory(null);
                      generateSamplePosts(categories);
                    }}
                  >
                    ✕
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="filter-tag search">
                  "{searchTerm}"
                  <button 
                    className="remove-filter"
                    onClick={handleClearSearch}
                  >
                    ✕
                  </button>
                </span>
              )}
              <span className="total-count">{posts.length} مطلب</span>
            </div>
          )}

          {/* لیست مطالب */}
          <div className="blog-posts-section">
            {loadingPosts ? (
              <div className="blog-posts-loading">
                <FaSpinner className="loading-spinner" />
                <span>در حال بارگذاری مطالب...</span>
              </div>
            ) : posts.length === 0 ? (
              <div className="blog-empty">
                <FaNewspaper className="empty-icon" />
                <h3>مطلبی یافت نشد</h3>
                <p>هیچ مطلبی با این شرایط پیدا نشد</p>
                <button onClick={handleClearSearch} className="clear-search-btn">
                  پاک کردن فیلترها
                </button>
              </div>
            ) : (
              <>
                <div className="blog-posts-grid">
                  {currentPosts.map((post) => (
                    <div 
                      key={post.id} 
                      className="blog-post-card"
                      onClick={() => handlePostClick(post)}
                    >
                      {post.imageUrl && (
                        <div className="post-image-wrapper">
                          <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="post-image"
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x300/7d0000/ffffff?text=وبلاگ';
                            }}
                          />
                          {post.categoryName && (
                            <span className="post-category-badge">
                              {post.categoryName}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="post-content">
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-summary">{post.summary}</p>
                        <div className="post-meta">
                          <span>
                            <FaCalendarAlt /> {formatDate(post.createdAt)}
                          </span>
                          <span>
                            <FaEye /> {post.viewCount || 0}
                          </span>
                        </div>
                        <div className="post-read-more">
                          ادامه مطلب <FaArrowLeft />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* صفحه‌بندی */}
                {pagination.totalPages > 1 && (
                  <div className="blog-pagination">
                    <button
                      className="page-btn"
                      onClick={() => handlePageChange(pagination.pageNumber - 1)}
                      disabled={!pagination.hasPreviousPage}
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
                            className={`page-btn ${isActive ? 'active' : ''}`}
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                      if (pageNum === pagination.pageNumber - 2 || pageNum === pagination.pageNumber + 2) {
                        return <span key={pageNum} className="page-dots">...</span>;
                      }
                      return null;
                    })}
                    
                    <button
                      className="page-btn"
                      onClick={() => handlePageChange(pagination.pageNumber + 1)}
                      disabled={!pagination.hasNextPage}
                    >
                      <FaChevronLeft />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* ===== ستون راست (تبلیغات) ===== */}
        <div className="blog-sidebar-right">
          <div className="ad-card">
            <div className="ad-badge">تبلیغات</div>
            <div className="ad-content">
              <FaAd className="ad-icon" />
              <h4>ثبت آگهی رایگان</h4>
              <p>ملک خود را رایگان ثبت کنید</p>
              <button className="ad-btn">ثبت آگهی</button>
            </div>
          </div>
          <div className="ad-card">
            <div className="ad-badge">تبلیغات</div>
            <div className="ad-content">
              <img 
                src="https://via.placeholder.com/300x250/7d0000/ffffff?text=تبلیغات+ویژه" 
                alt="تبلیغات" 
                className="ad-image"
              />
            </div>
          </div>
          <div className="ad-card">
            <div className="ad-badge">تبلیغات</div>
            <div className="ad-content">
              <h4>مشاوره رایگان</h4>
              <p>با کارشناسان ما مشاوره رایگان بگیرید</p>
              <button className="ad-btn">درخواست مشاوره</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogPage;