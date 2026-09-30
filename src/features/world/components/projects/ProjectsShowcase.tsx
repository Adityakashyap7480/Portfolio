import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  CreditCard,
  Lock,
  Scale,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { projects } from '../../../../shared/data/resume'
import { ImageLightbox, type LightboxImage } from '../shared/ImageLightbox'
import { TiltedScreenshot } from '../shared/TiltedScreenshot'
import { SkillIcon } from '../SkillIcon'

type Project = (typeof projects)[number]

const DOMAIN_ICONS: Record<Project['visual'], LucideIcon> = {
  legal: Scale,
  pay: CreditCard,
  estate: Building2,
  cert: BadgeCheck,
}

const DOMAIN_COLORS: Record<Project['visual'], string> = {
  legal: '#4ade80',
  pay: '#60a5fa',
  estate: '#f5b945',
  cert: '#a78bfa',
}

function ProjectTitle({ name, accent, color }: { name: string; accent: string; color: string }) {
  const at = name.lastIndexOf(accent)
  if (at < 0) return <>{name}</>
  return (
    <>
      {name.slice(0, at)}
      <span style={{ color }}>{accent}</span>
    </>
  )
}

function ProjectCard({
  project,
  index,
  onExpand,
}: {
  project: Project
  index: number
  onExpand: (preview: LightboxImage) => void
}) {
  const DomainIcon = DOMAIN_ICONS[project.visual]
  const color = DOMAIN_COLORS[project.visual]

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border p-5 sm:p-7"
      style={{
        borderColor: `${color}33`,
        background: `linear-gradient(135deg, ${color}14 0%, rgba(8,8,8,0) 45%), linear-gradient(180deg, #0e1110 0%, #080908 100%)`,
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index === 0 ? 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${color}66, 0 30px 80px -30px ${color}4d` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-28 -left-20 size-72 rounded-full blur-3xl"
        style={{ background: `${color}12` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-24 hidden size-[420px] -translate-y-1/2 rounded-full blur-3xl lg:block"
        style={{ background: `${color}1f` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-6 right-0 hidden w-px lg:block"
        style={{ background: `linear-gradient(to bottom, transparent, ${color}b3, transparent)` }}
        aria-hidden
      />

      <div className="relative grid items-center gap-8 lg:grid-cols-[1.08fr_1fr] lg:gap-10">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-paper/60 uppercase">
              <span className="text-xl font-extrabold tracking-normal" style={{ color }}>
                {project.index}
              </span>
              <span className="h-px w-8 bg-paper/25" />
              {project.role}
            </p>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold tracking-[0.14em] uppercase"
              style={{ color, borderColor: `${color}4d`, background: `${color}0f` }}
            >
              <DomainIcon className="size-3.5" />
              {project.domain}
            </span>
          </div>

          <h3 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            <ProjectTitle name={project.name} accent={project.nameAccent} color={color} />
          </h3>

          <p className="mt-3 text-[15px] leading-relaxed text-paper/70 sm:text-base">
            {project.summary}
          </p>

          <ul className="mt-5 space-y-3">
            {project.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-paper/80 sm:text-[15px]">
                <span
                  className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-void"
                  style={{ background: color }}
                >
                  <Check className="size-3" strokeWidth={3.5} />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <ul
            className="mt-6 flex flex-wrap gap-2"
            style={{ ['--chip' as string]: `${color}66` }}
          >
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-lg border border-paper/12 bg-paper/[0.04] px-2.5 py-1.5 text-xs font-semibold text-paper/85 transition hover:border-(--chip) hover:text-paper"
              >
                <SkillIcon name={tech} />
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border bg-(--btn-soft) px-5 py-2.5 text-sm font-bold text-(--btn) transition hover:bg-(--btn) hover:text-void"
                style={{
                  borderColor: `${color}80`,
                  ['--btn' as string]: color,
                  ['--btn-soft' as string]: `${color}1a`,
                }}
              >
                {project.liveLabel ?? 'View project'}
                <ArrowUpRight className="size-4" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-paper/12 px-4 py-2 text-xs font-semibold text-paper/50">
                <Lock className="size-3.5" />
                Private client project
              </span>
            )}
          </div>
        </div>

        <div className="order-first lg:order-none">
          <TiltedScreenshot
            src={project.cover}
            alt={`${project.name} screenshot`}
            color={color}
            onExpand={() => onExpand({ src: project.cover, name: project.name })}
          />
        </div>
      </div>
    </motion.article>
  )
}

export function ProjectsShowcase() {
  const [preview, setPreview] = useState<LightboxImage | null>(null)

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} onExpand={setPreview} />
        ))}
      </div>
      <ImageLightbox image={preview} onClose={() => setPreview(null)} />
    </>
  )
}
