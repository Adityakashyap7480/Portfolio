import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/resume'
import { ProjectVisual } from './ProjectVisual'
import { Reveal, SectionEyebrow } from './motion'

export function Projects() {
  return (
    <section id="projects" className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <Reveal className="max-w-3xl">
          <SectionEyebrow>Selected work</SectionEyebrow>
          <h2 className="text-display text-4xl text-void sm:text-5xl">
            Products built for operations, payments, and platforms.
          </h2>
          <p className="mt-5 text-lg text-muted">
            Each engagement was treated like a product case — problem, role, stack, and contribution.
          </p>
        </Reveal>

        <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-32">
          {projects.map((project, index) => {
            const reverse = index % 2 === 1
            return (
              <article
                key={project.name}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  reverse ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <Reveal y={36}>
                  <ProjectVisual kind={project.visual} name={project.name} />
                </Reveal>

                <Reveal delay={0.1} className="lg:py-4">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-muted uppercase">
                    <span className="text-void">{project.index}</span>
                    <span className="h-px w-8 bg-void/15" aria-hidden />
                    <span>{project.domain}</span>
                  </div>

                  <h3 className="text-display mt-4 text-3xl text-void sm:text-4xl lg:text-5xl">
                    {project.name}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-void/55">{project.role}</p>

                  <div className="mt-8 space-y-5">
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.2em] text-muted uppercase">
                        Problem
                      </p>
                      <p className="mt-2 text-base leading-relaxed text-void/80">{project.problem}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.2em] text-muted uppercase">
                        Contribution
                      </p>
                      <p className="mt-2 text-base leading-relaxed text-void/80">
                        {project.contribution}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2.5">
                    {project.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:top-[0.55em] before:left-0 before:size-1 before:bg-accent"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-7 flex flex-wrap gap-x-3 gap-y-2 border-t border-void/10 pt-6">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="text-xs font-medium text-void/55 after:ml-3 after:text-void/20 after:content-['/'] last:after:content-none"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {(project.liveUrl || project.githubUrl) && (
                    <div className="mt-6 flex flex-wrap gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor="interactive"
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-void transition hover:text-void/60"
                        >
                          {project.liveLabel ?? 'Live project'} <ArrowUpRight className="size-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor="interactive"
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-void transition hover:text-void/60"
                        >
                          GitHub <ArrowUpRight className="size-4" />
                        </a>
                      )}
                    </div>
                  )}
                </Reveal>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
