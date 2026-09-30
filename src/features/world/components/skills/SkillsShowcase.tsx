import { motion } from 'framer-motion'
import {
  Box,
  BrainCircuit,
  Cloud,
  Code,
  Component,
  Layers,
  MessagesSquare,
  Network,
  Puzzle,
  Repeat,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { skillEcosystem } from '../../../../shared/data/resume'
import { getBrandIcon } from '../../data/skillBrands'
import { SkillIcon } from '../SkillIcon'

type Group = (typeof skillEcosystem)[number]

const GROUP_STYLE: Record<string, { color: string; icon: LucideIcon; art?: (c: string) => ReactNode }> = {
  technology: { color: '#c8f542', icon: Box },
  product: { color: '#4ade80', icon: Box, art: (c) => <CubesArt color={c} /> },
  operations: { color: '#38bdf8', icon: Cloud, art: (c) => <ServerArt color={c} /> },
  ai: { color: '#a78bfa', icon: Sparkles, art: (c) => <WaveArt color={c} /> },
  collaboration: { color: '#f59e0b', icon: Users },
}

const FALLBACK_ICONS: Record<string, LucideIcon> = {
  'System Design': Network,
  'Clean Architecture': Layers,
  'Reusable Components': Component,
  'Problem Solving': Puzzle,
  'Analytical Thinking': BrainCircuit,
  Communication: MessagesSquare,
  'Team Collaboration': Users,
  'Agile Practices': Repeat,
}

function ChipIcon({ name, color }: { name: string; color: string }) {
  if (getBrandIcon(name)) return <SkillIcon name={name} />
  const Icon = FALLBACK_ICONS[name] ?? Code
  return <Icon className="size-4 shrink-0" style={{ color }} strokeWidth={2} />
}

function CubesArt({ color }: { color: string }) {
  const s = 17
  const k = s * 0.866
  const cubes = [
    [104, 22],
    [73, 38],
    [135, 38],
    [104, 54],
    [42, 54],
    [73, 70],
  ]
  return (
    <svg viewBox="0 0 170 110" className="h-full w-full" aria-hidden>
      {cubes.map(([x, y], i) => (
        <g key={i} stroke={color} strokeOpacity={0.55} strokeWidth={0.8} strokeLinejoin="round">
          <polygon points={`${x},${y - s} ${x + k},${y - s / 2} ${x},${y} ${x - k},${y - s / 2}`} fill={color} fillOpacity={0.5} />
          <polygon points={`${x - k},${y - s / 2} ${x},${y} ${x},${y + s} ${x - k},${y + s / 2}`} fill={color} fillOpacity={0.18} />
          <polygon points={`${x},${y} ${x + k},${y - s / 2} ${x + k},${y + s / 2} ${x},${y + s}`} fill={color} fillOpacity={0.32} />
        </g>
      ))}
    </svg>
  )
}

function ServerArt({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 170 120" className="h-full w-full" aria-hidden>
      <rect x="62" y="6" width="54" height="96" rx="7" fill={color} fillOpacity={0.14} stroke={color} strokeOpacity={0.6} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="69" y={14 + i * 17} width="40" height="11" rx="2.5" fill={color} fillOpacity={0.22} />
          <circle cx="75" cy={19.5 + i * 17} r="1.8" fill={color} />
          <circle cx="81" cy={19.5 + i * 17} r="1.8" fill={color} fillOpacity={0.55} />
          <line x1="88" x2="104" y1={19.5 + i * 17} y2={19.5 + i * 17} stroke={color} strokeOpacity={0.5} strokeWidth={1.2} />
        </g>
      ))}
      <g fill={color} fillOpacity={0.4}>
        <circle cx="126" cy="96" r="13" />
        <circle cx="144" cy="92" r="17" />
        <circle cx="160" cy="100" r="11" />
        <rect x="118" y="98" width="50" height="14" rx="7" />
      </g>
      <g fill={color} fillOpacity={0.28}>
        <circle cx="30" cy="104" r="10" />
        <circle cx="46" cy="100" r="13" />
        <rect x="22" y="104" width="38" height="11" rx="5.5" />
      </g>
    </svg>
  )
}

function WaveArt({ color }: { color: string }) {
  const id = `wave-${color.slice(1)}`
  return (
    <svg viewBox="0 0 240 100" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor={color} stopOpacity={0} />
          <stop offset="0.5" stopColor={color} stopOpacity={0.7} />
          <stop offset="1" stopColor={color} stopOpacity={0.1} />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const y = 30 + i * 6
        return (
          <path
            key={i}
            d={`M0 ${y + 20} C 60 ${y - 25}, 120 ${y + 40}, 240 ${y - 15}`}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth={1.3}
            strokeOpacity={1 - i * 0.1}
          />
        )
      })}
    </svg>
  )
}

function SkillCard({ group, index }: { group: Group; index: number }) {
  const { color, icon: Icon, art } = GROUP_STYLE[group.id] ?? GROUP_STYLE.technology
  const featured = group.id === 'technology'

  return (
    <motion.section
      className={`group relative overflow-hidden rounded-2xl border p-5 transition-[box-shadow,border-color] duration-500 sm:p-6 ${
        featured ? 'md:col-span-2' : ''
      }`}
      style={{
        borderColor: `${color}40`,
        background: `radial-gradient(120% 90% at 100% 100%, ${color}1f 0%, transparent 45%), linear-gradient(135deg, ${color}14 0%, transparent 40%), #0a0d0c`,
        boxShadow: `inset 0 1px 0 ${color}14`,
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${color}73, 0 20px 60px -25px ${color}59` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 -bottom-10 size-40 rounded-full blur-3xl"
        style={{ background: `${color}33` }}
        aria-hidden
      />

      {art && (
        <div className="pointer-events-none absolute top-2 right-2 hidden h-24 w-36 opacity-80 transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-105 sm:block">
          {art(color)}
        </div>
      )}

      <header className="relative flex items-start gap-4">
        <span
          className="flex size-12 shrink-0 items-center justify-center rounded-xl border"
          style={{
            color,
            borderColor: `${color}59`,
            background: `linear-gradient(135deg, ${color}2e, ${color}0a)`,
            boxShadow: `0 0 24px -6px ${color}66`,
          }}
        >
          <Icon className="size-6" strokeWidth={1.8} />
        </span>
        <div className={`min-w-0 flex-1 ${art ? 'sm:pr-32' : ''}`}>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color }}>
            {group.title}
          </p>
          <h3 className="mt-1 text-xl leading-tight font-extrabold tracking-tight sm:text-2xl">
            {group.heading}
          </h3>
          <p className="mt-1.5 text-sm leading-snug text-paper/60">{group.description}</p>
        </div>
        {featured && (
          <div
            className="hidden shrink-0 items-center gap-3 rounded-xl border px-4 py-3 sm:flex"
            style={{ borderColor: `${color}40`, background: `${color}0d` }}
          >
            <Code className="size-7" style={{ color }} strokeWidth={2} />
            <div>
              <p className="text-xl leading-none font-extrabold" style={{ color }}>
                {group.items.length}+
              </p>
              <p className="mt-1 text-xs text-paper/60">Technologies</p>
            </div>
          </div>
        )}
      </header>

      <ul
        className={`relative mt-5 ${
          featured
            ? 'grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8'
            : 'flex flex-wrap gap-2'
        }`}
        style={{ ['--chip' as string]: `${color}80` }}
      >
        {group.items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 rounded-lg border border-paper/10 bg-paper/[0.035] px-3 py-2 text-[13px] font-medium text-paper/90 transition duration-200 hover:-translate-y-0.5 hover:border-(--chip) hover:bg-paper/[0.07]"
          >
            <ChipIcon name={item} color={color} />
            <span className="truncate">{item}</span>
          </li>
        ))}
      </ul>
    </motion.section>
  )
}

export function SkillsShowcase() {
  return (
    <div className="grid gap-4 md:grid-cols-2 sm:gap-5">
      {skillEcosystem.map((group, i) => (
        <SkillCard key={group.id} group={group} index={i} />
      ))}
    </div>
  )
}
