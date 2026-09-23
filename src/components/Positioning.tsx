import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { useEffect, useRef } from 'react'
import { positioning } from '../data/resume'
import { Reveal, SectionEyebrow } from './motion'

function AnimatedNumber({
  value,
  suffix,
}: {
  value: number
  suffix: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 70, damping: 22 })

  useEffect(() => {
    if (reduce) {
      if (ref.current) ref.current.textContent = `${value}${suffix}`
      return
    }
    if (inView) motionValue.set(value)
  }, [inView, motionValue, reduce, suffix, value])

  useEffect(() => {
    if (reduce) return
    const unsub = spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest)}${suffix}`
      }
    })
    return unsub
  }, [reduce, spring, suffix])

  return (
    <span ref={ref} className="tabular-nums">
      {reduce ? `${value}${suffix}` : `0${suffix}`}
    </span>
  )
}

export function Positioning() {
  return (
    <section id="positioning" className="relative border-y border-void/8 bg-paper-soft py-20 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <Reveal>
          <SectionEyebrow>Positioning</SectionEyebrow>
          <h2 className="text-display max-w-3xl text-3xl text-void sm:text-5xl">
            Experience measured in shipped systems — not slide decks.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden border border-void/10 bg-void/10 sm:grid-cols-2 lg:grid-cols-4">
          {positioning.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06} className="bg-paper p-7 sm:p-8">
              <p className="text-display text-5xl text-void sm:text-6xl">
                <AnimatedNumber value={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-4 text-sm font-bold tracking-[0.16em] text-void uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          {['End-to-end execution', 'Product + business context', 'Web & mobile systems'].map(
            (tag) => (
              <span key={tag} className="inline-flex items-center gap-2">
                <span className="size-1.5 bg-accent" aria-hidden />
                {tag}
              </span>
            ),
          )}
        </Reveal>
      </div>
    </section>
  )
}
