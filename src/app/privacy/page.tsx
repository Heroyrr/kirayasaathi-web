import { site } from '@/lib/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How KirayaSaathi collects, uses and protects information on this website and in the app.',
  alternates: { canonical: '/privacy' },
}

export default function Privacy() {
  return (
    <div className="py-14">
      <div className="wrap max-w-[760px]">
        <h1 className="text-4xl font-extrabold tracking-tight">Privacy policy</h1>
        <p className="mt-2 text-sm text-mute">Last updated: replace with the date you publish this page.</p>
        <p className="mt-4 rounded-2xl bg-soft p-4 text-sm text-mute"><b className="text-ink">Draft:</b> this text is a starting point. Please have a lawyer review it, add your company details and address, and check it against India’s data protection rules before you rely on it.</p>
        <div className="article">
          <h2>Who we are</h2>
          <p>{site.name} (“we”, “us”) provides a property management app and this website. You can contact us at <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
          <h2>What we collect on this website</h2>
          <ul>
            <li><strong>Free trial requests:</strong> your name, mobile number, city, type and size of property, and any message you write.</li>
            <li><strong>Reviews:</strong> your name, your property (optional), your rating and your review text. We show a review publicly only after we approve it.</li>
            <li><strong>Basic technical data:</strong> your hosting provider may keep standard server logs (such as IP address) for security.</li>
          </ul>
          <h2>What the app stores</h2>
          <p>Property owners use the app to store information about their own properties, tenants, invoices and payments. This can include tenants’ names, mobile numbers and identity documents such as Aadhaar photos. The owner decides what to store and is responsible for having the tenant’s permission. We store this data on the owner’s behalf, keep documents in private storage, and open them only through short-lived links. Each owner can see only their own data.</p>
          <h2>How we use information</h2>
          <ul>
            <li>To reply to your request, create your account and support you.</li>
            <li>To run, secure and improve the service.</li>
            <li>To show approved reviews on this website.</li>
          </ul>
          <p>We do not sell your information. We do not share it with others except the service providers we need to run the service (for example our hosting and database provider), or when the law requires it.</p>
          <h2>How long we keep it</h2>
          <p>We keep trial requests and account data for as long as needed to provide the service. You can ask us to correct or delete your information, and we will do so unless the law requires us to keep it.</p>
          <h2>Your choices</h2>
          <p>You can ask to see, correct or delete your information, or withdraw your consent to be contacted, by writing to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
          <h2>Children</h2>
          <p>Our service is meant for adults who manage property. We do not knowingly collect information from children.</p>
          <h2>Changes</h2>
          <p>We may update this policy and will change the date above when we do.</p>
        </div>
      </div>
    </div>
  )
}
