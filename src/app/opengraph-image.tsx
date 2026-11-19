import { ImageResponse } from 'next/og'

export const alt = 'KirayaSaathi: rent, tenants and payments, made simple'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: 'linear-gradient(135deg,#0B2A30,#0F5C68)', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 96, height: 96, borderRadius: 24, background: '#F7F9F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, color: '#0F5C68' }}>🏠</div>
          <div style={{ fontSize: 76, fontWeight: 800, display: 'flex' }}>
            Kiraya<span style={{ color: '#F4A300' }}>Saathi</span>
          </div>
        </div>
        <div style={{ marginTop: 40, fontSize: 52, fontWeight: 700, lineHeight: 1.15 }}>Rent, tenants and payments, made simple.</div>
        <div style={{ marginTop: 26, fontSize: 30, color: '#BFE0E6' }}>Property management app for PG owners and landlords in India</div>
      </div>
    ),
    { ...size }
  )
}
