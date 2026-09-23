import portrait from '../assets/Passport_size_photo.jpeg'
import { certifications, education, profile } from '../data/resume'
import { Reveal, SectionEyebrow } from './motion'

export function About() {
  return (
    <section id="about" className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <Reveal>
            <div className="relative mx-auto w-full max-w-[320px] lg:mx-0 lg:max-w-none">
              <div className="absolute -top-3 -left-3 h-20 w-20 border-t border-l border-accent" aria-hidden />
              <div className="absolute -right-3 -bottom-3 h-20 w-20 border-r border-b border-void/20" aria-hidden />
              <div className="relative aspect-[4/5] overflow-hidden border border-void/10 bg-paper-soft">
                <img
                  src={portrait}
                  alt={`${profile.name} — portrait`}
                  width={640}
                  height={800}
                  className="h-full w-full object-cover object-[center_18%]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="mt-4 text-[11px] font-semibold tracking-[0.22em] text-muted uppercase">
                {profile.name} · {profile.location}
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionEyebrow>About</SectionEyebrow>
              <h2 className="text-display text-4xl text-void sm:text-5xl lg:text-[3.5rem]">
                From building software to shipping business-critical products.
              </h2>
            </Reveal>

            <div className="mt-8 space-y-7">
              {profile.story.map((paragraph, i) => (
                <Reveal key={paragraph} delay={0.08 + i * 0.06}>
                  <p className="text-lg leading-relaxed text-void/80 sm:text-xl">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-8 border-t border-void/10 pt-12 md:grid-cols-2">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.24em] text-muted uppercase">
              Education
            </p>
            {education.map((item) => (
              <div key={item.school} className="mt-5">
                <p className="text-sm text-muted">{item.period}</p>
                <h3 className="mt-1 text-xl font-bold tracking-tight text-void">{item.school}</h3>
                <p className="mt-1 text-base text-void/70">{item.degree}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-[11px] font-semibold tracking-[0.24em] text-muted uppercase">
              Certification
            </p>
            {certifications.map((item) => (
              <div key={item.title} className="mt-5">
                <p className="text-sm text-muted">{item.period}</p>
                <h3 className="mt-1 text-xl font-bold tracking-tight text-void">{item.org}</h3>
                <p className="mt-1 text-base text-void/70">{item.title}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
