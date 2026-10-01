import { useEffect, useRef, type PointerEvent } from 'react'
import { useExperience } from '../context/ExperienceContext'

const BASE_SIZE = 128
const KNOB_SIZE = 54
const MAX_TRAVEL = (BASE_SIZE - KNOB_SIZE) / 2

/** Touch joystick for phones — writes an analog vector into the experience context */
export function MobileJoystick() {
  const { joystick, mode } = useExperience()
  const base = useRef<HTMLDivElement>(null)
  const knob = useRef<HTMLDivElement>(null)
  const pointerId = useRef<number | null>(null)

  const setKnob = (x: number, y: number, animate: boolean) => {
    const el = knob.current
    if (!el) return
    el.style.transition = animate ? 'transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
    el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
  }

  const release = () => {
    pointerId.current = null
    joystick.current = { x: 0, y: 0 }
    setKnob(0, 0, true)
    base.current?.removeAttribute('data-active')
  }

  // The joystick disappears when leaving the hub mid-drag, so pointerup never fires — reset here
  useEffect(() => {
    if (mode === 'hub') return
    pointerId.current = null
    joystick.current = { x: 0, y: 0 }
  }, [mode, joystick])

  useEffect(() => () => void (joystick.current = { x: 0, y: 0 }), [joystick])

  const update = (e: PointerEvent<HTMLDivElement>) => {
    const el = base.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    let dx = e.clientX - (rect.left + rect.width / 2)
    let dy = e.clientY - (rect.top + rect.height / 2)
    const dist = Math.hypot(dx, dy)
    if (dist > MAX_TRAVEL) {
      dx = (dx / dist) * MAX_TRAVEL
      dy = (dy / dist) * MAX_TRAVEL
    }
    setKnob(dx, dy, false)
    joystick.current = { x: dx / MAX_TRAVEL, y: -dy / MAX_TRAVEL }
  }

  if (mode !== 'hub') return null

  return (
    <div className="pointer-events-auto fixed right-5 bottom-5 z-30 flex flex-col items-center gap-1.5 select-none sm:hidden">
      <div
        ref={base}
        className="group relative touch-none rounded-full border border-accent/35 bg-void/75 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.8),0_0_28px_-10px_rgba(200,245,66,0.5)] transition-[border-color,box-shadow] duration-200 data-[active]:border-accent/70 data-[active]:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.8),0_0_36px_-6px_rgba(200,245,66,0.7)]"
        style={{ width: BASE_SIZE, height: BASE_SIZE }}
        onPointerDown={(e) => {
          if (pointerId.current !== null) return
          e.preventDefault()
          pointerId.current = e.pointerId
          e.currentTarget.setPointerCapture(e.pointerId)
          e.currentTarget.setAttribute('data-active', '')
          update(e)
        }}
        onPointerMove={(e) => {
          if (e.pointerId === pointerId.current) update(e)
        }}
        onPointerUp={(e) => {
          if (e.pointerId === pointerId.current) release()
        }}
        onPointerCancel={(e) => {
          if (e.pointerId === pointerId.current) release()
        }}
        role="application"
        aria-label="Movement joystick"
      >
        <span className="pointer-events-none absolute inset-3 rounded-full border border-dashed border-paper/10" />
        <span className="pointer-events-none absolute inset-[34%] rounded-full bg-accent/10" />
        {[0, 90, 180, 270].map((deg) => (
          <span
            key={deg}
            className="pointer-events-none absolute inset-0 flex justify-center pt-1.5"
            style={{ transform: `rotate(${deg}deg)` }}
          >
            <svg viewBox="0 0 12 8" className="w-3 text-accent/45" aria-hidden>
              <path d="M1 7 L6 2 L11 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        ))}

        <div
          ref={knob}
          className="pointer-events-none absolute top-1/2 left-1/2 rounded-full bg-gradient-to-br from-accent to-[#4ade80] shadow-[0_6px_16px_-4px_rgba(0,0,0,0.7),0_0_22px_-4px_rgba(200,245,66,0.8),inset_0_-4px_8px_rgba(0,0,0,0.25),inset_0_3px_6px_rgba(255,255,255,0.35)]"
          style={{ width: KNOB_SIZE, height: KNOB_SIZE, transform: 'translate(-50%, -50%)' }}
        >
          <span className="absolute inset-[30%] rounded-full border-2 border-accent-ink/25" />
        </div>
      </div>
      <span className="text-[9px] font-extrabold tracking-[0.3em] text-paper/60 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
        Move
      </span>
    </div>
  )
}
