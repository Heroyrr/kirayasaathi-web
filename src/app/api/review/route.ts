import { NextResponse, type NextRequest } from 'next/server'
import { limited } from '@/lib/rateLimit'
import { getSupabase } from '@/lib/supabase'

const clean = (v: unknown, max: number) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max)

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (limited(ip, 5)) return NextResponse.json({ error: 'Too many tries. Please wait a few minutes.' }, { status: 429 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  if (body.website) return NextResponse.json({ ok: true }) // a bot filled the hidden field: pretend it worked

  const name = clean(body.name, 80)
  const property = clean(body.property, 80)
  const text = clean(body.text, 800)
  const rating = Number(body.rating)
  if (name.length < 2 || text.length < 10 || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Please enter your name, a rating and a review of at least 10 characters.' }, { status: 400 })
  }
  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'Reviews are not available right now.' }, { status: 503 })
  const { error } = await sb.from('reviews').insert({ name, property: property || null, rating, text, status: 'pending' })
  if (error) return NextResponse.json({ error: 'Could not save your review. Please try again later.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
