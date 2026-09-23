import { motion, useReducedMotion } from 'framer-motion'
import type { MouseEvent } from 'react'
import type { projects } from '../data/resume'

type VisualKind = (typeof projects)[number]['visual']

export function ProjectVisual({ kind, name }: { kind: VisualKind; name: string }) {
  const reduce = useReducedMotion()

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--mx', `${x}%`)
    e.currentTarget.style.setProperty('--my', `${y}%`)
  }

  return (
    <div
      data-cursor="interactive"
      onMouseMove={onMove}
      className="group relative aspect-[16/11] overflow-hidden border border-void/10 bg-void"
    >
      <div className="bg-grid-fine-light absolute inset-0 opacity-50" aria-hidden />

      {kind === 'legal' && <LegalArt />}
      {kind === 'pay' && <PayArt />}
      {kind === 'cert' && <CertArt />}

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent"
        aria-hidden
      />

      <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4">
        <p className="text-sm font-semibold tracking-[0.18em] text-paper/70 uppercase">{name}</p>
        <span className="text-[11px] font-bold tracking-widest text-accent uppercase">Case study</span>
      </div>

      {!reduce && (
        <motion.div
          className="pointer-events-none absolute -inset-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(200,245,66,0.14), transparent 55%)',
          }}
          aria-hidden
        />
      )}
    </div>
  )
}

function LegalArt() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 550" fill="none" aria-hidden>
      <rect x="72" y="70" width="280" height="360" stroke="rgba(243,242,238,0.18)" strokeWidth="1.5" />
      <rect x="112" y="110" width="200" height="12" fill="rgba(200,245,66,0.85)" />
      <rect x="112" y="150" width="160" height="8" fill="rgba(243,242,238,0.25)" />
      <rect x="112" y="175" width="180" height="8" fill="rgba(243,242,238,0.18)" />
      <rect x="112" y="210" width="200" height="90" stroke="rgba(243,242,238,0.2)" />
      <rect x="400" y="100" width="300" height="48" stroke="rgba(243,242,238,0.2)" />
      <rect x="400" y="170" width="300" height="48" stroke="rgba(243,242,238,0.2)" />
      <rect x="400" y="240" width="300" height="48" stroke="rgba(200,245,66,0.45)" />
      <rect x="400" y="310" width="300" height="120" stroke="rgba(243,242,238,0.15)" />
      <circle cx="640" cy="160" r="54" stroke="rgba(200,245,66,0.5)" strokeWidth="1.5" />
    </svg>
  )
}

function PayArt() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 550" fill="none" aria-hidden>
      <rect x="120" y="80" width="220" height="390" rx="28" stroke="rgba(243,242,238,0.22)" strokeWidth="1.5" />
      <rect x="150" y="130" width="160" height="160" stroke="rgba(200,245,66,0.7)" strokeWidth="2" />
      <path d="M180 180 h40 v40 h-40 z M230 180 h40 v40 h-40 z M180 230 h40 v40 h-40 z M230 230 h40 v40 h-40 z" fill="rgba(200,245,66,0.55)" />
      <rect x="155" y="330" width="150" height="14" fill="rgba(243,242,238,0.3)" />
      <rect x="175" y="360" width="110" height="10" fill="rgba(243,242,238,0.18)" />
      <circle cx="560" cy="220" r="110" stroke="rgba(243,242,238,0.15)" strokeWidth="1.5" />
      <circle cx="560" cy="220" r="70" stroke="rgba(200,245,66,0.55)" strokeWidth="2" />
      <path d="M420 380 H700 M420 420 H640" stroke="rgba(243,242,238,0.2)" strokeWidth="8" strokeLinecap="round" />
    </svg>
  )
}

function CertArt() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 550" fill="none" aria-hidden>
      <rect x="90" y="90" width="620" height="370" stroke="rgba(243,242,238,0.18)" strokeWidth="1.5" />
      <rect x="130" y="130" width="240" height="18" fill="rgba(200,245,66,0.8)" />
      <rect x="130" y="175" width="180" height="10" fill="rgba(243,242,238,0.25)" />
      <rect x="130" y="220" width="320" height="150" stroke="rgba(243,242,238,0.18)" />
      <rect x="150" y="245" width="120" height="100" fill="rgba(200,245,66,0.18)" stroke="rgba(200,245,66,0.5)" />
      <rect x="290" y="245" width="120" height="70" fill="rgba(243,242,238,0.08)" stroke="rgba(243,242,238,0.25)" />
      <rect x="520" y="140" width="150" height="200" stroke="rgba(243,242,238,0.25)" />
      <circle cx="595" cy="220" r="34" stroke="rgba(200,245,66,0.65)" />
      <path d="M575 220 l12 12 24 -28" stroke="rgba(200,245,66,0.9)" strokeWidth="3" />
    </svg>
  )
}
