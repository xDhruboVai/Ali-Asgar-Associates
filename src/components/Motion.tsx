'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

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
 *   data-build                     the turnkey building, assembled stage by
 *                                  stage: pinned and scrubbed on wide screens,
 *                                  played once on narrow ones (see construction())
 *   data-marquee="reverse?"        an endless strip that answers scroll speed
 *
 * Under prefers-reduced-motion none of this runs and every element is shown
 * in its final state (the hidden starting states only exist under `.motion`).
 *
 * It also decides where each new page opens (see placeScroll): at the top
 * after following a link, at the target of a #hash link, and where the reader
 * left off after Back or Forward. Smooth scrolling keeps its own position,
 * so without this a new page could open wherever the last one was.
 */

let lenis: Lenis | null = null

/** The running smooth-scroll instance, if any (null under reduced motion). */
export const getLenis = () => lenis

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Motion() {
  const pathname = usePathname()
  // Where the reader was on each page, for Back and Forward.
  const positions = useRef(new Map<string, number>())
  const pageKey = useRef('')
  const fromHistory = useRef(false)
  const visited = useRef(false)

  // Remember the scroll position of the page being left.
  useEffect(() => {
    const save = () => positions.current.set(pageKey.current, window.scrollY)
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('a[href]')) save()
    }
    const onPopState = () => {
      save()
      fromHistory.current = true
    }
    document.addEventListener('click', onClick, true)
    window.addEventListener('popstate', onPopState)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

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
    const key = window.location.pathname + window.location.search
    pageKey.current = key
    // The first page of a visit keeps the browser's own position (a reload, a deep link).
    const navigated = visited.current
    visited.current = true
    const restore = fromHistory.current ? (positions.current.get(key) ?? 0) : null
    fromHistory.current = false

    if (prefersReducedMotion()) {
      if (navigated) placeScroll(restore)
      return
    }

    const ctx = gsap.context(build)
    // Placed after the choreography is built, so pinned sections already have their full height.
    if (navigated) placeScroll(restore)
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

/**
 * Opens a newly shown page at the right place: a remembered position (Back,
 * Forward), else the element named by the #hash, else the top.
 */
function placeScroll(restore: number | null) {
  let y = restore ?? 0
  const hash = window.location.hash.slice(1)
  if (restore === null && hash) {
    const target = document.getElementById(decodeURIComponent(hash))
    if (target) y = target.getBoundingClientRect().top + window.scrollY - 96
  }
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true })
  else window.scrollTo(0, y)
  ScrollTrigger.update()
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

  // The turnkey building: pinned and built by the scroll on wide screens, built once on arrival elsewhere.
  mm.add({ wide: '(min-width: 1000px)', narrow: '(max-width: 999px)' }, (context) => {
    const wide = Boolean(context.conditions?.wide)
    all('[data-build]').forEach((section) => {
      const { tl, sync } = construction(section)
      if (wide) {
        const pinned = section.querySelector<HTMLElement>('[data-build-pin]')
        section.classList.add('is-scrubbed')
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * 3}`,
          // The pinned element sits inside the section, so the pin spacer GSAP inserts
          // stays within markup React owns and unmounting the page is unaffected.
          pin: pinned,
          scrub: 0.8,
          animation: tl,
          invalidateOnRefresh: true,
          // Measured before the triggers below it, which must include its pin spacing.
          refreshPriority: 1,
          // A jump past either end (a reload part-way down, an anchor link) skips the
          // timeline's own updates, so the steps are set from the scroll position too.
          onLeave: () => sync(1),
          onLeaveBack: () => sync(0),
          onRefresh: (self) => sync(self.progress),
        })
      } else {
        tl.timeScale(1.5)
        ScrollTrigger.create({
          trigger: section.querySelector('.bd') ?? section,
          start: 'top 75%',
          once: true,
          onEnter: () => tl.play(),
        })
      }
    })
    return () => all('[data-build]').forEach((section) => section.classList.remove('is-scrubbed'))
  })

  return () => {
    cleanups.forEach((fn) => fn())
    mm.revert()
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * The building in the turnkey section going up, one time unit per stage of the
 * journey (see BuildingDrawing.tsx for the parts): the plot, the grid, the
 * drawn outline, the structure, the floors under a crane, then the walls and
 * roof while the crane and the outline leave. The step list, counter and rail
 * follow the timeline, whichever way it runs.
 */
function construction(section: HTMLElement) {
  const q = gsap.utils.selector(section)
  const steps = q<HTMLElement>('[data-build-step]')
  const count = section.querySelector('[data-build-count]')
  const label = section.querySelector('[data-build-label]')
  const bar = section.querySelector('[data-build-bar]')
  const floors = [...new Set(q<SVGElement>('[data-role="slab"]').map((el) => el.dataset.floor))]

  let current = -1
  const setStep = (i: number) => {
    if (i === current) return
    current = i
    steps.forEach((el, n) => {
      el.classList.toggle('is-active', n === i)
      el.classList.toggle('is-done', n < i)
    })
    if (count) count.textContent = `${pad(i + 1)} / ${pad(steps.length)}`
    if (label) label.textContent = steps[i]?.dataset.name ?? ''
  }

  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out', duration: 0.5 } })

  // 1 Vision, 2 Planning: the plot and trees, then the grid, appear on the empty site.
  tl.fromTo(q('[data-stage="1"]'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, stagger: 0.15 }, 0)
  tl.fromTo(q('[data-stage="2"]'), { autoAlpha: 0 }, { autoAlpha: 1 }, 1)
  // 3 Design: the outline of the whole building is drawn.
  tl.fromTo(q('[data-stage="3"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 2)
  // 4 Engineering: pile caps, then the frame rising floor by floor.
  tl.fromTo(q('[data-stage="4"]'), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, stagger: 0.14 }, 3)
  // 5 Construction: the crane arrives, then columns and a slab for each floor.
  tl.fromTo(q('[data-role="crane"]'), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 4)
  floors.forEach((floor, i) => {
    const at = 4.15 + i * 0.2
    tl.fromTo(
      q(`[data-role="cols"][data-floor="${floor}"]`),
      { scaleY: 0, transformOrigin: '50% 100%' },
      { scaleY: 1, duration: 0.25 },
      at,
    )
    tl.fromTo(q(`[data-role="slab"][data-floor="${floor}"]`), { autoAlpha: 0, y: -20 }, { autoAlpha: 1, y: 0, duration: 0.3 }, at + 0.12)
  })
  // 6 Completion: walls close in from the ground up, the roof goes on, the crane and outline go.
  tl.fromTo(q('[data-role="walls"]'), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.35 }, 5)
  tl.fromTo(q('[data-role="roof"]'), { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 5.45)
  tl.to(q('[data-role="crane"], [data-stage="3"]'), { autoAlpha: 0, duration: 0.3 }, 5.6)
  if (bar) tl.fromTo(bar, { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: 6 }, 0)
  // Hold the finished building for a moment before the section unpins.
  tl.to({}, { duration: 0.4 })

  /** The step for a point in the timeline, given as progress from 0 to 1. */
  const sync = (progress: number) => setStep(Math.min(steps.length - 1, Math.floor(progress * tl.duration())))
  tl.eventCallback('onUpdate', () => sync(tl.progress()))
  sync(0)
  return { tl, sync }
}
