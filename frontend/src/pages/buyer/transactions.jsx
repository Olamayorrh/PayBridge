import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiBankCardLine,
  RiCheckboxCircleLine,
  RiFileCopyLine,
  RiSearchLine,
  RiShieldCheckLine,
  RiTimeLine,
} from '@remixicon/react';
import {
  formatNaira,
  getBuyerTransactions,
  transactionStatuses,
} from '../../data/buyer-mock-data';
import { EmptyState, PageHeader, StatusBadge, SummaryCard } from '../../components/buyer/shared';

const tabs = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending Payment', value: 'PAYMENT_PENDING' },
  { label: 'In Escrow', value: 'FUNDS_IN_ESCROW' },
  { label: 'In Transit', value: 'IN_TRANSIT' },
  { label: 'Awaiting Confirmation', value: 'DELIVERED_PENDING_CONFIRMATION' },
  { label: 'Completed', value: 'FUNDS_RELEASED' },
  { label: 'Disputed', value: 'DISPUTED' },
  { label: 'Refunded', value: 'REFUNDED' },
];

function HorizontalArrowScroll({ children, scrollAmount = 320, className = '' }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    setCanScrollLeft(element.scrollLeft > 1);
    setCanScrollRight(element.scrollLeft < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    const element = scrollRef.current;

    if (!element) {
      return undefined;
    }

    updateScrollState();
    element.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      element.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollBy = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className={`overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
      >
        {children}
      </div>

      {canScrollLeft && (
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollBy(-1)}
          className="absolute left-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-coarse-wool shadow-sm ring-1 ring-black/10 transition-opacity hover:bg-white"
        >
          <RiArrowLeftSLine size={22} />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollBy(1)}
          className="absolute right-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-coarse-wool shadow-sm ring-1 ring-black/10 transition-opacity hover:bg-white"
        >
          <RiArrowRightSLine size={22} />
        </button>
      )}
    </div>
  );
}

export function BuyerTransactions() {
  const transactions = getBuyerTransactions();
  const [activeStatus, setActiveStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showInvoiceInput, setShowInvoiceInput] = useState(false);

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesStatus = activeStatus === 'ALL' || transaction.status === activeStatus;
      const matchesSearch =
        !normalizedSearch ||
        transaction.title.toLowerCase().includes(normalizedSearch) ||
        transaction.seller.toLowerCase().includes(normalizedSearch) ||
        transaction.id.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [activeStatus, searchTerm, transactions]);

  const totalInEscrow = transactions
    .filter((transaction) =>
      ['FUNDS_IN_ESCROW', 'IN_TRANSIT', 'DELIVERED_PENDING_CONFIRMATION'].includes(transaction.status)
    )
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5">
      <PageHeader
        title="Transactions"
        description="View and manage all your protected PayBridge payments."
        actions={
          <>
            <button
              type="button"
              className="h-12 rounded-lg bg-[#151827] px-5 text-sm font-black text-white transition-colors hover:bg-[#252a3d]"
            >
              Pay Invoice
            </button>
            <button
              type="button"
              onClick={() => setShowInvoiceInput((current) => !current)}
              className="h-12 rounded-lg bg-white px-5 text-sm font-black text-coarse-wool transition-colors hover:bg-[#1518270d]"
            >
              Paste Invoice Link
            </button>
          </>
        }
      />

      {showInvoiceInput && (
        <section className="rounded-lg bg-white p-4">
          <label className="text-sm font-black text-coarse-wool" htmlFor="invoice-link">
            Invoice link
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="invoice-link"
              placeholder="https://paybridge.com/pay/PB-INV-..."
              className="h-12 flex-1 rounded-lg bg-[#F4F6FB] px-4 text-sm font-semibold text-coarse-wool outline-none placeholder:text-coarse-wool/35"
            />
            <button
              type="button"
              className="h-12 rounded-lg bg-[#FCC003] px-5 text-sm font-black text-black"
            >
              Continue
            </button>
          </div>
        </section>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={RiShieldCheckLine} label="Total in Escrow" value={formatNaira(totalInEscrow)} />
        <SummaryCard icon={RiTimeLine} label="Active Transactions" value="3" helper="Currently being processed" />
        <SummaryCard icon={RiFileCopyLine} label="Awaiting Confirmation" value="1" helper="Needs your review" />
        <SummaryCard icon={RiCheckboxCircleLine} label="Completed Transactions" value="12" helper="Protected payments completed" />
      </section>

      <section className="rounded-lg bg-white p-4">
        <HorizontalArrowScroll scrollAmount={220}>
          <div className="flex gap-2 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveStatus(tab.value)}
                className={`h-10 shrink-0 rounded-lg px-4 text-sm font-black transition-colors ${
                  activeStatus === tab.value
                    ? 'bg-[#151827] text-white'
                    : 'bg-[#F4F6FB] text-coarse-wool/60 hover:text-coarse-wool'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </HorizontalArrowScroll>

        <label className="mt-4 flex h-12 items-center gap-3 rounded-lg bg-[#F4F6FB] px-4">
          <RiSearchLine size={18} className="text-coarse-wool/45" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by seller, item, or invoice ID..."
            className="w-full bg-transparent text-sm font-semibold text-coarse-wool outline-none placeholder:text-coarse-wool/35"
          />
        </label>
      </section>

      {filteredTransactions.length === 0 ? (
        <EmptyState
          title="No transactions found"
          description="Try changing the status filter or search by seller, item, or invoice ID."
        />
      ) : (
        <section className="overflow-hidden rounded-lg bg-white">
          <HorizontalArrowScroll scrollAmount={420}>
            <table className="w-full min-w-[940px] border-collapse">
              <thead>
                <tr className="border-b border-black/5 text-left text-xs font-black uppercase text-coarse-wool/45">
                  <th className="px-5 py-4">Transaction</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Fee</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Next Step</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-black/5 last:border-b-0">
                    <td className="px-5 py-4">
                      <p className="text-sm font-black text-coarse-wool">{transaction.title}</p>
                      <p className="mt-1 text-xs font-semibold text-coarse-wool/45">
                        {transaction.seller} · {transaction.id}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm font-black text-coarse-wool">
                      {formatNaira(transaction.amount)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-coarse-wool/55">
                      {formatNaira(transaction.escrowFee)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={transaction.status} label={transactionStatuses[transaction.status]} />
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-coarse-wool/55">
                      {transaction.dateCreated}
                    </td>
                    <td className="px-5 py-4 text-sm font-black text-coarse-wool">
                      {transaction.nextStep}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {transaction.status === 'PAYMENT_PENDING' && (
                          <button
                            type="button"
                            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-the-bright-side px-3 text-xs font-black text-black"
                          >
                            <RiBankCardLine size={16} />
                            Pay Now
                          </button>
                        )}
                        <Link
                          to={`/buyer/transactions/${transaction.id}`}
                          className="inline-flex h-10 items-center rounded-lg bg-[#151827] px-3 text-xs font-black text-white"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </HorizontalArrowScroll>
        </section>
      )}
    </div>
  );
}
