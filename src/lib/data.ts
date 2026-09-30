import { cache } from 'react'
import { supabase } from './supabase'
import { groupClients, groupTeam, normaliseProjects } from './normalize'
import type { ClientRow, CompanyRow, LicenseRow, ProjectRow, TeamMemberRow } from './types'

// Pages are statically generated and refreshed from Supabase at most once an
// hour (see `export const revalidate` in each page).

function fail(table: string, message: string): never {
  throw new Error(`Could not load "${table}" from Supabase: ${message}`)
}

export const getCompany = cache(async (): Promise<CompanyRow> => {
  const { data, error } = await supabase
    .from('company_profile')
    .select('id, name, established_year, type, address, telephone, email, services_offered')
    .limit(1)
    .single()
  if (error) fail('company_profile', error.message)
  return data as CompanyRow
})

export const getLicenses = cache(async (): Promise<LicenseRow[]> => {
  const { data, error } = await supabase
    .from('licenses_and_registrations')
    .select('id, license_type, license_number, authority')
  if (error) fail('licenses_and_registrations', error.message)
  // The TIN belongs to the proprietor personally, so it is not published.
  return (data as LicenseRow[]).filter((l) => !/^tin$/i.test(l.license_type.trim()))
})

export const getTeam = cache(async () => {
  const { data, error } = await supabase
    .from('team_members')
    .select(
      'id, name, designation, role_category, discipline, degree, passing_year, institution, certifications, bio, display_order',
    )
    .order('display_order', { ascending: true })
  if (error) fail('team_members', error.message)
  const rows = data as TeamMemberRow[]
  return { members: rows, groups: groupTeam(rows) }
})

const getClientRows = cache(async (): Promise<ClientRow[]> => {
  const { data, error } = await supabase.from('clients').select('id, name, category')
  if (error) fail('clients', error.message)
  return data as ClientRow[]
})

export const getClientGroups = cache(async () => groupClients(await getClientRows()))

export const getPortfolio = cache(async () => {
  const [{ data, error }, clients] = await Promise.all([
    supabase
      .from('projects')
      .select(
        'id, name, address, category, description, status, land_area, construction_area, covered_area, capacity, structural_system, earthquake_zone, design_wind_speed, vetting_engineer, clients(id, name, category), project_images(id, image_url, caption)',
      ),
    getClientRows(),
  ])
  if (error) fail('projects', error.message)
  return normaliseProjects(
    data as unknown as ProjectRow[],
    clients.map((c) => c.name),
  )
})

export async function getProjects() {
  return (await getPortfolio()).projects
}

export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug) ?? null
}
