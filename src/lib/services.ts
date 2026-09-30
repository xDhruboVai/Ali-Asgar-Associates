import type { CategoryId } from './types'

/**
 * Service structure as set out by the firm in its handwritten brief
 * (Context/WhatsApp_Image_…jpg, pages 1 and 2), in the firm's order of priority.
 * Landscape comes from the services list stored in the company_profile table.
 */

export type Discipline = { code: string; name: string; summary: string }

export type Service = {
  letter: string
  id: string
  name: string
  summary: string
  points: string[]
  disciplines?: Discipline[]
  /** Project categories on the site that show this kind of work. */
  relatedCategories: CategoryId[]
}

export const SERVICES: Service[] = [
  {
    letter: 'A',
    id: 'consultancy',
    name: 'Complete Design Consultancy',
    summary:
      'The full design package for a building, prepared in one office: planning, architecture and the engineering services that go with it.',
    points: [
      'One coordinated set of drawings across all disciplines',
      'Design and detailing to the Bangladesh National Building Code (BNBC)',
      'For residential and industrial clients',
    ],
    disciplines: [
      { code: '00', name: 'Planning', summary: 'Site study, planning and the brief that the design is built on.' },
      { code: '01', name: 'Architectural', summary: 'Architectural design, from concept to working drawings.' },
      { code: '02', name: 'Structural', summary: 'Structural analysis, design and detailing.' },
      { code: '03', name: 'Electrical', summary: 'Electrical design for the building.' },
      { code: '04', name: 'Plumbing & Sanitary', summary: 'Water supply, drainage and sanitary design.' },
      { code: '05', name: 'Landscape', summary: 'Landscape design for the site.' },
    ],
    relatedCategories: ['residential', 'industrial', 'commercial'],
  },
  {
    letter: 'B',
    id: 'structural',
    name: 'Structural Consultancy',
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
    letter: 'C',
    id: 'dea',
    name: 'Detail Engineering Assessment (DEA)',
    summary:
      'Structural assessment of existing factory buildings, carried out for ready-made garment (RMG) industry clients in response to Accord and Alliance requirements.',
    points: [
      'Detail Engineering Assessment of existing factory buildings',
      'Architectural and structural as-built drawings',
      'Assessment and drawings after retrofit work',
    ],
    relatedCategories: ['assessment'],
  },
  {
    letter: 'D',
    id: 'construction-management',
    name: 'Construction Management',
    summary: 'Management and supervision of construction on site, on behalf of the client.',
    points: ['Site supervision by the firm’s project engineers', 'Coordination between design and construction'],
    relatedCategories: [],
  },
  {
    letter: 'E',
    id: 'turnkey',
    name: 'Turnkey Construction',
    summary: 'Design and construction delivered on a turnkey basis: the firm takes the project from A to Z.',
    points: ['Single point of responsibility from design to handover'],
    relatedCategories: [],
  },
]
