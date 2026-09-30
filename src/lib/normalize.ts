import type {
  CategoryId,
  ClientGroup,
  ClientRow,
  Project,
  ProjectRow,
  TeamGroup,
  TeamMemberRow,
} from './types'

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export const CATEGORIES: { id: CategoryId; label: string; dbNames: string[] }[] = [
  { id: 'residential', label: 'Residential', dbNames: ['Residential'] },
  { id: 'commercial', label: 'Commercial', dbNames: ['Commercial'] },
  { id: 'industrial', label: 'Industrial', dbNames: ['Industrial'] },
  { id: 'hospital', label: 'Hospital', dbNames: ['Hospital'] },
  { id: 'hotel', label: 'Hotel', dbNames: ['Hotel'] },
  {
    id: 'assessment',
    label: 'Assessment & As-Built',
    dbNames: ['Structural Assessment', 'Structural Assessment & As Built'],
  },
  { id: 'other', label: 'Other work', dbNames: [] },
]

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id
}

/** Maps a database category to a category id. "General" rows only carry images and return null. */
function categoryId(dbCategory: string): CategoryId | null {
  const match = CATEGORIES.find((c) =>
    c.dbNames.some((n) => n.toLowerCase() === dbCategory.trim().toLowerCase()),
  )
  return match?.id ?? null
}

/* ------------------------------------------------------------------ */
/* Text helpers                                                        */
/* ------------------------------------------------------------------ */

/** Matching key that ignores case, punctuation, a trailing "Ltd" and known spelling variants. */
export function nameKey(name: string): string {
  const key = name
    .toUpperCase()
    .replace(/FASHON/g, 'FASHION')
    .replace(/\bLIMITED\b|\bLTD\b\.?/g, '')
    .replace(/[^A-Z0-9]/g, '')
  return KEY_ALIASES[key] ?? key
}

// The same building recorded under two names in the database.
const KEY_ALIASES: Record<string, string> = {
  CAREHOSPITAL: 'CARETOWER',
  ASTORIAPARK: 'GREENASTORIAPARK',
}

/** Recurring misspelling in the source data ("Fashon"). */
export function fixSpelling(value: string): string {
  return value.replace(/\bfashon\b/gi, (m) => (m === m.toUpperCase() ? 'FASHION' : 'Fashion'))
}

/** Light clean-up of typos and spacing in stored descriptions. */
export function cleanText(value: string | null | undefined): string | null {
  if (!value) return null
  const text = fixSpelling(value)
    .replace(/\s+/g, ' ')
    .replace(/Bldgding/gi, 'Building')
    .replace(/\bShare Wall\b/gi, 'Shear Wall')
    .replace(/\bSuficient\b/gi, 'Sufficient')
    .replace(/\bSyatem\b/gi, 'System')
    .replace(/(\d+)\s*-\s*Storied/gi, '$1-Storied')
    .replace(/\.\s+With\b/g, ' with')
    .replace(/\bWith\b/g, 'with')
    .replace(/\s*\.\s*$/, '')
    .trim()
  return text || null
}

const KEEP_UPPER = /[0-9/#]|^[A-Z]$|^(NHL|ANZ|DBL|EMPL|BOQ|JCO|DOHS|EPZ|BNBC|RMG|DEA)$/

/** "ALI ASGAR & ASSOCIATES" → "Ali Asgar & Associates". Leaves codes like "A/2" alone. */
export function titleCase(value: string): string {
  return value
    .split(' ')
    .map((word) => {
      const bare = word.replace(/[.,]/g, '')
      if (KEEP_UPPER.test(bare)) return word
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
    .replace(/\s*\.\s*$/, '')
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatStatus(status: string | null): string | null {
  if (!status) return null
  const s = status.trim().toLowerCase()
  if (s === 'completed') return 'Completed'
  if (s === 'on going' || s === 'ongoing') return 'Ongoing'
  if (s.startsWith('planning')) return 'Planning'
  if (s.includes('completed') && s.includes('going')) return 'Completed / Ongoing'
  return status.trim()
}

/** Prefer a definite status over the combined "Completed / On Going" value. */
function statusRank(status: string | null): number {
  const s = formatStatus(status)
  if (!s) return 0
  return s.includes('/') ? 1 : 2
}

/** Stored image URLs contain spaces and ampersands; make them safe for next/image. */
export function safeImageUrl(url: string): string {
  try {
    return encodeURI(decodeURI(url.trim()))
  } catch {
    return encodeURI(url.trim())
  }
}

/* ------------------------------------------------------------------ */
/* Client privacy                                                      */
/* ------------------------------------------------------------------ */

const ORGANISATION = /\b(ltd|limited|army|somity|somiti|songstha|trust|group|foundation|hospital|college|hotel|inn|properties|holdings|textile)\b/i
const PERSONAL_PREFIX = /^(md\.?|mr\.?|mrs\.?|ms\.?|major\.?|dr\.?|engr\.?|sk\.?|kazi|khandaker)\s/i

/**
 * Returns a client name that is safe to publish, or null. Private individuals are
 * not named on the public site; personal names in brackets are removed.
 */
export function publicClientName(name: string | null | undefined, category?: string | null): string | null {
  if (!name) return null
  const cleaned = name.replace(/\s*\((?:dr|mr|mrs|md)\.?[^)]*\)/i, '').replace(/\s+/g, ' ').trim()
  if (PERSONAL_PREFIX.test(cleaned) && !ORGANISATION.test(cleaned)) return null
  if (category === 'Individual' && !ORGANISATION.test(cleaned)) return null
  return fixSpelling(cleaned.replace(/\.$/, ''))
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

const DETAIL_FIELDS = [
  'address',
  'description',
  'status',
  'land_area',
  'construction_area',
  'covered_area',
  'capacity',
  'structural_system',
  'earthquake_zone',
  'design_wind_speed',
  'vetting_engineer',
] as const

function filledFieldCount(row: ProjectRow): number {
  return DETAIL_FIELDS.filter((f) => row[f]).length + (row.clients ? 1 : 0)
}

function firstValue<K extends (typeof DETAIL_FIELDS)[number]>(rows: ProjectRow[], field: K): string | null {
  for (const row of rows) {
    const value = row[field]
    if (value && String(value).trim()) return String(value).trim()
  }
  return null
}

export type NormalisedPortfolio = {
  projects: Project[]
  clientGalleries: { client: string; images: Project['images'] }[]
}

/**
 * The projects table contains duplicate rows for the same building (often with
 * small spelling differences) and image-only rows with category "General".
 * This merges duplicates, attaches images to the right project and keeps the
 * remaining image-only rows as "Other work" so no stored content is dropped.
 */
export function normaliseProjects(rows: ProjectRow[], clientNames: string[]): NormalisedPortfolio {
  const groups = new Map<string, ProjectRow[]>()
  const imageOnly: ProjectRow[] = []

  for (const row of rows) {
    if (!row.name?.trim()) continue
    if (categoryId(row.category) === null) {
      imageOnly.push(row)
      continue
    }
    const key = nameKey(row.name)
    groups.set(key, [...(groups.get(key) ?? []), row])
  }

  const projects = new Map<string, Project>()

  for (const [key, group] of groups) {
    const isAssessment = (r: ProjectRow) => categoryId(r.category) === 'assessment'
    const design = group.filter((r) => !isAssessment(r))
    const assessment = group.filter(isAssessment)
    const ranked = [...(design.length ? design : assessment)].sort(
      (a, b) => filledFieldCount(b) - filledFieldCount(a),
    )
    const ordered = [...ranked, ...(design.length ? assessment : [])]
    const primary = ordered[0]

    const categories = CATEGORIES.map((c) => c.id).filter((id) =>
      group.some((r) => categoryId(r.category) === id),
    )

    const statusSource = [...ranked].sort((a, b) => statusRank(b.status) - statusRank(a.status))[0]
    const clientRow = ordered.find((r) => r.clients)?.clients ?? null
    let client = publicClientName(clientRow?.name, clientRow?.category)
    if (client && nameKey(client) === key) client = null

    projects.set(key, {
      slug: '',
      name: fixSpelling(primary.name.trim()),
      categories,
      status: formatStatus(statusSource?.status ?? firstValue(ordered, 'status')),
      address: cleanText(firstValue(ordered, 'address')),
      description: cleanText(firstValue(ranked, 'description')),
      client,
      landArea: firstValue(ordered, 'land_area'),
      constructionArea: firstValue(ordered, 'construction_area'),
      coveredArea: firstValue(ordered, 'covered_area'),
      capacity: firstValue(ordered, 'capacity'),
      structuralSystem: cleanText(firstValue(ordered, 'structural_system')),
      earthquakeZone: firstValue(ordered, 'earthquake_zone'),
      designWindSpeed: firstValue(ordered, 'design_wind_speed'),
      vettedBy: firstValue(ordered, 'vetting_engineer'),
      assessmentNote: design.length && assessment.length ? cleanText(firstValue(assessment, 'description')) : null,
      images: [],
      detailsPending: false,
    })

    for (const row of group) addImages(projects.get(key)!, row)
  }

  const clientKeys = new Map(clientNames.map((n) => [nameKey(n), n]))
  const galleries = new Map<string, NormalisedPortfolio['clientGalleries'][number]>()

  for (const row of imageOnly) {
    const key = nameKey(row.name)
    const existing = projects.get(key)
    if (existing) {
      addImages(existing, row)
    } else if (clientKeys.has(key)) {
      const client = publicClientName(clientKeys.get(key)) ?? row.name
      const gallery = galleries.get(key) ?? { client, images: [] }
      gallery.images.push(...imagesFor(row, client))
      galleries.set(key, gallery)
    } else {
      const project: Project = {
        slug: '',
        name: row.name.trim(),
        categories: ['other'],
        status: null,
        address: null,
        description: null,
        client: null,
        landArea: null,
        constructionArea: null,
        coveredArea: null,
        capacity: null,
        structuralSystem: null,
        earthquakeZone: null,
        designWindSpeed: null,
        vettedBy: null,
        assessmentNote: null,
        images: [],
        detailsPending: true,
      }
      addImages(project, row)
      projects.set(key, project)
    }
  }

  const order = (p: Project) => CATEGORIES.findIndex((c) => c.id === p.categories[0])
  const list = [...projects.values()].sort(
    (a, b) => order(a) - order(b) || a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
  )

  const used = new Set<string>()
  for (const project of list) {
    let slug = slugify(project.name) || 'project'
    for (let n = 2; used.has(slug); n++) slug = `${slugify(project.name)}-${n}`
    used.add(slug)
    project.slug = slug
  }

  return { projects: list, clientGalleries: [...galleries.values()] }
}

function imagesFor(row: ProjectRow, label: string): Project['images'] {
  return (row.project_images ?? [])
    .filter((img) => img.image_url)
    .map((img) => ({ src: safeImageUrl(img.image_url), alt: titleCase(img.caption?.trim() || label) }))
}

function addImages(project: Project, row: ProjectRow) {
  const primaryCategory = categoryLabel(project.categories[0]).toLowerCase()
  for (const image of imagesFor(row, project.name)) {
    if (project.images.some((i) => i.src === image.src)) continue
    project.images.push({
      src: image.src,
      alt: project.detailsPending ? titleCase(project.name) : `${titleCase(project.name)}, ${primaryCategory} project`,
    })
  }
}

/* ------------------------------------------------------------------ */
/* Clients and team                                                    */
/* ------------------------------------------------------------------ */

const CLIENT_GROUP_ORDER = ['Real Estate', 'Industry', 'Hospital', 'Hotel', 'Institutional & other']

export function groupClients(rows: ClientRow[]): ClientGroup[] {
  const byKey = new Map<string, ClientRow>()
  for (const row of rows) {
    const key = nameKey(row.name)
    const current = byKey.get(key)
    if (!current || (!current.category && row.category)) byKey.set(key, row)
  }

  const groups = new Map<string, string[]>()
  for (const row of byKey.values()) {
    const name = publicClientName(row.name, row.category)
    if (!name) continue
    const category =
      row.category && row.category !== 'Individual' ? row.category : 'Institutional & other'
    groups.set(category, [...(groups.get(category) ?? []), name])
  }

  return [...groups.entries()]
    .map(([category, names]) => ({
      category,
      names: names.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })),
    }))
    .sort((a, b) => rankOf(CLIENT_GROUP_ORDER, a.category) - rankOf(CLIENT_GROUP_ORDER, b.category))
}

function rankOf(order: string[], value: string) {
  const i = order.indexOf(value)
  return i === -1 ? order.length : i
}

const TEAM_GROUP_LABELS: Record<string, string> = {
  'Structural Engineer': 'Structural Engineers',
  Architect: 'Architects',
  'Assistant of Engineers': 'Assistant Engineers',
  'Electrical Consultant': 'Electrical Consultants',
  'Sanitary & Plumbing Consultant': 'Sanitary & Plumbing Consultants',
  'Project Management': 'Project Management',
  Administration: 'Administration, Accounts & Coordination',
}

export function groupTeam(rows: TeamMemberRow[]): TeamGroup[] {
  const sorted = [...rows].sort((a, b) => (a.display_order ?? 99) - (b.display_order ?? 99))
  const groups = new Map<string, TeamMemberRow[]>()
  for (const member of sorted) {
    const raw = member.role_category?.trim() || 'Team'
    const label = TEAM_GROUP_LABELS[raw] ?? raw
    groups.set(label, [...(groups.get(label) ?? []), member])
  }
  return [...groups.entries()].map(([category, members]) => ({ category, members }))
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

/** Bangladeshi numbers are stored in local form, e.g. 01711624061. */
export function phoneLinks(raw: string | null): { display: string; href: string } | null {
  if (!raw) return null
  const digits = raw.replace(/\D/g, '')
  if (/^01\d{9}$/.test(digits)) {
    return { display: `+880 ${digits.slice(1, 5)} ${digits.slice(5)}`, href: `tel:+880${digits.slice(1)}` }
  }
  return { display: raw, href: `tel:${digits}` }
}
