'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAV_ITEMS, TAGLINE } from '@/lib/site'

type Props = {
  companyName: string
  phone: { display: string; href: string } | null
  email: string | null
}

export function SiteHeader({ companyName, phone, email }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)

  // Close the mobile menu after navigating.
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  // Compact header once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    const frame = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // While the full-screen menu is open: lock page scroll, close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <>
    <header className="site-header" data-scrolled={scrolled}>
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label={`${companyName}, home`}>
          <Image src="/logo.webp" alt="" width={373} height={215} className="brand__mark" priority />
          <span className="brand__text">
            <span className="brand__name">{companyName}</span>
            <span className="brand__tag">{TAGLINE}</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Main">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="button button--small">
            Start a project
          </Link>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-toggle__bars" aria-hidden="true">
            <span />
            <span />
          </span>
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>

      {/* Outside <header>: its backdrop-filter would otherwise contain this fixed layer. */}
      <div id="mobile-menu" className="mobile-menu" data-open={open} data-scrolled={scrolled} inert={!open}>
        <nav aria-label="Main">
          <ul>
            {[{ href: '/', label: 'Home' }, ...NAV_ITEMS].map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={(item.href === '/' ? pathname === '/' : isCurrent(item.href)) ? 'page' : undefined}
                  style={{ '--d': i } as React.CSSProperties}
                >
                  {item.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__foot">
          <Link href="/contact" className="button">
            Start a project
          </Link>
          {phone ? <a href={phone.href}>{phone.display}</a> : null}
          {email ? <a href={`mailto:${email}`}>{email}</a> : null}
        </div>
      </div>
    </>
  )
}
