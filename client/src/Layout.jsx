import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const Layout = () => {
  const location = useLocation();

  // Define paths where Sidebar should be hidden
  const hideSidebarPaths = ['/', '/login', '/register', '/dev/verify'];
  const shouldShowSidebar = !hideSidebarPaths.includes(location.pathname);

  return (
    <div className="flex">
      {shouldShowSidebar && (
        <div className="md:w-80">
          <Sidebar />
        </div>
      )}
      <div className="flex flex-col flex-1 min-h-screen">

        <div className="flex-1 overflow-y-auto hide-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
