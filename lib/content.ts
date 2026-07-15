

export interface ImageAsset {

  alt: string;

  src: string;
}

export type ProjectCategory = 'Residential' | 'Commercial' | 'Cultural';

export interface NavLink {
  index: string;
  label: string;
  href: string;
}

export interface Project {
  index: string;
  name: string;
  category: ProjectCategory;
  year: string;
  area: number;
  location: string;
  coordinate: string;
  brief: string;
  image: ImageAsset;
}

export interface ProcessPhase {
  index: string;
  name: string;
  line: string;
  image: ImageAsset;
}

export interface Person {
  name: string;
  role: string;
  image: ImageAsset;
}

export const SITE = {
  name: 'ATELIER FORMA',
  shortName: 'FORMA',
  kicker: 'Architecture studio — Zürich, est. 2009',
  tagline: 'We draw in light.',
  coordinate: '47°22′N 8°32′E',
  email: 'studio@atelierforma.example',
  address: 'Limmatstrasse 264, 8005 Zürich',
} as const;

export const NAV: NavLink[] = [
  { index: '01', label: 'Manifesto', href: '#manifesto' },
  { index: '02', label: 'Projects', href: '#projects' },
  { index: '03', label: 'Process', href: '#process' },
  { index: '04', label: 'Studio', href: '#studio' },
  { index: '05', label: 'Contact', href: '#contact' },
];

export const MANIFESTO: string[] = [
  'A wall is a decision about light.',
  'We work in section, in plan, in silence.',
  'Form is what remains when nothing else is necessary.',
];

export const HERO_IMAGE: ImageAsset = {
  alt: 'A minimalist concrete interior cut by dramatic shafts of natural light',
  src: '/images/hero-interior.jpg',
};

export const PROJECT_CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'Residential',
  'Commercial',
  'Cultural',
];

export const PROJECTS: Project[] = [
  {
    index: '01',
    name: 'House on the Slope',
    category: 'Residential',
    year: '2023',
    area: 240,
    location: 'Ticino, CH',
    coordinate: '46°10′N 8°47′E',
    brief: 'A concrete house cut into the hillside, organised around a single shaft of southern light.',
    image: {
      alt: 'Minimalist concrete house at dusk with large glazing, set into a slope',
      src: '/images/project-slope.jpg',
    },
  },
  {
    index: '02',
    name: 'Atrium Works',
    category: 'Commercial',
    year: '2022',
    area: 6400,
    location: 'Zürich, CH',
    coordinate: '47°23′N 8°32′E',
    brief: 'An office around a full-height light well; people kept small for the scale of the volume.',
    image: {
      alt: 'Modern office atrium with a full-height light well, people small against the scale',
      src: '/images/project-atrium.jpg',
    },
  },
  {
    index: '03',
    name: 'Gallery of Quiet',
    category: 'Cultural',
    year: '2024',
    area: 1850,
    location: 'Basel, CH',
    coordinate: '47°33′N 7°35′E',
    brief: 'A museum gallery lit only from above; the skylight is the exhibit before the art arrives.',
    image: {
      alt: 'A concrete museum gallery lit by a skylight, a single visitor for scale',
      src: '/images/project-gallery.jpg',
    },
  },
  {
    index: '04',
    name: 'Two Courtyards',
    category: 'Residential',
    year: '2021',
    area: 310,
    location: 'Engadin, CH',
    coordinate: '46°30′N 9°50′E',
    brief: 'A house defined by what it leaves empty — two courtyards that hold the alpine light.',
    image: {
      alt: 'Minimalist concrete house arranged around two internal courtyards in alpine light',
      src: '/images/project-courtyards.jpg',
    },
  },
  {
    index: '05',
    name: 'The Long Market',
    category: 'Commercial',
    year: '2020',
    area: 4200,
    location: 'Geneva, CH',
    coordinate: '46°12′N 6°08′E',
    brief: 'A market hall under a single folded roof; structure and shelter are the same gesture.',
    image: {
      alt: 'A market hall beneath a single folded concrete roof in daylight',
      src: '/images/project-market.jpg',
    },
  },
  {
    index: '06',
    name: 'Chapel of Ash',
    category: 'Cultural',
    year: '2019',
    area: 420,
    location: 'Valais, CH',
    coordinate: '46°14′N 7°22′E',
    brief: 'A chapel of board-marked concrete; one oculus, and the day moving across the floor.',
    image: {
      alt: 'A board-marked concrete chapel interior lit by a single oculus',
      src: '/images/project-chapel.jpg',
    },
  },
];

export const PROCESS: ProcessPhase[] = [
  {
    index: '01',
    name: 'Brief',
    line: 'We begin by listening to the site and the silence the client is trying to keep.',
    image: {
      alt: "An architect's hands over technical drawings on a large desk, seen from above",
      src: '/images/process-brief.jpg',
    },
  },
  {
    index: '02',
    name: 'Concept',
    line: 'A single idea, tested in model and section until it can carry the whole building.',
    image: {
      alt: 'White card architectural study models on a concrete table in raking light',
      src: '/images/process-concept.jpg',
    },
  },
  {
    index: '03',
    name: 'Development',
    line: 'Detail is where the idea survives or dies. We draw at 1:1 when it matters.',
    image: {
      alt: 'A textured concrete wall with a copper fixture, shot as a macro detail',
      src: '/images/process-detail.jpg',
    },
  },
  {
    index: '04',
    name: 'Delivery',
    line: 'On site, in all weather, until the light lands exactly where it was drawn.',
    image: {
      alt: 'An architect reviewing drawings on a concrete construction site at golden hour',
      src: '/images/process-delivery.jpg',
    },
  },
];

export const STUDIO = {
  paragraph:
    'Atelier Forma is a studio of fourteen architects working between Zürich and the Alps. We take few commissions and finish them slowly. We believe a building is a quiet argument that must hold for a hundred years.',
  facts: [
    { label: 'Founded', value: 2009, suffix: '' },
    { label: 'Projects', value: 64, suffix: '' },
    { label: 'Team', value: 14, suffix: '' },
    { label: 'Awards', value: 11, suffix: '' },
  ],
  people: [
    {
      name: 'Elena Ró',
      role: 'Founding Partner',
      image: {
        alt: 'Black and white editorial portrait of architect Elena Ró in a concrete studio',
        src: '/images/studio-elena.jpg',
      },
    },
    {
      name: 'Mathis Brandt',
      role: 'Partner — Design',
      image: {
        alt: 'Black and white editorial portrait of architect Mathis Brandt by a window',
        src: '/images/studio-mathis.jpg',
      },
    },
    {
      name: 'Ingrid Vos',
      role: 'Partner — Delivery',
      image: {
        alt: 'Black and white editorial portrait of architect Ingrid Vos at a drawing desk',
        src: '/images/studio-ingrid.jpg',
      },
    },
  ] satisfies Person[],
} as const;

export const CONTACT = {
  heading: "LET'S BUILD",
  line: 'Tell us about the site, and the silence you want to keep.',
  projectTypes: ['Residential', 'Commercial', 'Cultural', 'Other'],
  success: "Received. We'll be in touch.",
} as const;

export const FOOTER = {
  columns: [
    { label: 'Studio', items: ['About', 'Process', 'Careers', 'CV'] },
    { label: 'Work', items: ['Residential', 'Commercial', 'Cultural'] },
    { label: 'Connect', items: ['Instagram', 'LinkedIn', 'Journal'] },
  ],
  closing: '© ATELIER FORMA 2009—2026',
} as const;
