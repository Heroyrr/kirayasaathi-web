'use client'
import { useState } from 'react'

export default function ReviewForm() {
  const [rating, setRating] = useState(5)
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setState('sending')
    try {
      const res = await fetch('/api/review', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: f.get('name'), property: f.get('property'), text: f.get('text'), website: f.get('website'), rating }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) { setState('done'); setMsg('Thank you! Your review was sent to us. It will appear after we approve it.'); (e.target as HTMLFormElement).reset(); setRating(5) }
      else { setState('error'); setMsg(data.error ?? 'Could not send your review. Please try again.') }
    } catch { setState('error'); setMsg('Could not send your review. Please check your internet and try again.') }
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-12 grid max-w-[520px] gap-4 text-left">
      <h2 className="text-center text-2xl font-extrabold">Write a review</h2>
      <p className="text-center text-sm text-mute">Are you a KirayaSaathi owner? Tell others how it helped you.</p>
      <div><label htmlFor="rn" className="mb-1 block text-sm font-semibold">Your name</label><input id="rn" name="name" required minLength={2} maxLength={80} className="input" placeholder="e.g. Suresh" /></div>
      <div><label htmlFor="rp" className="mb-1 block text-sm font-semibold">Your property (optional)</label><input id="rp" name="property" maxLength={80} className="input" placeholder="e.g. PG with 24 beds" /></div>
      <div>
        <span className="mb-1 block text-sm font-semibold">Rating</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button type="button" key={n} onClick={() => setRating(n)} aria-label={`${n} stars`} aria-pressed={rating === n}
              className={`text-3xl transition ${n <= rating ? 'text-gold' : 'text-line'}`}>★</button>
          ))}
        </div>
      </div>
      <div><label htmlFor="rt" className="mb-1 block text-sm font-semibold">Your review</label><textarea id="rt" name="text" required minLength={10} maxLength={800} rows={4} className="input" placeholder="How did KirayaSaathi help you?" /></div>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button className="btn-p" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send review'}</button>
      {msg ? <p role="status" className={`text-sm ${state === 'error' ? 'text-red-500' : 'text-mute'}`}>{msg}</p> : null}
    </form>
  )
}
