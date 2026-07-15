// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import { 
// // //   FaNewspaper, FaTag, FaArrowLeft, FaArrowRight, 
// // //   FaSpinner, FaCalendarAlt, FaUser, FaEye,
// // //   FaSearch, FaTimesCircle, FaChevronLeft, FaChevronRight,
// // //   FaAd, FaBullhorn, FaHome
// // // } from 'react-icons/fa';
// // // import { useNavigate } from 'react-router-dom';
// // // import './BlogPage.css';

// // // const BlogPage = () => {
// // //   const navigate = useNavigate();
// // //   const [categories, setCategories] = useState([]);
// // //   const [posts, setPosts] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [loadingPosts, setLoadingPosts] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const [selectedCategory, setSelectedCategory] = useState(null);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [searchInput, setSearchInput] = useState('');
// // //   const [pagination, setPagination] = useState({
// // //     pageNumber: 1,
// // //     pageSize: 9,
// // //     totalCount: 0,
// // //     totalPages: 0,
// // //     hasNextPage: false,
// // //     hasPreviousPage: false
// // //   });

// // //   // ===== دریافت دسته‌بندی‌ها =====
// // //   useEffect(() => {
// // //     fetchCategories();
// // //   }, []);

// // //   const fetchCategories = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await fetch('https://localhost:7178/api/Post/GetCategoryPostsDTOs', {
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         }
// // //       });

// // //       if (!response.ok) throw new Error('خطا در دریافت دسته‌بندی‌ها');
      
// // //       const result = await response.json();
// // //       if (result.status === 200 && result.data) {
// // //         setCategories(result.data);
// // //         generateSamplePosts(result.data);
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ خطا:', error);
// // //       setError('مشکل در دریافت دسته‌بندی‌ها');
// // //       generateSamplePosts([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ===== تولید پست‌های نمونه =====
// // //   const generateSamplePosts = (categoriesData) => {
// // //     const samplePosts = [
// // //       {
// // //         id: 1,
// // //         title: "راهنمای خرید آپارتمان در تهران",
// // //         summary: "همه چیز درباره خرید آپارتمان در تهران از انتخاب منطقه تا عقد قرارداد",
// // //         imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
// // //         categoryName: categoriesData[2]?.name || "مقالات ملکی",
// // //         categoryId: categoriesData[2]?.id || 3,
// // //         createdAt: new Date().toISOString(),
// // //         viewCount: 1250,
// // //         authorName: "مشاور املاک"
// // //       },
// // //       {
// // //         id: 2,
// // //         title: "نکات کلیدی در اجاره آپارتمان",
// // //         summary: "قبل از اجاره آپارتمان حتماً این نکات را مطالعه کنید",
// // //         imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
// // //         categoryName: categoriesData[1]?.name || "نکات معاملات ملکی",
// // //         categoryId: categoriesData[1]?.id || 2,
// // //         createdAt: new Date(Date.now() - 86400000).toISOString(),
// // //         viewCount: 850,
// // //         authorName: "کارشناس املاک"
// // //       },
// // //       {
// // //         id: 3,
// // //         title: "بازسازی و نوسازی آپارتمان",
// // //         summary: "بهترین روش‌های بازسازی آپارتمان با کمترین هزینه",
// // //         imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500",
// // //         categoryName: categoriesData[3]?.name || "دکوراسیون و بازسازی",
// // //         categoryId: categoriesData[3]?.id || 4,
// // //         createdAt: new Date(Date.now() - 172800000).toISOString(),
// // //         viewCount: 2100,
// // //         authorName: "متخصص بازسازی"
// // //       },
// // //       {
// // //         id: 4,
// // //         title: "اخبار روز بازار مسکن",
// // //         summary: "آخرین تحولات بازار مسکن در تابستان ۱۴۰۴",
// // //         imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
// // //         categoryName: categoriesData[0]?.name || "خبر و گزارش",
// // //         categoryId: categoriesData[0]?.id || 1,
// // //         createdAt: new Date(Date.now() - 259200000).toISOString(),
// // //         viewCount: 3200,
// // //         authorName: "تحلیلگر بازار"
// // //       },
// // //       {
// // //         id: 5,
// // //         title: "قوانین جدید خرید و فروش ملک",
// // //         summary: "تغییرات قوانین خرید و فروش ملک در سال ۱۴۰۴",
// // //         imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
// // //         categoryName: categoriesData[1]?.name || "نکات معاملات ملکی",
// // //         categoryId: categoriesData[1]?.id || 2,
// // //         createdAt: new Date(Date.now() - 345600000).toISOString(),
// // //         viewCount: 1800,
// // //         authorName: "مشاور حقوقی"
// // //       },
// // //       {
// // //         id: 6,
// // //         title: "دکوراسیون مدرن آپارتمان",
// // //         summary: "ایده‌های جذاب برای دکوراسیون مدرن آپارتمان",
// // //         imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500",
// // //         categoryName: categoriesData[3]?.name || "دکوراسیون و بازسازی",
// // //         categoryId: categoriesData[3]?.id || 4,
// // //         createdAt: new Date(Date.now() - 432000000).toISOString(),
// // //         viewCount: 950,
// // //         authorName: "طراح داخلی"
// // //       },
// // //       {
// // //         id: 7,
// // //         title: "مقایسه مناطق مختلف تهران برای خرید ملک",
// // //         summary: "کدام منطقه تهران برای سرمایه‌گذاری مناسب‌تر است؟",
// // //         imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
// // //         categoryName: categoriesData[2]?.name || "مقالات ملکی",
// // //         categoryId: categoriesData[2]?.id || 3,
// // //         createdAt: new Date(Date.now() - 518400000).toISOString(),
// // //         viewCount: 1500,
// // //         authorName: "کارشناس سرمایه‌گذاری"
// // //       },
// // //       {
// // //         id: 8,
// // //         title: "مراحل قانونی خرید و فروش ملک",
// // //         summary: "همه مراحل قانونی خرید و فروش ملک از ابتدا تا انتها",
// // //         imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
// // //         categoryName: categoriesData[1]?.name || "نکات معاملات ملکی",
// // //         categoryId: categoriesData[1]?.id || 2,
// // //         createdAt: new Date(Date.now() - 604800000).toISOString(),
// // //         viewCount: 2300,
// // //         authorName: "وکیل پایه یک"
// // //       },
// // //       {
// // //         id: 9,
// // //         title: "سرمایه‌گذاری در املاک تجاری",
// // //         summary: "راهنمای سرمایه‌گذاری در املاک تجاری و اداری",
// // //         imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
// // //         categoryName: categoriesData[2]?.name || "مقالات ملکی",
// // //         categoryId: categoriesData[2]?.id || 3,
// // //         createdAt: new Date(Date.now() - 691200000).toISOString(),
// // //         viewCount: 1100,
// // //         authorName: "مشاور سرمایه‌گذاری"
// // //       },
// // //       {
// // //         id: 10,
// // //         title: "تاثیر نوسانات اقتصادی بر بازار مسکن",
// // //         summary: "بررسی تاثیر تورم و نرخ ارز بر قیمت مسکن",
// // //         imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
// // //         categoryName: categoriesData[0]?.name || "خبر و گزارش",
// // //         categoryId: categoriesData[0]?.id || 1,
// // //         createdAt: new Date(Date.now() - 777600000).toISOString(),
// // //         viewCount: 2800,
// // //         authorName: "تحلیلگر اقتصادی"
// // //       },
// // //       {
// // //         id: 11,
// // //         title: "نکات مهم در عقد قرارداد اجاره",
// // //         summary: "مواردی که باید در قرارداد اجاره حتماً لحاظ کنید",
// // //         imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500",
// // //         categoryName: categoriesData[1]?.name || "نکات معاملات ملکی",
// // //         categoryId: categoriesData[1]?.id || 2,
// // //         createdAt: new Date(Date.now() - 864000000).toISOString(),
// // //         viewCount: 1600,
// // //         authorName: "مشاور حقوقی"
// // //       },
// // //       {
// // //         id: 12,
// // //         title: "طراحی داخلی آپارتمان های کوچک",
// // //         summary: "ایده‌های خلاقانه برای طراحی آپارتمان های کوچک",
// // //         imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
// // //         categoryName: categoriesData[3]?.name || "دکوراسیون و بازسازی",
// // //         categoryId: categoriesData[3]?.id || 4,
// // //         createdAt: new Date(Date.now() - 950400000).toISOString(),
// // //         viewCount: 750,
// // //         authorName: "طراح داخلی"
// // //       }
// // //     ];

// // //     let filteredPosts = samplePosts;
// // //     if (selectedCategory) {
// // //       filteredPosts = samplePosts.filter(p => p.categoryId === selectedCategory.id);
// // //     }

// // //     if (searchTerm) {
// // //       filteredPosts = filteredPosts.filter(p => 
// // //         p.title.includes(searchTerm) || 
// // //         p.summary.includes(searchTerm) ||
// // //         p.categoryName.includes(searchTerm)
// // //       );
// // //     }

// // //     setPosts(filteredPosts);
// // //     setPagination({
// // //       pageNumber: 1,
// // //       pageSize: 9,
// // //       totalCount: filteredPosts.length,
// // //       totalPages: Math.ceil(filteredPosts.length / 9),
// // //       hasNextPage: filteredPosts.length > 9,
// // //       hasPreviousPage: false
// // //     });
// // //   };

// // //   // ===== جستجو =====
// // //   const handleSearch = () => {
// // //     setSearchTerm(searchInput);
// // //     generateSamplePosts(categories);
// // //   };

// // //   const handleSearchKeyDown = (e) => {
// // //     if (e.key === 'Enter') {
// // //       handleSearch();
// // //     }
// // //   };

// // //   const handleClearSearch = () => {
// // //     setSearchInput('');
// // //     setSearchTerm('');
// // //     generateSamplePosts(categories);
// // //   };

// // //   // ===== انتخاب دسته‌بندی =====
// // //   const handleCategorySelect = (category) => {
// // //     if (selectedCategory?.id === category.id) {
// // //       setSelectedCategory(null);
// // //     } else {
// // //       setSelectedCategory(category);
// // //     }
// // //     setTimeout(() => {
// // //       generateSamplePosts(categories);
// // //     }, 0);
// // //   };

// // //   // ===== تغییر صفحه =====
// // //   const handlePageChange = (newPage) => {
// // //     if (newPage >= 1 && newPage <= pagination.totalPages) {
// // //       setPagination(prev => ({ ...prev, pageNumber: newPage }));
// // //       window.scrollTo({ top: 0, behavior: 'smooth' });
// // //     }
// // //   };

// // //   // ===== رفتن به صفحه مطلب =====
// // //   const handlePostClick = (post) => {
// // //     navigate(`/blog/post/${post.id}`);
// // //   };

// // //   // ===== فرمت تاریخ =====
// // //   const formatDate = (dateString) => {
// // //     if (!dateString) return '';
// // //     const date = new Date(dateString);
// // //     return new Intl.DateTimeFormat('fa-IR', {
// // //       year: 'numeric',
// // //       month: 'long',
// // //       day: 'numeric'
// // //     }).format(date);
// // //   };

// // //   // ===== دریافت پست‌های صفحه جاری =====
// // //   const getCurrentPagePosts = () => {
// // //     const startIndex = (pagination.pageNumber - 1) * pagination.pageSize;
// // //     const endIndex = startIndex + pagination.pageSize;
// // //     return posts.slice(startIndex, endIndex);
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="blog-page-wrapper">
// // //         <div className="blog-loading">
// // //           <FaSpinner className="blog-loading-spinner" />
// // //           <span>در حال بارگذاری...</span>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   const currentPosts = getCurrentPagePosts();

// // //   return (
// // //     <div className="blog-page-wrapper">
// // //       {/* ===== هدر ===== */}
// // //       <div className="blog-header">
// // //         <h1 className="blog-title">وبلاگ مشاور املاک</h1>
// // //         <p className="blog-subtitle">
// // //           آخرین اخبار، مقالات و نکات تخصصی در حوزه املاک و مستغلات
// // //         </p>
// // //         <div className="blog-stats">
// // //           <span className="stat-badge">
// // //             <FaNewspaper /> {posts.length} مطلب
// // //           </span>
// // //           <span className="stat-badge">
// // //             <FaTag /> {categories.length} دسته‌بندی
// // //           </span>
// // //         </div>
// // //       </div>

// // //       {/* ===== سه ستونه ===== */}
// // //       <div className="blog-three-column">

// // //         {/* ===== ستون چپ (تبلیغات) ===== */}
// // //         <div className="blog-sidebar-left">
// // //           <div className="ad-card">
// // //             <div className="ad-badge">تبلیغات</div>
// // //             <div className="ad-content">
// // //               <FaBullhorn className="ad-icon" />
// // //               <h4>خرید و فروش ملک</h4>
// // //               <p>با مشاوران مجرب ما در تماس باشید</p>
// // //               <button className="ad-btn">تماس بگیرید</button>
// // //             </div>
// // //           </div>
// // //           <div className="ad-card">
// // //             <div className="ad-badge">تبلیغات</div>
// // //             <div className="ad-content">
// // //               <FaHome className="ad-icon" />
// // //               <h4>وام مسکن</h4>
// // //               <p>بهترین شرایط وام مسکن را دریافت کنید</p>
// // //               <button className="ad-btn">اطلاعات بیشتر</button>
// // //             </div>
// // //           </div>
// // //           <div className="ad-card">
// // //             <div className="ad-badge">تبلیغات</div>
// // //             <div className="ad-content">
// // //               <img 
// // //                 src="https://via.placeholder.com/300x200/7d0000/ffffff?text=تبلیغ+شما" 
// // //                 alt="تبلیغات" 
// // //                 className="ad-image"
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* ===== ستون وسط (مطالب) ===== */}
// // //         <div className="blog-main-content">
// // //           {/* جستجو و دسته‌بندی */}
// // //           <div className="blog-search-section">
// // //             <div className="blog-search-wrapper">
// // //               <FaSearch className="blog-search-icon" />
// // //               <input
// // //                 type="text"
// // //                 className="blog-search-input"
// // //                 placeholder="جستجو در مطالب..."
// // //                 value={searchInput}
// // //                 onChange={(e) => setSearchInput(e.target.value)}
// // //                 onKeyDown={handleSearchKeyDown}
// // //               />
// // //               {searchInput && (
// // //                 <button className="blog-search-clear" onClick={handleClearSearch}>
// // //                   <FaTimesCircle />
// // //                 </button>
// // //               )}
// // //               <button className="blog-search-btn" onClick={handleSearch}>
// // //                 جستجو
// // //               </button>
// // //             </div>

// // //             <div className="blog-categories-scroll">
// // //               <button 
// // //                 className={`category-btn ${!selectedCategory ? 'active' : ''}`}
// // //                 onClick={() => {
// // //                   setSelectedCategory(null);
// // //                   generateSamplePosts(categories);
// // //                 }}
// // //               >
// // //                 همه
// // //               </button>
// // //               {categories.map((category) => (
// // //                 <button
// // //                   key={category.id}
// // //                   className={`category-btn ${selectedCategory?.id === category.id ? 'active' : ''}`}
// // //                   onClick={() => handleCategorySelect(category)}
// // //                 >
// // //                   <FaTag className="category-icon-small" />
// // //                   {category.name}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           {/* فیلترهای فعال */}
// // //           {(selectedCategory || searchTerm) && (
// // //             <div className="blog-filters">
// // //               {selectedCategory && (
// // //                 <span className="filter-tag">
// // //                   {selectedCategory.name}
// // //                   <button 
// // //                     className="remove-filter"
// // //                     onClick={() => {
// // //                       setSelectedCategory(null);
// // //                       generateSamplePosts(categories);
// // //                     }}
// // //                   >
// // //                     ✕
// // //                   </button>
// // //                 </span>
// // //               )}
// // //               {searchTerm && (
// // //                 <span className="filter-tag search">
// // //                   "{searchTerm}"
// // //                   <button 
// // //                     className="remove-filter"
// // //                     onClick={handleClearSearch}
// // //                   >
// // //                     ✕
// // //                   </button>
// // //                 </span>
// // //               )}
// // //               <span className="total-count">{posts.length} مطلب</span>
// // //             </div>
// // //           )}

// // //           {/* لیست مطالب */}
// // //           <div className="blog-posts-section">
// // //             {loadingPosts ? (
// // //               <div className="blog-posts-loading">
// // //                 <FaSpinner className="loading-spinner" />
// // //                 <span>در حال بارگذاری مطالب...</span>
// // //               </div>
// // //             ) : posts.length === 0 ? (
// // //               <div className="blog-empty">
// // //                 <FaNewspaper className="empty-icon" />
// // //                 <h3>مطلبی یافت نشد</h3>
// // //                 <p>هیچ مطلبی با این شرایط پیدا نشد</p>
// // //                 <button onClick={handleClearSearch} className="clear-search-btn">
// // //                   پاک کردن فیلترها
// // //                 </button>
// // //               </div>
// // //             ) : (
// // //               <>
// // //                 <div className="blog-posts-grid">
// // //                   {currentPosts.map((post) => (
// // //                     <div 
// // //                       key={post.id} 
// // //                       className="blog-post-card"
// // //                       onClick={() => handlePostClick(post)}
// // //                     >
// // //                       {post.imageUrl && (
// // //                         <div className="post-image-wrapper">
// // //                           <img 
// // //                             src={post.imageUrl} 
// // //                             alt={post.title} 
// // //                             className="post-image"
// // //                             loading="lazy"
// // //                             onError={(e) => {
// // //                               e.target.src = 'https://via.placeholder.com/400x300/7d0000/ffffff?text=وبلاگ';
// // //                             }}
// // //                           />
// // //                           {post.categoryName && (
// // //                             <span className="post-category-badge">
// // //                               {post.categoryName}
// // //                             </span>
// // //                           )}
// // //                         </div>
// // //                       )}
// // //                       <div className="post-content">
// // //                         <h3 className="post-title">{post.title}</h3>
// // //                         <p className="post-summary">{post.summary}</p>
// // //                         <div className="post-meta">
// // //                           <span>
// // //                             <FaCalendarAlt /> {formatDate(post.createdAt)}
// // //                           </span>
// // //                           <span>
// // //                             <FaEye /> {post.viewCount || 0}
// // //                           </span>
// // //                         </div>
// // //                         <div className="post-read-more">
// // //                           ادامه مطلب <FaArrowLeft />
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>

// // //                 {/* صفحه‌بندی */}
// // //                 {pagination.totalPages > 1 && (
// // //                   <div className="blog-pagination">
// // //                     <button
// // //                       className="page-btn"
// // //                       onClick={() => handlePageChange(pagination.pageNumber - 1)}
// // //                       disabled={!pagination.hasPreviousPage}
// // //                     >
// // //                       <FaChevronRight />
// // //                     </button>
                    
// // //                     {[...Array(pagination.totalPages)].map((_, index) => {
// // //                       const pageNum = index + 1;
// // //                       const isActive = pageNum === pagination.pageNumber;
// // //                       if (
// // //                         pageNum === 1 ||
// // //                         pageNum === pagination.totalPages ||
// // //                         (pageNum >= pagination.pageNumber - 1 && pageNum <= pagination.pageNumber + 1)
// // //                       ) {
// // //                         return (
// // //                           <button
// // //                             key={pageNum}
// // //                             className={`page-btn ${isActive ? 'active' : ''}`}
// // //                             onClick={() => handlePageChange(pageNum)}
// // //                           >
// // //                             {pageNum}
// // //                           </button>
// // //                         );
// // //                       }
// // //                       if (pageNum === pagination.pageNumber - 2 || pageNum === pagination.pageNumber + 2) {
// // //                         return <span key={pageNum} className="page-dots">...</span>;
// // //                       }
// // //                       return null;
// // //                     })}
                    
// // //                     <button
// // //                       className="page-btn"
// // //                       onClick={() => handlePageChange(pagination.pageNumber + 1)}
// // //                       disabled={!pagination.hasNextPage}
// // //                     >
// // //                       <FaChevronLeft />
// // //                     </button>
// // //                   </div>
// // //                 )}
// // //               </>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* ===== ستون راست (تبلیغات) ===== */}
// // //         <div className="blog-sidebar-right">
// // //           <div className="ad-card">
// // //             <div className="ad-badge">تبلیغات</div>
// // //             <div className="ad-content">
// // //               <FaAd className="ad-icon" />
// // //               <h4>ثبت آگهی رایگان</h4>
// // //               <p>ملک خود را رایگان ثبت کنید</p>
// // //               <button className="ad-btn">ثبت آگهی</button>
// // //             </div>
// // //           </div>
// // //           <div className="ad-card">
// // //             <div className="ad-badge">تبلیغات</div>
// // //             <div className="ad-content">
// // //               <img 
// // //                 src="https://via.placeholder.com/300x250/7d0000/ffffff?text=تبلیغات+ویژه" 
// // //                 alt="تبلیغات" 
// // //                 className="ad-image"
// // //               />
// // //             </div>
// // //           </div>
// // //           <div className="ad-card">
// // //             <div className="ad-badge">تبلیغات</div>
// // //             <div className="ad-content">
// // //               <h4>مشاوره رایگان</h4>
// // //               <p>با کارشناسان ما مشاوره رایگان بگیرید</p>
// // //               <button className="ad-btn">درخواست مشاوره</button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default BlogPage;

// // import React, { useState, useEffect, useCallback } from 'react';
// // import { 
// //   FaNewspaper, FaTag, FaArrowLeft, FaArrowRight, 
// //   FaSpinner, FaCalendarAlt, FaUser, FaEye,
// //   FaSearch, FaTimesCircle, FaChevronLeft, FaChevronRight,
// //   FaAd, FaBullhorn, FaHome
// // } from 'react-icons/fa';
// // import { useNavigate } from 'react-router-dom';
// // import './BlogPage.css';

// // const BlogPage = () => {
// //   const navigate = useNavigate();
// //   const [categories, setCategories] = useState([]);
// //   const [posts, setPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [loadingPosts, setLoadingPosts] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [selectedCategory, setSelectedCategory] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [searchInput, setSearchInput] = useState('');
// //   const [pagination, setPagination] = useState({
// //     pageNumber: 1,
// //     pageSize: 9,
// //     totalCount: 0,
// //     totalPages: 0,
// //     hasNextPage: false,
// //     hasPreviousPage: false
// //   });

// //   // ===== دریافت دسته‌بندی‌ها =====
// //   useEffect(() => {
// //     fetchCategories();
// //   }, []);

// //   const fetchCategories = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await fetch('https://localhost:7178/api/Post/GetCategoryPostsDTOs', {
// //         headers: {
// //           'Content-Type': 'application/json'
// //         }
// //       });

// //       if (!response.ok) throw new Error('خطا در دریافت دسته‌بندی‌ها');
      
// //       const result = await response.json();
// //       if (result.status === 200 && result.data) {
// //         setCategories(result.data);
// //         // دریافت پست‌ها بعد از دریافت دسته‌بندی‌ها
// //         await fetchPosts();
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا:', error);
// //       setError('مشکل در دریافت دسته‌بندی‌ها');
// //       // در صورت خطا، از داده‌های نمونه استفاده کن
// //       generateSamplePosts([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ===== دریافت پست‌ها از API =====
// //   const fetchPosts = async (categoryId = null, search = '') => {
// //     try {
// //       setLoadingPosts(true);
      
// //       // ساخت URL با پارامترهای جستجو
// //       let url = 'https://localhost:7178/api/Post/getPostCategoryDto';
// //       const params = new URLSearchParams();
      
// //       if (categoryId) {
// //         params.append('categoryId', categoryId);
// //       }
// //       if (search) {
// //         params.append('search', search);
// //       }
      
// //       if (params.toString()) {
// //         url += `?${params.toString()}`;
// //       }
      
// //       const response = await fetch(url, {
// //         headers: {
// //           'Content-Type': 'application/json'
// //         }
// //       });

// //       if (!response.ok) throw new Error('خطا در دریافت مطالب');
      
// //       const result = await response.json();
      
// //       if (result.status === 200 && result.data) {
// //         // تبدیل داده‌های API به فرمت مورد نیاز
// //         const formattedPosts = result.data.map(post => ({
// //           id: post.id,
// //           title: post.title,
// //           summary: post.summary,
// //           imageUrl: post.imageUrl ? `https://localhost:7178/uploads/${post.imageUrl}` : 'https://via.placeholder.com/400x300/7d0000/ffffff?text=وبلاگ',
// //           categoryName: post.categoryPostName,
// //           categoryId: categories.find(c => c.name === post.categoryPostName)?.id || null,
// //           createdAt: post.createdAt,
// //           viewCount: post.countView || 0,
// //           authorName: "نویسنده" // اگر API نویسنده را برنگرداند
// //         }));
        
// //         setPosts(formattedPosts);
// //         updatePagination(formattedPosts.length);
// //       } else {
// //         // اگر داده‌ای نبود، از نمونه استفاده کن
// //         generateSamplePosts(categories);
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا در دریافت پست‌ها:', error);
// //       // در صورت خطا، از داده‌های نمونه استفاده کن
// //       generateSamplePosts(categories);
// //     } finally {
// //       setLoadingPosts(false);
// //     }
// //   };

// //   // ===== به‌روزرسانی صفحه‌بندی =====
// //   const updatePagination = (totalCount) => {
// //     const pageSize = 9;
// //     const totalPages = Math.ceil(totalCount / pageSize);
// //     setPagination({
// //       pageNumber: 1,
// //       pageSize: pageSize,
// //       totalCount: totalCount,
// //       totalPages: totalPages,
// //       hasNextPage: totalCount > pageSize,
// //       hasPreviousPage: false
// //     });
// //   };

// //   // ===== تولید پست‌های نمونه (برای مواقع خطا) =====
// //   const generateSamplePosts = (categoriesData) => {
// //     const samplePosts = [
// //       {
// //         id: 1,
// //         title: "راهنمای خرید آپارتمان در تهران",
// //         summary: "همه چیز درباره خرید آپارتمان در تهران از انتخاب منطقه تا عقد قرارداد",
// //         imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
// //         categoryName: categoriesData[2]?.name || "مقالات ملکی",
// //         categoryId: categoriesData[2]?.id || 3,
// //         createdAt: new Date().toISOString(),
// //         viewCount: 1250,
// //         authorName: "مشاور املاک"
// //       },
// //       // ... بقیه پست‌های نمونه
// //     ];

// //     let filteredPosts = samplePosts;
// //     if (selectedCategory) {
// //       filteredPosts = samplePosts.filter(p => p.categoryId === selectedCategory.id);
// //     }

// //     if (searchTerm) {
// //       filteredPosts = filteredPosts.filter(p => 
// //         p.title.includes(searchTerm) || 
// //         p.summary.includes(searchTerm) ||
// //         p.categoryName.includes(searchTerm)
// //       );
// //     }

// //     setPosts(filteredPosts);
// //     updatePagination(filteredPosts.length);
// //   };

// //   // ===== جستجو =====
// //   const handleSearch = async () => {
// //     setSearchTerm(searchInput);
// //     // اگر API از جستجو پشتیبانی می‌کند، از آن استفاده کن
// //     if (selectedCategory) {
// //       await fetchPosts(selectedCategory.id, searchInput);
// //     } else {
// //       await fetchPosts(null, searchInput);
// //     }
// //   };

// //   const handleSearchKeyDown = (e) => {
// //     if (e.key === 'Enter') {
// //       handleSearch();
// //     }
// //   };

// //   const handleClearSearch = async () => {
// //     setSearchInput('');
// //     setSearchTerm('');
// //     // بازنشانی جستجو
// //     if (selectedCategory) {
// //       await fetchPosts(selectedCategory.id);
// //     } else {
// //       await fetchPosts();
// //     }
// //   };

// //   // ===== انتخاب دسته‌بندی =====
// //   const handleCategorySelect = async (category) => {
// //     if (selectedCategory?.id === category.id) {
// //       setSelectedCategory(null);
// //       await fetchPosts();
// //     } else {
// //       setSelectedCategory(category);
// //       await fetchPosts(category.id);
// //     }
// //   };

// //   // ===== تغییر صفحه =====
// //   const handlePageChange = (newPage) => {
// //     if (newPage >= 1 && newPage <= pagination.totalPages) {
// //       setPagination(prev => ({ ...prev, pageNumber: newPage }));
// //       window.scrollTo({ top: 0, behavior: 'smooth' });
// //     }
// //   };

// //   // ===== رفتن به صفحه مطلب =====
// //   const handlePostClick = (post) => {
// //     navigate(`/blog/post/${post.id}`);
// //   };

// //   // ===== فرمت تاریخ =====
// //   const formatDate = (dateString) => {
// //     if (!dateString) return '';
// //     const date = new Date(dateString);
// //     return new Intl.DateTimeFormat('fa-IR', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric'
// //     }).format(date);
// //   };

// //   // ===== دریافت پست‌های صفحه جاری =====
// //   const getCurrentPagePosts = () => {
// //     const startIndex = (pagination.pageNumber - 1) * pagination.pageSize;
// //     const endIndex = startIndex + pagination.pageSize;
// //     return posts.slice(startIndex, endIndex);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="blog-page-wrapper">
// //         <div className="blog-loading">
// //           <FaSpinner className="blog-loading-spinner" />
// //           <span>در حال بارگذاری...</span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const currentPosts = getCurrentPagePosts();

// //   return (
// //     <div className="blog-page-wrapper">
// //       {/* ===== هدر ===== */}
// //       <div className="blog-header">
// //         <h1 className="blog-title">وبلاگ مشاور املاک</h1>
// //         <p className="blog-subtitle">
// //           آخرین اخبار، مقالات و نکات تخصصی در حوزه املاک و مستغلات
// //         </p>
// //         <div className="blog-stats">
// //           <span className="stat-badge">
// //             <FaNewspaper /> {posts.length} مطلب
// //           </span>
// //           <span className="stat-badge">
// //             <FaTag /> {categories.length} دسته‌بندی
// //           </span>
// //         </div>
// //       </div>

// //       {/* ===== سه ستونه ===== */}
// //       <div className="blog-three-column">

// //         {/* ===== ستون چپ (تبلیغات) ===== */}
// //         <div className="blog-sidebar-left">
// //           {/* ... کد تبلیغات ... */}
// //         </div>

// //         {/* ===== ستون وسط (مطالب) ===== */}
// //         <div className="blog-main-content">
// //           {/* جستجو و دسته‌بندی */}
// //           <div className="blog-search-section">
// //             <div className="blog-search-wrapper">
// //               <FaSearch className="blog-search-icon" />
// //               <input
// //                 type="text"
// //                 className="blog-search-input"
// //                 placeholder="جستجو در مطالب..."
// //                 value={searchInput}
// //                 onChange={(e) => setSearchInput(e.target.value)}
// //                 onKeyDown={handleSearchKeyDown}
// //               />
// //               {searchInput && (
// //                 <button className="blog-search-clear" onClick={handleClearSearch}>
// //                   <FaTimesCircle />
// //                 </button>
// //               )}
// //               <button className="blog-search-btn" onClick={handleSearch}>
// //                 جستجو
// //               </button>
// //             </div>

// //             <div className="blog-categories-scroll">
// //               <button 
// //                 className={`category-btn ${!selectedCategory ? 'active' : ''}`}
// //                 onClick={() => {
// //                   setSelectedCategory(null);
// //                   fetchPosts();
// //                 }}
// //               >
// //                 همه
// //               </button>
// //               {categories.map((category) => (
// //                 <button
// //                   key={category.id}
// //                   className={`category-btn ${selectedCategory?.id === category.id ? 'active' : ''}`}
// //                   onClick={() => handleCategorySelect(category)}
// //                 >
// //                   <FaTag className="category-icon-small" />
// //                   {category.name}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* فیلترهای فعال */}
// //           {(selectedCategory || searchTerm) && (
// //             <div className="blog-filters">
// //               {selectedCategory && (
// //                 <span className="filter-tag">
// //                   {selectedCategory.name}
// //                   <button 
// //                     className="remove-filter"
// //                     onClick={() => {
// //                       setSelectedCategory(null);
// //                       fetchPosts();
// //                     }}
// //                   >
// //                     ✕
// //                   </button>
// //                 </span>
// //               )}
// //               {searchTerm && (
// //                 <span className="filter-tag search">
// //                   "{searchTerm}"
// //                   <button 
// //                     className="remove-filter"
// //                     onClick={handleClearSearch}
// //                   >
// //                     ✕
// //                   </button>
// //                 </span>
// //               )}
// //               <span className="total-count">{posts.length} مطلب</span>
// //             </div>
// //           )}

// //           {/* لیست مطالب */}
// //           <div className="blog-posts-section">
// //             {loadingPosts ? (
// //               <div className="blog-posts-loading">
// //                 <FaSpinner className="loading-spinner" />
// //                 <span>در حال بارگذاری مطالب...</span>
// //               </div>
// //             ) : posts.length === 0 ? (
// //               <div className="blog-empty">
// //                 <FaNewspaper className="empty-icon" />
// //                 <h3>مطلبی یافت نشد</h3>
// //                 <p>هیچ مطلبی با این شرایط پیدا نشد</p>
// //                 <button onClick={handleClearSearch} className="clear-search-btn">
// //                   پاک کردن فیلترها
// //                 </button>
// //               </div>
// //             ) : (
// //               <>
// //                 <div className="blog-posts-grid">
// //                   {currentPosts.map((post) => (
// //                     <div 
// //                       key={post.id} 
// //                       className="blog-post-card"
// //                       onClick={() => handlePostClick(post)}
// //                     >
// //                       {post.imageUrl && (
// //                         <div className="post-image-wrapper">
// //                           <img 
// //                             src={post.imageUrl} 
// //                             alt={post.title} 
// //                             className="post-image"
// //                             loading="lazy"
// //                             onError={(e) => {
// //                               e.target.src = 'https://via.placeholder.com/400x300/7d0000/ffffff?text=وبلاگ';
// //                             }}
// //                           />
// //                           {post.categoryName && (
// //                             <span className="post-category-badge">
// //                               {post.categoryName}
// //                             </span>
// //                           )}
// //                         </div>
// //                       )}
// //                       <div className="post-content">
// //                         <h3 className="post-title">{post.title}</h3>
// //                         <p className="post-summary">{post.summary}</p>
// //                         <div className="post-meta">
// //                           <span>
// //                             <FaCalendarAlt /> {formatDate(post.createdAt)}
// //                           </span>
// //                           <span>
// //                             <FaEye /> {post.viewCount || 0}
// //                           </span>
// //                         </div>
// //                         <div className="post-read-more">
// //                           ادامه مطلب <FaArrowLeft />
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>

// //                 {/* صفحه‌بندی */}
// //                 {pagination.totalPages > 1 && (
// //                   <div className="blog-pagination">
// //                     <button
// //                       className="page-btn"
// //                       onClick={() => handlePageChange(pagination.pageNumber - 1)}
// //                       disabled={!pagination.hasPreviousPage}
// //                     >
// //                       <FaChevronRight />
// //                     </button>
                    
// //                     {[...Array(pagination.totalPages)].map((_, index) => {
// //                       const pageNum = index + 1;
// //                       const isActive = pageNum === pagination.pageNumber;
// //                       if (
// //                         pageNum === 1 ||
// //                         pageNum === pagination.totalPages ||
// //                         (pageNum >= pagination.pageNumber - 1 && pageNum <= pagination.pageNumber + 1)
// //                       ) {
// //                         return (
// //                           <button
// //                             key={pageNum}
// //                             className={`page-btn ${isActive ? 'active' : ''}`}
// //                             onClick={() => handlePageChange(pageNum)}
// //                           >
// //                             {pageNum}
// //                           </button>
// //                         );
// //                       }
// //                       if (pageNum === pagination.pageNumber - 2 || pageNum === pagination.pageNumber + 2) {
// //                         return <span key={pageNum} className="page-dots">...</span>;
// //                       }
// //                       return null;
// //                     })}
                    
// //                     <button
// //                       className="page-btn"
// //                       onClick={() => handlePageChange(pagination.pageNumber + 1)}
// //                       disabled={!pagination.hasNextPage}
// //                     >
// //                       <FaChevronLeft />
// //                     </button>
// //                   </div>
// //                 )}
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* ===== ستون راست (تبلیغات) ===== */}
// //         <div className="blog-sidebar-right">
// //           {/* ... کد تبلیغات ... */}
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default BlogPage;

// import React, { useState, useEffect, useCallback } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { 
//   FaNewspaper, FaTag, FaArrowLeft, FaArrowRight, 
//   FaSpinner, FaCalendarAlt, FaUser, FaEye,
//   FaSearch, FaTimesCircle, FaChevronLeft, FaChevronRight,
//   FaAd, FaBullhorn, FaHome, FaShareAlt, FaBookmark
// } from 'react-icons/fa';
// import { useNavigate, Link } from 'react-router-dom';
// import './BlogPage.css';

// const BlogPage = () => {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingPosts, setLoadingPosts] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchInput, setSearchInput] = useState('');
//   const [pagination, setPagination] = useState({
//     pageNumber: 1,
//     pageSize: 9,
//     totalCount: 0,
//     totalPages: 0,
//     hasNextPage: false,
//     hasPreviousPage: false
//   });

//   // ===== متادیتا =====
//   const pageTitle = selectedCategory 
//     ? `${selectedCategory.name} | وبلاگ مشاور املاک` 
//     : searchTerm 
//       ? `نتایج جستجو برای "${searchTerm}" | وبلاگ مشاور املاک`
//       : 'وبلاگ مشاور املاک | مقالات و اخبار حوزه املاک و مستغلات';
  
//   const pageDescription = selectedCategory
//     ? `مطالب و مقالات دسته‌بندی ${selectedCategory.name} در وبلاگ مشاور املاک. راهنمای خرید، فروش و اجاره ملک`
//     : searchTerm
//       ? `نتایج جستجو برای "${searchTerm}" در وبلاگ مشاور املاک. ${posts.length} مطلب پیدا شد`
//       : 'آخرین اخبار، مقالات و نکات تخصصی در حوزه املاک و مستغلات. راهنمای خرید، فروش، اجاره و سرمایه‌گذاری ملک';

//   const pageKeywords = selectedCategory
//     ? `وبلاگ املاک, ${selectedCategory.name}, مشاور املاک, خرید ملک, فروش ملک, اجاره ملک`
//     : 'وبلاگ املاک, مشاور املاک, خرید ملک, فروش ملک, اجاره ملک, سرمایه‌گذاری, بازار مسکن';

//   // ===== دریافت دسته‌بندی‌ها =====
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('https://localhost:7178/api/Post/GetCategoryPostsDTOs', {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) throw new Error('خطا در دریافت دسته‌بندی‌ها');
      
//       const result = await response.json();
//       if (result.status === 200 && result.data) {
//         setCategories(result.data);
//         await fetchPosts();
//       }
//     } catch (error) {
//       console.error('❌ خطا:', error);
//       setError('مشکل در دریافت دسته‌بندی‌ها');
//       generateSamplePosts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===== دریافت پست‌ها از API =====
//   const fetchPosts = async (categoryId = null, search = '') => {
//     try {
//       setLoadingPosts(true);
      
//       let url = 'https://localhost:7178/api/Post/getPostCategoryDto';
//       const params = new URLSearchParams();
      
//       if (categoryId) {
//         params.append('categoryId', categoryId);
//       }
//       if (search) {
//         params.append('search', search);
//       }
      
//       if (params.toString()) {
//         url += `?${params.toString()}`;
//       }
      
//       const response = await fetch(url, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) throw new Error('خطا در دریافت مطالب');
      
//       const result = await response.json();
      
//       if (result.status === 200 && result.data) {
//         const formattedPosts = result.data.map(post => ({
//           id: post.id,
//           title: post.title,
//           slug: post.slug || post.id,
//           summary: post.summary,
//           imageUrl: post.imageUrl ? `https://localhost:7178/post/${post.imageUrl}` : `https://localhost:7178/post/${post.imageUrl}`,
//           categoryName: post.categoryPostName,
//           categoryId: categories.find(c => c.name === post.categoryPostName)?.id || null,
//           createdAt: post.createdAt,
//           createdAtPersianRelative: post.createdAtPersianRelative,
//           viewCount: post.countView || 0,
//           authorName: "نویسنده"
//         }));
        
//         setPosts(formattedPosts);
//         updatePagination(formattedPosts.length);
//       } else {
//         generateSamplePosts(categories);
//       }
//     } catch (error) {
//       console.error('❌ خطا در دریافت پست‌ها:', error);
//       generateSamplePosts(categories);
//     } finally {
//       setLoadingPosts(false);
//     }
//   };

//   // ===== به‌روزرسانی صفحه‌بندی =====
//   const updatePagination = (totalCount) => {
//     const pageSize = 9;
//     const totalPages = Math.ceil(totalCount / pageSize);
//     setPagination({
//       pageNumber: 1,
//       pageSize: pageSize,
//       totalCount: totalCount,
//       totalPages: totalPages,
//       hasNextPage: totalCount > pageSize,
//       hasPreviousPage: false
//     });
//   };

//   // ===== تولید پست‌های نمونه =====
//   const generateSamplePosts = (categoriesData) => {
//     const samplePosts = [
//       {
//         id: 1,
//         title: "راهنمای خرید آپارتمان در تهران",
//         slug: "راهنمای-خرید-آپارتمان-در-تهران",
//         summary: "همه چیز درباره خرید آپارتمان در تهران از انتخاب منطقه تا عقد قرارداد",
//         imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
//         categoryName: categoriesData[2]?.name || "مقالات ملکی",
//         categoryId: categoriesData[2]?.id || 3,
//         createdAt: new Date().toISOString(),
//         viewCount: 1250,
//         authorName: "مشاور املاک"
//       },
//       // ... بقیه پست‌ها
//     ];

//     let filteredPosts = samplePosts;
//     if (selectedCategory) {
//       filteredPosts = samplePosts.filter(p => p.categoryId === selectedCategory.id);
//     }

//     if (searchTerm) {
//       filteredPosts = filteredPosts.filter(p => 
//         p.title.includes(searchTerm) || 
//         p.summary.includes(searchTerm) ||
//         p.categoryName.includes(searchTerm)
//       );
//     }

//     setPosts(filteredPosts);
//     updatePagination(filteredPosts.length);
//   };

//   // ===== جستجو =====
//   const handleSearch = async () => {
//     setSearchTerm(searchInput);
//     if (selectedCategory) {
//       await fetchPosts(selectedCategory.id, searchInput);
//     } else {
//       await fetchPosts(null, searchInput);
//     }
//     // به روز رسانی URL برای سئو
//     const url = new URL(window.location);
//     if (searchInput) {
//       url.searchParams.set('q', searchInput);
//     } else {
//       url.searchParams.delete('q');
//     }
//     window.history.pushState({}, '', url);
//   };

//   const handleSearchKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const handleClearSearch = async () => {
//     setSearchInput('');
//     setSearchTerm('');
//     const url = new URL(window.location);
//     url.searchParams.delete('q');
//     window.history.pushState({}, '', url);
//     if (selectedCategory) {
//       await fetchPosts(selectedCategory.id);
//     } else {
//       await fetchPosts();
//     }
//   };

//   // ===== انتخاب دسته‌بندی =====
//   const handleCategorySelect = async (category) => {
//     if (selectedCategory?.id === category.id) {
//       setSelectedCategory(null);
//       await fetchPosts();
//     } else {
//       setSelectedCategory(category);
//       await fetchPosts(category.id);
//     }
//     // به روز رسانی URL
//     const url = new URL(window.location);
//     if (category.id) {
//       url.searchParams.set('category', category.id);
//     } else {
//       url.searchParams.delete('category');
//     }
//     window.history.pushState({}, '', url);
//   };

//   // ===== تغییر صفحه =====
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       setPagination(prev => ({ ...prev, pageNumber: newPage }));
//       // به روز رسانی URL
//       const url = new URL(window.location);
//       url.searchParams.set('page', newPage);
//       window.history.pushState({}, '', url);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   // ===== رفتن به صفحه مطلب =====
//   const handlePostClick = (post) => {
//     navigate(`/blog/post/${post.slug || post.id}`);
//   };

//   // ===== فرمت تاریخ =====
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('fa-IR', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     }).format(date);
//   };

//   // ===== دریافت پست‌های صفحه جاری =====
//   const getCurrentPagePosts = () => {
//     const startIndex = (pagination.pageNumber - 1) * pagination.pageSize;
//     const endIndex = startIndex + pagination.pageSize;
//     return posts.slice(startIndex, endIndex);
//   };

//   // ===== Schema Markup =====
//   const generateSchemaMarkup = () => {
//     const baseUrl = 'https://yourdomain.com';
//     const blogSchema = {
//       "@context": "https://schema.org",
//       "@type": "Blog",
//       "headline": "وبلاگ مشاور املاک",
//       "description": pageDescription,
//       "url": baseUrl + window.location.pathname,
//       "mainEntity": {
//         "@type": "ItemList",
//         "itemListElement": posts.map((post, index) => ({
//           "@type": "ListItem",
//           "position": index + 1,
//           "url": `${baseUrl}/blog/post/${post.slug || post.id}`,
//           "name": post.title
//         }))
//       }
//     };

//     // Schema برای Breadcrumb
//     const breadcrumbSchema = {
//       "@context": "https://schema.org",
//       "@type": "BreadcrumbList",
//       "itemListElement": [
//         {
//           "@type": "ListItem",
//           "position": 1,
//           "name": "خانه",
//           "item": baseUrl
//         },
//         {
//           "@type": "ListItem",
//           "position": 2,
//           "name": selectedCategory ? selectedCategory.name : "وبلاگ",
//           "item": baseUrl + window.location.pathname
//         }
//       ]
//     };

//     return { blogSchema, breadcrumbSchema };
//   };

//   if (loading) {
//     return (
//       <div className="blog-page-wrapper" role="main" aria-label="در حال بارگذاری وبلاگ">
//         <Helmet>
//           <title>در حال بارگذاری | وبلاگ مشاور املاک</title>
//         </Helmet>
//         <div className="blog-loading">
//           <FaSpinner className="blog-loading-spinner" aria-hidden="true" />
//           <span>در حال بارگذاری...</span>
//         </div>
//       </div>
//     );
//   }

//   const currentPosts = getCurrentPagePosts();
//   const schemas = generateSchemaMarkup();

//   return (
//     <>
//       <Helmet>
//         <title>{pageTitle}</title>
//         <meta name="description" content={pageDescription} />
//         <meta name="keywords" content={pageKeywords} />
//         <link rel="canonical" href={`https://yourdomain.com${window.location.pathname}`} />
        
//         {/* Open Graph */}
//         <meta property="og:title" content={pageTitle} />
//         <meta property="og:description" content={pageDescription} />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={`https://yourdomain.com${window.location.pathname}`} />
//         <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
//         <meta property="og:site_name" content="مشاور املاک" />
//         <meta property="og:locale" content="fa_IR" />
        
//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={pageTitle} />
//         <meta name="twitter:description" content={pageDescription} />
//         <meta name="twitter:image" content="https://yourdomain.com/og-image.jpg" />
        
//         {/* Schema Markup */}
//         <script type="application/ld+json">
//           {JSON.stringify(schemas.blogSchema)}
//         </script>
//         <script type="application/ld+json">
//           {JSON.stringify(schemas.breadcrumbSchema)}
//         </script>
//       </Helmet>

//       <article className="blog-page-wrapper" role="main" aria-label="صفحه وبلاگ">
//         {/* ===== هدر ===== */}
//         <header className="blog-header">
//           <h1 className="blog-title">
//             {selectedCategory ? `دسته‌بندی: ${selectedCategory.name}` : 'وبلاگ مشاور املاک'}
//           </h1>
//           {!selectedCategory && (
//             <p className="blog-subtitle">
//               آخرین اخبار، مقالات و نکات تخصصی در حوزه املاک و مستغلات
//             </p>
//           )}
//           <div className="blog-stats" aria-label="آمار وبلاگ">
//             <span className="stat-badge">
//               <FaNewspaper aria-hidden="true" /> {posts.length} مطلب
//             </span>
//             <span className="stat-badge">
//               <FaTag aria-hidden="true" /> {categories.length} دسته‌بندی
//             </span>
//           </div>
//         </header>

//         {/* ===== Breadcrumb ===== */}
//         <nav className="blog-breadcrumb" aria-label="مسیر راهنما">
//           <ol className="breadcrumb-list">
//             <li className="breadcrumb-item">
//               <Link to="/" className="breadcrumb-link">
//                 <FaHome aria-hidden="true" /> خانه
//               </Link>
//             </li>
//             <li className="breadcrumb-item">
//               <Link to="/blog" className="breadcrumb-link">
//                 وبلاگ
//               </Link>
//             </li>
//             {selectedCategory && (
//               <li className="breadcrumb-item active" aria-current="page">
//                 {selectedCategory.name}
//               </li>
//             )}
//             {searchTerm && (
//               <li className="breadcrumb-item active" aria-current="page">
//                 جستجو: "{searchTerm}"
//               </li>
//             )}
//           </ol>
//         </nav>

//         {/* ===== سه ستونه ===== */}
//         <div className="blog-three-column">

//           {/* ===== ستون چپ (تبلیغات) ===== */}
//           <aside className="blog-sidebar-left" aria-label="تبلیغات و اطلاعات جانبی">
//             <div className="ad-card" role="complementary">
//               <div className="ad-badge">تبلیغات</div>
//               <div className="ad-content">
//                 <FaBullhorn className="ad-icon" aria-hidden="true" />
//                 <h4>خرید و فروش ملک</h4>
//                 <p>با مشاوران مجرب ما در تماس باشید</p>
//                 <button className="ad-btn" aria-label="تماس با مشاوران">تماس بگیرید</button>
//               </div>
//             </div>
//             <div className="ad-card" role="complementary">
//               <div className="ad-badge">تبلیغات</div>
//               <div className="ad-content">
//                 <FaHome className="ad-icon" aria-hidden="true" />
//                 <h4>وام مسکن</h4>
//                 <p>بهترین شرایط وام مسکن را دریافت کنید</p>
//                 <button className="ad-btn" aria-label="اطلاعات بیشتر درباره وام مسکن">اطلاعات بیشتر</button>
//               </div>
//             </div>
//             <div className="ad-card" role="complementary">
//               <div className="ad-badge">تبلیغات</div>
//               <div className="ad-content">
//                 <img 
//                   src="https://via.placeholder.com/300x200/7d0000/ffffff?text=تبلیغ+شما" 
//                   alt="فضای تبلیغاتی شما در وبلاگ مشاور املاک" 
//                   className="ad-image"
//                   loading="lazy"
//                 />
//               </div>
//             </div>
//           </aside>

//           {/* ===== ستون وسط (مطالب) ===== */}
//           <main className="blog-main-content" aria-label="مطالب وبلاگ">
//             {/* جستجو و دسته‌بندی */}
//             <section className="blog-search-section" aria-label="جستجو و فیلتر مطالب">
//               <div className="blog-search-wrapper" role="search">
//                 <FaSearch className="blog-search-icon" aria-hidden="true" />
//                 <input
//                   type="text"
//                   className="blog-search-input"
//                   placeholder="جستجو در مطالب..."
//                   value={searchInput}
//                   onChange={(e) => setSearchInput(e.target.value)}
//                   onKeyDown={handleSearchKeyDown}
//                   aria-label="جستجوی مطالب وبلاگ"
//                 />
//                 {searchInput && (
//                   <button 
//                     className="blog-search-clear" 
//                     onClick={handleClearSearch}
//                     aria-label="پاک کردن جستجو"
//                   >
//                     <FaTimesCircle aria-hidden="true" />
//                   </button>
//                 )}
//                 <button 
//                   className="blog-search-btn" 
//                   onClick={handleSearch}
//                   aria-label="جستجو"
//                 >
//                   جستجو
//                 </button>
//               </div>

//               <nav className="blog-categories-scroll" aria-label="دسته‌بندی مطالب">
//                 <button 
//                   className={`category-btn ${!selectedCategory ? 'active' : ''}`}
//                   onClick={() => {
//                     setSelectedCategory(null);
//                     fetchPosts();
//                   }}
//                   aria-current={!selectedCategory ? 'page' : undefined}
//                 >
//                   همه
//                 </button>
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     className={`category-btn ${selectedCategory?.id === category.id ? 'active' : ''}`}
//                     onClick={() => handleCategorySelect(category)}
//                     aria-current={selectedCategory?.id === category.id ? 'page' : undefined}
//                   >
//                     <FaTag className="category-icon-small" aria-hidden="true" />
//                     {category.name}
//                   </button>
//                 ))}
//               </nav>
//             </section>

//             {/* فیلترهای فعال */}
//             {(selectedCategory || searchTerm) && (
//               <div className="blog-filters" aria-label="فیلترهای فعال">
//                 {selectedCategory && (
//                   <span className="filter-tag">
//                     {selectedCategory.name}
//                     <button 
//                       className="remove-filter"
//                       onClick={() => {
//                         setSelectedCategory(null);
//                         fetchPosts();
//                       }}
//                       aria-label={`حذف فیلتر ${selectedCategory.name}`}
//                     >
//                       ✕
//                     </button>
//                   </span>
//                 )}
//                 {searchTerm && (
//                   <span className="filter-tag search">
//                     "{searchTerm}"
//                     <button 
//                       className="remove-filter"
//                       onClick={handleClearSearch}
//                       aria-label="پاک کردن جستجو"
//                     >
//                       ✕
//                     </button>
//                   </span>
//                 )}
//                 <span className="total-count">{posts.length} مطلب</span>
//               </div>
//             )}

//             {/* لیست مطالب */}
//             <section className="blog-posts-section" aria-label="لیست مطالب">
//               {loadingPosts ? (
//                 <div className="blog-posts-loading" aria-live="polite">
//                   <FaSpinner className="loading-spinner" aria-hidden="true" />
//                   <span>در حال بارگذاری مطالب...</span>
//                 </div>
//               ) : posts.length === 0 ? (
//                 <div className="blog-empty">
//                   <FaNewspaper className="empty-icon" aria-hidden="true" />
//                   <h3>مطلبی یافت نشد</h3>
//                   <p>هیچ مطلبی با این شرایط پیدا نشد</p>
//                   <button onClick={handleClearSearch} className="clear-search-btn">
//                     پاک کردن فیلترها
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <div className="blog-posts-grid">
//                     {currentPosts.map((post, index) => (
//                       <article 
//                         key={post.id} 
//                         className="blog-post-card"
//                         onClick={() => handlePostClick(post)}
//                         role="article"
//                         aria-label={`مطلب ${index + 1}: ${post.title}`}
//                       >
//                         {post.imageUrl && (
//                           <figure className="post-image-wrapper">
//                             <img 
//                               src={post.imageUrl} 
//                               alt={`تصویر مطلب: ${post.title}`}
//                               className="post-image"
//                               loading="lazy"
//                               width="400"
//                               height="300"
//                               // onError={(e) => {
//                               //   e.target.src = 'https://via.placeholder.com/400x300/7d0000/ffffff?text=وبلاگ';
//                               //   e.target.alt = 'تصویر جایگزین برای مطلب';
//                               // }}
//                             />
//                             {post.categoryName && (
//                               <figcaption className="post-category-badge">
//                                 <Link 
//                                   to={`/blog?category=${post.categoryId}`}
//                                   onClick={(e) => e.stopPropagation()}
//                                   aria-label={`مشاهده مطالب دسته ${post.categoryName}`}
//                                 >
//                                   {post.categoryName}
//                                 </Link>
//                               </figcaption>
//                             )}
//                           </figure>
//                         )}
//                         <div className="post-content">
//                           <h2 className="post-title">
//                             <Link 
//                               to={`/blog/post/${post.slug || post.id}`}
//                               onClick={(e) => e.stopPropagation()}
//                             >
//                               {post.title}
//                             </Link>
//                           </h2>
//                           <p className="post-summary">{post.summary}</p>
//                           <div className="post-meta">
//                             <span>
//                               <FaCalendarAlt aria-hidden="true" /> 
//                               <time dateTime={post.createdAt}>
//                                 {formatDate(post.createdAt)}
//                               </time>
//                             </span>
//                             <span>
//                               <FaUser aria-hidden="true" /> {post.authorName}
//                             </span>
//                             <span>
//                               <FaEye aria-hidden="true" /> {post.viewCount || 0}
//                             </span>
//                           </div>
//                           <div className="post-read-more">
//                             <Link 
//                               to={`/blog/post/${post.slug || post.id}`}
//                               onClick={(e) => e.stopPropagation()}
//                               aria-label={`مطالعه ادامه مطلب: ${post.title}`}
//                             >
//                               ادامه مطلب <FaArrowLeft aria-hidden="true" />
//                             </Link>
//                           </div>
//                         </div>
//                       </article>
//                     ))}
//                   </div>

//                   {/* صفحه‌بندی */}
//                   {pagination.totalPages > 1 && (
//                     <nav className="blog-pagination" aria-label="صفحه‌بندی مطالب">
//                       <button
//                         className="page-btn"
//                         onClick={() => handlePageChange(pagination.pageNumber - 1)}
//                         disabled={!pagination.hasPreviousPage}
//                         aria-label="صفحه قبلی"
//                       >
//                         <FaChevronRight aria-hidden="true" />
//                       </button>
                      
//                       {[...Array(pagination.totalPages)].map((_, index) => {
//                         const pageNum = index + 1;
//                         const isActive = pageNum === pagination.pageNumber;
//                         if (
//                           pageNum === 1 ||
//                           pageNum === pagination.totalPages ||
//                           (pageNum >= pagination.pageNumber - 1 && pageNum <= pagination.pageNumber + 1)
//                         ) {
//                           return (
//                             <button
//                               key={pageNum}
//                               className={`page-btn ${isActive ? 'active' : ''}`}
//                               onClick={() => handlePageChange(pageNum)}
//                               aria-current={isActive ? 'page' : undefined}
//                               aria-label={`صفحه ${pageNum}`}
//                             >
//                               {pageNum}
//                             </button>
//                           );
//                         }
//                         if (pageNum === pagination.pageNumber - 2 || pageNum === pagination.pageNumber + 2) {
//                           return <span key={pageNum} className="page-dots" aria-hidden="true">...</span>;
//                         }
//                         return null;
//                       })}
                      
//                       <button
//                         className="page-btn"
//                         onClick={() => handlePageChange(pagination.pageNumber + 1)}
//                         disabled={!pagination.hasNextPage}
//                         aria-label="صفحه بعدی"
//                       >
//                         <FaChevronLeft aria-hidden="true" />
//                       </button>
//                     </nav>
//                   )}
//                 </>
//               )}
//             </section>
//           </main>

//           {/* ===== ستون راست (تبلیغات) ===== */}
//           <aside className="blog-sidebar-right" aria-label="تبلیغات و پیشنهادات ویژه">
//             <div className="ad-card" role="complementary">
//               <div className="ad-badge">تبلیغات</div>
//               <div className="ad-content">
//                 <FaAd className="ad-icon" aria-hidden="true" />
//                 <h4>ثبت آگهی رایگان</h4>
//                 <p>ملک خود را رایگان ثبت کنید</p>
//                 <button className="ad-btn" aria-label="ثبت آگهی رایگان">ثبت آگهی</button>
//               </div>
//             </div>
//             <div className="ad-card" role="complementary">
//               <div className="ad-badge">تبلیغات</div>
//               <div className="ad-content">
//                 <img 
//                   src="https://via.placeholder.com/300x250/7d0000/ffffff?text=تبلیغات+ویژه" 
//                   alt="تبلیغات ویژه در وبلاگ مشاور املاک" 
//                   className="ad-image"
//                   loading="lazy"
//                 />
//               </div>
//             </div>
//             <div className="ad-card" role="complementary">
//               <div className="ad-badge">تبلیغات</div>
//               <div className="ad-content">
//                 <h4>مشاوره رایگان</h4>
//                 <p>با کارشناسان ما مشاوره رایگان بگیرید</p>
//                 <button className="ad-btn" aria-label="درخواست مشاوره رایگان">درخواست مشاوره</button>
//               </div>
//             </div>
//           </aside>

//         </div>
//       </article>
//     </>
//   );
// };

// export default BlogPage;

import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  FaNewspaper, FaTag, FaArrowLeft, FaArrowRight, 
  FaSpinner, FaCalendarAlt, FaUser, FaEye,
  FaSearch, FaTimesCircle, FaChevronLeft, FaChevronRight,
  FaAd, FaBullhorn, FaHome, FaShareAlt, FaBookmark
} from 'react-icons/fa';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import './BlogPage.css';

// آدرس پایه API
const API_BASE_URL = 'https://localhost:7178/api';
const API_BASE_URL_IMAGE = 'https://localhost:7178';

const BlogPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
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

  // ===== خواندن پارامترهای URL =====
  useEffect(() => {
    const categoryId = searchParams.get('category');
    const search = searchParams.get('q');
    const page = parseInt(searchParams.get('page')) || 1;

    if (categoryId) {
      setSelectedCategory({ id: parseInt(categoryId) });
    }
    if (search) {
      setSearchTerm(search);
      setSearchInput(search);
    }
    setPagination(prev => ({ ...prev, pageNumber: page }));
  }, [searchParams]);

  // ===== متادیتا =====
  const pageTitle = selectedCategory?.name 
    ? `${selectedCategory.name} | وبلاگ مشاور املاک` 
    : searchTerm 
      ? `نتایج جستجو برای "${searchTerm}" | وبلاگ مشاور املاک`
      : 'وبلاگ مشاور املاک | مقالات و اخبار حوزه املاک و مستغلات';
  
  const pageDescription = selectedCategory?.name
    ? `مطالب و مقالات دسته‌بندی ${selectedCategory.name} در وبلاگ مشاور املاک. راهنمای خرید، فروش و اجاره ملک`
    : searchTerm
      ? `نتایج جستجو برای "${searchTerm}" در وبلاگ مشاور املاک. ${posts.length} مطلب پیدا شد`
      : 'آخرین اخبار، مقالات و نکات تخصصی در حوزه املاک و مستغلات. راهنمای خرید، فروش، اجاره و سرمایه‌گذاری ملک';

  // ===== دریافت دسته‌بندی‌ها =====
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/Post/GetCategoryPostsDTOs`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('خطا در دریافت دسته‌بندی‌ها');
      
      const result = await response.json();
      if (result.status === 200 && result.data) {
        setCategories(result.data);
        // اگر دسته‌بندی در URL وجود داشت، آن را پیدا کن
        const categoryId = searchParams.get('category');
        if (categoryId) {
          const foundCategory = result.data.find(c => c.id === parseInt(categoryId));
          if (foundCategory) {
            setSelectedCategory(foundCategory);
          }
        }
        await fetchPosts(
          categoryId ? parseInt(categoryId) : null,
          searchParams.get('q') || ''
        );
      }
    } catch (error) {
      console.error('❌ خطا:', error);
      setError('مشکل در دریافت دسته‌بندی‌ها');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // ===== دریافت پست‌ها از API =====
  const fetchPosts = async (categoryId = null, search = '', page = 1) => {
    try {
      setLoadingPosts(true);
      
      let url = `${API_BASE_URL}/Post/getPostCategoryDto`;
      const params = new URLSearchParams();
      
      if (categoryId) {
        params.append('categoryId', categoryId);
      }
      if (search) {
        params.append('search', search);
      }
      params.append('page', page);
      params.append('pageSize', pagination.pageSize);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('خطا در دریافت مطالب');
      
      const result = await response.json();
      
      if (result.status === 200 && result.data) {
        // داده‌ها را به فرمت مورد نظر تبدیل کن
        const formattedPosts = result.data.map(post => ({
          id: post.id,
          title: post.title,
          slug: post.slug || post.id,
          summary: post.summary || post.title,
          imageUrl: post.imageUrl ? `${API_BASE_URL_IMAGE}/uploads/posts/${post.imageUrl}` : null,
          categoryName: post.categoryPostName || 'دسته‌بندی نشده',
          categoryId: categories.find(c => c.name === post.categoryPostName)?.id || null,
          createdAt: post.createdAt,
          createdAtPersian: post.createdAtPersianRelative,
          viewCount: post.countView || 0,
          authorName: post.agents?.[0]?.fullName || 'نویسنده'
        }));
        console.log(formattedPosts)
        setPosts(formattedPosts);
        
        // به‌روزرسانی صفحه‌بندی
        const totalCount = result.totalCount || formattedPosts.length;
        const totalPages = Math.ceil(totalCount / pagination.pageSize);
        setPagination({
          pageNumber: page,
          pageSize: pagination.pageSize,
          totalCount: totalCount,
          totalPages: totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        });
      } else {
        setPosts([]);
        setPagination({
          pageNumber: 1,
          pageSize: pagination.pageSize,
          totalCount: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false
        });
      }
    } catch (error) {
      console.error('❌ خطا در دریافت پست‌ها:', error);
      setPosts([]);
      setError('مشکل در دریافت مطالب');
    } finally {
      setLoadingPosts(false);
    }
  };

  // ===== جستجو =====
  const handleSearch = async () => {
    setSearchTerm(searchInput);
    // به‌روزرسانی URL
    const params = new URLSearchParams(searchParams);
    if (searchInput) {
      params.set('q', searchInput);
    } else {
      params.delete('q');
    }
    params.delete('page');
    setSearchParams(params);
    
    await fetchPosts(
      selectedCategory?.id || null,
      searchInput,
      1
    );
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearSearch = async () => {
    setSearchInput('');
    setSearchTerm('');
    const params = new URLSearchParams(searchParams);
    params.delete('q');
    params.delete('page');
    setSearchParams(params);
    await fetchPosts(
      selectedCategory?.id || null,
      '',
      1
    );
  };

  // ===== انتخاب دسته‌بندی =====
  const handleCategorySelect = async (category) => {
    if (selectedCategory?.id === category.id) {
      // لغو انتخاب
      setSelectedCategory(null);
      const params = new URLSearchParams(searchParams);
      params.delete('category');
      params.delete('page');
      setSearchParams(params);
      await fetchPosts(null, searchTerm, 1);
    } else {
      setSelectedCategory(category);
      const params = new URLSearchParams(searchParams);
      params.set('category', category.id);
      params.delete('page');
      setSearchParams(params);
      await fetchPosts(category.id, searchTerm, 1);
    }
  };

  // ===== تغییر صفحه =====
  const handlePageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      const params = new URLSearchParams(searchParams);
      params.set('page', newPage);
      setSearchParams(params);
      
      await fetchPosts(
        selectedCategory?.id || null,
        searchTerm,
        newPage
      );
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ===== رفتن به صفحه مطلب =====
  const handlePostClick = (post) => {
    navigate(`/blog/post/${post.slug || post.id}/${post.id}`);
  };

  // ===== فرمت تاریخ =====
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch {
      return dateString;
    }
  };

  // ===== Schema Markup =====
  const generateSchemaMarkup = () => {
    const baseUrl = window.location.origin;
    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "headline": "وبلاگ مشاور املاک",
      "description": pageDescription,
      "url": baseUrl + window.location.pathname,
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": posts.slice(0, 10).map((post, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `${baseUrl}/blog/post/${post.slug || post.id}`,
          "name": post.title
        }))
      }
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "خانه",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": selectedCategory?.name || "وبلاگ",
          "item": baseUrl + window.location.pathname
        }
      ]
    };

    return { blogSchema, breadcrumbSchema };
  };

  if (loading) {
    return (
      <div className="blog-page-wrapper" role="main" aria-label="در حال بارگذاری وبلاگ">
        <Helmet>
          <title>در حال بارگذاری | وبلاگ مشاور املاک</title>
        </Helmet>
        <div className="blog-loading">
          <FaSpinner className="blog-loading-spinner" aria-hidden="true" />
          <span>در حال بارگذاری...</span>
        </div>
      </div>
    );
  }

  const schemas = generateSchemaMarkup();

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="وبلاگ املاک, مشاور املاک, خرید ملک, فروش ملک, اجاره ملک" />
        <link rel="canonical" href={`${window.location.origin}${window.location.pathname}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}${window.location.pathname}`} />
        <meta property="og:image" content={`${window.location.origin}/og-image.jpg`} />
        <meta property="og:site_name" content="مشاور املاک" />
        <meta property="og:locale" content="fa_IR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${window.location.origin}/og-image.jpg`} />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify(schemas.blogSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(schemas.breadcrumbSchema)}
        </script>
      </Helmet>

      <article className="blog-page-wrapper" role="main" aria-label="صفحه وبلاگ">
        {/* ===== هدر ===== */}
        <header className="blog-header">
          <h1 className="blog-title">
            {selectedCategory?.name ? `دسته‌بندی: ${selectedCategory.name}` : 'وبلاگ مشاور املاک'}
          </h1>
          {!selectedCategory && !searchTerm && (
            <p className="blog-subtitle">
              آخرین اخبار، مقالات و نکات تخصصی در حوزه املاک و مستغلات
            </p>
          )}
          {searchTerm && (
            <p className="blog-subtitle">
              نتایج جستجو برای: "{searchTerm}"
            </p>
          )}
          <div className="blog-stats" aria-label="آمار وبلاگ">
            <span className="stat-badge">
              <FaNewspaper aria-hidden="true" /> {posts.length} مطلب
            </span>
            <span className="stat-badge">
              <FaTag aria-hidden="true" /> {categories.length} دسته‌بندی
            </span>
          </div>
        </header>

        {/* ===== Breadcrumb ===== */}
        <nav className="blog-breadcrumb" aria-label="مسیر راهنما">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <Link to="/" className="breadcrumb-link">
                <FaHome aria-hidden="true" /> خانه
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/blog" className="breadcrumb-link">
                وبلاگ
              </Link>
            </li>
            {selectedCategory && (
              <li className="breadcrumb-item active" aria-current="page">
                {selectedCategory.name}
              </li>
            )}
            {searchTerm && !selectedCategory && (
              <li className="breadcrumb-item active" aria-current="page">
                جستجو: "{searchTerm}"
              </li>
            )}
          </ol>
        </nav>

        {/* ===== سه ستونه ===== */}
        <div className="blog-three-column">

          {/* ===== ستون چپ (تبلیغات) ===== */}
          <aside className="blog-sidebar-left" aria-label="تبلیغات و اطلاعات جانبی">
            <div className="ad-card" role="complementary">
              <div className="ad-badge">تبلیغات</div>
              <div className="ad-content">
                <FaBullhorn className="ad-icon" aria-hidden="true" />
                <h4>خرید و فروش ملک</h4>
                <p>با مشاوران مجرب ما در تماس باشید</p>
                <button className="ad-btn" aria-label="تماس با مشاوران">تماس بگیرید</button>
              </div>
            </div>
            <div className="ad-card" role="complementary">
              <div className="ad-badge">تبلیغات</div>
              <div className="ad-content">
                <FaHome className="ad-icon" aria-hidden="true" />
                <h4>وام مسکن</h4>
                <p>بهترین شرایط وام مسکن را دریافت کنید</p>
                <button className="ad-btn" aria-label="اطلاعات بیشتر درباره وام مسکن">اطلاعات بیشتر</button>
              </div>
            </div>
            <div className="ad-card" role="complementary">
              <div className="ad-badge">تبلیغات</div>
              <div className="ad-content">
                <img 
                  src="https://via.placeholder.com/300x200/7d0000/ffffff?text=تبلیغ+شما" 
                  alt="فضای تبلیغاتی شما در وبلاگ مشاور املاک" 
                  className="ad-image"
                  loading="lazy"
                />
              </div>
            </div>
          </aside>

          {/* ===== ستون وسط (مطالب) ===== */}
          <main className="blog-main-content" aria-label="مطالب وبلاگ">
            {/* جستجو و دسته‌بندی */}
            <section className="blog-search-section" aria-label="جستجو و فیلتر مطالب">
              <div className="blog-search-wrapper" role="search">
                <FaSearch className="blog-search-icon" aria-hidden="true" />
                <input
                  type="text"
                  className="blog-search-input"
                  placeholder="جستجو در مطالب..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  aria-label="جستجوی مطالب وبلاگ"
                />
                {searchInput && (
                  <button 
                    className="blog-search-clear" 
                    onClick={handleClearSearch}
                    aria-label="پاک کردن جستجو"
                  >
                    <FaTimesCircle aria-hidden="true" />
                  </button>
                )}
                <button 
                  className="blog-search-btn" 
                  onClick={handleSearch}
                  aria-label="جستجو"
                >
                  جستجو
                </button>
              </div>

              <nav className="blog-categories-scroll" aria-label="دسته‌بندی مطالب">
                <button 
                  className={`category-btn ${!selectedCategory ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(null);
                    const params = new URLSearchParams(searchParams);
                    params.delete('category');
                    params.delete('page');
                    setSearchParams(params);
                    fetchPosts(null, searchTerm, 1);
                  }}
                  aria-current={!selectedCategory ? 'page' : undefined}
                >
                  همه
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-btn ${selectedCategory?.id === category.id ? 'active' : ''}`}
                    onClick={() => handleCategorySelect(category)}
                    aria-current={selectedCategory?.id === category.id ? 'page' : undefined}
                  >
                    <FaTag className="category-icon-small" aria-hidden="true" />
                    {category.name}
                  </button>
                ))}
              </nav>
            </section>

            {/* فیلترهای فعال */}
            {(selectedCategory || searchTerm) && (
              <div className="blog-filters" aria-label="فیلترهای فعال">
                {selectedCategory && (
                  <span className="filter-tag">
                    {selectedCategory.name}
                    <button 
                      className="remove-filter"
                      onClick={() => {
                        setSelectedCategory(null);
                        const params = new URLSearchParams(searchParams);
                        params.delete('category');
                        params.delete('page');
                        setSearchParams(params);
                        fetchPosts(null, searchTerm, 1);
                      }}
                      aria-label={`حذف فیلتر ${selectedCategory.name}`}
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
                      aria-label="پاک کردن جستجو"
                    >
                      ✕
                    </button>
                  </span>
                )}
                <span className="total-count">{posts.length} مطلب</span>
              </div>
            )}

            {/* لیست مطالب */}
            <section className="blog-posts-section" aria-label="لیست مطالب">
              {loadingPosts ? (
                <div className="blog-posts-loading" aria-live="polite">
                  <FaSpinner className="loading-spinner" aria-hidden="true" />
                  <span>در حال بارگذاری مطالب...</span>
                </div>
              ) : posts.length === 0 ? (
                <div className="blog-empty">
                  <FaNewspaper className="empty-icon" aria-hidden="true" />
                  <h3>مطلبی یافت نشد</h3>
                  <p>هیچ مطلبی با این شرایط پیدا نشد</p>
                  <button 
                    onClick={() => {
                      handleClearSearch();
                      setSelectedCategory(null);
                      const params = new URLSearchParams();
                      setSearchParams(params);
                      fetchPosts(null, '', 1);
                    }} 
                    className="clear-search-btn"
                  >
                    پاک کردن فیلترها
                  </button>
                </div>
              ) : (
                <>
                  <div className="blog-posts-grid">
                    {posts.map((post, index) => (
                      <article 
                        key={post.id} 
                        className="blog-post-card"
                        onClick={() => handlePostClick(post)}
                        role="article"
                        aria-label={`مطلب ${index + 1}: ${post.title}`}
                      >
                        {post.imageUrl && (
                          <figure className="post-image-wrapper">
                            <img 
                              src={post.imageUrl} 
                              alt={`تصویر مطلب: ${post.title}`}
                              className="post-image"
                              loading="lazy"
                              width="400"
                              height="300"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x300/7d0000/ffffff?text=وبلاگ';
                              }}
                            />
                            {post.categoryName && (
                              <figcaption className="post-category-badge">
                                <Link 
                                  to={`/blog?category=${post.categoryId}`}
                                  onClick={(e) => e.stopPropagation()}
                                  aria-label={`مشاهده مطالب دسته ${post.categoryName}`}
                                >
                                  {post.categoryName}
                                </Link>
                              </figcaption>
                            )}
                          </figure>
                        )}
                        <div className="post-content">
                          <h2 className="post-title">
                            <Link 
                              to={`/blog/post/${post.slug || post.id}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {post.title}
                            </Link>
                          </h2>
                          <p className="post-summary">{post.summary}</p>
                          <div className="post-meta">
                            <span>
                              <FaCalendarAlt aria-hidden="true" /> 
                              <time dateTime={post.createdAt}>
                                {post.createdAtPersian || formatDate(post.createdAt)}
                              </time>
                            </span>
                            <span>
                              <FaUser aria-hidden="true" /> {post.authorName}
                            </span>
                            <span>
                              <FaEye aria-hidden="true" /> {post.viewCount || 0}
                            </span>
                          </div>
                          <div className="post-read-more">
                            <Link 
                              to={`/blog/post/${post.slug || post.id}`}
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`مطالعه ادامه مطلب: ${post.title}`}
                            >
                              ادامه مطلب <FaArrowLeft aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* صفحه‌بندی */}
                  {pagination.totalPages > 1 && (
                    <nav className="blog-pagination" aria-label="صفحه‌بندی مطالب">
                      <button
                        className="page-btn"
                        onClick={() => handlePageChange(pagination.pageNumber - 1)}
                        disabled={!pagination.hasPreviousPage}
                        aria-label="صفحه قبلی"
                      >
                        <FaChevronRight aria-hidden="true" />
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
                              aria-current={isActive ? 'page' : undefined}
                              aria-label={`صفحه ${pageNum}`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                        if (pageNum === pagination.pageNumber - 2 || pageNum === pagination.pageNumber + 2) {
                          return <span key={pageNum} className="page-dots" aria-hidden="true">...</span>;
                        }
                        return null;
                      })}
                      
                      <button
                        className="page-btn"
                        onClick={() => handlePageChange(pagination.pageNumber + 1)}
                        disabled={!pagination.hasNextPage}
                        aria-label="صفحه بعدی"
                      >
                        <FaChevronLeft aria-hidden="true" />
                      </button>
                    </nav>
                  )}
                </>
              )}
            </section>
          </main>

          {/* ===== ستون راست (تبلیغات) ===== */}
          <aside className="blog-sidebar-right" aria-label="تبلیغات و پیشنهادات ویژه">
            <div className="ad-card" role="complementary">
              <div className="ad-badge">تبلیغات</div>
              <div className="ad-content">
                <FaAd className="ad-icon" aria-hidden="true" />
                <h4>ثبت آگهی رایگان</h4>
                <p>ملک خود را رایگان ثبت کنید</p>
                <button className="ad-btn" aria-label="ثبت آگهی رایگان">ثبت آگهی</button>
              </div>
            </div>
            <div className="ad-card" role="complementary">
              <div className="ad-badge">تبلیغات</div>
              <div className="ad-content">
                <img 
                  src="https://via.placeholder.com/300x250/7d0000/ffffff?text=تبلیغات+ویژه" 
                  alt="تبلیغات ویژه در وبلاگ مشاور املاک" 
                  className="ad-image"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="ad-card" role="complementary">
              <div className="ad-badge">تبلیغات</div>
              <div className="ad-content">
                <h4>مشاوره رایگان</h4>
                <p>با کارشناسان ما مشاوره رایگان بگیرید</p>
                <button className="ad-btn" aria-label="درخواست مشاوره رایگان">درخواست مشاوره</button>
              </div>
            </div>
          </aside>

        </div>
      </article>
    </>
  );
};

export default BlogPage;