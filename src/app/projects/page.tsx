import type { Metadata } from 'next'
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
      <header className="page-head">
        <div className="container page-head__grid">
          <div>
            <p className="label">Portfolio</p>
            <h1>Projects</h1>
          </div>
          <p className="lede">
            Design and engineering work across Bangladesh, from apartment buildings in Gulshan and Dhanmondi to
            garment factories in Gazipur and hotels in Cox’s Bazar. Filter by sector or status.
          </p>
        </div>
      </header>
      <section className="container" style={{ paddingBottom: 'clamp(56px, 8vw, 112px)' }} aria-label="Project list">
        <ProjectsBrowser projects={projects} />
      </section>
    </>
  )
}
