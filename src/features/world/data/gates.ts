export type SectionId = 'about' | 'skills' | 'experience' | 'projects' | 'contact'

export type GateConfig = {
  id: SectionId
  label: string
  path: `/${SectionId}`
  position: [number, number, number]
  rotationY: number
  color: string
  glow: string
  forward: [number, number]
}

export const GATES: GateConfig[] = [
  {
    id: 'about',
    label: 'ABOUT',
    path: '/about',
    position: [0, 0, -22],
    rotationY: 0,
    color: '#f97316',
    glow: '#fb923c',
    forward: [0, -1],
  },
  {
    id: 'skills',
    label: 'SKILLS',
    path: '/skills',
    position: [22, 0, 0],
    rotationY: Math.PI / 2,
    color: '#38bdf8',
    glow: '#7dd3fc',
    forward: [1, 0],
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    path: '/experience',
    position: [-22, 0, 0],
    rotationY: -Math.PI / 2,
    color: '#c8f542',
    glow: '#d9f99d',
    forward: [-1, 0],
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    path: '/projects',
    position: [-14, 0, -14],
    rotationY: -Math.PI / 4,
    color: '#a78bfa',
    glow: '#c4b5fd',
    forward: [-0.7, -0.7],
  },
  {
    id: 'contact',
    label: 'CONTACT',
    path: '/contact',
    position: [0, 0, 22],
    rotationY: Math.PI,
    color: '#c084fc',
    glow: '#d8b4fe',
    forward: [0, 1],
  },
]

export const SECTION_PATHS = GATES.map((g) => g.path)

export function sectionFromPath(pathname: string): SectionId | null {
  const gate = GATES.find((g) => g.path === pathname)
  return gate?.id ?? null
}

export const SPAWN: [number, number, number] = [0, 0, 6]
export const WORLD_BOUNDS = 34
