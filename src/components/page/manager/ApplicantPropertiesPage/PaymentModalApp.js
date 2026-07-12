
// PaymentModalApp.js
import React, { useState, useEffect } from 'react';

const PaymentModalApp = ({ isOpen, onClose, property, onSuccess }) => {
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
        `https://localhost:7178/api/RealEstatePage/GetPaymentStatusRealApp?id=${property.id}`,
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
          body: JSON.stringify({
    id: property.id,
    adPriceRangeType: 3// یا مقدار مناسب دیگر
  })
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
          <h4>پرداخت هزینه نمایش شماره تلفن</h4>
          <button className="compact-modal-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="compact-modal-body">
          {/* جزئیات پرداخت */}
          <div className="payment-details">
            <div className="payment-detail-row">
              <span>عنوان درخواست:</span>
              <strong>{property.title}</strong>
            </div>
            <div className="payment-detail-row">
              <span>هزینه نمایش شماره تلفن :</span>
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
                  <span className="charge-text">✨ پس از پرداخت، شماره مشتری نمایش داده می شود</span>
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
          <span className="charge-text">✨ پس از پرداخت، شماره مشتری نمایش داده می شود</span>
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

export default PaymentModalApp;