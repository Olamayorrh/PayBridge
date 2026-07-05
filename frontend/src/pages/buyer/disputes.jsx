import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  RiAddLine,
  RiCheckboxCircleLine,
  RiFileWarningLine,
  RiRefund2Line,
  RiSearchLine,
  RiShieldCheckLine,
} from '@remixicon/react';
import {
  disputeStatuses,
  formatNaira,
  getBuyerDisputes,
  getBuyerTransactions,
} from '../../data/buyer-mock-data';
import {
  ActionModal,
  EmptyState,
  PageHeader,
  StatusBadge,
  SummaryCard,
} from '../../components/buyer/shared';

const tabs = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Under Review', value: 'UNDER_REVIEW' },
  { label: 'More Evidence Needed', value: 'MORE_EVIDENCE_NEEDED' },
  { label: 'Resolved', value: 'RESOLVED' },
  { label: 'Refunded', value: 'REFUNDED' },
  { label: 'Released to Seller', value: 'RELEASED_TO_SELLER' },
];

const disputeReasons = [
  'Item not delivered',
  'Item damaged',
  'Wrong item received',
  'Incomplete delivery',
  'Seller unreachable',
  'Delivery proof is incorrect',
  'Other',
];

export function BuyerDisputes() {
  const disputes = getBuyerDisputes();
  const transactions = getBuyerTransactions();
  const [activeStatus, setActiveStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDisputes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return disputes.filter((dispute) => {
      const matchesStatus = activeStatus === 'ALL' || dispute.status === activeStatus;
      const matchesSearch =
        !normalizedSearch ||
        dispute.title.toLowerCase().includes(normalizedSearch) ||
        dispute.transactionTitle.toLowerCase().includes(normalizedSearch) ||
        dispute.seller.toLowerCase().includes(normalizedSearch) ||
        dispute.transactionId.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [activeStatus, disputes, searchTerm]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5">
      <PageHeader
        title="Disputes"
        description="Track issues, submit evidence, and follow resolution updates for your PayBridge transactions."
        actions={
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#151827] px-5 text-sm font-black text-white transition-colors hover:bg-[#252a3d]"
          >
            <RiAddLine size={18} />
            Raise Dispute
          </button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={RiFileWarningLine} label="Open Disputes" value="2" />
        <SummaryCard icon={RiShieldCheckLine} label="Under Review" value="1" />
        <SummaryCard icon={RiCheckboxCircleLine} label="Resolved" value="4" />
        <SummaryCard icon={RiRefund2Line} label="Refunded" value={formatNaira(85000)} />
      </section>

      <section className="rounded-lg bg-white p-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
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

        <label className="mt-4 flex h-12 items-center gap-3 rounded-lg bg-[#F4F6FB] px-4">
          <RiSearchLine size={18} className="text-coarse-wool/45" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by dispute, seller, item, or invoice ID..."
            className="w-full bg-transparent text-sm font-semibold text-coarse-wool outline-none placeholder:text-coarse-wool/35"
          />
        </label>
      </section>

      {filteredDisputes.length === 0 ? (
        <EmptyState title="No disputes found" description="Try a different status filter or search term." />
      ) : (
        <section className="grid gap-4 lg:grid-cols-2">
          {filteredDisputes.map((dispute) => (
            <article key={dispute.id} className="rounded-lg bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-coarse-wool">{dispute.title}</h2>
                  <p className="mt-1 text-sm font-semibold text-coarse-wool/50">
                    {dispute.transactionTitle} · {dispute.seller}
                  </p>
                </div>
                <StatusBadge status={dispute.status} label={disputeStatuses[dispute.status]} />
              </div>

              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ['Invoice', dispute.transactionId],
                  ['Amount', formatNaira(dispute.amount)],
                  ['Reason', dispute.reason],
                  ['Opened', dispute.dateOpened],
                  ['Last updated', dispute.lastUpdated],
                  ['Next step', dispute.nextAction],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-[#F4F6FB] p-3">
                    <dt className="text-xs font-black uppercase text-coarse-wool/40">{label}</dt>
                    <dd className="mt-1 text-sm font-black text-coarse-wool">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to={`/buyer/disputes/${dispute.id}`}
                  className="inline-flex h-10 items-center rounded-lg bg-[#151827] px-4 text-sm font-black text-white"
                >
                  View Dispute
                </Link>
                {dispute.status === 'MORE_EVIDENCE_NEEDED' && (
                  <button type="button" className="h-10 rounded-lg bg-[#FCC003] px-4 text-sm font-black text-black">
                    Add Evidence
                  </button>
                )}
              </div>
            </article>
          ))}
        </section>
      )}

      {isModalOpen && (
        <ActionModal title="Raise a dispute" onClose={() => setIsModalOpen(false)}>
          <p className="text-sm font-semibold leading-6 text-coarse-wool/55">
            Submit clear evidence to help PayBridge review your case faster.
          </p>
          <div className="mt-5 grid gap-4">
            <label>
              <span className="text-sm font-black text-coarse-wool">Transaction</span>
              <select className="mt-2 h-12 w-full rounded-lg bg-[#F4F6FB] px-4 text-sm font-semibold text-coarse-wool outline-none">
                {transactions.map((transaction) => (
                  <option key={transaction.id}>{transaction.title} · {transaction.id}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="text-sm font-black text-coarse-wool">Dispute Reason</span>
              <select className="mt-2 h-12 w-full rounded-lg bg-[#F4F6FB] px-4 text-sm font-semibold text-coarse-wool outline-none">
                {disputeReasons.map((reason) => (
                  <option key={reason}>{reason}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="text-sm font-black text-coarse-wool">Explanation</span>
              <textarea
                rows={4}
                placeholder="Explain what happened..."
                className="mt-2 w-full rounded-lg bg-[#F4F6FB] px-4 py-3 text-sm font-semibold text-coarse-wool outline-none placeholder:text-coarse-wool/35"
              />
            </label>
            <label>
              <span className="text-sm font-black text-coarse-wool">Evidence Upload</span>
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                className="mt-2 block w-full rounded-lg bg-[#F4F6FB] px-4 py-3 text-sm font-semibold text-coarse-wool"
              />
            </label>
            <label>
              <span className="text-sm font-black text-coarse-wool">Preferred Resolution</span>
              <select className="mt-2 h-12 w-full rounded-lg bg-[#F4F6FB] px-4 text-sm font-semibold text-coarse-wool outline-none">
                <option>Refund me</option>
                <option>Replace item</option>
                <option>Continue review</option>
                <option>Other</option>
              </select>
            </label>
            <button type="button" className="h-12 rounded-lg bg-[#151827] px-5 text-sm font-black text-white">
              Submit Dispute
            </button>
          </div>
        </ActionModal>
      )}
    </div>
  );
}
