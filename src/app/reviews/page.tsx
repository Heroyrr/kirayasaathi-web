import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import ReviewCard, { Stars } from '@/components/ReviewCard'
import ReviewForm from '@/components/ReviewForm'
import { getPublishedReviews } from '@/lib/reviews'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Reviews: what property owners say about KirayaSaathi',
  description: 'Read reviews from PG owners and landlords who use KirayaSaathi, and share your own experience.',
  alternates: { canonical: '/reviews' },
}

export default async function ReviewsPage() {
  const reviews = await getPublishedReviews(100)
  const avg = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0
  return (
    <div className="py-16">
      <div className="wrap">
        <div className="mb-10 text-center">
          <span className="eyebrow">Reviews</span>
          <h1 className="h2 !text-[clamp(32px,5vw,48px)]">What owners say about KirayaSaathi</h1>
          {reviews.length > 0 ? (
            <div className="mt-5 inline-flex items-center gap-4 rounded-3xl border border-line bg-card px-6 py-4">
              <b className="text-4xl">{avg.toFixed(1)}</b>
              <div className="text-left"><Stars n={Math.round(avg)} /><div className="text-sm text-mute">from {reviews.length} review{reviews.length > 1 ? 's' : ''}</div></div>
            </div>
          ) : (
            <p className="sub">No reviews yet. If you use KirayaSaathi, be the first to tell others about it below.</p>
          )}
        </div>
        {reviews.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (<Reveal key={r.id} delay={(i % 3) * 80}><ReviewCard r={r} /></Reveal>))}
          </div>
        ) : null}
        <ReviewForm />
      </div>
    </div>
  )
}
