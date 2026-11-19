import type { Metadata } from 'next'
import Link from 'next/link'
import FAQ from '@/components/FAQ'
import JsonLd from '@/components/JsonLd'
import PhoneMock from '@/components/PhoneMock'
import PostCard from '@/components/PostCard'
import PricingTable from '@/components/PricingTable'
import Reveal from '@/components/Reveal'
import ReviewCard from '@/components/ReviewCard'
import Slider from '@/components/Slider'
import { getAllPosts } from '@/lib/posts'
import { getPublishedReviews } from '@/lib/reviews'
import { faqs, features, plans, site, steps, wa } from '@/lib/site'

export const revalidate = 300

export const metadata: Metadata = {
  title: { absolute: `${site.name}: property management app for PG owners and landlords in India` },
  description: site.description,
  alternates: { canonical: '/' },
}

export default async function Home() {
  const posts = getAllPosts().slice(0, 6)
  const reviews = await getPublishedReviews(12)
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-hd to-[#0F5C68] pb-24 pt-16 text-white">
        <div className="pointer-events-none absolute -right-20 -top-32 h-[360px] w-[360px] animate-float-slow rounded-full bg-gold opacity-30 blur-[70px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-[300px] w-[300px] animate-float rounded-full bg-[#3FB6C6] opacity-30 blur-[70px]" aria-hidden="true" />
        <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <Reveal><span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">🇮🇳 Made for PG owners and landlords in India</span></Reveal>
            <Reveal delay={100}>
              <h1 className="my-5 text-[clamp(34px,5.4vw,60px)] font-extrabold leading-[1.08] tracking-tight">
                Manage rent, tenants and payments, <em className="not-italic text-gold">from one simple app.</em>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="max-w-[540px] text-lg text-[#CFE3E6]">
                {site.name} (किराये का साथी) helps you track rooms and beds, send invoices, record payments and handle complaints. In English and Hindi.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="my-7 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-g">Start your 30-day free trial</Link>
                <Link href="/#how" className="btn border-[1.5px] border-white/40 text-white">See how it works</Link>
              </div>
              <p className="text-sm text-[#A9C9CE]">No card needed · Works on Android · Set up in minutes</p>
            </Reveal>
          </div>
          <Reveal delay={200}><PhoneMock /></Reveal>
        </div>
      </section>

      {/* features */}
      <section id="features" className="py-20">
        <div className="wrap text-center">
          <Reveal><span className="eyebrow">Features</span><h2 className="h2">Everything an owner needs, nothing extra</h2><p className="sub">Built for real property owners: simple screens, big buttons and your own language.</p></Reveal>
          <div className="mt-11 grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 100}>
                <div className="card card-hover h-full">
                  <div className="mb-4 grid h-[52px] w-[52px] place-items-center rounded-2xl bg-soft text-2xl" aria-hidden="true">{f.icon}</div>
                  <h3 className="mb-2 text-xl font-bold">{f.title}</h3>
                  <p className="text-[15px] text-mute">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* how it works */}
      <section id="how" className="border-y border-line bg-card py-20">
        <div className="wrap text-center">
          <Reveal><span className="eyebrow">How it works</span><h2 className="h2">Start in three easy steps</h2></Reveal>
          <ol className="mt-11 grid gap-5 text-left md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <li className="h-full rounded-3xl bg-soft p-7">
                  <span className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-gold text-lg font-extrabold text-[#0B2A30]">{i + 1}</span>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-mute">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* trust strip */}
      <section className="py-14">
        <div className="wrap flex flex-wrap justify-center gap-4">
          {['✅ 30-day free trial', '🗣️ English and Hindi', '🔒 Private document storage', '📱 Android app'].map((t) => (
            <Reveal key={t}><span className="inline-block rounded-full bg-soft px-5 py-2.5 font-semibold">{t}</span></Reveal>
          ))}
        </div>
      </section>

      {/* pricing */}
      <section id="pricing" className="border-y border-line bg-card py-20">
        <div className="wrap text-center">
          <Reveal><span className="eyebrow">Pricing</span><h2 className="h2">Simple plans that grow with you</h2><p className="sub">Pay by the number of rooms or beds you manage. Every plan starts with a free trial.</p></Reveal>
          <div className="text-left"><PricingTable /></div>
          <Link href="/pricing" className="btn-o mt-8">See plan details</Link>
        </div>
      </section>

      {/* blog slider */}
      <section className="py-20">
        <div className="wrap">
          <Reveal className="text-center"><span className="eyebrow">Blog</span><h2 className="h2">Tips for property owners</h2><p className="sub">Short, practical guides on rent, electricity, agreements and tenants.</p></Reveal>
          {posts.length > 0 ? (
            <div className="mt-9">
              <Slider label="Latest blog posts">{posts.map((p) => (<PostCard key={p.slug} post={p} />))}</Slider>
            </div>
          ) : null}
          <div className="mt-2 flex justify-center"><Link href="/blog" className="btn-o">View all articles</Link></div>
        </div>
      </section>

      {/* reviews slider (only real reviews you approved) */}
      <section className="border-y border-line bg-card py-20">
        <div className="wrap">
          <Reveal className="text-center"><span className="eyebrow">Reviews</span><h2 className="h2">What owners say</h2></Reveal>
          {reviews.length > 0 ? (
            <div className="mt-9"><Slider label="Owner reviews">{reviews.map((r) => (<ReviewCard key={r.id} r={r} />))}</Slider></div>
          ) : (
            <p className="sub">Owner reviews will appear here. Using KirayaSaathi? Be the first to share your experience.</p>
          )}
          <div className="mt-4 flex justify-center"><Link href="/reviews" className="btn-o">{reviews.length > 0 ? 'See all reviews and write yours' : 'Write a review'}</Link></div>
        </div>
      </section>

      {/* faq */}
      <section id="faq" className="py-20">
        <div className="wrap">
          <Reveal className="mb-9 text-center"><span className="eyebrow">FAQ</span><h2 className="h2">Questions owners ask</h2></Reveal>
          <FAQ />
        </div>
      </section>

      {/* final call */}
      <section className="pb-24">
        <div className="wrap">
          <Reveal>
            <div className="rounded-[32px] bg-gradient-to-br from-hd to-[#0F5C68] px-7 py-14 text-center text-white">
              <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold tracking-tight">Ready to make rent day easy?</h2>
              <p className="mx-auto mb-7 mt-3 max-w-[520px] text-[#CFE3E6]">Message us on WhatsApp and we will set up your free account today.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={wa('Hi KirayaSaathi, I want a free trial.')} target="_blank" rel="noopener noreferrer" className="btn-g">Chat on WhatsApp</a>
                <Link href="/contact" className="btn border-[1.5px] border-white/40 text-white">Request a call back</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={[
          {
            '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: site.name, applicationCategory: 'BusinessApplication',
            operatingSystem: 'Android', description: site.description, inLanguage: ['en', 'hi'], url: site.url,
            offers: {
              '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: Math.min(...plans.map((p) => p.monthly)),
              highPrice: Math.max(...plans.map((p) => p.monthly)), offerCount: plans.length,
            },
          },
          {
            '@context': 'https://schema.org', '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          },
        ]}
      />
    </>
  )
}
