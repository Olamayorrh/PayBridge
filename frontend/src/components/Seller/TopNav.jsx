import React from 'react';
import { RiWalletFill, RiAddLine, RiLogoutBoxRLine } from '@remixicon/react';
import Header from './Header';
import { Link, useLocation } from 'react-router-dom';

const TopNav = () => {
  const location = useLocation();
  const isDashboard =
    location.pathname === '/seller' ||
    location.pathname === '/dashboard' ||
    location.pathname === '/seller/';

  return (
    <div className="w-full flex flex-col mb-6">
      {/* Top Section: Header + Profile Area */}
      <div className="flex justify-between items-center w-full p-4 bg-white shadow-sm rounded-2xl gap-3 min-w-0">
        <Header />

        <div className="flex items-center gap-4">
          <div className="relative group cursor-pointer">
            <img
              src="https://ui-avatars.com/api/?name=John+Doe&background=random"
              alt="Profile"
              className="w-5 h-5 md:w-10 md:h-10 rounded-full border-2 border-slate-200"
            />
          </div>
          <div className="hidden md:flex flex-col border-0 items-center min-w-0">
            <span className="font-semibold text-gray-800 truncate max-w-[120px]">John Doe</span>
            <span className="text-xs text-gray-500 font-medium bg-slate-100 rounded-full mt-1 p-2">
              Seller Account
            </span>
          </div>

          <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors border border-slate-200 px-3 py-1.5 rounded-lg ml-2">
            <RiLogoutBoxRLine size={18} />
            <span className="hidden sm:inline text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
