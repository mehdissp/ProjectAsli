
// // export default PaymentReturn;
// // pages/PaymentReturn.js
// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const PaymentReturn = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [status, setStatus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [countdown, setCountdown] = useState(3);
  
//   const hasVerified = useRef(false);
//   const abortControllerRef = useRef(null);
//   const countdownIntervalRef = useRef(null);

//   useEffect(() => {
//     if (hasVerified.current) {
//       console.log('Verification already done, skipping...');
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
//           navigate('/UserPropertiesPanel');
//         }
//       }, 1000);
//     };

//     const verifyPayment = async () => {
//       // ✅ ایجاد AbortController جدید
//       const abortController = new AbortController();
//       abortControllerRef.current = abortController;
      
//       try {
//         // گرفتن پارامترها از URL
//         const urlParams = new URLSearchParams(location.search);
//         const authority = urlParams.get('Authority');
//         const statusParam = urlParams.get('Status');
        
//         // گرفتن اطلاعات از sessionStorage
//         const paymentId = sessionStorage.getItem('paymentId');
//         const propertyId = sessionStorage.getItem('propertyId');
        
//         console.log('Verifying payment:', { 
//           authority, 
//           statusParam, 
//           paymentId,
//           propertyId 
//         });
        
//         if (!authority) {
//           throw new Error('کد Authority یافت نشد');
//         }
        
//         if (!paymentId) {
//           throw new Error('شناسه پرداخت یافت نشد');
//         }
        
//         const token = localStorage.getItem('auth_token');
        
//         if (!token) {
//           throw new Error('لطفاً مجدداً وارد شوید');
//         }
        
//         // علامت بزن که در حال پردازش است
//         hasVerified.current = true;
        
//         const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:7178';
        
//         // ✅ ارسال درخواست بدون signal برای جلوگیری از AbortError
//         const response = await fetch(
//           `${API_BASE_URL}/api/Payment/verify-callback?authority=${authority}&status=${statusParam === 'OK' ? 'OK' : 'NOK'}&paymentId=${paymentId}`,
//           {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//             // ❌ signal رو حذف کردیم تا کنسل نشود
//           }
//         );
        
//         const result = await response.json();
//         console.log('API Response:', result);
        
//         // ✅ بررسی نتیجه
//         if (result.status === 200 && result.data && result.data.isSuccess === true) {
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
//           setStatus({
//             success: false,
//             message: result.data?.message || result.message || 'پرداخت ناموفق بود',
//           });
          
//           startCountdown();
//         }
        
//       } catch (error) {
//         // ✅ فقط خطای غیر AbortError رو نشون بده
//         if (error.name === 'AbortError') {
//           console.log('Request was aborted, ignoring...');
//           return;
//         }
        
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
    
//     // ✅ پاکسازی: فقط اگر درخواست کامل نشده بود، کنسل کن
//     return () => {
//       if (abortControllerRef.current && !loading) {
//         abortControllerRef.current.abort();
//       }
//       if (countdownIntervalRef.current) {
//         clearInterval(countdownIntervalRef.current);
//       }
//     };
//   }, [location, navigate, loading]);
  
//   if (loading) {
//     return (
//       <div className="payment-callback-container">
//         <div className="compact-loading">
//           <div className="compact-spinner"></div>
//           <p>در حال تایید پرداخت...</p>
//           <p className="loading-note">لطفاً چند لحظه صبر کنید</p>
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="payment-callback-container">
//       <div className={`payment-result ${status?.success ? 'success' : 'error'}`}>
//         <div className="payment-result-icon">
//           {status?.success ? '✅' : '❌'}
//         </div>
        
//         <h3>{status?.message}</h3>
        
//         {status?.refId && (
//           <div className="payment-details">
//             <p>
//               <strong>شماره پیگیری:</strong> 
//               <span className="ref-id">{status.refId}</span>
//             </p>
//           </div>
//         )}
        
//         <div className="redirect-message">
//           <p>در حال انتقال به صفحه مدیریت املاک...</p>
//           <div className="countdown">
//             <span className="countdown-number">{countdown}</span>
//             <span> ثانیه دیگر</span>
//           </div>
//         </div>
        
//         <button 
//           onClick={() => navigate('/UserPropertiesPanel')}
//           className="manual-redirect-btn"
//         >
//           بازگشت به صفحه مدیریت املاک
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentReturn;
// pages/PaymentReturn.js - نسخه خوشگل‌تر
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentReturn.css'; // اضافه کردن CSS

const PaymentReturn = () => {
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
          navigate('/UserPropertiesPanel');
        }
      }, 1000);
    };

    const verifyPayment = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const authority = urlParams.get('Authority');
        const statusParam = urlParams.get('Status');
        const paymentId = sessionStorage.getItem('paymentId');
        const token = localStorage.getItem('auth_token');
        
        if (!authority || !paymentId) {
          throw new Error('اطلاعات پرداخت کامل نیست');
        }
        
        if (!token) {
          throw new Error('لطفاً مجدداً وارد شوید');
        }
        
        hasVerified.current = true;
        
        const response = await fetch(
          `https://localhost:7178/api/Payment/verify-callback?authority=${authority}&status=${statusParam === 'OK' ? 'OK' : 'NOK'}&paymentId=${paymentId}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        const result = await response.json();
        
        if (result.status === 200 && result.data?.isSuccess === true) {
          setStatus({
            success: true,
            message: 'پرداخت با موفقیت انجام شد',
            refId: result.data.refId,
          });
          
          sessionStorage.removeItem('paymentId');
          sessionStorage.removeItem('propertyId');
          sessionStorage.removeItem('paymentAmount');
          
          startCountdown();
        } else {
          setStatus({
            success: false,
            message: result.data?.message || result.message || 'پرداخت ناموفق بود',
          });
          startCountdown();
        }
        
      } catch (error) {
        console.error('Verification error:', error);
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

export default PaymentReturn;