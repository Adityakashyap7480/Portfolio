import { useEffect, useState } from 'react'
import { useExperience } from '../context/ExperienceContext'
import { GATES } from '../data/gates'

/**
 * Compass radar:
 * - Up on the map = camera look-into-scene
 * - Green arrow = where YOU are going / facing
 * - Dots = section gates relative to your position
 */
export function SectionRadar() {
  const { lookYaw, activeSection, mode, characterPose } = useExperience()
  const [, setTick] = useState(0)

  useEffect(() => {
    let frame = 0
    let raf = 0
    const loop = () => {
      frame += 1
      if (frame % 2 === 0) setTick((t) => t + 1)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const { x: cx, z: cz, facing } = characterPose.current

  // Camera sits at lookYaw behind you; "into the scene" is opposite (+π)
  // Facing uses atan2(vx,vz); convert so arrow-up = running into the screen
  const headingRel = facing - lookYaw - Math.PI

  const markers = GATES.map((gate) => {
    const dx = gate.position[0] - cx
    const dz = gate.position[2] - cz
    const worldAngle = Math.atan2(dx, dz)
    const rel = worldAngle - lookYaw - Math.PI
    const dist = Math.hypot(dx, dz)
    const radius = Math.min(48, 16 + dist * 1.05)
    return {
      ...gate,
      x: Math.sin(rel) * radius,
      y: -Math.cos(rel) * radius,
      dist,
    }
  })

  const nearest = markers.reduce((a, b) => (a.dist < b.dist ? a : b))

  return (
    <div className="pointer-events-none fixed top-24 right-4 z-30 sm:top-28 sm:right-6">
      <div className="relative size-32 overflow-hidden rounded-full border-2 border-void/20 bg-paper/90 shadow-lg backdrop-blur-md sm:size-40">
        <div className="absolute inset-4 rounded-full border border-dashed border-void/15" />
        <div className="absolute inset-[28%] rounded-full border border-void/8" />

        {/* You */}
        <div className="absolute top-1/2 left-1/2 z-10 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-void ring-2 ring-accent" />

        {/* Direction arrow — where you are facing / running */}
        <div
          className="absolute top-1/2 left-1/2 z-20 origin-center transition-transform duration-75"
          style={{
            transform: `translate(-50%, -50%) rotate(${(headingRel * 180) / Math.PI}deg)`,
          }}
        >
          <svg width="28" height="48" viewBox="0 0 28 48" className="-mt-5 drop-shadow-md" aria-hidden>
            <path d="M14 2 L26 40 L14 32 L2 40 Z" fill="#c8f542" stroke="#0a1200" strokeWidth="1.5" />
          </svg>
        </div>

        <p className="absolute top-1.5 left-1/2 -translate-x-1/2 text-[9px] font-extrabold tracking-[0.2em] text-void/45 uppercase">
          YOU
        </p>

        {markers.map((m) => {
          const active = mode !== 'hub' && activeSection === m.id
          return (
            <div
              key={m.id}
              className="absolute top-1/2 left-1/2 z-[5]"
              style={{ transform: `translate(calc(-50% + ${m.x}px), calc(-50% + ${m.y}px))` }}
            >
              <span
                className={`block size-2.5 rounded-full ${active ? 'bg-accent' : 'bg-void'}`}
                style={{ boxShadow: `0 0 0 2px ${m.color}` }}
              />
              <span
                className={`absolute top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold tracking-wide uppercase sm:text-[9px] ${
                  active ? 'text-void' : 'text-void/65'
                }`}
              >
                {m.label}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-2 max-w-[10.5rem] rounded-sm border border-void/10 bg-paper/85 px-2 py-1.5 text-center backdrop-blur-sm">
        <p className="text-xs text-void/65">Nearest: {nearest.label}</p>
      </div>
    </div>
  )
}
