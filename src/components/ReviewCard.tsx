import type { Review } from '@/lib/reviews'

export const Stars = ({ n }: { n: number }) => (
  <span className="text-lg tracking-widest text-gold" role="img" aria-label={`${n} out of 5 stars`}>
    {'★'.repeat(n)}{'☆'.repeat(5 - n)}
  </span>
)

export default function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="card h-full">
      <Stars n={r.rating} />
      <blockquote className="mt-3 text-[15.5px] leading-relaxed">“{r.text}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-pri font-extrabold text-white dark:text-[#06141A]">{r.name[0]?.toUpperCase()}</span>
        <span>
          <b className="block">{r.name}</b>
          {r.property ? <span className="text-sm text-mute">{r.property}</span> : null}
        </span>
      </figcaption>
    </figure>
  )
}
