import React, { useContext } from 'react';
import { usercontext } from '../Context';

const Header = () => {
  const { sidebarOpen, setSidebarOpen, location, getPageTitle } = useContext(usercontext);

  return (
    <div className="flex items-center gap-4">
      <button
        className="md:hidden text-2xl font-bold cursor-pointer"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>
      <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle()}</h1>
    </div>
  );
};

export default Header;
