import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  RiExchangeDollarLine,
  RiFileWarningLine,
  RiHome5Line,
  RiSettings3Line,
} from '@remixicon/react';
import { Sidebar } from '../../components/buyer/sidebar';

const mobileNavItems = [
  { label: 'Home', icon: RiHome5Line, to: '/buyer', end: true },
  { label: 'Transactions', icon: RiExchangeDollarLine, to: '/buyer/transactions' },
  { label: 'Disputes', icon: RiFileWarningLine, to: '/buyer/disputes' },
  { label: 'Settings', icon: RiSettings3Line, to: '/buyer/settings' },
];

export function BuyerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    return window.matchMedia('(min-width: 1024px)').matches;
  });

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const handleBreakpointChange = (event) => {
      setIsSidebarOpen(event.matches);
    };

    setIsSidebarOpen(desktopQuery.matches);
    desktopQuery.addEventListener('change', handleBreakpointChange);

    return () => desktopQuery.removeEventListener('change', handleBreakpointChange);
  }, []);

  return (
    <div className="bg-[#F4F6FB] font-inter text-coarse-wool">
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center border-b border-black/5 bg-white px-4 shadow-sm lg:hidden">
        <div className="flex items-center gap-3">
          <img className="size-8" src="/temporary-logo.png" alt="PayBridge logo" />
          <p className="text-lg font-black leading-none tracking-wide">PayBridge</p>
        </div>
      </header>

      <div className="flex min-h-screen lg:h-screen lg:overflow-hidden">
        <div className="hidden lg:block lg:h-screen lg:shrink-0">
          <Sidebar
            variant="desktop"
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen((current) => !current)}
          />
        </div>

        <main className="min-w-0 flex-1 px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-22 sm:px-6 lg:h-screen lg:overflow-y-auto lg:px-8 lg:py-10">
          <Outlet />
        </main>
      </div>

      <nav
        aria-label="Buyer mobile navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgba(21,24,39,0.08)] backdrop-blur lg:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex min-h-16 flex-col items-center justify-center gap-1 rounded-lg px-1 text-xs font-black transition-colors ${
                    isActive ? 'text-coarse-wool' : 'text-[#64748b] hover:text-coarse-wool'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className='flex size-10 items-center justify-center  rounded-xl transition-colors'
                    >
                      <Icon size={25} />
                    </span>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
