import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, LogOut, MousePointer2, X } from 'lucide-react'
import portrait from '../../../assets/Passport_size_photo.jpeg'
import portraitCutout from '../../../assets/portrait_cutout.webp'
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
        <motion.div
          className="group pointer-events-auto relative flex items-center gap-3 overflow-hidden rounded-2xl border border-accent/25 bg-void/80 py-2 pr-4 pl-2 text-paper shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-accent/55 hover:shadow-[0_0_32px_-8px_rgba(200,245,66,0.45)] sm:gap-3.5 sm:pr-5"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 24 }}
        >
          <span
            className="pointer-events-none absolute -top-10 -left-8 size-28 rounded-full bg-accent/15 blur-2xl"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
            aria-hidden
          />

          <button
            type="button"
            onClick={() => setPhotoOpen(true)}
            className="relative size-12 shrink-0 cursor-pointer rounded-full bg-gradient-to-br from-accent to-[#4ade80] p-[2px] outline-none focus-visible:ring-2 focus-visible:ring-accent sm:size-13"
            aria-label="View photo"
          >
            <span className="block size-full overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_35%,#6b4a2c_0%,#2a1f16_55%,#0d0f12_100%)]">
              <img
                src={portraitCutout}
                alt={profile.name}
                width={128}
                height={128}
                decoding="async"
                className="size-full origin-top scale-[1.7] object-cover object-top transition-transform duration-500 group-hover:scale-[1.85]"
              />
            </span>
            <span className="absolute right-0 bottom-0 flex size-3.5 items-center justify-center rounded-full bg-void">
              <span className="absolute size-2.5 animate-ping rounded-full bg-[#4ade80]/70" />
              <span className="relative size-2.5 rounded-full bg-[#4ade80]" />
            </span>
          </button>

          <div className="relative min-w-0">
            <p className="text-[15px] leading-tight font-extrabold tracking-tight sm:text-base">
              {profile.name}
            </p>
            <p className="mt-0.5 bg-gradient-to-r from-accent to-[#4ade80] bg-clip-text text-[10px] font-bold tracking-[0.18em] text-transparent uppercase sm:text-[11px]">
              {profile.role}
            </p>
            <p className="mt-1 hidden items-center gap-1.5 text-[11px] font-medium text-paper/55 sm:flex">
              Open to opportunities
              <span className="text-paper/25">·</span>
              {profile.experience}
            </p>
          </div>
        </motion.div>

        <div className="pointer-events-auto flex gap-2">
          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            className="group inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-void/80 px-3.5 py-2.5 text-sm font-bold text-paper shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md transition hover:border-accent hover:bg-accent hover:text-accent-ink"
          >
            <Download className="size-4 text-accent transition group-hover:translate-y-0.5 group-hover:text-accent-ink" />
            Resume
          </a>
          {mode === 'inside' && (
            <button
              type="button"
              onClick={requestExit}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-3.5 py-2.5 text-sm font-bold text-accent-ink shadow-[0_0_24px_-6px_rgba(200,245,66,0.7)] transition hover:brightness-110"
            >
              <LogOut className="size-4" />
              Exit
            </button>
          )}
        </div>
      </header>

      <SectionRadar />

      <div className="pointer-events-none fixed bottom-0 left-0 z-30 p-3 sm:p-5">
        <div className="relative overflow-hidden rounded-2xl border border-paper/10 bg-void/80 px-3.5 py-3 text-paper shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md sm:px-4">
          <span
            className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
            aria-hidden
          />
          <p className="flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] text-paper/50 uppercase">
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_6px_#c8f542]" />
            Controls
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-paper/75">
            <span className="flex items-center gap-1.5">
              <span className="flex gap-0.5">
                {['W', 'A', 'S', 'D'].map((k) => (
                  <Key key={k}>{k}</Key>
                ))}
              </span>
              Run
            </span>
            <span className="flex items-center gap-1.5">
              <Key>
                <MousePointer2 className="size-3" />
              </Key>
              Drag to look
            </span>
            <span className="flex items-center gap-1.5">
              <Key accent>H</Key>
              Guide
            </span>
          </div>
          {activeSection && mode === 'inside' && (
            <p className="mt-2 flex items-center gap-1.5 text-[11px] text-paper/50">
              <Key>Esc</Key>
              or walk back out the gate to return
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

function Key({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <kbd
      className={`inline-flex h-5 min-w-5 items-center justify-center rounded-md border px-1 font-sans text-[10px] font-bold shadow-[inset_0_-2px_0_rgba(0,0,0,0.35)] ${
        accent
          ? 'border-accent/60 bg-accent/15 text-accent'
          : 'border-paper/20 bg-paper/[0.06] text-paper/85'
      }`}
    >
      {children}
    </kbd>
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
      className="flex size-12 items-center justify-center rounded-xl border border-accent/30 bg-void/80 text-sm font-bold text-accent shadow-[0_8px_20px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md select-none active:bg-accent active:text-accent-ink"
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
