import type { SimpleIcon } from 'simple-icons'
import {
  siAngular,
  siClaude,
  siCss,
  siDjango,
  siDocker,
  siExpress,
  siFastapi,
  siFirebase,
  siGit,
  siGithub,
  siGooglecloud,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siRedux,
  siSpringboot,
  siTailwindcss,
  siTensorflow,
  siTypescript,
} from 'simple-icons'
import awsSvg from '../../../assets/skill-aws.svg?raw'
import openaiSvg from '../../../assets/skill-openai.svg?raw'
import microservicesSvg from '../../../assets/skill-microservices.svg?raw'
import errorHandlingSvg from '../../../assets/skill-error-handling.svg?raw'
import customHooksSvg from '../../../assets/skill-custom-hooks.svg?raw'

export type BrandIcon = {
  title: string
  hex: string
  /** Single-color brand mark */
  path?: string
  /** Multi-color custom SVG markup (full file) */
  svg?: string
}

function fromSimple(icon: SimpleIcon): BrandIcon {
  return { title: icon.title, hex: icon.hex, path: icon.path }
}

function fromSvgRaw(title: string, hex: string, raw: string): BrandIcon {
  const match = raw.match(/\sd="([^"]+)"/)
  if (!match) throw new Error(`Missing path in ${title} SVG`)
  return { title, hex, path: match[1] }
}

function fromFullSvg(title: string, hex: string, raw: string): BrandIcon {
  return { title, hex, svg: raw }
}

const AWS_ICON = fromSvgRaw('AWS', 'FF9900', awsSvg)
const OPENAI_ICON = fromSvgRaw('OpenAI', '412991', openaiSvg)

const BY_LABEL: Record<string, BrandIcon> = {
  JavaScript: fromSimple(siJavascript),
  TypeScript: fromSimple(siTypescript),
  TS: fromSimple(siTypescript),
  Python: fromSimple(siPython),
  Java: fromSimple(siOpenjdk),
  HTML5: fromSimple(siHtml5),
  CSS3: fromSimple(siCss),
  'React.js': fromSimple(siReact),
  React: fromSimple(siReact),
  'React Native': fromSimple(siReact),
  'React Native (Expo)': fromSimple(siReact),
  'Next.js': fromSimple(siNextdotjs),
  NestJS: fromSimple(siNestjs),
  Angular: fromSimple(siAngular),
  'Node.js': fromSimple(siNodedotjs),
  Node: fromSimple(siNodedotjs),
  'Express.js': fromSimple(siExpress),
  PostgreSQL: fromSimple(siPostgresql),
  SQL: fromSimple(siMysql),
  MongoDB: fromSimple(siMongodb),
  Redis: fromSimple(siRedis),
  Docker: fromSimple(siDocker),
  Nginx: fromSimple(siNginx),
  AWS: AWS_ICON,
  GCP: fromSimple(siGooglecloud),
  Firebase: fromSimple(siFirebase),
  Redux: fromSimple(siRedux),
  'Spring Boot': fromSimple(siSpringboot),
  'Tailwind CSS': fromSimple(siTailwindcss),
  Django: fromSimple(siDjango),
  'REST APIs': fromSimple(siFastapi),
  Git: fromSimple(siGit),
  GitHub: fromSimple(siGithub),
  'OpenAI API': OPENAI_ICON,
  ChatGPT: OPENAI_ICON,
  Claude: fromSimple(siClaude),
  'AI Integration': fromSimple(siTensorflow),
  'Prompt Engineering': fromSimple(siGooglegemini),
  Microservices: fromFullSvg('Microservices', '2196F3', microservicesSvg),
  'Error Handling': fromFullSvg('Error Handling', '1E88E5', errorHandlingSvg),
  'Custom Hooks': fromFullSvg('Custom Hooks', '61DAFB', customHooksSvg),
}

export function getBrandIcon(name: string): BrandIcon | null {
  return BY_LABEL[name] ?? null
}

/** Floating orbs near Skills gate — same world size */
export const WORLD_SKILL_ORBS = ['React', 'Node', 'TS', 'AWS', 'SQL'] as const

export function brandIconDataUrl(icon: BrandIcon, size = 256): string {
  if (icon.svg) {
    const inner = icon.svg.replace(/<\/?svg[^>]*>/g, '')
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#ffffff"/>${inner}</svg>`
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#ffffff"/><path fill="#${icon.hex}" d="${icon.path}"/></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
