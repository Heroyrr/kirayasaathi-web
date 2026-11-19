import { NextResponse, type NextRequest } from 'next/server'
import { limited } from '@/lib/rateLimit'
import { getSupabase } from '@/lib/supabase'

const clean = (v: unknown, max: number) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max)

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (limited(ip, 5)) return NextResponse.json({ error: 'Too many tries. Please wait a few minutes or message us on WhatsApp.' }, { status: 429 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  if (body.website) return NextResponse.json({ ok: true })

  const name = clean(body.name, 80)
  const phone = clean(body.phone, 20).replace(/\D/g, '').slice(-10)
  const city = clean(body.city, 60)
  const propertyType = clean(body.propertyType, 40)
  const units = clean(body.units, 20)
  const message = clean(body.message, 500)
  if (name.length < 2 || !/^[6-9]\d{9}$/.test(phone) || city.length < 2) {
    return NextResponse.json({ error: 'Please enter your name, a valid 10-digit mobile number and your city.' }, { status: 400 })
  }
  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'We could not save your request. Please message us on WhatsApp instead.' }, { status: 503 })
  const { error } = await sb.from('trial_requests').insert({
    name, phone, city, property_type: propertyType || null, units: units || null, message: message || null,
  })
  if (error) return NextResponse.json({ error: 'We could not save your request. Please message us on WhatsApp instead.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
