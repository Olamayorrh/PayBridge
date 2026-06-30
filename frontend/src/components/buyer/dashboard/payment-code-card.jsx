import { RiSecurePaymentLine } from '@remixicon/react';

export function PaymentCodeCard() {
  return (
    <article className="flex min-h-80 flex-col justify-between rounded-lg bg-[#151827] p-6 text-white shadow-sm">
      <div>
        <div className="flex size-14 items-center justify-center rounded-lg bg-white text-[#151827]">
          <RiSecurePaymentLine size={28} />
        </div>
        <h2 className="mt-8 text-2xl font-black leading-tight">Input buyer code to make payment</h2>
        <p className="mt-3 text-sm leading-6 text-white/60">
          Enter the transaction code shared by the seller to continue with escrow payment.
        </p>
      </div>

      <form className="mt-8 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Buyer code"
          className="h-12 rounded-lg border border-white/15 bg-white px-4 text-sm font-semibold text-[#151827] outline-none transition-colors placeholder:text-[#151827]/35 focus:border-the-bright-side"
        />
        <button
          type="button"
          className="h-12 rounded-lg bg-[#FCC003] px-4 text-sm font-black text-[#151827] transition-colors hover:bg-[#fcc20393]"
        >
          Make Payment
        </button>
      </form>
    </article>
  );
}
