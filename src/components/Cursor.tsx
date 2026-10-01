'use client'

import gsap from 'gsap'
import { useEffect, useRef } from 'react'

/**
 * Pointer details for fine pointers only; the native cursor is never hidden.
 * - A label that trails the pointer over elements marked `data-cursor="View"`.
 * - Elements marked `data-magnetic` lean towards the pointer and spring back.
 * Nothing runs on touch devices or under reduced motion.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const label = el.querySelector('span') as HTMLSpanElement
    const moveX = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' })
    const moveY = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' })
    let active = false
    let magnet: HTMLElement | null = null
    let last: { x: number; y: number } | null = null
    let frame = 0

    const show = (text: string) => {
      label.textContent = text
      if (active) return
      active = true
      gsap.to(el, { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'expo.out', overwrite: 'auto' })
    }
    const hide = () => {
      if (!active) return
      active = false
      gsap.to(el, { scale: 0.2, autoAlpha: 0, duration: 0.3, ease: 'power2.in', overwrite: 'auto' })
    }
    const release = () => {
      if (!magnet) return
      gsap.to(magnet, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' })
      magnet = null
    }

    const updateLabel = (target: Element | null) => {
      const labelled = target?.closest?.('[data-cursor]')
      if (labelled) show(labelled.getAttribute('data-cursor') ?? '')
      else hide()
    }

    const onMove = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY }
      moveX(e.clientX)
      moveY(e.clientY)
      const target = e.target as Element | null
      updateLabel(target)

      const magnetic = target?.closest?.<HTMLElement>('[data-magnetic]') ?? null
      if (magnetic !== magnet) release()
      if (magnetic) {
        magnet = magnetic
        const r = magnetic.getBoundingClientRect()
        const strength = Number(magnetic.dataset.magnetic || 0.3)
        gsap.to(magnetic, {
          x: (e.clientX - (r.left + r.width / 2)) * strength,
          y: (e.clientY - (r.top + r.height / 2)) * strength,
          duration: 0.5,
          ease: 'power3.out',
        })
      }
    }
    const onLeave = () => {
      hide()
      release()
    }
    // Content moves under a still pointer while scrolling.
    const onScroll = () => {
      if (!last || frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        if (last) updateLabel(document.elementFromPoint(last.x, last.y))
      })
    }

    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.2, autoAlpha: 0 })
    document.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
    }
  }, [])

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span />
    </div>
  )
}
