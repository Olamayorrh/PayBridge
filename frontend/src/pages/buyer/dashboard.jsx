import { RiCheckboxCircleLine, RiTimeLine } from '@remixicon/react';
import { DashboardHeader } from '../../components/buyer/dashboard/dashboard-header';
import { DashboardStatCard } from '../../components/buyer/dashboard/dashboard-stat-card';
import { PaymentCodeCard } from '../../components/buyer/dashboard/payment-code-card';
import { RecentTransactionsCard } from '../../components/buyer/dashboard/recent-transactions-card';
import { SpendingChartCard } from '../../components/buyer/dashboard/spending-chart-card';
import { TotalSpentTodayCard } from '../../components/buyer/dashboard/total-spent-today-card';
import { useCurrentUser } from '../../api/hooks';

export function BuyerDashBoard() {
  const { user } = useCurrentUser();

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5">
      <DashboardHeader firstName={user?.firstName} />

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
  );
}
