import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GATES, sectionFromPath, type SectionId } from '../data/gates'

type Mode = 'hub' | 'entering' | 'inside' | 'exiting'

type ExperienceContextValue = {
  mode: Mode
  activeSection: SectionId | null
  transitionLabel: string | null
  mobileKeys: Record<string, boolean>
  setMobileKey: (key: string, pressed: boolean) => void
  requestEnter: (section: SectionId) => void
  completeEnter: () => void
  requestExit: () => void
  completeExit: () => void
  canInteract: boolean
  lookYaw: number
  lookPitch: number
  setLook: (yaw: number, pitch: number) => void
  addLookDelta: (dyaw: number, dpitch: number) => void
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null)

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState<Mode>('hub')
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)
  const [transitionLabel, setTransitionLabel] = useState<string | null>(null)
  const [mobileKeys, setMobileKeys] = useState<Record<string, boolean>>({})
  const [lookYaw, setLookYaw] = useState(0)
  const [lookPitch, setLookPitch] = useState(0.28)
  const lock = useRef(false)
  const skipUrlSync = useRef(false)

  const setMobileKey = useCallback((key: string, pressed: boolean) => {
    setMobileKeys((prev) => {
      if (Boolean(prev[key]) === pressed) return prev
      return { ...prev, [key]: pressed }
    })
  }, [])

  const setLook = useCallback((yaw: number, pitch: number) => {
    setLookYaw(yaw)
    setLookPitch(Math.max(0.12, Math.min(0.55, pitch)))
  }, [])

  const addLookDelta = useCallback((dyaw: number, dpitch: number) => {
    setLookYaw((y) => y + dyaw)
    setLookPitch((p) => Math.max(0.12, Math.min(0.55, p + dpitch)))
  }, [])

  const requestEnter = useCallback(
    (section: SectionId) => {
      if (lock.current) return
      const gate = GATES.find((g) => g.id === section)
      if (!gate) return
      lock.current = true
      skipUrlSync.current = true
      setTransitionLabel(gate.label)
      setActiveSection(section)
      setMode('entering')
      navigate(gate.path)
    },
    [navigate],
  )

  const completeEnter = useCallback(() => {
    setMode('inside')
    setTransitionLabel(null)
    lock.current = false
    skipUrlSync.current = false
  }, [])

  const requestExit = useCallback(() => {
    if (lock.current || !activeSection) return
    lock.current = true
    skipUrlSync.current = true
    setTransitionLabel('RETURNING')
    setMode('exiting')
    navigate('/')
  }, [activeSection, navigate])

  const completeExit = useCallback(() => {
    setMode('hub')
    setActiveSection(null)
    setTransitionLabel(null)
    lock.current = false
    skipUrlSync.current = false
  }, [])

  // Sync deep links: /experience opens that section
  useEffect(() => {
    if (skipUrlSync.current) return
    const section = sectionFromPath(location.pathname)

    if (!section) {
      if (mode === 'inside' || mode === 'entering') {
        lock.current = true
        setTransitionLabel('RETURNING')
        setMode('exiting')
      }
      return
    }

    if (activeSection === section && (mode === 'inside' || mode === 'entering')) return

    const gate = GATES.find((g) => g.id === section)
    lock.current = true
    setTransitionLabel(gate?.label ?? section.toUpperCase())
    setActiveSection(section)
    setMode('entering')
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  const value = useMemo(
    () => ({
      mode,
      activeSection,
      transitionLabel,
      mobileKeys,
      setMobileKey,
      requestEnter,
      completeEnter,
      requestExit,
      completeExit,
      canInteract: mode === 'hub' || mode === 'inside',
      lookYaw,
      lookPitch,
      setLook,
      addLookDelta,
    }),
    [
      mode,
      activeSection,
      transitionLabel,
      mobileKeys,
      setMobileKey,
      requestEnter,
      completeEnter,
      requestExit,
      completeExit,
      lookYaw,
      lookPitch,
      setLook,
      addLookDelta,
    ],
  )

  return (
    <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
  )
}

export function useExperience() {
  const ctx = useContext(ExperienceContext)
  if (!ctx) throw new Error('useExperience must be used within ExperienceProvider')
  return ctx
}
