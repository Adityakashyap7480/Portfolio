import { useEffect, useRef } from 'react'
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

export function PortalTransition() {
  const { mode, activeSection, transitionLabel, completeEnter, completeExit } = useExperience()
  const overlay = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const rings = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const running = useRef(false)

  const exiting = mode === 'exiting'
  const gateIndex = GATES.findIndex((g) => g.id === activeSection)
  const gate = gateIndex >= 0 ? GATES[gateIndex] : null
  const color = exiting || !gate ? HUB_COLOR : gate.color
  const eyebrow = exiting ? 'Returning to' : 'Entering'
  const title = exiting ? 'The World' : (transitionLabel ?? gate?.label ?? 'Entering')
  const meta = exiting
    ? 'Back to the hub'
    : gate
      ? taglines[gate.id]
      : ''

  useEffect(() => {
    if (!overlay.current || !content.current || !rings.current || !bar.current) return
    if (mode !== 'entering' && mode !== 'exiting') return
    if (running.current) return

    running.current = true
    const el = overlay.current
    const text = content.current
    const ringEls = rings.current.children
    const progress = bar.current
    const finish = mode === 'entering' ? completeEnter : completeExit

    const tl = gsap.timeline({
      onComplete: () => {
        running.current = false
        finish()
      },
    })

    tl.set(el, { autoAlpha: 1 })
      .set(progress, { scaleX: 0 })
      .fromTo(
        el,
        { clipPath: 'circle(0% at 50% 50%)' },
        { clipPath: 'circle(140% at 50% 50%)', duration: 0.65, ease: 'power2.inOut' },
      )
      .fromTo(
        ringEls,
        { scale: 0.3, opacity: 0.9 },
        { scale: 1.6, opacity: 0, duration: 1.1, stagger: 0.14, ease: 'power2.out' },
        '-=0.45',
      )
      .fromTo(
        text,
        { opacity: 0, y: 24, scale: 0.94, filter: 'blur(8px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.38, ease: 'power3.out' },
        '<',
      )
      .to(progress, { scaleX: 1, duration: 0.5, ease: 'power1.inOut' }, '-=0.1')
      .to(text, { opacity: 0, y: -16, filter: 'blur(6px)', duration: 0.22 })
      .to(el, {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 0.5,
        ease: 'power2.inOut',
      })
      .set(el, { autoAlpha: 0 })

    return () => {
      tl.kill()
      running.current = false
    }
  }, [mode, completeEnter, completeExit])

  return (
    <div
      ref={overlay}
      className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-void"
      style={{ opacity: 0, visibility: 'hidden' }}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at center, ${color}33, transparent 58%)` }}
      />
      <div
        className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #f3f2ee 1px, transparent 1px), linear-gradient(to bottom, #f3f2ee 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div ref={rings} className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute aspect-square w-[min(80vw,640px)] rounded-full border-2"
            style={{ borderColor: `${color}66`, boxShadow: `0 0 40px ${color}33, inset 0 0 40px ${color}22` }}
          />
        ))}
      </div>

      <div ref={content} className="relative flex flex-col items-center px-6 text-center">
        <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.4em] uppercase sm:text-xs">
          <span className="h-px w-8 sm:w-12" style={{ background: `linear-gradient(to right, transparent, ${color})` }} />
          <span style={{ color }}>{eyebrow}</span>
          <span className="h-px w-8 sm:w-12" style={{ background: `linear-gradient(to left, transparent, ${color})` }} />
        </div>

        <p
          className="mt-4 text-5xl font-extrabold tracking-[0.18em] text-paper uppercase sm:text-7xl"
          style={{ textShadow: `0 0 28px ${color}88, 0 0 70px ${color}44` }}
        >
          {title}
        </p>

        {meta && <p className="mt-4 text-sm font-medium text-paper/55 sm:text-base">{meta}</p>}

        <div className="mt-7 flex items-center gap-3">
          {gate && !exiting && (
            <span className="font-mono text-[11px] font-bold text-paper/40">
              {String(gateIndex + 1).padStart(2, '0')} / {String(GATES.length).padStart(2, '0')}
            </span>
          )}
          <span className="relative h-[3px] w-40 overflow-hidden rounded-full bg-paper/10 sm:w-56">
            <span
              ref={bar}
              className="absolute inset-0 origin-left rounded-full"
              style={{ background: `linear-gradient(to right, ${color}, #f3f2ee)`, boxShadow: `0 0 12px ${color}` }}
            />
          </span>
        </div>
      </div>
    </div>
  )
}
