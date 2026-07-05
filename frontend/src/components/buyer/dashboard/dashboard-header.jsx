import { RiSearchLine } from '@remixicon/react';

export function DashboardHeader({ firstName }) {
  return (
    <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold text-coarse-wool/50">
          Hi {firstName || 'buyer'},
        </p>
        <h1 className="mt-1 text-3xl font-black text-coarse-wool md:text-4xl">
          Welcome to PayBridge!
        </h1>
      </div>

      <label className="flex h-12 w-full hidden items-center gap-3 rounded-lg bg-white px-4 text-coarse-wool shadow-sm md:max-w-xs">
        <RiSearchLine size={18} className="text-coarse-wool/45" />
        <input
          type="search"
          placeholder="Search"
          className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-coarse-wool/35"
        />
      </label>
    </header>
  );
}
