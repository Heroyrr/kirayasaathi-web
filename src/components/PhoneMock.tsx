/** A drawing of the app (sample numbers) with floating cards around it */
export default function PhoneMock() {
  return (
    <div className="relative mx-auto w-[290px]" aria-hidden="true">
      <div className="animate-float rounded-[38px] bg-[#061417] p-3 shadow-2xl shadow-black/50">
        <div className="min-h-[480px] rounded-[28px] bg-bg p-4 text-ink">
          <div className="mb-3 rounded-2xl bg-pri p-3.5 text-white dark:text-[#06141A]">
            <small className="opacity-85">Dues this month</small>
            <strong className="block text-[26px]">₹42,500</strong>
          </div>
          <div className="mb-3 grid grid-cols-2 gap-2.5 text-xs text-mute">
            <div className="rounded-2xl border border-line bg-card p-2.5">Collected<b className="block text-[17px] text-ink">₹1,18,000</b></div>
            <div className="rounded-2xl border border-line bg-card p-2.5">Vacant beds<b className="block text-[17px] text-ink">6</b></div>
          </div>
          {[
            ['Rohit S.', 'Room 101 · Bed A', 'Paid', true],
            ['Anil K.', 'Room 102 · Bed B', '₹5,000 due', false],
            ['Meena P.', 'Flat 3B', 'Paid', true],
          ].map(([n, r, s, ok]) => (
            <div key={String(n)} className="mb-2 flex items-center justify-between rounded-2xl border border-line bg-card px-3 py-2.5 text-[13px]">
              <span><b>{n}</b><br /><small className="text-mute">{r}</small></span>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${ok ? 'bg-[#DDF3E4] text-[#1C7A3C]' : 'bg-[#FDE7E4] text-[#B42318]'}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -left-14 top-[70px] hidden animate-float-fast items-center gap-2 rounded-2xl bg-card px-3.5 py-2.5 text-[13px] font-semibold text-ink shadow-xl md:flex">🧾 Invoice sent</div>
      <div className="absolute -right-12 top-[250px] hidden animate-float-slow items-center gap-2 rounded-2xl bg-card px-3.5 py-2.5 text-[13px] font-semibold text-ink shadow-xl md:flex" style={{ animationDelay: '1s' }}>💰 ₹5,000 received</div>
      <div className="absolute -left-8 bottom-[50px] hidden animate-float items-center gap-2 rounded-2xl bg-card px-3.5 py-2.5 text-[13px] font-semibold text-ink shadow-xl md:flex" style={{ animationDelay: '2s' }}>🔧 Complaint resolved</div>
    </div>
  )
}
