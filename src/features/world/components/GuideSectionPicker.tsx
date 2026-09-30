import { motion } from 'framer-motion'
import {
  ArrowRight,
  Briefcase,
  ChevronRight,
  Code,
  Crosshair,
  FolderOpen,
  Mail,
  User,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useEffect } from 'react'
import portrait from '../../../assets/portrait_cutout.webp'
import { profile } from '../../../shared/data/resume'
import { GATES, type SectionId } from '../data/gates'
import { PortraitBackdrop } from './shared/PortraitBackdrop'

const SECTION_META: Record<SectionId, { icon: LucideIcon; blurb: string }> = {
  about: { icon: User, blurb: 'Know more about me' },
  skills: { icon: Code, blurb: 'Technologies I work with' },
  experience: { icon: Briefcase, blurb: 'My professional journey' },
  projects: { icon: FolderOpen, blurb: 'Some of my best work' },
  contact: { icon: Mail, blurb: "Let's connect" },
}

const DOTS = {
  backgroundImage: 'radial-gradient(rgba(243,242,238,0.22) 1px, transparent 1.2px)',
  backgroundSize: '9px 9px',
}

type GuideSectionPickerProps = {
  onSelect: (section: SectionId) => void
  onClose: () => void
}

export function GuideSectionPicker({ onSelect, onClose }: GuideSectionPickerProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      className="relative z-10 grid max-h-[92vh] w-full max-w-[960px] overflow-y-auto rounded-2xl border border-paper/10 bg-[linear-gradient(135deg,#0d1117_0%,#07090c_60%,#0a0f0a_100%)] text-paper shadow-[0_40px_120px_-20px_rgba(0,0,0,0.85)] md:grid-cols-[1.4fr_1fr] md:overflow-hidden"
      initial={{ scale: 0.94, y: 18, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.96, y: 10, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
    >
      <div
        className="pointer-events-none absolute -top-32 -left-24 size-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-30 flex size-10 items-center justify-center rounded-lg border border-paper/20 bg-void/40 backdrop-blur-md transition hover:border-accent hover:text-accent"
        aria-label="Close"
      >
        <X className="size-4" />
      </button>

      {/* Left — section picker */}
      <div className="relative p-6 sm:p-9">
        <div className="absolute top-8 right-8 hidden h-10 w-14 md:block" style={DOTS} aria-hidden />
        <div className="absolute bottom-6 left-6 h-10 w-14" style={DOTS} aria-hidden />

        <div className="mb-5 flex items-center gap-3 md:hidden">
          <img
            src={portrait}
            alt={profile.name}
            className="size-12 rounded-full border border-accent/40 bg-gradient-to-b from-[#2a2118] to-void object-cover object-top"
          />
          <div>
            <p className="text-sm font-bold">{profile.name}</p>
            <p className="text-xs text-paper/55">{profile.role}</p>
          </div>
        </div>

        <p className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] text-accent uppercase">
          Guide
          <span className="h-px w-8 bg-accent/70" />
        </p>

        <h2 className="mt-3 text-3xl leading-[1.05] font-extrabold tracking-tight sm:text-[2.6rem]">
          Where would you like
          <br />
          <span className="inline-flex items-center gap-3">
            <span className="-mb-[0.18em] inline-block bg-gradient-to-r from-accent to-[#4ade80] bg-clip-text pb-[0.18em] leading-[1.15] text-transparent">
              to go?
            </span>
            <span className="flex size-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
              <ArrowRight className="size-4" />
            </span>
          </span>
        </h2>

        <p className="mt-3 text-base text-paper/60">Select a section — I&apos;ll lead you there.</p>

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {GATES.map((gate, i) => {
            const { icon: Icon, blurb } = SECTION_META[gate.id]
            const isLastOdd = GATES.length % 2 === 1 && i === GATES.length - 1
            return (
              <motion.button
                key={gate.id}
                type="button"
                onClick={() => onSelect(gate.id)}
                className={`group cursor-pointer relative flex items-center gap-4 overflow-hidden rounded-xl border border-paper/10 bg-paper/[0.03] py-4 pr-4 pl-5 text-left transition-[border-color,background-color,box-shadow] duration-300 hover:bg-paper/[0.06] ${
                  isLastOdd ? 'sm:col-span-2 sm:w-3/4' : ''
                }`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.06, type: 'spring', stiffness: 300, damping: 26 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className="absolute inset-y-0 left-0 w-[3px]"
                  style={{ background: gate.color, boxShadow: `0 0 14px ${gate.color}` }}
                />
                <span
                  className="pointer-events-none absolute inset-0 rounded-xl border opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    borderColor: `${gate.color}80`,
                    boxShadow: `inset 0 0 30px ${gate.color}14, 0 10px 30px -12px ${gate.color}66`,
                  }}
                />
                <span
                  className="flex size-12 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-110"
                  style={{
                    color: gate.color,
                    background: `linear-gradient(135deg, ${gate.color}2e, ${gate.color}0d)`,
                    borderColor: `${gate.color}59`,
                  }}
                >
                  <Icon className="size-5" strokeWidth={2.2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-extrabold tracking-wide uppercase">
                    {gate.label}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-paper/55">{blurb}</span>
                </span>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-paper/[0.07] text-paper/70 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-paper/15 group-hover:text-paper">
                  <ChevronRight className="size-4" />
                </span>
              </motion.button>
            )
          })}
        </div>

        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="group cursor-pointer flex items-center gap-2.5 rounded-full border border-paper/15 bg-paper/[0.03] px-5 py-2.5 text-xs font-semibold text-paper/65 transition hover:border-paper/35 hover:text-paper"
          >
            <Crosshair className="size-4" />
            Skip — I&apos;ll explore myself
            <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Right — portrait panel */}
      <div className="relative hidden min-h-[560px] md:block">
        <PortraitBackdrop />

        <motion.div
          className="absolute top-20 right-6 z-10 -rotate-[8deg] text-right font-hand text-[1.7rem] leading-[1.05] font-bold text-paper drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          Building
          <br />
          Ideas
          <br />
          Into
          <br />
          Real Products
          <svg viewBox="0 0 120 12" className="mt-1 ml-auto h-3 w-24 text-accent" aria-hidden>
            <path
              d="M2 8 C 30 2, 70 2, 118 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute right-8 bottom-8 left-[22%] z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <span className="block font-serif text-6xl leading-[0.6] font-black text-paper">&ldquo;</span>
          <p className="mt-3 text-xl leading-snug font-semibold text-paper">
            Code. Build. Learn.
            <br />
            Grow. Repeat.
          </p>
          <span className="mt-3 block h-[3px] w-14 rounded-full bg-accent shadow-[0_0_12px_#c8f542]" />
          <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-paper/60">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#4ade80] opacity-75" />
              <span className="relative size-2 rounded-full bg-[#4ade80]" />
            </span>
            {profile.name} · {profile.role} · {profile.experience}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
