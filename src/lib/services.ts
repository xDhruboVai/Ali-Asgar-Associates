import type { CategoryId } from './types'

/**
 * The firm's five service lines, in its own order of priority, from the
 * handwritten brief (Context/WhatsApp_Image_…jpg, pages 1 and 2).
 * Landscape comes from the services list stored in the company_profile table.
 */

export type Discipline = { name: string; summary: string }

export type Service = {
  id: string
  name: string
  /** One line for cards. */
  tagline: string
  /** Fuller description for the services page. */
  summary: string
  points: string[]
  disciplines?: Discipline[]
  /** Project categories on the site that show this kind of work. */
  relatedCategories: CategoryId[]
}

export const SERVICES: Service[] = [
  {
    id: 'consultancy',
    name: 'Complete Design Consultancy',
    tagline: 'Full architectural, planning and engineering consultancy.',
    summary:
      'The full design package for a building, prepared in one office: planning, architecture and the engineering services that go with it.',
    points: [
      'One coordinated set of drawings across all disciplines',
      'Design and detailing to the Bangladesh National Building Code (BNBC)',
      'For residential and industrial clients',
    ],
    disciplines: [
      { name: 'Planning', summary: 'Site study, planning and the brief that the design is built on.' },
      { name: 'Architectural', summary: 'Architectural design, from concept to working drawings.' },
      { name: 'Structural', summary: 'Structural analysis, design and detailing.' },
      { name: 'Electrical', summary: 'Electrical design for the building.' },
      { name: 'Plumbing & Sanitary', summary: 'Water supply, drainage and sanitary design.' },
      { name: 'Landscape', summary: 'Landscape design for the site.' },
    ],
    relatedCategories: ['residential', 'industrial', 'commercial'],
  },
  {
    id: 'structural',
    name: 'Structural Consultancy',
    tagline: 'Structural design and engineering for new and existing buildings.',
    summary:
      'Structural engineering on its own, for developers and architects who bring their own architectural design.',
    points: [
      'Structural systems for residential, commercial, industrial, hospital and hotel buildings',
      'Seismic zone and design wind speed considered for every project, as required by the BNBC',
      'Independent vetting of the structural system on selected projects',
    ],
    relatedCategories: ['residential', 'commercial', 'industrial', 'hospital', 'hotel'],
  },
  {
    id: 'dea',
    name: 'Detail Engineering Assessment',
    tagline: 'Technical assessment of existing industrial and factory buildings.',
    summary:
      'Structural assessment (DEA) of existing factory buildings, carried out for ready-made garment industry clients in response to Accord and Alliance requirements.',
    points: [
      'Detail Engineering Assessment of existing factory buildings',
      'Architectural and structural as-built drawings',
      'Assessment and drawings after retrofit work',
    ],
    relatedCategories: ['assessment'],
  },
  {
    id: 'construction-management',
    name: 'Construction Management',
    tagline: 'Site management, coordination and construction supervision.',
    summary: 'Management and supervision of construction on site, on behalf of the client.',
    points: ['Site supervision by the firm’s project engineers', 'Coordination between design and construction'],
    relatedCategories: [],
  },
  {
    id: 'turnkey',
    name: 'Turnkey Construction',
    tagline: 'Complete design and construction delivered through one integrated process.',
    summary: 'Design and construction delivered on a turnkey basis: the firm takes the project from A to Z.',
    points: ['Single point of responsibility from design to handover'],
    relatedCategories: [],
  },
]

/** The turnkey route from brief to handover, shown as a journey on the home and services pages. */
export const JOURNEY: { name: string; text: string }[] = [
  { name: 'Vision', text: 'The client’s brief, site and ambitions for the building.' },
  { name: 'Planning', text: 'Site study and planning.' },
  { name: 'Design', text: 'Architectural design, from concept to working drawings.' },
  { name: 'Engineering', text: 'Structural, electrical, plumbing and sanitary design to the BNBC.' },
  { name: 'Construction', text: 'Built and managed on site by the same firm.' },
  { name: 'Completion', text: 'The finished building, handed over.' },
]
