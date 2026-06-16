const transactions = [
  { id: 'PB-1048', seller: 'Ada Stores', status: 'Completed', amount: '$120.00', date: 'Today' },
  { id: 'PB-1047', seller: 'Kemi Gadgets', status: 'Pending', amount: '$82.50', date: 'Today' },
  { id: 'PB-1046', seller: 'Prime Wears', status: 'Completed', amount: '$240.00', date: 'Yesterday' },
  { id: 'PB-1045', seller: 'Nova Supplies', status: 'Pending', amount: '$55.00', date: 'Jun 12' },
];

export function RecentTransactionsCard() {
  return (
    <article className="rounded-lg bg-white p-6 shadow-sm xl:col-span-2">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#15182773]">Escrow activity</p>
          <h2 className="mt-1 text-2xl font-black text-coarse-wool">Recent transactions</h2>
        </div>
        <button
          type="button"
          className="rounded-lg border border-coarse-wool/10 px-4 py-2 text-sm font-bold text-coarse-wool transition-colors hover:bg-[#15182773] hover:text-white"
        >
          View all
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg ">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="grid grid-cols-[1fr_auto] gap-3 border-b border-black/5 px-4 py-4 last:border-b-0 md:grid-cols-[1fr_1fr_auto_auto]"
          >
            <div>
              <p className="text-sm font-black text-coarse-wool">{transaction.seller}</p>
              <p className="mt-1 text-xs font-semibold text-coarse-wool/40">{transaction.id}</p>
            </div>
            <p className="hidden self-center text-sm font-semibold text-coarse-wool/50 md:block">
              {transaction.date}
            </p>
            <span
              className={`self-center rounded-full px-3 py-1 text-xs font-black ${
                transaction.status === 'Completed'
                  ? 'bg-coarse-wool text-white'
                  : 'bg-the-bright-side/25 text-coarse-wool'
              }`}
            >
              {transaction.status}
            </span>
            <p className="self-center text-right text-sm font-black text-coarse-wool">
              {transaction.amount}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
