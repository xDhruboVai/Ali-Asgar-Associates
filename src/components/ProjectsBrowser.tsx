'use client'

import Link from 'next/link'
import { useMemo, useState, useSyncExternalStore } from 'react'
import { CATEGORIES, categoryLabel } from '@/lib/normalize'
import type { CategoryId, Project } from '@/lib/types'
import { ProjectCard, shortLocation } from './ProjectCard'
import { StatusLabel } from './StatusLabel'

type Filter = 'all' | string

const STATUS_ORDER = ['Completed', 'Ongoing', 'Completed / Ongoing', 'Planning']

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
        <fieldset>
          <legend className="label">Sector</legend>
          <button type="button" className="chip" aria-pressed={category === 'all'} onClick={() => selectCategory('all')}>
            All<span className="chip__count">{projects.length}</span>
          </button>
          {categoryOptions.map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip"
              aria-pressed={category === c.id}
              onClick={() => selectCategory(c.id)}
            >
              {c.label}
              <span className="chip__count">{c.count}</span>
            </button>
          ))}
        </fieldset>
        {statusOptions.length > 1 ? (
          <fieldset>
            <legend className="label">Status</legend>
            <button type="button" className="chip" aria-pressed={activeStatus === 'all'} onClick={() => setStatus('all')}>
              Any
            </button>
            {statusOptions.map((s) => (
              <button
                key={s.id}
                type="button"
                className="chip"
                aria-pressed={activeStatus === s.id}
                onClick={() => setStatus(s.id)}
              >
                {s.id}
                <span className="chip__count">{s.count}</span>
              </button>
            ))}
          </fieldset>
        ) : null}
      </div>

      <p className="label results-note" role="status" aria-live="polite">
        Showing {summary}
      </p>

      {illustrated.length ? (
        <ul className="project-grid">
          {illustrated.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : null}

      {visible.length ? (
        <div className="index-table-wrap">
          <h2 id="index-title">Project index</h2>
          <table className="index-table" aria-labelledby="index-title">
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
              {visible.map((p) => (
                <tr key={p.slug}>
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
        </div>
      ) : (
        <p className="empty-state">No projects match these filters.</p>
      )}
    </>
  )
}
