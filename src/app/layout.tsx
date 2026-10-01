import type { Metadata, Viewport } from 'next'
import { Archivo, Geist_Mono } from 'next/font/google'
import { ViewTransition } from 'react'
import { CursorLabel, ScrollReveal } from '@/components/Motion'
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
  themeColor: '#ffffff',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const company = await getCompany()

  return (
    <html lang="en" className={`${archivo.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Scroll-reveal styles only hide content once scripting is confirmed. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
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
        <ScrollReveal />
        <CursorLabel />
      </body>
    </html>
  )
}
