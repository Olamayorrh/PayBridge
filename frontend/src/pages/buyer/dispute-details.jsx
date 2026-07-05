import { Link, useParams } from 'react-router-dom';
import { RiArrowLeftLine } from '@remixicon/react';
import {
  disputeStatuses,
  formatNaira,
  getBuyerDisputeById,
} from '../../data/buyer-mock-data';
import { DetailCard, EmptyState, StatusBadge, Timeline } from '../../components/buyer/shared';

export function BuyerDisputeDetails() {
  const { id } = useParams();
  const dispute = getBuyerDisputeById(id);

  if (!dispute) {
    return (
      <EmptyState
        title="Dispute not found"
        description="The dispute may have been removed or the dispute ID is incorrect."
      />
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5">
      <Link
        to="/buyer/disputes"
        className="inline-flex w-fit items-center gap-2 text-sm font-black text-coarse-wool/60 hover:text-coarse-wool"
      >
        <RiArrowLeftLine size={18} />
        Back to disputes
      </Link>

      <header className="rounded-lg bg-white p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-black text-coarse-wool">{dispute.title}</h1>
            <p className="mt-2 text-sm font-semibold text-coarse-wool/50">
              {dispute.id} · {dispute.transactionTitle} · {dispute.transactionId}
            </p>
          </div>
          <StatusBadge status={dispute.status} label={disputeStatuses[dispute.status]} />
        </div>
      </header>

      <section className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-5">
          <DetailCard title="Dispute Summary">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Dispute ID', dispute.id],
                ['Transaction', dispute.transactionTitle],
                ['Seller', dispute.seller],
                ['Amount', formatNaira(dispute.amount)],
                ['Reason', dispute.reason],
                ['Date opened', dispute.dateOpened],
                ['Preferred resolution', dispute.preferredResolution],
                ['Next action', dispute.nextAction],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-[#F4F6FB] p-4">
                  <p className="text-xs font-black uppercase text-coarse-wool/40">{label}</p>
                  <p className="mt-2 text-sm font-black text-coarse-wool">{value}</p>
                </div>
              ))}
            </div>
          </DetailCard>

          <DetailCard title="Dispute Timeline">
            <Timeline items={dispute.timeline} />
          </DetailCard>

          <DetailCard title="Evidence">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['Buyer evidence', dispute.evidence.buyer],
                ['Seller evidence', dispute.evidence.seller],
                ['Admin notes', [dispute.evidence.admin]],
              ].map(([label, items]) => (
                <div key={label} className="rounded-lg bg-[#F4F6FB] p-4">
                  <p className="text-sm font-black text-coarse-wool">{label}</p>
                  <ul className="mt-3 space-y-2">
                    {items.map((item) => (
                      <li key={item} className="text-sm font-semibold text-coarse-wool/55">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </DetailCard>
        </div>

        <aside className="flex flex-col gap-5">
          <DetailCard title="Admin Decision">
            <p className="text-2xl font-black text-coarse-wool">{dispute.adminDecision}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-coarse-wool/55">
              PayBridge reviews evidence from both sides before releasing funds or processing refunds.
            </p>
            {dispute.adminDecision === 'More Evidence Required' && (
              <button type="button" className="mt-5 h-11 rounded-lg bg-[#FCC003] px-4 text-sm font-black text-black">
                Add Evidence
              </button>
            )}
          </DetailCard>

          <DetailCard title="What happens next">
            <p className="text-sm font-semibold leading-6 text-coarse-wool/55">{dispute.nextAction}</p>
          </DetailCard>
        </aside>
      </section>
    </div>
  );
}
