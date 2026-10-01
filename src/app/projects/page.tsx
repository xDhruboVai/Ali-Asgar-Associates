import type { Metadata } from 'next'
import { ClosingCta } from '@/components/ClosingCta'
import { ProjectsBrowser } from '@/components/ProjectsBrowser'
import { PageHead } from '@/components/Ui'
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
      <PageHead
        sheet="A-100"
        eyebrow="Portfolio"
        title="Projects"
        lede={
          <p>
            Design and engineering work across Bangladesh, from apartment buildings in Gulshan and Dhanmondi to garment
            factories in Gazipur and hotels in Cox’s Bazar.
          </p>
        }
      />
      <section className="container page-body" aria-label="Project list">
        <ProjectsBrowser projects={projects} />
      </section>
      <ClosingCta />
    </>
  )
}
