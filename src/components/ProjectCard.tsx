import Image from 'next/image'
import Link from 'next/link'
import { ViewTransition } from 'react'
import { categoryLabel } from '@/lib/normalize'
import type { Project } from '@/lib/types'
import { StatusLabel } from './StatusLabel'

type Props = {
  project: Project
  sizes?: string
  priority?: boolean
  headingLevel?: 'h2' | 'h3'
  /** Index shown on the card, e.g. "01". */
  index?: string
  /** Frame proportion; portrait suits most of the renders. */
  ratio?: 'tall' | 'portrait' | 'square'
  /** Scroll effects: the frame opens on entry and the picture drifts inside it. */
  animated?: boolean
}

export function ProjectCard({
  project,
  sizes = '(min-width: 1040px) 33vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
  headingLevel: Heading = 'h3',
  index,
  ratio = 'portrait',
  animated = true,
}: Props) {
  const image = project.images[0]

  return (
    <article className={`pcard pcard--${ratio}`} data-cursor="View">
      <div className="pcard__media" data-clip={animated ? '' : undefined}>
        {image ? (
          <div className="pcard__plx" data-parallax={animated ? '0.12' : undefined}>
            {/* Same name as the case-study hero, so the picture morphs between pages. */}
            <ViewTransition name={`project-${project.slug}`} share="project-image" default="none">
              <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} />
            </ViewTransition>
          </div>
        ) : (
          <span className="pcard__empty">No image published</span>
        )}
      </div>
      <div className="pcard__info">
        {index ? (
          <span className="pcard__index" aria-hidden="true">
            {index}
          </span>
        ) : null}
        <Heading className="pcard__title">
          <Link href={`/projects/${project.slug}`}>{project.name}</Link>
        </Heading>
        <ProjectMeta project={project} />
      </div>
    </article>
  )
}

/** Type / location / status line. */
export function ProjectMeta({ project }: { project: Project }) {
  const location = shortLocation(project.address)
  return (
    <p className="meta">
      <span>{project.categories.map(categoryLabel).join(' + ')}</span>
      {location ? <span>{location}</span> : null}
      {project.status ? <StatusLabel status={project.status} /> : null}
    </p>
  )
}

/** The last one or two parts of an address, e.g. "Gulshan, Dhaka". */
export function shortLocation(address: string | null): string | null {
  if (!address) return null
  const parts = address
    .split(',')
    .map((p) => p.trim().replace(/\.$/, ''))
    .filter((p) => p && !/^(plot|house|road|block|apt|sector|section|flat|dag|cs dag|ploit)\b/i.test(p) && !/\d/.test(p))
  const pair = parts.slice(-2).join(', ')
  if (pair.length <= 30) return pair || null
  // Addresses stored without commas: keep the last two words, e.g. "Cox's Bazar".
  const last = parts.at(-1) ?? ''
  return (last.length > 30 ? last.split(' ').slice(-2).join(' ') : last) || null
}
