'use client'
import { Children, useCallback, useEffect, useRef, type ReactNode } from 'react'

/** Horizontal slider: no scroll bar, arrows on both sides, swipe, keyboard and auto-slide */
export default function Slider({ children, label, auto = 4500 }: { children: ReactNode; label: string; auto?: number }) {
  const track = useRef<HTMLDivElement>(null)
  const paused = useRef(false)
  const resume = useRef<ReturnType<typeof setTimeout> | null>(null)

  const go = useCallback((dir: 1 | -1) => {
    const t = track.current
    if (!t) return
    const first = t.firstElementChild as HTMLElement | null
    const step = first ? first.getBoundingClientRect().width + 20 : 320
    const atEnd = t.scrollLeft + t.clientWidth >= t.scrollWidth - 6
    if (dir === 1 && atEnd) t.scrollTo({ left: 0, behavior: 'smooth' })
    else if (dir === -1 && t.scrollLeft <= 4) t.scrollTo({ left: t.scrollWidth, behavior: 'smooth' })
    else t.scrollBy({ left: dir * step, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => { if (!paused.current && !document.hidden) go(1) }, auto)
    return () => clearInterval(id)
  }, [auto, go])

  const hold = () => { paused.current = true; if (resume.current) clearTimeout(resume.current) }
  const release = () => { resume.current = setTimeout(() => { paused.current = false }, 2500) }

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label={label}
      onMouseEnter={hold} onMouseLeave={release} onFocus={hold} onBlur={release} onTouchStart={hold} onTouchEnd={release}>
      <button onClick={() => go(-1)} aria-label="Previous"
        className="absolute left-0 top-1/2 z-10 grid h-11 w-11 -translate-x-1/2 -translate-y-[60%] place-items-center rounded-full border-[1.5px] border-line bg-card text-2xl leading-none shadow-xl transition hover:scale-110 hover:bg-pri hover:text-white sm:-translate-x-1/2 lg:-left-2">
        ‹
      </button>
      <div ref={track} tabIndex={0} aria-live="off"
        onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-6 pt-2">
        {Children.map(children, (c) => (
          <div className="shrink-0 basis-[84%] snap-start sm:basis-[340px]">{c}</div>
        ))}
      </div>
      <button onClick={() => go(1)} aria-label="Next"
        className="absolute right-0 top-1/2 z-10 grid h-11 w-11 -translate-y-[60%] translate-x-1/2 place-items-center rounded-full border-[1.5px] border-line bg-card text-2xl leading-none shadow-xl transition hover:scale-110 hover:bg-pri hover:text-white lg:-right-2">
        ›
      </button>
    </div>
  )
}
