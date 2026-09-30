import { motion } from 'framer-motion'
import { Bird, Check, Code, House, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { experience } from '../../../../shared/data/resume'
import { ImageLightbox, type LightboxImage } from '../shared/ImageLightbox'
import { TiltedScreenshot } from '../shared/TiltedScreenshot'
import { SkillIcon } from '../SkillIcon'

type Job = (typeof experience)[number]

const COLORS = ['#c8f542', '#60a5fa', '#a78bfa', '#f59e0b']

const COMPANY_BRAND: Record<string, { icon: LucideIcon; label: string; phoneFocus: string }> = {
  'Blu Parrot Ventures Pvt Ltd': { icon: Bird, label: 'Blu Parrot', phoneFocus: '70% 50%' },
  'Peregrine IT Solutions': { icon: House, label: 'Peregrine IT Solutions', phoneFocus: '82% 50%' },
}

function CompanyLogo({ company }: { company: string }) {
  const brand = COMPANY_BRAND[company]
  const Icon = brand?.icon
  return (
    <span className="flex size-16 shrink-0 flex-col items-center justify-center gap-0.5 rounded-xl bg-white px-1 text-center shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] sm:size-[72px]">
      {Icon ? (
        <>
          <Icon className="size-6 text-[#1d4ed8]" strokeWidth={2.2} />
          <span className="text-[8px] leading-tight font-extrabold text-[#0f172a] sm:text-[9px]">
            {brand.label}
          </span>
        </>
      ) : (
        <span className="text-lg font-extrabold text-[#0f172a]">
          {company
            .split(' ')
            .slice(0, 2)
            .map((w) => w[0])
            .join('')}
        </span>
      )}
    </span>
  )
}

function Highlight({ text, emphasis, color }: { text: string; emphasis: string[]; color: string }) {
  const lead = emphasis.find((e) => text.startsWith(e))
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-paper/80 sm:text-[15px]">
      <span
        className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-void"
        style={{ background: color }}
      >
        <Check className="size-3" strokeWidth={3.5} />
      </span>
      <span>
        {lead ? (
          <>
            <strong className="font-bold text-paper">{lead}</strong>
            {text.slice(lead.length)}
          </>
        ) : (
          text
        )}
      </span>
    </li>
  )
}

function TimelineMarker({ job, color, last }: { job: Job; color: string; last: boolean }) {
  return (
    <div className="relative hidden md:block">
      <span
        className="absolute top-9 left-0 z-10 flex size-6 items-center justify-center rounded-full border-2"
        style={{ borderColor: `${color}80`, background: '#080808', boxShadow: `0 0 18px ${color}80` }}
      >
        <span className="size-2.5 rounded-full" style={{ background: color }} />
      </span>
      <span
        className="absolute top-12 left-6 h-px w-[calc(100%-1.5rem)]"
        style={{ background: `linear-gradient(to right, ${color}99, ${color}1a)` }}
        aria-hidden
      />
      {!last && (
        <span
          className="absolute top-16 -bottom-6 left-[11px] w-0.5"
          style={{ background: `linear-gradient(to bottom, ${color}99, ${color}1a)` }}
          aria-hidden
        />
      )}
      <div className="absolute top-20 left-0 text-sm leading-relaxed font-semibold">
        <p style={{ color }}>{job.start}</p>
        <p className="mt-3 text-paper/60">{job.end}</p>
      </div>
    </div>
  )
}

function ExperienceCard({
  job,
  color,
  index,
  onExpand,
}: {
  job: Job
  color: string
  index: number
  onExpand: (img: LightboxImage) => void
}) {
  const current = job.end === 'Present'

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border p-5 transition-shadow duration-500 sm:p-7"
      style={{
        borderColor: `${color}40`,
        background: `radial-gradient(90% 120% at 100% 50%, ${color}1c 0%, transparent 55%), linear-gradient(135deg, ${color}12 0%, transparent 40%), #0a0d0c`,
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${color}73, 0 30px 80px -30px ${color}4d` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-6 right-0 hidden w-px lg:block"
        style={{ background: `linear-gradient(to bottom, transparent, ${color}b3, transparent)` }}
        aria-hidden
      />

      <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
        <div className="min-w-0">
          <header className="flex flex-wrap items-start gap-4">
            <CompanyLogo company={job.company} />
            <div className="min-w-0 flex-1">
              <h3 className="text-2xl leading-tight font-extrabold tracking-tight sm:text-[1.7rem]">
                {job.company}
              </h3>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-2.5 text-sm text-paper/65 sm:text-base">
                <span>{job.role}</span>
                <span className="text-paper/30">·</span>
                <span>{job.focus}</span>
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className="rounded-lg border px-3 py-1 text-xs font-bold whitespace-nowrap"
                style={{ color, borderColor: `${color}59`, background: `${color}10` }}
              >
                {job.start} — {job.end}
              </span>
              {current && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold"
                  style={{ color, borderColor: `${color}4d`, background: `${color}0d` }}
                >
                  <span className="relative flex size-1.5">
                    <span
                      className="absolute inset-0 animate-ping rounded-full opacity-75"
                      style={{ background: color }}
                    />
                    <span className="relative size-1.5 rounded-full" style={{ background: color }} />
                  </span>
                  Current
                </span>
              )}
            </div>
          </header>

          <p className="mt-5 text-[15px] leading-relaxed text-paper/70">{job.summary}</p>

          <ul className="mt-4 space-y-3">
            {job.highlights.map((h) => (
              <Highlight key={h} text={h} emphasis={job.emphasis} color={color} />
            ))}
          </ul>
        </div>

        <div className="order-first lg:order-none">
          <TiltedScreenshot
            src={job.cover}
            alt={`${job.company} product screenshot`}
            color={color}
            phoneFocus={COMPANY_BRAND[job.company]?.phoneFocus}
            onExpand={() => onExpand({ src: job.cover, name: job.company })}
          />
        </div>
      </div>

      <div className="relative mt-6 flex flex-wrap items-center gap-2 border-t border-paper/10 pt-5">
        <span className="mr-2 inline-flex items-center gap-2 text-sm font-semibold" style={{ color }}>
          <Code className="size-4" />
          Tech Stack
        </span>
        {job.stack.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center gap-1.5 rounded-lg border border-paper/12 bg-paper/[0.04] px-2.5 py-1.5 text-xs font-semibold text-paper/85"
          >
            <SkillIcon name={tech} />
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

export function ExperienceTimeline() {
  const [preview, setPreview] = useState<LightboxImage | null>(null)

  return (
    <>
      <div className="space-y-6">
        {experience.map((job, i) => {
          const color = COLORS[i % COLORS.length]
          return (
            <div key={job.company} className="grid gap-4 md:grid-cols-[92px_1fr]">
              <TimelineMarker job={job} color={color} last={i === experience.length - 1} />
              <ExperienceCard job={job} color={color} index={i} onExpand={setPreview} />
            </div>
          )
        })}
      </div>
      <ImageLightbox image={preview} onClose={() => setPreview(null)} />
    </>
  )
}
