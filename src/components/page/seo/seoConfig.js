// src/components/SEO/seoConfig.js
export const siteConfig = {
  name: 'مشاور املاک آنلاین',
  title: 'مشاور املاک آنلاین | خرید و اجاره ملک',
  description: 'بزرگترین بازار آنلاین خرید و اجاره ملک در ایران',
  keywords: 'خرید ملک, اجاره ملک, آپارتمان, ویلا, زمین, مشاور املاک',
  url: 'https://yourdomain.com',
  image: '/images/og-image.jpg',
  twitterHandle: '@yourhandle',
  facebookAppId: 'your-app-id',
};

export const getPageSEO = (page, data = {}) => {
  const seoMap = {
    home: {
      title: 'خرید و اجاره بهترین ملک‌های ایران',
      description: 'بیش از ۱۵۰۰۰ ملک برای خرید، اجاره و سرمایه‌گذاری',
      keywords: 'خرید ملک, اجاره ملک, آپارتمان, ویلا'
    },
    buy: {
      title: 'خرید ملک | آپارتمان، ویلا و زمین',
      description: 'بیش از ۱۰۰۰۰ ملک برای خرید در تهران و شهرهای بزرگ',
      keywords: 'خرید آپارتمان, خرید ویلا, خرید زمین'
    },
    rent: {
      title: 'اجاره ملک | آپارتمان و ویلا',
      description: 'بهترین ملک‌های اجاره با قیمت مناسب',
      keywords: 'اجاره آپارتمان, اجاره ویلا, رهن و اجاره'
    }
  };

  return { ...siteConfig, ...seoMap[page], ...data };
};