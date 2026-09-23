import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Download } from 'lucide-react'
import { useEffect } from 'react'
import portrait from '../assets/Passport_size_photo.jpeg'
import { heroLines, profile } from '../data/resume'
import { MagneticButton } from './MagneticButton'

export function Hero() {
  const reduce = useReducedMotion()
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(40)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })
  const glow = useMotionTemplate`radial-gradient(620px circle at ${springX}% ${springY}%, rgba(200,245,66,0.16), transparent 55%)`

  useEffect(() => {
    if (reduce) return
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 100)
      mouseY.set((e.clientY / window.innerHeight) * 100)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY, reduce])

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-void text-paper">
      <div className="bg-grid-fine-light absolute inset-0 opacity-70" aria-hidden />
      {!reduce && (
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} aria-hidden />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1180px] grid-cols-1 items-center gap-12 px-5 pt-28 pb-10 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-10 lg:pt-24 lg:pb-16">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold tracking-[0.22em] text-muted-light uppercase">
            <span>{profile.name}</span>
            <span className="hidden h-px w-8 bg-line-light sm:block" aria-hidden />
            <span>{profile.experience}</span>
            <span className="hidden h-px w-8 bg-line-light sm:block" aria-hidden />
            <span>{profile.location}</span>
          </div>

          <div className="mt-8 max-w-xl lg:mt-10">
            {heroLines.map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.h1
                  className="text-[clamp(1.65rem,3.4vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.02em] text-paper"
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.12 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          <motion.div
            className="mt-8 flex max-w-xl flex-col gap-8 sm:mt-10"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-accent uppercase">
                {profile.role}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-light sm:text-lg">
                {profile.positioning}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <MagneticButton
                href="#contact"
                className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-bold text-accent-ink transition hover:brightness-110"
              >
                Start a conversation
                <ArrowUpRight className="size-4" strokeWidth={2.25} />
              </MagneticButton>
              <MagneticButton
                href={profile.resumeUrl}
                download={profile.resumeFileName}
                className="inline-flex items-center gap-2 border border-paper/20 px-6 py-3.5 text-sm font-semibold text-paper transition hover:border-accent hover:text-accent"
              >
                <Download className="size-4" strokeWidth={2.25} />
                Download resume
              </MagneticButton>
            </div>
          </motion.div>

          <motion.a
            href="#positioning"
            className="mt-12 flex items-center gap-3 text-[11px] font-semibold tracking-[0.24em] text-muted-light uppercase transition hover:text-accent lg:mt-16"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            data-cursor="interactive"
          >
            Scroll
            <ArrowDownRight className="size-4 animate-pulse" />
          </motion.a>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:max-w-none lg:justify-self-end"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -inset-3 border border-accent/25" aria-hidden />
          <div className="absolute top-0 right-0 h-16 w-px bg-accent" aria-hidden />
          <div className="absolute top-0 right-0 h-px w-16 bg-accent" aria-hidden />
          <div className="absolute bottom-0 left-0 h-16 w-px bg-accent" aria-hidden />
          <div className="absolute bottom-0 left-0 h-px w-16 bg-accent" aria-hidden />

          <div className="relative aspect-[4/5] overflow-hidden border border-paper/10 bg-void-elevated">
            <img
              src={portrait}
              alt={profile.name}
              width={640}
              height={800}
              className="h-full w-full object-cover object-[center_18%] grayscale-[18%] transition duration-700 hover:grayscale-0 hover:scale-[1.03]"
              decoding="async"
              fetchPriority="high"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/55 via-transparent to-void/10"
              aria-hidden
            />
            <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-sm font-bold tracking-tight text-paper">{profile.name}</p>
                <p className="mt-0.5 text-[11px] font-semibold tracking-[0.18em] text-accent uppercase">
                  {profile.role}
                </p>
              </div>
              <span className="text-[11px] font-bold tracking-widest text-paper/50 uppercase">
                {profile.experience}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
