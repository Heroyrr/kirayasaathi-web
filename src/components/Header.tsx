'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Brand } from './Logo'
import ThemeToggle from './ThemeToggle'
import { nav } from '@/lib/site'

export default function Header() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const active = (href: string) => !href.includes('#') && (href === '/' ? path === '/' : path.startsWith(href))
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="wrap relative flex h-[68px] items-center justify-between">
        <Brand />
        <nav aria-label="Main" className="hidden gap-6 font-medium text-mute lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={`transition hover:text-pri ${active(n.href) ? 'text-pri' : ''}`}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link href="/contact" className="btn-p hidden sm:inline-flex">Start free</Link>
          <button
            className="grid h-11 w-11 place-items-center rounded-2xl border-[1.5px] border-line bg-card text-lg lg:hidden"
            aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
        {open ? (
          <nav aria-label="Mobile" className="absolute left-0 right-0 top-[68px] flex flex-col gap-1 border-b border-line bg-bg px-5 pb-5 pt-3 lg:hidden">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2.5 font-medium text-mute hover:text-pri">
                {n.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-p mt-2">Start free</Link>
          </nav>
        ) : null}
      </div>
    </header>
  )
}
