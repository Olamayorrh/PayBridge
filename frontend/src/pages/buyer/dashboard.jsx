import { useEffect, useState } from 'react';
import { RiCheckboxCircleLine, RiMenuLine, RiTimeLine,} from '@remixicon/react';
import { DashboardHeader } from '../../components/buyer/dashboard/dashboard-header';
import { Sidebar } from '../../components/buyer/sidebar';
import { DashboardStatCard } from '../../components/buyer/dashboard/dashboard-stat-card';
import { PaymentCodeCard } from '../../components/buyer/dashboard/payment-code-card';
import { RecentTransactionsCard } from '../../components/buyer/dashboard/recent-transactions-card';
import { SpendingChartCard } from '../../components/buyer/dashboard/spending-chart-card';
import { TotalSpentTodayCard } from '../../components/buyer/dashboard/total-spent-today-card';

export function BuyerDashBoard() {
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
    <div className=" bg-[#F4F6FB]  font-inter text-coarse-wool ">
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
        <Sidebar variant="mobile" isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex lg:overflow-hidden">
        <div className="hidden relative lg:block lg:sticky lg:h-full lg:shrink-0">
          <div className='fixed top-0 left-0'>
            <Sidebar
              variant="desktop"
              isOpen={isSidebarOpen}
              onToggle={() => setIsSidebarOpen((current) => !current)}
            />
          </div>
          <Sidebar
            variant="desktop"
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen((current) => !current)}
          />
        </div>

        <section className="min-w-0 flex-1 px-4 pb-6 pt-22 sm:px-6  lg:px-8 lg:py-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-5">
            <DashboardHeader />

            <section className="grid gap-5 md:grid-cols-2">
              <DashboardStatCard
                icon={RiCheckboxCircleLine}
                label="Completed transactions"
                value="128"
                helper="14 completed this month"
              />
              <DashboardStatCard
                icon={RiTimeLine}
                label="Pending transactions"
                value="12"
                helper="4 awaiting confirmation"
              />
            </section>

            <section className="grid gap-5 xl:grid-cols-3">
              <SpendingChartCard />
              <PaymentCodeCard />
            </section>

            <section className="grid gap-5 xl:grid-cols-3">
              <RecentTransactionsCard />
              <TotalSpentTodayCard />
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
