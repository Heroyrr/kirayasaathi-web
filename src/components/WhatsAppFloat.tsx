import { wa } from '@/lib/site'

export default function WhatsAppFloat() {
  return (
    <a
      href={wa('Hi KirayaSaathi, I want to know more.')}
      target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"
      className="fixed bottom-[max(18px,env(safe-area-inset-bottom))] right-[max(18px,env(safe-area-inset-right))] z-[70] grid h-[60px] w-[60px] place-items-center rounded-full bg-[#25D366] shadow-xl shadow-[#25D366]/50 transition hover:scale-110"
    >
      <span className="absolute inset-0 animate-ping2 rounded-full border-2 border-[#25D366]" aria-hidden="true" />
      <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 8.2c.3 2.6 2.7 5.1 5.3 5.6l1.3-1.3-2-1-.9.9c-1-.4-2-1.4-2.4-2.4l.9-.9-1-2z" fill="#fff" />
      </svg>
    </a>
  )
}
