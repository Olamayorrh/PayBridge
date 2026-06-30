const transactions = [
  { id: 'PB-1048', seller: 'Ada Stores', status: 'Completed', amount: '$120.00', date: 'Today' },
  { id: 'PB-1047', seller: 'Kemi Gadgets', status: 'Pending', amount: '$82.50', date: 'Today' },
  {
    id: 'PB-1046',
    seller: 'Prime Wears',
    status: 'Completed',
    amount: '$240.00',
    date: 'Yesterday',
  },
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
      <div className="mt-6 overflow-hidden rounded-lg">
        <table className="w-full border-collapse">
          <thead className="sr-only">
            <tr>
              <th scope="col">Transaction</th>
              <th scope="col">Status</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="grid grid-cols-[1fr_auto] gap-x-3 border-b border-black/5 last:border-b-0 md:table-row"
              >
                <td className="block px-4 pb-2 pt-4 align-middle md:table-cell md:py-4">
                  <p className="text-sm font-black text-coarse-wool">{transaction.seller}</p>
                  <p className="mt-1 text-xs font-semibold text-coarse-wool/40">{transaction.id}</p>
                </td>

                <td className="block whitespace-nowrap px-4 pb-2 pt-4 text-right align-middle md:table-cell md:py-4 md:text-left">
                  <span
                    className={`inline-flex items-center justify-center rounded-sm px-3 py-1 text-xs font-black ${
                      transaction.status === 'Completed'
                        ? 'bg-[#01ab6c13] text-[#01ab6c]'
                        : 'bg-[#fcc20317] text-[#fc8803]'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>

                <td className="col-span-2 block px-4 pb-4 pt-1 text-right align-middle md:table-cell md:col-span-1 md:py-4">
                  <p className="text-sm font-black text-coarse-wool">{transaction.amount}</p>
                  <p className="text-xs font-semibold text-[#151827ac]">{transaction.date}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
