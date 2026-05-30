// // // // // // // PaymentModal.js
// // // // // // import React, { useState } from 'react';
// // // // // // import { paymentService } from '../realEstate/PaymentService';

// // // // // // const PaymentModal = ({ isOpen, onClose, property, onSuccess }) => {
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [error, setError] = useState(null);

// // // // // //   if (!isOpen) return null;

// // // // // //   const handlePayment = async () => {
// // // // // //     setLoading(true);
// // // // // //     setError(null);

// // // // // //     try {
// // // // // //       const callbackUrl = `${window.location.origin}/payment-callback`;
      
// // // // // //       const result = await paymentService.initializePayment({
// // // // // //         amount: Math.round(property.price / 10000), // تبدیل به تومان (بدون صفرها)
// // // // // //         callbackUrl: callbackUrl,
// // // // // //         description: `پرداخت هزینه ثبت آگهی "${property.title}"`,
// // // // // //         realEstateId: property.id
// // // // // //       });

// // // // // //       // ذخیره paymentId در localStorage برای استفاده در callback
// // // // // //       localStorage.setItem('currentPaymentId', result.paymentId);
// // // // // //       localStorage.setItem('currentPropertyId', property.id);

// // // // // //       // هدایت به درگاه پرداخت
// // // // // //       window.location.href = result.gatewayUrl;
// // // // // //     } catch (err) {
// // // // // //       console.error('Payment error:', err);
// // // // // //       setError(err.response?.data?.error || 'خطا در اتصال به درگاه پرداخت');
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="compact-modal-overlay" onClick={onClose}>
// // // // // //       <div className="compact-modal payment-modal" onClick={(e) => e.stopPropagation()}>
// // // // // //         <div className="compact-modal-icon">💰</div>
// // // // // //         <h4>پرداخت هزینه آگهی</h4>
        
// // // // // //         <div className="payment-details">
// // // // // //           <div className="payment-detail-row">
// // // // // //             <span>عنوان آگهی:</span>
// // // // // //             <strong>{property.title}</strong>
// // // // // //           </div>
// // // // // //           <div className="payment-detail-row">
// // // // // //             <span>مبلغ پرداخت:</span>
// // // // // //             <strong className="payment-amount">
// // // // // //               {new Intl.NumberFormat('fa-IR').format(Math.round(property.price / 10000))} تومان
// // // // // //             </strong>
// // // // // //           </div>
// // // // // //           <div className="payment-detail-row">
// // // // // //             <span>شناسه ملک:</span>
// // // // // //             <span>{property.id}</span>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {error && (
// // // // // //           <div className="payment-error">
// // // // // //             ❌ {error}
// // // // // //           </div>
// // // // // //         )}

// // // // // //         <div className="payment-info">
// // // // // //           <p>🔒 پرداخت از طریق درگاه امن زرین‌پال</p>
// // // // // //           <p>📝 پس از پرداخت موفق، آگهی شما به صورت خودکار فعال خواهد شد</p>
// // // // // //         </div>

// // // // // //         <div className="compact-modal-actions">
// // // // // //           <button 
// // // // // //             className="compact-pay-btn" 
// // // // // //             onClick={handlePayment}
// // // // // //             disabled={loading}
// // // // // //           >
// // // // // //             {loading ? 'در حال اتصال به درگاه...' : '💰 پرداخت و فعال‌سازی'}
// // // // // //           </button>
// // // // // //           <button className="compact-cancel-btn" onClick={onClose}>
// // // // // //             انصراف
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default PaymentModal;
// // // // // import React, { useState } from 'react';
// // // // // import { paymentService } from '../realEstate/PaymentService';

// // // // // const PaymentModal = ({ isOpen, onClose, property, onSuccess, onPaymentComplete }) => {
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [showResult, setShowResult] = useState(false);
// // // // //   const [paymentResult, setPaymentResult] = useState(null);

// // // // //   if (!isOpen) return null;

// // // // //   const handlePayment = async () => {
// // // // //     setLoading(true);
// // // // //     setError(null);

// // // // //     try {
// // // // //       // ذخیره اطلاعات در sessionStorage برای استفاده در callback
// // // // //       sessionStorage.setItem('pendingPayment', JSON.stringify({
// // // // //         propertyId: property.id,
// // // // //         propertyTitle: property.title,
// // // // //         timestamp: Date.now()
// // // // //       }));
      
// // // // //       const result = await paymentService.initializePayment({
// // // // //         amount: Math.round(property.price / 10000),
// // // // //         callbackUrl: window.location.href, // به صفحه فعلی برمی‌گردد
// // // // //         description: `پرداخت هزینه ثبت آگهی "${property.title}"`,
// // // // //         realEstateId: property.id
// // // // //       });

// // // // //       // ذخیره paymentId در sessionStorage
// // // // //       sessionStorage.setItem('currentPaymentId', result.paymentId);
// // // // //       sessionStorage.setItem('currentPropertyId', property.id);
// // // // //       sessionStorage.setItem('paymentInitiated', 'true');

// // // // //       // هدایت به درگاه پرداخت
// // // // //       window.location.href = result.gatewayUrl;
// // // // //     } catch (err) {
// // // // //       console.error('Payment error:', err);
// // // // //       setError(err.response?.data?.error || 'خطا در اتصال به درگاه پرداخت');
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <>
// // // // //       {!showResult ? (
// // // // //         <div className="compact-modal-overlay" onClick={onClose}>
// // // // //           <div className="compact-modal payment-modal" onClick={(e) => e.stopPropagation()}>
// // // // //             <div className="compact-modal-icon">💰</div>
// // // // //             <h4>پرداخت هزینه آگهی</h4>
            
// // // // //             <div className="payment-details">
// // // // //               <div className="payment-detail-row">
// // // // //                 <span>عنوان آگهی:</span>
// // // // //                 <strong>{property.title}</strong>
// // // // //               </div>
// // // // //               <div className="payment-detail-row">
// // // // //                 <span>مبلغ پرداخت:</span>
// // // // //                 <strong className="payment-amount">
// // // // //                   {new Intl.NumberFormat('fa-IR').format(Math.round(property.price / 10000))} تومان
// // // // //                 </strong>
// // // // //               </div>
// // // // //               <div className="payment-detail-row">
// // // // //                 <span>شناسه ملک:</span>
// // // // //                 <span>{property.id}</span>
// // // // //               </div>
// // // // //             </div>

// // // // //             {error && (
// // // // //               <div className="payment-error">
// // // // //                 ❌ {error}
// // // // //               </div>
// // // // //             )}

// // // // //             <div className="payment-info">
// // // // //               <p>🔒 پرداخت از طریق درگاه امن زرین‌پال</p>
// // // // //               <p>📝 پس از پرداخت موفق، آگهی شما به صورت خودکار فعال خواهد شد</p>
// // // // //             </div>

// // // // //             <div className="compact-modal-actions">
// // // // //               <button 
// // // // //                 className="compact-pay-btn" 
// // // // //                 onClick={handlePayment}
// // // // //                 disabled={loading}
// // // // //               >
// // // // //                 {loading ? 'در حال اتصال به درگاه...' : '💰 پرداخت و فعال‌سازی'}
// // // // //               </button>
// // // // //               <button className="compact-cancel-btn" onClick={onClose}>
// // // // //                 انصراف
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       ) : (
// // // // //         <PaymentResultModal 
// // // // //           result={paymentResult} 
// // // // //           onClose={() => {
// // // // //             setShowResult(false);
// // // // //             onClose();
// // // // //             if (paymentResult?.success && onSuccess) {
// // // // //               onSuccess();
// // // // //             }
// // // // //           }} 
// // // // //         />
// // // // //       )}
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // // کامپوننت نمایش نتیجه پرداخت
// // // // // const PaymentResultModal = ({ result, onClose }) => {
// // // // //   return (
// // // // //     <div className="compact-modal-overlay" onClick={onClose}>
// // // // //       <div className="compact-modal payment-result-modal" onClick={(e) => e.stopPropagation()}>
// // // // //         <div className={`result-icon ${result?.success ? 'success' : 'error'}`}>
// // // // //           {result?.success ? '✅' : '❌'}
// // // // //         </div>
// // // // //         <h3>{result?.success ? 'پرداخت موفقیت آمیز بود' : 'پرداخت ناموفق بود'}</h3>
// // // // //         <p>{result?.message}</p>
// // // // //         {result?.refId && (
// // // // //           <div className="ref-id">
// // // // //             <span>شماره پیگیری:</span>
// // // // //             <strong>{result.refId}</strong>
// // // // //           </div>
// // // // //         )}
// // // // //         <button className="compact-close-result" onClick={onClose}>
// // // // //           بستن
// // // // //         </button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PaymentModal;


// // // // // import React, { useState } from 'react';

// // // // // const PaymentModal = ({ isOpen, onClose, property, onSuccess }) => {
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [error, setError] = useState(null);

// // // // //   if (!isOpen || !property) return null;

// // // // //   const handlePayment = async () => {
// // // // //     setLoading(true);
// // // // //     setError(null);

// // // // //     try {
// // // // //       const token = localStorage.getItem('auth_token');
      
// // // // //       // 1. اول درخواست initialize می‌زنیم
// // // // //       const response = await fetch('https://localhost:7178/api/Payment/initialize', {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Authorization': `Bearer ${token}`,
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify({
// // // // //           amount: Math.round(property.price / 10000),
// // // // //           callbackUrl: window.location.origin + '/payment-return', // آدرس جدید برای برگشت
// // // // //           description: `پرداخت هزینه ثبت آگهی "${property.title}"`,
// // // // //           realEstateId: property.id
// // // // //         })
// // // // //       });

// // // // //       if (!response.ok) {
// // // // //         throw new Error('خطا در اتصال به درگاه پرداخت');
// // // // //       }

// // // // //       const result = await response.json();
      
// // // // //       // ذخیره اطلاعات
// // // // //       sessionStorage.setItem('paymentId', result.paymentId);
// // // // //       sessionStorage.setItem('propertyId', property.id);
      
// // // // //       // هدایت به درگاه پرداخت
// // // // //       window.location.href = result.gatewayUrl;
// // // // //     } catch (err) {
// // // // //       console.error('Payment error:', err);
// // // // //       setError(err.message || 'خطا در اتصال به درگاه پرداخت');
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="compact-modal-overlay" onClick={onClose}>
// // // // //       <div className="compact-modal payment-modal" onClick={(e) => e.stopPropagation()}>
// // // // //         <div className="compact-modal-icon">💰</div>
// // // // //         <h4>پرداخت هزینه آگهی</h4>
        
// // // // //         <div className="payment-details">
// // // // //           <div className="payment-detail-row">
// // // // //             <span>عنوان آگهی:</span>
// // // // //             <strong>{property.title}</strong>
// // // // //           </div>
// // // // //           <div className="payment-detail-row">
// // // // //             <span>مبلغ پرداخت:</span>
// // // // //             <strong className="payment-amount">
// // // // //               {new Intl.NumberFormat('fa-IR').format(Math.round(property.price / 10000))} تومان
// // // // //             </strong>
// // // // //           </div>
// // // // //         </div>

// // // // //         {error && (
// // // // //           <div className="payment-error">
// // // // //             ❌ {error}
// // // // //           </div>
// // // // //         )}

// // // // //         <div className="payment-info">
// // // // //           <p>🔒 پرداخت از طریق درگاه امن زرین‌پال</p>
// // // // //           <p>📝 پس از پرداخت موفق، آگهی شما فعال خواهد شد</p>
// // // // //         </div>

// // // // //         <div className="compact-modal-actions">
// // // // //           <button 
// // // // //             className="compact-pay-btn" 
// // // // //             onClick={handlePayment}
// // // // //             disabled={loading}
// // // // //           >
// // // // //             {loading ? 'در حال اتصال به درگاه...' : '💰 پرداخت و فعال‌سازی'}
// // // // //           </button>
// // // // //           <button className="compact-cancel-btn" onClick={onClose}>
// // // // //             انصراف
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PaymentModal;

// // // // import React, { useState } from 'react';

// // // // const PaymentModal = ({ isOpen, onClose, property, onSuccess }) => {
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState(null);
// // // //   const [selectedMethod, setSelectedMethod] = useState('zarinpal');

// // // //   if (!isOpen || !property) return null;

// // // //   const handlePayment = async () => {
// // // //     if (selectedMethod === 'snapppay') {
// // // //       setError('روش پرداخت اسنپ پی فعلاً غیرفعال است. لطفاً از زرین‌پال استفاده کنید.');
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     setError(null);

// // // //     try {
// // // //       const token = localStorage.getItem('auth_token');
      
// // // //       const response = await fetch('https://localhost:7178/api/Payment/initialize', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({
// // // //           amount: Math.round(property.price / 10000),
// // // //           callbackUrl: window.location.origin + '/payment-return',
// // // //           description: `پرداخت هزینه ثبت آگهی "${property.title}"`,
// // // //           realEstateId: property.id,
// // // //           paymentMethod: selectedMethod
// // // //         })
// // // //       });

// // // //       if (!response.ok) {
// // // //         throw new Error('خطا در اتصال به درگاه پرداخت');
// // // //       }

// // // //       const result = await response.json();
      
// // // //       sessionStorage.setItem('paymentId', result.paymentId);
// // // //       sessionStorage.setItem('propertyId', property.id);
      
// // // //       window.location.href = result.gatewayUrl;
// // // //     } catch (err) {
// // // //       console.error('Payment error:', err);
// // // //       setError(err.message || 'خطا در اتصال به درگاه پرداخت');
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="compact-modal-overlay" onClick={onClose}>
// // // //       <div className="compact-modal payment-modal" onClick={(e) => e.stopPropagation()}>
// // // //         <div className="compact-modal-icon">💰</div>
// // // //         <h4>پرداخت هزینه آگهی</h4>
        
// // // //         <div className="payment-details">
// // // //           <div className="payment-detail-row">
// // // //             <span>عنوان آگهی:</span>
// // // //             <strong>{property.title}</strong>
// // // //           </div>
// // // //           <div className="payment-detail-row">
// // // //             <span>مبلغ پرداخت:</span>
// // // //             <strong className="payment-amount">
// // // //               {new Intl.NumberFormat('fa-IR').format(Math.round(property.price / 10000))} تومان
// // // //             </strong>
// // // //           </div>
// // // //         </div>

// // // //         {/* انتخاب روش پرداخت با رادیو باتن */}
// // // //         <div className="payment-methods">
// // // //           <p className="payment-methods-title">انتخاب روش پرداخت:</p>
          
// // // //           {/* زرین پال */}
// // // //           <label className={`payment-method-radio ${selectedMethod === 'zarinpal' ? 'selected' : ''}`}>
// // // //             <div className="radio-container">
// // // //               <input
// // // //                 type="radio"
// // // //                 name="paymentMethod"
// // // //                 value="zarinpal"
// // // //                 checked={selectedMethod === 'zarinpal'}
// // // //                 onChange={(e) => setSelectedMethod(e.target.value)}
// // // //               />
// // // //               <span className="custom-radio"></span>
// // // //             </div>
// // // //             <div className="payment-method-content">
// // // //               <div className="payment-method-icon">
// // // //                 <img 
// // // //                   src="https://www.zarinpal.com/header/zarinpal-logo.svg" 
// // // //                   alt="زرین‌پال"
// // // //                   onError={(e) => { e.target.src = 'https://cdn.zarinpal.com/badges/logo.png'; }}
// // // //                 />
// // // //               </div>
// // // //               <div className="payment-method-info">
// // // //                 <div className="payment-method-name">زرین‌پال</div>
// // // //                 <div className="payment-method-desc">پرداخت امن از طریق درگاه زرین‌پال</div>
// // // //               </div>
// // // //               <div className="payment-method-badge active-badge">فعال</div>
// // // //             </div>
// // // //           </label>

// // // //           {/* اسنپ پی - غیرفعال */}
// // // //           <label className={`payment-method-radio disabled ${selectedMethod === 'snapppay' ? 'selected-disabled' : ''}`}>
// // // //             <div className="radio-container">
// // // //               <input
// // // //                 type="radio"
// // // //                 name="paymentMethod"
// // // //                 value="snapppay"
// // // //                 checked={selectedMethod === 'snapppay'}
// // // //                 onChange={(e) => setSelectedMethod(e.target.value)}
// // // //                 disabled
// // // //               />
// // // //               <span className="custom-radio disabled-radio"></span>
// // // //             </div>
// // // //             <div className="payment-method-content">
// // // //               <div className="payment-method-icon">
// // // //                 <img 
// // // //                   src="https://www.rnsclothes.com/build/assets/snapppay-serRGsqd.svg" 
// // // //                   alt="اسنپ پی"
// // // //                   onError={(e) => { e.target.src = 'https://snapppay.ir/images/logo.png'; }}
// // // //                 />
// // // //               </div>
// // // //               <div className="payment-method-info">
// // // //                 <div className="payment-method-name">اسنپ پی</div>
// // // //                 <div className="payment-method-desc">به زودی...</div>
// // // //               </div>
// // // //               <div className="payment-method-badge disabled-badge">غیرفعال</div>
// // // //             </div>
// // // //           </label>
// // // //         </div>

// // // //         {error && (
// // // //           <div className="payment-error">
// // // //             ❌ {error}
// // // //           </div>
// // // //         )}

// // // //         <div className="payment-info">
// // // //           <p>🔒 پرداخت از طریق درگاه امن زرین‌پال</p>
// // // //           <p>📝 پس از پرداخت موفق، آگهی شما فعال خواهد شد</p>
// // // //         </div>

// // // //         <div className="compact-modal-actions">
// // // //           <button 
// // // //             className="compact-pay-btn" 
// // // //             onClick={handlePayment}
// // // //             disabled={loading}
// // // //           >
// // // //             {loading ? 'در حال اتصال به درگاه...' : '💰 پرداخت و فعال‌سازی'}
// // // //           </button>
// // // //           <button className="compact-cancel-btn" onClick={onClose}>
// // // //             انصراف
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PaymentModal;

// // // // PaymentModal.js
// // // import React, { useState, useEffect } from 'react';

// // // const PaymentModal = ({ isOpen, onClose, property, onSuccess }) => {
// // //   const [loading, setLoading] = useState(false);
// // //   const [paymentInfo, setPaymentInfo] = useState(null);
// // //   const [isLoadingInfo, setIsLoadingInfo] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [selectedMethod, setSelectedMethod] = useState('wallet'); // تغییر پیش‌فرض به کیف پول

// // //   // دریافت وضعیت پرداخت هنگام باز شدن مودال
// // //   useEffect(() => {
// // //     if (isOpen && property?.id) {
// // //       fetchPaymentStatus();
// // //     }
// // //   }, [isOpen, property?.id]);

// // //   const fetchPaymentStatus = async () => {
// // //     setIsLoadingInfo(true);
// // //     setError(null);
    
// // //     try {
// // //       const token = localStorage.getItem('auth_token');
      
// // //       const response = await fetch(
// // //         `https://localhost:7178/api/RealEstatePage/GetPaymentStatus?id=${property.id}`,
// // //         {
// // //           method: 'GET',
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json',
// // //           },
// // //         }
// // //       );

// // //       if (!response.ok) {
// // //         throw new Error('خطا در دریافت اطلاعات پرداخت');
// // //       }

// // //       const result = await response.json();
      
// // //       if (result.status === 200 && result.data) {
// // //         setPaymentInfo(result.data);
// // //       } else {
// // //         throw new Error(result.message || 'خطا در دریافت اطلاعات پرداخت');
// // //       }
// // //     } catch (err) {
// // //       console.error('Error fetching payment status:', err);
// // //       setError(err.message || 'خطا در ارتباط با سرور');
// // //     } finally {
// // //       setIsLoadingInfo(false);
// // //     }
// // //   };

// // //   if (!isOpen || !property) return null;

// // //   const handlePayment = async () => {
// // //     setLoading(true);
// // //     setError(null);

// // //     try {
// // //       const token = localStorage.getItem('auth_token');
      
// // //       let gatewayUrl = null;
// // //       let paymentId = null;

// // //       // اگر پرداخت از کیف پول باشد
// // //       if (selectedMethod === 'wallet') {
// // //         // درخواست پرداخت با کیف پول
// // //         const response = await fetch('https://localhost:7178/api/Payment/pay-with-wallet', {
// // //           method: 'POST',
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json',
// // //           },
// // //           body: JSON.stringify({
// // //             realEstateId: property.id,
// // //             amount: paymentInfo?.adPrice || Math.round(property.price / 10000)
// // //           })
// // //         });

// // //         if (!response.ok) {
// // //           throw new Error('خطا در پرداخت با کیف پول');
// // //         }

// // //         const result = await response.json();
        
// // //         if (result.status === 200) {
// // //           // پرداخت موفق با کیف پول
// // //           if (onSuccess) onSuccess();
// // //           onClose();
// // //           return;
// // //         } else {
// // //           throw new Error(result.message || 'پرداخت با کیف پول ناموفق بود');
// // //         }
// // //       } 
// // //       // پرداخت از طریق زرین‌پال
// // //       else if (selectedMethod === 'zarinpal') {
// // //         const response = await fetch('https://localhost:7178/api/Payment/initialize', {
// // //           method: 'POST',
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json',
// // //           },
// // //           body: JSON.stringify({
// // //             amount: paymentInfo?.debtor || Math.round(property.price / 10000),
// // //             callbackUrl: window.location.origin + '/payment-return',
// // //             description: `پرداخت هزینه ثبت آگهی "${property.title}"`,
// // //             realEstateId: property.id,
// // //             paymentMethod: 'zarinpal'
// // //           })
// // //         });

// // //         if (!response.ok) {
// // //           throw new Error('خطا در اتصال به درگاه پرداخت');
// // //         }

// // //         const result = await response.json();
        
// // //         paymentId = result.paymentId;
// // //         gatewayUrl = result.gatewayUrl;
        
// // //         sessionStorage.setItem('paymentId', paymentId);
// // //         sessionStorage.setItem('propertyId', property.id);
// // //         sessionStorage.setItem('paymentInitiated', 'true');
        
// // //         window.location.href = gatewayUrl;
// // //       }
// // //     } catch (err) {
// // //       console.error('Payment error:', err);
// // //       setError(err.message || 'خطا در اتصال به درگاه پرداخت');
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // نمایش لودینگ در حال دریافت اطلاعات
// // //   if (isLoadingInfo) {
// // //     return (
// // //       <div className="compact-modal-overlay" onClick={onClose}>
// // //         <div className="compact-modal payment-modal" onClick={(e) => e.stopPropagation()}>
// // //           <div className="compact-loading">
// // //             <div className="compact-spinner"></div>
// // //             <p>در حال دریافت اطلاعات پرداخت...</p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // نمایش خطا در صورت وجود
// // //   if (error && !paymentInfo) {
// // //     return (
// // //       <div className="compact-modal-overlay" onClick={onClose}>
// // //         <div className="compact-modal payment-modal" onClick={(e) => e.stopPropagation()}>
// // //           <div className="compact-modal-icon">❌</div>
// // //           <h4>خطا</h4>
// // //           <p>{error}</p>
// // //           <div className="compact-modal-actions">
// // //             <button className="compact-cancel-btn" onClick={onClose}>بستن</button>
// // //             <button className="compact-retry-btn" onClick={fetchPaymentStatus}>تلاش مجدد</button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   const { isWalletPay, walletBalance, adPrice, debtor, errorMessage } = paymentInfo || {};

// // //   return (
// // //     <div className="compact-modal-overlay" onClick={onClose}>
// // //       <div className="compact-modal payment-modal" onClick={(e) => e.stopPropagation()}>
// // //         <div className="compact-modal-icon">💰</div>
// // //         <h4>پرداخت هزینه آگهی</h4>
        
// // //         {/* جزئیات پرداخت */}
// // //         <div className="payment-details">
// // //           <div className="payment-detail-row">
// // //             <span>عنوان آگهی:</span>
// // //             <strong>{property.title}</strong>
// // //           </div>
// // //           <div className="payment-detail-row">
// // //             <span>قیمت درج آگهی:</span>
// // //             <strong className="payment-amount">
// // //               {new Intl.NumberFormat('fa-IR').format(adPrice || 0)} تومان
// // //             </strong>
// // //           </div>
// // //           <div className="payment-detail-row">
// // //             <span>موجودی کیف پول:</span>
// // //             <strong className={walletBalance >= adPrice ? 'text-success' : 'text-warning'}>
// // //               {new Intl.NumberFormat('fa-IR').format(walletBalance || 0)} تومان
// // //             </strong>
// // //           </div>
          
// // //           {/* نمایش بدهی قابل پرداخت */}
// // //           {debtor > 0 && !isWalletPay && (
// // //             <div className="payment-detail-row debtor-row">
// // //               <span>مبلغ قابل پرداخت:</span>
// // //               <strong className="payment-debtor">
// // //                 {new Intl.NumberFormat('fa-IR').format(debtor)} تومان
// // //               </strong>
// // //             </div>
// // //           )}
          
// // //           {/* نمایش پیام خطا در صورت وجود */}
// // //           {errorMessage && (
// // //             <div className="payment-error-message">
// // //               ⚠️ {errorMessage}
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* انتخاب روش پرداخت */}
// // //         <div className="payment-methods">
// // //           <p className="payment-methods-title">انتخاب روش پرداخت:</p>
          
// // //           {/* پرداخت از کیف پول - فقط در صورتی که isWalletPay=false نباشد */}
// // //           {!isWalletPay && (
// // //             <label className={`payment-method-radio ${selectedMethod === 'wallet' ? 'selected' : ''}`}>
// // //               <div className="radio-container">
// // //                 <input
// // //                   type="radio"
// // //                   name="paymentMethod"
// // //                   value="wallet"
// // //                   checked={selectedMethod === 'wallet'}
// // //                   onChange={(e) => setSelectedMethod(e.target.value)}
// // //                   disabled={walletBalance < (debtor || adPrice)}
// // //                 />
// // //                 <span className="custom-radio"></span>
// // //               </div>
// // //               <div className="payment-method-content">
// // //                 <div className="payment-method-icon">👛</div>
// // //                 <div className="payment-method-info">
// // //                   <div className="payment-method-name">پرداخت از کیف پول</div>
// // //                   <div className="payment-method-desc">
// // //                     پرداخت با استفاده از موجودی کیف پول
// // //                     {walletBalance < (debtor || adPrice) && (
// // //                       <span className="insufficient-balance">
// // //                         (موجودی ناکافی)
// // //                       </span>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //                 <div className="payment-method-badge wallet-badge">
// // //                   {walletBalance >= (debtor || adPrice) ? 'قابل پرداخت' : 'موجودی ناکافی'}
// // //                 </div>
// // //               </div>
// // //             </label>
// // //           )}

// // //           {/* پرداخت با کارت بانکی (زرین‌پال) */}
// // //           {debtor > 0 && (
// // //             <label className={`payment-method-radio ${selectedMethod === 'zarinpal' ? 'selected' : ''}`}>
// // //               <div className="radio-container">
// // //                 <input
// // //                   type="radio"
// // //                   name="paymentMethod"
// // //                   value="zarinpal"
// // //                   checked={selectedMethod === 'zarinpal'}
// // //                   onChange={(e) => setSelectedMethod(e.target.value)}
// // //                 />
// // //                 <span className="custom-radio"></span>
// // //               </div>
// // //               <div className="payment-method-content">
// // //                 <div className="payment-method-icon">
// // //                   <img 
// // //                     src="https://www.zarinpal.com/header/zarinpal-logo.svg" 
// // //                     alt="زرین‌پال"
// // //                     onError={(e) => { e.target.src = 'https://cdn.zarinpal.com/badges/logo.png'; }}
// // //                   />
// // //                 </div>
// // //                 <div className="payment-method-info">
// // //                   <div className="payment-method-name">پرداخت با کارت بانکی</div>
// // //                   <div className="payment-method-desc">
// // //                     پرداخت مبلغ {new Intl.NumberFormat('fa-IR').format(debtor)} تومان از طریق درگاه زرین‌پال
// // //                   </div>
// // //                 </div>
// // //                 <div className="payment-method-badge active-badge">فعال</div>
// // //               </div>
// // //             </label>
// // //           )}

// // //           {/* پرداخت و شارژ کیف پول - ترکیبی */}
// // //           {debtor > 0 && (
// // //             <label className={`payment-method-radio ${selectedMethod === 'charge_wallet' ? 'selected' : ''}`}>
// // //               <div className="radio-container">
// // //                 <input
// // //                   type="radio"
// // //                   name="paymentMethod"
// // //                   value="charge_wallet"
// // //                   checked={selectedMethod === 'charge_wallet'}
// // //                   onChange={(e) => setSelectedMethod(e.target.value)}
// // //                 />
// // //                 <span className="custom-radio"></span>
// // //               </div>
// // //               <div className="payment-method-content">
// // //                 <div className="payment-method-icon">💰➕👛</div>
// // //                 <div className="payment-method-info">
// // //                   <div className="payment-method-name">پرداخت و شارژ کیف پول</div>
// // //                   <div className="payment-method-desc">
// // //                     پرداخت مبلغ {new Intl.NumberFormat('fa-IR').format(debtor)} تومان و شارژ کیف پول
// // //                   </div>
// // //                 </div>
// // //                 <div className="payment-method-badge charge-badge">پرداخت و شارژ</div>
// // //               </div>
// // //             </label>
// // //           )}
// // //         </div>

// // //         {/* در صورت فعال بودن isWalletPay */}
// // //         {isWalletPay && (
// // //           <div className="wallet-pay-info">
// // //             <div className="info-icon">✅</div>
// // //             <div className="info-text">
// // //               <strong>پرداخت از کیف پول</strong>
// // //               <p>این آگهی با استفاده از موجودی کیف پول شما قابل پرداخت است</p>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {error && (
// // //           <div className="payment-error">
// // //             ❌ {error}
// // //           </div>
// // //         )}

// // //         <div className="payment-info">
// // //           <p>🔒 پرداخت از طریق درگاه امن زرین‌پال</p>
// // //           <p>📝 پس از پرداخت موفق، آگهی شما فعال خواهد شد</p>
// // //         </div>

// // //         <div className="compact-modal-actions">
// // //           <button 
// // //             className="compact-pay-btn" 
// // //             onClick={handlePayment}
// // //             disabled={loading || (selectedMethod === 'wallet' && walletBalance < (debtor || adPrice))}
// // //           >
// // //             {loading ? 'در حال پردازش...' : (
// // //               selectedMethod === 'wallet' ? '💰 پرداخت از کیف پول' :
// // //               selectedMethod === 'charge_wallet' ? '💰 پرداخت و شارژ کیف پول' :
// // //               '💳 پرداخت و فعال‌سازی'
// // //             )}
// // //           </button>
// // //           <button className="compact-cancel-btn" onClick={onClose} disabled={loading}>
// // //             انصراف
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PaymentModal;

// // // PaymentModal.js
// // import React, { useState, useEffect } from 'react';

// // const PaymentModal = ({ isOpen, onClose, property, onSuccess }) => {
// //   const [loading, setLoading] = useState(false);
// //   const [paymentInfo, setPaymentInfo] = useState(null);
// //   const [isLoadingInfo, setIsLoadingInfo] = useState(true);
// //   const [error, setError] = useState(null);

// //   // دریافت وضعیت پرداخت هنگام باز شدن مودال
// //   useEffect(() => {
// //     if (isOpen && property?.id) {
// //       fetchPaymentStatus();
// //     }
// //   }, [isOpen, property?.id]);

// //   const fetchPaymentStatus = async () => {
// //     setIsLoadingInfo(true);
// //     setError(null);
    
// //     try {
// //       const token = localStorage.getItem('auth_token');
      
// //       const response = await fetch(
// //         `https://localhost:7178/api/RealEstatePage/GetPaymentStatus?id=${property.id}`,
// //         {
// //           method: 'GET',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error('خطا در دریافت اطلاعات پرداخت');
// //       }

// //       const result = await response.json();
      
// //       if (result.status === 200 && result.data) {
// //         setPaymentInfo(result.data);
// //       } else {
// //         throw new Error(result.message || 'خطا در دریافت اطلاعات پرداخت');
// //       }
// //     } catch (err) {
// //       console.error('Error fetching payment status:', err);
// //       setError(err.message || 'خطا در ارتباط با سرور');
// //     } finally {
// //       setIsLoadingInfo(false);
// //     }
// //   };

// //   if (!isOpen || !property) return null;

// //   const handlePayment = async () => {
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const token = localStorage.getItem('auth_token');
      
// //       // اگر isWalletPay === true -> پرداخت از کیف پول
// //       if (paymentInfo?.isWalletPay === true) {
// //         const response = await fetch('https://localhost:7178/api/Payment/pay-with-wallet', {
// //           method: 'POST',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify({
// //             realEstateId: property.id,
// //             amount: paymentInfo?.adPrice || Math.round(property.price / 10000)
// //           })
// //         });

// //         if (!response.ok) {
// //           throw new Error('خطا در پرداخت با کیف پول');
// //         }

// //         const result = await response.json();
        
// //         if (result.status === 200) {
// //           if (onSuccess) onSuccess();
// //           onClose();
// //           return;
// //         } else {
// //           throw new Error(result.message || 'پرداخت با کیف پول ناموفق بود');
// //         }
// //       } 
// //       // اگر isWalletPay === false -> پرداخت و شارژ کیف پول
// //       else {
// //         const response = await fetch('https://localhost:7178/api/Payment/initialize-and-charge', {
// //           method: 'POST',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify({
// //             amount: paymentInfo?.debtor || paymentInfo?.adPrice || Math.round(property.price / 10000),
// //             callbackUrl: window.location.origin + '/payment-return',
// //             description: `پرداخت هزینه ثبت آگهی "${property.title}" و شارژ کیف پول`,
// //             realEstateId: property.id,
// //             paymentMethod: 'zarinpal'
// //           })
// //         });

// //         if (!response.ok) {
// //           throw new Error('خطا در اتصال به درگاه پرداخت');
// //         }

// //         const result = await response.json();
        
// //         const paymentId = result.paymentId;
// //         const gatewayUrl = result.gatewayUrl;
        
// //         sessionStorage.setItem('paymentId', paymentId);
// //         sessionStorage.setItem('propertyId', property.id);
// //         sessionStorage.setItem('paymentInitiated', 'true');
        
// //         window.location.href = gatewayUrl;
// //       }
// //     } catch (err) {
// //       console.error('Payment error:', err);
// //       setError(err.message || 'خطا در اتصال به درگاه پرداخت');
// //       setLoading(false);
// //     }
// //   };

// //   // نمایش لودینگ در حال دریافت اطلاعات
// //   if (isLoadingInfo) {
// //     return (
// //       <div className="compact-modal-overlay" onClick={onClose}>
// //         <div className="compact-modal payment-modal" onClick={(e) => e.stopPropagation()}>
// //           <div className="compact-loading">
// //             <div className="compact-spinner"></div>
// //             <p>در حال دریافت اطلاعات پرداخت...</p>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // نمایش خطا در صورت وجود
// //   if (error && !paymentInfo) {
// //     return (
// //       <div className="compact-modal-overlay" onClick={onClose}>
// //         <div className="compact-modal payment-modal" onClick={(e) => e.stopPropagation()}>
// //           <div className="compact-modal-icon">❌</div>
// //           <h4>خطا</h4>
// //           <p>{error}</p>
// //           <div className="compact-modal-actions">
// //             <button className="compact-cancel-btn" onClick={onClose}>بستن</button>
// //             <button className="compact-retry-btn" onClick={fetchPaymentStatus}>تلاش مجدد</button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const { isWalletPay, walletBalance, adPrice, debtor, errorMessage } = paymentInfo || {};

// //   // return (
// //   //   <div className="compact-modal-overlay" onClick={onClose}>
// //   //     <div className="compact-modal payment-modal" onClick={(e) => e.stopPropagation()}>
// //   //       <div className="compact-modal-icon">💰</div>
// //   //       <h4>پرداخت هزینه آگهی</h4>
        
// //   //       {/* جزئیات پرداخت */}
// //   //       <div className="payment-details">
// //   //         <div className="payment-detail-row">
// //   //           <span>عنوان آگهی:</span>
// //   //           <strong>{property.title}</strong>
// //   //         </div>
// //   //         <div className="payment-detail-row">
// //   //           <span>قیمت درج آگهی:</span>
// //   //           <strong className="payment-amount">
// //   //             {new Intl.NumberFormat('fa-IR').format(adPrice || 0)} تومان
// //   //           </strong>
// //   //         </div>
// //   //         <div className="payment-detail-row">
// //   //           <span>موجودی کیف پول:</span>
// //   //           <strong className={walletBalance >= adPrice ? 'text-success' : 'text-warning'}>
// //   //             {new Intl.NumberFormat('fa-IR').format(walletBalance || 0)} تومان
// //   //           </strong>
// //   //         </div>
          
// //   //         {/* نمایش بدهی قابل پرداخت (فقط در حالت isWalletPay=false) */}
// //   //         {!isWalletPay && debtor > 0 && (
// //   //           <div className="payment-detail-row debtor-row">
// //   //             <span>مبلغ قابل پرداخت:</span>
// //   //             <strong className="payment-debtor">
// //   //               {new Intl.NumberFormat('fa-IR').format(debtor)} تومان
// //   //             </strong>
// //   //           </div>
// //   //         )}
          
// //   //         {/* نمایش پیام خطا در صورت وجود */}
// //   //         {errorMessage && (
// //   //           <div className="payment-error-message">
// //   //             ⚠️ {errorMessage}
// //   //           </div>
// //   //         )}
// //   //       </div>

// //   //       {/* توضیحات روش پرداخت */}
// //   //       <div className="payment-method-info-box">
// //   //         {isWalletPay ? (
// //   //           <div className="wallet-pay-info">
// //   //             <div className="info-icon">✅</div>
// //   //             <div className="info-text">
// //   //               <strong>پرداخت از کیف پول</strong>
// //   //               <p>این آگهی با استفاده از موجودی کیف پول شما قابل پرداخت است</p>
// //   //               {walletBalance >= adPrice ? (
// //   //                 <span className="available-text">موجودی کافی است</span>
// //   //               ) : (
// //   //                 <span className="insufficient-text">موجودی کافی نیست</span>
// //   //               )}
// //   //             </div>
// //   //           </div>
// //   //         ) : (
// //   //           <div className="charge-wallet-info">
// //   //             <div className="info-icon">💰➕👛</div>
// //   //             <div className="info-text">
// //   //               <strong>پرداخت و شارژ کیف پول</strong>
// //   //               <p>پرداخت مبلغ {new Intl.NumberFormat('fa-IR').format(debtor || adPrice)} تومان و شارژ کیف پول شما</p>
// //   //               <span className="charge-text">پس از پرداخت، آگهی شما فعال می‌شود</span>
// //   //             </div>
// //   //           </div>
// //   //         )}
// //   //       </div>

// //   //       {error && (
// //   //         <div className="payment-error">
// //   //           ❌ {error}
// //   //         </div>
// //   //       )}

// //   //       <div className="payment-info">
// //   //         <p>🔒 پرداخت از طریق درگاه امن زرین‌پال</p>
// //   //         <p>📝 پس از پرداخت موفق، آگهی شما فعال خواهد شد</p>
// //   //       </div>

// //   //       <div className="compact-modal-actions">
// //   //         <button 
// //   //           className="compact-pay-btn" 
// //   //           onClick={handlePayment}
// //   //           disabled={loading}
// //   //         >
// //   //           {loading ? 'در حال پردازش...' : (
// //   //             isWalletPay ? '💰 پرداخت از کیف پول' : '💰 پرداخت و شارژ کیف پول'
// //   //           )}
// //   //         </button>
// //   //         <button className="compact-cancel-btn" onClick={onClose} disabled={loading}>
// //   //           انصراف
// //   //         </button>
// //   //       </div>
// //   //     </div>
// //   //   </div>
// //   // );
// // // PaymentModal.js - فقط قسمت JSX return (بقیه کدها همانند قبل)

// // return (
// //   <div className="compact-modal-overlay" onClick={onClose}>
// //     <div className="compact-modal payment-modal payment-modal-scrollable" onClick={(e) => e.stopPropagation()}>
// //       <div className="compact-modal-header">
// //         <div className="compact-modal-icon">💰</div>
// //         <h4>پرداخت هزینه آگهی</h4>
// //         <button className="compact-modal-close" onClick={onClose}>✕</button>
// //       </div>
      
// //       <div className="compact-modal-body">
// //         {/* جزئیات پرداخت */}
// //         <div className="payment-details">
// //           <div className="payment-detail-row">
// //             <span>عنوان آگهی:</span>
// //             <strong>{property.title}</strong>
// //           </div>
// //           <div className="payment-detail-row">
// //             <span>قیمت درج آگهی:</span>
// //             <strong className="payment-amount">
// //               {new Intl.NumberFormat('fa-IR').format(adPrice || 0)} تومان
// //             </strong>
// //           </div>
// //           <div className="payment-detail-row">
// //             <span>موجودی کیف پول:</span>
// //             <strong className={walletBalance >= adPrice ? 'text-success' : 'text-warning'}>
// //               {new Intl.NumberFormat('fa-IR').format(walletBalance || 0)} تومان
// //             </strong>
// //           </div>
          
// //           {/* نمایش بدهی قابل پرداخت (فقط در حالت isWalletPay=false) */}
// //           {!isWalletPay && debtor > 0 && (
// //             <div className="payment-detail-row debtor-row">
// //               <span>مبلغ قابل پرداخت:</span>
// //               <strong className="payment-debtor">
// //                 {new Intl.NumberFormat('fa-IR').format(debtor)} تومان
// //               </strong>
// //             </div>
// //           )}
          
// //           {/* نمایش پیام خطا در صورت وجود */}
// //           {errorMessage && (
// //             <div className="payment-error-message">
// //               ⚠️ {errorMessage}
// //             </div>
// //           )}
// //         </div>

// //         {/* توضیحات روش پرداخت */}
// //         <div className="payment-method-info-box">
// //           {isWalletPay ? (
// //             <div className="wallet-pay-info">
// //               <div className="info-icon">✅</div>
// //               <div className="info-text">
// //                 <strong>پرداخت از کیف پول</strong>
// //                 <p>این آگهی با استفاده از موجودی کیف پول شما قابل پرداخت است</p>
// //                 {walletBalance >= adPrice ? (
// //                   <span className="available-text">موجودی کافی است</span>
// //                 ) : (
// //                   <span className="insufficient-text">موجودی کافی نیست</span>
// //                 )}
// //               </div>
// //             </div>
// //           ) : (
// //             <div className="charge-wallet-info">
// //               <div className="info-icon">💰➕👛</div>
// //               <div className="info-text">
// //                 <strong>پرداخت و شارژ کیف پول</strong>
// //                 <p>پرداخت مبلغ {new Intl.NumberFormat('fa-IR').format(debtor || adPrice)} تومان و شارژ کیف پول شما</p>
// //                 <span className="charge-text">پس از پرداخت، آگهی شما فعال می‌شود</span>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {error && (
// //           <div className="payment-error">
// //             ❌ {error}
// //           </div>
// //         )}

// //         <div className="payment-info">
// //           <p>🔒 پرداخت از طریق درگاه امن زرین‌پال</p>
// //           <p>📝 پس از پرداخت موفق، آگهی شما فعال خواهد شد</p>
// //         </div>
// //       </div>

// //       <div className="compact-modal-footer">
// //         <button 
// //           className="compact-pay-btn" 
// //           onClick={handlePayment}
// //           disabled={loading}
// //         >
// //           {loading ? 'در حال پردازش...' : (
// //             isWalletPay ? '💰 پرداخت از کیف پول' : '💰 پرداخت و شارژ کیف پول'
// //           )}
// //         </button>
// //         <button className="compact-cancel-btn" onClick={onClose} disabled={loading}>
// //           انصراف
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // );
// // };

// // export default PaymentModal;

// // PaymentModal.js
// import React, { useState, useEffect } from 'react';

// const PaymentModal = ({ isOpen, onClose, property, onSuccess }) => {
//   const [loading, setLoading] = useState(false);
//   const [paymentInfo, setPaymentInfo] = useState(null);
//   const [isLoadingInfo, setIsLoadingInfo] = useState(true);
//   const [error, setError] = useState(null);

//   // دریافت وضعیت پرداخت هنگام باز شدن مودال
//   useEffect(() => {
//     if (isOpen && property?.id) {
//       fetchPaymentStatus();
//     }
//   }, [isOpen, property?.id]);

//   const fetchPaymentStatus = async () => {
//     setIsLoadingInfo(true);
//     setError(null);
    
//     try {
//       const token = localStorage.getItem('auth_token');
      
//       const response = await fetch(
//         `https://localhost:7178/api/RealEstatePage/GetPaymentStatus?id=${property.id}`,
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error('خطا در دریافت اطلاعات پرداخت');
//       }

//       const result = await response.json();
      
//       if (result.status === 200 && result.data) {
//         setPaymentInfo(result.data);
//       } else {
//         throw new Error(result.message || 'خطا در دریافت اطلاعات پرداخت');
//       }
//     } catch (err) {
//       console.error('Error fetching payment status:', err);
//       setError(err.message || 'خطا در ارتباط با سرور');
//     } finally {
//       setIsLoadingInfo(false);
//     }
//   };

//   if (!isOpen || !property) return null;

//   const handlePayment = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem('auth_token');
      
//       if (!token) {
//         throw new Error('لطفاً ابتدا وارد شوید');
//       }
      
//       // اگر isWalletPay === true -> پرداخت از کیف پول
//       if (paymentInfo?.isWalletPay === true) {
//         const response = await fetch('https://localhost:7178/api/Payment/PaymentWithWallet', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//           },
//           body: JSON.stringify(property.id)
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error('نشست شما منقضی شده است. لطفاً مجدداً وارد شوید.');
//           }
//           if (response.status === 415) {
//             throw new Error('خطا در ارتباط با سرور');
//           }
//           throw new Error(`خطا در پرداخت: ${response.status}`);
//         }

//         const result = await response.json();
        
//         if (result.status === 200 || result.isSuccess === true) {
//           // ✅ پرداخت موفق - بستن مودال و بروزرسانی
//           if (onSuccess) {
//             await onSuccess(); // بروزرسانی لیست املاک
//           }
//           onClose(); // بستن مودال
//         } else {
//           throw new Error(result.message || result.errorMessage || 'پرداخت با کیف پول ناموفق بود');
//         }
//       } 
//       // اگر isWalletPay === false -> پرداخت و شارژ کیف پول از طریق زرین‌پال
//       else {
//         const amount = paymentInfo?.debtor || paymentInfo?.adPrice || Math.round(property.price / 10000);
        
//         const response = await fetch('https://localhost:7178/api/Payment/initialize', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             amount: amount,
//             callbackUrl: window.location.origin + '/payment-return',
//             description: `پرداخت هزینه ثبت آگهی "${property.title}" و شارژ کیف پول`,
//             realEstateId: property.id,
//             paymentMethod: 'zarinpal'
//           })
//         });

//         if (!response.ok) {
//           throw new Error('خطا در اتصال به درگاه پرداخت');
//         }

//         const result = await response.json();
        
//         // ذخیره اطلاعات پرداخت در sessionStorage
//         sessionStorage.setItem('paymentId', result.paymentId);
//         sessionStorage.setItem('propertyId', property.id);
//         sessionStorage.setItem('paymentInitiated', 'true');
//         sessionStorage.setItem('pendingPayment', 'true');
        
//         // هدایت به درگاه پرداخت
//         window.location.href = result.gatewayUrl;
//       }
//     } catch (err) {
//       console.error('Payment error:', err);
//       setError(err.message || 'خطا در انجام پرداخت');
//       setLoading(false);
//     }
//   };

//   // نمایش لودینگ در حال دریافت اطلاعات
//   if (isLoadingInfo) {
//     return (
//       <div className="compact-modal-overlay" onClick={onClose}>
//         <div className="compact-modal payment-modal-scrollable" onClick={(e) => e.stopPropagation()}>
//           <div className="compact-modal-header">
//             <div className="compact-modal-icon">💰</div>
//             <h4>پرداخت هزینه آگهی</h4>
//             <button className="compact-modal-close" onClick={onClose}>✕</button>
//           </div>
//           <div className="compact-loading">
//             <div className="compact-spinner"></div>
//             <p>در حال دریافت اطلاعات پرداخت...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // نمایش خطا در صورت وجود
//   if (error && !paymentInfo) {
//     return (
//       <div className="compact-modal-overlay" onClick={onClose}>
//         <div className="compact-modal payment-modal-scrollable" onClick={(e) => e.stopPropagation()}>
//           <div className="compact-modal-header">
//             <div className="compact-modal-icon">❌</div>
//             <h4>خطا</h4>
//             <button className="compact-modal-close" onClick={onClose}>✕</button>
//           </div>
//           <div className="compact-modal-body">
//             <div className="payment-error">
//               <p>{error}</p>
//             </div>
//           </div>
//           <div className="compact-modal-footer">
//             <button className="compact-cancel-btn" onClick={onClose}>بستن</button>
//             <button className="compact-retry-btn" onClick={fetchPaymentStatus}>تلاش مجدد</button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const { isWalletPay, walletBalance, adPrice, debtor, errorMessage } = paymentInfo || {};

//   return (
//     <div className="compact-modal-overlay" onClick={onClose}>
//       <div className="compact-modal payment-modal-scrollable" onClick={(e) => e.stopPropagation()}>
//         <div className="compact-modal-header">
//           <div className="compact-modal-icon">💰</div>
//           <h4>پرداخت هزینه آگهی</h4>
//           <button className="compact-modal-close" onClick={onClose}>✕</button>
//         </div>
        
//         <div className="compact-modal-body">
//           {/* جزئیات پرداخت */}
//           <div className="payment-details">
//             <div className="payment-detail-row">
//               <span>عنوان آگهی:</span>
//               <strong>{property.title}</strong>
//             </div>
//             <div className="payment-detail-row">
//               <span>قیمت درج آگهی:</span>
//               <strong className="payment-amount">
//                 {new Intl.NumberFormat('fa-IR').format(adPrice || 0)} تومان
//               </strong>
//             </div>
//             <div className="payment-detail-row">
//               <span>موجودی کیف پول:</span>
//               <strong className={walletBalance >= adPrice ? 'text-success' : 'text-warning'}>
//                 {new Intl.NumberFormat('fa-IR').format(walletBalance || 0)} تومان
//               </strong>
//             </div>
            
//             {/* نمایش بدهی قابل پرداخت (فقط در حالت isWalletPay=false) */}
//             {!isWalletPay && debtor > 0 && (
//               <div className="payment-detail-row debtor-row">
//                 <span>مبلغ قابل پرداخت:</span>
//                 <strong className="payment-debtor">
//                   {new Intl.NumberFormat('fa-IR').format(debtor)} تومان
//                 </strong>
//               </div>
//             )}
            
//             {/* نمایش پیام خطا در صورت وجود */}
//             {errorMessage && (
//               <div className="payment-error-message">
//                 ⚠️ {errorMessage}
//               </div>
//             )}
//           </div>

//           {/* توضیحات روش پرداخت */}
//           <div className="payment-method-info-box">
//             {isWalletPay ? (
//               <div className="wallet-pay-info">
//                 <div className="info-icon">✅</div>
//                 <div className="info-text">
//                   <strong>پرداخت از کیف پول</strong>
//                   <p>این آگهی با استفاده از موجودی کیف پول شما قابل پرداخت است</p>
//                   {walletBalance >= adPrice ? (
//                     <span className="available-text">✓ موجودی کافی است</span>
//                   ) : (
//                     <span className="insufficient-text">⚠️ موجودی کافی نیست</span>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <div className="charge-wallet-info">
//                 <div className="info-icon">💰➕👛</div>
//                 <div className="info-text">
//                   <strong>پرداخت و شارژ کیف پول</strong>
//                   <p>پرداخت مبلغ {new Intl.NumberFormat('fa-IR').format(debtor || adPrice)} تومان و شارژ کیف پول شما</p>
//                   <span className="charge-text">✨ پس از پرداخت، آگهی شما فعال می‌شود</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           {error && (
//             <div className="payment-error">
//               ❌ {error}
//             </div>
//           )}

//           <div className="payment-info">
//             <p>🔒 پرداخت از طریق درگاه امن زرین‌پال</p>
//             <p>📝 پس از پرداخت موفق، آگهی شما فعال خواهد شد</p>
//           </div>
//         </div>

//         <div className="compact-modal-footer">
//           <button 
//             className="compact-pay-btn" 
//             onClick={handlePayment}
//             disabled={loading || (isWalletPay && walletBalance < adPrice)}
//           >
//             {loading ? (
//               <div className="btn-loading-spinner"></div>
//             ) : (
//               isWalletPay ? '💰 پرداخت از کیف پول' : '💰 پرداخت و شارژ کیف پول'
//             )}
//           </button>
//           <button className="compact-cancel-btn" onClick={onClose} disabled={loading}>
//             انصراف
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentModal;

// PaymentModal.js
import React, { useState, useEffect } from 'react';

const PaymentModal = ({ isOpen, onClose, property, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [isLoadingInfo, setIsLoadingInfo] = useState(true);
  const [error, setError] = useState(null);

  // دریافت وضعیت پرداخت هنگام باز شدن مودال
  useEffect(() => {
    if (isOpen && property?.id) {
      fetchPaymentStatus();
    }
  }, [isOpen, property?.id]);

  const fetchPaymentStatus = async () => {
    setIsLoadingInfo(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(
        `https://localhost:7178/api/RealEstatePage/GetPaymentStatus?id=${property.id}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('خطا در دریافت اطلاعات پرداخت');
      }

      const result = await response.json();
      
      if (result.status === 200 && result.data) {
        setPaymentInfo(result.data);
      } else {
        throw new Error(result.message || 'خطا در دریافت اطلاعات پرداخت');
      }
    } catch (err) {
      console.error('Error fetching payment status:', err);
      setError(err.message || 'خطا در ارتباط با سرور');
    } finally {
      setIsLoadingInfo(false);
    }
  };

  if (!isOpen || !property) return null;

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        throw new Error('لطفاً ابتدا وارد شوید');
      }
      
      // اگر isWalletPay === true -> پرداخت از کیف پول
      if (paymentInfo?.isWalletPay === true) {
        const response = await fetch('https://localhost:7178/api/Payment/PaymentWithWallet', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(property.id)
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('نشست شما منقضی شده است. لطفاً مجدداً وارد شوید.');
          }
          if (response.status === 415) {
            throw new Error('خطا در ارتباط با سرور');
          }
          throw new Error(`خطا در پرداخت: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.status === 200 || result.isSuccess === true) {
          // ✅ پرداخت موفق - بستن مودال و بروزرسانی
          if (onSuccess) {
            await onSuccess();
          }
          onClose();
        } else {
          throw new Error(result.message || result.errorMessage || 'پرداخت با کیف پول ناموفق بود');
        }
      } 
      // اگر isWalletPay === false -> پرداخت و شارژ کیف پول از طریق درگاه جدید
      else {
        // amount برابر با صفر فرستاده می‌شود
        const amount = 0;
        
        const response = await fetch('https://localhost:7178/api/Payment/InitializeDepositAds', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amount,
            description: `پرداخت هزینه ثبت آگهی "${property.title}"`,
            callbackUrl: window.location.origin + '/payment-returnAds',
            realEstateId: property.id
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Initialize error:', errorText);
          throw new Error('خطا در اتصال به درگاه پرداخت');
        }

        const result = await response.json();
        console.log('Initialize result:', result);
        
        // ذخیره اطلاعات پرداخت در sessionStorage
        sessionStorage.setItem('paymentId', result.paymentId || result.data?.paymentId);
        sessionStorage.setItem('realEstateId', property.id);
        sessionStorage.setItem('paymentInitiated', 'true');
        sessionStorage.setItem('pendingPayment', 'true');
        
        // هدایت به درگاه پرداخت (بر اساس ساختار پاسخ)
        const gatewayUrl = result.gatewayUrl || result.data?.gatewayUrl || result.url;
        
        if (gatewayUrl) {
          window.location.href = gatewayUrl;
        } else {
          throw new Error('آدرس درگاه پرداخت دریافت نشد');
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'خطا در انجام پرداخت');
      setLoading(false);
    }
  };

  // نمایش لودینگ در حال دریافت اطلاعات
  if (isLoadingInfo) {
    return (
      <div className="compact-modal-overlay" onClick={onClose}>
        <div className="compact-modal payment-modal-scrollable" onClick={(e) => e.stopPropagation()}>
          <div className="compact-modal-header">
            <div className="compact-modal-icon">💰</div>
            <h4>پرداخت هزینه آگهی</h4>
            <button className="compact-modal-close" onClick={onClose}>✕</button>
          </div>
          <div className="compact-loading">
            <div className="compact-spinner"></div>
            <p>در حال دریافت اطلاعات پرداخت...</p>
          </div>
        </div>
      </div>
    );
  }

  // نمایش خطا در صورت وجود
  if (error && !paymentInfo) {
    return (
      <div className="compact-modal-overlay" onClick={onClose}>
        <div className="compact-modal payment-modal-scrollable" onClick={(e) => e.stopPropagation()}>
          <div className="compact-modal-header">
            <div className="compact-modal-icon">❌</div>
            <h4>خطا</h4>
            <button className="compact-modal-close" onClick={onClose}>✕</button>
          </div>
          <div className="compact-modal-body">
            <div className="payment-error">
              <p>{error}</p>
            </div>
          </div>
          <div className="compact-modal-footer">
            <button className="compact-cancel-btn" onClick={onClose}>بستن</button>
            <button className="compact-retry-btn" onClick={fetchPaymentStatus}>تلاش مجدد</button>
          </div>
        </div>
      </div>
    );
  }

  const { isWalletPay, walletBalance, adPrice, debtor, errorMessage } = paymentInfo || {};

  return (
    <div className="compact-modal-overlay" onClick={onClose}>
      <div className="compact-modal payment-modal-scrollable" onClick={(e) => e.stopPropagation()}>
        <div className="compact-modal-header">
          <div className="compact-modal-icon">💰</div>
          <h4>پرداخت هزینه آگهی</h4>
          <button className="compact-modal-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="compact-modal-body">
          {/* جزئیات پرداخت */}
          <div className="payment-details">
            <div className="payment-detail-row">
              <span>عنوان آگهی:</span>
              <strong>{property.title}</strong>
            </div>
            <div className="payment-detail-row">
              <span>قیمت درج آگهی:</span>
              <strong className="payment-amount">
                {new Intl.NumberFormat('fa-IR').format(adPrice || 0)} تومان
              </strong>
            </div>
            <div className="payment-detail-row">
              <span>موجودی کیف پول:</span>
              <strong className={walletBalance >= adPrice ? 'text-success' : 'text-warning'}>
                {new Intl.NumberFormat('fa-IR').format(walletBalance || 0)} تومان
              </strong>
            </div>
            
            {/* نمایش بدهی قابل پرداخت (فقط در حالت isWalletPay=false) */}
            {!isWalletPay && debtor > 0 && (
              <div className="payment-detail-row debtor-row">
                <span>مبلغ قابل پرداخت:</span>
                <strong className="payment-debtor">
                  {new Intl.NumberFormat('fa-IR').format(debtor)} تومان
                </strong>
              </div>
            )}
            
            {/* نمایش پیام خطا در صورت وجود */}
            {errorMessage && (
              <div className="payment-error-message">
                ⚠️ {errorMessage}
              </div>
            )}
          </div>

          {/* توضیحات روش پرداخت */}
          <div className="payment-method-info-box">
            {isWalletPay ? (
              <div className="wallet-pay-info">
                <div className="info-icon">✅</div>
                <div className="info-text">
                  <strong>پرداخت از کیف پول</strong>
                  <p>این آگهی با استفاده از موجودی کیف پول شما قابل پرداخت است</p>
                  {walletBalance >= adPrice ? (
                    <span className="available-text">✓ موجودی کافی است</span>
                  ) : (
                    <span className="insufficient-text">⚠️ موجودی کافی نیست</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="charge-wallet-info">
                <div className="info-icon">💰➕👛</div>
                <div className="info-text">
                  <strong>پرداخت و شارژ کیف پول</strong>
                  <p>پرداخت مبلغ {new Intl.NumberFormat('fa-IR').format(debtor || adPrice)} تومان و شارژ کیف پول شما</p>
                  <span className="charge-text">✨ پس از پرداخت، آگهی شما فعال می‌شود</span>
                </div>
              </div>
            )}
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
        </div>

        <div className="compact-modal-footer">
          <button 
            className="compact-pay-btn" 
            onClick={handlePayment}
            disabled={loading || (isWalletPay && walletBalance < adPrice)}
          >
            {loading ? (
              <div className="btn-loading-spinner"></div>
            ) : (
              isWalletPay ? '💰 پرداخت از کیف پول' : '💰 پرداخت و شارژ کیف پول'
            )}
          </button>
          <button className="compact-cancel-btn" onClick={onClose} disabled={loading}>
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;