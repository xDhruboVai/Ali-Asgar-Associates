import type { Metadata } from 'next'
import { ClosingCta } from '@/components/ClosingCta'
import { ProjectsBrowser } from '@/components/ProjectsBrowser'
import { getProjects } from '@/lib/data'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Residential, commercial, industrial, hospital and hotel projects, and structural assessments of existing factories, by Ali Asgar & Associates.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <header className="page-head blueprint">
        <div className="container page-head__grid">
          <div>
            <p className="label label--tick">Portfolio</p>
            <h1>
              <span className="line">
                <span>Projects</span>
              </span>
            </h1>
          </div>
          <p className="lede">
            Design and engineering work across Bangladesh, from apartment buildings in Gulshan and Dhanmondi to
            garment factories in Gazipur and hotels in Cox’s Bazar.
          </p>
        </div>
      </header>
      <section className="container page-body" aria-label="Project list">
        <ProjectsBrowser projects={projects} />
      </section>
      <ClosingCta />
    </>
  )
}
