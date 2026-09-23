import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Download, Mail, Phone, X } from 'lucide-react'
import aboutPortrait from '../../../assets/Aditya_Kashyap_About.png'
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
import { SkillIcon } from './SkillIcon'

function SectionBody({ id }: { id: SectionId }) {
  switch (id) {
    case 'about':
      return (
        <div className="space-y-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
            <img
              src={aboutPortrait}
              alt={profile.name}
              width={400}
              height={400}
              decoding="async"
              className="aspect-square w-36 shrink-0 object-cover object-[center_20%] sm:w-48"
              style={{ transform: 'translateZ(0)' }}
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-3xl font-extrabold tracking-tight">{profile.name}</h3>
              <p className="mt-1.5 text-base font-semibold tracking-[0.14em] text-accent uppercase">
                {profile.role} · {profile.experience}
              </p>
              <p className="mt-3 text-base leading-relaxed text-paper/75 sm:text-lg">
                {profile.positioning}
              </p>
              <p className="mt-3 text-base font-medium leading-relaxed tracking-wide text-paper/75 sm:text-lg">
                Web · Mobile · Python · AI / GenAI
              </p>
            </div>
          </div>

          <div className="space-y-4 border-t border-paper/10 pt-5">
            {profile.story.map((p) => (
              <p key={p} className="text-base leading-relaxed text-paper/85 sm:text-lg">
                {p}
              </p>
            ))}
          </div>

          <div className="border-t border-paper/10 pt-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase sm:text-sm">
              Education
            </p>
            {education.map((item) => (
              <div key={item.school} className="mt-3">
                <p className="text-sm font-semibold text-accent">{item.period}</p>
                <h3 className="text-lg font-bold">{item.school}</h3>
                <p className="text-base text-paper/70">{item.degree}</p>
              </div>
            ))}
            {certifications.map((item) => (
              <div key={item.title} className="mt-4">
                <p className="text-sm font-semibold text-accent">{item.period}</p>
                <h3 className="text-lg font-bold">{item.org}</h3>
                <p className="text-base text-paper/70">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      )
    case 'skills':
      return (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {skillEcosystem.map((group) => (
            <div
              key={group.id}
              className={`flex flex-col border border-paper/12 bg-paper/[0.03] p-4 sm:p-5 ${
                group.id === 'technology' ? 'sm:col-span-2' : ''
              }`}
            >
              <h3 className="text-base font-bold tracking-[0.16em] text-accent uppercase">
                {group.title}
              </h3>
              <p className="mt-1.5 text-sm leading-snug text-paper/60">{group.description}</p>
              <ul className="mt-4 flex flex-1 flex-wrap content-start gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 border border-paper/15 bg-paper/5 px-3 py-1.5 text-sm font-medium text-paper/90"
                  >
                    <SkillIcon name={item} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    case 'experience':
      return (
        <div className="space-y-8">
          {experience.map((job) => (
            <div key={job.company} className="border-t border-paper/10 pt-5 first:border-0 first:pt-0">
              <p className="text-sm font-semibold text-accent">{job.period}</p>
              <h3 className="mt-1 text-2xl font-extrabold">{job.company}</h3>
              <p className="mt-1 text-base text-paper/60">
                {job.role} · {job.focus}
              </p>
              <ul className="mt-4 space-y-2.5">
                {job.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="text-base leading-relaxed text-paper/80">
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
        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.name} className="border-t border-paper/10 pt-5 first:border-0 first:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase sm:text-sm">
                    {project.index} · {project.role}
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold tracking-tight">{project.name}</h3>
                </div>
                <span className="text-xs font-semibold tracking-[0.14em] text-paper/50 uppercase sm:text-sm">
                  {project.domain}
                </span>
              </div>

              <ul className="mt-4 space-y-2.5">
                {project.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2.5 text-base leading-relaxed text-paper/80"
                  >
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center gap-1.5 border border-paper/12 bg-paper/5 px-3 py-1.5 text-sm font-medium text-paper/85"
                  >
                    <SkillIcon name={tech} />
                    {tech}
                  </li>
                ))}
              </ul>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-base font-bold text-accent transition hover:brightness-110"
                >
                  {project.liveLabel ?? 'View project'} <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      )
    case 'contact':
      return (
        <div className="space-y-6">
          <p className="text-base text-paper/80 sm:text-lg">
            Open to full-stack roles and collaborations. Walk back through the gate to return to the
            world — or use the links below.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-3 bg-accent px-4 py-3.5 text-base font-bold text-accent-ink"
            >
              <Mail className="size-5" />
              {profile.email}
            </a>
            <a
              href={profile.phoneHref}
              className="inline-flex items-center gap-3 border border-paper/15 px-4 py-3.5 text-base font-semibold"
            >
              <Phone className="size-5" />
              {profile.phone}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 border border-paper/15 px-4 py-3.5 text-base font-semibold"
            >
              LinkedIn <ArrowUpRight className="size-5" />
            </a>
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className="inline-flex items-center gap-3 border border-paper/15 px-4 py-3.5 text-base font-semibold"
            >
              <Download className="size-5" />
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
            <div className="flex items-center justify-between border-b border-paper/10 px-5 py-4 sm:px-6 sm:py-5">
              <h2
                id="section-modal-title"
                className="text-3xl font-extrabold tracking-tight sm:text-4xl"
              >
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

            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6 sm:py-7">
              <SectionBody id={activeSection} />
            </div>

            <div className="border-t border-paper/10 px-5 py-4 text-sm text-paper/55 sm:px-6">
              Click outside · Esc · or walk out the gate to return
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
