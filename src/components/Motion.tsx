'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/**
 * Adds `is-in` to every [data-reveal] element as it scrolls into view.
 * The hidden starting state only applies under `.js` (set in the document
 * head), so content stays visible if JavaScript never runs.
 */
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]:not(.is-in)')
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}

/**
 * A small label that follows the pointer over elements marked with
 * `data-cursor="View"`. Hidden on touch devices and under reduced motion (CSS).
 */
export function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest?.('[data-cursor]')
      if (target) {
        el.textContent = target.getAttribute('data-cursor')
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
        el.dataset.active = 'true'
      } else {
        el.dataset.active = 'false'
      }
    }
    const hide = () => {
      el.dataset.active = 'false'
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', hide)
    window.addEventListener('scroll', hide, { passive: true })
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', hide)
      window.removeEventListener('scroll', hide)
    }
  }, [])

  return <div ref={ref} className="cursor-label" aria-hidden="true" />
}
