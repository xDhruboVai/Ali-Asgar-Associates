'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { CATEGORIES, categoryLabel } from '@/lib/normalize'
import type { CategoryId, Project } from '@/lib/types'
import { ProjectCard, shortLocation } from './ProjectCard'
import { StatusLabel } from './StatusLabel'

type Filter = 'all' | string

const STATUS_ORDER = ['Completed', 'Ongoing', 'Completed / Ongoing', 'Planning']

const chipLabel = (id: CategoryId) => (id === 'assessment' ? 'Assessment' : id === 'other' ? 'Other' : categoryLabel(id))

// The ?category= query is read on the client only, so the server can render
// the full, unfiltered list into static HTML.
const subscribe = (onChange: () => void) => {
  window.addEventListener('popstate', onChange)
  return () => window.removeEventListener('popstate', onChange)
}
const readCategoryParam = () => new URLSearchParams(window.location.search).get('category')

export function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const urlCategory = useSyncExternalStore(subscribe, readCategoryParam, () => null)
  const [picked, setPicked] = useState<Filter | null>(null)
  const category: Filter =
    picked ?? (CATEGORIES.some((c) => c.id === urlCategory) ? (urlCategory as CategoryId) : 'all')
  const [status, setStatus] = useState<Filter>('all')

  const categoryOptions = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        ...c,
        count: projects.filter((p) => p.categories.includes(c.id)).length,
      })).filter((c) => c.count > 0),
    [projects],
  )

  const inCategory = useMemo(
    () => (category === 'all' ? projects : projects.filter((p) => p.categories.includes(category as CategoryId))),
    [projects, category],
  )

  const statusOptions = useMemo(() => {
    const present = new Set(inCategory.map((p) => p.status).filter(Boolean) as string[])
    return STATUS_ORDER.filter((s) => present.has(s)).map((s) => ({
      id: s,
      count: inCategory.filter((p) => p.status === s).length,
    }))
  }, [inCategory])

  const activeStatus = status !== 'all' && statusOptions.some((s) => s.id === status) ? status : 'all'
  const visible = activeStatus === 'all' ? inCategory : inCategory.filter((p) => p.status === activeStatus)
  const illustrated = visible.filter((p) => p.images.length)

  // The page height changes with the filter; scroll-linked effects below need fresh measurements.
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [category, activeStatus])

  const selectCategory = (value: Filter) => {
    setPicked(value)
    const url = new URL(window.location.href)
    if (value === 'all') url.searchParams.delete('category')
    else url.searchParams.set('category', value)
    window.history.replaceState(null, '', url)
  }

  const summary = [
    `${visible.length} ${visible.length === 1 ? 'project' : 'projects'}`,
    category !== 'all' ? categoryLabel(category as CategoryId).toLowerCase() : null,
    activeStatus !== 'all' ? activeStatus.toLowerCase() : null,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <>
      <div className="filters">
        <fieldset className="filters__group">
          <legend className="filters__legend">Sector</legend>
          <div className="filters__options">
            <button type="button" className="filter" aria-pressed={category === 'all'} onClick={() => selectCategory('all')}>
              All<sup>{projects.length}</sup>
            </button>
            {categoryOptions.map((c) => (
              <button
                key={c.id}
                type="button"
                className="filter"
                aria-pressed={category === c.id}
                onClick={() => selectCategory(c.id)}
              >
                {chipLabel(c.id)}
                <sup>{c.count}</sup>
              </button>
            ))}
          </div>
        </fieldset>
        {statusOptions.length > 1 ? (
          <fieldset className="filters__group">
            <legend className="filters__legend">Status</legend>
            <div className="filters__options">
              <button type="button" className="filter" aria-pressed={activeStatus === 'all'} onClick={() => setStatus('all')}>
                Any
              </button>
              {statusOptions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="filter"
                  aria-pressed={activeStatus === s.id}
                  onClick={() => setStatus(s.id)}
                >
                  {s.id}
                  <sup>{s.count}</sup>
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}
      </div>

      <p className="results-note" role="status" aria-live="polite">
        Showing {summary}
      </p>

      {illustrated.length ? (
        // Re-keyed on every filter change so the cards settle in again.
        <ul key={`${category}|${activeStatus}`} className="project-grid">
          {illustrated.map((project, i) => (
            <li key={project.slug} style={{ '--i': Math.min(i, 12) } as React.CSSProperties}>
              <ProjectCard
                project={project}
                headingLevel="h2"
                index={String(i + 1).padStart(2, '0')}
                animated={false}
                priority={i < 3}
              />
            </li>
          ))}
        </ul>
      ) : null}

      {visible.length ? <ProjectIndex projects={visible} /> : <p className="empty-state">No projects match these filters.</p>}
    </>
  )
}

/** Every project as a schedule. On fine pointers a picture of the building follows the pointer along the rows. */
function ProjectIndex({ projects }: { projects: Project[] }) {
  const previewRef = useRef<HTMLDivElement>(null)
  const [preview, setPreview] = useState<Project | null>(null)
  const move = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null)

  useEffect(() => {
    const el = previewRef.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    gsap.set(el, { xPercent: -50, yPercent: -50 })
    move.current = {
      x: gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' }),
    }
  }, [])

  const onMove = (e: React.PointerEvent) => {
    move.current?.x(e.clientX)
    move.current?.y(e.clientY)
  }

  return (
    <section className="index" aria-labelledby="index-title">
      <h2 id="index-title" className="index__title">
        Project index <sup>{projects.length}</sup>
      </h2>
      <table className="index-table" aria-labelledby="index-title" onPointerMove={onMove} onPointerLeave={() => setPreview(null)}>
        <thead>
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Location</th>
            <th scope="col">Building</th>
            <th scope="col">Sector</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.slug} onPointerEnter={() => setPreview(p.images.length ? p : null)}>
              <th scope="row">
                <Link href={`/projects/${p.slug}`}>{p.name}</Link>
              </th>
              <td data-label="Location">{shortLocation(p.address) ?? '—'}</td>
              <td data-label="Building">{p.description ?? '—'}</td>
              <td data-label="Sector">{p.categories.map(categoryLabel).join(', ')}</td>
              <td data-label="Status">{p.status ? <StatusLabel status={p.status} /> : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div ref={previewRef} className="index-preview" data-active={Boolean(preview)} aria-hidden="true">
        {preview ? <Image key={preview.slug} src={preview.images[0].src} alt="" fill sizes="280px" /> : null}
      </div>
    </section>
  )
}
