import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import portrait from '../../../assets/Passport_size_photo.jpeg'
import { profile } from '../../../shared/data/resume'
import { useExperience } from '../context/ExperienceContext'
import { SectionRadar } from './SectionRadar'

export function HUD() {
  const { mode, setMobileKey, requestExit, activeSection } = useExperience()
  const [photoOpen, setPhotoOpen] = useState(false)

  useEffect(() => {
    if (!photoOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPhotoOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [photoOpen])

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between gap-3 p-3 sm:p-5">
        <div className="pointer-events-auto relative isolate flex items-center gap-2.5 rounded-sm border border-void/10 px-2.5 py-2 sm:gap-3 sm:px-3 sm:py-2.5">
          <div className="absolute inset-0 bg-paper/92 backdrop-blur-md" aria-hidden />
          <button
            type="button"
            onClick={() => setPhotoOpen(true)}
            className="relative shrink-0 cursor-pointer rounded-[2px] outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="View photo"
          >
            <img
              src={portrait}
              alt={profile.name}
              width={128}
              height={128}
              decoding="async"
              className="size-11 object-cover object-[center_18%] sm:size-12"
              style={{ transform: 'translateZ(0)' }}
            />
          </button>
          <div className="relative min-w-0">
            <p className="text-base font-extrabold tracking-tight text-void">{profile.name}</p>
            <p className="text-xs font-semibold tracking-[0.12em] text-muted uppercase sm:text-sm">
              {profile.role}
            </p>
          </div>
        </div>

        <div className="pointer-events-auto flex gap-2">
          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            className="border border-void/10 bg-paper/90 px-3 py-2 text-sm font-bold text-void backdrop-blur-md"
          >
            Resume
          </a>
          {mode === 'inside' && (
            <button
              type="button"
              onClick={requestExit}
              className="bg-accent px-3 py-2 text-sm font-bold text-accent-ink"
            >
              Exit
            </button>
          )}
        </div>
      </header>

      <SectionRadar />

      <div className="pointer-events-none fixed bottom-0 left-0 z-30 p-3 sm:p-5">
        <div className="max-w-xs rounded-sm border border-void/10 bg-paper/90 px-3 py-2.5 text-void backdrop-blur-md sm:px-4 sm:py-3">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
            Controls
          </p>
          <p className="mt-1 text-sm font-medium sm:text-base">
            WASD to run · Drag to look · Help button for a guide
          </p>
          {activeSection && mode === 'inside' && (
            <p className="mt-1 text-xs text-muted sm:text-sm">
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

      <AnimatePresence>
        {photoOpen && (
          <motion.div
            className="pointer-events-auto fixed inset-0 z-[75] flex items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Profile photo"
          >
            <button
              type="button"
              className="absolute inset-0 bg-void/75"
              aria-label="Close photo"
              onClick={() => setPhotoOpen(false)}
            />
            <motion.div
              className="relative z-10 max-w-[min(90vw,420px)]"
              initial={{ scale: 0.9, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setPhotoOpen(false)}
                className="absolute -top-3 -right-3 z-10 flex size-9 items-center justify-center border border-paper/20 bg-void text-paper"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
              <img
                src={portrait}
                alt={profile.name}
                width={420}
                height={420}
                className="w-full border border-paper/15 object-cover object-[center_18%] shadow-2xl"
              />
              <p className="mt-3 text-center text-sm font-extrabold text-paper">{profile.name}</p>
              <p className="text-center text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
                {profile.role}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
