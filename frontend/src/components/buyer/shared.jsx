import { RiCloseLine, RiInboxArchiveLine } from '@remixicon/react';

const statusStyles = {
  INVOICE_CREATED: 'bg-slate-50 text-slate-700',
  PAYMENT_PENDING: 'bg-amber-50 text-amber-700',
  PAYMENT_COMPLETED: 'bg-blue-50 text-blue-700',
  FUNDS_IN_ESCROW: 'bg-indigo-50 text-indigo-700',
  IN_TRANSIT: 'bg-cyan-50 text-cyan-700',
  DELIVERED_PENDING_CONFIRMATION: 'bg-orange-50 text-orange-700',
  DELIVERED_VERIFIED: 'bg-emerald-50 text-emerald-700',
  FUNDS_RELEASED: 'bg-emerald-50 text-emerald-700',
  DISPUTED: 'bg-rose-50 text-rose-700',
  REFUNDED: 'bg-sky-50 text-sky-700',
  CANCELLED: 'bg-slate-200 text-slate-600',
  OPEN: 'bg-orange-50 text-orange-700',
  UNDER_REVIEW: 'bg-indigo-50 text-indigo-700',
  MORE_EVIDENCE_NEEDED: 'bg-amber-50 text-amber-700',
  RESOLVED: 'bg-emerald-50 text-emerald-700',
  RELEASED_TO_SELLER: 'bg-slate-50 text-slate-700',
};

export function PageHeader({ title, description, actions }) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-black text-coarse-wool md:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-coarse-wool/55">
          {description}
        </p>
      </div>
      {actions && <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>}
    </header>
  );
}

export function SummaryCard({ icon: Icon, label, value, helper }) {
  return (
    <article className="rounded-lg bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-coarse-wool/50">{label}</p>
          <p className="mt-2 text-2xl font-black text-coarse-wool">{value}</p>
          {helper && <p className="mt-2 text-xs font-semibold text-coarse-wool/45">{helper}</p>}
        </div>
        {Icon && (
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#151827] text-white">
            <Icon size={20} />
          </div>
        )}
      </div>
    </article>
  );
}

export function StatusBadge({ status, label }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-3 py-1 text-xs font-black ${
        statusStyles[status] || 'bg-slate-100 text-slate-700'
      }`}
    >
      {label}
    </span>
  );
}

export function EmptyState({ title, description }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-lg bg-white p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-[#1518270d] text-coarse-wool/55">
        <RiInboxArchiveLine size={22} />
      </div>
      <h2 className="mt-4 text-lg font-black text-coarse-wool">{title}</h2>
      <p className="mt-2 max-w-md text-sm font-medium leading-6 text-coarse-wool/50">{description}</p>
    </div>
  );
}

export function ActionModal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <section className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg bg-white p-6 text-coarse-wool">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-black">{title}</h2>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-lg text-coarse-wool/60 hover:bg-[#15182712]"
          >
            <RiCloseLine size={20} />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </section>
    </div>
  );
}

export function Timeline({ items }) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <div key={`${item.label}-${item.timestamp}`} className="grid grid-cols-[auto_1fr] gap-4">
          <div className="flex flex-col items-center">
            <span
              className={`size-3 rounded-full ${
                item.state === 'completed'
                  ? 'bg-[#01ab6c]'
                  : item.state === 'active'
                    ? 'bg-[#FCC003]'
                    : 'bg-slate-200'
              }`}
            />
            <span className="mt-2 h-full w-px bg-slate-100 last:hidden" />
          </div>
          <div className="pb-2">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-black text-coarse-wool">{item.label}</p>
              <p className="text-xs font-semibold text-coarse-wool/45">{item.timestamp}</p>
            </div>
            <p className="mt-1 text-sm font-medium leading-6 text-coarse-wool/55">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DetailCard({ title, children, className = '' }) {
  return (
    <section className={`rounded-lg bg-white p-6 ${className}`}>
      <h2 className="text-xl font-black text-coarse-wool">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function ToggleRow({ label, description, enabled }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-[#F4F6FB] p-4">
      <div>
        <p className="text-sm font-black text-coarse-wool">{label}</p>
        {description && <p className="mt-1 text-xs font-semibold text-coarse-wool/45">{description}</p>}
      </div>
      <button
        type="button"
        aria-pressed={enabled}
        className={`relative h-7 w-12 rounded-full transition-colors ${
          enabled ? 'bg-[#151827]' : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute top-1 size-5 rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
