import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { skillEcosystem } from '../data/resume'
import { Reveal, SectionEyebrow } from './motion'

export function Skills() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(skillEcosystem[0]?.id ?? '')
  const current = skillEcosystem.find((g) => g.id === active) ?? skillEcosystem[0]

  return (
    <section id="skills" className="relative border-t border-void/8 bg-paper-soft py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <Reveal className="max-w-3xl">
          <SectionEyebrow>Capabilities</SectionEyebrow>
          <h2 className="text-display text-4xl text-void sm:text-5xl">
            An ecosystem built for end-to-end delivery.
          </h2>
          <p className="mt-5 text-lg text-muted">
            Explore how technology, product thinking, and operations come together in the work I ship.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <ul className="space-y-1">
              {skillEcosystem.map((group) => {
                const isActive = group.id === active
                return (
                  <li key={group.id}>
                    <button
                      type="button"
                      data-cursor="interactive"
                      onMouseEnter={() => setActive(group.id)}
                      onFocus={() => setActive(group.id)}
                      onClick={() => setActive(group.id)}
                      className={`flex w-full items-baseline justify-between border-b px-1 py-5 text-left transition-colors ${
                        isActive
                          ? 'border-void text-void'
                          : 'border-void/10 text-muted hover:text-void'
                      }`}
                    >
                      <span
                        className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${
                          isActive ? '' : ''
                        }`}
                      >
                        {group.title}
                      </span>
                      <span
                        className={`text-xs font-semibold tracking-widest uppercase ${
                          isActive ? 'text-accent-ink bg-accent px-2 py-1' : 'text-muted'
                        }`}
                      >
                        {String(group.items.length).padStart(2, '0')}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="min-h-[280px] border border-void/10 bg-paper p-7 sm:p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[11px] font-bold tracking-[0.24em] text-muted uppercase">
                    {current.title}
                  </p>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-void/75">
                    {current.description}
                  </p>
                  <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-3">
                    {current.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm font-semibold tracking-tight text-void after:ml-4 after:font-normal after:text-void/20 after:content-['/'] last:after:content-none"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
