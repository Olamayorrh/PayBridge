import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { RiMenuLine } from '@remixicon/react';
import { Sidebar } from '../../components/buyer/sidebar';

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
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-black/5 bg-white px-4 shadow-sm lg:hidden">
        <div className="flex items-center gap-3">
          <img className="size-8" src="/temporary-logo.png" alt="PayBridge logo" />
          <p className="text-lg font-black leading-none tracking-wide">PayBridge</p>
        </div>

        <button
          type="button"
          aria-label="Open sidebar"
          aria-expanded={isSidebarOpen}
          onClick={() => setIsSidebarOpen(true)}
          className="flex size-10 items-center justify-center rounded-lg text-coarse-wool transition-colors hover:bg-[#15182712]"
        >
          <RiMenuLine size={23} />
        </button>
      </header>

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar backdrop"
          className="fixed inset-0 z-40 bg-black/35 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 lg:hidden ${
          isSidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <Sidebar
          variant="mobile"
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(false)}
          onNavigate={() => setIsSidebarOpen(false)}
        />
      </div>

      <div className="flex min-h-screen lg:h-screen lg:overflow-hidden">
        <div className="hidden lg:block lg:h-screen lg:shrink-0">
          <Sidebar
            variant="desktop"
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen((current) => !current)}
          />
        </div>

        <main className="min-w-0 flex-1 px-4 pb-6 pt-22 sm:px-6 lg:h-screen lg:overflow-y-auto lg:px-8 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
