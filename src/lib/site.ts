export const NAV_ITEMS = [
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/practice', label: 'Practice' },
  { href: '/contact', label: 'Contact' },
] as const

/** The firm's own tagline from its corporate profile. */
export const TAGLINE = 'Consulting · Engineering · Planning'

/**
 * PLACEHOLDER: set NEXT_PUBLIC_SITE_URL to the production domain once it is
 * known. Used for canonical URLs, the sitemap and social previews.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/+$/, '')
