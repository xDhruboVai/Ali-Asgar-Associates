import type { Metadata } from 'next'
import Link from 'next/link'
import { ClosingCta } from '@/components/ClosingCta'
import { Journey } from '@/components/Journey'
import { ServiceIcon } from '@/components/ServiceIcon'
import { getProjects } from '@/lib/data'
import { categoryLabel } from '@/lib/normalize'
import { SERVICES } from '@/lib/services'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Design consultancy (planning, architectural, structural, electrical, plumbing and sanitary), structural consultancy, Detail Engineering Assessment, construction management and turnkey construction.',
}

export default async function ServicesPage() {
  const projects = await getProjects()
  const countFor = (id: string) => projects.filter((p) => p.categories.some((c) => c === id)).length

  return (
    <>
      <header className="page-head blueprint">
        <div className="container page-head__grid">
          <div>
            <p className="label label--tick">What we do</p>
            <h1>
              <span className="line">
                <span>Services</span>
              </span>
            </h1>
          </div>
          <div className="stack">
            <p className="lede">
              Complete design consultancy first, through to construction on a turnkey basis. Each service can be
              taken on its own or as part of one integrated project.
            </p>
            <nav aria-label="Services on this page">
              <ul className="tag-list">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <div className="container">
        {SERVICES.map((service) => {
          const related = service.relatedCategories
            .map((id) => ({ id, label: categoryLabel(id), count: countFor(id) }))
            .filter((r) => r.count > 0)

          return (
            <section key={service.id} id={service.id} className="service-block" aria-labelledby={`${service.id}-title`}>
              <div className="service-block__head" data-reveal>
                <ServiceIcon id={service.id} className="service-block__icon" />
                <h2 id={`${service.id}-title`}>{service.name}</h2>
                <p className="lede">{service.summary}</p>
              </div>

              <div className="stack-lg" data-reveal style={{ '--d': 2 } as React.CSSProperties}>
                <ul className="checklist">
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                {service.disciplines ? (
                  <div className="stack-sm">
                    <h3 className="label">Disciplines</h3>
                    <ul className="disciplines">
                      {service.disciplines.map((d) => (
                        <li key={d.name}>
                          <strong>{d.name}</strong>
                          <span>{d.summary}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {related.length ? (
                  <div className="stack-sm">
                    <h3 className="label">Related projects</h3>
                    <ul className="tag-list">
                      {related.map((r) => (
                        <li key={r.id}>
                          <Link href={`/projects?category=${r.id}`}>
                            {r.label}
                            <span>{r.count}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          )
        })}
      </div>

      <section className="section section--dark blueprint" aria-labelledby="journey-title">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <div className="stack" data-reveal>
              <p className="label label--tick">Turnkey</p>
              <h2 id="journey-title">One firm, from planning to completion.</h2>
            </div>
            <p className="lede" data-reveal>
              When the services are taken together, the same office plans, designs, engineers and builds the project.
            </p>
          </div>
          <Journey />
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
