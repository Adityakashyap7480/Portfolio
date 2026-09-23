import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef, useState } from 'react'
import { experience } from '../data/resume'
import { Reveal, SectionEyebrow } from './motion'

export function Experience() {
  const reduce = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 55%'],
  })
  const lineScale = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })
  const lineHeight = useTransform(lineScale, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="relative bg-void py-24 text-paper sm:py-32">
      <div className="bg-grid-fine-light absolute inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <Reveal>
          <SectionEyebrow>
            <span className="text-muted-light">Experience</span>
          </SectionEyebrow>
          <h2 className="text-display max-w-3xl text-4xl text-paper sm:text-5xl">
            A career built around real products in production.
          </h2>
          <p className="mt-5 max-w-xl text-base text-muted-light sm:text-lg">
            From platform UI to payment ecosystems to legal operations — each role expanded the
            surface area of what I own end to end.
          </p>
        </Reveal>

        <div ref={containerRef} className="relative mt-16 lg:mt-20">
          <div className="absolute top-2 bottom-2 left-[19px] hidden w-px bg-paper/10 md:block" aria-hidden>
            {!reduce && (
              <motion.div className="origin-top w-full bg-accent" style={{ height: lineHeight }} />
            )}
          </div>

          <ol className="space-y-10 md:space-y-0">
            {experience.map((job, index) => {
              const isActive = active === index
              return (
                <motion.li
                  key={job.company}
                  className="relative grid grid-cols-1 gap-5 md:grid-cols-[40px_200px_minmax(0,1fr)] md:gap-8 md:py-12"
                  onViewportEnter={() => setActive(index)}
                  viewport={{ amount: 0.45, margin: '-10% 0px' }}
                >
                  <div className="relative z-10 hidden pt-1 md:flex md:justify-center" aria-hidden>
                    <span
                      className={`block size-[23px] shrink-0 rounded-full border-2 transition-colors duration-300 ${
                        isActive
                          ? 'border-accent bg-accent'
                          : 'border-paper/25 bg-void'
                      }`}
                    />
                  </div>

                  <div className="md:pt-1">
                    <p
                      className={`text-sm font-semibold transition-colors ${
                        isActive ? 'text-accent' : 'text-muted-light'
                      }`}
                    >
                      {job.period}
                    </p>
                    <p className="mt-1 text-xs tracking-wide text-muted-light/70 uppercase">
                      {job.type}
                    </p>
                  </div>

                  <motion.div
                    className={`w-full min-w-0 border border-paper/10 p-6 transition-colors duration-300 sm:p-8 ${
                      isActive ? 'bg-void-elevated border-accent/35' : 'bg-transparent'
                    }`}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-8%' }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-extrabold tracking-tight text-paper sm:text-3xl">
                          {job.company}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-muted-light">
                          {job.role} · {job.focus}
                        </p>
                      </div>
                      <span className="text-[11px] font-bold tracking-[0.2em] text-muted-light uppercase">
                        0{index + 1}
                      </span>
                    </div>

                    <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
                      {job.stack.map((tech) => (
                        <li
                          key={tech}
                          className="text-xs font-medium text-muted-light after:ml-3 after:text-paper/20 after:content-['/'] last:after:content-none"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-6 space-y-3">
                      {job.highlights.map((item) => (
                        <li
                          key={item}
                          className="relative pl-4 text-sm leading-relaxed text-paper/75 before:absolute before:top-[0.55em] before:left-0 before:size-1 before:bg-accent sm:text-base"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
