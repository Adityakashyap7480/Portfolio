import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Award,
  Brain,
  Briefcase,
  ChevronDown,
  Download,
  Globe,
  GraduationCap,
  Layers,
  MapPin,
  Rocket,
  Server,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import portrait from '../../../../assets/portrait_cutout.webp'
import { certifications, education, positioning, profile } from '../../../../shared/data/resume'

const STAT_STYLE: { color: string; icon: LucideIcon }[] = [
  { color: '#c8f542', icon: Briefcase },
  { color: '#a78bfa', icon: Rocket },
  { color: '#f59e0b', icon: Layers },
]

const focusAreas: { title: string; detail: string; color: string; icon: LucideIcon }[] = [
  { title: 'Web', detail: 'React, Next.js & Angular frontends', color: '#60a5fa', icon: Globe },
  { title: 'Mobile', detail: 'React Native (Expo) apps', color: '#4ade80', icon: Smartphone },
  { title: 'Backend', detail: 'NestJS, Node.js, Django & SQL', color: '#f5b945', icon: Server },
  { title: 'AI / GenAI', detail: 'OpenAI APIs & prompt engineering', color: '#a78bfa', icon: Brain },
]

function PortraitCard() {
  return (
    <div className="relative h-[360px] overflow-hidden rounded-2xl border border-paper/10 md:h-full md:min-h-[520px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#5a4028_0%,#2a1f16_38%,#0d0f12_75%)]" />
      <div className="absolute top-[8%] left-1/2 size-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,190,120,0.35)_0%,rgba(245,170,90,0.1)_45%,transparent_70%)]" />
      <div className="absolute top-[10%] right-[8%] size-20 rounded-full bg-[#f5b56b]/20 blur-2xl" />
      <div className="absolute top-[40%] left-[10%] size-14 rounded-full bg-[#f5d7a1]/15 blur-xl" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(rgba(243,242,238,0.9) 1px, transparent 1.2px)',
          backgroundSize: '14px 14px',
        }}
      />

      <motion.img
        src={portrait}
        alt={`${profile.name} — ${profile.role}`}
        className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
        style={{
          maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#07090c] via-[#07090c]/75 to-transparent" />

      <motion.span
        className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-[#4ade80]/40 bg-void/70 px-3 py-1.5 text-[11px] font-bold text-paper/90 backdrop-blur-md"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#4ade80] opacity-75" />
          <span className="relative size-2 rounded-full bg-[#4ade80]" />
        </span>
        Available for work
      </motion.span>

      <motion.span
        className="absolute top-4 right-4 flex flex-col items-center rounded-xl border border-accent/40 bg-void/70 px-3 py-2 text-center shadow-[0_0_30px_-10px_rgba(200,245,66,0.6)] backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45, type: 'spring', stiffness: 260, damping: 18 }}
      >
        <span className="text-xl leading-none font-extrabold text-accent">{profile.experience.split(' ')[0]}</span>
        <span className="mt-0.5 text-[9px] font-bold tracking-[0.18em] text-paper/60 uppercase">Years</span>
      </motion.span>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-2xl font-extrabold tracking-tight text-paper">{profile.name}</p>
        <p className="mt-0.5 bg-gradient-to-r from-accent to-[#4ade80] bg-clip-text text-xs font-bold tracking-[0.2em] text-transparent uppercase">
          {profile.role}
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-paper/60">
          <MapPin className="size-3.5 text-accent" />
          {profile.location}
        </p>
      </div>
      <span className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
    </div>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.24em] text-paper/55 uppercase">
      {children}
      <span className="h-px flex-1 bg-gradient-to-r from-paper/15 to-transparent" />
    </p>
  )
}

export function AboutShowcase() {
  const [storyOpen, setStoryOpen] = useState(false)
  const [firstStory, ...moreStory] = profile.story

  return (
    <div className="relative grid gap-6 p-5 sm:p-7 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] md:gap-8 lg:p-9">
      <div
        className="pointer-events-none absolute -top-32 right-0 size-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <aside className="relative flex flex-col gap-3 md:sticky md:top-7 md:self-start lg:top-9">
        <PortraitCard />
        <div className="grid grid-cols-2 gap-2">
          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-3 py-3 text-sm font-extrabold text-accent-ink shadow-[0_10px_30px_-12px_rgba(200,245,66,0.8)] transition hover:brightness-110"
          >
            <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
            Resume
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#38bdf8]/40 bg-[#38bdf8]/[0.08] px-3 py-3 text-sm font-bold text-paper transition hover:border-[#38bdf8] hover:bg-[#38bdf8] hover:text-void"
          >
            LinkedIn
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </aside>

      <div className="relative min-w-0 space-y-7">
        <div className="pr-12">
          <p className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] text-paper/70 uppercase">
            <span className="size-2 rounded-full bg-accent shadow-[0_0_8px_#c8f542]" />
            Get to know me
            <span className="h-px w-8 bg-paper/40" />
          </p>
          <h2 id="section-modal-title" className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            About{' '}
            <span className="bg-gradient-to-r from-accent to-[#4ade80] bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper/80 sm:text-xl">
            {profile.positioning}
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {positioning.map((stat, i) => {
            const { color, icon: Icon } = STAT_STYLE[i % STAT_STYLE.length]
            return (
              <motion.li
                key={stat.label}
                className="relative overflow-hidden rounded-2xl border p-4"
                style={{
                  borderColor: `${color}40`,
                  background: `linear-gradient(145deg, ${color}14 0%, rgba(255,255,255,0.02) 70%)`,
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
              >
                <span
                  className="pointer-events-none absolute -top-8 -right-8 size-20 rounded-full blur-2xl"
                  style={{ background: `${color}33` }}
                />
                <Icon className="relative size-5" style={{ color }} />
                <p className="relative mt-3 text-3xl leading-none font-extrabold text-paper">
                  {stat.value}
                  <span style={{ color }}>{stat.suffix}</span>
                </p>
                <p className="relative mt-1.5 text-sm font-bold text-paper/85">{stat.label}</p>
                <p className="relative mt-0.5 text-xs leading-snug text-paper/45">{stat.detail}</p>
              </motion.li>
            )
          })}
        </ul>

        <div>
          <SectionLabel>What I do</SectionLabel>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {focusAreas.map((area, i) => {
              const Icon = area.icon
              return (
                <motion.li
                  key={area.title}
                  className="group flex items-center gap-3 rounded-xl border border-paper/10 bg-paper/[0.03] p-3 transition-colors duration-300 hover:border-(--area) hover:bg-paper/[0.06]"
                  style={{ ['--area' as string]: `${area.color}80` }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                >
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105"
                    style={{
                      color: area.color,
                      borderColor: `${area.color}50`,
                      background: `linear-gradient(135deg, ${area.color}30, ${area.color}08)`,
                    }}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base font-bold text-paper">{area.title}</span>
                    <span className="block text-sm text-paper/55">{area.detail}</span>
                  </span>
                </motion.li>
              )
            })}
          </ul>
        </div>

        <div>
          <SectionLabel>My story</SectionLabel>
          <div className="relative mt-3 rounded-2xl border border-paper/10 bg-paper/[0.025] p-5">
            <span className="absolute top-5 bottom-5 left-0 w-[3px] rounded-full bg-gradient-to-b from-accent via-[#4ade80] to-transparent" />
            <p className="text-base leading-relaxed text-paper/75">{firstStory}</p>
            <AnimatePresence initial={false}>
              {storyOpen && (
                <motion.div
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {moreStory.map((p) => (
                    <p key={p} className="mt-4 text-base leading-relaxed text-paper/75">
                      {p}
                    </p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            {moreStory.length > 0 && (
              <button
                type="button"
                onClick={() => setStoryOpen((o) => !o)}
                aria-expanded={storyOpen}
                className="mt-3 inline-flex cursor-pointer items-center gap-1 text-sm font-bold text-accent transition hover:brightness-125"
              >
                {storyOpen ? 'Show less' : 'Read more'}
                <ChevronDown className={`size-4 transition-transform duration-300 ${storyOpen ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        </div>

        <div>
          <SectionLabel>Education &amp; Certification</SectionLabel>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              ...education.map((e) => ({
                key: e.school,
                period: e.period,
                title: e.school,
                detail: e.degree,
                color: '#38bdf8',
                icon: GraduationCap,
                tag: 'Education',
              })),
              ...certifications.map((c) => ({
                key: c.title,
                period: c.period,
                title: c.org,
                detail: c.title,
                color: '#f59e0b',
                icon: Award,
                tag: 'Certification',
              })),
            ].map((item) => {
              const Icon = item.icon
              return (
                <li
                  key={item.key}
                  className="relative flex gap-3 overflow-hidden rounded-2xl border p-4"
                  style={{
                    borderColor: `${item.color}40`,
                    background: `linear-gradient(145deg, ${item.color}12 0%, rgba(255,255,255,0.02) 70%)`,
                  }}
                >
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl border"
                    style={{ color: item.color, borderColor: `${item.color}50`, background: `${item.color}1a` }}
                  >
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="text-[10px] font-bold tracking-[0.2em] uppercase"
                        style={{ color: item.color }}
                      >
                        {item.tag}
                      </span>
                      <span className="rounded-full border border-paper/15 px-2 py-px text-[10px] font-semibold text-paper/55">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-1 text-base leading-snug font-bold text-paper">{item.title}</p>
                    <p className="mt-0.5 text-sm text-paper/60">{item.detail}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
