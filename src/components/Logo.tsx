import Link from 'next/link'

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <rect width="120" height="120" rx="28" fill="#0F5C68" />
      <path d="M22 58 L60 26 L98 58" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 50 V94 H86 V50" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="60" cy="71" r="14" fill="#F4A300" />
      <text x="60" y="78" textAnchor="middle" fontSize="19" fontWeight="800" fill="#0B2A30" fontFamily="Arial, sans-serif">₹</text>
    </svg>
  )
}

/** Name is one piece of text, so there is never a gap inside "KirayaSaathi" */
export function Brand({ className = 'text-xl' }: { className?: string }) {
  return (
    <Link href="/" aria-label="KirayaSaathi home" className={`flex items-center gap-2.5 font-extrabold ${className}`}>
      <LogoMark />
      <span className="whitespace-nowrap">
        Kiraya<span className="text-pri">Saathi</span>
      </span>
    </Link>
  )
}
