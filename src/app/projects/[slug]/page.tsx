import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ViewTransition } from 'react'
import { ClosingCta } from '@/components/ClosingCta'
import { ProjectCard, ProjectMeta } from '@/components/ProjectCard'
import { getProject, getProjects } from '@/lib/data'
import { categoryLabel, titleCase } from '@/lib/normalize'
import type { Project } from '@/lib/types'

export const revalidate = 3600

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const project = await getProject(slug)
  if (!project) return { title: 'Project not found' }
  const name = titleCase(project.name)
  return {
    title: name,
    description:
      [project.description, project.address].filter(Boolean).join(', ') ||
      `${name}, ${categoryLabel(project.categories[0]).toLowerCase()} project.`,
    openGraph: project.images[0] ? { images: [{ url: project.images[0].src }] } : undefined,
  }
}

function formatZone(zone: string | null) {
  if (!zone) return null
  const n = Number.parseInt(zone, 10)
  return Number.isNaN(n) ? zone : `Zone ${n}`
}

// Only rows that exist in the database are shown; nothing is filled in.
function specRows(p: Project): [string, string][] {
  const rows: [string, string | null][] = [
    ['Client', p.client],
    ['Address', p.address],
    ['Project type', p.categories.map(categoryLabel).join(', ')],
    ['Status', p.status],
    ['Land area', p.landArea],
    ['Construction area', p.constructionArea],
    ['Covered area', p.coveredArea],
    ['Capacity', p.capacity],
    ['Structural system', p.structuralSystem],
    ['Seismic zone (BNBC)', formatZone(p.earthquakeZone)],
    ['Design wind speed', p.designWindSpeed],
    ['Structural system vetted by', p.vettedBy],
  ]
  return rows.filter((r): r is [string, string] => Boolean(r[1]))
}

export default async function ProjectPage(props: PageProps<'/projects/[slug]'>) {
  const { slug } = await props.params
  const [project, projects] = await Promise.all([getProject(slug), getProjects()])
  if (!project) notFound()

  const primary = project.categories[0]
  const [lead, ...moreImages] = project.images
  const specs = specRows(project)
  const related = projects
    .filter((p) => p.slug !== project.slug && p.images.length && p.categories.includes(primary))
    .slice(0, 3)

  return (
    <article>
      <header className="page-head case-head blueprint">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <ol>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href={`/projects?category=${primary}`}>{categoryLabel(primary)}</Link>
              </li>
            </ol>
          </nav>
          <h1>
            <span className="line">
              <span>{project.name}</span>
            </span>
          </h1>
          <ProjectMeta project={project} />
        </div>
      </header>

      <div className="case-hero">
        <div className="container">
          {lead ? (
            <div className="case-hero__frame">
              <Image src={lead.src} alt="" fill sizes="20vw" quality={75} className="case-hero__backdrop" aria-hidden />
              <ViewTransition name={`project-${project.slug}`} share="project-image" default="none">
                <Image src={lead.src} alt={lead.alt} fill priority sizes="(min-width: 1440px) 1330px, 94vw" quality={85} />
              </ViewTransition>
            </div>
          ) : (
            <div className="no-image">
              <p>No images have been published for this project yet.</p>
            </div>
          )}
        </div>
      </div>

      <section className="section" aria-labelledby="overview-title">
        <div className="container case-overview">
          <div className="stack" data-reveal>
            <h2 id="overview-title" className="label label--tick">
              Project overview
            </h2>
            {project.description ? <p className="case-overview__lead">{project.description}</p> : null}
            {project.structuralSystem || project.earthquakeZone ? (
              <p className="muted">All design and standards as per the Bangladesh National Building Code (BNBC).</p>
            ) : null}
            {project.assessmentNote ? (
              <p className="note">
                The firm has also carried out a structural assessment of this building and prepared as-built drawings.
              </p>
            ) : null}
            {project.detailsPending ? (
              <p className="note">Further details for this project have not been published yet.</p>
            ) : null}
          </div>

          <dl className="spec" data-reveal style={{ '--d': 2 } as React.CSSProperties}>
            {specs.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {moreImages.length ? (
        <section className="section section--tight section--gray" aria-labelledby="gallery-title">
          <div className="container">
            <h2 id="gallery-title" className="label label--tick" style={{ marginBottom: 24 }}>
              Gallery
            </h2>
            <ul className="gallery">
              {moreImages.map((image) => (
                <li key={image.src}>
                  <figure>
                    <div className="gallery__frame" data-reveal="image">
                      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 960px) 50vw, 100vw" />
                    </div>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="section section--gray" aria-labelledby="related-title">
          <div className="container">
            <div className="section-head">
              <h2 id="related-title" data-reveal>
                More {categoryLabel(primary).toLowerCase()} projects
              </h2>
              <p data-reveal>
                <Link href={`/projects?category=${primary}`} className="arrow-link">
                  All {categoryLabel(primary).toLowerCase()} projects
                </Link>
              </p>
            </div>
            <ul className="project-grid">
              {related.map((p, i) => (
                <li key={p.slug} data-reveal style={{ '--d': i } as React.CSSProperties}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <ClosingCta />
    </article>
  )
}
