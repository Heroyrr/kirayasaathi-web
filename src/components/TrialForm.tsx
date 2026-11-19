'use client'
import { useState } from 'react'
import { wa } from '@/lib/site'

export default function TrialForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const [link, setLink] = useState(wa('Hi KirayaSaathi, I want a free trial.'))

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const body = {
      name: String(f.get('name') ?? ''), phone: String(f.get('phone') ?? ''), city: String(f.get('city') ?? ''),
      propertyType: String(f.get('propertyType') ?? ''), units: String(f.get('units') ?? ''), message: String(f.get('message') ?? ''),
      website: String(f.get('website') ?? ''),
    }
    const text = `Hi KirayaSaathi, I want a free trial.\nName: ${body.name}\nMobile: ${body.phone}\nCity: ${body.city}\nProperty: ${body.propertyType}, ${body.units} units`
    setLink(wa(text))
    setState('sending')
    try {
      const res = await fetch('/api/trial', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json().catch(() => ({}))
      if (res.ok) { setState('done'); setMsg('Thank you! We have your request and will contact you on WhatsApp shortly.') }
      else { setState('error'); setMsg(data.error ?? 'We could not save your request. Please message us on WhatsApp instead.') }
    } catch { setState('error'); setMsg('We could not save your request. Please message us on WhatsApp instead.') }
  }

  if (state === 'done') {
    return (
      <div className="card text-center">
        <div className="text-5xl" aria-hidden="true">🎉</div>
        <h2 className="mt-3 text-2xl font-extrabold">Request received</h2>
        <p className="mt-2 text-mute">{msg}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-g mt-6">Message us on WhatsApp now</a>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="card grid gap-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="tn" className="mb-1 block text-sm font-semibold">Your name</label><input id="tn" name="name" required minLength={2} maxLength={80} className="input" autoComplete="name" /></div>
        <div><label htmlFor="tp" className="mb-1 block text-sm font-semibold">Mobile number</label><input id="tp" name="phone" required inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength={10} className="input" placeholder="10 digits" autoComplete="tel-national" /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="tc" className="mb-1 block text-sm font-semibold">City</label><input id="tc" name="city" required maxLength={60} className="input" autoComplete="address-level2" /></div>
        <div>
          <label htmlFor="tt" className="mb-1 block text-sm font-semibold">What do you manage?</label>
          <select id="tt" name="propertyType" className="input" defaultValue="PG or hostel">
            <option>PG or hostel</option><option>Flats</option><option>Shops</option><option>A mix</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="tu" className="mb-1 block text-sm font-semibold">How many rooms, beds or units?</label>
        <select id="tu" name="units" className="input" defaultValue="1 to 10">
          <option>1 to 10</option><option>11 to 25</option><option>26 to 60</option><option>61 to 150</option><option>More than 150</option>
        </select>
      </div>
      <div><label htmlFor="tm" className="mb-1 block text-sm font-semibold">Anything else? (optional)</label><textarea id="tm" name="message" rows={3} maxLength={500} className="input" /></div>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <p className="text-xs text-mute">By sending this you agree that we may contact you about KirayaSaathi. We do not share your number with anyone else.</p>
      <div className="flex flex-wrap gap-3">
        <button className="btn-p" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Request my free trial'}</button>
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-o">Or chat on WhatsApp</a>
      </div>
      {msg ? <p role="status" className="text-sm text-red-500">{msg}</p> : null}
    </form>
  )
}
