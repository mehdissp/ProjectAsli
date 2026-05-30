
// // export default PaymentReturn;
// // pages/PaymentReturn.js - نسخه خوشگل‌تر
// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './PaymentReturn.css'; // اضافه کردن CSS

// const PaymentReturnAds = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [status, setStatus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [countdown, setCountdown] = useState(3);
  
//   const hasVerified = useRef(false);
//   const countdownIntervalRef = useRef(null);

//   useEffect(() => {
//     if (hasVerified.current) {
//       return;
//     }

//     const startCountdown = () => {
//       let counter = 3;
//       countdownIntervalRef.current = setInterval(() => {
//         counter--;
//         setCountdown(counter);
        
//         if (counter <= 0) {
//           if (countdownIntervalRef.current) {
//             clearInterval(countdownIntervalRef.current);
//           }
//           navigate('/charge-wallet');
//         }
//       }, 1000);
//     };

//     const verifyPayment = async () => {
//       try {
//         const urlParams = new URLSearchParams(location.search);
//         const authority = urlParams.get('Authority');
//         const statusParam = urlParams.get('Status');
//         const paymentId = sessionStorage.getItem('paymentId');
//         const realEstateId = urlParams.get('realEstateId');
//         const token = localStorage.getItem('auth_token');
        
//         if (!authority || !paymentId) {
//           throw new Error('اطلاعات پرداخت کامل نیست');
//         }
        
//         if (!token) {
//           throw new Error('لطفاً مجدداً وارد شوید');
//         }
        
//         hasVerified.current = true;
        
//         const response = await fetch(
//           `https://localhost:7178/api/Payment/verify-callback-WithDraw?authority=${authority}&status=${statusParam === 'OK' ? 'OK' : 'NOK'}&paymentId=${paymentId}&&id=${realEstateId}`,
//           {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         );
        
//         const result = await response.json();
        
//         if (result.status === 200 && result.data?.isSuccess === true) {
//           setStatus({
//             success: true,
//             message: 'پرداخت با موفقیت انجام شد',
//             refId: result.data.refId,
//           });
          
//           sessionStorage.removeItem('paymentId');
//           sessionStorage.removeItem('propertyId');
//           sessionStorage.removeItem('paymentAmount');
          
//           startCountdown();
//         } else {
//           console.log(result.data?.message || result.message )
//           setStatus({
//             success: false,
//             message: result.data?.message || result.message || 'پرداخت ناموفق بود',
//           });
//           startCountdown();
//         }
        
//       } catch (error) {
//         console.error('Verification error:', error);
//         setStatus({
//           success: false,
//           message: error.message || 'خطا در تایید پرداخت',
//         });
//         startCountdown();
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     verifyPayment();
    
//     return () => {
//       if (countdownIntervalRef.current) {
//         clearInterval(countdownIntervalRef.current);
//       }
//     };
//   }, [location, navigate]);
  
//   if (loading) {
//     return (
//       <div className="payment-callback-container">
//         <div className="compact-loading">
//           <div className="compact-spinner"></div>
//           <p>✨ در حال تایید پرداخت ✨</p>
//           <p className="loading-note">لطفاً چند لحظه صبر کنید...</p>
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="payment-callback-container">
//       <div className={`payment-result ${status?.success ? 'success' : 'error'}`}>
//         <div className="payment-result-icon">
//           {status?.success ? '🎉' : '😔'}
//         </div>
        
//         <h3>{status?.message}</h3>
        
//         {status?.refId && (
//           <div className="payment-details">
//             <p>
//               <strong>🏷 شماره پیگیری:</strong>
//               <span className="ref-id">{status.refId}</span>
//             </p>
//           </div>
//         )}
        
//         <div className="redirect-message">
//           <p>🔄 در حال انتقال به صفحه مدیریت املاک...</p>
//           <div className="countdown">
//             <span className="countdown-number">{countdown}</span>
//             <span>ثانیه</span>
//           </div>
//         </div>
        
//         <button 
//           onClick={() => navigate('/UserPropertiesPanel')}
//           className="manual-redirect-btn"
//         >
//           🏠 بازگشت به مدیریت املاک
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentReturnAds;

// PaymentReturnAds.js - نسخه اصلاح شده
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentReturn.css';

const PaymentReturnAds = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);
  
  const hasVerified = useRef(false);
  const countdownIntervalRef = useRef(null);

  useEffect(() => {
    if (hasVerified.current) {
      return;
    }

    const startCountdown = () => {
      let counter = 3;
      countdownIntervalRef.current = setInterval(() => {
        counter--;
        setCountdown(counter);
        
        if (counter <= 0) {
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
          }
          navigate('/UserPropertiesPanel'); // تغییر به صفحه مدیریت املاک
        }
      }, 1000);
    };

    const verifyPayment = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const authority = urlParams.get('Authority');
        const statusParam = urlParams.get('Status');
        
        // ✅ دریافت از sessionStorage نه از URL
        const paymentId = sessionStorage.getItem('paymentId');
        const realEstateId = sessionStorage.getItem('realEstateId'); // id ملک
        
        console.log('🔍 Payment verification params:', {
          authority,
          statusParam,
          paymentId,
          realEstateId
        });
        
        // اعتبارسنجی پارامترها
        if (!authority) {
          throw new Error('Authority یافت نشد');
        }
        
        if (!paymentId) {
          throw new Error('PaymentId یافت نشد');
        }
        
        if (!realEstateId) {
          throw new Error('شناسه ملک یافت نشد');
        }
        
        const token = localStorage.getItem('auth_token');
        
        if (!token) {
          throw new Error('لطفاً مجدداً وارد شوید');
        }
        
        hasVerified.current = true;
        
        // ✅ اصلاح ساختار URL - رفع مشکل && اضافی
        const backendStatus = statusParam === 'OK' ? 'OK' : 'NOK';
        const apiUrl = `https://localhost:7178/api/Payment/verify-callback-WithDraw?authority=${authority}&status=${backendStatus}&paymentId=${paymentId}&id=${realEstateId}`;
        
        console.log('📤 Sending verification request:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        console.log('📥 Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`خطا در تایید پرداخت: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('✅ Verification result:', result);
        
        // بررسی نتیجه بر اساس ساختار پاسخ
        if (result.status === 200 && result.data?.isSuccess === true) {
          setStatus({
            success: true,
            message: 'پرداخت با موفقیت انجام شد',
            refId: result.data.refId,
          });
          
          // پاک کردن sessionStorage
          sessionStorage.removeItem('paymentId');
          sessionStorage.removeItem('propertyId');
          sessionStorage.removeItem('paymentAmount');
          sessionStorage.removeItem('paymentInitiated');
          
          startCountdown();
        } else if (result.isSuccess === true) {
          // اگر پاسخ مستقیماً isSuccess داشت
          setStatus({
            success: true,
            message: 'پرداخت با موفقیت انجام شد',
            refId: result.refId,
          });
          
          sessionStorage.removeItem('paymentId');
          sessionStorage.removeItem('propertyId');
          sessionStorage.removeItem('paymentAmount');
          sessionStorage.removeItem('paymentInitiated');
          
          startCountdown();
        } else {
          setStatus({
            success: false,
            message: result.message || result.data?.message || 'پرداخت ناموفق بود',
          });
          startCountdown();
        }
        
      } catch (error) {
        console.error('❌ Verification error:', error);
        setStatus({
          success: false,
          message: error.message || 'خطا در تایید پرداخت',
        });
        startCountdown();
      } finally {
        setLoading(false);
      }
    };
    
    verifyPayment();
    
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [location, navigate]);
  
  if (loading) {
    return (
      <div className="payment-callback-container">
        <div className="compact-loading">
          <div className="compact-spinner"></div>
          <p>✨ در حال تایید پرداخت ✨</p>
          <p className="loading-note">لطفاً چند لحظه صبر کنید...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="payment-callback-container">
      <div className={`payment-result ${status?.success ? 'success' : 'error'}`}>
        <div className="payment-result-icon">
          {status?.success ? '🎉' : '😔'}
        </div>
        
        <h3>{status?.message}</h3>
        
        {status?.refId && (
          <div className="payment-details">
            <p>
              <strong>🏷 شماره پیگیری:</strong>
              <span className="ref-id">{status.refId}</span>
            </p>
          </div>
        )}
        
        <div className="redirect-message">
          <p>🔄 در حال انتقال به صفحه مدیریت املاک...</p>
          <div className="countdown">
            <span className="countdown-number">{countdown}</span>
            <span>ثانیه</span>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/UserPropertiesPanel')}
          className="manual-redirect-btn"
        >
          🏠 بازگشت به مدیریت املاک
        </button>
      </div>
    </div>
  );
};

export default PaymentReturnAds;