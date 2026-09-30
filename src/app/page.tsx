import Image from 'next/image'
import Link from 'next/link'
import { ProjectCard, shortLocation } from '@/components/ProjectCard'
import { StatusLabel } from '@/components/StatusLabel'
import { ABOUT_PARAGRAPHS, ABOUT_STATEMENT } from '@/lib/content'
import { getClientGroups, getCompany, getProjects } from '@/lib/data'
import { CATEGORIES, categoryLabel, phoneLinks, titleCase } from '@/lib/normalize'
import { SERVICES } from '@/lib/services'
import { TAGLINE } from '@/lib/site'
import type { Project } from '@/lib/types'

export const revalidate = 3600

/** Preferred hero; falls back to the first fully described project with an image. */
const HERO_SLUG = 'windy-terrace'

function pickFeatured(projects: Project[], exclude: string, count: number): Project[] {
  const illustrated = projects.filter((p) => p.images.length && p.slug !== exclude)
  const described = illustrated.filter((p) => !p.detailsPending)
  const picked: Project[] = []
  // One per sector first, so the selection shows the range of work.
  for (const category of CATEGORIES) {
    const match = described.find((p) => p.categories[0] === category.id && !picked.includes(p))
    if (match) picked.push(match)
  }
  for (const p of [...described, ...illustrated]) {
    if (picked.length >= count) break
    if (!picked.includes(p)) picked.push(p)
  }
  return picked.slice(0, count)
}

export default async function HomePage() {
  const [company, projects, clientGroups] = await Promise.all([getCompany(), getProjects(), getClientGroups()])

  const hero =
    projects.find((p) => p.slug === HERO_SLUG && p.images.length) ??
    projects.find((p) => p.images.length && !p.detailsPending)
  const featured = pickFeatured(projects, hero?.slug ?? '', 8)
  const phone = phoneLinks(company.telephone)
  const sectors = CATEGORIES.filter((c) => c.id !== 'other')
    .map((c) => ({ ...c, count: projects.filter((p) => p.categories.includes(c.id)).length }))
    .filter((c) => c.count > 0)
  const keyClients = clientGroups.filter((g) => ['Real Estate', 'Industry'].includes(g.category))

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="label">{TAGLINE}</p>
            <h1 id="hero-title">Buildings designed and engineered in Dhaka since {company.established_year}.</h1>
            <p className="lede">
              Architectural, structural, electrical and plumbing design for residential, commercial and
              industrial buildings, and detailed engineering assessment of existing factories.
            </p>
            <div className="hero__actions">
              <Link href="/projects" className="button">
                View projects
              </Link>
              <Link href="/services" className="button button--ghost">
                Services
              </Link>
            </div>
            <dl className="title-block">
              <div>
                <dt>Established</dt>
                <dd>{company.established_year}</dd>
              </div>
              <div>
                <dt>Office</dt>
                <dd>Lalmatia, Dhaka</dd>
              </div>
              <div>
                <dt>Design standard</dt>
                <dd>BNBC</dd>
              </div>
            </dl>
          </div>

          {hero ? (
            <figure className="hero__figure">
              <div className="hero__image">
                <Image
                  src={hero.images[0].src}
                  alt={hero.images[0].alt}
                  fill
                  priority
                  sizes="(min-width: 960px) 50vw, 100vw"
                  quality={85}
                />
              </div>
              <figcaption className="hero__caption">
                <Link href={`/projects/${hero.slug}`}>{hero.name}</Link>
                <span className="card__meta">
                  <span>{categoryLabel(hero.categories[0])}</span>
                  {shortLocation(hero.address) ? <span>{shortLocation(hero.address)}</span> : null}
                  {hero.status ? <StatusLabel status={hero.status} /> : null}
                </span>
              </figcaption>
            </figure>
          ) : null}
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="about-title">
        <div className="container intro">
          <h2 id="about-title" className="label">
            The practice
          </h2>
          <div>
            <p className="intro__statement">{ABOUT_STATEMENT}</p>
            <div className="intro__body prose">
              {ABOUT_PARAGRAPHS.slice(0, 2).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-lg">
              <Link href="/practice" className="arrow-link">
                About the practice and team
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <div className="section-head">
            <h2 id="work-title">Selected projects</h2>
            <p>
              Apartment towers, factories, hospitals and hotels in Dhaka, Chattogram, Gazipur and Cox’s Bazar.{' '}
              <Link href="/projects" className="arrow-link">
                All projects
              </Link>
            </p>
          </div>
          <ul className="project-grid project-grid--featured">
            {featured.map((project, i) => (
              <li key={project.slug}>
                <ProjectCard
                  project={project}
                  sizes={i < 2 ? '(min-width: 1040px) 50vw, (min-width: 640px) 50vw, 100vw' : undefined}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <h2 id="services-title">Services</h2>
            <p>From planning and design consultancy to construction on a turnkey basis.</p>
          </div>
          <ol className="service-list">
            {SERVICES.map((service) => (
              <li key={service.id} className="service-row">
                <span className="service-row__letter" aria-hidden="true">
                  {service.letter}
                </span>
                <h3>
                  <Link href={`/services#${service.id}`}>
                    <span className="visually-hidden">{service.letter}. </span>
                    {service.name}
                  </Link>
                </h3>
                <p className="service-row__summary">{service.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="sectors-title">
        <div className="container intro">
          <div className="stack-sm">
            <h2 id="sectors-title">Work by sector</h2>
            <p className="muted">Projects recorded in the firm’s portfolio, by building type.</p>
          </div>
          <ul className="sector-index">
            {sectors.map((sector) => (
              <li key={sector.id}>
                <Link href={`/projects?category=${sector.id}`}>
                  <span className="sector-index__name">{sector.label}</span>
                  <span className="sector-index__count">
                    {sector.count} {sector.count === 1 ? 'project' : 'projects'}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {keyClients.length ? (
        <section className="section section--deep" aria-labelledby="clients-title">
          <div className="container">
            <div className="section-head">
              <h2 id="clients-title">Clients</h2>
              <p>
                Developers and industrial groups the firm has worked with.{' '}
                <Link href="/practice#clients" className="arrow-link">
                  Full client list
                </Link>
              </p>
            </div>
            <div className="client-columns">
              {keyClients.map((group) => (
                <div key={group.category}>
                  <h3>{group.category}</h3>
                  <ul>
                    {group.names.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section" aria-labelledby="contact-title">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <div className="stack">
              <h2 id="contact-title">Talk to the office about a project.</h2>
              {company.address ? <p className="muted">{titleCase(company.address)}</p> : null}
            </div>
            <div className="cta-band__links">
              {phone ? <a href={phone.href}>{phone.display}</a> : null}
              {company.email ? <a href={`mailto:${company.email}`}>{company.email}</a> : null}
              <Link href="/contact" className="arrow-link">
                Contact details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
