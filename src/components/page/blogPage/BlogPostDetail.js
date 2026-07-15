// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // import { 
// // // // //   FaArrowRight, FaCalendarAlt, FaUser, FaEye, FaClock,
// // // // //   FaShare, FaBookmark, FaRegBookmark, FaTag, FaHashtag,
// // // // //   FaSpinner, FaArrowLeft, FaThumbsUp, FaComment,
// // // // //   FaWhatsapp, FaTelegram, FaTwitter, FaEnvelope, FaLink,
// // // // //   FaChevronRight, FaChevronLeft
// // // // // } from 'react-icons/fa';
// // // // // import DOMPurify from 'dompurify';
// // // // // import './BlogPostDetail.css';

// // // // // const BlogPostDetail = () => {
// // // // //   const { id } = useParams();
// // // // //   const navigate = useNavigate();
// // // // //   const [post, setPost] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [relatedPosts, setRelatedPosts] = useState([]);
// // // // //   const [isBookmarked, setIsBookmarked] = useState(false);
// // // // //   const [copied, setCopied] = useState(false);
// // // // //   const [showShareMenu, setShowShareMenu] = useState(false);
// // // // //   const [liked, setLiked] = useState(false);
// // // // //   const [likeCount, setLikeCount] = useState(0);

// // // // //   // ===== داده‌های فیک =====
// // // // //   const fakePosts = {
// // // // //     1: {
// // // // //       id: 1,
// // // // //       title: "راهنمای جامع خرید آپارتمان در تهران ۱۴۰۴",
// // // // //       summary: "همه چیز درباره خرید آپارتمان در تهران از انتخاب منطقه تا عقد قرارداد",
// // // // //       content: `
// // // // //         <h2>مقدمه</h2>
// // // // //         <p>خرید آپارتمان در تهران یکی از مهم‌ترین تصمیمات زندگی هر فرد است. در این مقاله جامع، تمام نکات کلیدی که باید قبل از خرید آپارتمان بدانید را بررسی می‌کنیم.</p>
        
// // // // //         <h2>انتخاب منطقه مناسب</h2>
// // // // //         <p>انتخاب منطقه مناسب برای خرید آپارتمان تأثیر مستقیم بر ارزش سرمایه‌گذاری و کیفیت زندگی شما دارد. عواملی مانند دسترسی به حمل و نقل عمومی، امکانات شهری، و وضعیت هوای منطقه را در نظر بگیرید.</p>
        
// // // // //         <h3>مناطق شمال تهران</h3>
// // // // //         <p>مناطق شمال تهران مانند تجریش، فرمانیه و الهیه به دلیل آب و هوای مطبوع و امکانات بالا، جزو مناطق گران‌قیمت محسوب می‌شوند.</p>
        
// // // // //         <h3>مناطق مرکزی و جنوبی</h3>
// // // // //         <p>مناطق مرکزی مانند جردن، پاسداران و مناطق جنوبی مانند نازی‌آباد، گزینه‌های مناسبی برای خرید با بودجه متوسط هستند.</p>
        
// // // // //         <h2>بررسی مدارک و اسناد</h2>
// // // // //         <p>قبل از هر اقدامی، حتماً مدارک زیر را بررسی کنید:</p>
// // // // //         <ul>
// // // // //           <li>سند مالکیت (تک برگ یا دفترچه‌ای)</li>
// // // // //           <li>پروانه ساختمانی و پایان کار</li>
// // // // //           <li>مفاصا حساب شهرداری و مالیاتی</li>
// // // // //           <li>استعلام خلافی</li>
// // // // //         </ul>
        
// // // // //         <h2>بازدید از ملک</h2>
// // // // //         <p>در بازدید از ملک، به نکات زیر توجه کنید:</p>
// // // // //         <ul>
// // // // //           <li>کیفیت مصالح و ساخت‌وساز</li>
// // // // //           <li>نورگیری و تهویه مناسب</li>
// // // // //           <li>وضعیت تأسیسات (برق، گاز، آب، سیستم گرمایشی)</li>
// // // // //           <li>همسایگان و محیط اطراف</li>
// // // // //         </ul>
        
// // // // //         <h2>مذاکره و عقد قرارداد</h2>
// // // // //         <p>پس از انتخاب ملک مناسب، نوبت به مذاکره و عقد قرارداد می‌رسد. حتماً از یک مشاور حقوقی یا وکیل کمک بگیرید و تمام بندهای قرارداد را به دقت مطالعه کنید.</p>
        
// // // // //         <h2>نکات پایانی</h2>
// // // // //         <p>خرید آپارتمان یک سرمایه‌گذاری بزرگ است، پس عجله نکنید و با دقت و حوصله پیش بروید. از مشاوران مجرب کمک بگیرید و تمام جوانب را بررسی کنید.</p>
// // // // //       `,
// // // // //       imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
// // // // //       categoryName: "مقالات ملکی",
// // // // //       categoryId: 3,
// // // // //       createdAt: new Date().toISOString(),
// // // // //       viewCount: 1250,
// // // // //       authorName: "مشاور املاک",
// // // // //       authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
// // // // //       readTime: "8 دقیقه",
// // // // //       tags: ["خرید ملک", "آپارتمان", "تهران", "سرمایه‌گذاری"]
// // // // //     },
// // // // //     2: {
// // // // //       id: 2,
// // // // //       title: "نکات کلیدی و طلایی در اجاره آپارتمان",
// // // // //       summary: "قبل از اجاره آپارتمان حتماً این نکات را مطالعه کنید",
// // // // //       content: `
// // // // //         <h2>مقدمه</h2>
// // // // //         <p>اجاره آپارتمان یکی از رایج‌ترین معاملات ملکی است که نیازمند دقت و آگاهی کامل است. در این مقاله به بررسی نکات کلیدی اجاره آپارتمان می‌پردازیم.</p>
        
// // // // //         <h2>تعیین بودجه مناسب</h2>
// // // // //         <p>قبل از جستجوی آپارتمان، بودجه خود را مشخص کنید. معمولاً توصیه می‌شود که اجاره ماهانه بیش از ۳۰٪ درآمد ماهانه شما نباشد.</p>
        
// // // // //         <h2>بررسی قرارداد اجاره</h2>
// // // // //         <p>قرارداد اجاره دارای بندهای مهمی است که باید به آنها توجه کنید:</p>
// // // // //         <ul>
// // // // //           <li>مدت قرارداد و شرایط تمدید</li>
// // // // //           <li>مبلغ رهن و اجاره و نحوه افزایش آن</li>
// // // // //           <li>مسئولیت تعمیرات و نگهداری</li>
// // // // //           <li>شرایط فسخ قرارداد و جریمه‌ها</li>
// // // // //         </ul>
        
// // // // //         <h2>بازدید از آپارتمان</h2>
// // // // //         <p>در زمان بازدید، موارد زیر را بررسی کنید:</p>
// // // // //         <ul>
// // // // //           <li>وضعیت کلی ساختمان و آپارتمان</li>
// // // // //           <li>کیفیت لوازم و تأسیسات</li>
// // // // //           <li>نویز و سر و صدای محیط</li>
// // // // //           <li>دسترسی به امکانات شهری</li>
// // // // //         </ul>
        
// // // // //         <h2>نکات حقوقی</h2>
// // // // //         <p>حتماً مدارک زیر را از موجر مطالبه کنید:</p>
// // // // //         <ul>
// // // // //           <li>سند مالکیت</li>
// // // // //           <li>پروانه ساختمانی</li>
// // // // //           <li>کارت ملی و شناسنامه</li>
// // // // //           <li>مدارک شناسایی شاهدین</li>
// // // // //         </ul>
// // // // //       `,
// // // // //       imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
// // // // //       categoryName: "نکات معاملات ملکی",
// // // // //       categoryId: 2,
// // // // //       createdAt: new Date(Date.now() - 86400000).toISOString(),
// // // // //       viewCount: 850,
// // // // //       authorName: "کارشناس املاک",
// // // // //       authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
// // // // //       readTime: "6 دقیقه",
// // // // //       tags: ["اجاره", "قرارداد", "رهن", "مستاجر"]
// // // // //     },
// // // // //     3: {
// // // // //       id: 3,
// // // // //       title: "بازسازی و نوسازی آپارتمان با کمترین هزینه",
// // // // //       summary: "بهترین روش‌های بازسازی آپارتمان با کمترین هزینه",
// // // // //       content: `
// // // // //         <h2>مقدمه</h2>
// // // // //         <p>بازسازی و نوسازی آپارتمان می‌تواند ارزش ملک شما را به میزان قابل توجهی افزایش دهد. در این مقاله به روش‌های کم‌هزینه بازسازی می‌پردازیم.</p>
        
// // // // //         <h2>برنامه‌ریزی دقیق</h2>
// // // // //         <p>قبل از شروع بازسازی، یک برنامه دقیق تهیه کنید. موارد زیر را مشخص کنید:</p>
// // // // //         <ul>
// // // // //           <li>بودجه کل بازسازی</li>
// // // // //           <li>اولویت‌های بازسازی</li>
// // // // //           <li>نوع متریال مورد نیاز</li>
// // // // //           <li>زمان‌بندی اجرا</li>
// // // // //         </ul>
        
// // // // //         <h2>بازسازی آشپزخانه</h2>
// // // // //         <p>آشپزخانه یکی از مهم‌ترین بخش‌های هر آپارتمان است. برای بازسازی کم‌هزینه:</p>
// // // // //         <ul>
// // // // //           <li>تعویض کابینت‌ها با ام دی اف</li>
// // // // //           <li>تعویض شیرآلات و سینک</li>
// // // // //           <li>نصب کاشی و سرامیک جدید</li>
// // // // //           <li>به‌روزرسانی روشنایی</li>
// // // // //         </ul>
        
// // // // //         <h2>بازسازی سرویس بهداشتی</h2>
// // // // //         <p>برای بازسازی سرویس بهداشتی با هزینه مناسب:</p>
// // // // //         <ul>
// // // // //           <li>تعویض کاشی‌ها با طرح‌های جدید</li>
// // // // //           <li>نصب روشویی و شیرآلات جدید</li>
// // // // //           <li>تعویض سیفون و لوله‌ها</li>
// // // // //         </ul>
        
// // // // //         <h2>نکات نهایی</h2>
// // // // //         <p>با برنامه‌ریزی دقیق و انتخاب متریال مناسب، می‌توانید با هزینه معقول، آپارتمان خود را به‌روز کنید.</p>
// // // // //       `,
// // // // //       imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
// // // // //       categoryName: "دکوراسیون و بازسازی",
// // // // //       categoryId: 4,
// // // // //       createdAt: new Date(Date.now() - 172800000).toISOString(),
// // // // //       viewCount: 2100,
// // // // //       authorName: "متخصص بازسازی",
// // // // //       authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
// // // // //       readTime: "5 دقیقه",
// // // // //       tags: ["بازسازی", "نوسازی", "آپارتمان", "دکوراسیون"]
// // // // //     }
// // // // //   };

// // // // //   // ===== مطالب مرتبط فیک =====
// // // // //   const fakeRelatedPosts = {
// // // // //     1: [
// // // // //       {
// // // // //         id: 2,
// // // // //         title: "نکات کلیدی در اجاره آپارتمان",
// // // // //         summary: "قبل از اجاره آپارتمان حتماً این نکات را مطالعه کنید",
// // // // //         imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
// // // // //         categoryName: "نکات معاملات ملکی",
// // // // //         createdAt: new Date(Date.now() - 86400000).toISOString(),
// // // // //         viewCount: 850
// // // // //       },
// // // // //       {
// // // // //         id: 3,
// // // // //         title: "بازسازی و نوسازی آپارتمان",
// // // // //         summary: "بهترین روش‌های بازسازی آپارتمان با کمترین هزینه",
// // // // //         imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400",
// // // // //         categoryName: "دکوراسیون و بازسازی",
// // // // //         createdAt: new Date(Date.now() - 172800000).toISOString(),
// // // // //         viewCount: 2100
// // // // //       }
// // // // //     ],
// // // // //     2: [
// // // // //       {
// // // // //         id: 1,
// // // // //         title: "راهنمای خرید آپارتمان در تهران",
// // // // //         summary: "همه چیز درباره خرید آپارتمان در تهران",
// // // // //         imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
// // // // //         categoryName: "مقالات ملکی",
// // // // //         createdAt: new Date().toISOString(),
// // // // //         viewCount: 1250
// // // // //       },
// // // // //       {
// // // // //         id: 5,
// // // // //         title: "قوانین جدید خرید و فروش ملک",
// // // // //         summary: "تغییرات قوانین خرید و فروش ملک در سال ۱۴۰۴",
// // // // //         imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
// // // // //         categoryName: "نکات معاملات ملکی",
// // // // //         createdAt: new Date(Date.now() - 345600000).toISOString(),
// // // // //         viewCount: 1800
// // // // //       }
// // // // //     ],
// // // // //     3: [
// // // // //       {
// // // // //         id: 6,
// // // // //         title: "دکوراسیون مدرن آپارتمان",
// // // // //         summary: "ایده‌های جذاب برای دکوراسیون مدرن آپارتمان",
// // // // //         imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400",
// // // // //         categoryName: "دکوراسیون و بازسازی",
// // // // //         createdAt: new Date(Date.now() - 432000000).toISOString(),
// // // // //         viewCount: 950
// // // // //       }
// // // // //     ]
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     // شبیه‌سازی دریافت داده از سرور
// // // // //     const fetchPost = () => {
// // // // //       setLoading(true);
// // // // //       setTimeout(() => {
// // // // //         const foundPost = fakePosts[id];
// // // // //         if (foundPost) {
// // // // //           setPost(foundPost);
// // // // //           setLikeCount(Math.floor(Math.random() * 100) + 20);
// // // // //           // دریافت مطالب مرتبط
// // // // //           setRelatedPosts(fakeRelatedPosts[id] || []);
// // // // //         } else {
// // // // //           setError('مطلب یافت نشد');
// // // // //         }
// // // // //         setLoading(false);
// // // // //       }, 800);
// // // // //     };

// // // // //     fetchPost();
// // // // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // // // //   }, [id]);

// // // // //   const handleBookmark = () => {
// // // // //     setIsBookmarked(!isBookmarked);
// // // // //   };

// // // // //   const handleLike = () => {
// // // // //     if (liked) {
// // // // //       setLikeCount(prev => prev - 1);
// // // // //     } else {
// // // // //       setLikeCount(prev => prev + 1);
// // // // //     }
// // // // //     setLiked(!liked);
// // // // //   };

// // // // //   const handleShare = async () => {
// // // // //     const shareUrl = window.location.href;
// // // // //     if (navigator.share) {
// // // // //       try {
// // // // //         await navigator.share({
// // // // //           title: post?.title || 'مطلب وبلاگ',
// // // // //           text: post?.summary || '',
// // // // //           url: shareUrl
// // // // //         });
// // // // //       } catch (error) {
// // // // //         if (error.name !== 'AbortError') {
// // // // //           handleCopyLink();
// // // // //         }
// // // // //       }
// // // // //     } else {
// // // // //       handleCopyLink();
// // // // //     }
// // // // //   };

// // // // //   const handleCopyLink = () => {
// // // // //     navigator.clipboard.writeText(window.location.href);
// // // // //     setCopied(true);
// // // // //     setTimeout(() => setCopied(false), 2000);
// // // // //   };

// // // // //   const handleShareSocial = (platform) => {
// // // // //     const url = window.location.href;
// // // // //     const text = post?.title || '';
// // // // //     let shareUrl = '';

// // // // //     switch(platform) {
// // // // //       case 'whatsapp':
// // // // //         shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
// // // // //         break;
// // // // //       case 'telegram':
// // // // //         shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
// // // // //         break;
// // // // //       case 'twitter':
// // // // //         shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
// // // // //         break;
// // // // //       case 'email':
// // // // //         shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
// // // // //         break;
// // // // //       default:
// // // // //         return;
// // // // //     }

// // // // //     window.open(shareUrl, '_blank', 'width=600,height=400');
// // // // //   };

// // // // //   const formatDate = (dateString) => {
// // // // //     if (!dateString) return '';
// // // // //     const date = new Date(dateString);
// // // // //     return new Intl.DateTimeFormat('fa-IR', {
// // // // //       year: 'numeric',
// // // // //       month: 'long',
// // // // //       day: 'numeric'
// // // // //     }).format(date);
// // // // //   };

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="blog-detail-wrapper">
// // // // //         <div className="blog-detail-loading">
// // // // //           <FaSpinner className="loading-spinner" />
// // // // //           <span>در حال بارگذاری مطلب...</span>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (error || !post) {
// // // // //     return (
// // // // //       <div className="blog-detail-wrapper">
// // // // //         <div className="blog-detail-error">
// // // // //           <div className="error-icon">📖</div>
// // // // //           <h2>مطلب یافت نشد</h2>
// // // // //           <p>{error || 'متاسفانه مطلب مورد نظر وجود ندارد'}</p>
// // // // //           <button onClick={() => navigate('/blog')} className="back-to-blog-btn">
// // // // //             <FaArrowRight /> بازگشت به وبلاگ
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="blog-detail-wrapper">
// // // // //       {/* دکمه بازگشت */}
// // // // //       <button className="back-btn" onClick={() => navigate('/blog')}>
// // // // //         <FaArrowRight /> بازگشت به وبلاگ
// // // // //       </button>

// // // // //       {/* مطلب اصلی */}
// // // // //       <article className="blog-post-detail">
// // // // //         {/* تصویر اصلی */}
// // // // //         {post.imageUrl && (
// // // // //           <div className="post-detail-image">
// // // // //             <img src={post.imageUrl} alt={post.title} />
// // // // //             {post.categoryName && (
// // // // //               <span className="post-detail-category">
// // // // //                 <FaTag /> {post.categoryName}
// // // // //               </span>
// // // // //             )}
// // // // //           </div>
// // // // //         )}

// // // // //         {/* هدر مطلب */}
// // // // //         <div className="post-detail-header">
// // // // //           <h1 className="post-detail-title">{post.title}</h1>
          
// // // // //           <div className="post-detail-meta">
// // // // //             <span><FaCalendarAlt /> {formatDate(post.createdAt)}</span>
// // // // //             {post.authorName && (
// // // // //               <span><FaUser /> {post.authorName}</span>
// // // // //             )}
// // // // //             <span><FaEye /> {post.viewCount || 0} بازدید</span>
// // // // //             <span><FaClock /> {post.readTime || '3 دقیقه'}</span>
// // // // //           </div>

// // // // //           {post.summary && (
// // // // //             <div className="post-detail-summary">
// // // // //               <p>{post.summary}</p>
// // // // //             </div>
// // // // //           )}

// // // // //           {/* تگ‌ها */}
// // // // //           {post.tags && post.tags.length > 0 && (
// // // // //             <div className="post-detail-tags">
// // // // //               {post.tags.map((tag, index) => (
// // // // //                 <span key={index} className="tag-item">
// // // // //                   <FaHashtag /> {tag}
// // // // //                 </span>
// // // // //               ))}
// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* محتوای اصلی */}
// // // // //         <div 
// // // // //           className="post-detail-content"
// // // // //           dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
// // // // //         />

// // // // //         {/* بخش تعامل */}
// // // // //         <div className="post-detail-actions">
// // // // //           <div className="actions-left">
// // // // //             <button 
// // // // //               className={`action-btn like ${liked ? 'active' : ''}`}
// // // // //               onClick={handleLike}
// // // // //             >
// // // // //               <FaThumbsUp /> {likeCount}
// // // // //             </button>
// // // // //             <button 
// // // // //               className={`action-btn bookmark ${isBookmarked ? 'active' : ''}`}
// // // // //               onClick={handleBookmark}
// // // // //             >
// // // // //               {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
// // // // //               {isBookmarked ? 'ذخیره شده' : 'ذخیره'}
// // // // //             </button>
// // // // //           </div>
          
// // // // //           <div className="actions-right">
// // // // //             <button className="action-btn share" onClick={handleShare}>
// // // // //               <FaShare /> اشتراک‌گذاری
// // // // //             </button>
            
// // // // //             <div className="social-share-buttons">
// // // // //               <button onClick={() => handleShareSocial('whatsapp')} className="social-btn whatsapp">
// // // // //                 <FaWhatsapp />
// // // // //               </button>
// // // // //               <button onClick={() => handleShareSocial('telegram')} className="social-btn telegram">
// // // // //                 <FaTelegram />
// // // // //               </button>
// // // // //               <button onClick={() => handleShareSocial('twitter')} className="social-btn twitter">
// // // // //                 <FaTwitter />
// // // // //               </button>
// // // // //               <button onClick={() => handleShareSocial('email')} className="social-btn email">
// // // // //                 <FaEnvelope />
// // // // //               </button>
// // // // //               <button onClick={handleCopyLink} className="social-btn copy">
// // // // //                 <FaLink />
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* نویسنده */}
// // // // //         {post.authorName && (
// // // // //           <div className="post-detail-author">
// // // // //             <img 
// // // // //               src={post.authorImage || 'https://via.placeholder.com/80/7d0000/ffffff?text=مشاور'} 
// // // // //               alt={post.authorName} 
// // // // //               className="author-image"
// // // // //             />
// // // // //             <div className="author-info">
// // // // //               <h4>{post.authorName}</h4>
// // // // //               <p>نویسنده و کارشناس حوزه املاک و مستغلات</p>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </article>

// // // // //       {/* مطالب مرتبط */}
// // // // //       {relatedPosts.length > 0 && (
// // // // //         <div className="related-posts">
// // // // //           <h3 className="related-title">مطالب مرتبط</h3>
// // // // //           <div className="related-grid">
// // // // //             {relatedPosts.map((related) => (
// // // // //               <div 
// // // // //                 key={related.id} 
// // // // //                 className="related-card"
// // // // //                 onClick={() => navigate(`/blog/post/${related.id}`)}
// // // // //               >
// // // // //                 {related.imageUrl && (
// // // // //                   <div className="related-image-wrapper">
// // // // //                     <img src={related.imageUrl} alt={related.title} />
// // // // //                   </div>
// // // // //                 )}
// // // // //                 <div className="related-content">
// // // // //                   <h4>{related.title}</h4>
// // // // //                   <p>{related.summary}</p>
// // // // //                   <div className="related-meta">
// // // // //                     <span><FaCalendarAlt /> {formatDate(related.createdAt)}</span>
// // // // //                     <span><FaEye /> {related.viewCount || 0}</span>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* نوتیفیکیشن کپی */}
// // // // //       {copied && (
// // // // //         <div className="copy-notification">
// // // // //           <FaLink /> لینک کپی شد
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default BlogPostDetail;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // import { 
// // // //   FaArrowRight, FaCalendarAlt, FaUser, FaEye, FaClock,
// // // //   FaShare, FaBookmark, FaRegBookmark, FaTag, FaHashtag,
// // // //   FaSpinner, FaArrowLeft, FaThumbsUp, FaComment,
// // // //   FaWhatsapp, FaTelegram, FaTwitter, FaEnvelope, FaLink,
// // // //   FaChevronRight, FaChevronLeft
// // // // } from 'react-icons/fa';
// // // // import DOMPurify from 'dompurify';
// // // // import './BlogPostDetail.css';

// // // // // آدرس پایه API
// // // // const API_BASE_URL = 'https://localhost:7178/api';

// // // // const BlogPostDetail = () => {
// // // //   const { id } = useParams();
// // // //   const navigate = useNavigate();
// // // //   const [post, setPost] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [relatedPosts, setRelatedPosts] = useState([]);
// // // //   const [isBookmarked, setIsBookmarked] = useState(false);
// // // //   const [copied, setCopied] = useState(false);
// // // //   const [showShareMenu, setShowShareMenu] = useState(false);
// // // //   const [liked, setLiked] = useState(false);
// // // //   const [likeCount, setLikeCount] = useState(0);

// // // //   // ===== دریافت مطلب از API =====
// // // //   useEffect(() => {
// // // //     const fetchPost = async () => {
// // // //       try {
// // // //         setLoading(true);
// // // //         setError(null);

// // // //         const response = await fetch(`${API_BASE_URL}/Post/GetDetailsDtosAsync?id=${id}`, {
// // // //           method: 'GET',
// // // //           headers: {
// // // //             'Content-Type': 'application/json',
// // // //             // اگر نیاز به توکن دارید:
// // // //             // 'Authorization': `Bearer ${localStorage.getItem('token')}`
// // // //           }
// // // //         });

// // // //         if (!response.ok) {
// // // //           throw new Error(`خطا در دریافت مطلب: ${response.status}`);
// // // //         }

// // // //         const result = await response.json();

// // // //         if (result.status === 200 && result.data) {
// // // //           setPost(result.data);
// // // //           setLikeCount(Math.floor(Math.random() * 100) + 20); // یا از API اگر دارد
          
// // // //           // دریافت مطالب مرتبط (اگر API جداگانه دارید)
// // // //           await fetchRelatedPosts(result.data.categoryPostName || result.data.categoryId);
// // // //         } else {
// // // //           throw new Error(result.message || 'مطلب یافت نشد');
// // // //         }
// // // //       } catch (err) {
// // // //         console.error('Error fetching post:', err);
// // // //         setError(err.message || 'خطا در بارگذاری مطلب');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     if (id) {
// // // //       fetchPost();
// // // //       window.scrollTo({ top: 0, behavior: 'smooth' });
// // // //     }
// // // //   }, [id]);

// // // //   // ===== دریافت مطالب مرتبط =====
// // // //   const fetchRelatedPosts = async (category) => {
// // // //     try {
// // // //       // این یک API فرضی برای مطالب مرتبط است
// // // //       // می‌توانید از API واقعی خود استفاده کنید
// // // //       const response = await fetch(`${API_BASE_URL}/Post/GetByCategory?category=${encodeURIComponent(category)}&count=3`);
      
// // // //       if (response.ok) {
// // // //         const result = await response.json();
// // // //         if (result.status === 200 && result.data) {
// // // //           setRelatedPosts(result.data);
// // // //         }
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching related posts:', error);
// // // //       // در صورت خطا، لیست خالی می‌ماند
// // // //     }
// // // //   };

// // // //   // ===== عملیات بوکمارک =====
// // // //   const handleBookmark = async () => {
// // // //     try {
// // // //       if (!isBookmarked) {
// // // //         // افزودن به بوکمارک
// // // //         const response = await fetch(`${API_BASE_URL}/Post/Bookmark/${id}`, {
// // // //           method: 'POST',
// // // //           headers: {
// // // //             'Content-Type': 'application/json',
// // // //           },
// // // //           body: JSON.stringify({ postId: id })
// // // //         });
// // // //         if (response.ok) {
// // // //           setIsBookmarked(true);
// // // //         }
// // // //       } else {
// // // //         // حذف از بوکمارک
// // // //         const response = await fetch(`${API_BASE_URL}/Post/Unbookmark/${id}`, {
// // // //           method: 'DELETE'
// // // //         });
// // // //         if (response.ok) {
// // // //           setIsBookmarked(false);
// // // //         }
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error toggling bookmark:', error);
// // // //       // Fallback: تغییر وضعیت به صورت محلی
// // // //       setIsBookmarked(!isBookmarked);
// // // //     }
// // // //   };

// // // //   // ===== لایک =====
// // // //   const handleLike = async () => {
// // // //     try {
// // // //       if (!liked) {
// // // //         const response = await fetch(`${API_BASE_URL}/Post/Like/${id}`, {
// // // //           method: 'POST',
// // // //           headers: {
// // // //             'Content-Type': 'application/json',
// // // //           }
// // // //         });
// // // //         if (response.ok) {
// // // //           setLikeCount(prev => prev + 1);
// // // //           setLiked(true);
// // // //         }
// // // //       } else {
// // // //         const response = await fetch(`${API_BASE_URL}/Post/Unlike/${id}`, {
// // // //           method: 'DELETE'
// // // //         });
// // // //         if (response.ok) {
// // // //           setLikeCount(prev => prev - 1);
// // // //           setLiked(false);
// // // //         }
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error toggling like:', error);
// // // //       // Fallback: تغییر وضعیت به صورت محلی
// // // //       if (!liked) {
// // // //         setLikeCount(prev => prev + 1);
// // // //         setLiked(true);
// // // //       } else {
// // // //         setLikeCount(prev => prev - 1);
// // // //         setLiked(false);
// // // //       }
// // // //     }
// // // //   };

// // // //   // ===== اشتراک‌گذاری =====
// // // //   const handleShare = async () => {
// // // //     const shareUrl = window.location.href;
// // // //     if (navigator.share) {
// // // //       try {
// // // //         await navigator.share({
// // // //           title: post?.title || 'مطلب وبلاگ',
// // // //           text: post?.summary || '',
// // // //           url: shareUrl
// // // //         });
// // // //       } catch (error) {
// // // //         if (error.name !== 'AbortError') {
// // // //           handleCopyLink();
// // // //         }
// // // //       }
// // // //     } else {
// // // //       handleCopyLink();
// // // //     }
// // // //   };

// // // //   const handleCopyLink = () => {
// // // //     navigator.clipboard.writeText(window.location.href);
// // // //     setCopied(true);
// // // //     setTimeout(() => setCopied(false), 2000);
// // // //   };

// // // //   const handleShareSocial = (platform) => {
// // // //     const url = window.location.href;
// // // //     const text = post?.title || '';
// // // //     let shareUrl = '';

// // // //     switch(platform) {
// // // //       case 'whatsapp':
// // // //         shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
// // // //         break;
// // // //       case 'telegram':
// // // //         shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
// // // //         break;
// // // //       case 'twitter':
// // // //         shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
// // // //         break;
// // // //       case 'email':
// // // //         shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
// // // //         break;
// // // //       default:
// // // //         return;
// // // //     }

// // // //     window.open(shareUrl, '_blank', 'width=600,height=400');
// // // //   };

// // // //   // ===== فرمت تاریخ =====
// // // //   const formatDate = (dateString) => {
// // // //     if (!dateString) return '';
// // // //     try {
// // // //       const date = new Date(dateString);
// // // //       return new Intl.DateTimeFormat('fa-IR', {
// // // //         year: 'numeric',
// // // //         month: 'long',
// // // //         day: 'numeric'
// // // //       }).format(date);
// // // //     } catch {
// // // //       return dateString; // اگر تاریخ معتبر نبود، همان رشته را برگردان
// // // //     }
// // // //   };

// // // //   // ===== مدیریت بارگذاری =====
// // // //   if (loading) {
// // // //     return (
// // // //       <div className="blog-detail-wrapper">
// // // //         <div className="blog-detail-loading">
// // // //           <FaSpinner className="loading-spinner" />
// // // //           <span>در حال بارگذاری مطلب...</span>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // ===== مدیریت خطا =====
// // // //   if (error || !post) {
// // // //     return (
// // // //       <div className="blog-detail-wrapper">
// // // //         <div className="blog-detail-error">
// // // //           <div className="error-icon">📖</div>
// // // //           <h2>مطلب یافت نشد</h2>
// // // //           <p>{error || 'متاسفانه مطلب مورد نظر وجود ندارد'}</p>
// // // //           <button onClick={() => navigate('/blog')} className="back-to-blog-btn">
// // // //             <FaArrowRight /> بازگشت به وبلاگ
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // ===== رندر اصلی =====
// // // //   return (
// // // //     <div className="blog-detail-wrapper">
// // // //       {/* دکمه بازگشت */}
// // // //       <button className="back-btn" onClick={() => navigate('/blog')}>
// // // //         <FaArrowRight /> بازگشت به وبلاگ
// // // //       </button>

// // // //       {/* مطلب اصلی */}
// // // //       <article className="blog-post-detail">
// // // //         {/* تصویر اصلی */}
// // // //         {post.imageUrl && (
// // // //           <div className="post-detail-image">
// // // //             <img 
// // // //               src={`${API_BASE_URL}/images/${post.imageUrl}`} 
// // // //               alt={post.title}
// // // //               onError={(e) => {
// // // //                 e.target.src = 'https://via.placeholder.com/800x400/7d0000/ffffff?text=تصویر+مطلب';
// // // //               }}
// // // //             />
// // // //             {post.categoryPostName && (
// // // //               <span className="post-detail-category">
// // // //                 <FaTag /> {post.categoryPostName}
// // // //               </span>
// // // //             )}
// // // //           </div>
// // // //         )}

// // // //         {/* هدر مطلب */}
// // // //         <div className="post-detail-header">
// // // //           <h1 className="post-detail-title">{post.title}</h1>
          
// // // //           <div className="post-detail-meta">
// // // //             <span><FaCalendarAlt /> {post.createdAtPersian || formatDate(post.createdAt)}</span>
// // // //             {post.agents && post.agents.length > 0 && (
// // // //               <span><FaUser /> {post.agents[0]?.fullName || 'نویسنده'}</span>
// // // //             )}
// // // //             <span><FaEye /> {post.countView || 0} بازدید</span>
// // // //             <span><FaClock /> {post.readTime || '3 دقیقه'}</span>
// // // //           </div>

// // // //           {post.summary && (
// // // //             <div className="post-detail-summary">
// // // //               <p>{post.summary}</p>
// // // //             </div>
// // // //           )}

// // // //           {/* تگ‌ها */}
// // // //           {post.tags && post.tags.length > 0 && (
// // // //             <div className="post-detail-tags">
// // // //               {post.tags.map((tag, index) => (
// // // //                 <span key={index} className="tag-item">
// // // //                   <FaHashtag /> {tag}
// // // //                 </span>
// // // //               ))}
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {/* محتوای اصلی */}
// // // //         <div 
// // // //           className="post-detail-content"
// // // //           dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
// // // //         />

// // // //         {/* بخش تعامل */}
// // // //         <div className="post-detail-actions">
// // // //           <div className="actions-left">
// // // //             <button 
// // // //               className={`action-btn like ${liked ? 'active' : ''}`}
// // // //               onClick={handleLike}
// // // //             >
// // // //               <FaThumbsUp /> {likeCount}
// // // //             </button>
// // // //             <button 
// // // //               className={`action-btn bookmark ${isBookmarked ? 'active' : ''}`}
// // // //               onClick={handleBookmark}
// // // //             >
// // // //               {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
// // // //               {isBookmarked ? 'ذخیره شده' : 'ذخیره'}
// // // //             </button>
// // // //           </div>
          
// // // //           <div className="actions-right">
// // // //             <button className="action-btn share" onClick={handleShare}>
// // // //               <FaShare /> اشتراک‌گذاری
// // // //             </button>
            
// // // //             <div className="social-share-buttons">
// // // //               <button onClick={() => handleShareSocial('whatsapp')} className="social-btn whatsapp">
// // // //                 <FaWhatsapp />
// // // //               </button>
// // // //               <button onClick={() => handleShareSocial('telegram')} className="social-btn telegram">
// // // //                 <FaTelegram />
// // // //               </button>
// // // //               <button onClick={() => handleShareSocial('twitter')} className="social-btn twitter">
// // // //                 <FaTwitter />
// // // //               </button>
// // // //               <button onClick={() => handleShareSocial('email')} className="social-btn email">
// // // //                 <FaEnvelope />
// // // //               </button>
// // // //               <button onClick={handleCopyLink} className="social-btn copy">
// // // //                 <FaLink />
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* نویسنده */}
// // // //         {post.agents && post.agents.length > 0 && (
// // // //           <div className="post-detail-author">
// // // //             <img 
// // // //               src={post.agents[0]?.imageUrl ? `${API_BASE_URL}/images/${post.agents[0].imageUrl}` : 'https://via.placeholder.com/80/7d0000/ffffff?text=نویسنده'} 
// // // //               alt={post.agents[0]?.fullName || 'نویسنده'} 
// // // //               className="author-image"
// // // //             />
// // // //             <div className="author-info">
// // // //               <h4>{post.agents[0]?.fullName || 'نویسنده'}</h4>
// // // //               <p>{post.agents[0]?.description || 'نویسنده و کارشناس حوزه املاک و مستغلات'}</p>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </article>

// // // //       {/* مطالب مرتبط */}
// // // //       {relatedPosts.length > 0 && (
// // // //         <div className="related-posts">
// // // //           <h3 className="related-title">مطالب مرتبط</h3>
// // // //           <div className="related-grid">
// // // //             {relatedPosts.map((related) => (
// // // //               <div 
// // // //                 key={related.id} 
// // // //                 className="related-card"
// // // //                 onClick={() => navigate(`/blog/post/${related.id}`)}
// // // //               >
// // // //                 {related.imageUrl && (
// // // //                   <div className="related-image-wrapper">
// // // //                     <img 
// // // //                       src={`${API_BASE_URL}/images/${related.imageUrl}`} 
// // // //                       alt={related.title}
// // // //                       onError={(e) => {
// // // //                         e.target.src = 'https://via.placeholder.com/400x200/7d0000/ffffff?text=تصویر';
// // // //                       }}
// // // //                     />
// // // //                   </div>
// // // //                 )}
// // // //                 <div className="related-content">
// // // //                   <h4>{related.title}</h4>
// // // //                   <p>{related.summary}</p>
// // // //                   <div className="related-meta">
// // // //                     <span><FaCalendarAlt /> {related.createdAtPersian || formatDate(related.createdAt)}</span>
// // // //                     <span><FaEye /> {related.countView || 0}</span>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* نوتیفیکیشن کپی */}
// // // //       {copied && (
// // // //         <div className="copy-notification">
// // // //           <FaLink /> لینک کپی شد
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default BlogPostDetail;

// // // import React, { useState, useEffect } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import { 
// // //   FaArrowRight, FaCalendarAlt, FaUser, FaEye, FaClock,
// // //   FaShare, FaBookmark, FaRegBookmark, FaTag, FaHashtag,
// // //   FaSpinner, FaThumbsUp, FaWhatsapp, FaTelegram, FaTwitter, 
// // //   FaEnvelope, FaLink
// // // } from 'react-icons/fa';
// // // import DOMPurify from 'dompurify';
// // // import './BlogPostDetail.css';

// // // // آدرس پایه API
// // // const API_BASE_URL = 'https://localhost:7178/api';
// // // const API_BASE_URL_IMG = 'https://localhost:7178';
// // // const BlogPostDetail = () => {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const [post, setPost] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [relatedPosts, setRelatedPosts] = useState([]);
// // //   const [isBookmarked, setIsBookmarked] = useState(false);
// // //   const [copied, setCopied] = useState(false);
// // //   const [liked, setLiked] = useState(false);
// // //   const [likeCount, setLikeCount] = useState(0);
// // //   const [processedContent, setProcessedContent] = useState('');

// // //   // ===== پردازش محتوای HTML =====
// // //   const processContent = (htmlContent) => {
// // //     if (!htmlContent) return '';

// // //     // ایجاد یک المان موقت برای پردازش
// // //     const tempDiv = document.createElement('div');
// // //     tempDiv.innerHTML = htmlContent;

// // //     // پردازش تمام تصاویر
// // //     const images = tempDiv.querySelectorAll('img');
// // //     images.forEach((img) => {
// // //       const src = img.getAttribute('src');
      
// // //         console.log('miyaddddddddddd1000000000')
// // //         console.log(src)
// // //       // اگر تصویر base64 و خالی است (1x1 pixel)
// // //       if (src && src.includes('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')) {
// // //         // جایگزین با تصویر پیش‌فرض یا حذف
// // //     const imageId = img.getAttribute('data-image-id') || img.getAttribute('data-id');
// // //          const imageUrl = img.getAttribute('data-src') || 
// // //                        img.getAttribute('data-image') || 
// // //                        img.getAttribute('data-url');
// // //       console.log(imageId)
// // //       console.log(imageUrl)
// // //       if (imageId) {
// // //         // اگر شناسه تصویر موجود است
// // //         img.src = `${API_BASE_URL_IMG}/post/${imageId}`;
// // //         img.alt = 'تصویر مطلب';
// // //       } else {
// // //         // اگر شناسه موجود نیست، از تصویر پیش‌فرض استفاده کن
// // //         img.src = 'https://via.placeholder.com/800x400/7d0000/ffffff?text=تصویر+مطلب';
// // //         img.alt = 'تصویر مطلب';
// // //       }

// // //         img.remove();
// // //         return;
// // //       }

// // //       // اگر تصویر base64 واقعی است
// // //       if (src && src.startsWith('data:image')) {
// // //         // اگر تصویر base64 بزرگ است، نگه دار
// // //         if (src.length > 1000) {
// // //           // نگه دار
// // //         } else {
// // //           // تصویر کوچک base64 معمولاً آیکون است، نگه دار
// // //         }
// // //         return;
// // //       }
// // //         console.log('miyaddddddddddd1111111111111')
// // //       // اگر آدرس تصویر نسبی است
// // //       if (src && !src.startsWith('http') && !src.startsWith('data:')) {
// // //         console.log('miyaddddddddddd')
// // //         // اگر آدرس با / شروع می‌شود
// // //         if (src.startsWith('/')) {
// // //           img.src = `${API_BASE_URL_IMG}/images-20260714-131033-3.webp`;
// // //         } else {
// // //           // آدرس کامل تصویر از سرور
// // //           img.src = `${API_BASE_URL_IMG}/post/images-20260714-131033-3.webp`;
// // //         }
// // //       }

// // //       // اضافه کردن alt اگر ندارد
// // //       if (!img.getAttribute('alt')) {
// // //         img.setAttribute('alt', 'تصویر مطلب');
// // //       }

// // //       // اضافه کردن loading lazy
// // //       img.setAttribute('loading', 'lazy');
// // //     });

// // //     // پردازش لینک‌ها
// // //     const links = tempDiv.querySelectorAll('a');
// // //     links.forEach((link) => {
// // //       const href = link.getAttribute('href');
// // //       if (href && !href.startsWith('http') && !href.startsWith('#')) {
// // //         // لینک‌های داخلی را با react-router هماهنگ کن
// // //         link.setAttribute('href', href);
// // //         link.setAttribute('target', '_blank');
// // //         link.setAttribute('rel', 'noopener noreferrer');
// // //       }
// // //     });

// // //     // اضافه کردن کلاس‌های CSS به تگ‌های خاص
// // //     const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
// // //     headings.forEach((heading) => {
// // //       heading.classList.add('post-heading');
// // //     });

// // //     const paragraphs = tempDiv.querySelectorAll('p');
// // //     paragraphs.forEach((p) => {
// // //       p.classList.add('post-paragraph');
// // //     });

// // //     const lists = tempDiv.querySelectorAll('ul, ol');
// // //     lists.forEach((list) => {
// // //       list.classList.add('post-list');
// // //     });

// // //     const listItems = tempDiv.querySelectorAll('li');
// // //     listItems.forEach((li) => {
// // //       li.classList.add('post-list-item');
// // //     });

// // //     return tempDiv.innerHTML;
// // //   };

// // //   // ===== دریافت مطلب از API =====
// // //   useEffect(() => {
// // //     const fetchPost = async () => {
// // //       try {
// // //         setLoading(true);
// // //         setError(null);

// // //         const response = await fetch(`${API_BASE_URL}/Post/GetDetailsDtosAsync?id=${id}`, {
// // //           method: 'GET',
// // //           headers: {
// // //             'Content-Type': 'application/json',
// // //           }
// // //         });

// // //         if (!response.ok) {
// // //           throw new Error(`خطا در دریافت مطلب: ${response.status}`);
// // //         }

// // //         const result = await response.json();

// // //         if (result.status === 200 && result.data) {
// // //           setPost(result.data);
// // //           setLikeCount(Math.floor(Math.random() * 100) + 20);
          
// // //           // پردازش محتوای HTML
// // //           if (result.data.content) {
// // //             const processed = processContent(result.data.content);
// // //             setProcessedContent(processed);
// // //           }
          
// // //           // دریافت مطالب مرتبط
// // //           await fetchRelatedPosts(result.data.categoryPostName);
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

// // //     if (id) {
// // //       fetchPost();
// // //       window.scrollTo({ top: 0, behavior: 'smooth' });
// // //     }
// // //   }, [id]);

// // //   // ===== دریافت مطالب مرتبط =====
// // //   const fetchRelatedPosts = async (category) => {
// // //     try {
// // //       const response = await fetch(`${API_BASE_URL}/Post/getPostCategoryDto?category=${encodeURIComponent(category)}&count=3`);
      
// // //       if (response.ok) {
// // //         const result = await response.json();
// // //         if (result.status === 200 && result.data) {
// // //           setRelatedPosts(result.data.slice(0, 3));
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching related posts:', error);
// // //     }
// // //   };

// // //   // ===== عملیات بوکمارک =====
// // //   const handleBookmark = async () => {
// // //     try {
// // //       if (!isBookmarked) {
// // //         const response = await fetch(`${API_BASE_URL}/Post/Bookmark/${id}`, {
// // //           method: 'POST',
// // //           headers: {
// // //             'Content-Type': 'application/json',
// // //           },
// // //           body: JSON.stringify({ postId: id })
// // //         });
// // //         if (response.ok) {
// // //           setIsBookmarked(true);
// // //         }
// // //       } else {
// // //         const response = await fetch(`${API_BASE_URL}/Post/Unbookmark/${id}`, {
// // //           method: 'DELETE'
// // //         });
// // //         if (response.ok) {
// // //           setIsBookmarked(false);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error toggling bookmark:', error);
// // //       setIsBookmarked(!isBookmarked);
// // //     }
// // //   };

// // //   // ===== لایک =====
// // //   const handleLike = async () => {
// // //     try {
// // //       if (!liked) {
// // //         const response = await fetch(`${API_BASE_URL}/Post/Like/${id}`, {
// // //           method: 'POST',
// // //           headers: {
// // //             'Content-Type': 'application/json',
// // //           }
// // //         });
// // //         if (response.ok) {
// // //           setLikeCount(prev => prev + 1);
// // //           setLiked(true);
// // //         }
// // //       } else {
// // //         const response = await fetch(`${API_BASE_URL}/Post/Unlike/${id}`, {
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
// // //   const handleShare = async () => {
// // //     const shareUrl = window.location.href;
// // //     if (navigator.share) {
// // //       try {
// // //         await navigator.share({
// // //           title: post?.title || 'مطلب وبلاگ',
// // //           text: post?.summary || '',
// // //           url: shareUrl
// // //         });
// // //       } catch (error) {
// // //         if (error.name !== 'AbortError') {
// // //           handleCopyLink();
// // //         }
// // //       }
// // //     } else {
// // //       handleCopyLink();
// // //     }
// // //   };

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

// // //   // ===== رندر اصلی =====
// // //   return (
// // //     <div className="blog-detail-wrapper">
// // //       {/* دکمه بازگشت */}
// // //       <button className="back-btn" onClick={() => navigate('/blog')}>
// // //         <FaArrowRight /> بازگشت به وبلاگ
// // //       </button>

// // //       {/* مطلب اصلی */}
// // //       <article className="blog-post-detail">
// // //         {/* تصویر اصلی */}
// // //         {post.imageUrl && (
// // //           <div className="post-detail-image">
// // //             <img 
// // //               src={`${API_BASE_URL_IMG}/post/${post.imageUrl}`} 
// // //               alt={post.title}
// // //               onError={(e) => {
// // //                 e.target.src = 'https://via.placeholder.com/800x400/7d0000/ffffff?text=تصویر+مطلب';
// // //               }}
// // //             />
// // //             {post.categoryPostName && (
// // //               <span className="post-detail-category">
// // //                 <FaTag /> {post.categoryPostName}
// // //               </span>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* هدر مطلب */}
// // //         <div className="post-detail-header">
// // //           <h1 className="post-detail-title">{post.title}</h1>
          
// // //           <div className="post-detail-meta">
// // //             <span><FaCalendarAlt /> {post.createdAtPersianRelative || formatDate(post.createdAt)}</span>
// // //             {post.agents && post.agents.length > 0 && (
// // //               <span><FaUser /> {post.agents[0]?.fullName || 'نویسنده'}</span>
// // //             )}
// // //             <span><FaEye /> {post.countView || 0} بازدید</span>
// // //             <span><FaClock /> {post.readTime || '3 دقیقه'}</span>
// // //           </div>

// // //           {post.summary && (
// // //             <div className="post-detail-summary">
// // //               <p>{post.summary}</p>
// // //             </div>
// // //           )}

// // //           {/* تگ‌ها */}
// // //           {post.tags && post.tags.length > 0 && (
// // //             <div className="post-detail-tags">
// // //               {post.tags.map((tag, index) => (
// // //                 <span key={index} className="tag-item">
// // //                   <FaHashtag /> {tag}
// // //                 </span>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* محتوای اصلی - با پردازش انجام شده */}
// // //         <div 
// // //           className="post-detail-content"
// // //           dangerouslySetInnerHTML={{ 
// // //             __html: DOMPurify.sanitize(processedContent || post.content, {
// // //               ADD_TAGS: ['iframe', 'video', 'source'],
// // //               ADD_ATTR: ['target', 'rel', 'loading', 'data-*']
// // //             })
// // //           }}
// // //         />

// // //         {/* بخش تعامل */}
// // //         <div className="post-detail-actions">
// // //           <div className="actions-left">
// // //             <button 
// // //               className={`action-btn like ${liked ? 'active' : ''}`}
// // //               onClick={handleLike}
// // //             >
// // //               <FaThumbsUp /> {likeCount}
// // //             </button>
// // //             <button 
// // //               className={`action-btn bookmark ${isBookmarked ? 'active' : ''}`}
// // //               onClick={handleBookmark}
// // //             >
// // //               {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
// // //               {isBookmarked ? 'ذخیره شده' : 'ذخیره'}
// // //             </button>
// // //           </div>
          
// // //           <div className="actions-right">
// // //             <button className="action-btn share" onClick={handleShare}>
// // //               <FaShare /> اشتراک‌گذاری
// // //             </button>
            
// // //             <div className="social-share-buttons">
// // //               <button onClick={() => handleShareSocial('whatsapp')} className="social-btn whatsapp">
// // //                 <FaWhatsapp />
// // //               </button>
// // //               <button onClick={() => handleShareSocial('telegram')} className="social-btn telegram">
// // //                 <FaTelegram />
// // //               </button>
// // //               <button onClick={() => handleShareSocial('twitter')} className="social-btn twitter">
// // //                 <FaTwitter />
// // //               </button>
// // //               <button onClick={() => handleShareSocial('email')} className="social-btn email">
// // //                 <FaEnvelope />
// // //               </button>
// // //               <button onClick={handleCopyLink} className="social-btn copy">
// // //                 <FaLink />
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* نویسنده */}
// // //         {post.agents && post.agents.length > 0 && (
// // //           <div className="post-detail-author">
// // //             <img 
// // //               src={post.agents[0]?.imageUrl ? `${API_BASE_URL_IMG}/post/${post.agents[0].imageUrl}` : 'https://via.placeholder.com/80/7d0000/ffffff?text=نویسنده'} 
// // //               alt={post.agents[0]?.fullName || 'نویسنده'} 
// // //               className="author-image"
// // //             />
// // //             <div className="author-info">
// // //               <h4>{post.agents[0]?.fullName || 'نویسنده'}</h4>
// // //               <p>{post.agents[0]?.description || 'نویسنده و کارشناس حوزه املاک و مستغلات'}</p>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </article>

// // //       {/* مطالب مرتبط */}
// // //       {relatedPosts.length > 0 && (
// // //         <div className="related-posts">
// // //           <h3 className="related-title">مطالب مرتبط</h3>
// // //           <div className="related-grid">
// // //             {relatedPosts.map((related) => (
// // //               <div 
// // //                 key={related.id} 
// // //                 className="related-card"
// // //                 onClick={() => navigate(`/blog/post/${related.slug || related.id}`)}
// // //               >
// // //                 {related.imageUrl && (
// // //                   <div className="related-image-wrapper">
// // //                     <img 
// // //                       src={`${API_BASE_URL_IMG}/post/${related.imageUrl}`} 
// // //                       alt={related.title}
// // //                       onError={(e) => {
// // //                         e.target.src = 'https://via.placeholder.com/400x200/7d0000/ffffff?text=تصویر';
// // //                       }}
// // //                     />
// // //                   </div>
// // //                 )}
// // //                 <div className="related-content">
// // //                   <h4>{related.title}</h4>
// // //                   <p>{related.summary}</p>
// // //                   <div className="related-meta">
// // //                     <span><FaCalendarAlt /> {related.createdAtPersianRelative || formatDate(related.createdAt)}</span>
// // //                     <span><FaEye /> {related.countView || 0}</span>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}

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
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { 
// //   FaArrowRight, FaCalendarAlt, FaUser, FaEye, FaClock,
// //   FaShare, FaBookmark, FaRegBookmark, FaTag, FaHashtag,
// //   FaSpinner, FaThumbsUp, FaWhatsapp, FaTelegram, FaTwitter, 
// //   FaEnvelope, FaLink
// // } from 'react-icons/fa';
// // import DOMPurify from 'dompurify';
// // import './BlogPostDetail.css';

// // // آدرس پایه API
// // const API_BASE_URL = 'https://localhost:7178/api';
// // const API_BASE_URL_IMG = 'https://localhost:7178';

// // const BlogPostDetail = () => {
// //   // دریافت هر دو پارامتر از URL
// //   const { slug, id } = useParams();
// //   const navigate = useNavigate();
  
// //   const [post, setPost] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [relatedPosts, setRelatedPosts] = useState([]);
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

// //     // پردازش تمام تصاویر
// //     const images = tempDiv.querySelectorAll('img');
// //     images.forEach((img) => {
// //       const src = img.getAttribute('src');
// //       const imageId = img.getAttribute('data-image-id') || img.getAttribute('data-id');
      
// //       if (src && src.includes('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')) {
// //         if (imageId) {
// //           img.src = `${API_BASE_URL_IMG}/post/${imageId}`;
// //         } else {
// //           img.src = 'https://via.placeholder.com/800x400/7d0000/ffffff?text=تصویر+مطلب';
// //         }
// //         img.alt = 'تصویر مطلب';
// //         img.removeAttribute('data-image-id');
// //         img.removeAttribute('data-id');
// //         img.removeAttribute('data-src');
// //         img.removeAttribute('data-image');
// //         img.removeAttribute('data-url');
// //         return;
// //       }

// //       if (src && src.startsWith('data:image')) {
// //         if (src.length > 1000) {
// //           // نگه دار
// //         }
// //         return;
// //       }

// //       if (src && src.startsWith('/images-')) {
// //         const fileName = src.split('/').pop();
// //         img.src = `${API_BASE_URL_IMG}/post/${fileName}`;
// //         img.alt = 'تصویر مطلب';
// //         return;
// //       }

// //       if (src && src.startsWith('/')) {
// //         const cleanPath = src.substring(1);
// //         img.src = `${API_BASE_URL_IMG}/${cleanPath}`;
// //         img.alt = 'تصویر مطلب';
// //         return;
// //       }

// //       if (src && !src.startsWith('http') && !src.startsWith('data:')) {
// //         img.src = `${API_BASE_URL_IMG}/post/${src}`;
// //         img.alt = 'تصویر مطلب';
// //         return;
// //       }

// //       if (src && src.startsWith('http') && src.includes('localhost') && !src.includes('/post/')) {
// //         const fileName = src.split('/').pop();
// //         img.src = `${API_BASE_URL_IMG}/post/${fileName}`;
// //         img.alt = 'تصویر مطلب';
// //         return;
// //       }

// //       if (!img.getAttribute('alt')) {
// //         img.setAttribute('alt', 'تصویر مطلب');
// //       }
// //       img.setAttribute('loading', 'lazy');
// //       if (!img.getAttribute('width')) {
// //         img.setAttribute('width', '100%');
// //       }
// //       if (!img.getAttribute('height')) {
// //         img.setAttribute('height', 'auto');
// //       }
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

// //     // اضافه کردن کلاس‌های CSS
// //     const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
// //     headings.forEach((heading) => {
// //       heading.classList.add('post-heading');
// //     });

// //     const paragraphs = tempDiv.querySelectorAll('p');
// //     paragraphs.forEach((p) => {
// //       p.classList.add('post-paragraph');
// //     });

// //     const lists = tempDiv.querySelectorAll('ul, ol');
// //     lists.forEach((list) => {
// //       list.classList.add('post-list');
// //     });

// //     const listItems = tempDiv.querySelectorAll('li');
// //     listItems.forEach((li) => {
// //       li.classList.add('post-list-item');
// //     });

// //     return tempDiv.innerHTML;
// //   };

// //   // ===== دریافت مطلب از API با استفاده از ID =====
// //   useEffect(() => {
// //     const fetchPost = async () => {
// //       try {
// //         setLoading(true);
// //         setError(null);

// //         // استفاده از ID برای دریافت مطلب
// //         const postId = id || slug; // اگر id وجود نداشت از slug استفاده کن
        
// //         const response = await fetch(`${API_BASE_URL}/Post/GetDetailsDtosAsync?id=${postId}`, {
// //           method: 'GET',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           }
// //         });

// //         if (!response.ok) {
// //           throw new Error(`خطا در دریافت مطلب: ${response.status}`);
// //         }

// //         const result = await response.json();

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

// //           // اگر slug در URL با slug واقعی مطابقت ندارد، redirect کن
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
// //       const response = await fetch(`${API_BASE_URL}/Post/getPostCategoryDto?category=${encodeURIComponent(category)}&page=1&pageSize=3`);
      
// //       if (response.ok) {
// //         const result = await response.json();
// //         if (result.status === 200 && result.data) {
// //           const filtered = result.data.filter(p => p.id !== parseInt(id || slug));
// //           setRelatedPosts(filtered.slice(0, 3));
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error fetching related posts:', error);
// //     }
// //   };

// //   // ===== عملیات بوکمارک =====
// //   const handleBookmark = async () => {
// //     const postId = id || slug;
// //     try {
// //       if (!isBookmarked) {
// //         const response = await fetch(`${API_BASE_URL}/Post/Bookmark/${postId}`, {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify({ postId: postId })
// //         });
// //         if (response.ok) {
// //           setIsBookmarked(true);
// //         }
// //       } else {
// //         const response = await fetch(`${API_BASE_URL}/Post/Unbookmark/${postId}`, {
// //           method: 'DELETE'
// //         });
// //         if (response.ok) {
// //           setIsBookmarked(false);
// //         }
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
// //           headers: {
// //             'Content-Type': 'application/json',
// //           }
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
// //   const handleShare = async () => {
// //     const shareUrl = window.location.href;
// //     if (navigator.share) {
// //       try {
// //         await navigator.share({
// //           title: post?.title || 'مطلب وبلاگ',
// //           text: post?.summary || '',
// //           url: shareUrl
// //         });
// //       } catch (error) {
// //         if (error.name !== 'AbortError') {
// //           handleCopyLink();
// //         }
// //       }
// //     } else {
// //       handleCopyLink();
// //     }
// //   };

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

// //   // ===== متادیتا برای سئو =====
// //   useEffect(() => {
// //     if (post) {
// //       // به‌روزرسانی عنوان صفحه
// //       document.title = `${post.title} | وبلاگ مشاور املاک`;
      
// //       // به‌روزرسانی متا تگ‌ها
// //       const metaDescription = document.querySelector('meta[name="description"]');
// //       if (metaDescription) {
// //         metaDescription.content = post.summary || post.title;
// //       }
      
// //       // به‌روزرسانی Open Graph
// //       const ogTitle = document.querySelector('meta[property="og:title"]');
// //       if (ogTitle) {
// //         ogTitle.content = post.title;
// //       }
      
// //       const ogDescription = document.querySelector('meta[property="og:description"]');
// //       if (ogDescription) {
// //         ogDescription.content = post.summary || post.title;
// //       }
      
// //       const ogUrl = document.querySelector('meta[property="og:url"]');
// //       if (ogUrl) {
// //         ogUrl.content = window.location.href;
// //       }
      
// //       // به‌روزرسانی Twitter Card
// //       const twitterTitle = document.querySelector('meta[name="twitter:title"]');
// //       if (twitterTitle) {
// //         twitterTitle.content = post.title;
// //       }
      
// //       const twitterDescription = document.querySelector('meta[name="twitter:description"]');
// //       if (twitterDescription) {
// //         twitterDescription.content = post.summary || post.title;
// //       }
// //     }
// //   }, [post]);

// //   // ===== مدیریت بارگذاری =====
// //   if (loading) {
// //     return (
// //       <div className="blog-detail-wrapper">
// //         <div className="blog-detail-loading">
// //           <FaSpinner className="loading-spinner" />
// //           <span>در حال بارگذاری مطلب...</span>
// //         </div>
// //       </div>
// //     );
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

// //   // ===== رندر اصلی =====
// //   return (
// //     <div className="blog-detail-wrapper">
// //       {/* دکمه بازگشت */}
// //       <button className="back-btn" onClick={() => navigate('/blog')}>
// //         <FaArrowRight /> بازگشت به وبلاگ
// //       </button>

// //       {/* مطلب اصلی */}
// //       <article className="blog-post-detail">
// //         {/* تصویر اصلی */}
// //         {post.imageUrl && (
// //           <div className="post-detail-image">
// //             <img 
// //               src={`${API_BASE_URL_IMG}/post/${post.imageUrl}`} 
// //               alt={post.title}
// //               onError={(e) => {
// //                 e.target.src = 'https://via.placeholder.com/800x400/7d0000/ffffff?text=تصویر+مطلب';
// //               }}
// //             />
// //             {post.categoryPostName && (
// //               <span className="post-detail-category">
// //                 <FaTag /> {post.categoryPostName}
// //               </span>
// //             )}
// //           </div>
// //         )}

// //         {/* هدر مطلب */}
// //         <div className="post-detail-header">
// //           <h1 className="post-detail-title">{post.title}</h1>
          
// //           <div className="post-detail-meta">
// //             <span><FaCalendarAlt /> {post.createdAtPersianRelative || formatDate(post.createdAt)}</span>
// //             {post.agents && post.agents.length > 0 && (
// //               <span><FaUser /> {post.agents[0]?.fullName || 'نویسنده'}</span>
// //             )}
// //             <span><FaEye /> {post.countView || 0} بازدید</span>
// //             <span><FaClock /> {post.readTime || '3 دقیقه'}</span>
// //           </div>

// //           {post.summary && (
// //             <div className="post-detail-summary">
// //               <p>{post.summary}</p>
// //             </div>
// //           )}

// //           {/* تگ‌ها */}
// //           {post.tags && post.tags.length > 0 && (
// //             <div className="post-detail-tags">
// //               {post.tags.map((tag, index) => (
// //                 <span key={index} className="tag-item">
// //                   <FaHashtag /> {tag}
// //                 </span>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* محتوای اصلی */}
// //         <div 
// //           className="post-detail-content"
// //           dangerouslySetInnerHTML={{ 
// //             __html: DOMPurify.sanitize(processedContent || post.content, {
// //               ADD_TAGS: ['iframe', 'video', 'source'],
// //               ADD_ATTR: ['target', 'rel', 'loading', 'data-*', 'width', 'height']
// //             })
// //           }}
// //         />

// //         {/* بخش تعامل */}
// //         <div className="post-detail-actions">
// //           <div className="actions-left">
// //             <button 
// //               className={`action-btn like ${liked ? 'active' : ''}`}
// //               onClick={handleLike}
// //             >
// //               <FaThumbsUp /> {likeCount}
// //             </button>
// //             <button 
// //               className={`action-btn bookmark ${isBookmarked ? 'active' : ''}`}
// //               onClick={handleBookmark}
// //             >
// //               {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
// //               {isBookmarked ? 'ذخیره شده' : 'ذخیره'}
// //             </button>
// //           </div>
          
// //           <div className="actions-right">
// //             <button className="action-btn share" onClick={handleShare}>
// //               <FaShare /> اشتراک‌گذاری
// //             </button>
            
// //             <div className="social-share-buttons">
// //               <button onClick={() => handleShareSocial('whatsapp')} className="social-btn whatsapp">
// //                 <FaWhatsapp />
// //               </button>
// //               <button onClick={() => handleShareSocial('telegram')} className="social-btn telegram">
// //                 <FaTelegram />
// //               </button>
// //               <button onClick={() => handleShareSocial('twitter')} className="social-btn twitter">
// //                 <FaTwitter />
// //               </button>
// //               <button onClick={() => handleShareSocial('email')} className="social-btn email">
// //                 <FaEnvelope />
// //               </button>
// //               <button onClick={handleCopyLink} className="social-btn copy">
// //                 <FaLink />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* نویسنده */}
// //         {post.agents && post.agents.length > 0 && (
// //           <div className="post-detail-author">
// //             <img 
// //               src={post.agents[0]?.imageUrl ? `${API_BASE_URL_IMG}/post/${post.agents[0].imageUrl}` : 'https://via.placeholder.com/80/7d0000/ffffff?text=نویسنده'} 
// //               alt={post.agents[0]?.fullName || 'نویسنده'} 
// //               className="author-image"
// //               onError={(e) => {
// //                 e.target.src = 'https://via.placeholder.com/80/7d0000/ffffff?text=نویسنده';
// //               }}
// //             />
// //             <div className="author-info">
// //               <h4>{post.agents[0]?.fullName || 'نویسنده'}</h4>
// //               <p>{post.agents[0]?.description || 'نویسنده و کارشناس حوزه املاک و مستغلات'}</p>
// //             </div>
// //           </div>
// //         )}
// //       </article>

// //       {/* مطالب مرتبط */}
// //       {relatedPosts.length > 0 && (
// //         <div className="related-posts">
// //           <h3 className="related-title">مطالب مرتبط</h3>
// //           <div className="related-grid">
// //             {relatedPosts.map((related) => (
// //               <div 
// //                 key={related.id} 
// //                 className="related-card"
// //                 onClick={() => navigate(`/blog/post/${related.slug || related.id}/${related.id}`)}
// //               >
// //                 {related.imageUrl && (
// //                   <div className="related-image-wrapper">
// //                     <img 
// //                       src={`${API_BASE_URL_IMG}/post/${related.imageUrl}`} 
// //                       alt={related.title}
// //                       onError={(e) => {
// //                         e.target.src = 'https://via.placeholder.com/400x200/7d0000/ffffff?text=تصویر';
// //                       }}
// //                     />
// //                   </div>
// //                 )}
// //                 <div className="related-content">
// //                   <h4>{related.title}</h4>
// //                   <p>{related.summary || related.title}</p>
// //                   <div className="related-meta">
// //                     <span><FaCalendarAlt /> {related.createdAtPersianRelative || formatDate(related.createdAt)}</span>
// //                     <span><FaEye /> {related.countView || 0}</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}

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
// const API_BASE_URL_IMG = 'https://localhost:7178';

// const BlogPostDetail = () => {
//   const { slug, id } = useParams();
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
      
//       if (src && src.includes('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')) {
//         if (imageId) {
//           img.src = `${API_BASE_URL_IMG}/post/${imageId}`;
//         } else {
//           img.src = 'https://via.placeholder.com/800x400/7d0000/ffffff?text=تصویر+مطلب';
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
//         img.src = `${API_BASE_URL_IMG}/post/${fileName}`;
//         img.alt = 'تصویر مطلب';
//         return;
//       }

//       if (src && src.startsWith('/')) {
//         const cleanPath = src.substring(1);
//         img.src = `${API_BASE_URL_IMG}/${cleanPath}`;
//         img.alt = 'تصویر مطلب';
//         return;
//       }

//       if (src && !src.startsWith('http') && !src.startsWith('data:')) {
//         img.src = `${API_BASE_URL_IMG}/post/${src}`;
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
//       const response = await fetch(`${API_BASE_URL}/Post/getPostCategoryDto?category=${encodeURIComponent(category)}&page=1&pageSize=4`);
      
//       if (response.ok) {
//         const result = await response.json();
//         if (result.status === 200 && result.data) {
//           const filtered = result.data.filter(p => p.id !== parseInt(id || slug));
//           setRelatedPosts(filtered.slice(0, 4));
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching related posts:', error);
//     }
//   };

//   // ===== دریافت آخرین مطالب =====
//   const fetchLatestPosts = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/Post/getPostCategoryDto?page=1&pageSize=5`);
      
//       if (response.ok) {
//         const result = await response.json();
//         if (result.status === 200 && result.data) {
//           const filtered = result.data.filter(p => p.id !== parseInt(id || slug));
//           setLatestPosts(filtered.slice(0, 5));
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching latest posts:', error);
//     }
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

//   // ===== مدیریت بارگذاری =====
//   if (loading) {
//     return (
//       <div className="blog-detail-wrapper">
//         <div className="blog-detail-loading">
//           <FaSpinner className="loading-spinner" />
//           <span>در حال بارگذاری مطلب...</span>
//         </div>
//       </div>
//     );
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
//                   src={`${API_BASE_URL_IMG}/post/${post.imageUrl}`} 
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
//                   ADD_TAGS: ['iframe', 'video', 'source'],
//                   ADD_ATTR: ['target', 'rel', 'loading', 'data-*', 'width', 'height']
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
//               <h3 className="related-title">مطالب مرتبط</h3>
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
//                           src={`${API_BASE_URL_IMG}/post/${related.imageUrl}`} 
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

//         {/* ===== ستون راست - آخرین مطالب ===== */}
//         <aside className="blog-detail-sidebar-right">
//           <div className="sidebar-card">
//             <h4 className="sidebar-title">
//               <FaNewspaper /> آخرین مطالب
//             </h4>
//             <ul className="sidebar-posts-list">
//               {latestPosts.map((item) => (
//                 <li key={item.id} className="sidebar-post-item">
//                   <Link to={`/blog/post/${item.slug || item.id}/${item.id}`}>
//                     <span className="sidebar-post-title">{item.title}</span>
//                     <span className="sidebar-post-date">
//                       <FaCalendarAlt /> {item.createdAtPersianRelative || formatDate(item.createdAt)}
//                     </span>
//                   </Link>
//                 </li>
//               ))}
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
  const { slug, id } = useParams();
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
          img.src = `${API_BASE_URL_IMG}/post/${imageId}`;
        } else {
          img.src = 'https://via.placeholder.com/800x400/7d0000/ffffff?text=تصویر+مطلب';
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
        img.src = `${API_BASE_URL_IMG}/post/${fileName}`;
        img.alt = 'تصویر مطلب';
        return;
      }

      if (src && src.startsWith('/')) {
        const cleanPath = src.substring(1);
        img.src = `${API_BASE_URL_IMG}/${cleanPath}`;
        img.alt = 'تصویر مطلب';
        return;
      }

      if (src && !src.startsWith('http') && !src.startsWith('data:')) {
        img.src = `${API_BASE_URL_IMG}/post/${src}`;
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
   console.log(result)
        if (result.status === 200 && result.data) {
          setPost(result.data);
          setLikeCount(Math.floor(Math.random() * 100) + 20);
          
          if (result.data.content) {
            const processed = processContent(result.data.content);
            setProcessedContent(processed);
          }
          
          if (result.data.categoryPostName) {
            await fetchRelatedPosts(result.data.categoryPostName);
          }
          
          await fetchLatestPosts();

          if (slug && result.data.slug && slug !== result.data.slug) {
            navigate(`/blog/post/${result.data.slug}/${result.data.id}`, { replace: true });
          }
        } else {
          throw new Error(result.message || 'مطلب یافت نشد');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err.message || 'خطا در بارگذاری مطلب');
      } finally {
        setLoading(false);
      }
    };

    if (id || slug) {
      fetchPost();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, slug, navigate]);

  // ===== دریافت مطالب مرتبط =====
  const fetchRelatedPosts = async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Post/getPostCategoryDto?category=${encodeURIComponent(category)}&page=1&pageSize=4`);
      
      if (response.ok) {
        const result = await response.json();
        if (result.status === 200 && result.data) {
          const filtered = result.data.filter(p => p.id !== parseInt(id || slug));
          setRelatedPosts(filtered.slice(0, 4));
        }
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  // ===== دریافت آخرین مطالب =====
  const fetchLatestPosts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Post/getPostCategoryDto?page=1&pageSize=5`);
      
      if (response.ok) {
        const result = await response.json();
        if (result.status === 200 && result.data) {
          const filtered = result.data.filter(p => p.id !== parseInt(id || slug));
          setLatestPosts(filtered.slice(0, 5));
        }
      }
    } catch (error) {
      console.error('Error fetching latest posts:', error);
    }
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
                  ADD_TAGS: ['iframe', 'video', 'source'],
                  ADD_ATTR: ['target', 'rel', 'loading', 'data-*', 'width', 'height']
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
              <h3 className="related-title">مطالب مرتبط</h3>
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

        {/* ===== ستون راست - آخرین مطالب ===== */}
        <aside className="blog-detail-sidebar-right">
          <div className="sidebar-card">
            <h4 className="sidebar-title">
              <FaNewspaper /> آخرین مطالب
            </h4>
            <ul className="sidebar-posts-list">
              {latestPosts.map((item) => (
                <li key={item.id} className="sidebar-post-item">
                  <Link to={`/blog/post/${item.slug || item.id}/${item.id}`}>
                    <span className="sidebar-post-title">{item.title}</span>
                    <span className="sidebar-post-date">
                      <FaCalendarAlt /> {item.createdAtPersianRelative || formatDate(item.createdAt)}
                    </span>
                  </Link>
                </li>
              ))}
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