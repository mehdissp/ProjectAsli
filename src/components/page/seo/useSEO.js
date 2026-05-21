// src/hooks/useSEO.js
import { useEffect, useRef } from 'react';

const useSEO = (config) => {
  const previousTitle = useRef(document.title);

  useEffect(() => {
    // تنظیم title
    if (config.title) {
      const newTitle = `${config.title} | مشاور املاک آنلاین`;
      document.title = newTitle;
    }

    // تابع کمکی برای متا تگ‌ها
    const setMetaTag = (name, content, isProperty = false) => {
      if (!content) return;
      
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

    // تنظیم متا تگ‌ها
    if (config.description) setMetaTag('description', config.description);
    if (config.keywords) setMetaTag('keywords', config.keywords);
    if (config.ogTitle) setMetaTag('og:title', config.ogTitle, true);
    if (config.ogDescription) setMetaTag('og:description', config.ogDescription, true);
    if (config.ogImage) setMetaTag('og:image', config.ogImage, true);
    if (config.ogUrl) setMetaTag('og:url', config.ogUrl, true);
    
    // Twitter Card
    setMetaTag('twitter:card', 'summary_large_image');
    if (config.twitterTitle) setMetaTag('twitter:title', config.twitterTitle);
    if (config.twitterDescription) setMetaTag('twitter:description', config.twitterDescription);
    if (config.twitterImage) setMetaTag('twitter:image', config.twitterImage);

    // Robots
    const robotsContent = config.noIndex ? 'noindex, nofollow' : 'index, follow';
    setMetaTag('robots', robotsContent);
    setMetaTag('googlebot', robotsContent);

    // Canonical URL
    if (config.canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', config.canonicalUrl);
    }

    // بازگردانی title قبلی در زمان unmount
    return () => {
      document.title = previousTitle.current;
    };
  }, [config]);
};

export default useSEO;