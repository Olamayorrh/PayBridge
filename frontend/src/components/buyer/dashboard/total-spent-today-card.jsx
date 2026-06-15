export function TotalSpentTodayCard() {
  return (
    <article className="flex min-h-72 flex-col justify-between rounded-lg bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-[#15182773]">Total spent today</p>
        <h2 className="mt-2 text-4xl font-black text-coarse-wool">$202.50</h2>
      </div>

      <div className="flex h-36 items-end justify-between gap-3">
        {[78, 44, 62, 36, 88, 54, 70].map((height, index) => (
          <div key={index} className="flex flex-1  h-full items-end rounded-full">
            <div
              className="w-full rounded-full bg-[#151827]"
              style={{ height: `${height}%` }}
            />
          </div>
        ))}
      </div>
    </article>
  );
}
