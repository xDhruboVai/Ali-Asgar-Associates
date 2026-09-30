import type { MetadataRoute } from 'next'
import { getProjects } from '@/lib/data'
import { SITE_URL } from '@/lib/site'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects()
  const pages = ['', '/projects', '/services', '/practice', '/contact'].map((path) => ({ url: `${SITE_URL}${path}` }))
  return [...pages, ...projects.map((p) => ({ url: `${SITE_URL}/projects/${p.slug}` }))]
}
