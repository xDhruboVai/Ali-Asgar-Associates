import Image from 'next/image'
import Link from 'next/link'
import { categoryLabel } from '@/lib/normalize'
import type { Project } from '@/lib/types'
import { StatusLabel } from './StatusLabel'

type Props = {
  project: Project
  sizes?: string
  priority?: boolean
  headingLevel?: 'h2' | 'h3'
}

export function ProjectCard({
  project,
  sizes = '(min-width: 1040px) 30vw, (min-width: 640px) 45vw, 100vw',
  priority = false,
  headingLevel: Heading = 'h3',
}: Props) {
  const image = project.images[0]
  const location = shortLocation(project.address)

  return (
    <article className="card">
      <div className="card__media">
        {image ? <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} /> : null}
      </div>
      <div className="card__body">
        <Heading className="card__title">
          <Link href={`/projects/${project.slug}`}>{project.name}</Link>
        </Heading>
        <p className="card__meta">
          <span>{project.categories.map(categoryLabel).join(' · ')}</span>
          {location ? <span>{location}</span> : null}
          {project.status ? <StatusLabel status={project.status} /> : null}
        </p>
        {project.description ? <p className="card__desc">{project.description}</p> : null}
      </div>
    </article>
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
  return (pair.length > 30 ? parts.at(-1) : pair) || null
}
