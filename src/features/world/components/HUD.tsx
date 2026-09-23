import portrait from '../../../assets/Passport_size_photo.jpeg'
import { profile } from '../../../shared/data/resume'
import { useExperience } from '../context/ExperienceContext'
import { SectionRadar } from './SectionRadar'

export function HUD() {
  const { mode, setMobileKey, requestExit, activeSection } = useExperience()

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between gap-3 p-3 sm:p-5">
        <div className="pointer-events-auto relative isolate flex items-center gap-2.5 rounded-sm border border-void/10 px-2.5 py-2 sm:gap-3 sm:px-3 sm:py-2.5">
          <div className="absolute inset-0 bg-paper/92 backdrop-blur-md" aria-hidden />
          <img
            src={portrait}
            alt={profile.name}
            width={128}
            height={128}
            decoding="async"
            className="relative size-11 shrink-0 rounded-[2px] object-cover object-[center_15%] sm:size-12"
            style={{ transform: 'translateZ(0)' }}
          />
          <div className="relative min-w-0">
            <p className="text-sm font-extrabold tracking-tight text-void">{profile.name}</p>
            <p className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase sm:text-[11px]">
              {profile.role}
            </p>
          </div>
        </div>

        <div className="pointer-events-auto flex gap-2">
          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            className="border border-void/10 bg-paper/90 px-3 py-2 text-xs font-bold text-void backdrop-blur-md"
          >
            Resume
          </a>
          {mode === 'inside' && (
            <button
              type="button"
              onClick={requestExit}
              className="bg-accent px-3 py-2 text-xs font-bold text-accent-ink"
            >
              Exit
            </button>
          )}
        </div>
      </header>

      <SectionRadar />

      <div className="pointer-events-none fixed bottom-0 left-0 z-30 p-3 sm:p-5">
        <div className="max-w-xs rounded-sm border border-void/10 bg-paper/90 px-3 py-2.5 text-void backdrop-blur-md sm:px-4 sm:py-3">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-muted uppercase">
            Controls
          </p>
          <p className="mt-1 text-xs font-medium sm:text-sm">
            WASD to run · Drag to look · Help button for a guide
          </p>
          {activeSection && mode === 'inside' && (
            <p className="mt-1 text-[11px] text-muted">
              Walk back out the gate (or Exit) to return
            </p>
          )}
        </div>
      </div>

      <div className="pointer-events-auto fixed right-3 bottom-3 z-30 grid grid-cols-3 gap-2 sm:hidden">
        <span />
        <Pad code="KeyW" label="▲" setMobileKey={setMobileKey} />
        <span />
        <Pad code="KeyA" label="◀" setMobileKey={setMobileKey} />
        <Pad code="KeyS" label="▼" setMobileKey={setMobileKey} />
        <Pad code="KeyD" label="▶" setMobileKey={setMobileKey} />
      </div>
    </>
  )
}

function Pad({
  code,
  label,
  setMobileKey,
}: {
  code: string
  label: string
  setMobileKey: (key: string, pressed: boolean) => void
}) {
  return (
    <button
      type="button"
      className="flex size-12 items-center justify-center border border-void/15 bg-paper/90 text-sm font-bold text-void select-none"
      onPointerDown={(e) => {
        e.preventDefault()
        setMobileKey(code, true)
      }}
      onPointerUp={() => setMobileKey(code, false)}
      onPointerLeave={() => setMobileKey(code, false)}
      onPointerCancel={() => setMobileKey(code, false)}
    >
      {label}
    </button>
  )
}
