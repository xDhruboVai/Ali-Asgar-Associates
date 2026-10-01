import type { Metadata } from 'next'
import Image from 'next/image'
import { ClosingCta } from '@/components/ClosingCta'
import {
  ABOUT_PARAGRAPHS,
  ABOUT_STATEMENT,
  PRACTICE_ROLES,
  PRINCIPAL_EXPERIENCE,
  PRINCIPAL_TRAINING,
} from '@/lib/content'
import { getClientGroups, getCompany, getLicenses, getPortfolio, getTeam } from '@/lib/data'
import { titleCase } from '@/lib/normalize'
import type { TeamMemberRow } from '@/lib/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Practice',
  description:
    'The practice, principal, team of structural engineers, architects and consultants, and clients of Ali Asgar & Associates.',
}

function qualification(m: TeamMemberRow) {
  const degree = m.degree
    ? m.discipline && !m.degree.toLowerCase().includes(m.discipline.toLowerCase())
      ? `${m.degree} (${m.discipline})`
      : m.degree
    : null
  return [degree, m.passing_year, m.institution].filter(Boolean).join(', ')
}

export default async function PracticePage() {
  const [company, team, clientGroups, licenses, portfolio] = await Promise.all([
    getCompany(),
    getTeam(),
    getClientGroups(),
    getLicenses(),
    getPortfolio(),
  ])

  const name = titleCase(company.name)
  const principal = team.members.find((m) => /ceo|principal/i.test(m.designation ?? '')) ?? team.members[0]

  return (
    <>
      <header className="page-head blueprint">
        <div className="container page-head__grid">
          <div>
            <p className="label label--tick">About {name}</p>
            <h1>
              <span className="line">
                <span>The practice</span>
              </span>
            </h1>
          </div>
          <p className="lede">{ABOUT_STATEMENT}</p>
        </div>
      </header>

      <section className="section marks" aria-labelledby="history-title">
        <div className="container intro" style={{ alignItems: 'start' }}>
          <div className="stack" data-reveal>
            <h2 id="history-title" className="label label--tick">
              Background
            </h2>
            <ul className="roles" aria-label="Who works in the office">
              {PRACTICE_ROLES.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </div>
          <div className="stack-lg" data-reveal style={{ '--d': 2 } as React.CSSProperties}>
            <div className="prose">
              {ABOUT_PARAGRAPHS.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="facts facts--stacked">
              {company.established_year ? (
                <div>
                  <dt>Established</dt>
                  <dd>{company.established_year}</dd>
                </div>
              ) : null}
              {company.type ? (
                <div>
                  <dt>Type</dt>
                  <dd>{titleCase(company.type)}</dd>
                </div>
              ) : null}
              {company.address ? (
                <div>
                  <dt>Office</dt>
                  <dd>{titleCase(company.address)}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </section>

      {principal ? (
        <section className="section section--gray" aria-labelledby="principal-title">
          <div className="container principal">
            <div className="stack">
              <p className="label label--tick">Principal</p>
              <h2 id="principal-title">{principal.name}</h2>
              <p className="lede">
                {[principal.designation, qualification(principal)].filter(Boolean).join(' · ')}
              </p>
              {principal.certifications ? (
                <p className="team-member__reg">Registration: {principal.certifications}</p>
              ) : null}
              {principal.bio ? <p>{principal.bio}</p> : null}
            </div>
            <div className="stack-lg">
              <div>
                <h3 className="label" style={{ marginBottom: 12 }}>
                  Earlier experience
                </h3>
                <ol className="timeline">
                  {PRINCIPAL_EXPERIENCE.map((e) => (
                    <li key={e.period}>
                      <span className="label">{e.period}</span>
                      <span>
                        <strong>{e.role}</strong>, {e.org}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="label" style={{ marginBottom: 12 }}>
                  Specialised training
                </h3>
                <ol className="timeline">
                  {PRINCIPAL_TRAINING.map((t) => (
                    <li key={t.title}>
                      <span className="label">{t.date}</span>
                      <span>
                        <strong>{t.title}</strong>, {t.org}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <div className="section-head">
            <h2 id="team-title">Team</h2>
            <p>
              {team.members.length} people across structural engineering, architecture, building services, project
              management and administration.
            </p>
          </div>
          <div className="team-groups">
            {team.groups.map((group) => (
              <div key={group.category} className="team-group">
                <h3>{group.category}</h3>
                <ul>
                  {group.members.map((m) => {
                    const detail = qualification(m)
                    return (
                      <li key={m.id}>
                        <p className="team-member__name">{m.name}</p>
                        {m.designation || detail ? (
                          <p className="team-member__meta">{[m.designation, detail].filter(Boolean).join(' · ')}</p>
                        ) : null}
                        {m.certifications ? <p className="team-member__reg">{m.certifications}</p> : null}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="clients" className="section section--dark" aria-labelledby="clients-title">
        <div className="container">
          <div className="section-head">
            <h2 id="clients-title">Clients</h2>
            <p>Developers, industrial groups, hospitals, hotels and institutions the firm has worked for.</p>
          </div>
          <div className="client-columns client-columns--compact">
            {clientGroups.map((group) => (
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

      {portfolio.clientGalleries.length ? (
        <section className="section" aria-labelledby="client-work-title">
          <div className="container">
            <div className="section-head">
              <h2 id="client-work-title">Work for clients</h2>
              <p>Buildings designed for the firm’s developer clients.</p>
            </div>
            <ul className="gallery-strip">
              {portfolio.clientGalleries.flatMap((g) =>
                g.images.map((image) => (
                  <li key={image.src}>
                    <figure>
                      <div className="gallery-strip__frame" data-reveal="image">
                        <Image src={image.src} alt={`Building for ${g.client}`} fill sizes="(min-width: 900px) 25vw, 50vw" />
                      </div>
                      <figcaption className="meta">
                        {g.client}
                      </figcaption>
                    </figure>
                  </li>
                )),
              )}
            </ul>
          </div>
        </section>
      ) : null}

      {licenses.length ? (
        <section className="section section--tight section--gray" aria-labelledby="registrations-title">
          <div className="container">
            <div className="section-head">
              <h2 id="registrations-title">Registrations</h2>
            </div>
            <dl className="registrations">
              {licenses.map((l) => (
                <div key={l.id}>
                  <dt className="label">{l.license_type}</dt>
                  {l.license_number ? <dd className="registrations__number">{l.license_number}</dd> : null}
                  {l.authority ? <dd className="muted">{l.authority}</dd> : null}
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      <ClosingCta />
    </>
  )
}
