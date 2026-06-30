import { Link, useParams } from 'react-router-dom';
import { RiArrowLeftLine, RiDownloadLine, RiFlagLine, RiShieldCheckLine } from '@remixicon/react';
import {
  formatNaira,
  getBuyerTransactionById,
  transactionStatuses,
} from '../../data/buyer-mock-data';
import { DetailCard, EmptyState, StatusBadge, Timeline } from '../../components/buyer/shared';

export function BuyerTransactionDetails() {
  const { id } = useParams();
  const transaction = getBuyerTransactionById(id);

  if (!transaction) {
    return (
      <EmptyState
        title="Transaction not found"
        description="The transaction may have been removed or the invoice ID is incorrect."
      />
    );
  }

  const showDeliveryAction = transaction.status === 'DELIVERED_PENDING_CONFIRMATION';
  const canDispute = ['IN_TRANSIT', 'DELIVERED_PENDING_CONFIRMATION', 'DISPUTED'].includes(transaction.status);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5">
      <Link
        to="/buyer/transactions"
        className="inline-flex w-fit items-center gap-2 text-sm font-black text-coarse-wool/60 hover:text-coarse-wool"
      >
        <RiArrowLeftLine size={18} />
        Back to transactions
      </Link>

      <header className="rounded-lg bg-white p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-black text-coarse-wool">{transaction.title}</h1>
            <p className="mt-2 text-sm font-semibold text-coarse-wool/50">
              Invoice {transaction.id} · Created {transaction.dateCreated}
            </p>
            <div className="mt-4">
              <StatusBadge status={transaction.status} label={transactionStatuses[transaction.status]} />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {showDeliveryAction && (
              <button type="button" className="h-11 rounded-lg bg-[#151827] px-4 text-sm font-black text-white">
                Confirm Delivery
              </button>
            )}
            {canDispute && (
              <Link
                to="/buyer/disputes"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-rose-50 px-4 text-sm font-black text-rose-700"
              >
                <RiFlagLine size={17} />
                Raise Dispute
              </Link>
            )}
            <button type="button" className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#F4F6FB] px-4 text-sm font-black text-coarse-wool">
              <RiDownloadLine size={17} />
              Download Receipt
            </button>
          </div>
        </div>
      </header>

      <section className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-5">
          <DetailCard title="Transaction Summary">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Item or service', transaction.title],
                ['Seller', transaction.seller],
                ['Item price', formatNaira(transaction.amount)],
                ['Escrow fee', formatNaira(transaction.escrowFee)],
                ['Total paid', formatNaira(transaction.totalPaid)],
                ['Payment method', transaction.paymentMethod],
                ['Delivery method', transaction.deliveryMethod],
                ['Current status', transactionStatuses[transaction.status]],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-[#F4F6FB] p-4">
                  <p className="text-xs font-black uppercase text-coarse-wool/40">{label}</p>
                  <p className="mt-2 text-sm font-black text-coarse-wool">{value}</p>
                </div>
              ))}
            </div>
          </DetailCard>

          {showDeliveryAction && (
            <DetailCard title="Has your item arrived?">
              <p className="text-sm font-semibold leading-6 text-coarse-wool/55">
                Only confirm delivery after receiving and checking the item. Once confirmed, funds may be released to the seller.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
                <label className="block">
                  <span className="text-sm font-black text-coarse-wool">Enter Delivery OTP</span>
                  <input
                    placeholder="_ _ _ _ _ _"
                    className="mt-2 h-12 w-full rounded-lg bg-[#F4F6FB] px-4 text-sm font-black tracking-[0.4em] text-coarse-wool outline-none"
                  />
                </label>
                <button type="button" className="self-end rounded-lg bg-[#151827] px-5 py-3 text-sm font-black text-white">
                  Verify Delivery
                </button>
              </div>
            </DetailCard>
          )}

          <DetailCard title="Escrow Timeline">
            <Timeline items={transaction.timeline} />
          </DetailCard>
        </div>

        <aside className="flex flex-col gap-5">
          <DetailCard title="Proof of Delivery">
            <div className="space-y-3">
              {Object.entries(transaction.proof).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4 rounded-lg bg-[#F4F6FB] p-3">
                  <span className="text-xs font-black capitalize text-coarse-wool/45">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="text-right text-xs font-black text-coarse-wool">{value}</span>
                </div>
              ))}
            </div>
          </DetailCard>

          <DetailCard title="Payment Breakdown">
            <div className="space-y-3">
              {[
                ['Item Price', formatNaira(transaction.amount)],
                ['Escrow Fee', formatNaira(transaction.escrowFee)],
                ['Fee Paid By', transaction.feeModel],
                ['Total Paid', formatNaira(transaction.totalPaid)],
                ['Seller Receives', formatNaira(transaction.sellerReceives)],
                ['Platform Fee', formatNaira(transaction.platformFee)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 text-sm">
                  <span className="font-semibold text-coarse-wool/50">{label}</span>
                  <span className="text-right font-black text-coarse-wool">{value}</span>
                </div>
              ))}
            </div>
          </DetailCard>

          <DetailCard title="Seller Info">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-lg bg-[#151827] text-white">
                <RiShieldCheckLine size={22} />
              </div>
              <div>
                <p className="font-black text-coarse-wool">{transaction.seller}</p>
                <p className="text-xs font-semibold text-[#01ab6c]">{transaction.sellerInfo.verification}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                ['Completed Transactions', transaction.sellerInfo.completedTransactions],
                ['Trust Score', transaction.sellerInfo.trustScore],
                ['Response Rate', transaction.sellerInfo.responseRate],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between rounded-lg bg-[#F4F6FB] p-3 text-sm">
                  <span className="font-semibold text-coarse-wool/50">{label}</span>
                  <span className="font-black text-coarse-wool">{value}</span>
                </div>
              ))}
            </div>
          </DetailCard>
        </aside>
      </section>
    </div>
  );
}
