import type { Metadata } from 'next'
import Link from 'next/link'
import FAQ from '@/components/FAQ'
import PricingTable from '@/components/PricingTable'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Pricing: plans for PG owners and landlords',
  description: 'Simple KirayaSaathi plans from ₹149 a month. Pay by the number of rooms or beds you manage. Every plan starts with a free 30-day trial.',
  alternates: { canonical: '/pricing' },
}

export default function PricingPage() {
  return (
    <div className="py-16">
      <div className="wrap text-center">
        <Reveal>
          <span className="eyebrow">Pricing</span>
          <h1 className="h2 !text-[clamp(32px,5vw,48px)]">Simple plans that grow with you</h1>
          <p className="sub">A unit is one flat, one shop, or one bed in a PG. Choose the plan that fits the number of units you manage. You can change your plan any time.</p>
        </Reveal>
        <div className="text-left"><PricingTable /></div>
        <div className="mx-auto mt-14 max-w-[760px] text-left">
          <h2 className="mb-4 text-2xl font-extrabold">What happens after the free trial?</h2>
          <p className="text-mute">You get 7 extra days to choose a plan. After that the app becomes view-only: you can still see and download your data, but you cannot add new data until you renew. We never delete your data.</p>
        </div>
        <div className="mt-14"><h2 className="mb-6 text-2xl font-extrabold">Pricing questions</h2><FAQ /></div>
        <Link href="/contact" className="btn-g mt-10">Start your free trial</Link>
      </div>
    </div>
  )
}
