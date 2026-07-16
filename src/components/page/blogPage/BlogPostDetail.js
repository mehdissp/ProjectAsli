
// // // // export default BlogPostDetail;

// // // import React, { useState, useEffect } from 'react';
// // // import { useParams, useNavigate, Link } from 'react-router-dom';
// // // import { 
// // //   FaArrowRight, FaCalendarAlt, FaUser, FaEye, FaClock,
// // //   FaShare, FaBookmark, FaRegBookmark, FaTag, FaHashtag,
// // //   FaSpinner, FaThumbsUp, FaWhatsapp, FaTelegram, FaTwitter, 
// // //   FaEnvelope, FaLink, FaHome, FaBullhorn, FaAd, FaNewspaper
// // // } from 'react-icons/fa';
// // // import DOMPurify from 'dompurify';
// // // import './BlogPostDetail.css';

// // // const API_BASE_URL = 'https://localhost:7178/api';
// // // const API_BASE_URL_IMG = 'https://localhost:7178';

// // // const BlogPostDetail = () => {
// // //   const { slug, id } = useParams();
// // //   const navigate = useNavigate();
  
// // //   const [post, setPost] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [relatedPosts, setRelatedPosts] = useState([]);
// // //   const [latestPosts, setLatestPosts] = useState([]);
// // //   const [isBookmarked, setIsBookmarked] = useState(false);
// // //   const [copied, setCopied] = useState(false);
// // //   const [liked, setLiked] = useState(false);
// // //   const [likeCount, setLikeCount] = useState(0);
// // //   const [processedContent, setProcessedContent] = useState('');

// // //   // ===== پردازش محتوای HTML =====
// // //   const processContent = (htmlContent) => {
// // //     if (!htmlContent) return '';

// // //     const tempDiv = document.createElement('div');
// // //     tempDiv.innerHTML = htmlContent;

// // //     // پردازش تصاویر
// // //     const images = tempDiv.querySelectorAll('img');
// // //     images.forEach((img) => {
// // //       const src = img.getAttribute('src');
// // //       const imageId = img.getAttribute('data-image-id') || img.getAttribute('data-id');
      
// // //       if (src && src.includes('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')) {
// // //         if (imageId) {
// // //           img.src = `${API_BASE_URL_IMG}/post/${imageId}`;
// // //         } else {
// // //           img.src = 'https://via.placeholder.com/800x400/7d0000/ffffff?text=تصویر+مطلب';
// // //         }
// // //         img.alt = 'تصویر مطلب';
// // //         return;
// // //       }

// // //       if (src && src.startsWith('data:image')) {
// // //         if (src.length > 1000) return;
// // //         return;
// // //       }

// // //       if (src && src.startsWith('/images-')) {
// // //         const fileName = src.split('/').pop();
// // //         img.src = `${API_BASE_URL_IMG}/post/${fileName}`;
// // //         img.alt = 'تصویر مطلب';
// // //         return;
// // //       }

// // //       if (src && src.startsWith('/')) {
// // //         const cleanPath = src.substring(1);
// // //         img.src = `${API_BASE_URL_IMG}/${cleanPath}`;
// // //         img.alt = 'تصویر مطلب';
// // //         return;
// // //       }

// // //       if (src && !src.startsWith('http') && !src.startsWith('data:')) {
// // //         img.src = `${API_BASE_URL_IMG}/post/${src}`;
// // //         img.alt = 'تصویر مطلب';
// // //         return;
// // //       }

// // //       if (!img.getAttribute('alt')) {
// // //         img.setAttribute('alt', 'تصویر مطلب');
// // //       }
// // //       img.setAttribute('loading', 'lazy');
// // //     });

// // //     // پردازش لینک‌ها
// // //     const links = tempDiv.querySelectorAll('a');
// // //     links.forEach((link) => {
// // //       const href = link.getAttribute('href');
// // //       if (href && !href.startsWith('http') && !href.startsWith('#')) {
// // //         link.setAttribute('target', '_blank');
// // //         link.setAttribute('rel', 'noopener noreferrer');
// // //       }
// // //     });

// // //     return tempDiv.innerHTML;
// // //   };

// // //   // ===== دریافت مطلب =====
// // //   useEffect(() => {
// // //     const fetchPost = async () => {
// // //       try {
// // //         setLoading(true);
// // //         setError(null);

// // //         const postId = id || slug;
// // //         const response = await fetch(`${API_BASE_URL}/Post/GetDetailsDtosAsync?id=${postId}`);

// // //         if (!response.ok) {
// // //           throw new Error(`خطا در دریافت مطلب: ${response.status}`);
// // //         }

// // //         const result = await response.json();

// // //         if (result.status === 200 && result.data) {
// // //           setPost(result.data);
// // //           setLikeCount(Math.floor(Math.random() * 100) + 20);
          
// // //           if (result.data.content) {
// // //             const processed = processContent(result.data.content);
// // //             setProcessedContent(processed);
// // //           }
          
// // //           if (result.data.categoryPostName) {
// // //             await fetchRelatedPosts(result.data.categoryPostName);
// // //           }
          
// // //           await fetchLatestPosts();

// // //           if (slug && result.data.slug && slug !== result.data.slug) {
// // //             navigate(`/blog/post/${result.data.slug}/${result.data.id}`, { replace: true });
// // //           }
// // //         } else {
// // //           throw new Error(result.message || 'مطلب یافت نشد');
// // //         }
// // //       } catch (err) {
// // //         console.error('Error fetching post:', err);
// // //         setError(err.message || 'خطا در بارگذاری مطلب');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     if (id || slug) {
// // //       fetchPost();
// // //       window.scrollTo({ top: 0, behavior: 'smooth' });
// // //     }
// // //   }, [id, slug, navigate]);

// // //   // ===== دریافت مطالب مرتبط =====
// // //   const fetchRelatedPosts = async (category) => {
// // //     try {
// // //       const response = await fetch(`${API_BASE_URL}/Post/getPostCategoryDto?category=${encodeURIComponent(category)}&page=1&pageSize=4`);
      
// // //       if (response.ok) {
// // //         const result = await response.json();
// // //         if (result.status === 200 && result.data) {
// // //           const filtered = result.data.filter(p => p.id !== parseInt(id || slug));
// // //           setRelatedPosts(filtered.slice(0, 4));
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching related posts:', error);
// // //     }
// // //   };

// // //   // ===== دریافت آخرین مطالب =====
// // //   const fetchLatestPosts = async () => {
// // //     try {
// // //       const response = await fetch(`${API_BASE_URL}/Post/getPostCategoryDto?page=1&pageSize=5`);
      
// // //       if (response.ok) {
// // //         const result = await response.json();
// // //         if (result.status === 200 && result.data) {
// // //           const filtered = result.data.filter(p => p.id !== parseInt(id || slug));
// // //           setLatestPosts(filtered.slice(0, 5));
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching latest posts:', error);
// // //     }
// // //   };

// // //   // ===== بوکمارک =====
// // //   const handleBookmark = async () => {
// // //     const postId = id || slug;
// // //     try {
// // //       if (!isBookmarked) {
// // //         const response = await fetch(`${API_BASE_URL}/Post/Bookmark/${postId}`, {
// // //           method: 'POST',
// // //           headers: { 'Content-Type': 'application/json' },
// // //           body: JSON.stringify({ postId: postId })
// // //         });
// // //         if (response.ok) setIsBookmarked(true);
// // //       } else {
// // //         const response = await fetch(`${API_BASE_URL}/Post/Unbookmark/${postId}`, {
// // //           method: 'DELETE'
// // //         });
// // //         if (response.ok) setIsBookmarked(false);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error toggling bookmark:', error);
// // //       setIsBookmarked(!isBookmarked);
// // //     }
// // //   };

// // //   // ===== لایک =====
// // //   const handleLike = async () => {
// // //     const postId = id || slug;
// // //     try {
// // //       if (!liked) {
// // //         const response = await fetch(`${API_BASE_URL}/Post/Like/${postId}`, {
// // //           method: 'POST',
// // //           headers: { 'Content-Type': 'application/json' }
// // //         });
// // //         if (response.ok) {
// // //           setLikeCount(prev => prev + 1);
// // //           setLiked(true);
// // //         }
// // //       } else {
// // //         const response = await fetch(`${API_BASE_URL}/Post/Unlike/${postId}`, {
// // //           method: 'DELETE'
// // //         });
// // //         if (response.ok) {
// // //           setLikeCount(prev => prev - 1);
// // //           setLiked(false);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error toggling like:', error);
// // //       if (!liked) {
// // //         setLikeCount(prev => prev + 1);
// // //         setLiked(true);
// // //       } else {
// // //         setLikeCount(prev => prev - 1);
// // //         setLiked(false);
// // //       }
// // //     }
// // //   };

// // //   // ===== اشتراک‌گذاری =====
// // //   const handleCopyLink = () => {
// // //     navigator.clipboard.writeText(window.location.href);
// // //     setCopied(true);
// // //     setTimeout(() => setCopied(false), 2000);
// // //   };

// // //   const handleShareSocial = (platform) => {
// // //     const url = window.location.href;
// // //     const text = post?.title || '';
// // //     let shareUrl = '';

// // //     switch(platform) {
// // //       case 'whatsapp':
// // //         shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
// // //         break;
// // //       case 'telegram':
// // //         shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
// // //         break;
// // //       case 'twitter':
// // //         shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
// // //         break;
// // //       case 'email':
// // //         shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
// // //         break;
// // //       default:
// // //         return;
// // //     }

// // //     window.open(shareUrl, '_blank', 'width=600,height=400');
// // //   };

// // //   // ===== فرمت تاریخ =====
// // //   const formatDate = (dateString) => {
// // //     if (!dateString) return '';
// // //     try {
// // //       const date = new Date(dateString);
// // //       return new Intl.DateTimeFormat('fa-IR', {
// // //         year: 'numeric',
// // //         month: 'long',
// // //         day: 'numeric'
// // //       }).format(date);
// // //     } catch {
// // //       return dateString;
// // //     }
// // //   };

// // //   // ===== متادیتا =====
// // //   useEffect(() => {
// // //     if (post) {
// // //       document.title = `${post.title} | وبلاگ مشاور املاک`;
// // //     }
// // //   }, [post]);

// // //   // ===== مدیریت بارگذاری =====
// // //   if (loading) {
// // //     return (
// // //       <div className="blog-detail-wrapper">
// // //         <div className="blog-detail-loading">
// // //           <FaSpinner className="loading-spinner" />
// // //           <span>در حال بارگذاری مطلب...</span>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // ===== مدیریت خطا =====
// // //   if (error || !post) {
// // //     return (
// // //       <div className="blog-detail-wrapper">
// // //         <div className="blog-detail-error">
// // //           <div className="error-icon">📖</div>
// // //           <h2>مطلب یافت نشد</h2>
// // //           <p>{error || 'متاسفانه مطلب مورد نظر وجود ندارد'}</p>
// // //           <button onClick={() => navigate('/blog')} className="back-to-blog-btn">
// // //             <FaArrowRight /> بازگشت به وبلاگ
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // ===== رندر اصلی با 3 ستون =====
// // //   return (
// // //     <div className="blog-detail-wrapper">
// // //       {/* ===== دکمه بازگشت ===== */}
// // //       <div className="blog-detail-top-bar">
// // //         <button className="back-btn" onClick={() => navigate('/blog')}>
// // //           <FaArrowRight /> بازگشت به وبلاگ
// // //         </button>
// // //         <div className="breadcrumb">
// // //           <Link to="/"><FaHome /> خانه</Link>
// // //           <span>/</span>
// // //           <Link to="/blog">وبلاگ</Link>
// // //           <span>/</span>
// // //           <span className="current">{post.title}</span>
// // //         </div>
// // //       </div>

// // //       {/* ===== 3 ستون ===== */}
// // //       <div className="blog-detail-three-column">

// // //         {/* ===== ستون چپ - تبلیغات ===== */}
// // //         <aside className="blog-detail-sidebar-left">
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
// // //                 src="https://via.placeholder.com/300x250/7d0000/ffffff?text=تبلیغ+شما"
// // //                 alt="تبلیغات"
// // //                 className="ad-image"
// // //               />
// // //             </div>
// // //           </div>
// // //         </aside>

// // //         {/* ===== ستون وسط - محتوای اصلی ===== */}
// // //         <main className="blog-detail-main">
// // //           <article className="blog-post-detail">
            
// // //             {/* تصویر اصلی */}
// // //             {post.imageUrl && (
// // //               <div className="post-detail-image">
// // //                 <img 
// // //                   src={`${API_BASE_URL_IMG}/post/${post.imageUrl}`} 
// // //                   alt={post.title}
// // //                   onError={(e) => {
// // //                     e.target.src = 'https://via.placeholder.com/800x400/7d0000/ffffff?text=تصویر+مطلب';
// // //                   }}
// // //                 />
// // //                 {post.categoryPostName && (
// // //                   <span className="post-detail-category">
// // //                     <FaTag /> {post.categoryPostName}
// // //                   </span>
// // //                 )}
// // //               </div>
// // //             )}

// // //             {/* هدر مطلب */}
// // //             <div className="post-detail-header">
// // //               <h1 className="post-detail-title">{post.title}</h1>
              
// // //               <div className="post-detail-meta">
// // //                 <span><FaCalendarAlt /> {post.createdAtPersianRelative || formatDate(post.createdAt)}</span>
// // //                 {post.agents && post.agents.length > 0 && (
// // //                   <span><FaUser /> {post.agents[0]?.fullName || 'نویسنده'}</span>
// // //                 )}
// // //                 <span><FaEye /> {post.countView || 0} بازدید</span>
// // //                 <span><FaClock /> {post.readTime || '3 دقیقه'}</span>
// // //               </div>

// // //               {post.summary && (
// // //                 <div className="post-detail-summary">
// // //                   <p>{post.summary}</p>
// // //                 </div>
// // //               )}

// // //               {post.tags && post.tags.length > 0 && (
// // //                 <div className="post-detail-tags">
// // //                   {post.tags.map((tag, index) => (
// // //                     <span key={index} className="tag-item">
// // //                       <FaHashtag /> {tag}
// // //                     </span>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* محتوای اصلی */}
// // //             <div 
// // //               className="post-detail-content"
// // //               dangerouslySetInnerHTML={{ 
// // //                 __html: DOMPurify.sanitize(processedContent || post.content, {
// // //                   ADD_TAGS: ['iframe', 'video', 'source'],
// // //                   ADD_ATTR: ['target', 'rel', 'loading', 'data-*', 'width', 'height']
// // //                 })
// // //               }}
// // //             />

// // //             {/* بخش تعامل */}
// // //             <div className="post-detail-actions">
// // //               <div className="actions-left">
// // //                 <button 
// // //                   className={`action-btn like ${liked ? 'active' : ''}`}
// // //                   onClick={handleLike}
// // //                 >
// // //                   <FaThumbsUp /> {likeCount}
// // //                 </button>
// // //                 <button 
// // //                   className={`action-btn bookmark ${isBookmarked ? 'active' : ''}`}
// // //                   onClick={handleBookmark}
// // //                 >
// // //                   {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
// // //                   {isBookmarked ? 'ذخیره شده' : 'ذخیره'}
// // //                 </button>
// // //               </div>
              
// // //               <div className="actions-right">
// // //                 <div className="social-share-buttons">
// // //                   <button onClick={() => handleShareSocial('whatsapp')} className="social-btn whatsapp">
// // //                     <FaWhatsapp />
// // //                   </button>
// // //                   <button onClick={() => handleShareSocial('telegram')} className="social-btn telegram">
// // //                     <FaTelegram />
// // //                   </button>
// // //                   <button onClick={() => handleShareSocial('twitter')} className="social-btn twitter">
// // //                     <FaTwitter />
// // //                   </button>
// // //                   <button onClick={() => handleShareSocial('email')} className="social-btn email">
// // //                     <FaEnvelope />
// // //                   </button>
// // //                   <button onClick={handleCopyLink} className="social-btn copy">
// // //                     <FaLink />
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* نویسنده */}
// // //             {post.agents && post.agents.length > 0 && (
// // //               <div className="post-detail-author">
// // //                 <img 
// // //                   src={post.agents[0]?.imageUrl ? `${API_BASE_URL_IMG}/post/${post.agents[0].imageUrl}` : 'https://via.placeholder.com/80/7d0000/ffffff?text=نویسنده'} 
// // //                   alt={post.agents[0]?.fullName || 'نویسنده'} 
// // //                   className="author-image"
// // //                   onError={(e) => {
// // //                     e.target.src = 'https://via.placeholder.com/80/7d0000/ffffff?text=نویسنده';
// // //                   }}
// // //                 />
// // //                 <div className="author-info">
// // //                   <h4>{post.agents[0]?.fullName || 'نویسنده'}</h4>
// // //                   <p>{post.agents[0]?.description || 'نویسنده و کارشناس حوزه املاک و مستغلات'}</p>
// // //                 </div>
// // //               </div>
// // //             )}

// // //           </article>

// // //           {/* مطالب مرتبط */}
// // //           {relatedPosts.length > 0 && (
// // //             <div className="related-posts">
// // //               <h3 className="related-title">مطالب مرتبط</h3>
// // //               <div className="related-grid">
// // //                 {relatedPosts.map((related) => (
// // //                   <div 
// // //                     key={related.id} 
// // //                     className="related-card"
// // //                     onClick={() => navigate(`/blog/post/${related.slug || related.id}/${related.id}`)}
// // //                   >
// // //                     {related.imageUrl && (
// // //                       <div className="related-image-wrapper">
// // //                         <img 
// // //                           src={`${API_BASE_URL_IMG}/post/${related.imageUrl}`} 
// // //                           alt={related.title}
// // //                           onError={(e) => {
// // //                             e.target.src = 'https://via.placeholder.com/400x200/7d0000/ffffff?text=تصویر';
// // //                           }}
// // //                         />
// // //                       </div>
// // //                     )}
// // //                     <div className="related-content">
// // //                       <h4>{related.title}</h4>
// // //                       <div className="related-meta">
// // //                         <span><FaCalendarAlt /> {related.createdAtPersianRelative || formatDate(related.createdAt)}</span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           )}
// // //         </main>

// // //         {/* ===== ستون راست - آخرین مطالب ===== */}
// // //         <aside className="blog-detail-sidebar-right">
// // //           <div className="sidebar-card">
// // //             <h4 className="sidebar-title">
// // //               <FaNewspaper /> آخرین مطالب
// // //             </h4>
// // //             <ul className="sidebar-posts-list">
// // //               {latestPosts.map((item) => (
// // //                 <li key={item.id} className="sidebar-post-item">
// // //                   <Link to={`/blog/post/${item.slug || item.id}/${item.id}`}>
// // //                     <span className="sidebar-post-title">{item.title}</span>
// // //                     <span className="sidebar-post-date">
// // //                       <FaCalendarAlt /> {item.createdAtPersianRelative || formatDate(item.createdAt)}
// // //                     </span>
// // //                   </Link>
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </div>

// // //           <div className="ad-card sidebar-ad">
// // //             <div className="ad-badge">تبلیغات</div>
// // //             <div className="ad-content">
// // //               <FaAd className="ad-icon" />
// // //               <h4>ثبت آگهی رایگان</h4>
// // //               <p>ملک خود را رایگان ثبت کنید</p>
// // //               <button className="ad-btn">ثبت آگهی</button>
// // //             </div>
// // //           </div>

// // //           <div className="ad-card sidebar-ad">
// // //             <div className="ad-badge">تبلیغات</div>
// // //             <div className="ad-content">
// // //               <img 
// // //                 src="https://via.placeholder.com/300x250/7d0000/ffffff?text=تبلیغات+ویژه"
// // //                 alt="تبلیغات ویژه"
// // //                 className="ad-image"
// // //               />
// // //             </div>
// // //           </div>
// // //         </aside>

// // //       </div>

// // //       {/* نوتیفیکیشن کپی */}
// // //       {copied && (
// // //         <div className="copy-notification">
// // //           <FaLink /> لینک کپی شد
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default BlogPostDetail;

// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import { 
// //   FaArrowRight, FaCalendarAlt, FaUser, FaEye, FaClock,
// //   FaShare, FaBookmark, FaRegBookmark, FaTag, FaHashtag,
// //   FaSpinner, FaThumbsUp, FaWhatsapp, FaTelegram, FaTwitter, 
// //   FaEnvelope, FaLink, FaHome, FaBullhorn, FaAd, FaNewspaper
// // } from 'react-icons/fa';
// // import DOMPurify from 'dompurify';
// // import './BlogPostDetail.css';

// // const API_BASE_URL = 'https://localhost:7178/api';
// // const API_BASE_URL_IMG = 'https://localhost:7178/uploads';
// // const API_BASE_URL_IMG_C = 'https://localhost:7178';

// // // ===== کامپوننت Skeleton Loader =====
// // const BlogDetailSkeleton = () => {
// //   return (
// //     <div className="blog-detail-wrapper">
// //       {/* تاپ بار اسکلتون */}
// //       <div className="blog-detail-top-bar">
// //         <div className="skeleton skeleton-back-btn"></div>
// //         <div className="skeleton skeleton-breadcrumb"></div>
// //       </div>

// //       {/* 3 ستون اسکلتون */}
// //       <div className="blog-detail-three-column">
        
// //         {/* ستون چپ اسکلتون */}
// //         <aside className="blog-detail-sidebar-left">
// //           <div className="skeleton skeleton-ad-card"></div>
// //           <div className="skeleton skeleton-ad-card"></div>
// //           <div className="skeleton skeleton-ad-card"></div>
// //         </aside>

// //         {/* ستون وسط اسکلتون */}
// //         <main className="blog-detail-main">
// //           <div className="blog-post-detail skeleton-post">
// //             {/* تصویر اسکلتون */}
// //             <div className="skeleton skeleton-image"></div>
            
// //             {/* هدر اسکلتون */}
// //             <div className="post-detail-header">
// //               <div className="skeleton skeleton-title"></div>
// //               <div className="skeleton skeleton-meta"></div>
// //               <div className="skeleton skeleton-summary"></div>
// //               <div className="skeleton skeleton-tags"></div>
// //             </div>
            
// //             {/* محتوای اسکلتون */}
// //             <div className="post-detail-content skeleton-content">
// //               <div className="skeleton skeleton-text"></div>
// //               <div className="skeleton skeleton-text"></div>
// //               <div className="skeleton skeleton-text"></div>
// //               <div className="skeleton skeleton-text"></div>
// //               <div className="skeleton skeleton-text-short"></div>
// //             </div>
            
// //             {/* اکشن‌های اسکلتون */}
// //             <div className="post-detail-actions">
// //               <div className="actions-left">
// //                 <div className="skeleton skeleton-action-btn"></div>
// //                 <div className="skeleton skeleton-action-btn"></div>
// //               </div>
// //               <div className="actions-right">
// //                 <div className="skeleton skeleton-social-btn"></div>
// //                 <div className="skeleton skeleton-social-btn"></div>
// //                 <div className="skeleton skeleton-social-btn"></div>
// //               </div>
// //             </div>
            
// //             {/* نویسنده اسکلتون */}
// //             <div className="post-detail-author">
// //               <div className="skeleton skeleton-author-image"></div>
// //               <div className="author-info">
// //                 <div className="skeleton skeleton-author-name"></div>
// //                 <div className="skeleton skeleton-author-desc"></div>
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* مطالب مرتبط اسکلتون */}
// //           <div className="related-posts skeleton-related">
// //             <div className="skeleton skeleton-related-title"></div>
// //             <div className="related-grid">
// //               <div className="skeleton skeleton-related-card"></div>
// //               <div className="skeleton skeleton-related-card"></div>
// //               <div className="skeleton skeleton-related-card"></div>
// //               <div className="skeleton skeleton-related-card"></div>
// //             </div>
// //           </div>
// //         </main>

// //         {/* ستون راست اسکلتون */}
// //         <aside className="blog-detail-sidebar-right">
// //           <div className="skeleton skeleton-sidebar-card"></div>
// //           <div className="skeleton skeleton-ad-card"></div>
// //           <div className="skeleton skeleton-ad-card"></div>
// //         </aside>

// //       </div>
// //     </div>
// //   );
// // };

// // const BlogPostDetail = () => {
// //   const { slug, id } = useParams();
// //   const navigate = useNavigate();
  
// //   const [post, setPost] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [relatedPosts, setRelatedPosts] = useState([]);
// //   const [latestPosts, setLatestPosts] = useState([]);
// //   const [isBookmarked, setIsBookmarked] = useState(false);
// //   const [copied, setCopied] = useState(false);
// //   const [liked, setLiked] = useState(false);
// //   const [likeCount, setLikeCount] = useState(0);
// //   const [processedContent, setProcessedContent] = useState('');

// //   // ===== پردازش محتوای HTML =====
// //   const processContent = (htmlContent) => {
// //     if (!htmlContent) return '';

// //     const tempDiv = document.createElement('div');
// //     tempDiv.innerHTML = htmlContent;

// //     // پردازش تصاویر
// //     const images = tempDiv.querySelectorAll('img');
// //     images.forEach((img) => {
// //       const src = img.getAttribute('src');
// //       const imageId = img.getAttribute('data-image-id') || img.getAttribute('data-id');
// //       console.log(imageId)
      
// //       if (src && src.includes('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')) {
// //         if (imageId) {
// //           img.src = `${API_BASE_URL_IMG_C}/post/${imageId}`;
// //         } else {
// //           img.src = `${API_BASE_URL_IMG_C}/post/${imageId}`;
// //         }
// //         img.alt = 'تصویر مطلب';
// //         return;
// //       }

// //       if (src && src.startsWith('data:image')) {
// //         if (src.length > 1000) return;
// //         return;
// //       }

// //       if (src && src.startsWith('/images-')) {
// //         const fileName = src.split('/').pop();
// //         img.src = `${API_BASE_URL_IMG_C}/post/${fileName}`;
// //         img.alt = 'تصویر مطلب';
// //         return;
// //       }

// //       if (src && src.startsWith('/')) {
// //         const cleanPath = src.substring(1);
// //         console.log(cleanPath)
// //         img.src = `${API_BASE_URL_IMG_C}/${cleanPath}`;
// //         //img.src='https://localhost:7178/post/images-20260714-131033-3.webp'

// //         img.alt = 'تصویر مطلب';
// //               // اضافه کردن استایل برای اطمینان از نمایش
// //            img.alt = 'تصویر مطلب';
// //       img.style.display = 'block';
// //       img.style.width = '40%';
// //       img.style.height = 'auto';
// //       img.style.maxWidth = '40%';
// //       img.style.visibility = 'visible';
// //       img.style.opacity = '1';
// //       img.setAttribute('loading', 'lazy');
// //         return;
// //       }

// //       if (src && !src.startsWith('http') && !src.startsWith('data:')) {
// //         img.src = `${API_BASE_URL_IMG_C}/post/${src}`;
// //         img.alt = 'تصویر مطلب';
// //         return;
// //       }

// //       if (!img.getAttribute('alt')) {
// //         img.setAttribute('alt', 'تصویر مطلب');
// //       }
// //       img.setAttribute('loading', 'lazy');
// //     });

// //     // پردازش لینک‌ها
// //     const links = tempDiv.querySelectorAll('a');
// //     links.forEach((link) => {
// //       const href = link.getAttribute('href');
// //       if (href && !href.startsWith('http') && !href.startsWith('#')) {
// //         link.setAttribute('target', '_blank');
// //         link.setAttribute('rel', 'noopener noreferrer');
// //       }
// //     });

// //     return tempDiv.innerHTML;
// //   };

// //   // ===== دریافت مطلب =====
// //   useEffect(() => {
// //     const fetchPost = async () => {
// //       try {
// //         setLoading(true);
// //         setError(null);

// //         const postId = id || slug;
// //         const response = await fetch(`${API_BASE_URL}/Post/GetDetailsDtosAsync?id=${postId}`);
     
// //         if (!response.ok) {
// //           throw new Error(`خطا در دریافت مطلب: ${response.status}`);
// //         }

// //         const result = await response.json();
// //    console.log(result)
// //         if (result.status === 200 && result.data) {
// //           setPost(result.data);
// //           setLikeCount(Math.floor(Math.random() * 100) + 20);
          
// //           if (result.data.content) {
// //             const processed = processContent(result.data.content);
// //             setProcessedContent(processed);
// //           }
          
// //           if (result.data.categoryPostName) {
// //             await fetchRelatedPosts(result.data.categoryPostName);
// //           }
          
// //           await fetchLatestPosts();

// //           if (slug && result.data.slug && slug !== result.data.slug) {
// //             navigate(`/blog/post/${result.data.slug}/${result.data.id}`, { replace: true });
// //           }
// //         } else {
// //           throw new Error(result.message || 'مطلب یافت نشد');
// //         }
// //       } catch (err) {
// //         console.error('Error fetching post:', err);
// //         setError(err.message || 'خطا در بارگذاری مطلب');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (id || slug) {
// //       fetchPost();
// //       window.scrollTo({ top: 0, behavior: 'smooth' });
// //     }
// //   }, [id, slug, navigate]);

// //   // ===== دریافت مطالب مرتبط =====
// //   const fetchRelatedPosts = async (category) => {
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/Post/getPostCategoryDto?category=${encodeURIComponent(category)}&page=1&pageSize=4`);
      
// //       if (response.ok) {
// //         const result = await response.json();
// //         if (result.status === 200 && result.data) {
// //           const filtered = result.data.filter(p => p.id !== parseInt(id || slug));
// //           setRelatedPosts(filtered.slice(0, 4));
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error fetching related posts:', error);
// //     }
// //   };

// //   // ===== دریافت آخرین مطالب =====
// //   const fetchLatestPosts = async () => {
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/Post/getPostCategoryDto?page=1&pageSize=5`);
      
// //       if (response.ok) {
// //         const result = await response.json();
// //         if (result.status === 200 && result.data) {
// //           const filtered = result.data.filter(p => p.id !== parseInt(id || slug));
// //           setLatestPosts(filtered.slice(0, 5));
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error fetching latest posts:', error);
// //     }
// //   };

// //   // ===== بوکمارک =====
// //   const handleBookmark = async () => {
// //     const postId = id || slug;
// //     try {
// //       if (!isBookmarked) {
// //         const response = await fetch(`${API_BASE_URL}/Post/Bookmark/${postId}`, {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ postId: postId })
// //         });
// //         if (response.ok) setIsBookmarked(true);
// //       } else {
// //         const response = await fetch(`${API_BASE_URL}/Post/Unbookmark/${postId}`, {
// //           method: 'DELETE'
// //         });
// //         if (response.ok) setIsBookmarked(false);
// //       }
// //     } catch (error) {
// //       console.error('Error toggling bookmark:', error);
// //       setIsBookmarked(!isBookmarked);
// //     }
// //   };

// //   // ===== لایک =====
// //   const handleLike = async () => {
// //     const postId = id || slug;
// //     try {
// //       if (!liked) {
// //         const response = await fetch(`${API_BASE_URL}/Post/Like/${postId}`, {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' }
// //         });
// //         if (response.ok) {
// //           setLikeCount(prev => prev + 1);
// //           setLiked(true);
// //         }
// //       } else {
// //         const response = await fetch(`${API_BASE_URL}/Post/Unlike/${postId}`, {
// //           method: 'DELETE'
// //         });
// //         if (response.ok) {
// //           setLikeCount(prev => prev - 1);
// //           setLiked(false);
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error toggling like:', error);
// //       if (!liked) {
// //         setLikeCount(prev => prev + 1);
// //         setLiked(true);
// //       } else {
// //         setLikeCount(prev => prev - 1);
// //         setLiked(false);
// //       }
// //     }
// //   };

// //   // ===== اشتراک‌گذاری =====
// //   const handleCopyLink = () => {
// //     navigator.clipboard.writeText(window.location.href);
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2000);
// //   };

// //   const handleShareSocial = (platform) => {
// //     const url = window.location.href;
// //     const text = post?.title || '';
// //     let shareUrl = '';

// //     switch(platform) {
// //       case 'whatsapp':
// //         shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
// //         break;
// //       case 'telegram':
// //         shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
// //         break;
// //       case 'twitter':
// //         shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
// //         break;
// //       case 'email':
// //         shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
// //         break;
// //       default:
// //         return;
// //     }

// //     window.open(shareUrl, '_blank', 'width=600,height=400');
// //   };

// //   // ===== فرمت تاریخ =====
// //   const formatDate = (dateString) => {
// //     if (!dateString) return '';
// //     try {
// //       const date = new Date(dateString);
// //       return new Intl.DateTimeFormat('fa-IR', {
// //         year: 'numeric',
// //         month: 'long',
// //         day: 'numeric'
// //       }).format(date);
// //     } catch {
// //       return dateString;
// //     }
// //   };

// //   // ===== متادیتا =====
// //   useEffect(() => {
// //     if (post) {
// //       document.title = `${post.title} | وبلاگ مشاور املاک`;
// //     }
// //   }, [post]);

// //   // ===== نمایش Skeleton در حالت بارگذاری =====
// //   if (loading) {
// //     return <BlogDetailSkeleton />;
// //   }

// //   // ===== مدیریت خطا =====
// //   if (error || !post) {
// //     return (
// //       <div className="blog-detail-wrapper">
// //         <div className="blog-detail-error">
// //           <div className="error-icon">📖</div>
// //           <h2>مطلب یافت نشد</h2>
// //           <p>{error || 'متاسفانه مطلب مورد نظر وجود ندارد'}</p>
// //           <button onClick={() => navigate('/blog')} className="back-to-blog-btn">
// //             <FaArrowRight /> بازگشت به وبلاگ
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ===== رندر اصلی با 3 ستون =====
// //   return (
// //     <div className="blog-detail-wrapper">
// //       {/* ===== دکمه بازگشت ===== */}
// //       <div className="blog-detail-top-bar">
// //         <button className="back-btn" onClick={() => navigate('/blog')}>
// //           <FaArrowRight /> بازگشت به وبلاگ
// //         </button>
// //         <div className="breadcrumb">
// //           <Link to="/"><FaHome /> خانه</Link>
// //           <span>/</span>
// //           <Link to="/blog">وبلاگ</Link>
// //           <span>/</span>
// //           <span className="current">{post.title}</span>
// //         </div>
// //       </div>

// //       {/* ===== 3 ستون ===== */}
// //       <div className="blog-detail-three-column">

// //         {/* ===== ستون چپ - تبلیغات ===== */}
// //         <aside className="blog-detail-sidebar-left">
// //           <div className="ad-card">
// //             <div className="ad-badge">تبلیغات</div>
// //             <div className="ad-content">
// //               <FaBullhorn className="ad-icon" />
// //               <h4>خرید و فروش ملک</h4>
// //               <p>با مشاوران مجرب ما در تماس باشید</p>
// //               <button className="ad-btn">تماس بگیرید</button>
// //             </div>
// //           </div>

// //           <div className="ad-card">
// //             <div className="ad-badge">تبلیغات</div>
// //             <div className="ad-content">
// //               <FaHome className="ad-icon" />
// //               <h4>وام مسکن</h4>
// //               <p>بهترین شرایط وام مسکن را دریافت کنید</p>
// //               <button className="ad-btn">اطلاعات بیشتر</button>
// //             </div>
// //           </div>

// //           <div className="ad-card">
// //             <div className="ad-badge">تبلیغات</div>
// //             <div className="ad-content">
// //               <img 
// //                 src="https://via.placeholder.com/300x250/7d0000/ffffff?text=تبلیغ+شما"
// //                 alt="تبلیغات"
// //                 className="ad-image"
// //               />
// //             </div>
// //           </div>
// //         </aside>

// //         {/* ===== ستون وسط - محتوای اصلی ===== */}
// //         <main className="blog-detail-main">
// //           <article className="blog-post-detail">
            
// //             {/* تصویر اصلی */}
// //             {post.imageUrl && (
// //               <div className="post-detail-image">
// //                 <img 
// //                   src={`${API_BASE_URL_IMG}/posts/${post.imageUrl}`} 
// //                   alt={post.title}
// //                   onError={(e) => {
// //                     e.target.src = 'https://via.placeholder.com/800x400/7d0000/ffffff?text=تصویر+مطلب';
// //                   }}
// //                 />
// //                 {post.categoryPostName && (
// //                   <span className="post-detail-category">
// //                     <FaTag /> {post.categoryPostName}
// //                   </span>
// //                 )}
// //               </div>
// //             )}

// //             {/* هدر مطلب */}
// //             <div className="post-detail-header">
// //               <h1 className="post-detail-title">{post.title}</h1>
              
// //               <div className="post-detail-meta">
// //                 <span><FaCalendarAlt /> {post.createdAtPersianRelative || formatDate(post.createdAt)}</span>
// //                 {post.agents && post.agents.length > 0 && (
// //                   <span><FaUser /> {post.agents[0]?.fullName || 'نویسنده'}</span>
// //                 )}
// //                 <span><FaEye /> {post.countView || 0} بازدید</span>
// //                 <span><FaClock /> {post.readTime || '3 دقیقه'}</span>
// //               </div>

// //               {post.summary && (
// //                 <div className="post-detail-summary">
// //                   <p>{post.summary}</p>
// //                 </div>
// //               )}

// //               {post.tags && post.tags.length > 0 && (
// //                 <div className="post-detail-tags">
// //                   {post.tags.map((tag, index) => (
// //                     <span key={index} className="tag-item">
// //                       <FaHashtag /> {tag}
// //                     </span>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>

// //             {/* محتوای اصلی */}
// //             <div 
// //               className="post-detail-content"
// //               dangerouslySetInnerHTML={{ 
// //                 __html: DOMPurify.sanitize(processedContent || post.content, {
// //                 ADD_TAGS: ['iframe', 'video', 'source', 'figure', 'figcaption', 'style'],
// //       ADD_ATTR: ['src', 'alt', 'title', 'width', 'height', 'loading', 'class', 'style', 'data-image-id', 'target', 'rel']
// //                 })
// //               }}
// //             />

// //             {/* بخش تعامل */}
// //             <div className="post-detail-actions">
// //               <div className="actions-left">
// //                 <button 
// //                   className={`action-btn like ${liked ? 'active' : ''}`}
// //                   onClick={handleLike}
// //                 >
// //                   <FaThumbsUp /> {likeCount}
// //                 </button>
// //                 <button 
// //                   className={`action-btn bookmark ${isBookmarked ? 'active' : ''}`}
// //                   onClick={handleBookmark}
// //                 >
// //                   {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
// //                   {isBookmarked ? 'ذخیره شده' : 'ذخیره'}
// //                 </button>
// //               </div>
              
// //               <div className="actions-right">
// //                 <div className="social-share-buttons">
// //                   <button onClick={() => handleShareSocial('whatsapp')} className="social-btn whatsapp">
// //                     <FaWhatsapp />
// //                   </button>
// //                   <button onClick={() => handleShareSocial('telegram')} className="social-btn telegram">
// //                     <FaTelegram />
// //                   </button>
// //                   <button onClick={() => handleShareSocial('twitter')} className="social-btn twitter">
// //                     <FaTwitter />
// //                   </button>
// //                   <button onClick={() => handleShareSocial('email')} className="social-btn email">
// //                     <FaEnvelope />
// //                   </button>
// //                   <button onClick={handleCopyLink} className="social-btn copy">
// //                     <FaLink />
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* نویسنده */}
// //             {post.agents && post.agents.length > 0 && (
// //               <div className="post-detail-author">
// //                 <img 
// //                   src={post.agents[0]?.imageUrl ? `${API_BASE_URL_IMG}/post/${post.agents[0].imageUrl}` : 'https://via.placeholder.com/80/7d0000/ffffff?text=نویسنده'} 
// //                   alt={post.agents[0]?.fullName || 'نویسنده'} 
// //                   className="author-image"
// //                   onError={(e) => {
// //                     e.target.src = 'https://via.placeholder.com/80/7d0000/ffffff?text=نویسنده';
// //                   }}
// //                 />
// //                 <div className="author-info">
// //                   <h4>{post.agents[0]?.fullName || 'نویسنده'}</h4>
// //                   <p>{post.agents[0]?.description || 'نویسنده و کارشناس حوزه املاک و مستغلات'}</p>
// //                 </div>
// //               </div>
// //             )}

// //           </article>

// //           {/* مطالب مرتبط */}
// //           {relatedPosts.length > 0 && (
// //             <div className="related-posts">
// //               <h3 className="related-title">مطالب مرتبط</h3>
// //               <div className="related-grid">
// //                 {relatedPosts.map((related) => (
// //                   <div 
// //                     key={related.id} 
// //                     className="related-card"
// //                     onClick={() => navigate(`/blog/post/${related.slug || related.id}/${related.id}`)}
// //                   >
// //                     {related.imageUrl && (
// //                       <div className="related-image-wrapper">
// //                         <img 
// //                           src={`${API_BASE_URL_IMG}/posts/${related.imageUrl}`} 
// //                           alt={related.title}
// //                           onError={(e) => {
// //                             e.target.src = 'https://via.placeholder.com/400x200/7d0000/ffffff?text=تصویر';
// //                           }}
// //                         />
// //                       </div>
// //                     )}
// //                     <div className="related-content">
// //                       <h4>{related.title}</h4>
// //                       <div className="related-meta">
// //                         <span><FaCalendarAlt /> {related.createdAtPersianRelative || formatDate(related.createdAt)}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </main>

// //         {/* ===== ستون راست - آخرین مطالب ===== */}
// //         <aside className="blog-detail-sidebar-right">
// //           <div className="sidebar-card">
// //             <h4 className="sidebar-title">
// //               <FaNewspaper /> آخرین مطالب
// //             </h4>
// //             <ul className="sidebar-posts-list">
// //               {latestPosts.map((item) => (
// //                 <li key={item.id} className="sidebar-post-item">
// //                   <Link to={`/blog/post/${item.slug || item.id}/${item.id}`}>
// //                     <span className="sidebar-post-title">{item.title}</span>
// //                     <span className="sidebar-post-date">
// //                       <FaCalendarAlt /> {item.createdAtPersianRelative || formatDate(item.createdAt)}
// //                     </span>
// //                   </Link>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>

// //           <div className="ad-card sidebar-ad">
// //             <div className="ad-badge">تبلیغات</div>
// //             <div className="ad-content">
// //               <FaAd className="ad-icon" />
// //               <h4>ثبت آگهی رایگان</h4>
// //               <p>ملک خود را رایگان ثبت کنید</p>
// //               <button className="ad-btn">ثبت آگهی</button>
// //             </div>
// //           </div>

// //           <div className="ad-card sidebar-ad">
// //             <div className="ad-badge">تبلیغات</div>
// //             <div className="ad-content">
// //               <img 
// //                 src="https://via.placeholder.com/300x250/7d0000/ffffff?text=تبلیغات+ویژه"
// //                 alt="تبلیغات ویژه"
// //                 className="ad-image"
// //               />
// //             </div>
// //           </div>
// //         </aside>

// //       </div>

// //       {/* نوتیفیکیشن کپی */}
// //       {copied && (
// //         <div className="copy-notification">
// //           <FaLink /> لینک کپی شد
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default BlogPostDetail;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { 
//   FaArrowRight, FaCalendarAlt, FaUser, FaEye, FaClock,
//   FaShare, FaBookmark, FaRegBookmark, FaTag, FaHashtag,
//   FaSpinner, FaThumbsUp, FaWhatsapp, FaTelegram, FaTwitter, 
//   FaEnvelope, FaLink, FaHome, FaBullhorn, FaAd, FaNewspaper
// } from 'react-icons/fa';
// import DOMPurify from 'dompurify';
// import './BlogPostDetail.css';

// const API_BASE_URL = 'https://localhost:7178/api';
// const API_BASE_URL_IMG = 'https://localhost:7178/uploads';
// const API_BASE_URL_IMG_C = 'https://localhost:7178';

// // ===== کامپوننت Skeleton Loader =====
// const BlogDetailSkeleton = () => {
//   return (
//     <div className="blog-detail-wrapper">
//       {/* تاپ بار اسکلتون */}
//       <div className="blog-detail-top-bar">
//         <div className="skeleton skeleton-back-btn"></div>
//         <div className="skeleton skeleton-breadcrumb"></div>
//       </div>

//       {/* 3 ستون اسکلتون */}
//       <div className="blog-detail-three-column">
        
//         {/* ستون چپ اسکلتون */}
//         <aside className="blog-detail-sidebar-left">
//           <div className="skeleton skeleton-ad-card"></div>
//           <div className="skeleton skeleton-ad-card"></div>
//           <div className="skeleton skeleton-ad-card"></div>
//         </aside>

//         {/* ستون وسط اسکلتون */}
//         <main className="blog-detail-main">
//           <div className="blog-post-detail skeleton-post">
//             {/* تصویر اسکلتون */}
//             <div className="skeleton skeleton-image"></div>
            
//             {/* هدر اسکلتون */}
//             <div className="post-detail-header">
//               <div className="skeleton skeleton-title"></div>
//               <div className="skeleton skeleton-meta"></div>
//               <div className="skeleton skeleton-summary"></div>
//               <div className="skeleton skeleton-tags"></div>
//             </div>
            
//             {/* محتوای اسکلتون */}
//             <div className="post-detail-content skeleton-content">
//               <div className="skeleton skeleton-text"></div>
//               <div className="skeleton skeleton-text"></div>
//               <div className="skeleton skeleton-text"></div>
//               <div className="skeleton skeleton-text"></div>
//               <div className="skeleton skeleton-text-short"></div>
//             </div>
            
//             {/* اکشن‌های اسکلتون */}
//             <div className="post-detail-actions">
//               <div className="actions-left">
//                 <div className="skeleton skeleton-action-btn"></div>
//                 <div className="skeleton skeleton-action-btn"></div>
//               </div>
//               <div className="actions-right">
//                 <div className="skeleton skeleton-social-btn"></div>
//                 <div className="skeleton skeleton-social-btn"></div>
//                 <div className="skeleton skeleton-social-btn"></div>
//               </div>
//             </div>
            
//             {/* نویسنده اسکلتون */}
//             <div className="post-detail-author">
//               <div className="skeleton skeleton-author-image"></div>
//               <div className="author-info">
//                 <div className="skeleton skeleton-author-name"></div>
//                 <div className="skeleton skeleton-author-desc"></div>
//               </div>
//             </div>
//           </div>
          
//           {/* مطالب مرتبط اسکلتون */}
//           <div className="related-posts skeleton-related">
//             <div className="skeleton skeleton-related-title"></div>
//             <div className="related-grid">
//               <div className="skeleton skeleton-related-card"></div>
//               <div className="skeleton skeleton-related-card"></div>
//               <div className="skeleton skeleton-related-card"></div>
//               <div className="skeleton skeleton-related-card"></div>
//             </div>
//           </div>
//         </main>

//         {/* ستون راست اسکلتون */}
//         <aside className="blog-detail-sidebar-right">
//           <div className="skeleton skeleton-sidebar-card"></div>
//           <div className="skeleton skeleton-ad-card"></div>
//           <div className="skeleton skeleton-ad-card"></div>
//         </aside>

//       </div>
//     </div>
//   );
// };

// const BlogPostDetail = () => {
//   const { slug, id ,categoryId} = useParams();
//   const navigate = useNavigate();
  
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [relatedPosts, setRelatedPosts] = useState([]);
//   const [latestPosts, setLatestPosts] = useState([]);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
//   const [processedContent, setProcessedContent] = useState('');

//   // ===== پردازش محتوای HTML =====
//   const processContent = (htmlContent) => {
//     if (!htmlContent) return '';

//     const tempDiv = document.createElement('div');
//     tempDiv.innerHTML = htmlContent;

//     // پردازش تصاویر
//     const images = tempDiv.querySelectorAll('img');
//     images.forEach((img) => {
//       const src = img.getAttribute('src');
//       const imageId = img.getAttribute('data-image-id') || img.getAttribute('data-id');
//       console.log(imageId)
      
//       if (src && src.includes('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')) {
//         if (imageId) {
//           img.src = `${API_BASE_URL_IMG_C}/post/${imageId}`;
//         } else {
//           img.src = `${API_BASE_URL_IMG_C}/post/${imageId}`;
//         }
//         img.alt = 'تصویر مطلب';
//         return;
//       }

//       if (src && src.startsWith('data:image')) {
//         if (src.length > 1000) return;
//         return;
//       }

//       if (src && src.startsWith('/images-')) {
//         const fileName = src.split('/').pop();
//         img.src = `${API_BASE_URL_IMG_C}/post/${fileName}`;
//         img.alt = 'تصویر مطلب';
//         return;
//       }

//       if (src && src.startsWith('/')) {
//         const cleanPath = src.substring(1);
//         console.log(cleanPath)
//         img.src = `${API_BASE_URL_IMG_C}/${cleanPath}`;
//         img.alt = 'تصویر مطلب';
//         img.style.display = 'block';
//         img.style.width = '40%';
//         img.style.height = 'auto';
//         img.style.maxWidth = '40%';
//         img.style.visibility = 'visible';
//         img.style.opacity = '1';
//         img.setAttribute('loading', 'lazy');
//         return;
//       }

//       if (src && !src.startsWith('http') && !src.startsWith('data:')) {
//         img.src = `${API_BASE_URL_IMG_C}/post/${src}`;
//         img.alt = 'تصویر مطلب';
//         return;
//       }

//       if (!img.getAttribute('alt')) {
//         img.setAttribute('alt', 'تصویر مطلب');
//       }
//       img.setAttribute('loading', 'lazy');
//     });

//     // پردازش لینک‌ها
//     const links = tempDiv.querySelectorAll('a');
//     links.forEach((link) => {
//       const href = link.getAttribute('href');
//       if (href && !href.startsWith('http') && !href.startsWith('#')) {
//         link.setAttribute('target', '_blank');
//         link.setAttribute('rel', 'noopener noreferrer');
//       }
//     });

//     return tempDiv.innerHTML;
//   };

//   // ===== دریافت مطلب =====
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const postId = id || slug;
//         const response = await fetch(`${API_BASE_URL}/Post/GetDetailsDtosAsync?id=${postId}`);
     
//         if (!response.ok) {
//           throw new Error(`خطا در دریافت مطلب: ${response.status}`);
//         }

//         const result = await response.json();
//    console.log(result)
//         if (result.status === 200 && result.data) {
//           setPost(result.data);
//           setLikeCount(Math.floor(Math.random() * 100) + 20);
          
//           if (result.data.content) {
//             const processed = processContent(result.data.content);
//             setProcessedContent(processed);
//           }
          
//           if (result.data.categoryPostName) {
//             await fetchRelatedPosts(result.data.categoryPostName);
//           }
          
//           await fetchLatestPosts();

//           if (slug && result.data.slug && slug !== result.data.slug) {
//             navigate(`/blog/post/${result.data.slug}/${result.data.id}`, { replace: true });
//           }
//         } else {
//           throw new Error(result.message || 'مطلب یافت نشد');
//         }
//       } catch (err) {
//         console.error('Error fetching post:', err);
//         setError(err.message || 'خطا در بارگذاری مطلب');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id || slug) {
//       fetchPost();
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   }, [id, slug, navigate]);

//   // ===== دریافت مطالب مرتبط =====
//   const fetchRelatedPosts = async (category) => {
//     try {
//            const requestBody = {
//         categoryId: categoryId,
//         searchStream:  null,
//         pageSize: 5,
//         pageNumber: 1
//       };
//       console.log('aaaaaaaaaaaaaaaaaaa',requestBody)
//           const response = await fetch(`${API_BASE_URL}/Post/getPostCategoryDto`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify(requestBody)
//       });
      
//       if (response.ok) {
//         const result = await response.json();
//              console.log('miyaad',result)
//         if (result.status === 200 && result.data) {
//           console.log('miyaad')
//           const filtered = result.data.items.filter(p => p.id !== parseInt(id || slug));
//           setRelatedPosts(filtered.slice(0, 4));
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching related posts:', error);
//     }
//   };

//   // ===== دریافت جدیدترین مطالب از API =====
//   const fetchLatestPosts = async () => {
//     try {
//       console.log('📡 دریافت جدیدترین مطالب از API...');
      
//       const response = await fetch(`${API_BASE_URL}/Post/GetTopNewPostsAsync`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`خطا در دریافت جدیدترین مطالب: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log('📥 جدیدترین مطالب دریافت شد:', result);

//       if (result.status === 200 && result.data && result.data.length > 0) {
//         // فیلتر کردن مطلب فعلی از لیست جدیدترین مطالب
//         const filtered = result.data.filter(p => p.id !== parseInt(id || slug));
//         // تبدیل داده‌های دریافتی به فرمت مورد نظر
//         const formattedLatestPosts = filtered.slice(0, 10).map((post) => ({
//           id: post.id,
//           title: post.title || 'بدون عنوان',
//           slug: post.slug || post.id,
//           imageUrl: post.imageUrl ? `${API_BASE_URL_IMG_C}/uploads/posts/${post.imageUrl}` : null,
//           summary: post.summary || '',
//           categoryPostName: post.categoryPostName || 'دسته‌بندی نشده',
//           countView: post.countView || 0,
//           createdAt: post.createdAt,
//           createdAtPersianRelative: post.createdAtPersianRelative || formatDate(post.createdAt)
//         }));

//         setLatestPosts(formattedLatestPosts);
//         console.log('✅ جدیدترین مطالب فرمت شدند:', formattedLatestPosts.length, 'مطلب');
//       } else {
//         console.warn('⚠️ داده‌ای برای جدیدترین مطالب دریافت نشد');
//         // در صورت عدم دریافت داده، از دیتای پیش‌فرض استفاده می‌کنیم
//         setLatestPosts(getDefaultLatestPosts());
//       }
//     } catch (error) {
//       console.error('❌ خطا در دریافت جدیدترین مطالب:', error);
//       // در صورت خطا، از دیتای پیش‌فرض استفاده می‌کنیم
//       setLatestPosts(getDefaultLatestPosts());
//     }
//   };

//   // ===== دیتای پیش‌فرض برای جدیدترین مطالب (در صورت عدم دریافت از API) =====
//   const getDefaultLatestPosts = () => {
//     return [
//       {
//         id: 1,
//         title: 'راهنمای جامع خرید ملک در تهران',
//         slug: 'guide-to-buying-property-in-tehran',
//         createdAtPersianRelative: 'امروز',
//         createdAt: '2026-07-16T10:30:00'
//       },
//       {
//         id: 2,
//         title: 'نکات طلایی برای سرمایه‌گذاری در املاک',
//         slug: 'golden-tips-for-real-estate-investment',
//         createdAtPersianRelative: 'دیروز',
//         createdAt: '2026-07-15T14:20:00'
//       },
//       {
//         id: 3,
//         title: 'مقایسه مناطق مختلف تهران برای خرید خانه',
//         slug: 'compare-different-areas-of-tehran',
//         createdAtPersianRelative: '۲ روز پیش',
//         createdAt: '2026-07-14T09:15:00'
//       },
//       {
//         id: 4,
//         title: 'مراحل قانونی خرید و فروش ملک',
//         slug: 'legal-steps-for-buying-and-selling-property',
//         createdAtPersianRelative: '۳ روز پیش',
//         createdAt: '2026-07-13T16:45:00'
//       },
//       {
//         id: 5,
//         title: 'بهترین زمان برای خرید خانه در ایران',
//         slug: 'best-time-to-buy-house-in-iran',
//         createdAtPersianRelative: '۴ روز پیش',
//         createdAt: '2026-07-12T11:00:00'
//       }
//     ];
//   };

//   // ===== بوکمارک =====
//   const handleBookmark = async () => {
//     const postId = id || slug;
//     try {
//       if (!isBookmarked) {
//         const response = await fetch(`${API_BASE_URL}/Post/Bookmark/${postId}`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ postId: postId })
//         });
//         if (response.ok) setIsBookmarked(true);
//       } else {
//         const response = await fetch(`${API_BASE_URL}/Post/Unbookmark/${postId}`, {
//           method: 'DELETE'
//         });
//         if (response.ok) setIsBookmarked(false);
//       }
//     } catch (error) {
//       console.error('Error toggling bookmark:', error);
//       setIsBookmarked(!isBookmarked);
//     }
//   };

//   // ===== لایک =====
//   const handleLike = async () => {
//     const postId = id || slug;
//     try {
//       if (!liked) {
//         const response = await fetch(`${API_BASE_URL}/Post/Like/${postId}`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' }
//         });
//         if (response.ok) {
//           setLikeCount(prev => prev + 1);
//           setLiked(true);
//         }
//       } else {
//         const response = await fetch(`${API_BASE_URL}/Post/Unlike/${postId}`, {
//           method: 'DELETE'
//         });
//         if (response.ok) {
//           setLikeCount(prev => prev - 1);
//           setLiked(false);
//         }
//       }
//     } catch (error) {
//       console.error('Error toggling like:', error);
//       if (!liked) {
//         setLikeCount(prev => prev + 1);
//         setLiked(true);
//       } else {
//         setLikeCount(prev => prev - 1);
//         setLiked(false);
//       }
//     }
//   };

//   // ===== اشتراک‌گذاری =====
//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(window.location.href);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleShareSocial = (platform) => {
//     const url = window.location.href;
//     const text = post?.title || '';
//     let shareUrl = '';

//     switch(platform) {
//       case 'whatsapp':
//         shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
//         break;
//       case 'telegram':
//         shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
//         break;
//       case 'twitter':
//         shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
//         break;
//       case 'email':
//         shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
//         break;
//       default:
//         return;
//     }

//     window.open(shareUrl, '_blank', 'width=600,height=400');
//   };

//   // ===== فرمت تاریخ =====
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       return new Intl.DateTimeFormat('fa-IR', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       }).format(date);
//     } catch {
//       return dateString;
//     }
//   };

//   // ===== متادیتا =====
//   useEffect(() => {
//     if (post) {
//       document.title = `${post.title} | وبلاگ مشاور املاک`;
//     }
//   }, [post]);

//   // ===== نمایش Skeleton در حالت بارگذاری =====
//   if (loading) {
//     return <BlogDetailSkeleton />;
//   }

//   // ===== مدیریت خطا =====
//   if (error || !post) {
//     return (
//       <div className="blog-detail-wrapper">
//         <div className="blog-detail-error">
//           <div className="error-icon">📖</div>
//           <h2>مطلب یافت نشد</h2>
//           <p>{error || 'متاسفانه مطلب مورد نظر وجود ندارد'}</p>
//           <button onClick={() => navigate('/blog')} className="back-to-blog-btn">
//             <FaArrowRight /> بازگشت به وبلاگ
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ===== رندر اصلی با 3 ستون =====
//   return (
//     <div className="blog-detail-wrapper">
//       {/* ===== دکمه بازگشت ===== */}
//       <div className="blog-detail-top-bar">
//         <button className="back-btn" onClick={() => navigate('/blog')}>
//           <FaArrowRight /> بازگشت به وبلاگ
//         </button>
//         <div className="breadcrumb">
//           <Link to="/"><FaHome /> خانه</Link>
//           <span>/</span>
//           <Link to="/blog">وبلاگ</Link>
//           <span>/</span>
//           <span className="current">{post.title}</span>
//         </div>
//       </div>

//       {/* ===== 3 ستون ===== */}
//       <div className="blog-detail-three-column">

//         {/* ===== ستون چپ - تبلیغات ===== */}
//         <aside className="blog-detail-sidebar-left">
//           <div className="ad-card">
//             <div className="ad-badge">تبلیغات</div>
//             <div className="ad-content">
//               <FaBullhorn className="ad-icon" />
//               <h4>خرید و فروش ملک</h4>
//               <p>با مشاوران مجرب ما در تماس باشید</p>
//               <button className="ad-btn">تماس بگیرید</button>
//             </div>
//           </div>

//           <div className="ad-card">
//             <div className="ad-badge">تبلیغات</div>
//             <div className="ad-content">
//               <FaHome className="ad-icon" />
//               <h4>وام مسکن</h4>
//               <p>بهترین شرایط وام مسکن را دریافت کنید</p>
//               <button className="ad-btn">اطلاعات بیشتر</button>
//             </div>
//           </div>

//           <div className="ad-card">
//             <div className="ad-badge">تبلیغات</div>
//             <div className="ad-content">
//               <img 
//                 src="https://via.placeholder.com/300x250/7d0000/ffffff?text=تبلیغ+شما"
//                 alt="تبلیغات"
//                 className="ad-image"
//               />
//             </div>
//           </div>
//         </aside>

//         {/* ===== ستون وسط - محتوای اصلی ===== */}
//         <main className="blog-detail-main">
//           <article className="blog-post-detail">
            
//             {/* تصویر اصلی */}
//             {post.imageUrl && (
//               <div className="post-detail-image">
//                 <img 
//                   src={`${API_BASE_URL_IMG}/posts/${post.imageUrl}`} 
//                   alt={post.title}
//                   onError={(e) => {
//                     e.target.src = 'https://via.placeholder.com/800x400/7d0000/ffffff?text=تصویر+مطلب';
//                   }}
//                 />
//                 {post.categoryPostName && (
//                   <span className="post-detail-category">
//                     <FaTag /> {post.categoryPostName}
//                   </span>
//                 )}
//               </div>
//             )}

//             {/* هدر مطلب */}
//             <div className="post-detail-header">
//               <h1 className="post-detail-title">{post.title}</h1>
              
//               <div className="post-detail-meta">
//                 <span><FaCalendarAlt /> {post.createdAtPersianRelative || formatDate(post.createdAt)}</span>
//                 {post.agents && post.agents.length > 0 && (
//                   <span><FaUser /> {post.agents[0]?.fullName || 'نویسنده'}</span>
//                 )}
//                 <span><FaEye /> {post.countView || 0} بازدید</span>
//                 <span><FaClock /> {post.readTime || '3 دقیقه'}</span>
//               </div>

//               {post.summary && (
//                 <div className="post-detail-summary">
//                   <p>{post.summary}</p>
//                 </div>
//               )}

//               {post.tags && post.tags.length > 0 && (
//                 <div className="post-detail-tags">
//                   {post.tags.map((tag, index) => (
//                     <span key={index} className="tag-item">
//                       <FaHashtag /> {tag}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* محتوای اصلی */}
//             <div 
//               className="post-detail-content"
//               dangerouslySetInnerHTML={{ 
//                 __html: DOMPurify.sanitize(processedContent || post.content, {
//                 ADD_TAGS: ['iframe', 'video', 'source', 'figure', 'figcaption', 'style'],
//       ADD_ATTR: ['src', 'alt', 'title', 'width', 'height', 'loading', 'class', 'style', 'data-image-id', 'target', 'rel']
//                 })
//               }}
//             />

//             {/* بخش تعامل */}
//             <div className="post-detail-actions">
//               <div className="actions-left">
//                 <button 
//                   className={`action-btn like ${liked ? 'active' : ''}`}
//                   onClick={handleLike}
//                 >
//                   <FaThumbsUp /> {likeCount}
//                 </button>
//                 <button 
//                   className={`action-btn bookmark ${isBookmarked ? 'active' : ''}`}
//                   onClick={handleBookmark}
//                 >
//                   {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
//                   {isBookmarked ? 'ذخیره شده' : 'ذخیره'}
//                 </button>
//               </div>
              
//               <div className="actions-right">
//                 <div className="social-share-buttons">
//                   <button onClick={() => handleShareSocial('whatsapp')} className="social-btn whatsapp">
//                     <FaWhatsapp />
//                   </button>
//                   <button onClick={() => handleShareSocial('telegram')} className="social-btn telegram">
//                     <FaTelegram />
//                   </button>
//                   <button onClick={() => handleShareSocial('twitter')} className="social-btn twitter">
//                     <FaTwitter />
//                   </button>
//                   <button onClick={() => handleShareSocial('email')} className="social-btn email">
//                     <FaEnvelope />
//                   </button>
//                   <button onClick={handleCopyLink} className="social-btn copy">
//                     <FaLink />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* نویسنده */}
//             {post.agents && post.agents.length > 0 && (
//               <div className="post-detail-author">
//                 <img 
//                   src={post.agents[0]?.imageUrl ? `${API_BASE_URL_IMG}/post/${post.agents[0].imageUrl}` : 'https://via.placeholder.com/80/7d0000/ffffff?text=نویسنده'} 
//                   alt={post.agents[0]?.fullName || 'نویسنده'} 
//                   className="author-image"
//                   onError={(e) => {
//                     e.target.src = 'https://via.placeholder.com/80/7d0000/ffffff?text=نویسنده';
//                   }}
//                 />
//                 <div className="author-info">
//                   <h4>{post.agents[0]?.fullName || 'نویسنده'}</h4>
//                   <p>{post.agents[0]?.description || 'نویسنده و کارشناس حوزه املاک و مستغلات'}</p>
//                 </div>
//               </div>
//             )}

//           </article>

//           {/* مطالب مرتبط */}
//           {relatedPosts.length > 0 && (
//             <div className="related-posts">
//               <h2 className="related-title">مطالب مرتبط</h2>
//               <div className="related-grid">
//                 {relatedPosts.map((related) => (
//                   <div 
//                     key={related.id} 
//                     className="related-card"
//                     onClick={() => navigate(`/blog/post/${related.slug || related.id}/${related.id}`)}
//                   >
//                     {related.imageUrl && (
//                       <div className="related-image-wrapper">
//                         <img 
//                           src={`${API_BASE_URL_IMG}/posts/${related.imageUrl}`} 
//                           alt={related.title}
//                           onError={(e) => {
//                             e.target.src = 'https://via.placeholder.com/400x200/7d0000/ffffff?text=تصویر';
//                           }}
//                         />
//                       </div>
//                     )}
//                     <div className="related-content">
//                       <h4>{related.title}</h4>
//                       <div className="related-meta">
//                         <span><FaCalendarAlt /> {related.createdAtPersianRelative || formatDate(related.createdAt)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </main>

//         {/* ===== ستون راست - جدیدترین مطالب ===== */}
//         <aside className="blog-detail-sidebar-right">
//           <div className="sidebar-card">
//             <h4 className="sidebar-title">
//               <FaNewspaper /> جدیدترین مطالب
//             </h4>
//             <ul className="sidebar-posts-list">
//               {latestPosts.length === 0 ? (
//                 <div className="sidebar-loading">
//                   <FaSpinner className="loading-spinner" aria-hidden="true" />
//                   <span>در حال بارگذاری...</span>
//                 </div>
//               ) : (
//                 latestPosts.map((item) => (
//                   <li key={item.id} className="sidebar-post-item">
//                     <Link to={`/blog/post/${item.slug || item.id}/${item.id}`}>
//                       <span className="sidebar-post-title">{item.title}</span>
//                       <span className="sidebar-post-date">
//                         <FaCalendarAlt /> {item.createdAtPersianRelative || formatDate(item.createdAt)}
//                       </span>
//                     </Link>
//                   </li>
//                 ))
//               )}
//             </ul>
//           </div>

//           <div className="ad-card sidebar-ad">
//             <div className="ad-badge">تبلیغات</div>
//             <div className="ad-content">
//               <FaAd className="ad-icon" />
//               <h4>ثبت آگهی رایگان</h4>
//               <p>ملک خود را رایگان ثبت کنید</p>
//               <button className="ad-btn">ثبت آگهی</button>
//             </div>
//           </div>

//           <div className="ad-card sidebar-ad">
//             <div className="ad-badge">تبلیغات</div>
//             <div className="ad-content">
//               <img 
//                 src="https://via.placeholder.com/300x250/7d0000/ffffff?text=تبلیغات+ویژه"
//                 alt="تبلیغات ویژه"
//                 className="ad-image"
//               />
//             </div>
//           </div>
//         </aside>

//       </div>

//       {/* نوتیفیکیشن کپی */}
//       {copied && (
//         <div className="copy-notification">
//           <FaLink /> لینک کپی شد
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogPostDetail;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowRight, FaCalendarAlt, FaUser, FaEye, FaClock,
  FaShare, FaBookmark, FaRegBookmark, FaTag, FaHashtag,
  FaSpinner, FaThumbsUp, FaWhatsapp, FaTelegram, FaTwitter, 
  FaEnvelope, FaLink, FaHome, FaBullhorn, FaAd, FaNewspaper
} from 'react-icons/fa';
import DOMPurify from 'dompurify';
import './BlogPostDetail.css';

const API_BASE_URL = 'https://localhost:7178/api';
const API_BASE_URL_IMG = 'https://localhost:7178/uploads';
const API_BASE_URL_IMG_C = 'https://localhost:7178';

// ===== ثابت‌های مدیریت بازدید =====
const VIEW_EXPIRY_DAYS = 30; // بازدیدها تا 30 روز معتبر هستند

// ===== کامپوننت Skeleton Loader =====
const BlogDetailSkeleton = () => {
  return (
    <div className="blog-detail-wrapper">
      {/* تاپ بار اسکلتون */}
      <div className="blog-detail-top-bar">
        <div className="skeleton skeleton-back-btn"></div>
        <div className="skeleton skeleton-breadcrumb"></div>
      </div>

      {/* 3 ستون اسکلتون */}
      <div className="blog-detail-three-column">
        
        {/* ستون چپ اسکلتون */}
        <aside className="blog-detail-sidebar-left">
          <div className="skeleton skeleton-ad-card"></div>
          <div className="skeleton skeleton-ad-card"></div>
          <div className="skeleton skeleton-ad-card"></div>
        </aside>

        {/* ستون وسط اسکلتون */}
        <main className="blog-detail-main">
          <div className="blog-post-detail skeleton-post">
            {/* تصویر اسکلتون */}
            <div className="skeleton skeleton-image"></div>
            
            {/* هدر اسکلتون */}
            <div className="post-detail-header">
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-meta"></div>
              <div className="skeleton skeleton-summary"></div>
              <div className="skeleton skeleton-tags"></div>
            </div>
            
            {/* محتوای اسکلتون */}
            <div className="post-detail-content skeleton-content">
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text-short"></div>
            </div>
            
            {/* اکشن‌های اسکلتون */}
            <div className="post-detail-actions">
              <div className="actions-left">
                <div className="skeleton skeleton-action-btn"></div>
                <div className="skeleton skeleton-action-btn"></div>
              </div>
              <div className="actions-right">
                <div className="skeleton skeleton-social-btn"></div>
                <div className="skeleton skeleton-social-btn"></div>
                <div className="skeleton skeleton-social-btn"></div>
              </div>
            </div>
            
            {/* نویسنده اسکلتون */}
            <div className="post-detail-author">
              <div className="skeleton skeleton-author-image"></div>
              <div className="author-info">
                <div className="skeleton skeleton-author-name"></div>
                <div className="skeleton skeleton-author-desc"></div>
              </div>
            </div>
          </div>
          
          {/* مطالب مرتبط اسکلتون */}
          <div className="related-posts skeleton-related">
            <div className="skeleton skeleton-related-title"></div>
            <div className="related-grid">
              <div className="skeleton skeleton-related-card"></div>
              <div className="skeleton skeleton-related-card"></div>
              <div className="skeleton skeleton-related-card"></div>
              <div className="skeleton skeleton-related-card"></div>
            </div>
          </div>
        </main>

        {/* ستون راست اسکلتون */}
        <aside className="blog-detail-sidebar-right">
          <div className="skeleton skeleton-sidebar-card"></div>
          <div className="skeleton skeleton-ad-card"></div>
          <div className="skeleton skeleton-ad-card"></div>
        </aside>

      </div>
    </div>
  );
};

const BlogPostDetail = () => {
  const { slug, id, categoryId } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [processedContent, setProcessedContent] = useState('');
  const [viewSent, setViewSent] = useState(false); // برای جلوگیری از ارسال مجدد

  // ===== پردازش محتوای HTML =====
  const processContent = (htmlContent) => {
    if (!htmlContent) return '';

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    // پردازش تصاویر
    const images = tempDiv.querySelectorAll('img');
    images.forEach((img) => {
      const src = img.getAttribute('src');
      const imageId = img.getAttribute('data-image-id') || img.getAttribute('data-id');
      
      if (src && src.includes('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')) {
        if (imageId) {
          img.src = `${API_BASE_URL_IMG_C}/post/${imageId}`;
        } else {
          img.src = `${API_BASE_URL_IMG_C}/post/${imageId}`;
        }
        img.alt = 'تصویر مطلب';
        return;
      }

      if (src && src.startsWith('data:image')) {
        if (src.length > 1000) return;
        return;
      }

      if (src && src.startsWith('/images-')) {
        const fileName = src.split('/').pop();
        img.src = `${API_BASE_URL_IMG_C}/post/${fileName}`;
        img.alt = 'تصویر مطلب';
        return;
      }

      if (src && src.startsWith('/')) {
        const cleanPath = src.substring(1);
        img.src = `${API_BASE_URL_IMG_C}/${cleanPath}`;
        img.alt = 'تصویر مطلب';
        img.style.display = 'block';
        img.style.width = '40%';
        img.style.height = 'auto';
        img.style.maxWidth = '40%';
        img.style.visibility = 'visible';
        img.style.opacity = '1';
        img.setAttribute('loading', 'lazy');
        return;
      }

      if (src && !src.startsWith('http') && !src.startsWith('data:')) {
        img.src = `${API_BASE_URL_IMG_C}/post/${src}`;
        img.alt = 'تصویر مطلب';
        return;
      }

      if (!img.getAttribute('alt')) {
        img.setAttribute('alt', 'تصویر مطلب');
      }
      img.setAttribute('loading', 'lazy');
    });

    // پردازش لینک‌ها
    const links = tempDiv.querySelectorAll('a');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });

    return tempDiv.innerHTML;
  };

  // ===== ارسال بازدید غیرتکراری به API =====
  const sendViewCount = async (postId) => {
    try {
      // جلوگیری از ارسال مجدد در همین رندر
      if (viewSent) {
        console.log('⏳ بازدید قبلاً ارسال شده است');
        return;
      }

      const storageKey = `viewed_post_${postId}`;
      
      // بررسی در localStorage
      const storedData = localStorage.getItem(storageKey);
      
      if (storedData) {
        try {
          const viewData = JSON.parse(storedData);
          const viewDate = new Date(viewData.timestamp);
          const now = new Date();
          const daysDiff = (now - viewDate) / (1000 * 60 * 60 * 24);
          
          // اگر از تاریخ انقضا گذشته، اجازه ارسال مجدد بده
          if (daysDiff > VIEW_EXPIRY_DAYS) {
            localStorage.removeItem(storageKey);
            sessionStorage.removeItem(storageKey);
            console.log('⏰ انقضای بازدید، ارسال مجدد...');
          } else {
            console.log('✅ این پست قبلاً توسط این کاربر مشاهده شده است');
            return;
          }
        } catch (parseError) {
          // اگر داده خراب بود، حذف کن
          localStorage.removeItem(storageKey);
          sessionStorage.removeItem(storageKey);
        }
      }

      // بررسی در sessionStorage (برای این جلسه)
      const sessionViewed = sessionStorage.getItem(storageKey);
      if (sessionViewed) {
        console.log('✅ این پست در این جلسه مشاهده شده است');
        return;
      }

      // ===== ارسال درخواست به API =====
      console.log('📡 ارسال بازدید برای پست:', postId);
      
      const response = await fetch(`${API_BASE_URL}/Post/UpdateViewCount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(postId) // ارسال id به صورت عدد در body
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ بازدید با موفقیت ثبت شد:', result);
        
        // ذخیره در localStorage با تاریخ
        const viewData = {
          timestamp: new Date().toISOString(),
          postId: postId
        };
        localStorage.setItem(storageKey, JSON.stringify(viewData));
        
        // ذخیره در sessionStorage برای این جلسه
        sessionStorage.setItem(storageKey, 'true');
        
        // جلوگیری از ارسال مجدد
        setViewSent(true);
        
        // به‌روزرسانی countView در UI
        setPost(prev => prev ? {
          ...prev,
          countView: (prev.countView || 0) + 1
        } : prev);
        
      } else {
        console.error('❌ خطا در ثبت بازدید:', response.status);
        const errorText = await response.text();
        console.error('❌ جزئیات خطا:', errorText);
      }
    } catch (error) {
      console.error('❌ خطا در ارسال بازدید:', error);
    }
  };

  // ===== پاکسازی بازدیدهای منقضی شده =====
  const cleanExpiredViews = () => {
    try {
      const keys = Object.keys(localStorage);
      let cleanedCount = 0;
      
      keys.forEach(key => {
        if (key.startsWith('viewed_post_')) {
          try {
            const data = JSON.parse(localStorage.getItem(key));
            const viewDate = new Date(data.timestamp);
            const now = new Date();
            const daysDiff = (now - viewDate) / (1000 * 60 * 60 * 24);
            
            if (daysDiff > VIEW_EXPIRY_DAYS) {
              localStorage.removeItem(key);
              sessionStorage.removeItem(key);
              cleanedCount++;
            }
          } catch {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
            cleanedCount++;
          }
        }
      });
      
      if (cleanedCount > 0) {
        console.log(`🧹 ${cleanedCount} بازدید منقضی پاکسازی شد`);
      }
    } catch (error) {
      console.error('❌ خطا در پاکسازی:', error);
    }
  };

  // ===== دریافت مطلب =====
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const postId = id || slug;
        const response = await fetch(`${API_BASE_URL}/Post/GetDetailsDtosAsync?id=${postId}`);
     
        if (!response.ok) {
          throw new Error(`خطا در دریافت مطلب: ${response.status}`);
        }

        const result = await response.json();
        console.log('📥 مطلب دریافت شد:', result);
        console.log('*******************************************************************************************');

        if (result.status === 200 && result.data) {
          console.log('*******************************************************************************************');
          setPost(result.data);
          setLikeCount(Math.floor(Math.random() * 100) + 20);
          
          // ===== ارسال بازدید غیرتکراری =====
          await sendViewCount(postId);
                console.log('*******************************************************************************************');
          if (result.data.content) {
            const processed = processContent(result.data.content);
            setProcessedContent(processed);
          }
          
          if (result.data.categoryPostName) {
            await fetchRelatedPosts(result.data.categoryPostName);
          }
          
          await fetchLatestPosts();
      console.log('*******************************************************************************************');
          if (slug && result.data.slug && slug !== result.data.slug) {
            navigate(`/blog/post/${result.data.slug}/${result.data.id}`, { replace: true });
          }
        } else {
          throw new Error(result.message || 'مطلب یافت نشد');
        }
      } catch (err) {
        console.error('❌ Error fetching post:', err);
        setError(err.message || 'خطا در بارگذاری مطلب');
      } finally {
              console.log('*******************************************************************************************');
        setLoading(false);
                console.log('/////////////////////////////////////////////////////////////////////////////////////////')
      }
    };

    if (id || slug) {
      // پاکسازی بازدیدهای منقضی
      cleanExpiredViews();
      
      fetchPost();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, slug, navigate]);

  // ===== دریافت مطالب مرتبط =====
  const fetchRelatedPosts = async (category) => {
    try {
      const requestBody = {
        categoryId: categoryId,
        searchStream: null,
        pageSize: 5,
        pageNumber: 1
      };
      
      const response = await fetch(`${API_BASE_URL}/Post/getPostCategoryDto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.status === 200 && result.data) {
          const filtered = result.data.items.filter(p => p.id !== parseInt(id || slug));
          setRelatedPosts(filtered.slice(0, 4));
        }
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  // ===== دریافت جدیدترین مطالب از API =====
  const fetchLatestPosts = async () => {
    try {
      console.log('📡 دریافت جدیدترین مطالب از API...');
      
      const response = await fetch(`${API_BASE_URL}/Post/GetTopNewPostsAsync`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`خطا در دریافت جدیدترین مطالب: ${response.status}`);
      }

      const result = await response.json();
      console.log('📥 جدیدترین مطالب دریافت شد:', result);

      if (result.status === 200 && result.data ) {
        const filtered = result.data; //.filter(p => p.id !== parseInt(id || slug));
        const formattedLatestPosts = filtered.slice(0, 10).map((post) => ({
          id: post.id,
          title: post.title || 'بدون عنوان',
          slug: post.slug || post.id,
          imageUrl: post.imageUrl ? `${API_BASE_URL_IMG_C}/uploads/posts/${post.imageUrl}` : null,
          summary: post.summary || '',
          categoryPostName: post.categoryPostName || 'دسته‌بندی نشده',
          countView: post.countView || 0,
          createdAt: post.createdAt,
          createdAtPersianRelative: post.createdAtPersianRelative || formatDate(post.createdAt)
        }));

        setLatestPosts(formattedLatestPosts);
        console.log('✅ جدیدترین مطالب فرمت شدند:', formattedLatestPosts.length, 'مطلب');
      } else {
        console.warn('⚠️ داده‌ای برای جدیدترین مطالب دریافت نشد');
        setLatestPosts(getDefaultLatestPosts());
      }
    } catch (error) {
      console.error('❌ خطا در دریافت جدیدترین مطالب:', error);
      setLatestPosts(getDefaultLatestPosts());
    }
  };

  // ===== دیتای پیش‌فرض برای جدیدترین مطالب =====
  const getDefaultLatestPosts = () => {
    return [
      {
        id: 1,
        title: 'راهنمای جامع خرید ملک در تهران',
        slug: 'guide-to-buying-property-in-tehran',
        createdAtPersianRelative: 'امروز',
        createdAt: '2026-07-16T10:30:00'
      },
      {
        id: 2,
        title: 'نکات طلایی برای سرمایه‌گذاری در املاک',
        slug: 'golden-tips-for-real-estate-investment',
        createdAtPersianRelative: 'دیروز',
        createdAt: '2026-07-15T14:20:00'
      },
      {
        id: 3,
        title: 'مقایسه مناطق مختلف تهران برای خرید خانه',
        slug: 'compare-different-areas-of-tehran',
        createdAtPersianRelative: '۲ روز پیش',
        createdAt: '2026-07-14T09:15:00'
      },
      {
        id: 4,
        title: 'مراحل قانونی خرید و فروش ملک',
        slug: 'legal-steps-for-buying-and-selling-property',
        createdAtPersianRelative: '۳ روز پیش',
        createdAt: '2026-07-13T16:45:00'
      },
      {
        id: 5,
        title: 'بهترین زمان برای خرید خانه در ایران',
        slug: 'best-time-to-buy-house-in-iran',
        createdAtPersianRelative: '۴ روز پیش',
        createdAt: '2026-07-12T11:00:00'
      }
    ];
  };

  // ===== بوکمارک =====
  const handleBookmark = async () => {
    const postId = id || slug;
    try {
      if (!isBookmarked) {
        const response = await fetch(`${API_BASE_URL}/Post/Bookmark/${postId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId: postId })
        });
        if (response.ok) setIsBookmarked(true);
      } else {
        const response = await fetch(`${API_BASE_URL}/Post/Unbookmark/${postId}`, {
          method: 'DELETE'
        });
        if (response.ok) setIsBookmarked(false);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      setIsBookmarked(!isBookmarked);
    }
  };

  // ===== لایک =====
  const handleLike = async () => {
    const postId = id || slug;
    try {
      if (!liked) {
        const response = await fetch(`${API_BASE_URL}/Post/Like/${postId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
          setLikeCount(prev => prev + 1);
          setLiked(true);
        }
      } else {
        const response = await fetch(`${API_BASE_URL}/Post/Unlike/${postId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setLikeCount(prev => prev - 1);
          setLiked(false);
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      if (!liked) {
        setLikeCount(prev => prev + 1);
        setLiked(true);
      } else {
        setLikeCount(prev => prev - 1);
        setLiked(false);
      }
    }
  };

  // ===== اشتراک‌گذاری =====
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareSocial = (platform) => {
    const url = window.location.href;
    const text = post?.title || '';
    let shareUrl = '';

    switch(platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
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

  // ===== متادیتا =====
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | وبلاگ مشاور املاک`;
    }
  }, [post]);

  // ===== نمایش Skeleton در حالت بارگذاری =====
  if (loading) {
    return <BlogDetailSkeleton />;
  }

  // ===== مدیریت خطا =====
  if (error || !post) {
    return (
      <div className="blog-detail-wrapper">
        <div className="blog-detail-error">
          <div className="error-icon">📖</div>
          <h2>مطلب یافت نشد</h2>
          <p>{error || 'متاسفانه مطلب مورد نظر وجود ندارد'}</p>
          <button onClick={() => navigate('/blog')} className="back-to-blog-btn">
            <FaArrowRight /> بازگشت به وبلاگ
          </button>
        </div>
      </div>
    );
  }

  // ===== رندر اصلی با 3 ستون =====
  return (
    <div className="blog-detail-wrapper">
      {/* ===== دکمه بازگشت ===== */}
      <div className="blog-detail-top-bar">
        <button className="back-btn" onClick={() => navigate('/blog')}>
          <FaArrowRight /> بازگشت به وبلاگ
        </button>
        <div className="breadcrumb">
          <Link to="/"><FaHome /> خانه</Link>
          <span>/</span>
          <Link to="/blog">وبلاگ</Link>
          <span>/</span>
          <span className="current">{post.title}</span>
        </div>
      </div>

      {/* ===== 3 ستون ===== */}
      <div className="blog-detail-three-column">

        {/* ===== ستون چپ - تبلیغات ===== */}
        <aside className="blog-detail-sidebar-left">
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
                src="https://via.placeholder.com/300x250/7d0000/ffffff?text=تبلیغ+شما"
                alt="تبلیغات"
                className="ad-image"
              />
            </div>
          </div>
        </aside>

        {/* ===== ستون وسط - محتوای اصلی ===== */}
        <main className="blog-detail-main">
          <article className="blog-post-detail">
            
            {/* تصویر اصلی */}
            {post.imageUrl && (
              <div className="post-detail-image">
                <img 
                  src={`${API_BASE_URL_IMG}/posts/${post.imageUrl}`} 
                  alt={post.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400/7d0000/ffffff?text=تصویر+مطلب';
                  }}
                />
                {post.categoryPostName && (
                  <span className="post-detail-category">
                    <FaTag /> {post.categoryPostName}
                  </span>
                )}
              </div>
            )}

            {/* هدر مطلب */}
            <div className="post-detail-header">
              <h1 className="post-detail-title">{post.title}</h1>
              
              <div className="post-detail-meta">
                <span><FaCalendarAlt /> {post.createdAtPersianRelative || formatDate(post.createdAt)}</span>
                {post.agents && post.agents.length > 0 && (
                  <span><FaUser /> {post.agents[0]?.fullName || 'نویسنده'}</span>
                )}
                <span><FaEye /> {post.countView || 0} بازدید</span>
                <span><FaClock /> {post.readTime || '3 دقیقه'}</span>
              </div>

              {post.summary && (
                <div className="post-detail-summary">
                  <p>{post.summary}</p>
                </div>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="post-detail-tags">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="tag-item">
                      <FaHashtag /> {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* محتوای اصلی */}
            <div 
              className="post-detail-content"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(processedContent || post.content, {
                  ADD_TAGS: ['iframe', 'video', 'source', 'figure', 'figcaption', 'style'],
                  ADD_ATTR: ['src', 'alt', 'title', 'width', 'height', 'loading', 'class', 'style', 'data-image-id', 'target', 'rel']
                })
              }}
            />

            {/* بخش تعامل */}
            <div className="post-detail-actions">
              <div className="actions-left">
                <button 
                  className={`action-btn like ${liked ? 'active' : ''}`}
                  onClick={handleLike}
                >
                  <FaThumbsUp /> {likeCount}
                </button>
                <button 
                  className={`action-btn bookmark ${isBookmarked ? 'active' : ''}`}
                  onClick={handleBookmark}
                >
                  {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                  {isBookmarked ? 'ذخیره شده' : 'ذخیره'}
                </button>
              </div>
              
              <div className="actions-right">
                <div className="social-share-buttons">
                  <button onClick={() => handleShareSocial('whatsapp')} className="social-btn whatsapp">
                    <FaWhatsapp />
                  </button>
                  <button onClick={() => handleShareSocial('telegram')} className="social-btn telegram">
                    <FaTelegram />
                  </button>
                  <button onClick={() => handleShareSocial('twitter')} className="social-btn twitter">
                    <FaTwitter />
                  </button>
                  <button onClick={() => handleShareSocial('email')} className="social-btn email">
                    <FaEnvelope />
                  </button>
                  <button onClick={handleCopyLink} className="social-btn copy">
                    <FaLink />
                  </button>
                </div>
              </div>
            </div>

            {/* نویسنده */}
            {post.agents && post.agents.length > 0 && (
              <div className="post-detail-author">
                <img 
                  src={post.agents[0]?.imageUrl ? `${API_BASE_URL_IMG}/post/${post.agents[0].imageUrl}` : 'https://via.placeholder.com/80/7d0000/ffffff?text=نویسنده'} 
                  alt={post.agents[0]?.fullName || 'نویسنده'} 
                  className="author-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80/7d0000/ffffff?text=نویسنده';
                  }}
                />
                <div className="author-info">
                  <h4>{post.agents[0]?.fullName || 'نویسنده'}</h4>
                  <p>{post.agents[0]?.description || 'نویسنده و کارشناس حوزه املاک و مستغلات'}</p>
                </div>
              </div>
            )}

          </article>

          {/* مطالب مرتبط */}
          {relatedPosts.length > 0 && (
            <div className="related-posts">
              <h2 className="related-title">مطالب مرتبط</h2>
              <div className="related-grid">
                {relatedPosts.map((related) => (
                  <div 
                    key={related.id} 
                    className="related-card"
                    onClick={() => navigate(`/blog/post/${related.slug || related.id}/${related.id}`)}
                  >
                    {related.imageUrl && (
                      <div className="related-image-wrapper">
                        <img 
                          src={`${API_BASE_URL_IMG}/posts/${related.imageUrl}`} 
                          alt={related.title}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x200/7d0000/ffffff?text=تصویر';
                          }}
                        />
                      </div>
                    )}
                    <div className="related-content">
                      <h4>{related.title}</h4>
                      <div className="related-meta">
                        <span><FaCalendarAlt /> {related.createdAtPersianRelative || formatDate(related.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* ===== ستون راست - جدیدترین مطالب ===== */}
        <aside className="blog-detail-sidebar-right">
          <div className="sidebar-card">
            <h4 className="sidebar-title">
              <FaNewspaper /> جدیدترین مطالب
            </h4>
            <ul className="sidebar-posts-list">
              {latestPosts.length === 0 ? (
                <div className="sidebar-loading">
                  <FaSpinner className="loading-spinner" aria-hidden="true" />
                  <span>در حال بارگذاری...</span>
                </div>
              ) : (
                latestPosts.map((item) => (
                  <li key={item.id} className="sidebar-post-item">
                    <Link to={`/blog/post/${item.slug || item.id}/${item.id}`}>
                      <span className="sidebar-post-title">{item.title}</span>
                      <span className="sidebar-post-date">
                        <FaCalendarAlt /> {item.createdAtPersianRelative || formatDate(item.createdAt)}
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="ad-card sidebar-ad">
            <div className="ad-badge">تبلیغات</div>
            <div className="ad-content">
              <FaAd className="ad-icon" />
              <h4>ثبت آگهی رایگان</h4>
              <p>ملک خود را رایگان ثبت کنید</p>
              <button className="ad-btn">ثبت آگهی</button>
            </div>
          </div>

          <div className="ad-card sidebar-ad">
            <div className="ad-badge">تبلیغات</div>
            <div className="ad-content">
              <img 
                src="https://via.placeholder.com/300x250/7d0000/ffffff?text=تبلیغات+ویژه"
                alt="تبلیغات ویژه"
                className="ad-image"
              />
            </div>
          </div>
        </aside>

      </div>

      {/* نوتیفیکیشن کپی */}
      {copied && (
        <div className="copy-notification">
          <FaLink /> لینک کپی شد
        </div>
      )}
    </div>
  );
};

export default BlogPostDetail;