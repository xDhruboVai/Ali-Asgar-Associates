import Image from 'next/image'
import Link from 'next/link'
import { ViewTransition } from 'react'
import { ClosingCta } from '@/components/ClosingCta'
import { Journey } from '@/components/Journey'
import { ProjectCard, ProjectMeta } from '@/components/ProjectCard'
import { ServiceIcon } from '@/components/ServiceIcon'
import { ABOUT_PARAGRAPHS, PRACTICE_ROLES } from '@/lib/content'
import { getClientGroups, getCompany, getProjects } from '@/lib/data'
import { CATEGORIES } from '@/lib/normalize'
import { SERVICES } from '@/lib/services'
import { TAGLINE } from '@/lib/site'
import type { Project } from '@/lib/types'

export const revalidate = 3600

/** Preferred hero; falls back to the first fully described project with an image. */
const HERO_SLUG = 'windy-terrace'

const delay = (n: number) => ({ '--d': n }) as React.CSSProperties

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
  const sectors = CATEGORIES.filter((c) => c.id !== 'other')
    .map((c) => ({ ...c, count: projects.filter((p) => p.categories.includes(c.id)).length }))
    .filter((c) => c.count > 0)
  const keyClients = clientGroups.filter((g) => ['Real Estate', 'Industry'].includes(g.category))

  return (
    <>
      <section className="hero blueprint" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__copy">
            <h1 id="hero-title">
              <span className="line">
                <span style={delay(0)}>Where</span>
              </span>{' '}
              <span className="line">
                <span style={delay(1)}>design meets</span>
              </span>{' '}
              <span className="line">
                <span style={delay(2)}>
                  <em>engineering.</em>
                </span>
              </span>
            </h1>
            <p className="label label--tick" data-enter style={delay(4)}>
              {TAGLINE}
            </p>
            <p className="hero__lede" data-enter style={delay(5)}>
              Architectural, structural, electrical and plumbing design for residential, commercial and industrial
              buildings.
            </p>
            <div className="hero__actions" data-enter style={delay(6)}>
              <Link href="/projects" className="button">
                Explore projects
              </Link>
              <Link href="/services" className="button button--light">
                Our services
              </Link>
            </div>
          </div>

          {hero ? (
            <figure className="hero__figure">
              <div className="hero__image">
                <ViewTransition name={`project-${hero.slug}`} share="project-image" default="none">
                  <Image
                    src={hero.images[0].src}
                    alt={hero.images[0].alt}
                    fill
                    priority
                    sizes="(min-width: 960px) 42vw, 100vw"
                    quality={85}
                  />
                </ViewTransition>
              </div>
              <figcaption className="hero__caption" data-enter style={delay(8)}>
                <Link href={`/projects/${hero.slug}`}>{hero.name}</Link>
                <ProjectMeta project={hero} />
              </figcaption>
            </figure>
          ) : null}
        </div>
      </section>

      <section className="section marks" aria-labelledby="about-title">
        <div className="container">
          <div className="intro">
            <h2 id="about-title" className="statement" data-reveal>
              Buildings designed and engineered in Dhaka <em>since {company.established_year}.</em>
            </h2>
            <div className="stack" data-reveal style={delay(2)}>
              <div className="prose">
                {ABOUT_PARAGRAPHS.slice(0, 2).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <ul className="tag-list" aria-label="Disciplines">
                <li>Architecture</li>
                <li>Structural Engineering</li>
                <li>Building Services</li>
                <li>Turnkey Construction</li>
              </ul>
            </div>
          </div>
          <dl className="facts" data-reveal>
            <div>
              <dt>Established</dt>
              <dd>{company.established_year}</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>Dhaka</dd>
            </div>
            <div>
              <dt>Design standard</dt>
              <dd>BNBC</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section section--gray" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <div className="stack" data-reveal>
              <p className="label label--tick">What we do</p>
              <h2 id="services-title">From the first drawing to the finished building.</h2>
            </div>
            <p data-reveal style={delay(1)}>
              Five services, taken on separately or together: design consultancy, structural engineering,
              assessment of existing buildings, construction management and turnkey construction.
            </p>
          </div>
          <ul className="service-cards">
            {SERVICES.map((service, i) => (
              <li key={service.id} data-reveal style={delay(i % 3)}>
                <Link href={`/services#${service.id}`} className="service-card">
                  <ServiceIcon id={service.id} className="service-card__icon" />
                  <span className="service-card__body">
                    <span className="service-card__title">{service.name}</span>
                    <span className="service-card__text">{service.tagline}</span>
                  </span>
                  <span className="service-card__more">
                    <span aria-hidden="true">Learn more</span>
                    <span className="service-card__arrow" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--dark blueprint" aria-labelledby="turnkey-title">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <div className="stack" data-reveal>
              <p className="label label--tick">Turnkey</p>
              <h2 id="turnkey-title">One firm, from planning to completion.</h2>
            </div>
            <p className="lede" data-reveal style={delay(1)}>
              Design and construction delivered on a turnkey basis. The same office plans, designs, engineers and
              builds the project.
            </p>
          </div>
          <Journey />
        </div>
      </section>

      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <div className="section-head">
            <div className="stack" data-reveal>
              <p className="label label--tick">Projects</p>
              <h2 id="work-title">Selected work</h2>
            </div>
            <div className="stack" data-reveal style={delay(1)}>
              <ul className="tag-list" aria-label="Browse projects by sector">
                {sectors.map((sector) => (
                  <li key={sector.id}>
                    <Link href={`/projects?category=${sector.id}`}>
                      {sector.label}
                      <span>{sector.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="mosaic">
            {featured.map((project, i) => (
              <li key={project.slug} data-reveal style={delay(i % 3)}>
                <ProjectCard
                  project={project}
                  sizes={
                    i === 0 || i === 4
                      ? '(min-width: 760px) 58vw, 78vw'
                      : '(min-width: 760px) 42vw, 78vw'
                  }
                />
              </li>
            ))}
          </ul>
          <p className="label swipe-hint" aria-hidden="true">
            Swipe for more →
          </p>
          <p className="mt-lg">
            <Link href="/projects" className="button button--outline">
              All projects
            </Link>
          </p>
        </div>
      </section>

      <section className="section section--gray marks" aria-labelledby="practice-title">
        <div className="container intro" style={{ alignItems: 'start' }}>
          <div className="stack" data-reveal>
            <p className="label label--tick">The practice</p>
            <h2 id="practice-title">Engineers and architects in one office.</h2>
            <p className="prose">{ABOUT_PARAGRAPHS[0]}</p>
            <p>
              <Link href="/practice" className="arrow-link">
                The practice and team
              </Link>
            </p>
          </div>
          <ul className="roles" data-reveal style={delay(2)} aria-label="Who works in the office">
            {PRACTICE_ROLES.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>
      </section>

      {keyClients.length ? (
        <section className="section section--dark" aria-labelledby="clients-title">
          <div className="container">
            <div className="section-head">
              <div className="stack" data-reveal>
                <p className="label label--tick">Clients</p>
                <h2 id="clients-title">Selected clients</h2>
              </div>
              <p data-reveal style={delay(1)}>
                Developers and industrial groups the firm has worked with.{' '}
                <Link href="/practice#clients" className="arrow-link">
                  Full client list
                </Link>
              </p>
            </div>
            <div className="client-columns">
              {keyClients.map((group, i) => (
                <div key={group.category} data-reveal style={delay(i)}>
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

      <ClosingCta />
    </>
  )
}
