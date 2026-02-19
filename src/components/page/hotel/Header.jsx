// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Header = ({ hotelCount }) => {
//   const navigate = useNavigate();

//   const headerStyle = {
//     backgroundColor: 'white',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     padding: '16px 0',
//     position: 'sticky',
//     top: 0,
//     zIndex: 100
//   };

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   return (
//     <header style={headerStyle}>
//       <div className="container">
//         {/* مسیر راهنما و دکمه ورود */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '12px'
//         }}>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//             fontSize: '14px',
//             color: '#7f8c8d'
//           }}>
//             <span>مسترنبلط</span>
//             <span>{'<'}</span>
//             <span>رزرو هتل</span>
//             <span>{'<'}</span>
//             <span style={{ color: '#2c3e50', fontWeight: '500' }}>رزرو هتل تهران</span>
//           </div>

//           {/* دکمه ورود/ثبت‌نام */}
//           <button
//             onClick={handleLoginClick}
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               backgroundColor: 'transparent',
//               border: '1px solid #3498db',
//               padding: '8px 20px',
//               borderRadius: '30px',
//               color: '#3498db',
//               fontSize: '14px',
//               fontWeight: '500',
//               cursor: 'pointer',
//               transition: 'all 0.3s ease'
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#3498db';
//               e.target.style.color = 'white';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = 'transparent';
//               e.target.style.color = '#3498db';
//             }}
//           >
//             <span>👤</span>
//             <span>ورود / ثبت‌نام</span>
//           </button>
//         </div>
        
//         {/* عنوان و دکمه نقشه */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           gap: '12px'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
//             <h1 style={{
//               fontSize: '24px',
//               fontWeight: 'bold',
//               color: '#2c3e50'
//             }}>
//               رزرو هتل تهران
//             </h1>
            
//             {/* دکمه مشاهده روی نقشه */}
//             <button style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               backgroundColor: '#f8f9fa',
//               border: '1px solid #e0e0e0',
//               padding: '8px 16px',
//               borderRadius: '8px',
//               color: '#2c3e50',
//               fontSize: '14px',
//               fontWeight: '500',
//               cursor: 'pointer',
//               transition: 'all 0.2s'
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#e9ecef';
//               e.target.style.borderColor = '#3498db';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = '#f8f9fa';
//               e.target.style.borderColor = '#e0e0e0';
//             }}
//             >
//               <span>🗺️</span>
//               <span>مشاهده هتل‌ها روی نقشه</span>
//             </button>
//           </div>
          
//           <div style={{
//             display: 'flex',
//             gap: '12px',
//             backgroundColor: '#e1f5fe',
//             padding: '8px 16px',
//             borderRadius: '8px'
//           }}>
//             <span style={{ color: '#0288d1', fontWeight: '500' }}>بهمن ۲۹</span>
//             <span style={{ color: '#0288d1' }}>-</span>
//             <span style={{ color: '#0288d1', fontWeight: '500' }}>بهمن ۳۰</span>
//           </div>
//         </div>
        
//         {/* تعداد هتل‌ها */}
//         <p style={{
//           marginTop: '12px',
//           fontSize: '14px',
//           color: '#95a5a6'
//         }}>
//           {hotelCount} هتل یافت شد
//         </p>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ hotelCount }) => {
  const navigate = useNavigate();

  const headerStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    padding: '12px 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)'
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        {/* ردیف اول: مسیر راهنما و دکمه ورود */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          {/* مسیر راهنما */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            color: '#64748b'
          }}>
            <span style={{ color: '#94a3b8' }}>مسترنبلط</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ color: '#94a3b8' }}>رزرو هتل</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ color: '#0f172a', fontWeight: '600' }}>رزرو هتل تهران</span>
          </div>

          {/* دکمه ورود/ثبت‌نام - طراحی جدید و زیبا */}
          <button
            onClick={handleLoginClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '50px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease',
              letterSpacing: '0.3px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>ورود / ثبت‌نام</span>
          </button>
        </div>

        {/* ردیف دوم: عنوان و تاریخ */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* عنوان و دکمه نقشه */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              رزرو هتل تهران
            </h1>
            
            {/* دکمه نقشه با طراحی جدید */}
       
          </div>

          {/* باکس تاریخ */}
  
        </div>

        {/* تعداد هتل‌ها با طراحی جدید */}
       
      </div>

      {/* استایل انیمیشن */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </header>
  );
};

export default Header;