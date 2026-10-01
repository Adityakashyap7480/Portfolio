import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useExperience } from '../context/ExperienceContext'
import { GATES, type SectionId } from '../data/gates'

const HUB_COLOR = '#c8f542'

const taglines: Record<SectionId, string> = {
  about: 'The person behind the code',
  skills: 'Tools & technologies I build with',
  experience: 'Where I have made an impact',
  projects: 'Products I have designed & shipped',
  contact: "Let's build something together",
}

type Phase = 'idle' | 'covering' | 'swapping' | 'revealing'

type Snapshot = { exiting: boolean; gateIndex: number; label: string | null }

/**
 * Portal wipe between the world and a section.
 * Only transform/opacity are animated so the compositor can run it smoothly,
 * and the section is swapped in while the screen is fully covered.
 */
export function PortalTransition() {
  const { mode, activeSection, transitionLabel, completeEnter, completeExit, finishTransition } =
    useExperience()
  const root = useRef<HTMLDivElement>(null)
  const circle = useRef<HTMLDivElement>(null)
  const decor = useRef<HTMLDivElement>(null)
  const rings = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const phase = useRef<Phase>('idle')
  const timeline = useRef<gsap.core.Timeline | null>(null)
  const [snap, setSnap] = useState<Snapshot | null>(null)

  const actions = useRef({ completeEnter, completeExit, finishTransition })
  useLayoutEffect(() => {
    actions.current = { completeEnter, completeExit, finishTransition }
  }, [completeEnter, completeExit, finishTransition])

  useEffect(() => () => void timeline.current?.kill(), [])

  // 1. Cover the screen, then swap the view underneath
  useEffect(() => {
    if (mode !== 'entering' && mode !== 'exiting') return
    if (phase.current !== 'idle') return
    if (!root.current || !circle.current || !decor.current || !rings.current || !content.current) return

    const exiting = mode === 'exiting'
    setSnap({
      exiting,
      gateIndex: GATES.findIndex((g) => g.id === activeSection),
      label: transitionLabel,
    })
    phase.current = 'covering'

    timeline.current?.kill()
    timeline.current = gsap
      .timeline()
      .set(root.current, { autoAlpha: 1 })
      .set(circle.current, { xPercent: -50, yPercent: -50, scale: 0 })
      .set([decor.current, rings.current, content.current], { opacity: 0 })
      .to(circle.current, { scale: 1, duration: 0.55, ease: 'power2.in' })
      .to(decor.current, { opacity: 1, duration: 0.25 }, '-=0.1')
      .call(() => {
        phase.current = 'swapping'
        if (exiting) actions.current.completeExit()
        else actions.current.completeEnter()
      })
  }, [mode]) // eslint-disable-line react-hooks/exhaustive-deps

  // 2. Once React has committed and painted the new view, reveal it
  useEffect(() => {
    if (phase.current !== 'swapping') return
    if (mode !== 'inside' && mode !== 'hub') return
    if (!root.current || !circle.current || !decor.current || !rings.current || !content.current || !bar.current)
      return

    const el = {
      root: root.current,
      circle: circle.current,
      decor: decor.current,
      rings: rings.current,
      content: content.current,
      bar: bar.current,
    }
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        phase.current = 'revealing'
        timeline.current?.kill()
        timeline.current = gsap
          .timeline({
            onComplete: () => {
              gsap.set(el.root, { autoAlpha: 0 })
              phase.current = 'idle'
              actions.current.finishTransition()
            },
          })
          .set(el.rings, { opacity: 1 })
          .fromTo(
            el.rings.children,
            { scale: 0.3, opacity: 0.8 },
            { scale: 1.5, opacity: 0, duration: 1, stagger: 0.12, ease: 'power2.out' },
            0,
          )
          .fromTo(
            el.content,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
            0,
          )
          .fromTo(el.bar, { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: 'power1.inOut' }, 0.2)
          .to(el.content, { opacity: 0, y: -14, duration: 0.22, ease: 'power1.in' }, 0.85)
          .to([el.decor, el.rings], { opacity: 0, duration: 0.25 }, 0.95)
          .to(el.circle, { scale: 0, duration: 0.55, ease: 'power2.inOut' }, 0.95)
      })
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [mode])

  const exiting = snap?.exiting ?? false
  const gate = snap && snap.gateIndex >= 0 ? GATES[snap.gateIndex] : null
  const color = exiting || !gate ? HUB_COLOR : gate.color
  const eyebrow = exiting ? 'Returning to' : 'Entering'
  const title = exiting ? 'The World' : (snap?.label ?? gate?.label ?? '')
  const meta = exiting ? 'Back to the hub' : gate ? taglines[gate.id] : ''

  return (
    <div
      ref={root}
      className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
      style={{ opacity: 0, visibility: 'hidden' }}
      aria-hidden
    >
      <div
        ref={circle}
        className="absolute top-1/2 left-1/2 size-[145vmax] rounded-full bg-void"
      />

      <div ref={decor} className="absolute inset-0" style={{ opacity: 0 }}>
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at center, ${color}2e, transparent 58%)` }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #f3f2ee 1px, transparent 1px), linear-gradient(to bottom, #f3f2ee 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(circle at center, black, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 70%)',
          }}
        />
      </div>

      <div ref={rings} className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute aspect-square w-[min(80vw,640px)] rounded-full border-2"
            style={{ borderColor: `${color}66` }}
          />
        ))}
      </div>

      <div
        ref={content}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ opacity: 0 }}
      >
        <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.4em] uppercase sm:text-xs">
          <span className="h-px w-8 sm:w-12" style={{ background: `linear-gradient(to right, transparent, ${color})` }} />
          <span style={{ color }}>{eyebrow}</span>
          <span className="h-px w-8 sm:w-12" style={{ background: `linear-gradient(to left, transparent, ${color})` }} />
        </div>

        <p
          className="mt-4 text-5xl font-extrabold tracking-[0.18em] text-paper uppercase sm:text-7xl"
          style={{ textShadow: `0 0 30px ${color}80` }}
        >
          {title}
        </p>

        {meta && <p className="mt-4 text-sm font-medium text-paper/55 sm:text-base">{meta}</p>}

        <div className="mt-7 flex items-center gap-3">
          {gate && !exiting && (
            <span className="font-mono text-[11px] font-bold text-paper/40">
              {String(snap!.gateIndex + 1).padStart(2, '0')} / {String(GATES.length).padStart(2, '0')}
            </span>
          )}
          <span className="relative h-[3px] w-40 overflow-hidden rounded-full bg-paper/10 sm:w-56">
            <span
              ref={bar}
              className="absolute inset-0 origin-left rounded-full"
              style={{ background: `linear-gradient(to right, ${color}, #f3f2ee)` }}
            />
          </span>
        </div>
      </div>
    </div>
  )
}
