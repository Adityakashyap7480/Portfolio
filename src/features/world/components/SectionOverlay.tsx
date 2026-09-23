import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Download, Mail, Phone, X } from 'lucide-react'
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skillEcosystem,
} from '../../../shared/data/resume'
import { useExperience } from '../context/ExperienceContext'
import type { SectionId } from '../data/gates'

function SectionBody({ id }: { id: SectionId }) {
  switch (id) {
    case 'about':
      return (
        <div className="space-y-5">
          <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">
            {profile.role} · {profile.experience}
          </p>
          {profile.story.map((p) => (
            <p key={p} className="text-base leading-relaxed text-paper/80">
              {p}
            </p>
          ))}
          <div className="border-t border-paper/10 pt-4">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-muted uppercase">
              Education
            </p>
            {education.map((item) => (
              <div key={item.school} className="mt-2">
                <p className="text-xs text-accent">{item.period}</p>
                <h3 className="font-bold">{item.school}</h3>
                <p className="text-sm text-paper/65">{item.degree}</p>
              </div>
            ))}
            {certifications.map((item) => (
              <div key={item.title} className="mt-3">
                <p className="text-xs text-accent">{item.period}</p>
                <h3 className="font-bold">{item.org}</h3>
                <p className="text-sm text-paper/65">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      )
    case 'skills':
      return (
        <div className="grid gap-5 sm:grid-cols-2">
          {skillEcosystem.map((group) => (
            <div key={group.id} className="border border-paper/10 p-4">
              <h3 className="text-sm font-bold tracking-[0.18em] text-accent uppercase">
                {group.title}
              </h3>
              <p className="mt-2 text-xs text-paper/50">{group.description}</p>
              <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-paper/85">
                    {item}
                    <span className="mx-1.5 text-paper/20">/</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    case 'experience':
      return (
        <div className="space-y-7">
          {experience.map((job) => (
            <div key={job.company} className="border-t border-paper/10 pt-5 first:border-0 first:pt-0">
              <p className="text-xs font-semibold text-accent">{job.period}</p>
              <h3 className="mt-1 text-xl font-extrabold">{job.company}</h3>
              <p className="text-sm text-paper/55">
                {job.role} · {job.focus}
              </p>
              <ul className="mt-3 space-y-2">
                {job.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="text-sm leading-relaxed text-paper/75">
                    • {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    case 'projects':
      return (
        <div className="space-y-7">
          {projects.map((project) => (
            <div key={project.name} className="border-t border-paper/10 pt-5 first:border-0 first:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-extrabold">{project.name}</h3>
                <span className="text-xs tracking-widest text-paper/45 uppercase">
                  {project.domain}
                </span>
              </div>
              <p className="mt-2 text-sm text-paper/75">{project.problem}</p>
              <p className="mt-2 text-sm text-paper/60">{project.contribution}</p>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-accent"
                >
                  View staging <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      )
    case 'contact':
      return (
        <div className="space-y-5">
          <p className="text-base text-paper/75">
            Open to full-stack roles and collaborations. Walk back through the gate to return to the
            world — or use the links below.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-3 bg-accent px-4 py-3 text-sm font-bold text-accent-ink"
            >
              <Mail className="size-4" />
              {profile.email}
            </a>
            <a
              href={profile.phoneHref}
              className="inline-flex items-center gap-3 border border-paper/15 px-4 py-3 text-sm font-semibold"
            >
              <Phone className="size-4" />
              {profile.phone}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 border border-paper/15 px-4 py-3 text-sm font-semibold"
            >
              LinkedIn <ArrowUpRight className="size-4" />
            </a>
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className="inline-flex items-center gap-3 border border-paper/15 px-4 py-3 text-sm font-semibold"
            >
              <Download className="size-4" />
              Download resume
            </a>
          </div>
        </div>
      )
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

export function SectionOverlay() {
  const { mode, activeSection, requestExit } = useExperience()
  const open = mode === 'inside' && activeSection

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
          {/* Backdrop — click outside to exit */}
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
            className="relative z-10 flex max-h-[min(88svh,820px)] w-full max-w-lg flex-col border border-paper/10 bg-void/95 text-paper shadow-2xl sm:max-w-2xl lg:max-h-[min(90svh,900px)] lg:max-w-4xl xl:max-w-5xl"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-paper/10 px-5 py-4">
              <h2 id="section-modal-title" className="text-2xl font-extrabold tracking-tight">
                {titles[activeSection]}
              </h2>
              <button
                type="button"
                onClick={requestExit}
                className="flex size-10 items-center justify-center border border-paper/15 transition hover:border-accent hover:text-accent"
                aria-label="Exit section"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <SectionBody id={activeSection} />
            </div>

            <div className="border-t border-paper/10 px-5 py-4 text-xs text-paper/50">
              Click outside · Esc · or walk out the gate to return
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
