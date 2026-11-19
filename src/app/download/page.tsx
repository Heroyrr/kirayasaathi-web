import type { Metadata } from 'next'
import Link from 'next/link'
import { site, wa } from '@/lib/site'

// Not in the menu and hidden from Google. Send this address only to owners you have approved.
export const metadata: Metadata = {
  title: 'Download the app',
  robots: { index: false, follow: false },
}

export default function Download() {
  return (
    <div className="py-16">
      <div className="wrap max-w-[640px] text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Download {site.name}</h1>
        <p className="mt-3 text-mute">Android app. You need a login from us to sign in. If you do not have one yet, request your free trial first.</p>
        {site.apkUrl ? (
          <a href={site.apkUrl} className="btn-p mt-7" download>Download the Android app (APK)</a>
        ) : (
          <p className="mt-7 rounded-2xl bg-soft p-4 text-sm text-mute">The download link is not set yet. Add NEXT_PUBLIC_APK_URL in your website settings.</p>
        )}
        <ol className="mx-auto mt-10 max-w-md space-y-4 text-left text-mute">
          <li><b className="text-ink">1.</b> Tap the download button on your Android phone and wait for the file to finish.</li>
          <li><b className="text-ink">2.</b> Open the downloaded file. If Android asks, allow “Install unknown apps” for your browser.</li>
          <li><b className="text-ink">3.</b> If Play Protect shows a warning, choose “Install anyway”.</li>
          <li><b className="text-ink">4.</b> Open {site.name} and log in with the email and password we sent you.</li>
        </ol>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-g">Request a free trial</Link>
          <a href={wa('Hi KirayaSaathi, I need help installing the app.')} target="_blank" rel="noopener noreferrer" className="btn-o">Need help? WhatsApp us</a>
        </div>
      </div>
    </div>
  )
}
