import type { Metadata } from 'next'
import Image from 'next/image'
import { ClosingCta } from '@/components/ClosingCta'
import { Eyebrow, PageHead } from '@/components/Ui'
import { Words } from '@/components/Words'
import { ABOUT_PARAGRAPHS, ABOUT_STATEMENT, PRINCIPAL_EXPERIENCE, PRINCIPAL_TRAINING } from '@/lib/content'
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
  const clientCount = clientGroups.reduce((n, g) => n + g.names.length, 0)

  return (
    <>
      <PageHead sheet="A-300" eyebrow={`About ${name}`} title="The practice" lede={<p>{ABOUT_STATEMENT}</p>} />

      {/* Background */}
      <section className="section" aria-labelledby="history-title">
        <div className="container split">
          <div className="split__aside">
            <Eyebrow index="01" as="h2">
              <span id="history-title">Background</span>
            </Eyebrow>
            <dl className="facts">
              {company.established_year ? (
                <div data-reveal>
                  <dt>Established</dt>
                  <dd>{company.established_year}</dd>
                </div>
              ) : null}
              {company.type ? (
                <div data-reveal>
                  <dt>Type</dt>
                  <dd>{titleCase(company.type)}</dd>
                </div>
              ) : null}
              <div data-reveal>
                <dt>Team</dt>
                <dd>{team.members.length} people</dd>
              </div>
              {company.address ? (
                <div data-reveal>
                  <dt>Office</dt>
                  <dd>{titleCase(company.address)}</dd>
                </div>
              ) : null}
            </dl>
          </div>
          <div className="split__main">
            <p className="lead-text">
              <Words mode="fill" text={ABOUT_PARAGRAPHS[0]} />
            </p>
            <div className="prose">
              {ABOUT_PARAGRAPHS.slice(1).map((p) => (
                <p key={p} data-reveal>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principal */}
      {principal ? (
        <section className="section principal" aria-labelledby="principal-title">
          <div className="container">
            <Eyebrow index="02">Principal</Eyebrow>
            <h2 id="principal-title" className="principal__name">
              <Words text={principal.name} />
            </h2>
            <div className="principal__grid">
              <div className="principal__intro">
                <p className="principal__role" data-reveal>
                  {[principal.designation, qualification(principal)].filter(Boolean).join(' · ')}
                </p>
                {principal.certifications ? (
                  <p className="mono-label" data-reveal>
                    Registration: {principal.certifications}
                  </p>
                ) : null}
                {principal.bio ? <p data-reveal>{principal.bio}</p> : null}
              </div>
              <div className="principal__record">
                <h3 className="mono-label" data-reveal>
                  Earlier experience
                </h3>
                <ol className="timeline">
                  {PRINCIPAL_EXPERIENCE.map((e) => (
                    <li key={e.period} data-reveal>
                      <span className="timeline__when">{e.period}</span>
                      <span>
                        <strong>{e.role}</strong>
                        <span className="timeline__where">{e.org}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <h3 className="mono-label" data-reveal>
                  Specialised training
                </h3>
                <ol className="timeline">
                  {PRINCIPAL_TRAINING.map((t) => (
                    <li key={t.title} data-reveal>
                      <span className="timeline__when">{t.date}</span>
                      <span>
                        <strong>{t.title}</strong>
                        <span className="timeline__where">{t.org}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Team */}
      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <div className="sec-head">
            <div>
              <Eyebrow index="03">Team</Eyebrow>
              <h2 id="team-title" className="h2">
                <Words text={`${team.members.length} people, *one office.*`} />
              </h2>
            </div>
            <p className="sec-head__lede" data-reveal>
              Structural engineering, architecture, building services, project management and administration, as listed
              in the firm’s corporate profile.
            </p>
          </div>
          <div className="team">
            {team.groups.map((group) => (
              <div key={group.category} className="team__group">
                <span className="rule" data-line aria-hidden="true" />
                <h3 className="team__title" data-reveal>
                  {group.category}
                  <sup>{String(group.members.length).padStart(2, '0')}</sup>
                </h3>
                <ul className="team__list">
                  {group.members.map((m) => {
                    const detail = qualification(m)
                    return (
                      <li key={m.id} data-reveal>
                        <p className="team__name">{m.name}</p>
                        {m.designation || detail ? (
                          <p className="team__meta">{[m.designation, detail].filter(Boolean).join(' · ')}</p>
                        ) : null}
                        {m.certifications ? <p className="team__reg">{m.certifications}</p> : null}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className="section section--dark" aria-labelledby="clients-title">
        <div className="container">
          <div className="sec-head">
            <div>
              <Eyebrow index="04">Clients</Eyebrow>
              <h2 id="clients-title" className="h2">
                <Words text={`${clientCount} clients, *by sector.*`} />
              </h2>
            </div>
            <p className="sec-head__lede" data-reveal>
              Developers, industrial groups, hospitals, hotels and institutions the firm has worked for.
            </p>
          </div>
          <div className="client-columns">
            {clientGroups.map((group) => (
              <div key={group.category} data-reveal>
                <h3>
                  {group.category}
                  <sup>{group.names.length}</sup>
                </h3>
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

      {/* Work for clients */}
      {portfolio.clientGalleries.length ? (
        <section className="section" aria-labelledby="client-work-title">
          <div className="container">
            <div className="sec-head">
              <div>
                <Eyebrow index="05">Work for clients</Eyebrow>
                <h2 id="client-work-title" className="h2">
                  <Words text="Buildings for *developer clients.*" />
                </h2>
              </div>
            </div>
            <ul className="strip-gallery">
              {portfolio.clientGalleries.flatMap((g) =>
                g.images.map((image) => (
                  <li key={image.src}>
                    <figure>
                      <div className="strip-gallery__frame" data-clip>
                        <Image src={image.src} alt={`Building for ${g.client}`} fill sizes="(min-width: 900px) 25vw, 50vw" />
                      </div>
                      <figcaption className="meta">{g.client}</figcaption>
                    </figure>
                  </li>
                )),
              )}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Registrations */}
      {licenses.length ? (
        <section className="section section--tight" aria-labelledby="registrations-title">
          <div className="container">
            <Eyebrow index="06" as="h2">
              <span id="registrations-title">Registrations</span>
            </Eyebrow>
            <dl className="registrations">
              {licenses.map((l) => (
                <div key={l.id} data-reveal>
                  <dt>{l.license_type}</dt>
                  {l.license_number ? <dd className="registrations__number">{l.license_number}</dd> : null}
                  {l.authority ? <dd className="registrations__by">{l.authority}</dd> : null}
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
