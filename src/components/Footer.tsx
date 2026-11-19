import { site, wa } from '@/lib/site'
import Link from 'next/link'
import { Brand } from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-line py-12 text-sm text-mute">
      <div className="wrap grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Brand className="text-lg" />
          <p className="mt-3 max-w-xs">{site.tagline} A simple app for PG owners and landlords in India.</p>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-ink">Product</h3>
          <ul className="space-y-2">
            <li><Link href="/#features" className="hover:text-pri">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-pri">Pricing</Link></li>
            <li><Link href="/reviews" className="hover:text-pri">Reviews</Link></li>
            <li><Link href="/contact" className="hover:text-pri">Start free trial</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-ink">Learn</h3>
          <ul className="space-y-2">
            <li><Link href="/blog" className="hover:text-pri">Blog</Link></li>
            <li><Link href="/#how" className="hover:text-pri">How it works</Link></li>
            <li><Link href="/#faq" className="hover:text-pri">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-ink">Contact</h3>
          <ul className="space-y-2">
            <li><a href={wa('Hi KirayaSaathi')} className="hover:text-pri">WhatsApp us</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-pri">{site.email}</a></li>
            <li><Link href="/privacy" className="hover:text-pri">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-pri">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap mt-10 border-t border-line pt-6">© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
    </footer>
  )
}
