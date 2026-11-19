import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
// @ts-ignore -- Next.js provides CSS module types through next-env.d.ts
import './globals.css'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import JsonLd from '@/components/JsonLd'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { site } from '@/lib/site'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F9F9' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1C20' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: rent, tenants and payments, made simple`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'property management app India', 'PG management software', 'rent management app', 'tenant management app',
    'landlord app India', 'hostel management software', 'rent invoice app', 'rent collection app',
  ],
  openGraph: {
    type: 'website', siteName: site.name, locale: 'en_IN', url: site.url,
    title: `${site.name}: rent, tenants and payments, made simple`, description: site.description,
  },
  twitter: { card: 'summary_large_image', title: `${site.name}: rent, tenants and payments, made simple`, description: site.description },
  robots: { index: true, follow: true },
  ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION } } : {}),
}

// Sets light or dark before the page is drawn, so there is no flash
const themeScript = `(function(){try{var t=localStorage.getItem('ks-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <JsonLd
          data={[
            {
              '@context': 'https://schema.org', '@type': 'Organization', name: site.name, url: site.url,
              logo: `${site.url}/icon.svg`, email: site.email,
              contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer support', email: site.email, availableLanguage: ['English', 'Hindi'] }],
            },
            { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url, inLanguage: 'en-IN' },
          ]}
        />
      </body>
    </html>
  )
}
