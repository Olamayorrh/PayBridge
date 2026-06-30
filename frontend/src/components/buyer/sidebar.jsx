import {
  RiCloseLine,
  RiDashboardLine,
  RiExchangeDollarLine,
  RiMenuLine,
  RiSettings3Line,
  RiMenuFold2Line,
  RiMenuFoldLine
} from '@remixicon/react';
import { cn } from '../../utils/common';

const navItems = [
  { label: 'Dashboard', icon: RiDashboardLine, active: true },
  { label: 'Transactions', icon: RiExchangeDollarLine },
  { label: 'Settings', icon: RiSettings3Line },
];

export function Sidebar({ isOpen, onToggle, variant = 'desktop' }) {
  const isMobile = variant === 'mobile';
  const showMobileCloseIcon = isOpen && isMobile 
  const ToggleIcon = isMobile || isOpen ? ( showMobileCloseIcon? RiCloseLine: RiMenuFoldLine) : RiMenuFold2Line;
  const showLabels = isMobile || isOpen;

  return (
    <aside
      className={`flex h-screen shrink-0 flex-col justify-between overflow-hidden bg-white py-8 text-coarse-wool shadow-sm ${
        isMobile
          ? `w-72 max-w-[82vw] px-6 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
          : `transition-[width] duration-300 ${isOpen ? 'w-64 px-6' : 'w-20 px-3'}`
      }`}
    >
      <div>
        <div className={`flex items-center w-full ${showLabels ? 'justify-between' : 'justify-end'}`}>
          <div className={`flex items-center gap-3 ${showLabels ? 'flex' : 'hidden'}`}>
            <img className="size-6" src="/temporary-logo.png" alt="PayBridge logo" />
            <p className="text-xl font-black leading-none tracking-wide">PayBridge</p>
          </div>
          <div className={cn(!isOpen &&"border-b-coarse-wool/15 border-b",)}>
          <button
            type="button"
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={isOpen}
            onClick={onToggle}
            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-coarse-wool"
          >
            <ToggleIcon size={22} />
          </button>
          </div>
        </div>

        <nav className="mt-16 flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                title={showLabels ? undefined : item.label}
                className={`flex h-12 items-center rounded-lg text-left text-sm font-semibold transition-colors ${
                  showLabels ? 'gap-3 px-4' : 'justify-center px-0'
                } ${
                  item.active
                    ? 'bg-[#151827] text-white shadow-sm'
                    : 'text-[#15182799] hover:bg-[#15182727] hover:text-[#151827]'
                }`}
              >
                <Icon size={20} />
                {showLabels && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
