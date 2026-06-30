import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { usercontext } from '../Context';
import Header from './Header';
import { Paths } from '../../data';

import { RiSettings3Line } from '@remixicon/react';

// Custom designed PayBridge Logo SVG Component
const PayBridgeLogo = () => (
  <div className="flex items-center gap-2">
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#f97316" />
      <path
        d="M12 28V12C12 12 14.5 12 18 12C21.5 12 24 14 24 17.5C24 21 21.5 23 18 23H15V28H12Z"
        fill="#151827"
      />
      <path
        d="M28 28V19C28 19 25.5 19 22 19C18.5 19 16 17 16 13.5C16 10 18.5 8 22 8H25V13H28Z"
        fill="#151827"
        fillOpacity="0.8"
      />
    </svg>
    <p className="text-2xl font-bold tracking-tight text-[#151827]">
      Pay<span className="text-orange-500">Bridge</span>
    </p>
  </div>
);

const SideBar = () => {
  const { sidebarOpen, setSidebarOpen, activeItem, setActiveItem } = useContext(usercontext);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between bg-white w-64 transition-transform duration-300 border-r border-slate-100 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
        style={{ height: '100dvh', minHeight: '100%' }}
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center px-6 py-6 border-b border-slate-100">
            <PayBridgeLogo />
            <p
              className="text-[1.5rem] font-medium cursor-pointer md:hidden text-gray-400 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              x
            </p>
          </div>
          <ul className="allLinks p-4 flex flex-col gap-2 transition-all duration-200">
            {Paths.map((val, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={val.to}
                    onClick={() => setSidebarOpen(false)}
                    end={val.to === '/seller'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium text-sm transition-all duration-200 ${
                        isActive
                          ? 'bg-[#151827] text-white shadow-sm shadow-slate-900/10'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-[#151827]'
                      }`
                    }
                  >
                    <span className="w-5 h-5 flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5">
                      {val.icons}
                    </span>
                    <span className="tracking-wide">{val.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-4 border-t border-slate-100 mb-4">
          <NavLink
            to="/Buyer/settings"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-[#151827] text-white shadow-sm shadow-slate-900/10'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#151827]'
              }`
            }
          >
            <span className="w-5 h-5 flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5">
              <RiSettings3Line />
            </span>
            <span className="tracking-wide">SETTINGS</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SideBar;
