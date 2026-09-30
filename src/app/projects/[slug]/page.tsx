import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProjectCard } from '@/components/ProjectCard'
import { StatusLabel } from '@/components/StatusLabel'
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
    description: [project.description, project.address].filter(Boolean).join(', ') || `${name}, ${categoryLabel(project.categories[0]).toLowerCase()} project.`,
    openGraph: project.images[0] ? { images: [{ url: project.images[0].src }] } : undefined,
  }
}

function formatZone(zone: string | null) {
  if (!zone) return null
  const n = Number.parseInt(zone, 10)
  return Number.isNaN(n) ? zone : `Zone ${n}`
}

function specRows(p: Project): [string, string][] {
  const rows: [string, string | null][] = [
    ['Client', p.client],
    ['Address', p.address],
    ['Land area', p.landArea],
    ['Construction area', p.constructionArea],
    ['Covered area', p.coveredArea],
    ['Capacity', p.capacity],
    ['Structural system', p.structuralSystem],
    ['Seismic zone (BNBC)', formatZone(p.earthquakeZone)],
    ['Design wind speed', p.designWindSpeed],
    ['Structural system vetted by', p.vettedBy],
    ['Status', p.status],
  ]
  return rows.filter((r): r is [string, string] => Boolean(r[1]))
}

export default async function ProjectPage(props: PageProps<'/projects/[slug]'>) {
  const { slug } = await props.params
  const [project, projects] = await Promise.all([getProject(slug), getProjects()])
  if (!project) notFound()

  const primary = project.categories[0]
  const specs = specRows(project)
  const related = projects
    .filter((p) => p.slug !== project.slug && p.images.length && p.categories.includes(primary))
    .slice(0, 3)

  return (
    <article>
      <header className="page-head">
        <div className="container stack">
          <nav aria-label="Breadcrumb" className="breadcrumb label">
            <ol>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href={`/projects?category=${primary}`}>{categoryLabel(primary)}</Link>
              </li>
              <li aria-current="page">{project.name}</li>
            </ol>
          </nav>
          <h1 className="project-title">{project.name}</h1>
          <p className="card__meta">
            <span>{project.categories.map(categoryLabel).join(' · ')}</span>
            {project.status ? <StatusLabel status={project.status} /> : null}
          </p>
        </div>
      </header>

      <div className="container project-layout" style={{ paddingBottom: 'clamp(56px, 8vw, 112px)' }}>
        <div>
          {project.images.length ? (
            <ul className="gallery" aria-label="Project images">
              {project.images.map((image, i) => (
                <li key={image.src}>
                  <figure>
                    <div className="gallery__frame">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        priority={i === 0}
                        sizes="(min-width: 960px) 58vw, 100vw"
                        quality={85}
                      />
                    </div>
                  </figure>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-image">
              <p>No images have been published for this project yet.</p>
            </div>
          )}
        </div>

        <aside className="project-layout__aside stack" aria-label="Project information">
          {project.description ? <p className="lede">{project.description}</p> : null}

          {specs.length ? (
            <dl className="spec">
              {specs.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

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

          <p>
            <Link href="/projects" className="arrow-link">
              All projects
            </Link>
          </p>
        </aside>
      </div>

      {related.length ? (
        <section className="section section--deep" aria-labelledby="related-title">
          <div className="container">
            <div className="section-head">
              <h2 id="related-title">More {categoryLabel(primary).toLowerCase()} projects</h2>
            </div>
            <ul className="project-grid">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  )
}
