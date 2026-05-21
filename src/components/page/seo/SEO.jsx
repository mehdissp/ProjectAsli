// src/components/SEO/SEO.jsx
import { useEffect } from 'react';

const SEO = ({ 
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  author,
  section,
  noIndex = false,
  alternateUrl,
  alternateLang = 'fa'
}) => {
  useEffect(() => {
    // تابع کمکی برای به‌روزرسانی یا ایجاد متا تگ
    const updateOrCreateMetaTag = (name, content, isProperty = false, isLink = false) => {
      if (!content) return;
      
      if (isLink) {
        let link = document.querySelector(`link[rel="${name}"]`);
        if (!link) {
          link = document.createElement('link');
          link.setAttribute('rel', name);
          document.head.appendChild(link);
        }
        link.setAttribute('href', content);
        return;
      }

      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // حذف متا تگ قبلی برای جلوگیری از تکراری
    const removeOldMetaTags = () => {
      const metaTags = [
        'description', 'keywords', 'og:title', 'og:description', 
        'og:image', 'og:url', 'twitter:title', 'twitter:description', 
        'twitter:image', 'robots', 'googlebot'
      ];
      
      metaTags.forEach(tag => {
        const meta = document.querySelector(`meta[name="${tag}"]`);
        if (meta) meta.remove();
        
        const ogMeta = document.querySelector(`meta[property="${tag}"]`);
        if (ogMeta) ogMeta.remove();
      });
    };

    removeOldMetaTags();

    // تنظیم title
    const fullTitle = title ? `${title} | مشاور املاک آنلاین` : 'مشاور املاک آنلاین';
    document.title = fullTitle;

    // Basic Meta Tags
    if (description) updateOrCreateMetaTag('description', description);
    if (keywords) updateOrCreateMetaTag('keywords', keywords);
    
    // Open Graph (برای اشتراک در شبکه‌های اجتماعی)
    if (title) updateOrCreateMetaTag('og:title', title, true);
    if (description) updateOrCreateMetaTag('og:description', description, true);
    if (image) updateOrCreateMetaTag('og:image', image, true);
    if (url) updateOrCreateMetaTag('og:url', url, true);
    updateOrCreateMetaTag('og:type', type, true);
    updateOrCreateMetaTag('og:site_name', 'مشاور املاک آنلاین', true);
    updateOrCreateMetaTag('og:locale', 'fa_IR', true);
    
    // Twitter Card
    updateOrCreateMetaTag('twitter:card', 'summary_large_image');
    if (title) updateOrCreateMetaTag('twitter:title', title);
    if (description) updateOrCreateMetaTag('twitter:description', description);
    if (image) updateOrCreateMetaTag('twitter:image', image);
    
    // Article Meta (برای مقالات و بلاگ)
    if (type === 'article') {
      if (publishedTime) updateOrCreateMetaTag('article:published_time', publishedTime, true);
      if (author) updateOrCreateMetaTag('article:author', author, true);
      if (section) updateOrCreateMetaTag('article:section', section, true);
    }
    
    // Canonical URL (مهم برای جلوگیری از محتوای تکراری)
    if (url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url);
    }
    
    // Alternate Language URL (برای سایت چندزبانه)
    if (alternateUrl) {
      let alternate = document.querySelector(`link[rel="alternate"][hreflang="${alternateLang}"]`);
      if (!alternate) {
        alternate = document.createElement('link');
        alternate.setAttribute('rel', 'alternate');
        alternate.setAttribute('hreflang', alternateLang);
        document.head.appendChild(alternate);
      }
      alternate.setAttribute('href', alternateUrl);
    }
    
    // Robots Meta (کنترل ایندکس شدن توسط گوگل)
    const robotsContent = noIndex ? 'noindex, nofollow' : 'index, follow';
    updateOrCreateMetaTag('robots', robotsContent);
    updateOrCreateMetaTag('googlebot', robotsContent);
    
    // Viewport (برای موبایل)
    updateOrCreateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // Charset
    let charset = document.querySelector('meta[charset]');
    if (!charset) {
      charset = document.createElement('meta');
      charset.setAttribute('charset', 'UTF-8');
      document.head.appendChild(charset);
    }

    return () => {
      // Cleanup اختیاری (در صورت نیاز)
    };
  }, [title, description, keywords, image, url, type, publishedTime, author, section, noIndex, alternateUrl, alternateLang]);

  return null;
};

export default SEO;