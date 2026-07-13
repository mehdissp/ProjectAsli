import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaArrowRight, FaCalendarAlt, FaUser, FaEye, FaClock,
  FaShare, FaBookmark, FaRegBookmark, FaTag, FaHashtag,
  FaSpinner, FaArrowLeft, FaThumbsUp, FaComment,
  FaWhatsapp, FaTelegram, FaTwitter, FaEnvelope, FaLink,
  FaChevronRight, FaChevronLeft
} from 'react-icons/fa';
import DOMPurify from 'dompurify';
import './BlogPostDetail.css';

const BlogPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // ===== داده‌های فیک =====
  const fakePosts = {
    1: {
      id: 1,
      title: "راهنمای جامع خرید آپارتمان در تهران ۱۴۰۴",
      summary: "همه چیز درباره خرید آپارتمان در تهران از انتخاب منطقه تا عقد قرارداد",
      content: `
        <h2>مقدمه</h2>
        <p>خرید آپارتمان در تهران یکی از مهم‌ترین تصمیمات زندگی هر فرد است. در این مقاله جامع، تمام نکات کلیدی که باید قبل از خرید آپارتمان بدانید را بررسی می‌کنیم.</p>
        
        <h2>انتخاب منطقه مناسب</h2>
        <p>انتخاب منطقه مناسب برای خرید آپارتمان تأثیر مستقیم بر ارزش سرمایه‌گذاری و کیفیت زندگی شما دارد. عواملی مانند دسترسی به حمل و نقل عمومی، امکانات شهری، و وضعیت هوای منطقه را در نظر بگیرید.</p>
        
        <h3>مناطق شمال تهران</h3>
        <p>مناطق شمال تهران مانند تجریش، فرمانیه و الهیه به دلیل آب و هوای مطبوع و امکانات بالا، جزو مناطق گران‌قیمت محسوب می‌شوند.</p>
        
        <h3>مناطق مرکزی و جنوبی</h3>
        <p>مناطق مرکزی مانند جردن، پاسداران و مناطق جنوبی مانند نازی‌آباد، گزینه‌های مناسبی برای خرید با بودجه متوسط هستند.</p>
        
        <h2>بررسی مدارک و اسناد</h2>
        <p>قبل از هر اقدامی، حتماً مدارک زیر را بررسی کنید:</p>
        <ul>
          <li>سند مالکیت (تک برگ یا دفترچه‌ای)</li>
          <li>پروانه ساختمانی و پایان کار</li>
          <li>مفاصا حساب شهرداری و مالیاتی</li>
          <li>استعلام خلافی</li>
        </ul>
        
        <h2>بازدید از ملک</h2>
        <p>در بازدید از ملک، به نکات زیر توجه کنید:</p>
        <ul>
          <li>کیفیت مصالح و ساخت‌وساز</li>
          <li>نورگیری و تهویه مناسب</li>
          <li>وضعیت تأسیسات (برق، گاز، آب، سیستم گرمایشی)</li>
          <li>همسایگان و محیط اطراف</li>
        </ul>
        
        <h2>مذاکره و عقد قرارداد</h2>
        <p>پس از انتخاب ملک مناسب، نوبت به مذاکره و عقد قرارداد می‌رسد. حتماً از یک مشاور حقوقی یا وکیل کمک بگیرید و تمام بندهای قرارداد را به دقت مطالعه کنید.</p>
        
        <h2>نکات پایانی</h2>
        <p>خرید آپارتمان یک سرمایه‌گذاری بزرگ است، پس عجله نکنید و با دقت و حوصله پیش بروید. از مشاوران مجرب کمک بگیرید و تمام جوانب را بررسی کنید.</p>
      `,
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      categoryName: "مقالات ملکی",
      categoryId: 3,
      createdAt: new Date().toISOString(),
      viewCount: 1250,
      authorName: "مشاور املاک",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      readTime: "8 دقیقه",
      tags: ["خرید ملک", "آپارتمان", "تهران", "سرمایه‌گذاری"]
    },
    2: {
      id: 2,
      title: "نکات کلیدی و طلایی در اجاره آپارتمان",
      summary: "قبل از اجاره آپارتمان حتماً این نکات را مطالعه کنید",
      content: `
        <h2>مقدمه</h2>
        <p>اجاره آپارتمان یکی از رایج‌ترین معاملات ملکی است که نیازمند دقت و آگاهی کامل است. در این مقاله به بررسی نکات کلیدی اجاره آپارتمان می‌پردازیم.</p>
        
        <h2>تعیین بودجه مناسب</h2>
        <p>قبل از جستجوی آپارتمان، بودجه خود را مشخص کنید. معمولاً توصیه می‌شود که اجاره ماهانه بیش از ۳۰٪ درآمد ماهانه شما نباشد.</p>
        
        <h2>بررسی قرارداد اجاره</h2>
        <p>قرارداد اجاره دارای بندهای مهمی است که باید به آنها توجه کنید:</p>
        <ul>
          <li>مدت قرارداد و شرایط تمدید</li>
          <li>مبلغ رهن و اجاره و نحوه افزایش آن</li>
          <li>مسئولیت تعمیرات و نگهداری</li>
          <li>شرایط فسخ قرارداد و جریمه‌ها</li>
        </ul>
        
        <h2>بازدید از آپارتمان</h2>
        <p>در زمان بازدید، موارد زیر را بررسی کنید:</p>
        <ul>
          <li>وضعیت کلی ساختمان و آپارتمان</li>
          <li>کیفیت لوازم و تأسیسات</li>
          <li>نویز و سر و صدای محیط</li>
          <li>دسترسی به امکانات شهری</li>
        </ul>
        
        <h2>نکات حقوقی</h2>
        <p>حتماً مدارک زیر را از موجر مطالبه کنید:</p>
        <ul>
          <li>سند مالکیت</li>
          <li>پروانه ساختمانی</li>
          <li>کارت ملی و شناسنامه</li>
          <li>مدارک شناسایی شاهدین</li>
        </ul>
      `,
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      categoryName: "نکات معاملات ملکی",
      categoryId: 2,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      viewCount: 850,
      authorName: "کارشناس املاک",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      readTime: "6 دقیقه",
      tags: ["اجاره", "قرارداد", "رهن", "مستاجر"]
    },
    3: {
      id: 3,
      title: "بازسازی و نوسازی آپارتمان با کمترین هزینه",
      summary: "بهترین روش‌های بازسازی آپارتمان با کمترین هزینه",
      content: `
        <h2>مقدمه</h2>
        <p>بازسازی و نوسازی آپارتمان می‌تواند ارزش ملک شما را به میزان قابل توجهی افزایش دهد. در این مقاله به روش‌های کم‌هزینه بازسازی می‌پردازیم.</p>
        
        <h2>برنامه‌ریزی دقیق</h2>
        <p>قبل از شروع بازسازی، یک برنامه دقیق تهیه کنید. موارد زیر را مشخص کنید:</p>
        <ul>
          <li>بودجه کل بازسازی</li>
          <li>اولویت‌های بازسازی</li>
          <li>نوع متریال مورد نیاز</li>
          <li>زمان‌بندی اجرا</li>
        </ul>
        
        <h2>بازسازی آشپزخانه</h2>
        <p>آشپزخانه یکی از مهم‌ترین بخش‌های هر آپارتمان است. برای بازسازی کم‌هزینه:</p>
        <ul>
          <li>تعویض کابینت‌ها با ام دی اف</li>
          <li>تعویض شیرآلات و سینک</li>
          <li>نصب کاشی و سرامیک جدید</li>
          <li>به‌روزرسانی روشنایی</li>
        </ul>
        
        <h2>بازسازی سرویس بهداشتی</h2>
        <p>برای بازسازی سرویس بهداشتی با هزینه مناسب:</p>
        <ul>
          <li>تعویض کاشی‌ها با طرح‌های جدید</li>
          <li>نصب روشویی و شیرآلات جدید</li>
          <li>تعویض سیفون و لوله‌ها</li>
        </ul>
        
        <h2>نکات نهایی</h2>
        <p>با برنامه‌ریزی دقیق و انتخاب متریال مناسب، می‌توانید با هزینه معقول، آپارتمان خود را به‌روز کنید.</p>
      `,
      imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
      categoryName: "دکوراسیون و بازسازی",
      categoryId: 4,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      viewCount: 2100,
      authorName: "متخصص بازسازی",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      readTime: "5 دقیقه",
      tags: ["بازسازی", "نوسازی", "آپارتمان", "دکوراسیون"]
    }
  };

  // ===== مطالب مرتبط فیک =====
  const fakeRelatedPosts = {
    1: [
      {
        id: 2,
        title: "نکات کلیدی در اجاره آپارتمان",
        summary: "قبل از اجاره آپارتمان حتماً این نکات را مطالعه کنید",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
        categoryName: "نکات معاملات ملکی",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        viewCount: 850
      },
      {
        id: 3,
        title: "بازسازی و نوسازی آپارتمان",
        summary: "بهترین روش‌های بازسازی آپارتمان با کمترین هزینه",
        imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400",
        categoryName: "دکوراسیون و بازسازی",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        viewCount: 2100
      }
    ],
    2: [
      {
        id: 1,
        title: "راهنمای خرید آپارتمان در تهران",
        summary: "همه چیز درباره خرید آپارتمان در تهران",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
        categoryName: "مقالات ملکی",
        createdAt: new Date().toISOString(),
        viewCount: 1250
      },
      {
        id: 5,
        title: "قوانین جدید خرید و فروش ملک",
        summary: "تغییرات قوانین خرید و فروش ملک در سال ۱۴۰۴",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
        categoryName: "نکات معاملات ملکی",
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        viewCount: 1800
      }
    ],
    3: [
      {
        id: 6,
        title: "دکوراسیون مدرن آپارتمان",
        summary: "ایده‌های جذاب برای دکوراسیون مدرن آپارتمان",
        imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400",
        categoryName: "دکوراسیون و بازسازی",
        createdAt: new Date(Date.now() - 432000000).toISOString(),
        viewCount: 950
      }
    ]
  };

  useEffect(() => {
    // شبیه‌سازی دریافت داده از سرور
    const fetchPost = () => {
      setLoading(true);
      setTimeout(() => {
        const foundPost = fakePosts[id];
        if (foundPost) {
          setPost(foundPost);
          setLikeCount(Math.floor(Math.random() * 100) + 20);
          // دریافت مطالب مرتبط
          setRelatedPosts(fakeRelatedPosts[id] || []);
        } else {
          setError('مطلب یافت نشد');
        }
        setLoading(false);
      }, 800);
    };

    fetchPost();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title || 'مطلب وبلاگ',
          text: post?.summary || '',
          url: shareUrl
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="blog-detail-wrapper">
        <div className="blog-detail-loading">
          <FaSpinner className="loading-spinner" />
          <span>در حال بارگذاری مطلب...</span>
        </div>
      </div>
    );
  }

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

  return (
    <div className="blog-detail-wrapper">
      {/* دکمه بازگشت */}
      <button className="back-btn" onClick={() => navigate('/blog')}>
        <FaArrowRight /> بازگشت به وبلاگ
      </button>

      {/* مطلب اصلی */}
      <article className="blog-post-detail">
        {/* تصویر اصلی */}
        {post.imageUrl && (
          <div className="post-detail-image">
            <img src={post.imageUrl} alt={post.title} />
            {post.categoryName && (
              <span className="post-detail-category">
                <FaTag /> {post.categoryName}
              </span>
            )}
          </div>
        )}

        {/* هدر مطلب */}
        <div className="post-detail-header">
          <h1 className="post-detail-title">{post.title}</h1>
          
          <div className="post-detail-meta">
            <span><FaCalendarAlt /> {formatDate(post.createdAt)}</span>
            {post.authorName && (
              <span><FaUser /> {post.authorName}</span>
            )}
            <span><FaEye /> {post.viewCount || 0} بازدید</span>
            <span><FaClock /> {post.readTime || '3 دقیقه'}</span>
          </div>

          {post.summary && (
            <div className="post-detail-summary">
              <p>{post.summary}</p>
            </div>
          )}

          {/* تگ‌ها */}
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
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
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
            <button className="action-btn share" onClick={handleShare}>
              <FaShare /> اشتراک‌گذاری
            </button>
            
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
        {post.authorName && (
          <div className="post-detail-author">
            <img 
              src={post.authorImage || 'https://via.placeholder.com/80/7d0000/ffffff?text=مشاور'} 
              alt={post.authorName} 
              className="author-image"
            />
            <div className="author-info">
              <h4>{post.authorName}</h4>
              <p>نویسنده و کارشناس حوزه املاک و مستغلات</p>
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
                onClick={() => navigate(`/blog/post/${related.id}`)}
              >
                {related.imageUrl && (
                  <div className="related-image-wrapper">
                    <img src={related.imageUrl} alt={related.title} />
                  </div>
                )}
                <div className="related-content">
                  <h4>{related.title}</h4>
                  <p>{related.summary}</p>
                  <div className="related-meta">
                    <span><FaCalendarAlt /> {formatDate(related.createdAt)}</span>
                    <span><FaEye /> {related.viewCount || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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