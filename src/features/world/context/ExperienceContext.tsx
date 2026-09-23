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
import { useLocation, useNavigate } from 'react-router-dom'
import { GATES, sectionFromPath, type SectionId } from '../data/gates'

type Mode = 'hub' | 'entering' | 'inside' | 'exiting'
export type GuidePhase = 'idle' | 'summoning' | 'asking' | 'leading'

type CharacterPose = { x: number; z: number; facing: number }

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
  characterPose: MutableRefObject<CharacterPose>
  /** Guide / Help assistant */
  guidePhase: GuidePhase
  guideTarget: SectionId | null
  showFirstVisitPrompt: boolean
  showWelcomeIntro: boolean
  dismissWelcomeIntro: () => void
  startGuide: () => void
  cancelGuide: () => void
  selectGuideSection: (section: SectionId) => void
  onHelperReachedPlayer: () => void
  onHelperReachedGate: () => void
  dismissFirstVisitPrompt: () => void
  acceptFirstVisitGuide: () => void
  guideLocksPlayer: boolean
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null)
const FIRST_VISIT_KEY = 'portfolio-guide-prompt-seen'
const WELCOME_INTRO_KEY = 'portfolio-welcome-intro-seen'
const WELCOME_INTRO_TTL_MS = 60 * 60 * 1000 // 1 hour

function isWelcomeIntroFresh(): boolean {
  try {
    const raw = localStorage.getItem(WELCOME_INTRO_KEY)
    if (!raw) return false
    const seenAt = Number(raw)
    if (!Number.isFinite(seenAt)) {
      localStorage.removeItem(WELCOME_INTRO_KEY)
      return false
    }
    if (Date.now() - seenAt >= WELCOME_INTRO_TTL_MS) {
      localStorage.removeItem(WELCOME_INTRO_KEY)
      return false
    }
    return true
  } catch {
    return false
  }
}

function markWelcomeIntroSeen() {
  try {
    localStorage.setItem(WELCOME_INTRO_KEY, String(Date.now()))
  } catch {
    /* ignore */
  }
}

function scheduleGuidePrompt(setShow: (v: boolean) => void, delayMs: number) {
  try {
    if (localStorage.getItem(FIRST_VISIT_KEY)) return () => {}
  } catch {
    /* ignore */
  }
  const t = window.setTimeout(() => setShow(true), delayMs)
  return () => window.clearTimeout(t)
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState<Mode>('hub')
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)
  const [transitionLabel, setTransitionLabel] = useState<string | null>(null)
  const [mobileKeys, setMobileKeys] = useState<Record<string, boolean>>({})
  const [lookYaw, setLookYaw] = useState(0)
  const [lookPitch, setLookPitch] = useState(0.28)
  const [guidePhase, setGuidePhase] = useState<GuidePhase>('idle')
  const [guideTarget, setGuideTarget] = useState<SectionId | null>(null)
  const [showFirstVisitPrompt, setShowFirstVisitPrompt] = useState(false)
  const [showWelcomeIntro, setShowWelcomeIntro] = useState(false)
  const lock = useRef(false)
  const skipUrlSync = useRef(false)
  const welcomeDismissed = useRef(false)
  const characterPose = useRef<CharacterPose>({ x: 0, z: 6, facing: 0 })

  useEffect(() => {
    let shouldShowWelcome = true
    try {
      if (isWelcomeIntroFresh()) shouldShowWelcome = false
    } catch {
      /* ignore */
    }
    if (sectionFromPath(location.pathname)) shouldShowWelcome = false

    setShowWelcomeIntro(shouldShowWelcome)

    if (shouldShowWelcome) return
    return scheduleGuidePrompt(setShowFirstVisitPrompt, 2200)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
      setGuidePhase('idle')
      setGuideTarget(null)
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

  const cancelGuide = useCallback(() => {
    setGuidePhase('idle')
    setGuideTarget(null)
  }, [])

  const startGuide = useCallback(() => {
    if (mode !== 'hub') return
    setShowFirstVisitPrompt(false)
    setGuideTarget(null)
    setGuidePhase('summoning')
  }, [mode])

  const selectGuideSection = useCallback((section: SectionId) => {
    setGuideTarget(section)
    setGuidePhase('leading')
  }, [])

  const onHelperReachedPlayer = useCallback(() => {
    setGuidePhase((p) => (p === 'summoning' ? 'asking' : p))
  }, [])

  const onHelperReachedGate = useCallback(() => {
    setGuideTarget((target) => {
      if (target) {
        const section = target
        queueMicrotask(() => {
          setGuidePhase('idle')
          requestEnter(section)
        })
      }
      return null
    })
  }, [requestEnter])

  const dismissFirstVisitPrompt = useCallback(() => {
    setShowFirstVisitPrompt(false)
    try {
      localStorage.setItem(FIRST_VISIT_KEY, '1')
    } catch {
      /* ignore */
    }
  }, [])

  const dismissWelcomeIntro = useCallback(() => {
    if (welcomeDismissed.current) return
    welcomeDismissed.current = true
    setShowWelcomeIntro(false)
    markWelcomeIntroSeen()
    scheduleGuidePrompt(setShowFirstVisitPrompt, 1400)
  }, [])

  const acceptFirstVisitGuide = useCallback(() => {
    dismissFirstVisitPrompt()
    startGuide()
  }, [dismissFirstVisitPrompt, startGuide])

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
    setGuidePhase('idle')
    setGuideTarget(null)
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  const guideLocksPlayer = guidePhase === 'leading' || guidePhase === 'summoning'

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
      canInteract:
        (mode === 'hub' || mode === 'inside') && !guideLocksPlayer && !showWelcomeIntro,
      lookYaw,
      lookPitch,
      setLook,
      addLookDelta,
      characterPose,
      guidePhase,
      guideTarget,
      showFirstVisitPrompt,
      showWelcomeIntro,
      dismissWelcomeIntro,
      startGuide,
      cancelGuide,
      selectGuideSection,
      onHelperReachedPlayer,
      onHelperReachedGate,
      dismissFirstVisitPrompt,
      acceptFirstVisitGuide,
      guideLocksPlayer,
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
      guidePhase,
      guideTarget,
      showFirstVisitPrompt,
      showWelcomeIntro,
      dismissWelcomeIntro,
      startGuide,
      cancelGuide,
      selectGuideSection,
      onHelperReachedPlayer,
      onHelperReachedGate,
      dismissFirstVisitPrompt,
      acceptFirstVisitGuide,
      guideLocksPlayer,
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
