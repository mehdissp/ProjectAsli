// // // PaymentModal.js
// // import React, { useState } from 'react';
// // import { paymentService } from '../realEstate/PaymentService';

// // const PaymentModal = ({ isOpen, onClose, property, onSuccess }) => {
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   if (!isOpen) return null;

// //   const handlePayment = async () => {
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const callbackUrl = `${window.location.origin}/payment-callback`;
      
// //       const result = await paymentService.initializePayment({
// //         amount: Math.round(property.price / 10000), // تبدیل به تومان (بدون صفرها)
// //         callbackUrl: callbackUrl,
// //         description: `پرداخت هزینه ثبت آگهی "${property.title}"`,
// //         realEstateId: property.id
// //       });

// //       // ذخیره paymentId در localStorage برای استفاده در callback
// //       localStorage.setItem('currentPaymentId', result.paymentId);
// //       localStorage.setItem('currentPropertyId', property.id);

// //       // هدایت به درگاه پرداخت
// //       window.location.href = result.gatewayUrl;
// //     } catch (err) {
// //       console.error('Payment error:', err);
// //       setError(err.response?.data?.error || 'خطا در اتصال به درگاه پرداخت');
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="compact-modal-overlay" onClick={onClose}>
// //       <div className="compact-modal payment-modal" onClick={(e) => e.stopPropagation()}>
// //         <div className="compact-modal-icon">💰</div>
// //         <h4>پرداخت هزینه آگهی</h4>
        
// //         <div className="payment-details">
// //           <div className="payment-detail-row">
// //             <span>عنوان آگهی:</span>
// //             <strong>{property.title}</strong>
// //           </div>
// //           <div className="payment-detail-row">
// //             <span>مبلغ پرداخت:</span>
// //             <strong className="payment-amount">
// //               {new Intl.NumberFormat('fa-IR').format(Math.round(property.price / 10000))} تومان
// //             </strong>
// //           </div>
// //           <div className="payment-detail-row">
// //             <span>شناسه ملک:</span>
// //             <span>{property.id}</span>
// //           </div>
// //         </div>

// //         {error && (
// //           <div className="payment-error">
// //             ❌ {error}
// //           </div>
// //         )}

// //         <div className="payment-info">
// //           <p>🔒 پرداخت از طریق درگاه امن زرین‌پال</p>
// //           <p>📝 پس از پرداخت موفق، آگهی شما به صورت خودکار فعال خواهد شد</p>
// //         </div>

// //         <div className="compact-modal-actions">
// //           <button 
// //             className="compact-pay-btn" 
// //             onClick={handlePayment}
// //             disabled={loading}
// //           >
// //             {loading ? 'در حال اتصال به درگاه...' : '💰 پرداخت و فعال‌سازی'}
// //           </button>
// //           <button className="compact-cancel-btn" onClick={onClose}>
// //             انصراف
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PaymentModal;
// import React, { useState } from 'react';
// import { paymentService } from '../realEstate/PaymentService';

// const PaymentModal = ({ isOpen, onClose, property, onSuccess, onPaymentComplete }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showResult, setShowResult] = useState(false);
//   const [paymentResult, setPaymentResult] = useState(null);

//   if (!isOpen) return null;

//   const handlePayment = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // ذخیره اطلاعات در sessionStorage برای استفاده در callback
//       sessionStorage.setItem('pendingPayment', JSON.stringify({
//         propertyId: property.id,
//         propertyTitle: property.title,
//         timestamp: Date.now()
//       }));
      
//       const result = await paymentService.initializePayment({
//         amount: Math.round(property.price / 10000),
//         callbackUrl: window.location.href, // به صفحه فعلی برمی‌گردد
//         description: `پرداخت هزینه ثبت آگهی "${property.title}"`,
//         realEstateId: property.id
//       });

//       // ذخیره paymentId در sessionStorage
//       sessionStorage.setItem('currentPaymentId', result.paymentId);
//       sessionStorage.setItem('currentPropertyId', property.id);
//       sessionStorage.setItem('paymentInitiated', 'true');

//       // هدایت به درگاه پرداخت
//       window.location.href = result.gatewayUrl;
//     } catch (err) {
//       console.error('Payment error:', err);
//       setError(err.response?.data?.error || 'خطا در اتصال به درگاه پرداخت');
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {!showResult ? (
//         <div className="compact-modal-overlay" onClick={onClose}>
//           <div className="compact-modal payment-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="compact-modal-icon">💰</div>
//             <h4>پرداخت هزینه آگهی</h4>
            
//             <div className="payment-details">
//               <div className="payment-detail-row">
//                 <span>عنوان آگهی:</span>
//                 <strong>{property.title}</strong>
//               </div>
//               <div className="payment-detail-row">
//                 <span>مبلغ پرداخت:</span>
//                 <strong className="payment-amount">
//                   {new Intl.NumberFormat('fa-IR').format(Math.round(property.price / 10000))} تومان
//                 </strong>
//               </div>
//               <div className="payment-detail-row">
//                 <span>شناسه ملک:</span>
//                 <span>{property.id}</span>
//               </div>
//             </div>

//             {error && (
//               <div className="payment-error">
//                 ❌ {error}
//               </div>
//             )}

//             <div className="payment-info">
//               <p>🔒 پرداخت از طریق درگاه امن زرین‌پال</p>
//               <p>📝 پس از پرداخت موفق، آگهی شما به صورت خودکار فعال خواهد شد</p>
//             </div>

//             <div className="compact-modal-actions">
//               <button 
//                 className="compact-pay-btn" 
//                 onClick={handlePayment}
//                 disabled={loading}
//               >
//                 {loading ? 'در حال اتصال به درگاه...' : '💰 پرداخت و فعال‌سازی'}
//               </button>
//               <button className="compact-cancel-btn" onClick={onClose}>
//                 انصراف
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <PaymentResultModal 
//           result={paymentResult} 
//           onClose={() => {
//             setShowResult(false);
//             onClose();
//             if (paymentResult?.success && onSuccess) {
//               onSuccess();
//             }
//           }} 
//         />
//       )}
//     </>
//   );
// };

// // کامپوننت نمایش نتیجه پرداخت
// const PaymentResultModal = ({ result, onClose }) => {
//   return (
//     <div className="compact-modal-overlay" onClick={onClose}>
//       <div className="compact-modal payment-result-modal" onClick={(e) => e.stopPropagation()}>
//         <div className={`result-icon ${result?.success ? 'success' : 'error'}`}>
//           {result?.success ? '✅' : '❌'}
//         </div>
//         <h3>{result?.success ? 'پرداخت موفقیت آمیز بود' : 'پرداخت ناموفق بود'}</h3>
//         <p>{result?.message}</p>
//         {result?.refId && (
//           <div className="ref-id">
//             <span>شماره پیگیری:</span>
//             <strong>{result.refId}</strong>
//           </div>
//         )}
//         <button className="compact-close-result" onClick={onClose}>
//           بستن
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentModal;


// import React, { useState } from 'react';

// const PaymentModal = ({ isOpen, onClose, property, onSuccess }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   if (!isOpen || !property) return null;

//   const handlePayment = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem('auth_token');
      
//       // 1. اول درخواست initialize می‌زنیم
//       const response = await fetch('https://localhost:7178/api/Payment/initialize', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           amount: Math.round(property.price / 10000),
//           callbackUrl: window.location.origin + '/payment-return', // آدرس جدید برای برگشت
//           description: `پرداخت هزینه ثبت آگهی "${property.title}"`,
//           realEstateId: property.id
//         })
//       });

//       if (!response.ok) {
//         throw new Error('خطا در اتصال به درگاه پرداخت');
//       }

//       const result = await response.json();
      
//       // ذخیره اطلاعات
//       sessionStorage.setItem('paymentId', result.paymentId);
//       sessionStorage.setItem('propertyId', property.id);
      
//       // هدایت به درگاه پرداخت
//       window.location.href = result.gatewayUrl;
//     } catch (err) {
//       console.error('Payment error:', err);
//       setError(err.message || 'خطا در اتصال به درگاه پرداخت');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="compact-modal-overlay" onClick={onClose}>
//       <div className="compact-modal payment-modal" onClick={(e) => e.stopPropagation()}>
//         <div className="compact-modal-icon">💰</div>
//         <h4>پرداخت هزینه آگهی</h4>
        
//         <div className="payment-details">
//           <div className="payment-detail-row">
//             <span>عنوان آگهی:</span>
//             <strong>{property.title}</strong>
//           </div>
//           <div className="payment-detail-row">
//             <span>مبلغ پرداخت:</span>
//             <strong className="payment-amount">
//               {new Intl.NumberFormat('fa-IR').format(Math.round(property.price / 10000))} تومان
//             </strong>
//           </div>
//         </div>

//         {error && (
//           <div className="payment-error">
//             ❌ {error}
//           </div>
//         )}

//         <div className="payment-info">
//           <p>🔒 پرداخت از طریق درگاه امن زرین‌پال</p>
//           <p>📝 پس از پرداخت موفق، آگهی شما فعال خواهد شد</p>
//         </div>

//         <div className="compact-modal-actions">
//           <button 
//             className="compact-pay-btn" 
//             onClick={handlePayment}
//             disabled={loading}
//           >
//             {loading ? 'در حال اتصال به درگاه...' : '💰 پرداخت و فعال‌سازی'}
//           </button>
//           <button className="compact-cancel-btn" onClick={onClose}>
//             انصراف
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentModal;

import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, property, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('zarinpal');

  if (!isOpen || !property) return null;

  const handlePayment = async () => {
    if (selectedMethod === 'snapppay') {
      setError('روش پرداخت اسنپ پی فعلاً غیرفعال است. لطفاً از زرین‌پال استفاده کنید.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch('https://localhost:7178/api/Payment/initialize', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(property.price / 10000),
          callbackUrl: window.location.origin + '/payment-return',
          description: `پرداخت هزینه ثبت آگهی "${property.title}"`,
          realEstateId: property.id,
          paymentMethod: selectedMethod
        })
      });

      if (!response.ok) {
        throw new Error('خطا در اتصال به درگاه پرداخت');
      }

      const result = await response.json();
      
      sessionStorage.setItem('paymentId', result.paymentId);
      sessionStorage.setItem('propertyId', property.id);
      
      window.location.href = result.gatewayUrl;
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'خطا در اتصال به درگاه پرداخت');
      setLoading(false);
    }
  };

  return (
    <div className="compact-modal-overlay" onClick={onClose}>
      <div className="compact-modal payment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="compact-modal-icon">💰</div>
        <h4>پرداخت هزینه آگهی</h4>
        
        <div className="payment-details">
          <div className="payment-detail-row">
            <span>عنوان آگهی:</span>
            <strong>{property.title}</strong>
          </div>
          <div className="payment-detail-row">
            <span>مبلغ پرداخت:</span>
            <strong className="payment-amount">
              {new Intl.NumberFormat('fa-IR').format(Math.round(property.price / 10000))} تومان
            </strong>
          </div>
        </div>

        {/* انتخاب روش پرداخت با رادیو باتن */}
        <div className="payment-methods">
          <p className="payment-methods-title">انتخاب روش پرداخت:</p>
          
          {/* زرین پال */}
          <label className={`payment-method-radio ${selectedMethod === 'zarinpal' ? 'selected' : ''}`}>
            <div className="radio-container">
              <input
                type="radio"
                name="paymentMethod"
                value="zarinpal"
                checked={selectedMethod === 'zarinpal'}
                onChange={(e) => setSelectedMethod(e.target.value)}
              />
              <span className="custom-radio"></span>
            </div>
            <div className="payment-method-content">
              <div className="payment-method-icon">
                <img 
                  src="https://www.zarinpal.com/header/zarinpal-logo.svg" 
                  alt="زرین‌پال"
                  onError={(e) => { e.target.src = 'https://cdn.zarinpal.com/badges/logo.png'; }}
                />
              </div>
              <div className="payment-method-info">
                <div className="payment-method-name">زرین‌پال</div>
                <div className="payment-method-desc">پرداخت امن از طریق درگاه زرین‌پال</div>
              </div>
              <div className="payment-method-badge active-badge">فعال</div>
            </div>
          </label>

          {/* اسنپ پی - غیرفعال */}
          <label className={`payment-method-radio disabled ${selectedMethod === 'snapppay' ? 'selected-disabled' : ''}`}>
            <div className="radio-container">
              <input
                type="radio"
                name="paymentMethod"
                value="snapppay"
                checked={selectedMethod === 'snapppay'}
                onChange={(e) => setSelectedMethod(e.target.value)}
                disabled
              />
              <span className="custom-radio disabled-radio"></span>
            </div>
            <div className="payment-method-content">
              <div className="payment-method-icon">
                <img 
                  src="https://www.rnsclothes.com/build/assets/snapppay-serRGsqd.svg" 
                  alt="اسنپ پی"
                  onError={(e) => { e.target.src = 'https://snapppay.ir/images/logo.png'; }}
                />
              </div>
              <div className="payment-method-info">
                <div className="payment-method-name">اسنپ پی</div>
                <div className="payment-method-desc">به زودی...</div>
              </div>
              <div className="payment-method-badge disabled-badge">غیرفعال</div>
            </div>
          </label>
        </div>

        {error && (
          <div className="payment-error">
            ❌ {error}
          </div>
        )}

        <div className="payment-info">
          <p>🔒 پرداخت از طریق درگاه امن زرین‌پال</p>
          <p>📝 پس از پرداخت موفق، آگهی شما فعال خواهد شد</p>
        </div>

        <div className="compact-modal-actions">
          <button 
            className="compact-pay-btn" 
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? 'در حال اتصال به درگاه...' : '💰 پرداخت و فعال‌سازی'}
          </button>
          <button className="compact-cancel-btn" onClick={onClose}>
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;