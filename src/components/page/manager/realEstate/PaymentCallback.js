// pages/PaymentCallback.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { paymentService } from '../services/paymentService';

const PaymentCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(location.search);
      const statusParam = params.get('status');
      const refId = params.get('refId');
      const authority = params.get('authority');
      
      const paymentId = localStorage.getItem('currentPaymentId');
      const propertyId = localStorage.getItem('currentPropertyId');

      if (statusParam === 'success') {
        setStatus({
          type: 'success',
          message: 'پرداخت با موفقیت انجام شد',
          refId: refId
        });
        
        // پاک کردن اطلاعات موقت
        localStorage.removeItem('currentPaymentId');
        localStorage.removeItem('currentPropertyId');
        
        // بعد از 3 ثانیه به صفحه املاک من برگرد
        setTimeout(() => {
          navigate('/user/properties');
        }, 3000);
      } else if (statusParam === 'failed') {
        setStatus({
          type: 'error',
          message: 'پرداخت ناموفق بود. لطفاً مجدداً تلاش کنید'
        });
        
        setTimeout(() => {
          navigate('/user/properties');
        }, 3000);
      } else {
        setStatus({
          type: 'error',
          message: 'خطا در تایید پرداخت'
        });
        
        setTimeout(() => {
          navigate('/user/properties');
        }, 3000);
      }
      
      setLoading(false);
    };

    verifyPayment();
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="payment-callback-container">
        <div className="compact-loading">
          <div className="compact-spinner"></div>
          <p>در حال تایید پرداخت...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-callback-container">
      <div className={`payment-result ${status?.type}`}>
        <div className="payment-result-icon">
          {status?.type === 'success' ? '✅' : '❌'}
        </div>
        <h3>{status?.message}</h3>
        {status?.refId && (
          <p>شماره پیگیری: {status.refId}</p>
        )}
        <p>در حال انتقال به صفحه مدیریت املاک...</p>
      </div>
    </div>
  );
};

export default PaymentCallback;