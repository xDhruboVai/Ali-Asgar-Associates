'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

/**
 * The site's single motion system: Lenis smooth scrolling, synced to GSAP's
 * ticker and ScrollTrigger, plus the scroll choreography declared in markup
 * with data attributes:
 *
 *   data-words="scroll|load|fill"  headings split by <Words>
 *   data-reveal                    fade and rise, batched
 *   data-line                      a rule that draws across
 *   data-clip                      an image frame that opens upward
 *   data-parallax="0.1"            content drifting against the scroll
 *   data-speed="0.2"               an element moving at its own pace (desktop)
 *   data-expand                    a frame widening to full bleed (scrubbed)
 *   data-count="400"               a number counting up
 *   data-hscroll                   a pinned horizontal track (desktop), with
 *                                  data-hscroll-pin / -track / -bar inside
 *   data-marquee="reverse?"        an endless strip that answers scroll speed
 *
 * Under prefers-reduced-motion none of this runs and every element is shown
 * in its final state (the hidden starting states only exist under `.motion`).
 */

let lenis: Lenis | null = null

/** The running smooth-scroll instance, if any (null under reduced motion). */
export const getLenis = () => lenis

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Motion() {
  const pathname = usePathname()

  // Smooth scrolling, once for the whole visit.
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('motion-ready')
    if (prefersReducedMotion()) {
      root.classList.remove('motion')
      return
    }

    const instance = new Lenis({ lerp: 0.1, anchors: { offset: -96 }, autoRaf: false })
    lenis = instance
    instance.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      instance.destroy()
      lenis = null
    }
  }, [])

  // Choreography for the page that is showing.
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(build)
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [pathname])

  return null
}

const all = <T extends HTMLElement = HTMLElement>(selector: string) => gsap.utils.toArray<T>(selector)

function build() {
  const cleanups: (() => void)[] = []

  // Headings rise word by word out of their line masks.
  all('[data-words="scroll"], [data-words="load"]').forEach((el) => {
    const onLoad = el.dataset.words === 'load'
    gsap.fromTo(
      el.querySelectorAll('.w__i'),
      { yPercent: 118, y: 0 },
      {
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.055,
        delay: Number(el.dataset.delay ?? 0),
        scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 90%', once: true },
      },
    )
  })

  // Long statements brighten word by word as they pass through the viewport.
  all('[data-words="fill"]').forEach((el) => {
    gsap.fromTo(
      el.querySelectorAll('.w__i'),
      { opacity: 0.14 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: true },
      },
    )
  })

  // Supporting copy and blocks. Elements that arrive together are staggered in document order.
  let queued = 0
  let lastEntry = 0
  const staggerDelay = () => {
    const now = performance.now()
    if (now - lastEntry > 120) queued = 0
    lastEntry = now
    return queued++ * 0.09
  }
  all('[data-reveal]').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () =>
        gsap.to(el, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: staggerDelay(), overwrite: true }),
    })
  })

  // Drawing-sheet rules draw across before the content they divide.
  all('[data-line]').forEach((el) => {
    gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'expo.inOut',
        delay: Number(el.dataset.delay ?? 0),
        scrollTrigger: { trigger: el, start: 'top 96%', once: true },
      },
    )
  })

  // Image frames open upward, like a building rising; the picture settles from a slight zoom.
  all('[data-clip]').forEach((el) => {
    const img = el.querySelector('img')
    const tl = gsap.timeline({
      delay: Number(el.dataset.delay ?? 0),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
    tl.fromTo(
      el,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' },
    )
    if (img) tl.fromTo(img, { scale: 1.28 }, { scale: 1, duration: 2, ease: 'expo.out' }, 0.15)
  })

  // Content drifting inside its frame. The element is oversized in CSS to cover the travel.
  all('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax || 0.1) * 50
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )
  })

  // Frames that widen to full bleed as they scroll up.
  all('[data-expand]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(0% 6% 0% 6%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 10%', scrub: true },
      },
    )
  })

  // Figures count up once.
  all('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count)
    if (!Number.isFinite(end)) return
    const value = { n: 0 }
    el.textContent = '0'
    gsap.to(value, {
      n: end,
      duration: 2.2,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = String(Math.round(value.n))
      },
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    })
  })

  // Endless strips: a slow drift that speeds up and turns with the scroll.
  all('[data-marquee]').forEach((el) => {
    const track = el.querySelector<HTMLElement>('[data-marquee-track]')
    if (!track) return
    const reverse = el.dataset.marquee === 'reverse'
    const tween = gsap.fromTo(
      track,
      { xPercent: reverse ? -50 : 0 },
      { xPercent: reverse ? 0 : -50, duration: Number(el.dataset.duration || 60), ease: 'none', repeat: -1 },
    )
    let base = 1
    let target = 1
    let current = 1
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
      onUpdate: (self) => {
        base = self.direction
        target = base * (1 + Math.min(Math.abs(self.getVelocity()) / 260, 7))
      },
    })
    const tick = () => {
      target += (base - target) * 0.06
      current += (target - current) * 0.12
      tween.timeScale(current)
    }
    gsap.ticker.add(tick)
    cleanups.push(() => {
      gsap.ticker.remove(tick)
      st.kill()
    })
  })

  const mm = gsap.matchMedia()

  // Elements moving at their own pace give the work grid depth.
  mm.add('(min-width: 900px)', () => {
    all('[data-speed]').forEach((el) => {
      const speed = Number(el.dataset.speed || 0)
      gsap.fromTo(
        el,
        { y: () => speed * window.innerHeight * 0.35 },
        {
          y: () => -speed * window.innerHeight * 0.35,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
        },
      )
    })
  })

  // The turnkey journey pins and travels sideways on wide screens.
  mm.add('(min-width: 1000px)', () => {
    all('[data-hscroll]').forEach((section) => {
      const track = section.querySelector<HTMLElement>('[data-hscroll-track]')
      // The pinned element sits inside the section, so the pin spacer GSAP inserts
      // stays within markup React owns and unmounting the page is unaffected.
      const pinned = section.querySelector<HTMLElement>('[data-hscroll-pin]')
      if (!track || !pinned) return
      section.classList.add('is-hscroll')
      const distance = () => Math.max(0, track.scrollWidth - track.clientWidth)
      // The section holds still for a while after pinning, so the heading and the
      // first stages can be read before the track moves, and briefly at the end.
      const HOLD_START = 0.35
      const HOLD_END = 0.15
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance() * (1 + HOLD_START + HOLD_END) + window.innerHeight * 0.25}`,
          pin: pinned,
          scrub: 0.8,
          invalidateOnRefresh: true,
          // Measured before the triggers below it, which must include its pin spacing.
          refreshPriority: 1,
        },
      })
      tl.to(track, { x: () => -distance(), ease: 'power1.inOut', duration: 1 }, HOLD_START)
      const bar = section.querySelector('[data-hscroll-bar]')
      if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'power1.inOut', duration: 1 }, HOLD_START)
      tl.to({}, { duration: HOLD_END })
      return () => section.classList.remove('is-hscroll')
    })
  })

  return () => {
    cleanups.forEach((fn) => fn())
    mm.revert()
  }
}
