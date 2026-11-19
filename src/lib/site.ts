/* One place for the company details, plans, features and questions. Change text here. */
export const site = {
  name: 'KirayaSaathi',
  tagline: 'Rent, tenants and payments, made simple.',
  description:
    'KirayaSaathi is a simple app for PG owners and landlords in India to manage rooms, tenants, invoices, rent payments and complaints, in English and Hindi. Start with a free 30-day trial.',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kirayasaathi.in').replace(/\/$/, ''),
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP ?? '91XXXXXXXXXX').replace(/\D/g, ''),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@kirayasaathi.in',
  apkUrl: process.env.NEXT_PUBLIC_APK_URL ?? '',
}

/** WhatsApp link, with an optional ready-made message */
export const wa = (text?: string) => `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export type Plan = { id: string; name: string; units: number; properties: number | null; monthly: number; yearly: number; popular?: boolean; points: string[] }

// Keep these in step with the app (src/utils/plans.ts in the app project).
export const plans: Plan[] = [
  { id: 'basic', name: 'Basic', units: 10, properties: 1, monthly: 149, yearly: 1490, points: ['Up to 10 units', '1 property', 'Invoices and payments', 'English and Hindi'] },
  { id: 'starter', name: 'Starter', units: 25, properties: 2, monthly: 299, yearly: 2990, popular: true, points: ['Up to 25 units', '2 properties', 'Complaints and leads', 'English and Hindi'] },
  { id: 'growth', name: 'Growth', units: 60, properties: 5, monthly: 599, yearly: 5990, points: ['Up to 60 units', '5 properties', 'Everything in Starter', 'English and Hindi'] },
  { id: 'pro', name: 'Pro', units: 150, properties: null, monthly: 999, yearly: 9990, points: ['Up to 150 units', 'Unlimited properties', 'Everything in Growth', 'Priority support'] },
]

export const features = [
  { icon: '🏠', title: 'Properties and rooms', text: 'PG beds, flats or shops. See vacant and occupied rooms at a glance.' },
  { icon: '👤', title: 'Tenants and documents', text: 'Aadhaar and agreements stored privately and opened with a safe, short-lived link.' },
  { icon: '⚡', title: 'Meter readings and invoices', text: 'Electricity is split between roommates for you. Share invoices in seconds.' },
  { icon: '💳', title: 'Payments and dues', text: 'Every stay has its own ledger, so advances and old dues always stay correct.' },
  { icon: '🛠️', title: 'Complaints', text: 'Tenant issues with photos, notes and a clear status until they are done.' },
  { icon: '📞', title: 'Leads', text: 'Note every enquiry, call or WhatsApp in one tap and never miss a follow-up.' },
]

export const steps = [
  { title: 'We create your account', text: 'Message us on WhatsApp. We set up your login and your free 30 days.' },
  { title: 'Add your property', text: 'Add rooms, beds and rent in a minute, then add your tenants.' },
  { title: 'Invoice and collect', text: 'Create invoices, record payments and watch your dues fall.' },
]

export const faqs = [
  { q: 'Is there a free trial?', a: 'Yes. Every owner gets 30 days free with up to 25 units. No card is needed.' },
  { q: 'Does KirayaSaathi work in Hindi?', a: 'Yes. The whole app switches between English and Hindi in one tap.' },
  { q: 'Is my tenants’ data safe?', a: 'Documents such as Aadhaar are stored privately and open only through short-lived links. Each owner sees only their own data.' },
  { q: 'Can I use it for flats and shops, not only PGs?', a: 'Yes. A flat or shop counts as one unit, and a bed in a PG counts as one unit.' },
  { q: 'How do I get my login?', a: 'Message us on WhatsApp. We create your account and send you the app link, your email and your password.' },
  { q: 'How do I pay for a plan?', a: 'For now you pay us directly by UPI and we update your plan straight away. Online payment will come later.' },
  { q: 'What happens when my plan ends?', a: 'You get 7 extra days. After that the app becomes view-only: you can still see and download your data, but cannot add new data until you renew. Nothing is deleted.' },
]

export const nav = [
  { href: '/#features', label: 'Features' },
  { href: '/#how', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/#faq', label: 'FAQ' },
]

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`
