import React from 'react';
import SideBar from '../components/Seller/SideBar';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Seller/Header';

const SellerLayout = () => {
  const location = useLocation();
  const isDashboard =
    location.pathname === '/seller' ||
    location.pathname === '/dashboard' ||
    location.pathname === '/seller/';

  return (
    <div className="flex w-full min-h-screen bg-slate-50 overflow-x-hidden">
      <SideBar />

      <div className="bg-slate-50 flex-1 md:ml-64 px-4 min-h-screen pb-10 overflow-x-hidden min-w-0">
        {!isDashboard && (
          <div className="pt-6 pb-2">
            <Header />
          </div>
        )}
        <div className={isDashboard ? 'mt-4' : 'mt-8 md:mt-12'}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
