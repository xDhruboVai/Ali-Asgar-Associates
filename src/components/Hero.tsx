'use client'

import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, ViewTransition } from 'react'
import { BtnLabel } from './Ui'
import { Words } from './Words'

export type HeroBuilding = {
  slug: string
  name: string
  place: string | null
  image: { src: string; alt: string }
}

type Props = {
  buildings: HeroBuilding[]
  established: number | null
}

/** Heights of the elevation, as a share of the tallest building. */
const HEIGHTS = [0.7, 1, 0.56, 0.86, 0.64]
/** How far each picture drifts inside its frame, for depth. */
const DEPTH = [0.5, 1, 0.35, 0.8, 0.45]

/**
 * The first viewport: the headline above an elevation of the firm's own
 * buildings, standing on one ground line. The line draws, the buildings rise
 * in turn, then drift at different depths with the scroll and the pointer.
 * Without motion everything is simply in place.
 */
export function Hero({ buildings, established }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = ref.current
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section)
      const frames = q('[data-hero-frame]')
      const images = q('[data-hero-frame] img')

      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .fromTo(q('.hero__title .w__i'), { yPercent: 118, y: 0 }, { yPercent: 0, duration: 1.4, stagger: 0.09 }, 0.1)
        .fromTo(q('[data-hero-line]'), { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: 'expo.inOut' }, 0.05)
        .fromTo(
          frames,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut', stagger: { each: 0.1, from: 'center' } },
          0.5,
        )
        .fromTo(images, { scale: 1.4 }, { scale: 1, duration: 2.4, stagger: { each: 0.1, from: 'center' } }, 0.6)
        .fromTo(
          q('[data-hero-fade]'),
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08, ease: 'power3.out' },
          0.75,
        )

      // Leaving the hero: the headline lifts away faster than the buildings.
      gsap.to(q('.hero__head'), {
        yPercent: -22,
        autoAlpha: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      })

      const layers = q<HTMLElement>('[data-hero-depth]')
      layers.forEach((layer, i) => {
        gsap.to(layer, {
          yPercent: 9 * DEPTH[i % DEPTH.length],
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
        })
      })

      // The pointer tilts the elevation slightly, nearer buildings moving more.
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const movers = layers.map((layer) => gsap.quickTo(layer, 'xPercent', { duration: 1.2, ease: 'power3.out' }))
        const onMove = (e: PointerEvent) => {
          const offset = e.clientX / window.innerWidth - 0.5
          movers.forEach((move, i) => move(-offset * 7 * DEPTH[i % DEPTH.length]))
        }
        const onLeave = () => movers.forEach((move) => move(0))
        section.addEventListener('pointermove', onMove)
        section.addEventListener('pointerleave', onLeave)
        return () => {
          section.removeEventListener('pointermove', onMove)
          section.removeEventListener('pointerleave', onLeave)
        }
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="container hero__head">
        <p className="hero__annot" data-hero-fade>
          <span>Sheet A-000</span>
          {established ? <span>Est. {established}</span> : null}
          <span>23.76° N, 90.37° E</span>
          <span>Lalmatia, Dhaka</span>
        </p>
        <h1 id="hero-title" className="hero__title">
          <Words text={'Architecture,\n*engineered.*'} mode="manual" />
        </h1>
        <div className="hero__aside" data-hero-fade>
          <p className="hero__lede">
            Structural, architectural and building-services design from one office in Lalmatia, Dhaka
            {established ? `, since ${established}` : ''}.
          </p>
          <div className="hero__actions">
            <Link href="/projects" className="btn btn--red" data-magnetic="0.25">
              <BtnLabel>See the work</BtnLabel>
            </Link>
            <Link href="/services" className="text-link">
              Our services
            </Link>
          </div>
        </div>
      </div>

      <div className="container hero__elevation">
        <ul className="skyline" aria-label="Featured buildings">
          {buildings.map((b, i) => (
            <li
              key={b.slug}
              className="skyline__item"
              style={{ '--h': HEIGHTS[i % HEIGHTS.length] } as React.CSSProperties}
            >
              <Link href={`/projects/${b.slug}`} className="skyline__link" data-cursor="View">
                <span className="skyline__frame" data-hero-frame>
                  <span className="skyline__depth" data-hero-depth>
                    <ViewTransition name={`project-${b.slug}`} share="project-image" default="none">
                      <Image
                        src={b.image.src}
                        alt={b.image.alt}
                        fill
                        priority={i < 3}
                        sizes="(min-width: 900px) 20vw, 34vw"
                        quality={85}
                      />
                    </ViewTransition>
                  </span>
                </span>
                <span className="skyline__tag">
                  <span className="skyline__num">0{i + 1}</span>
                  <span className="skyline__name">{b.name}</span>
                  {b.place ? <span className="skyline__place">{b.place}</span> : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <span className="ground" data-hero-line aria-hidden="true" />
        <p className="hero__foot" data-hero-fade>
          <span>Elevation — selected buildings</span>
          <span className="hero__scroll" aria-hidden="true">
            Scroll
          </span>
        </p>
      </div>
    </section>
  )
}
