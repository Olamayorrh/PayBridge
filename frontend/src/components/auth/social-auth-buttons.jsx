import { RiAppleFill, RiGoogleFill } from '@remixicon/react';

export function SocialAuthButtons({ label = 'Or register with' }) {
  return (
    <div className="mt-2 flex flex-col gap-4">
      <div className="flex items-center gap-4 text-white/40">
        <span className="h-px flex-1 bg-white/20" />
        <span className="text-sm">{label}</span>
        <span className="h-px flex-1 bg-white/20" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          className="flex h-14 items-center justify-center gap-3 rounded-xl border border-white/25 bg-transparent text-lg font-semibold text-white transition-colors hover:border-[#FCC003] hover:text-[#FCC003]"
        >
          <RiGoogleFill className="text-[#4285F4]" size={28} />
          Google
        </button>
        <button
          type="button"
          className="flex h-14 items-center justify-center gap-3 rounded-xl border border-white/25 bg-transparent text-lg font-semibold text-white transition-colors hover:border-[#FCC003] hover:text-[#FCC003]"
        >
          <RiAppleFill size={30} />
          Apple
        </button>
      </div>
    </div>
  );
}
