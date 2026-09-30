import type { Metadata } from 'next'
import Link from 'next/link'
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
      <header className="page-head">
        <div className="container page-head__grid">
          <div>
            <p className="label">What the office does</p>
            <h1>Services</h1>
          </div>
          <p className="lede">
            Five service lines, listed in the firm’s order of priority: complete design consultancy first,
            through to construction on a turnkey basis.
          </p>
        </div>
      </header>

      <nav className="container" aria-label="Services on this page">
        <ul className="pill-list">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>
                {s.letter}. {s.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container" style={{ paddingBlock: 'clamp(40px, 5vw, 72px) clamp(56px, 8vw, 112px)' }}>
        {SERVICES.map((service) => {
          const related = service.relatedCategories
            .map((id) => ({ id, label: categoryLabel(id), count: countFor(id) }))
            .filter((r) => r.count > 0)

          return (
            <section key={service.id} id={service.id} className="service-block" aria-labelledby={`${service.id}-title`}>
              <div className="service-block__head">
                <span className="service-block__letter" aria-hidden="true">
                  {service.letter}
                </span>
                <h2 id={`${service.id}-title`}>
                  <span className="visually-hidden">{service.letter}. </span>
                  {service.name}
                </h2>
                <p className="lede">{service.summary}</p>
              </div>

              <div className="stack-lg">
                <ul className="checklist">
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                {service.disciplines ? (
                  <table className="discipline-table">
                    <caption className="visually-hidden">Disciplines included in {service.name}</caption>
                    <thead>
                      <tr>
                        <th scope="col" className="label">
                          No.
                        </th>
                        <th scope="col" className="label">
                          Discipline
                        </th>
                        <th scope="col" className="label">
                          Scope
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {service.disciplines.map((d) => (
                        <tr key={d.code}>
                          <td>{d.code}</td>
                          <th scope="row">{d.name}</th>
                          <td>{d.summary}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}

                {related.length ? (
                  <div className="stack-sm">
                    <h3 className="label">Related projects</h3>
                    <ul className="pill-list">
                      {related.map((r) => (
                        <li key={r.id}>
                          <Link href={`/projects?category=${r.id}`}>
                            {r.label} ({r.count})
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

        <section className="service-block" aria-labelledby="enquire-title">
          <div className="service-block__head">
            <h2 id="enquire-title">Starting a project?</h2>
          </div>
          <div className="stack">
            <p className="lede">
              Share the site location, land area and the type of building you have in mind, and the office will
              advise which services the project needs.
            </p>
            <p>
              <Link href="/contact" className="button">
                Contact the office
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
