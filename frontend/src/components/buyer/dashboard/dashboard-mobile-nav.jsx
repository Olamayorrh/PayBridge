import { RiDashboardLine, RiExchangeDollarLine, RiSettings3Line } from '@remixicon/react';

const navItems = [
  { label: 'Dashboard', icon: RiDashboardLine, active: true },
  { label: 'Transactions', icon: RiExchangeDollarLine },
  { label: 'Settings', icon: RiSettings3Line },
];

export function DashboardMobileNav() {
  return (
    <nav className="grid grid-cols-3 gap-2 rounded-lg bg-white p-2 shadow-sm lg:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.label}
            type="button"
            className={`flex h-12 items-center justify-center gap-2 rounded-lg text-xs font-black ${
              item.active ? 'bg-coarse-wool text-white' : 'text-coarse-wool/55'
            }`}
          >
            <Icon size={17} />
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
