import type { Metadata, Viewport } from 'next'
import { Archivo, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { ViewTransition } from 'react'
import { Cursor } from '@/components/Cursor'
import { Motion } from '@/components/Motion'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getCompany } from '@/lib/data'
import { phoneLinks, titleCase } from '@/lib/normalize'
import { SITE_URL, TAGLINE } from '@/lib/site'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

// One italic accent per headline; never used for body text.
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-instrument',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompany()
  const name = titleCase(company.name)
  const description = `${name} is an architectural and structural engineering consultancy in Lalmatia, Dhaka, established in ${company.established_year ?? 2006}. ${TAGLINE}.`
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${name} | Architecture & Structural Engineering, Dhaka`, template: `%s | ${name}` },
    description,
    icons: { icon: '/logo.webp' },
    openGraph: { type: 'website', siteName: name, locale: 'en_BD', description },
  }
}

export const viewport: Viewport = {
  // The logo black every page opens on.
  themeColor: 'rgb(13, 13, 17)',
}

/**
 * Runs before paint. `motion` enables the hidden starting states of the
 * entrance animations; it is never added under reduced motion, and it is
 * removed again if the motion script has not started within three seconds,
 * so content can never stay hidden.
 */
const MOTION_BOOT = `(function(d){var h=d.documentElement;h.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches){h.classList.add('motion');setTimeout(function(){if(!h.classList.contains('motion-ready'))h.classList.remove('motion')},3000)}})(document)`

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const company = await getCompany()

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader
          companyName={titleCase(company.name)}
          phone={phoneLinks(company.telephone)}
          email={company.email}
        />
        <main id="main" tabIndex={-1}>
          <ViewTransition>{children}</ViewTransition>
        </main>
        <SiteFooter />
        <Motion />
        <Cursor />
      </body>
    </html>
  )
}
