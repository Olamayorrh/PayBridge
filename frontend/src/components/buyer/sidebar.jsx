import { RiDashboardLine, RiExchangeDollarLine, RiSettings3Line, RiMenuLine } from '@remixicon/react';

const navItems = [
  { label: 'Dashboard', icon: RiDashboardLine, active: true },
  { label: 'Transactions', icon: RiExchangeDollarLine },
  { label: 'Settings', icon: RiSettings3Line },
];

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 flex-col justify-between bg-white px-6 py-8 text-coarse-wool lg:flex">
      <div>
        <div className='flex justify-end hidden'>
          <RiMenuLine />
        </div>
        <div className="flex items-center gap-3">
          <img className="size-11" src="/temporary-logo.png" alt="PayBridge logo" />
          <div>
            <p className="text-xl font-black leading-none tracking-wide">PayBridge</p>
            <p className="text-xs hidden font-bold uppercase text-coarse-wool/45">Seller</p>
          </div>
        </div>

        <nav className="mt-16 flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className={`flex h-12 items-center gap-3 rounded-lg px-4 text-left text-sm font-semibold transition-colors ${item.active
                    ? 'bg-[#151827] text-white shadow-sm'
                    : 'text-[#15182799] hover:bg-[#15182727] hover:text-[#151827]'
                  }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="rounded-lg bg-[#151827] hidden px-5 py-6 text-white">
        <p className="text-sm font-semibold">Trade with confidence</p>
        <p className="mt-2 text-xs leading-5 text-white/65">
          Keep payments protected until every agreement is fulfilled.
        </p>
      </div>
    </aside>
  );
}
