// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './RegisterType.css';

// const RegisterType = () => {
//   const [selectedType, setSelectedType] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const registerTypes = [
//     {
//       id: 'agency',
//       title: 'مشاور املاک',
//       description: 'عضویت به عنوان مشاور املاک دارای دفتر',
//       icon: '🏢',
//       features: ['مدیریت املاک', 'دریافت کمیسیون', 'داشبورد تخصصی']
//     },
//     {
//       id: 'independent',
//       title: 'مشاور مستقل',
//       description: 'عضویت به عنوان مشاور املاک مستقل و آزاد',
//       icon: '🤝',
//       features: ['ثبت ملک', 'ارتباط با مشتریان', 'کمیسیون اختصاصی']
//     },
//     {
//       id: 'buyer',
//       title: 'خریدار / فروشنده',
//       description: 'عضویت به عنوان خریدار یا فروشنده ملک',
//       icon: '🏠',
//       features: ['جستجوی ملک', 'ثبت درخواست', 'مشاهده املاک']
//     }
//   ];

//   const handleSelectType = (typeId) => {
//     setSelectedType(typeId);
//   };

//   const handleContinue = () => {
//     if (!selectedType) {
//       toast.error('لطفاً نوع عضویت خود را انتخاب کنید', {
//         position: "top-center",
//         autoClose: 3000,
//         rtl: true,
//       });
//       return;
//     }

//     setLoading(true);
    
//   // ذخیره نوع ثبت نام
//   localStorage.setItem('registerType', selectedType);
  
//   // هدایت به صفحه مناسب بر اساس نوع کاربری
//   if (selectedType === 'independent') {
//     navigate('/register/independent');
//   } else if (selectedType === 'agency') {
//     navigate('/register/agency');
//   } else if (selectedType === 'buyer') {
//     navigate('/register/buyer');
//   }
    
//     // شبیه‌سازی تاخیر و رفتن به صفحه بعد
//     setTimeout(() => {
//       setLoading(false);
//       navigate('/register/verify', { 
//         state: { userType: selectedType } 
//       });
//     }, 500);
//   };

//   const handleBackToLogin = () => {
//     navigate('/login');
//   };

//   return (
//     <div className="register-type-container">
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={true}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
      
//       <div className="register-background">
//         <div className="floating-shapes">
//           <div className="shape shape-1"></div>
//           <div className="shape shape-2"></div>
//           <div className="shape shape-3"></div>
//           <div className="shape shape-4"></div>
//         </div>
//       </div>
      
//       <div className="register-card slide-in-right">
//         <button className="back-button" onClick={handleBackToLogin}>
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//           بازگشت
//         </button>

//         <div className="register-header">
//           <div className="register-icon">
//             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </div>
//           <h1 className="register-title">عضویت در سامانه</h1>
//           <p className="register-subtitle">
//             لطفاً نوع عضویت خود را انتخاب کنید
//           </p>
//         </div>

//         <div className="register-types">
//           {registerTypes.map((type) => (
//             <div
//               key={type.id}
//               className={`register-type-card ${selectedType === type.id ? 'selected' : ''}`}
//               onClick={() => handleSelectType(type.id)}
//             >
//               <div className="type-icon">{type.icon}</div>
//               <div className="type-content">
//                 <h3 className="type-title">{type.title}</h3>
//                 <p className="type-description">{type.description}</p>
//                 <div className="type-features">
//                   {type.features.map((feature, idx) => (
//                     <span key={idx} className="feature-tag">
//                       ✓ {feature}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div className="type-radio">
//                 <div className={`radio-circle ${selectedType === type.id ? 'active' : ''}`}>
//                   {selectedType === type.id && (
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
//                       <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={handleContinue}
//           disabled={!selectedType || loading}
//           className={`continue-button ${loading ? 'loading' : ''}`}
//         >
//           {loading ? (
//             <>
//               <div className="button-spinner"></div>
//               در حال انتقال...
//             </>
//           ) : (
//             'ادامه و ثبت نام'
//           )}
//         </button>

//         <div className="register-footer">
//           <p>قبلاً ثبت نام کرده‌اید؟ <span className="login-link" onClick={handleBackToLogin}>وارد شوید</span></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterType;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterType.css';

const RegisterType = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerTypes = [
    {
      id: 'agency',
      title: 'مشاور املاک',
      description: 'عضویت به عنوان مشاور املاک دارای دفتر',
      icon: '🏢',
      features: ['مدیریت املاک', 'دریافت کمیسیون', 'داشبورد تخصصی']
    },
    {
      id: 'independent',
      title: 'مشاور مستقل',
      description: 'عضویت به عنوان مشاور املاک مستقل و آزاد',
      icon: '🤝',
      features: ['ثبت ملک', 'ارتباط با مشتریان', 'کمیسیون اختصاصی']
    },
    {
      id: 'buyer',
      title: 'خریدار / فروشنده',
      description: 'عضویت به عنوان خریدار یا فروشنده ملک',
      icon: '🏠',
      features: ['جستجوی ملک', 'ثبت درخواست', 'مشاهده املاک']
    }
  ];

  const handleSelectType = (typeId) => {
    setSelectedType(typeId);
  };

  const handleContinue = () => {
    if (!selectedType) {
      toast.error('لطفاً نوع عضویت خود را انتخاب کنید', {
        position: "top-center",
        autoClose: 3000,
        rtl: true,
      });
      return;
    }

    setLoading(true);
    
    // ذخیره نوع ثبت نام
    localStorage.setItem('registerType', selectedType);
    
    // هدایت به صفحه مناسب بر اساس نوع کاربری
    // حذف setTimeout و navigate اضافی
    
    if (selectedType === 'independent') {
      navigate('/register/independent');
    } else if (selectedType === 'agency') {
      navigate('/register/agency');
    } else if (selectedType === 'buyer') {
      navigate('/register/buyer');
    }
    
    // این خط را حذف کنید - باعث می‌شود دوباره به صفحه verify برود
    // setTimeout(() => {
    //   setLoading(false);
    //   navigate('/register/verify', { 
    //     state: { userType: selectedType } 
    //   });
    // }, 500);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register-type-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="register-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="register-card slide-in-right">
        <button className="back-button" onClick={handleBackToLogin}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          بازگشت
        </button>

        <div className="register-header">
          <div className="register-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="register-title">عضویت در سامانه</h1>
          <p className="register-subtitle">
            لطفاً نوع عضویت خود را انتخاب کنید
          </p>
        </div>

        <div className="register-types">
          {registerTypes.map((type) => (
            <div
              key={type.id}
              className={`register-type-card ${selectedType === type.id ? 'selected' : ''}`}
              onClick={() => handleSelectType(type.id)}
            >
              <div className="type-icon">{type.icon}</div>
              <div className="type-content">
                <h3 className="type-title">{type.title}</h3>
                <p className="type-description">{type.description}</p>
                <div className="type-features">
                  {type.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="type-radio">
                <div className={`radio-circle ${selectedType === type.id ? 'active' : ''}`}>
                  {selectedType === type.id && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedType || loading}
          className={`continue-button ${loading ? 'loading' : ''}`}
        >
          {loading ? (
            <>
              <div className="button-spinner"></div>
              در حال انتقال...
            </>
          ) : (
            'ادامه و ثبت نام'
          )}
        </button>

        <div className="register-footer">
          <p>قبلاً ثبت نام کرده‌اید؟ <span className="login-link" onClick={handleBackToLogin}>وارد شوید</span></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterType;