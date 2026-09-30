import type { Metadata, Viewport } from 'next'
import { Archivo, IBM_Plex_Mono } from 'next/font/google'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getCompany } from '@/lib/data'
import { titleCase } from '@/lib/normalize'
import { SITE_URL, TAGLINE } from '@/lib/site'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
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
  themeColor: '#f4f1ea',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const company = await getCompany()

  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader companyName={titleCase(company.name)} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
