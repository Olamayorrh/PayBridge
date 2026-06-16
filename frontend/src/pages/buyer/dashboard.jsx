import { RiCheckboxCircleLine, RiTimeLine } from '@remixicon/react';
import { DashboardHeader } from '../../components/buyer/dashboard/dashboard-header';
import { DashboardMobileNav } from '../../components/buyer/dashboard/dashboard-mobile-nav';
import { Sidebar } from '../../components/buyer/sidebar';
import { DashboardStatCard } from '../../components/buyer/dashboard/dashboard-stat-card';
import { PaymentCodeCard } from '../../components/buyer/dashboard/payment-code-card';
import { RecentTransactionsCard } from '../../components/buyer/dashboard/recent-transactions-card';
import { SpendingChartCard } from '../../components/buyer/dashboard/spending-chart-card';
import { TotalSpentTodayCard } from '../../components/buyer/dashboard/total-spent-today-card';

export function BuyerDashBoard() {
  return (
    <main className="min-h-screen bg-[#F4F6FB] font-inter text-coarse-wool">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-5">
            <DashboardMobileNav />
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
    </main>
  );
}
