import Link from 'next/link'
import { ClosingCta } from '@/components/ClosingCta'
import { Hero, type HeroBuilding } from '@/components/Hero'
import { Journey } from '@/components/Journey'
import { Marquee } from '@/components/Marquee'
import { ProjectCard, shortLocation } from '@/components/ProjectCard'
import { BtnLabel, Eyebrow } from '@/components/Ui'
import { Words } from '@/components/Words'
import { getClientGroups, getCompany, getProjects, getTeam } from '@/lib/data'
import { CATEGORIES } from '@/lib/normalize'
import { SERVICES } from '@/lib/services'
import type { Project } from '@/lib/types'

export const revalidate = 3600

/** Preferred centre of the hero elevation. */
const HERO_SLUG = 'windy-terrace'

/** One project per sector first, so a selection shows the range of work; then the rest in order. */
function pickVaried(projects: Project[], exclude: Set<string>, count: number): Project[] {
  const illustrated = projects.filter((p) => p.images.length && !exclude.has(p.slug))
  const described = illustrated.filter((p) => !p.detailsPending && !p.categories.includes('other'))
  const picked: Project[] = []
  // "Other work" (pictures without published details) only fills slots left over.
  for (const category of CATEGORIES.filter((c) => c.id !== 'other')) {
    const match = described.find((p) => p.categories[0] === category.id && !picked.includes(p))
    if (match) picked.push(match)
  }
  for (const p of [...described, ...illustrated]) {
    if (picked.length >= count) break
    if (!picked.includes(p)) picked.push(p)
  }
  return picked.slice(0, count)
}

/** Asymmetric placement for the selected work, with each card moving at its own pace. */
const WORK_LAYOUT: { slot: string; ratio: 'tall' | 'portrait' | 'square'; speed: number; sizes: string }[] = [
  { slot: 'a', ratio: 'portrait', speed: 0, sizes: '(min-width: 900px) 40vw, 100vw' },
  { slot: 'b', ratio: 'tall', speed: 0.16, sizes: '(min-width: 900px) 32vw, 100vw' },
  { slot: 'c', ratio: 'square', speed: 0.06, sizes: '(min-width: 900px) 25vw, 100vw' },
  { slot: 'd', ratio: 'tall', speed: 0.1, sizes: '(min-width: 900px) 25vw, 100vw' },
  { slot: 'e', ratio: 'portrait', speed: -0.04, sizes: '(min-width: 900px) 40vw, 100vw' },
  { slot: 'f', ratio: 'square', speed: 0.14, sizes: '(min-width: 900px) 32vw, 100vw' },
]

export default async function HomePage() {
  const [company, projects, clientGroups, team] = await Promise.all([
    getCompany(),
    getProjects(),
    getClientGroups(),
    getTeam(),
  ])

  const centre = projects.find((p) => p.slug === HERO_SLUG && p.images.length)
  const elevation = pickVaried(projects, new Set(centre ? [centre.slug] : []), centre ? 4 : 5)
  if (centre) elevation.splice(1, 0, centre)
  const buildings: HeroBuilding[] = elevation.map((p) => ({
    slug: p.slug,
    name: p.name,
    place: shortLocation(p.address),
    image: p.images[0],
  }))

  const featured = pickVaried(projects, new Set(elevation.map((p) => p.slug)), WORK_LAYOUT.length)
  const sectors = CATEGORIES.filter((c) => c.id !== 'other')
    .map((c) => ({ ...c, count: projects.filter((p) => p.categories.includes(c.id)).length }))
    .filter((c) => c.count > 0)
  const keyClients = clientGroups.filter((g) => ['Real Estate', 'Industry'].includes(g.category))
  const disciplines = SERVICES[0].disciplines ?? []

  return (
    <>
      <Hero buildings={buildings} established={company.established_year} />

      {/* 01 — Statement */}
      <section className="section statement" aria-labelledby="statement-title">
        <div className="container">
          <Eyebrow index="01">The practice</Eyebrow>
          <h2 id="statement-title" className="statement__text">
            <Words
              mode="fill"
              text={`Since ${company.established_year ?? 2006}, one office in Lalmatia has planned, designed and engineered homes, factories, hospitals and hotels across Bangladesh, with structural engineers and architects working side by side.`}
            />
          </h2>

          <dl className="figures">
            <div className="figure" data-reveal>
              <dt>Established</dt>
              <dd>{company.established_year ?? 2006}</dd>
            </div>
            <div className="figure" data-reveal>
              <dt>Projects till now</dt>
              <dd>
                <span data-count="400">400</span>
                <sup>+</sup>
              </dd>
            </div>
            <div className="figure" data-reveal>
              <dt>People in the office</dt>
              <dd>
                <span data-count={team.members.length}>{team.members.length}</span>
              </dd>
            </div>
            <div className="figure" data-reveal>
              <dt>Design disciplines</dt>
              <dd>
                <span data-count={disciplines.length}>{disciplines.length}</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 02 — Services */}
      <section className="section services" aria-labelledby="services-title">
        <div className="container">
          <div className="sec-head">
            <div>
              <Eyebrow index="02">Services</Eyebrow>
              <h2 id="services-title" className="h2">
                <Words text="From the first drawing to the *finished building.*" />
              </h2>
            </div>
            <p className="sec-head__lede" data-reveal>
              Five services, taken on separately or together: design consultancy, structural engineering, assessment
              of existing buildings, construction management and turnkey construction.
            </p>
          </div>

          <ol className="svc-list">
            {SERVICES.map((service, i) => (
              <li key={service.id}>
                <span className="rule" data-line aria-hidden="true" />
                <Link href={`/services#${service.id}`} className="svc-row">
                  <span className="svc-row__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="svc-row__name">{service.name}</span>
                  <span className="svc-row__text">{service.tagline}</span>
                  <span className="svc-row__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
            <li aria-hidden="true">
              <span className="rule" data-line />
            </li>
          </ol>
        </div>
      </section>

      {/* 03 — Turnkey */}
      <Journey
        index="03"
        lede="Design and construction delivered on a turnkey basis. The same office plans, designs, engineers and builds the project."
      />

      {/* 04 — Work */}
      <section className="section work" aria-labelledby="work-title">
        <div className="container">
          <div className="sec-head">
            <div>
              <Eyebrow index="04">Selected work</Eyebrow>
              <h2 id="work-title" className="h2">
                <Words text="Buildings across *Bangladesh.*" />
              </h2>
            </div>
            <ul className="sector-links" aria-label="Browse projects by sector" data-reveal>
              {sectors.map((sector) => (
                <li key={sector.id}>
                  <Link href={`/projects?category=${sector.id}`}>
                    {sector.label}
                    <sup>{sector.count}</sup>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <ul className="work-grid">
            {featured.map((project, i) => {
              const layout = WORK_LAYOUT[i]
              return (
                <li key={project.slug} className={`work-grid__item work-grid__item--${layout.slot}`}>
                  <div data-speed={layout.speed || undefined}>
                    <ProjectCard
                      project={project}
                      index={String(i + 1).padStart(2, '0')}
                      ratio={layout.ratio}
                      sizes={layout.sizes}
                    />
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="work__more" data-reveal>
            <Link href="/projects" className="btn btn--outline" data-magnetic="0.2">
              <BtnLabel icon="→">{`All ${projects.length} projects`}</BtnLabel>
            </Link>
          </div>
        </div>
      </section>

      {/* 05 — People */}
      <section className="section people" aria-labelledby="people-title">
        <div className="container people__grid">
          <div className="people__intro">
            <Eyebrow index="05">The office</Eyebrow>
            <h2 id="people-title" className="h2">
              <Words text="Engineers and architects *in one office.*" />
            </h2>
            <p className="prose" data-reveal>
              Founded by Engineer Md. Ali Asgar as a structural consulting firm, the practice brings together structural
              engineers, architects, diploma engineers and CAD staff, so a building is drawn and engineered under one
              roof.
            </p>
            <p data-reveal>
              <Link href="/practice" className="text-link">
                The practice and team
              </Link>
            </p>
          </div>
          <ul className="roster" aria-label="Who works in the office">
            {team.groups.map((group) => (
              <li key={group.category}>
                <span className="rule" data-line aria-hidden="true" />
                <span className="roster__row" data-reveal>
                  <span className="roster__name">{group.category}</span>
                  <span className="roster__count">{String(group.members.length).padStart(2, '0')}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — Clients */}
      {keyClients.length ? (
        <section className="clients" aria-labelledby="clients-title">
          <div className="container sec-head">
            <div>
              <Eyebrow index="06">Clients</Eyebrow>
              <h2 id="clients-title" className="h2">
                <Words text="Developers and industry *we have worked for.*" />
              </h2>
            </div>
            <p className="sec-head__lede" data-reveal>
              A selection of the developers and industrial groups on the firm’s client list.{' '}
              <Link href="/practice#clients" className="text-link">
                Full client list
              </Link>
            </p>
          </div>
          <div className="clients__strips">
            {keyClients.map((group, i) => (
              <div key={group.category} className="clients__strip">
                <h3 className="clients__label">{group.category}</h3>
                <Marquee items={group.names} reverse={i % 2 === 1} duration={group.names.length * 3.2} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <ClosingCta />
    </>
  )
}
