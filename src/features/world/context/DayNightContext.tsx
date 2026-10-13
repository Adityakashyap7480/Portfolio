import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from 'react'
import { useExperience } from './ExperienceContext'

export type TimeOfDay = 'day' | 'night'

type DayNightValue = {
  timeOfDay: TimeOfDay
  toggleTimeOfDay: () => void
  /** 0 = full day, 1 = full night — eased by the scene each frame, a ref so it never re-renders React */
  nightBlend: MutableRefObject<number>
}

const DayNightContext = createContext<DayNightValue | null>(null)
const STORAGE_KEY = 'portfolio-time-of-day'

/** A manual pick wins for the session, otherwise follow the visitor's clock */
function initialTimeOfDay(): TimeOfDay {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved === 'day' || saved === 'night') return saved
  } catch {
    /* ignore */
  }
  const hour = new Date().getHours()
  return hour >= 19 || hour < 6 ? 'night' : 'day'
}

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  )
}

export function DayNightProvider({ children }: { children: ReactNode }) {
  const { mode } = useExperience()
  const [timeOfDay, setTimeOfDay] = useState(initialTimeOfDay)
  const nightBlend = useRef(timeOfDay === 'night' ? 1 : 0)

  const toggleTimeOfDay = useCallback(() => {
    const next: TimeOfDay = timeOfDay === 'night' ? 'day' : 'night'
    setTimeOfDay(next)
    try {
      sessionStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [timeOfDay])

  useEffect(() => {
    if (mode !== 'hub') return
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== 'KeyN' || e.repeat || e.ctrlKey || e.metaKey || e.altKey) return
      if (isTypingTarget(e.target)) return
      toggleTimeOfDay()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mode, toggleTimeOfDay])

  const value = useMemo(
    () => ({ timeOfDay, toggleTimeOfDay, nightBlend }),
    [timeOfDay, toggleTimeOfDay],
  )

  return <DayNightContext.Provider value={value}>{children}</DayNightContext.Provider>
}

export function useDayNight() {
  const ctx = useContext(DayNightContext)
  if (!ctx) throw new Error('useDayNight must be used within DayNightProvider')
  return ctx
}
