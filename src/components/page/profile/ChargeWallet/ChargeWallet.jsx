import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWallet, FaArrowRight, FaHistory, FaShieldAlt, FaCreditCard } from 'react-icons/fa';
import './ChargeWallet.css';

const ChargeWalletPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('zarinpal');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(true);

  // مبالغ پیشنهادی
  const suggestedAmounts = [
    { value: 20000, label: '۲۰,۰۰۰', icon: '💰' },
    { value: 50000, label: '۵۰,۰۰۰', icon: '💵' },
    { value: 100000, label: '۱۰۰,۰۰۰', icon: '💶' },
    { value: 200000, label: '۲۰۰,۰۰۰', icon: '💷' },
    { value: 500000, label: '۵۰۰,۰۰۰', icon: '💎' },
  ];

  // دریافت موجودی کیف پول
  useEffect(() => {
    fetchWalletBalance();
    fetchPaymentHistory();
  }, []);

  const fetchWalletBalance = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('https://localhost:7178/api/Wallet/balance', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('خطا در دریافت موجودی کیف پول');
      }

      const data = await response.json();
      setWalletBalance(data.balance);
    } catch (err) {
      console.error('Error fetching balance:', err);
    } finally {
      setBalanceLoading(false);
    }
  };

  // دریافت تاریخچه پرداخت‌ها از API
  const fetchPaymentHistory = async () => {
    setHistoryLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('https://localhost:7178/api/Payment/wallet-history', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('خطا در دریافت تاریخچه پرداخت');
      }

      const data = await response.json();
      setPaymentHistory(data);
    } catch (err) {
      console.error('Error fetching payment history:', err);
      setError('خطا در دریافت تاریخچه پرداخت‌ها');
    } finally {
      setHistoryLoading(false);
    }
  };

  // محاسبه مبلغ نهایی
  const getFinalAmount = () => {
    if (selectedAmount) {
      return selectedAmount;
    }
    if (customAmount) {
      return parseInt(customAmount.replace(/,/g, ''));
    }
    return null;
  };

  // اعتبارسنجی مبلغ
  const validateAmount = (amount) => {
    if (!amount || amount < 20000) {
      setError('حداقل مبلغ قابل شارژ ۲۰,۰۰۰ تومان است');
      return false;
    }
    if (amount > 100000000) {
      setError('حداکثر مبلغ قابل شارژ ۱۰۰ میلیون تومان است');
      return false;
    }
    setError(null);
    return true;
  };

  // هندل تغییر مبلغ سفارشی
  const handleCustomAmountChange = (e) => {
    let value = e.target.value.replace(/,/g, '');
    if (value === '') {
      setCustomAmount('');
      setSelectedAmount(null);
      return;
    }
    
    let numValue = parseInt(value);
    if (!isNaN(numValue)) {
      if (numValue < 20000) {
        setError('حداقل مبلغ قابل شارژ ۲۰,۰۰۰ تومان است');
      } else if (numValue > 100000000) {
        setError('حداکثر مبلغ قابل شارژ ۱۰۰ میلیون تومان است');
      } else {
        setError(null);
      }
      setCustomAmount(numValue.toLocaleString('fa-IR'));
      setSelectedAmount(null);
    }
  };

  // انتخاب مبلغ پیشنهادی
  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setError(null);
  };

  // پردازش پرداخت
  const handlePayment = async () => {
    const amount = getFinalAmount();
    
    if (!amount) {
      setError('لطفاً مبلغ مورد نظر را انتخاب کنید');
      return;
    }

    if (!validateAmount(amount)) {
      return;
    }

    if (selectedMethod === 'snapppay') {
      setError('روش پرداخت اسنپ پی فعلاً غیرفعال است. لطفاً از زرین‌پال استفاده کنید.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch('https://localhost:7178/api/Payment/charge-wallet', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          callbackUrl: window.location.origin + '/wallet-charge-return',
          description: `شارژ کیف پول به مبلغ ${amount.toLocaleString('fa-IR')} تومان`,
          paymentMethod: selectedMethod
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'خطا در اتصال به درگاه پرداخت');
      }

      const result = await response.json();
      
      // ذخیره اطلاعات پرداخت در sessionStorage
      sessionStorage.setItem('walletChargePaymentId', result.paymentId);
      sessionStorage.setItem('walletChargeAmount', amount);
      
      // هدایت به درگاه پرداخت
      window.location.href = result.gatewayUrl;
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'خطا در اتصال به درگاه پرداخت');
      setLoading(false);
    }
  };

  // فرمت تاریخ
  const formatDate = (dateString) => {
    if (!dateString) return 'نامشخص';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // فرمت مبلغ
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
  };

  return (
    <div className="charge-wallet-page">
      {/* هدر صفحه */}
      <div className="page-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate(-1)}>
            <FaArrowRight />
            بازگشت
          </button>
          <h1>شارژ کیف پول</h1>
        </div>
      </div>

      <div className="page-content">
        {/* کارت موجودی کیف پول */}
        <div className="balance-card">
          <div className="balance-icon">
            <FaWallet />
          </div>
          <div className="balance-info">
            <p className="balance-label">موجودی کیف پول شما</p>
            {balanceLoading ? (
              <div className="balance-loading"></div>
            ) : (
              <h2 className="balance-amount">{formatAmount(walletBalance)}</h2>
            )}
          </div>
        </div>

        {/* بخش اصلی */}
        <div className="main-charge-section">
          <div className="charge-form-card">
            <h3>💰 انتخاب مبلغ شارژ</h3>
            
            {/* مبالغ پیشنهادی */}
            <div className="suggested-amounts">
              <p className="section-subtitle">مبالغ پیشنهادی:</p>
              <div className="amount-buttons">
                {suggestedAmounts.map((amount) => (
                  <button
                    key={amount.value}
                    className={`amount-btn ${selectedAmount === amount.value ? 'active' : ''}`}
                    onClick={() => handleSelectAmount(amount.value)}
                  >
                    <span className="amount-icon">{amount.icon}</span>
                    <span className="amount-value">{amount.label}</span>
                    <span className="amount-currency">تومان</span>
                  </button>
                ))}
              </div>
            </div>

            {/* مبلغ دلخواه */}
            <div className="custom-amount-section">
              <p className="section-subtitle">یا مبلغ دلخواه را وارد کنید:</p>
              <div className="custom-amount-input-wrapper">
                <input
                  type="text"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="مبلغ مورد نظر را وارد کنید"
                  className="custom-amount-input"
                />
                <span className="currency-unit">تومان</span>
              </div>
              <div className="amount-limits-info">
                <span className="limit-badge min">حداقل: ۲۰,۰۰۰ تومان</span>
                <span className="limit-badge max">حداکثر: ۱۰۰,۰۰۰,۰۰۰ تومان</span>
              </div>
            </div>

            {error && (
              <div className="error-alert">
                <span>❌</span>
                <p>{error}</p>
              </div>
            )}

            {/* مبلغ قابل پرداخت */}
            {getFinalAmount() && (
              <div className="payable-amount">
                <p>مبلغ قابل پرداخت:</p>
                <strong>{formatAmount(getFinalAmount())}</strong>
              </div>
            )}

            {/* روش‌های پرداخت */}
            <div className="payment-methods-section">
              <h4>
                <FaCreditCard />
                انتخاب روش پرداخت
              </h4>
              
              {/* زرین پال */}
              <label className={`payment-method-card ${selectedMethod === 'zarinpal' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="zarinpal"
                  checked={selectedMethod === 'zarinpal'}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                />
                <div className="payment-method-card-content">
                  <div className="payment-method-logo">
                    <img 
                      src="https://www.zarinpal.com/header/zarinpal-logo.svg" 
                      alt="زرین‌پال"
                      onError={(e) => { e.target.src = 'https://cdn.zarinpal.com/badges/logo.png'; }}
                    />
                  </div>
                  <div className="payment-method-details">
                    <div className="method-name">زرین‌پال</div>
                    <div className="method-description">پرداخت امن از طریق درگاه زرین‌پال</div>
                  </div>
                  <div className="method-badge active">فعال</div>
                </div>
              </label>

              {/* اسنپ پی */}
              <label className={`payment-method-card disabled ${selectedMethod === 'snapppay' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="snapppay"
                  checked={selectedMethod === 'snapppay'}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  disabled
                />
                <div className="payment-method-card-content">
                  <div className="payment-method-logo">
                    <img 
                      src="https://snapppay.ir/images/logo.png" 
                      alt="اسنپ پی"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/80x30?text=SnappPay'; }}
                    />
                  </div>
                  <div className="payment-method-details">
                    <div className="method-name">اسنپ پی</div>
                    <div className="method-description">به زودی...</div>
                  </div>
                  <div className="method-badge inactive">غیرفعال</div>
                </div>
              </label>
            </div>

            {/* دکمه پرداخت */}
            <button 
              className="charge-submit-btn"
              onClick={handlePayment}
              disabled={loading || !getFinalAmount()}
            >
              {loading ? (
                <>
                  <div className="btn-spinner"></div>
                  در حال اتصال به درگاه پرداخت...
                </>
              ) : (
                <>
                  <FaWallet />
                  پرداخت و شارژ کیف پول
                </>
              )}
            </button>

            <div className="security-note">
              <FaShieldAlt />
              <span>اطلاعات پرداخت شما با بالاترین سطح امنیت محافظت می‌شود</span>
            </div>
          </div>

          {/* تاریخچه پرداخت‌ها */}
          <div className="history-card">
            <div className="history-header">
              <FaHistory />
              <h3>تاریخچه پرداخت‌ها</h3>
              <button 
                className="refresh-history"
                onClick={fetchPaymentHistory}
                disabled={historyLoading}
              >
                {historyLoading ? 'در حال بروزرسانی...' : '🔄 بروزرسانی'}
              </button>
            </div>

            {historyLoading ? (
              <div className="history-loading">
                <div className="loading-spinner"></div>
                <p>در حال بارگذاری تاریخچه...</p>
              </div>
            ) : paymentHistory.length === 0 ? (
              <div className="empty-history">
                <div className="empty-icon">📭</div>
                <p>هیچ پرداختی ثبت نشده است</p>
                <span>اولین شارژ کیف پول خود را انجام دهید</span>
              </div>
            ) : (
              <div className="history-table-container">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>تاریخ</th>
                      <th>مبلغ</th>
                      <th>وضعیت</th>
                      <th>کد رهگیری</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment, index) => (
                      <tr key={payment.id || index}>
                        <td className="date-cell">{formatDate(payment.createDate)}</td>
                        <td className="amount-cell">{formatAmount(payment.amount)}</td>
                        <td className="status-cell">
                          <span className={`status-badge ${payment.status === 'success' ? 'success' : 'failed'}`}>
                            {payment.status === 'success' ? '✓ موفق' : '✗ ناموفق'}
                          </span>
                        </td>
                        <td className="tracking-cell">{payment.trackingCode || '---'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargeWalletPage;