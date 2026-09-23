import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../../../shared/data/resume'
import { useExperience } from '../context/ExperienceContext'

const tips = [
  { label: 'Move', detail: 'WASD to run around the world' },
  { label: 'Look', detail: 'Drag to look around' },
  { label: 'Explore', detail: 'Walk into glowing gates' },
  { label: 'Guide', detail: 'Tap Help anytime for a personal guide' },
]

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
          className="pointer-events-auto fixed inset-0 z-[70] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-intro-title"
        >
          <motion.div
            className="absolute inset-0 bg-void/78"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismissWelcomeIntro}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,245,66,0.18),transparent_55%)]" />

          <motion.div
            className="relative z-10 w-full max-w-lg text-center text-paper"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.p
              className="text-[11px] font-semibold tracking-[0.28em] text-accent uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
            >
              Interactive experience
            </motion.p>

            <motion.p
              className="mt-3 text-lg font-semibold tracking-tight text-paper/75 sm:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
            >
              Welcome to
            </motion.p>

            <motion.h1
              id="welcome-intro-title"
              className="mt-1 text-4xl font-extrabold tracking-tight sm:text-6xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
            >
              {profile.name}&apos;s portfolio
            </motion.h1>

            <motion.p
              className="mx-auto mt-3 max-w-md text-sm text-paper/60 sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              {profile.role} — explore in 3D, walk through gates, and use Help for a guide.
            </motion.p>

            <motion.ul
              className="mx-auto mt-8 grid max-w-md grid-cols-1 gap-2 text-left sm:grid-cols-2"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } },
              }}
            >
              {tips.map((tip) => (
                <motion.li
                  key={tip.label}
                  className="border border-paper/12 bg-paper/5 px-3 py-2.5 backdrop-blur-sm"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <p className="text-xs font-bold tracking-[0.18em] text-accent uppercase">
                    {tip.label}
                  </p>
                  <p className="mt-0.5 text-sm text-paper/70">{tip.detail}</p>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-8 flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <button
                type="button"
                onClick={dismissWelcomeIntro}
                className="bg-accent px-8 py-3.5 text-base font-extrabold tracking-wide text-accent-ink transition hover:brightness-110"
              >
                Enter experience
              </button>
              <button
                type="button"
                onClick={dismissWelcomeIntro}
                className="text-sm font-semibold tracking-wide text-paper/45 transition hover:text-paper/80"
              >
                Skip · press Enter
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
