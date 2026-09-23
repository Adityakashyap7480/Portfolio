import { useMemo } from 'react'
import { useExperience } from '../context/ExperienceContext'
import { GATES } from '../data/gates'

/** Compass radar so dragging the view still shows where every section gate is */
export function SectionRadar() {
  const { lookYaw, activeSection, mode } = useExperience()

  const markers = useMemo(() => {
    return GATES.map((gate) => {
      // World angle of gate from origin (approx hub center)
      const worldAngle = Math.atan2(gate.position[0], gate.position[2])
      // Relative to camera look yaw
      const rel = worldAngle - lookYaw
      const x = Math.sin(rel) * 42
      const y = -Math.cos(rel) * 42
      return { ...gate, x, y, rel }
    })
  }, [lookYaw])

  return (
    <div className="pointer-events-none fixed top-24 right-4 z-30 sm:top-28 sm:right-6">
      <div className="relative size-28 rounded-full border border-void/15 bg-paper/85 shadow-lg backdrop-blur-md sm:size-32">
        <div className="absolute inset-3 rounded-full border border-dashed border-void/10" />
        <div className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
        <p className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-[0.2em] text-void/50 uppercase">
          N
        </p>

        {markers.map((m) => {
          const active = mode !== 'hub' && activeSection === m.id
          return (
            <div
              key={m.id}
              className="absolute top-1/2 left-1/2"
              style={{ transform: `translate(calc(-50% + ${m.x}px), calc(-50% + ${m.y}px))` }}
            >
              <span
                className={`block size-2 rounded-full ${active ? 'bg-accent' : 'bg-void'}`}
                style={{ boxShadow: `0 0 0 2px ${m.color}` }}
              />
              <span
                className={`absolute top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold tracking-wide uppercase ${
                  active ? 'text-void' : 'text-void/70'
                }`}
              >
                {m.label}
              </span>
            </div>
          )
        })}
      </div>
      <p className="mt-2 text-center text-[10px] font-medium text-paper mix-blend-difference sm:text-void/60">
        Drag screen to look
      </p>
    </div>
  )
}
