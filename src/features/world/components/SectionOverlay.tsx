import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, X } from 'lucide-react'
import { experience } from '../../../shared/data/resume'
import { useExperience } from '../context/ExperienceContext'
import type { SectionId } from '../data/gates'
import { AboutShowcase } from './about/AboutShowcase'
import { ContactShowcase } from './contact/ContactShowcase'
import { ExperienceTimeline } from './experience/ExperienceTimeline'
import { ProjectsShowcase } from './projects/ProjectsShowcase'
import { SkillsShowcase } from './skills/SkillsShowcase'

function SectionBody({ id }: { id: SectionId }) {
  switch (id) {
    case 'about':
      return <AboutShowcase />
    case 'skills':
      return <SkillsShowcase />
    case 'experience':
      return <ExperienceTimeline />
    case 'projects':
      return <ProjectsShowcase />
    case 'contact':
      return <ContactShowcase />
    default:
      return null
  }
}

const titles: Record<SectionId, string> = {
  about: 'About',
  skills: 'Skills',
  experience: 'Experience',
  projects: 'Projects',
  contact: 'Contact',
}

const subtitles: Partial<Record<SectionId, string>> = {
  projects: 'Real products. Real impact. Built with modern technologies.',
  skills: 'Technologies, tools, and expertise I use to build real-world products.',
  experience: "My professional journey and the impact I've created.",
}

/** Trailing part of the title rendered with the accent gradient */
const titleAccents: Partial<Record<SectionId, string>> = {
  skills: 'Skills',
  experience: 'erience',
}

const WIDE_SECTIONS: SectionId[] = ['about', 'projects', 'skills', 'experience', 'contact']

/** Sections that render their own heading and fill the modal edge to edge */
const BARE_SECTIONS: SectionId[] = ['about', 'contact']

function SectionTitle({ id }: { id: SectionId }) {
  const title = titles[id]
  const accent = titleAccents[id]
  if (!accent || !title.endsWith(accent)) return <>{title}</>
  return (
    <>
      {title.slice(0, title.length - accent.length)}
      <span className="bg-gradient-to-r from-accent to-[#4ade80] bg-clip-text text-transparent">
        {accent}
      </span>
    </>
  )
}

export function SectionOverlay() {
  const { mode, activeSection, requestExit } = useExperience()
  const open = mode === 'inside' && activeSection
  const bare = activeSection ? BARE_SECTIONS.includes(activeSection) : false

  return (
    <AnimatePresence>
      {open && activeSection && (
        <motion.div
          className="pointer-events-auto fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close overlay"
            className="absolute inset-0 bg-void/55 backdrop-blur-[2px]"
            onClick={requestExit}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="section-modal-title"
            className={`relative z-10 flex max-h-[min(88svh,820px)] w-full max-w-lg flex-col border border-paper/10 bg-void/95 text-paper shadow-2xl sm:max-w-2xl lg:max-h-[min(90svh,900px)] ${
              WIDE_SECTIONS.includes(activeSection) ? 'lg:max-w-5xl xl:max-w-6xl' : 'lg:max-w-4xl xl:max-w-5xl'
            } ${bare ? 'overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#0d1117_0%,#07090c_60%,#0a0f0a_100%)]' : ''}`}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {bare ? (
              <>
                <button
                  type="button"
                  onClick={requestExit}
                  className="absolute top-4 right-4 z-30 flex size-10 items-center justify-center rounded-lg border border-paper/20 bg-void/40 backdrop-blur-md transition hover:border-accent hover:text-accent"
                  aria-label="Exit section"
                >
                  <X className="size-5" />
                </button>
                <div className="flex-1 overflow-y-auto">
                  <SectionBody id={activeSection} />
                </div>
              </>
            ) : (
              <>
            <div className="flex items-center justify-between border-b border-paper/10 px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex items-center gap-4">
                {activeSection === 'experience' && (
                  <span className="hidden size-14 shrink-0 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 text-accent shadow-[0_0_30px_-8px_rgba(200,245,66,0.6)] sm:flex">
                    <Briefcase className="size-6" />
                  </span>
                )}
                <div>
                  <h2
                    id="section-modal-title"
                    className="text-3xl font-extrabold tracking-tight sm:text-4xl"
                  >
                    <SectionTitle id={activeSection} />
                  </h2>
                  {subtitles[activeSection] && (
                    <p className="mt-1 text-sm text-paper/55 sm:text-base">
                      {subtitles[activeSection]}
                    </p>
                  )}
                </div>
              </div>
              {activeSection === 'experience' && (
                <span className="mr-4 ml-auto hidden items-center gap-2 rounded-full border border-accent/40 bg-accent/[0.06] px-4 py-1.5 text-sm font-semibold text-paper/85 sm:inline-flex">
                  <span className="size-2 rounded-full bg-accent shadow-[0_0_8px_#c8f542]" />
                  {experience.length} Experiences
                </span>
              )}
              {activeSection === 'skills' && (
                <p className="mr-4 ml-auto hidden -rotate-6 text-right font-hand text-xl leading-[1.05] font-bold text-paper/85 md:block">
                  Constantly
                  <br />
                  learning &amp; exploring
                  <br />
                  new technologies
                  <svg viewBox="0 0 40 30" className="mt-0.5 ml-auto size-7 text-accent" aria-hidden>
                    <path
                      d="M30 2 C 36 12, 32 22, 18 26 M18 26 l6 -6 M18 26 l8 2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </p>
              )}
              <button
                type="button"
                onClick={requestExit}
                className="flex size-10 items-center justify-center border border-paper/15 transition hover:border-accent hover:text-accent"
                aria-label="Exit section"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6 sm:py-7">
              <SectionBody id={activeSection} />
            </div>

            <div className="border-t border-paper/10 px-5 py-4 text-sm text-paper/55 sm:px-6">
              Click outside · Esc · or walk out the gate to return
            </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
