import { motion } from 'framer-motion'
import portrait from '../../../../assets/portrait_cutout.webp'
import { profile } from '../../../../shared/data/resume'

/** Clipped warm-bokeh backdrop with the cut-out portrait, used by the Guide and Contact panels */
export function PortraitBackdrop({ halo = false }: { halo?: boolean }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_30%,#5a4028_0%,#2a1f16_32%,#0d0f12_70%)]" />
      <div className="absolute top-[12%] right-[10%] size-28 rounded-full bg-[#f5b56b]/20 blur-2xl" />
      <div className="absolute top-[38%] left-[30%] size-16 rounded-full bg-[#f5d7a1]/15 blur-xl" />
      {!halo && (
        <div className="absolute right-[4%] bottom-[30%] size-24 rounded-full bg-[#4ade80]/15 blur-2xl" />
      )}
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-accent/10 to-transparent" />
      {halo && (
        <>
          <div
            className="absolute top-[14%] left-[58%] size-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,190,120,0.38)_0%,rgba(245,170,90,0.12)_45%,transparent_70%)]"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 bg-[radial-gradient(60%_80%_at_60%_100%,rgba(200,245,66,0.14)_0%,transparent_70%)]"
            aria-hidden
          />
        </>
      )}

      <motion.img
        src={portrait}
        alt={`${profile.name} — ${profile.role}`}
        className="absolute bottom-0 left-1/2 h-[90%] w-auto max-w-none -translate-x-[40%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
        style={{
          maskImage: 'linear-gradient(to bottom, black 62%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 62%, transparent 100%)',
        }}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
      />

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#07090c] via-[#07090c]/70 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/60 to-transparent" />
    </div>
  )
}
