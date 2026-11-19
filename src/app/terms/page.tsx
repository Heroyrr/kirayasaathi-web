import { site } from '@/lib/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of service',
  description: 'The terms for using the KirayaSaathi website and app.',
  alternates: { canonical: '/terms' },
}

export default function Terms() {
  return (
    <div className="py-14">
      <div className="wrap max-w-[760px]">
        <h1 className="text-4xl font-extrabold tracking-tight">Terms of service</h1>
        <p className="mt-2 text-sm text-mute">Last updated: replace with the date you publish this page.</p>
        <p className="mt-4 rounded-2xl bg-soft p-4 text-sm text-mute"><b className="text-ink">Draft:</b> this text is a starting point. Please have a lawyer review it and add your company name, address and the courts that apply to you.</p>
        <div className="article">
          <h2>The service</h2>
          <p>{site.name} is a tool that helps property owners record and manage rooms, tenants, meter readings, invoices, payments, complaints and enquiries. We provide it “as is”.</p>
          <h2>Accounts</h2>
          <p>We create each owner’s account. You must keep your password private and tell us if you think someone else has used it. You are responsible for what happens under your account.</p>
          <h2>Free trial and plans</h2>
          <p>New owners get a free trial. After a plan ends there is a short grace period, and then the app becomes view-only: you can still see and download your data but cannot add new data until you renew. Plan prices and limits are shown on our pricing page and may change with notice. We do not delete your data because a plan ended.</p>
          <h2>Payments</h2>
          <p>For now plans are paid to us directly. We update your plan after we receive your payment. Please ask us about refunds before you pay.</p>
          <h2>Your data and your responsibilities</h2>
          <ul>
            <li>You own the data you enter. You allow us to store and process it to provide the service.</li>
            <li>You must have the right and the permission to store your tenants’ information, including identity documents.</li>
            <li>The invoices, balances and reports are tools to help you. Please check them. You are responsible for your own accounts, taxes and agreements with your tenants.</li>
          </ul>
          <h2>Acceptable use</h2>
          <p>Do not misuse the service, try to access other owners’ data, upload anything unlawful, or interfere with how the service works.</p>
          <h2>Availability</h2>
          <p>We work to keep the service running, but we cannot promise it will always be available or free of errors. Keep your own copies of important records.</p>
          <h2>Limit of responsibility</h2>
          <p>To the extent the law allows, we are not responsible for indirect losses, lost profits or lost data arising from the use of the service.</p>
          <h2>Ending</h2>
          <p>You may stop using the service at any time. We may suspend an account that breaks these terms.</p>
          <h2>Contact</h2>
          <p>Questions? Write to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
        </div>
      </div>
    </div>
  )
}
