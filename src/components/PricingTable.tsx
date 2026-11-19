'use client'
import Link from 'next/link'
import { useState } from 'react'
import { inr, plans } from '@/lib/site'
import Reveal from './Reveal'

export default function PricingTable() {
  const [yearly, setYearly] = useState(false)
  return (
    <div>
      <div className="mx-auto my-6 flex w-fit rounded-full bg-soft p-1" role="group" aria-label="Billing period">
        {[['Monthly', false], ['Yearly · 2 months free', true]].map(([label, y]) => (
          <button key={String(label)} onClick={() => setYearly(Boolean(y))} aria-pressed={yearly === y}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${yearly === y ? 'bg-pri text-white dark:text-[#06141A]' : 'text-mute'}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <div className={`card relative h-full ${p.popular ? '!border-2 !border-gold' : ''}`}>
              {p.popular ? <span className="absolute -top-3.5 right-5 rounded-full bg-gold px-3 py-1 text-xs font-extrabold text-[#0B2A30]">Popular</span> : null}
              <h3 className="text-xl font-bold">{p.name}</h3>
              <div className="mt-3 text-4xl font-extrabold">
                {inr(yearly ? p.yearly : p.monthly)}
                <small className="text-sm font-medium text-mute"> / {yearly ? 'year' : 'month'}</small>
              </div>
              <ul className="mt-5 space-y-2 text-[15px] text-mute">
                {p.points.map((x) => (<li key={x}><span className="font-extrabold text-[#1C9A52]">✓ </span>{x}</li>))}
              </ul>
              <Link href="/contact" className={`${p.popular ? 'btn-g' : 'btn-o'} mt-6 w-full`}>Start free trial</Link>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-mute">Every plan starts with a free 30-day trial. Prices are in rupees; GST is added if it applies to you.</p>
    </div>
  )
}
