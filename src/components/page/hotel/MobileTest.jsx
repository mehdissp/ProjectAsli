import React, { useState, useEffect } from 'react';

const MobileTest = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
      console.log('🟢 TEST - سایز:', window.innerWidth, 'موبایل:', window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: isMobile ? 'green' : 'red',
      color: 'white',
      padding: '20px',
      zIndex: 999999,
      textAlign: 'center',
      fontSize: '20px'
    }}>
      <div>عرض صفحه: {width}px</div>
      <div>وضعیت موبایل: {isMobile ? '✅ بله' : '❌ خیر'}</div>
      <div>رنگ پس‌زمینه: {isMobile ? 'سبز' : 'قرمز'}</div>
    </div>
  );
};

export default MobileTest;