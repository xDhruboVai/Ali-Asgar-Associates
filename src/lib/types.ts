// Row shapes as they exist in the live Supabase database.

export type CompanyRow = {
  id: string
  name: string
  established_year: number | null
  type: string | null
  address: string | null
  telephone: string | null
  email: string | null
  services_offered: string[] | null
}

export type LicenseRow = {
  id: string
  license_type: string
  license_number: string | null
  authority: string | null
}

export type TeamMemberRow = {
  id: string
  name: string
  designation: string | null
  role_category: string | null
  discipline: string | null
  degree: string | null
  passing_year: number | null
  institution: string | null
  certifications: string | null
  bio: string | null
  display_order: number | null
}

export type ClientRow = {
  id: string
  name: string
  category: string | null
}

export type ProjectImageRow = {
  id: string
  image_url: string
  caption: string | null
}

export type ProjectRow = {
  id: string
  name: string
  address: string | null
  category: string
  description: string | null
  status: string | null
  land_area: string | null
  construction_area: string | null
  covered_area: string | null
  capacity: string | null
  structural_system: string | null
  earthquake_zone: string | null
  design_wind_speed: string | null
  vetting_engineer: string | null
  clients: ClientRow | null
  project_images: ProjectImageRow[]
}

// Normalised shapes used by the UI.

export type CategoryId =
  | 'residential'
  | 'commercial'
  | 'industrial'
  | 'hospital'
  | 'hotel'
  | 'assessment'
  | 'other'

export type ProjectImage = { src: string; alt: string }

export type Project = {
  slug: string
  name: string
  categories: CategoryId[]
  status: string | null
  address: string | null
  description: string | null
  client: string | null
  landArea: string | null
  constructionArea: string | null
  coveredArea: string | null
  capacity: string | null
  structuralSystem: string | null
  earthquakeZone: string | null
  designWindSpeed: string | null
  vettedBy: string | null
  assessmentNote: string | null
  images: ProjectImage[]
  /** True when the database holds an image for this project but no details yet. */
  detailsPending: boolean
}

export type ClientGroup = { category: string; names: string[] }

export type TeamGroup = { category: string; members: TeamMemberRow[] }
