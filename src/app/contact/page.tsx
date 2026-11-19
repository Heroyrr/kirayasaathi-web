import type { Metadata } from 'next'
import TrialForm from '@/components/TrialForm'
import { site, wa } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Start your free trial',
  description: 'Request your free 30-day KirayaSaathi trial. Tell us about your property and we will set up your account and contact you on WhatsApp.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="py-16">
      <div className="wrap grid max-w-[1000px] gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="eyebrow">Free trial</span>
          <h1 className="h2 !text-[clamp(32px,5vw,46px)]">Start your 30-day free trial</h1>
          <p className="mt-4 text-lg text-mute">Tell us a little about your property. We will create your account, send you the app link, your email and your password, and help you get started.</p>
          <ul className="mt-6 space-y-3 text-mute">
            <li>✅ No card needed</li>
            <li>✅ Up to 25 units during the trial</li>
            <li>✅ English and Hindi</li>
            <li>✅ We help you set up your first property</li>
          </ul>
          <div className="mt-8 flex flex-col gap-3 text-[15px]">
            <a href={wa('Hi KirayaSaathi, I want a free trial.')} target="_blank" rel="noopener noreferrer" className="btn-g w-fit">Chat on WhatsApp</a>
            <a href={`mailto:${site.email}`} className="text-pri underline underline-offset-4">{site.email}</a>
          </div>
        </div>
        <TrialForm />
      </div>
    </div>
  )
}
