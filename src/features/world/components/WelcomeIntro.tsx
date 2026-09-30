import { useEffect, type ComponentType } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Compass, DoorOpen, Keyboard, MousePointer2, Sparkles } from 'lucide-react'
import portraitCutout from '../../../assets/portrait_cutout.webp'
import { profile } from '../../../shared/data/resume'
import { useExperience } from '../context/ExperienceContext'

type Tip = {
  label: string
  detail: string
  color: string
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  keys: string[]
}

const tips: Tip[] = [
  { label: 'Move', detail: 'Run around the world', color: '#c8f542', icon: Keyboard, keys: ['W', 'A', 'S', 'D'] },
  { label: 'Look', detail: 'Drag to look around', color: '#38bdf8', icon: MousePointer2, keys: ['Drag'] },
  { label: 'Explore', detail: 'Walk into glowing gates', color: '#a78bfa', icon: DoorOpen, keys: ['Gate'] },
  { label: 'Guide', detail: 'Get walked to any section', color: '#f59e0b', icon: Compass, keys: ['H'] },
]

function TipCard({ tip }: { tip: Tip }) {
  const Icon = tip.icon
  return (
    <motion.li
      className="group flex items-center gap-3 rounded-xl border border-paper/10 bg-paper/[0.04] p-3 text-left transition-colors duration-300 hover:border-(--tip) hover:bg-paper/[0.07]"
      style={{ ['--tip' as string]: `${tip.color}80` }}
      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
    >
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-lg border"
        style={{ color: tip.color, background: `${tip.color}1a`, borderColor: `${tip.color}40` }}
      >
        <Icon className="size-[18px]" strokeWidth={2.2} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-extrabold tracking-[0.18em] uppercase" style={{ color: tip.color }}>
            {tip.label}
          </span>
          <span className="flex gap-0.5">
            {tip.keys.map((k) => (
              <kbd
                key={k}
                className="min-w-[18px] rounded border border-paper/20 bg-paper/[0.06] px-1 py-px text-center font-sans text-[9px] font-bold text-paper/70 shadow-[inset_0_-1px_0_rgba(243,242,238,0.12)]"
              >
                {k}
              </kbd>
            ))}
          </span>
        </span>
        <span className="mt-0.5 block text-[13px] text-paper/65">{tip.detail}</span>
      </span>
    </motion.li>
  )
}

export function WelcomeIntro() {
  const { showWelcomeIntro, dismissWelcomeIntro } = useExperience()

  useEffect(() => {
    if (!showWelcomeIntro) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
        e.preventDefault()
        dismissWelcomeIntro()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showWelcomeIntro, dismissWelcomeIntro])

  return (
    <AnimatePresence>
      {showWelcomeIntro && (
        <motion.div
          className="pointer-events-auto fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-intro-title"
        >
          <motion.div
            className="absolute inset-0 bg-void/65 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismissWelcomeIntro}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,245,66,0.14),transparent_55%)]" />

          <motion.div
            className="relative z-10 my-auto w-full max-w-xl overflow-hidden rounded-3xl border border-paper/10 bg-gradient-to-b from-[#161a1f]/95 to-void/95 px-5 pt-8 pb-6 text-center text-paper shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:px-8 sm:pt-10"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent" />
            <span className="pointer-events-none absolute -top-24 left-1/2 size-56 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />

            <motion.div
              className="relative mx-auto w-fit"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 18 }}
            >
              <span className="block size-20 rounded-full bg-gradient-to-br from-accent via-[#4ade80] to-[#38bdf8] p-[2.5px] shadow-[0_0_40px_-8px_rgba(200,245,66,0.7)] sm:size-24">
                <span className="block size-full overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_35%,#6b4a2c_0%,#2a1f16_55%,#0d0f12_100%)]">
                  <img
                    src={portraitCutout}
                    alt={profile.name}
                    width={192}
                    height={192}
                    decoding="async"
                    className="size-full origin-top scale-[1.7] object-cover object-top"
                  />
                </span>
              </span>
              <span className="absolute right-1 bottom-1 flex size-4">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#4ade80]/70" />
                <span className="relative size-4 rounded-full border-2 border-[#161a1f] bg-[#4ade80]" />
              </span>
            </motion.div>

            <motion.p
              className="mx-auto mt-5 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-bold tracking-[0.24em] text-accent uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
            >
              <Sparkles className="size-3" strokeWidth={2.5} />
              Interactive 3D experience
            </motion.p>

            <motion.h1
              id="welcome-intro-title"
              className="mt-4 text-[2.1rem] leading-[1.05] font-extrabold tracking-tight sm:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.5 }}
            >
              <span className="block text-base font-semibold tracking-normal text-paper/55 sm:text-lg">
                Welcome to
              </span>
              <span className="mt-1 block">{profile.name}&apos;s</span>
              <span className="inline-block bg-gradient-to-r from-accent via-[#86efac] to-[#38bdf8] bg-clip-text pb-[0.12em] text-transparent">
                Portfolio
              </span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-paper/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="font-semibold text-paper/85">{profile.role}</span>
              <span className="text-paper/25">•</span>
              <span>{profile.experience}</span>
              <span className="text-paper/25">•</span>
              <span>Open to opportunities</span>
            </motion.p>

            <motion.ul
              className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } } }}
            >
              {tips.map((tip) => (
                <TipCard key={tip.label} tip={tip} />
              ))}
            </motion.ul>

            <motion.div
              className="mt-7 flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
            >
              <button
                type="button"
                onClick={dismissWelcomeIntro}
                className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent px-8 py-3.5 text-base font-extrabold tracking-wide text-accent-ink shadow-[0_12px_40px_-10px_rgba(200,245,66,0.75)] transition hover:shadow-[0_16px_50px_-8px_rgba(200,245,66,0.95)] sm:w-auto sm:min-w-64"
              >
                <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 blur-md transition-[left] duration-700 group-hover:left-[120%]" />
                <span className="relative">Enter experience</span>
                <ArrowRight className="relative size-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.6} />
              </button>
              <button
                type="button"
                onClick={dismissWelcomeIntro}
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-paper/45 transition hover:text-paper/80"
              >
                or press
                <kbd className="rounded border border-paper/20 bg-paper/[0.06] px-1.5 py-px font-sans text-[10px] font-bold text-paper/70">
                  Enter ↵
                </kbd>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
