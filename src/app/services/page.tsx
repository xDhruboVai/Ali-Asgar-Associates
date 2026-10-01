import type { Metadata } from 'next'
import Link from 'next/link'
import { ClosingCta } from '@/components/ClosingCta'
import { Journey } from '@/components/Journey'
import { PageHead } from '@/components/Ui'
import { Words } from '@/components/Words'
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
      <PageHead
        sheet="A-200"
        eyebrow="What we do"
        title="Services"
        lede={
          <p>
            Complete design consultancy first, through to construction on a turnkey basis. Each service can be taken on
            its own or as part of one integrated project.
          </p>
        }
      >
        <nav className="jump-nav" aria-label="Services on this page" data-reveal>
          <ol>
            {SERVICES.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {s.name}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </PageHead>

      <div className="container">
        {SERVICES.map((service, i) => {
          const related = service.relatedCategories
            .map((id) => ({ id, label: categoryLabel(id), count: countFor(id) }))
            .filter((r) => r.count > 0)

          return (
            <section key={service.id} id={service.id} className="svc-block" aria-labelledby={`${service.id}-title`}>
              <span className="rule svc-block__rule" data-line aria-hidden="true" />
              <div className="svc-block__aside">
                <span className="svc-block__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 id={`${service.id}-title`} className="svc-block__title">
                  <Words text={service.name} />
                </h2>
              </div>

              <div className="svc-block__body">
                <p className="svc-block__lede" data-reveal>
                  {service.summary}
                </p>

                <ul className="points">
                  {service.points.map((point) => (
                    <li key={point} data-reveal>
                      {point}
                    </li>
                  ))}
                </ul>

                {service.disciplines ? (
                  <div className="svc-block__group">
                    <h3 className="mono-label" data-reveal>
                      Disciplines
                    </h3>
                    <dl className="schedule schedule--two">
                      {service.disciplines.map((d) => (
                        <div key={d.name} data-reveal>
                          <dt>{d.name}</dt>
                          <dd>{d.summary}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : null}

                {related.length ? (
                  <div className="svc-block__group" data-reveal>
                    <h3 className="mono-label">Related projects</h3>
                    <ul className="sector-links">
                      {related.map((r) => (
                        <li key={r.id}>
                          <Link href={`/projects?category=${r.id}`}>
                            {r.label}
                            <sup>{r.count}</sup>
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

      <Journey lede="When the services are taken together, the same office plans, designs, engineers and builds the project." />

      <ClosingCta />
    </>
  )
}
