'use client'

import { usePathname } from 'next/navigation'

/** Every page has a sheet number, as in a drawing set. */
const SHEETS: [prefix: string, number: string, title: string][] = [
  ['/projects/', 'A-110', 'Project'],
  ['/projects', 'A-100', 'Projects'],
  ['/services', 'A-200', 'Services'],
  ['/practice', 'A-300', 'Practice'],
  ['/contact', 'A-400', 'Contact'],
]

export function SheetLabel() {
  const pathname = usePathname()
  const [, number, title] = SHEETS.find(([prefix]) => pathname.startsWith(prefix)) ?? ['', 'A-000', 'Home']
  return (
    <p className="tb-value">
      {number} <span className="tb-muted">{title}</span>
    </p>
  )
}
