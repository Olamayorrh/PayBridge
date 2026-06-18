export function DashboardStatCard({ icon: Icon, label, value, helper }) {
  return (
    <article className="flex min-h-28 items-center gap-4 rounded-lg bg-white p-5 shadow-sm">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-[#151827] text-white">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-[#15182773]">{label}</p>
        <p className="mt-1 text-2xl font-black text-[#151827]">{value}</p>
        {helper && <p className="mt-1 text-xs font-semibold text-[#15182773]">{helper}</p>}
      </div>
    </article>
  );
}
