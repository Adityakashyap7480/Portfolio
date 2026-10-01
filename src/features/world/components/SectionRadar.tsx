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
  const { look, activeSection, mode, characterPose } = useExperience()
  const [, setTick] = useState(0)

  useEffect(() => {
    let raf = 0
    let last = { x: NaN, z: NaN, facing: NaN, yaw: NaN }
    const loop = () => {
      const { x, z, facing } = characterPose.current
      const { yaw } = look.current
      const moved =
        Math.abs(x - last.x) > 0.05 ||
        Math.abs(z - last.z) > 0.05 ||
        Math.abs(facing - last.facing) > 0.01 ||
        Math.abs(yaw - last.yaw) > 0.01
      if (moved || Number.isNaN(last.x)) {
        last = { x, z, facing, yaw }
        setTick((t) => t + 1)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [characterPose, look])

  const { x: cx, z: cz, facing } = characterPose.current
  const lookYaw = look.current.yaw

  // Camera sits at lookYaw behind you; "into the scene" is opposite (+π)
  // Facing uses atan2(vx,vz); convert so arrow-up = running into the screen
  const headingRel = facing - lookYaw - Math.PI

  const markers = GATES.map((gate) => {
    const dx = gate.position[0] - cx
    const dz = gate.position[2] - cz
    const worldAngle = Math.atan2(dx, dz)
    const rel = worldAngle - lookYaw - Math.PI
    const dist = Math.hypot(dx, dz)
    const radius = Math.min(46, 16 + dist * 1.05)
    return {
      ...gate,
      x: Math.sin(rel) * radius,
      y: -Math.cos(rel) * radius,
      dist,
    }
  })

  const nearest = markers.reduce((a, b) => (a.dist < b.dist ? a : b))

  return (
    <div className="pointer-events-none fixed top-24 right-4 z-30 flex flex-col items-center sm:top-28 sm:right-6">
      <div className="relative size-32 overflow-hidden rounded-full border border-accent/30 bg-void/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7),0_0_24px_-8px_rgba(200,245,66,0.4)] sm:size-40">
        <div className="absolute inset-0 animate-spin rounded-full bg-[conic-gradient(from_0deg,rgba(200,245,66,0.22),transparent_22%)] [animation-duration:4s]" />
        <div className="absolute inset-3 rounded-full border border-dashed border-paper/15" />
        <div className="absolute inset-[30%] rounded-full border border-paper/10" />
        <div className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-paper/[0.07]" />
        <div className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-paper/[0.07]" />

        <p className="absolute top-1.5 left-1/2 -translate-x-1/2 text-[8px] font-extrabold tracking-[0.25em] text-accent/70 uppercase">
          You
        </p>

        <div className="absolute top-1/2 left-1/2 z-10 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_#c8f542]" />

        {/* Direction arrow — where you are facing / running */}
        <div
          className="absolute top-1/2 left-1/2 z-20 origin-center transition-transform duration-75"
          style={{
            transform: `translate(-50%, -50%) rotate(${(headingRel * 180) / Math.PI}deg)`,
          }}
        >
          <svg
            width="22"
            height="40"
            viewBox="0 0 28 48"
            className="-mt-4 drop-shadow-[0_0_6px_rgba(200,245,66,0.7)]"
            aria-hidden
          >
            <path d="M14 2 L26 40 L14 32 L2 40 Z" fill="#c8f542" stroke="#0a1200" strokeWidth="1.5" />
          </svg>
        </div>

        {markers.map((m) => {
          const active = mode !== 'hub' && activeSection === m.id
          const isNearest = m.id === nearest.id
          // keep labels on the inward side so they never clip at the rim
          const side = m.x > 6 ? 'right-3' : m.x < -6 ? 'left-3' : 'left-1/2 top-3 -translate-x-1/2'
          return (
            <div
              key={m.id}
              className="absolute top-1/2 left-1/2 z-[5]"
              style={{ transform: `translate(calc(-50% + ${m.x}px), calc(-50% + ${m.y}px))` }}
            >
              <span className="relative block size-2.5">
                {isNearest && (
                  <span
                    className="absolute -inset-1 animate-ping rounded-full opacity-60"
                    style={{ background: m.color }}
                  />
                )}
                <span
                  className="relative block size-2.5 rounded-full"
                  style={{
                    background: active || isNearest ? m.color : '#080808',
                    boxShadow: `0 0 0 2px ${m.color}, 0 0 10px ${m.color}99`,
                  }}
                />
              </span>
              <span
                className={`absolute whitespace-nowrap text-[8px] font-bold tracking-wide uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] sm:text-[9px] ${side} ${
                  side.includes('top-3') ? '' : 'top-1/2 -translate-y-1/2'
                }`}
                style={{ color: isNearest || active ? m.color : 'rgba(243,242,238,0.7)' }}
              >
                {m.label}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-paper/10 bg-void/80 px-3 py-1">
        <span
          className="size-2 rounded-full"
          style={{ background: nearest.color, boxShadow: `0 0 8px ${nearest.color}` }}
        />
        <p className="text-[11px] text-paper/60">
          Nearest{' '}
          <span className="font-bold tracking-wide uppercase" style={{ color: nearest.color }}>
            {nearest.label}
          </span>
        </p>
      </div>
    </div>
  )
}
