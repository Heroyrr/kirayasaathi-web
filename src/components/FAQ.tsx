import { faqs } from '@/lib/site'
import Reveal from './Reveal'

export default function FAQ() {
  return (
    <div className="mx-auto max-w-[760px]">
      {faqs.map((f, i) => (
        <Reveal key={f.q} delay={i * 40}>
          <details className="group mb-3 rounded-2xl border border-line bg-card px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
              {f.q}
              <span className="ml-3 text-pri transition group-open:rotate-45" aria-hidden="true">＋</span>
            </summary>
            <p className="mt-3 text-mute">{f.a}</p>
          </details>
        </Reveal>
      ))}
    </div>
  )
}
