'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAV_ITEMS } from '@/lib/site'
import { getLenis } from './Motion'
import { BtnLabel } from './Ui'
import { withAmpersand } from './Words'

type Props = {
  companyName: string
  phone: { display: string; href: string } | null
  email: string | null
}

export function SiteHeader({ companyName, phone, email }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)

  // Close the menu and show the header after navigating.
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
    setHidden(false)
  }

  // Solid once scrolled; tucks away while reading down, returns on the way up.
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 320)
        lastY = y
      }
    }
    const frame = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // While the menu is open: hold the page still, close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    getLenis()?.stop()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      getLenis()?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <>
      <header className="site-header" data-scrolled={scrolled} data-hidden={hidden && !open} data-open={open}>
        <div className="container site-header__inner">
          <Link href="/" className="brand" aria-label={`${companyName}, home`}>
            <span className="brand__tile">
              <Image src="/logo.webp" alt="" width={376} height={208} className="brand__mark" priority />
            </span>
            <span className="brand__name">{withAmpersand(companyName)}</span>
          </Link>

          <nav className="nav" aria-label="Main">
            <ul>
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>
                    <span className="nav__num" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <span className="roll">
                      <span data-text={item.label}>{item.label}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href="/contact" className="btn btn--light btn--small header-cta" data-magnetic="0.25">
            <BtnLabel>Start a project</BtnLabel>
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-toggle__label">{open ? 'Close' : 'Menu'}</span>
            <span className="menu-toggle__bars" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <div id="mobile-menu" className="menu" data-open={open} inert={!open}>
        <nav aria-label="Main">
          <ol>
            {[{ href: '/', label: 'Home' }, ...NAV_ITEMS].map((item, i) => (
              <li key={item.href} style={{ '--i': i } as React.CSSProperties}>
                <Link href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>
                  <span className="menu__num" aria-hidden="true">
                    0{i}
                  </span>
                  <span className="menu__label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu__foot">
          {phone ? <a href={phone.href}>{phone.display}</a> : null}
          {email ? <a href={`mailto:${email}`}>{email}</a> : null}
          <span>Lalmatia, Dhaka</span>
        </div>
      </div>
    </>
  )
}
