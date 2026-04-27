
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
// // import { AuthProvider, useAuth } from './context/AuthContext';
// // import Layout from './components/common/Layout/Layout';
// // import Login from './components/auth/Login/Login';
// // import Dashboard from './components/dashboard/Dashboard/Dashboard';
// // import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';
// // import Project from './components/page/project/Project';
// // import './styles/globals.css';
// // import './styles/animations.css';

// // // Layout wrapper با Outlet
// // const LayoutWrapper = () => {
// //   return (
// //     <Layout>
// //       <Outlet />
// //     </Layout>
// //   );
// // };

// // // کامپوننت اصلی اپلیکیشن
// // const AppContent = () => {
// //   const { isAuthenticated, isLoading, menus } = useAuth();

// //   console.log('🔐 Auth Status:', { isAuthenticated, isLoading });

// //   if (isLoading) {
// //     return <LoadingSpinner fullScreen={true} text="در حال بارگذاری..." />;
// //   }

// //   return isAuthenticated ? <AuthenticatedApp menus={menus} /> : <PublicRoutes />;
// // };

// // // اپلیکیشن برای کاربران authenticated
// // const AuthenticatedApp = ({ menus }) => {
// //   console.log('🏠 AuthenticatedApp - menus:', menus);
  
// //   return (
// //     <Routes>
// //       <Route path="/" element={<LayoutWrapper />}>
// //         <Route index element={<Navigate to="dashboard" replace />} />
// //         <Route path="dashboard" element={<Dashboard />} />
// //            <Route path="project" element={<Project />} /> {/* اضافه کردن روت Project *
// //         {/* روت‌های داینامیک */}
// //         {renderMenuRoutes(menus)}
// //         <Route path="*" element={<NotFoundPage />} />
// //       </Route>
// //     </Routes>
// //   );
// // };

// // // روت‌های عمومی
// // const PublicRoutes = () => {
// //   return (
// //     <Routes>
// //       <Route path="/login" element={<Login />} />
// //       <Route path="*" element={<Navigate to="/dashboard" replace />} />
// //     </Routes>
// //   );
// // };

// // // تابع برای رندر روت‌های منو
// // const renderMenuRoutes = (menus) => {
// //   if (!menus || !Array.isArray(menus)) return null;

// //   const renderRecursive = (menuItems) => {
// //     return menuItems.flatMap((menu) => {
// //       const routes = [];

// //       if (menu.path && menu.path !== '#' && menu.path !== '/dashboard') {
// //         const cleanPath = menu.path.replace(/^\//, '');
// //         console.log('🛣️ Adding route:', cleanPath);
        
// //         routes.push(
// //           <Route
// //             key={menu.id}
// //             path={cleanPath}
// //             element={<DynamicPage title={menu.title} />}
// //           />
// //         );
// //       }

// //       if (menu.children && menu.children.length > 0) {
// //         routes.push(...renderRecursive(menu.children));
// //       }

// //       return routes;
// //     });
// //   };

// //   return renderRecursive(menus);
// // };

// // // کامپوننت برای صفحات داینامیک
// // const DynamicPage = ({ title }) => {
// //   return (
// //     <div className="dynamic-page">
// //       <div className="page-header">
// //         <h1>{title}</h1>
// //         <p>صفحه {title}</p>
// //       </div>
// //       <div className="page-content">
// //         <div className="card">
// //           <h2>محتوای صفحه</h2>
// //           <p>این صفحه به صورت داینامیک بر اساس منوها ایجاد شده است.</p>
// //           <p>عنوان صفحه: <strong>{title}</strong></p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // کامپوننت برای صفحه 404
// // const NotFoundPage = () => {
// //   return (
// //     <div className="not-found-page">
// //       <div className="card">
// //         <h1>۴۰۴ - صفحه پیدا نشد</h1>
// //         <p>صفحه‌ای که به دنبال آن هستید وجود ندارد.</p>
// //         <button 
// //           onClick={() => window.location.href = '/dashboard'}
// //           className="btn btn-primary"
// //         >
// //           بازگشت به داشبورد
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <div className="App">
// //           <AppContent />
// //         </div>
// //       </Router>
// //     </AuthProvider>
// //   );
// // }

// // export default App;


// // App.js

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import Layout from './components/common/Layout/Layout';
// import Login from './components/auth/Login/Login';
// import Dashboard from './components/dashboard/Dashboard/Dashboard';
// import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';
// import Project from './components/page/project/Project';
// import TodoBoard from './components/page/todo/TodoBoard';
// import UserManagement from './components/page/user/UserManagement';
// import Profile from './components/page/profile/Profile';
// import MenuAccess from './components/page/menuAccess/MenuAccess';
// import Role from './components/page/role/Role';
// import Tag from './components/page/tag/Tag';
// import HomePage from './components/page/homePage/HomePage';
// import Archive from './components/page/archive/Archive';
// import './styles/globals.css';
// import './styles/animations.css';


// // Layout wrapper با Outlet
// const LayoutWrapper = () => {
//   return (
//     <Layout>
//       <Outlet />
//     </Layout>
//   );
// };

// // کامپوننت اصلی اپلیکیشن
// const AppContent = () => {
//   const { isAuthenticated, isLoading } = useAuth();

//   console.log('🔐 Auth Status:', { isAuthenticated, isLoading });

//   if (isLoading) {
//     return <LoadingSpinner fullScreen={true} text="در حال بارگذاری..." />;
//   }

//   return (
//     <Routes>
//       {/* روت‌های عمومی */}
//       <Route path="/login" element={
//         !isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />
//       } />
      
//       {/* روت‌های protected */}
//       <Route path="/*" element={
//         isAuthenticated ? <AuthenticatedApp /> : <Navigate to="/login" replace />
//       } />
//     </Routes>
//   );
// };

// // اپلیکیشن برای کاربران authenticated
// const AuthenticatedApp = () => {
//   const { menus } = useAuth();
  
//   console.log('🏠 AuthenticatedApp - menus:', menus);

//   return (
//     <Routes>
//       <Route path="/" element={<LayoutWrapper />}>
//         <Route index element={<Navigate to="dashboard" replace />} />
//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="project" element={<Project />} />
//    {/* <Route path="TodoBoard" element={<TodoBoard />} /> */}
//    <Route path="/TodoBoard" element={<TodoBoard />} />
//   <Route path="/Archive" element={<Archive />} />
   
//    <Route path="/UserManagement" element={<UserManagement />} />
//    <Route path="/MenuAccess" element={<MenuAccess />} />
//    <Route path="/Role" element={<Role />} />
// <Route path="/Tag" element={<Tag />} />


   
   
   
//    <Route path="/profile" element={<Profile />} />

   
        
//         {/* روت‌های داینامیک */}
//         {renderMenuRoutes(menus)}
//         <Route path="*" element={<NotFoundPage />} />
//       </Route>
//     </Routes>
//   );
// };

// // تابع برای رندر روت‌های منو
// const renderMenuRoutes = (menus) => {
//   if (!menus || !Array.isArray(menus)) return null;

//   const renderRecursive = (menuItems) => {
//     return menuItems.flatMap((menu) => {
//       const routes = [];

//       if (menu.path && menu.path !== '#' && menu.path !== '/dashboard' && menu.path !== '/project') {
//         const cleanPath = menu.path.replace(/^\//, '');
//         console.log('🛣️ Adding route:', cleanPath);
        
//         routes.push(
//           <Route
//             key={menu.id}
//             path={cleanPath}
//             element={<DynamicPage title={menu.title} />}
//           />
//         );
//       }

//       if (menu.children && menu.children.length > 0) {
//         routes.push(...renderRecursive(menu.children));
//       }

//       return routes;
//     });
//   };

//   return renderRecursive(menus);
// };

// // کامپوننت برای صفحات داینامیک
// const DynamicPage = ({ title }) => {
//   return (
//     <div className="dynamic-page">
//       <div className="page-header">
//         <h1>{title}</h1>
//         <p>صفحه {title}</p>
//       </div>
//       <div className="page-content">
//         <div className="card">
//           <h2>محتوای صفحه</h2>
//           <p>این صفحه به صورت داینامیک بر اساس منوها ایجاد شده است.</p>
//           <p>عنوان صفحه: <strong>{title}</strong></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // کامپوننت برای صفحه 404
// const NotFoundPage = () => {
//   return (
//     <div className="not-found-page">
//       <div className="card">
//         <h1>۴۰۴ - صفحه پیدا نشد</h1>
//         <p>صفحه‌ای که به دنبال آن هستید وجود ندارد.</p>
//         <button 
//           onClick={() => window.location.href = '/dashboard'}
//           className="btn btn-primary"
//         >
//           بازگشت به داشبورد
//         </button>
//       </div>
//     </div>
//   );
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <AppContent />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

// // // App.js
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
// // import { AuthProvider, useAuth } from './context/AuthContext';
// // import Layout from './components/common/Layout/Layout';
// // import Login from './components/auth/Login/Login';
// // import Dashboard from './components/dashboard/Dashboard/Dashboard';
// // import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';
// // import Project from './components/page/project/Project';
// // import TodoBoard from './components/page/todo/TodoBoard';
// // import UserManagement from './components/page/user/UserManagement';
// // import Profile from './components/page/profile/Profile';
// // import MenuAccess from './components/page/menuAccess/MenuAccess';
// // import Role from './components/page/role/Role';
// // import Tag from './components/page/tag/Tag';
// // import HomePage from './components/page/homePage/HomePage';
// // import './styles/globals.css';
// // import './styles/animations.css';

// // // کامپوننت اصلی اپلیکیشن
// // const AppContent = () => {
// //   const { isAuthenticated, isLoading } = useAuth();

// //   console.log('🔐 Auth Status:', { isAuthenticated, isLoading });

// //   if (isLoading) {
// //     return <LoadingSpinner fullScreen={true} text="در حال بارگذاری..." />;
// //   }

// //   return (
// //     <Routes>
// //       {/* روت عمومی برای صفحه اصلی / لاگین */}
// //       <Route path="/" element={
// //         !isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />
// //       } />
      
// //       {/* روت لاگین */}
// //       <Route path="/login" element={
// //         !isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />
// //       } />
      
// //       {/* روت‌های protected */}
// //       <Route path="/*" element={
// //         isAuthenticated ? <AuthenticatedApp /> : <Navigate to="/login" replace />
// //       } />
// //     </Routes>
// //   );
// // };

// // // اپلیکیشن برای کاربران authenticated
// // const AuthenticatedApp = () => {
// //   const { menus } = useAuth();
  
// //   console.log('🏠 AuthenticatedApp - menus:', menus);

// //   return (
// //     <Routes>
// //       {/* همه روت‌های protected داخل Layout قرار می‌گیرند */}
// //       <Route element={<LayoutWithOutlet />}>
// //         <Route index element={<Navigate to="/dashboard" replace />} />
// //         <Route path="dashboard" element={<Dashboard />} />
// //         <Route path="project" element={<Project />} />
// //         <Route path="todo-board" element={<TodoBoard />} />
// //         <Route path="user-management" element={<UserManagement />} />
// //         <Route path="menu-access" element={<MenuAccess />} />
// //         <Route path="role" element={<Role />} />
// //         <Route path="tag" element={<Tag />} />
// //         <Route path="profile" element={<Profile />} />
        
// //         {/* روت‌های داینامیک */}
// //         {renderMenuRoutes(menus)}
        
// //         {/* روت 404 */}
// //         <Route path="*" element={<NotFoundPage />} />
// //       </Route>
// //     </Routes>
// //   );
// // };

// // // کامپوننت جداگانه برای Layout با Outlet
// // const LayoutWithOutlet = () => {
// //   return (
// //     <Layout>
// //       <Outlet />
// //     </Layout>
// //   );
// // };

// // // تابع برای رندر روت‌های منو
// // const renderMenuRoutes = (menus) => {
// //   if (!menus || !Array.isArray(menus)) return null;

// //   const renderRecursive = (menuItems) => {
// //     return menuItems.flatMap((menu) => {
// //       const routes = [];

// //       // فقط منوهایی که path معتبر دارند
// //       if (menu.path && menu.path !== '#' && menu.path !== '/') {
// //         // حذف اسلش اول از path
// //         const cleanPath = menu.path.startsWith('/') ? menu.path.slice(1) : menu.path;
        
// //         // چک کردن که مسیر تکراری نباشد
// //         const existingPaths = ['dashboard', 'project', 'todo-board', 'user-management', 'menu-access', 'role', 'tag', 'profile'];
// //         if (!existingPaths.includes(cleanPath)) {
// //           console.log('🛣️ Adding dynamic route:', cleanPath);
          
// //           routes.push(
// //             <Route
// //               key={menu.id || menu.title}
// //               path={cleanPath}
// //               element={<DynamicPage title={menu.title} />}
// //             />
// //           );
// //         }
// //       }

// //       // رندر کردن children
// //       if (menu.children && menu.children.length > 0) {
// //         routes.push(...renderRecursive(menu.children));
// //       }

// //       return routes;
// //     });
// //   };

// //   return renderRecursive(menus);
// // };

// // // کامپوننت برای صفحات داینامیک
// // const DynamicPage = ({ title }) => {
// //   return (
// //     <div className="dynamic-page">
// //       <div className="page-header">
// //         <h1>{title}</h1>
// //         <p>صفحه {title}</p>
// //       </div>
// //       <div className="page-content">
// //         <div className="card">
// //           <h2>محتوای صفحه</h2>
// //           <p>این صفحه به صورت داینامیک بر اساس منوها ایجاد شده است.</p>
// //           <p>عنوان صفحه: <strong>{title}</strong></p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // کامپوننت برای صفحه 404
// // const NotFoundPage = () => {
// //   return (
// //     <div className="not-found-page">
// //       <div className="card">
// //         <h1>۴۰۴ - صفحه پیدا نشد</h1>
// //         <p>صفحه‌ای که به دنبال آن هستید وجود ندارد.</p>
// //         <button 
// //           onClick={() => window.location.href = '/dashboard'}
// //           className="btn btn-primary"
// //         >
// //           بازگشت به داشبورد
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <div className="App">
// //           <AppContent />
// //         </div>
// //       </Router>
// //     </AuthProvider>
// //   );
// // }

// // export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/common/Layout/Layout';
import Login from './components/auth/Login/Login';
import OTPLogin from './components/auth/Login/OTPLogin';
import Dashboard from './components/dashboard/Dashboard/Dashboard';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';
import Project from './components/page/project/Project';
import TodoBoard from './components/page/todo/TodoBoard';
import UserManagement from './components/page/user/UserManagement';
import Profile from './components/page/profile/Profile';
import MenuAccess from './components/page/menuAccess/MenuAccess';
import Role from './components/page/role/Role';
import Tag from './components/page/tag/Tag';
import HomePage from './components/page/homePage/HomePage';
import Archive from './components/page/archive/Archive';
import HotelPage from './components/page/hotel/HotelPage';
import RealEstatePage from './components/page/realestate/RealEstatePage';
import RealEstatePageDetail from './components/page/realEstateDetails/RealEstatePageDetail'
import RealEstateDetailPageItem from './components/page/RealEstateDetailPageItem/RealEstateDetailPageItem'
import MainLayout from './components/layout/MainLayout';  // <==== ایمپورت MainLayout
import UserPropertiesPanel from '../src/components/page/manager/realEstate/UserPropertiesPanel'
import './styles/globals.css';
import './styles/animations.css';

// Layout wrapper با Outlet
const LayoutWrapper = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

// کامپوننت اصلی اپلیکیشن
const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('🔐 Auth Status:', { isAuthenticated, isLoading });

  if (isLoading) {
    return <LoadingSpinner fullScreen={true} text="در حال بارگذاری..." />;
  }

  return (
    <Routes>
      {/* صفحه اصلی - هتل (برای همه قابل دسترس) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<RealEstatePage />} />
        <Route path="realestate" element={<RealEstatePage />} />
              <Route path="RealEstatePageDetail" element={<RealEstatePageDetail />} />
  <Route path="RealEstateDetailPageItem" element={<RealEstateDetailPageItem />} />
              
        
        <Route path="hotel" element={<HotelPage />} />
        <Route path="hotel/tehran" element={<HotelPage />} />
      </Route>
      
      {/* روت‌های عمومی */}
      <Route path="/login" element={<Login />} />
      <Route path="/otp-login" element={<OTPLogin />} />
      
      {/* روت‌های محافظت شده */}
      <Route path="/*" element={
        isAuthenticated ? <AuthenticatedApp /> : <Navigate to="/login" replace />
      } />
    </Routes>
  );
};

// اپلیکیشن برای کاربران authenticated
const AuthenticatedApp = () => {
  const { menus } = useAuth();
  
  console.log('🏠 AuthenticatedApp - menus:', menus);

  return (
    <Routes>
      <Route path="/" element={<LayoutWrapper />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="project" element={<Project />} />
        <Route path="TodoBoard" element={<TodoBoard />} />
        <Route path="Archive" element={<Archive />} />
        <Route path="UserManagement" element={<UserManagement />} />
        <Route path="MenuAccess" element={<MenuAccess />} />
        <Route path="Role" element={<Role />} />
        <Route path="Tag" element={<Tag />} />
        <Route path="profile" element={<Profile />} />
<Route path="UserPropertiesPanel" element={<UserPropertiesPanel />} />
        
        
        {/* روت‌های داینامیک */}
        {renderMenuRoutes(menus)}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

// تابع برای رندر روت‌های منو
const renderMenuRoutes = (menus) => {
  if (!menus || !Array.isArray(menus)) return null;

  const renderRecursive = (menuItems) => {
    return menuItems.flatMap((menu) => {
      const routes = [];

      if (menu.path && menu.path !== '#' && menu.path !== '/dashboard' && menu.path !== '/project') {
        const cleanPath = menu.path.replace(/^\//, '');
        console.log('🛣️ Adding route:', cleanPath);
        
        routes.push(
          <Route
            key={menu.id}
            path={cleanPath}
            element={<DynamicPage title={menu.title} />}
          />
        );
      }

      if (menu.children && menu.children.length > 0) {
        routes.push(...renderRecursive(menu.children));
      }

      return routes;
    });
  };

  return renderRecursive(menus);
};

// کامپوننت برای صفحات داینامیک
const DynamicPage = ({ title }) => {
  return (
    <div className="dynamic-page">
      <div className="page-header">
        <h1>{title}</h1>
        <p>صفحه {title}</p>
      </div>
      <div className="page-content">
        <div className="card">
          <h2>محتوای صفحه</h2>
          <p>این صفحه به صورت داینامیک بر اساس منوها ایجاد شده است.</p>
          <p>عنوان صفحه: <strong>{title}</strong></p>
        </div>
      </div>
    </div>
  );
};

// کامپوننت برای صفحه 404
const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="card">
        <h1>۴۰۴ - صفحه پیدا نشد</h1>
        <p>صفحه‌ای که به دنبال آن هستید وجود ندارد.</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="btn btn-primary"
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;