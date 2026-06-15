const points = [
  '0,94',
  '42,86',
  '84,91',
  '126,68',
  '168,74',
  '210,62',
  '252,70',
  '294,55',
  '336,63',
  '378,49',
  '420,42',
  '462,50',
  '504,36',
  '546,28',
  '588,34',
  '630,19',
  '672,25',
  '714,12',
];

export function SpendingChartCard() {
  return (
    <article className="rounded-lg bg-white p-6 shadow-sm xl:col-span-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-coarse-wool/45">Total Spent</p>
          <div className="mt-1 flex items-end gap-3">
            <h2 className="text-4xl font-black text-coarse-wool">$682.50</h2>
            <span className="mb-1 text-xs font-bold text-emerald-500">+2.45%</span>
          </div>
        </div>
        <div className="rounded-lg bg-coarse-wool px-3 py-2 text-xs font-bold text-white">
          This month
        </div>
      </div>

      <div className="mt-7 h-52 w-full">
        <svg className="h-full w-full" viewBox="0 0 720 170" role="img" aria-label="Total spent graph">
          <defs>
            <linearGradient id="spendFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#151827" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#151827" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[40, 80, 120, 160].map((y) => (
            <line
              key={y}
              x1="0"
              x2="720"
              y1={y}
              y2={y}
              stroke="#151827"
              strokeDasharray="6 8"
              strokeOpacity="0.08"
            />
          ))}
          <path d={`M ${points.join(' L ')} L 714 170 L 0 170 Z`} fill="url(#spendFill)" />
          <polyline
            fill="none"
            points={points.join(' ')}
            stroke="#151827"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <circle cx="504" cy="36" r="8" fill="#fff" stroke="#151827" strokeWidth="4" />
          <g>
            <rect x="472" y="0" width="66" height="26" rx="8" fill="#151827" />
            <text x="505" y="17" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
              $108.00
            </text>
          </g>
        </svg>
      </div>
    </article>
  );
}
