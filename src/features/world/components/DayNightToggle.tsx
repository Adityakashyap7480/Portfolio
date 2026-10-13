import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useDayNight } from '../context/DayNightContext'

export function DayNightToggle() {
  const { timeOfDay, toggleTimeOfDay } = useDayNight()
  const night = timeOfDay === 'night'
  const label = night ? 'Switch to day (N)' : 'Switch to night (N)'

  return (
    <button
      type="button"
      onClick={toggleTimeOfDay}
      aria-label={label}
      aria-pressed={night}
      title={label}
      className={`group inline-flex cursor-pointer items-center gap-2 rounded-xl border bg-void/80 px-3 py-2.5 text-sm font-bold text-paper shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] transition hover:bg-void ${
        night
          ? 'border-[#b9c8ff]/35 hover:border-[#b9c8ff]/70 hover:shadow-[0_0_24px_-6px_rgba(185,200,255,0.6)]'
          : 'border-[#ffc861]/35 hover:border-[#ffc861]/70 hover:shadow-[0_0_24px_-6px_rgba(255,200,97,0.6)]'
      }`}
    >
      <span className="relative size-5">
        <AnimatePresence initial={false}>
          <motion.span
            key={timeOfDay}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ rotate: -90, scale: 0.3, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.3, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {night ? (
              <Moon className="size-[18px] text-[#b9c8ff]" fill="currentColor" strokeWidth={1.8} />
            ) : (
              <Sun className="size-[18px] text-[#ffc861]" strokeWidth={2.4} />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="hidden sm:inline">{night ? 'Night' : 'Day'}</span>
    </button>
  )
}
