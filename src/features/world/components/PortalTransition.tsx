import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useExperience } from '../context/ExperienceContext'

export function PortalTransition() {
  const { mode, transitionLabel, completeEnter, completeExit } = useExperience()
  const overlay = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLParagraphElement>(null)
  const running = useRef(false)

  useEffect(() => {
    if (!overlay.current || !label.current) return
    if (mode !== 'entering' && mode !== 'exiting') return
    if (running.current) return

    running.current = true
    const el = overlay.current
    const text = label.current
    const finish = mode === 'entering' ? completeEnter : completeExit

    const tl = gsap.timeline({
      onComplete: () => {
        running.current = false
        finish()
      },
    })

    tl.set(el, { autoAlpha: 1 })
      .fromTo(
        el,
        { clipPath: 'circle(0% at 50% 50%)' },
        { clipPath: 'circle(140% at 50% 50%)', duration: 0.65, ease: 'power2.inOut' },
      )
      .fromTo(
        text,
        { opacity: 0, y: 24, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3 },
        '-=0.2',
      )
      .to(text, { opacity: 0, y: -16, duration: 0.22, delay: 0.15 })
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
      className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-void"
      style={{ opacity: 0, visibility: 'hidden' }}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,245,66,0.25),transparent_55%)]" />
      <p
        ref={label}
        className="relative text-center text-4xl font-extrabold tracking-[0.28em] text-accent uppercase sm:text-6xl"
      >
        {transitionLabel ?? 'ENTERING'}
      </p>
    </div>
  )
}
