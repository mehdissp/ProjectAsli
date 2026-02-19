// import React from 'react';

// const SkeletonCard = () => {
//   const cardStyle = {
//     backgroundColor: 'white',
//     borderRadius: '10px',
//     overflow: 'hidden',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     padding: '0',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column'
//   };

//   const imageStyle = {
//     width: '100%',
//     height: '160px',
//     backgroundColor: '#f0f0f0'
//   };

//   const contentStyle = {
//     padding: '12px'
//   };

//   const lineStyle = (width, height, marginBottom) => ({
//     width,
//     height,
//     backgroundColor: '#f0f0f0',
//     borderRadius: '4px',
//     marginBottom
//   });

//   return (
//     <div style={cardStyle}>
//       {/* تصویر Skeleton با افکت اسلایدری */}
//       <div style={{...imageStyle, className: 'skeleton', position: 'relative'}}>
//         {/* دایره‌های شبیه دات‌های اسلایدر */}
//         <div style={{
//           position: 'absolute',
//           bottom: '10px',
//           right: '10px',
//           display: 'flex',
//           gap: '4px'
//         }}>
//           {[...Array(3)].map((_, i) => (
//             <div key={i} style={{
//               width: '6px',
//               height: '6px',
//               borderRadius: '50%',
//               backgroundColor: 'rgba(255,255,255,0.5)',
//               className: 'skeleton'
//             }} />
//           ))}
//         </div>
//       </div>
      
//       <div style={contentStyle}>
//         {/* عنوان Skeleton */}
//         <div style={{...lineStyle('80%', '16px', '8px'), className: 'skeleton'}} />
        
//         {/* موقعیت Skeleton */}
//         <div style={{...lineStyle('60%', '12px', '12px'), className: 'skeleton'}} />
        
//         {/* ستاره‌ها Skeleton */}
//         <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
//           {[...Array(5)].map((_, i) => (
//             <div key={i} style={{
//               width: '14px',
//               height: '14px',
//               backgroundColor: '#f0f0f0',
//               borderRadius: '2px',
//               className: 'skeleton'
//             }} />
//           ))}
//         </div>
        
//         {/* امکانات Skeleton */}
//         <div style={{ display: 'flex', gap: '4px', marginBottom: '15px' }}>
//           {[...Array(2)].map((_, i) => (
//             <div key={i} style={{
//               width: '50px',
//               height: '20px',
//               backgroundColor: '#f0f0f0',
//               borderRadius: '10px',
//               className: 'skeleton'
//             }} />
//           ))}
//           <div style={{
//             width: '30px',
//             height: '20px',
//             backgroundColor: '#f0f0f0',
//             borderRadius: '10px',
//             className: 'skeleton'
//           }} />
//         </div>
        
//         {/* قیمت Skeleton */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           borderTop: '1px solid #eee',
//           paddingTop: '10px'
//         }}>
//           <div>
//             <div style={{...lineStyle('40px', '8px', '4px'), className: 'skeleton'}} />
//             <div style={{...lineStyle('60px', '14px', '0'), className: 'skeleton'}} />
//           </div>
//           <div style={{
//             width: '35px',
//             height: '22px',
//             backgroundColor: '#f0f0f0',
//             borderRadius: '4px',
//             className: 'skeleton'
//           }} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SkeletonCard;

import React from 'react';

const SkeletonCard = () => {
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '0',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',  // <==== این رو اضافه کن
    maxWidth: '100%' // <==== این رو اضافه کن
  };

  const imageStyle = {
    width: '100%',
    height: '160px',
    backgroundColor: '#f0f0f0'
  };

  const contentStyle = {
    padding: '12px',
    width: '100%' // <==== این رو اضافه کن
  };

  const lineStyle = (width, height, marginBottom) => ({
    width,
    height,
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    marginBottom
  });

  return (
    <div style={cardStyle}>
      {/* تصویر Skeleton با افکت اسلایدری */}
      <div style={{...imageStyle, position: 'relative', width: '100%'}}>
        <div className="skeleton" style={{width: '100%', height: '100%'}} />
        {/* دایره‌های شبیه دات‌های اسلایدر */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          display: 'flex',
          gap: '4px',
          zIndex: 2
        }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.5)',
            }} />
          ))}
        </div>
      </div>
      
      <div style={contentStyle}>
        {/* عنوان Skeleton */}
        <div className="skeleton" style={{...lineStyle('80%', '16px', '8px')}} />
        
        {/* موقعیت Skeleton */}
        <div className="skeleton" style={{...lineStyle('60%', '12px', '12px')}} />
        
        {/* ستاره‌ها Skeleton */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton" style={{
              width: '14px',
              height: '14px',
              borderRadius: '2px',
            }} />
          ))}
        </div>
        
        {/* امکانات Skeleton */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '15px', flexWrap: 'wrap' }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="skeleton" style={{
              width: '50px',
              height: '20px',
              borderRadius: '10px',
            }} />
          ))}
          <div className="skeleton" style={{
            width: '30px',
            height: '20px',
            borderRadius: '10px',
          }} />
        </div>
        
        {/* قیمت Skeleton */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #eee',
          paddingTop: '10px',
          width: '100%'
        }}>
          <div>
            <div className="skeleton" style={{...lineStyle('40px', '8px', '4px')}} />
            <div className="skeleton" style={{...lineStyle('60px', '14px', '0')}} />
          </div>
          <div className="skeleton" style={{
            width: '35px',
            height: '22px',
            borderRadius: '4px',
          }} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;