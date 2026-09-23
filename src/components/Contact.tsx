import { ArrowUpRight, Download, Mail, Phone } from 'lucide-react'
import { profile } from '../data/resume'
import { MagneticButton } from './MagneticButton'
import { Reveal, SectionEyebrow } from './motion'

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-void py-24 text-paper sm:py-32">
      <div className="bg-grid-fine-light absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <Reveal className="max-w-4xl">
          <SectionEyebrow>
            <span className="text-muted-light">Contact</span>
          </SectionEyebrow>
          <h2 className="text-display text-[clamp(2.4rem,7vw,5.5rem)] text-paper">
            Let&apos;s build something that matters.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-light">
            Open to full-stack roles, product collaborations, and conversations about platforms that
            need to ship cleanly and scale with real usage.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <MagneticButton
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-3 bg-accent px-6 py-4 text-sm font-bold text-accent-ink transition hover:brightness-110"
          >
            <Mail className="size-4" />
            {profile.email}
          </MagneticButton>

          <MagneticButton
            href={profile.phoneHref}
            className="inline-flex items-center gap-3 border border-paper/15 px-6 py-4 text-sm font-semibold text-paper transition hover:border-accent hover:text-accent"
          >
            <Phone className="size-4" />
            {profile.phone}
          </MagneticButton>

          <MagneticButton
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            className="inline-flex items-center gap-3 border border-paper/15 px-6 py-4 text-sm font-semibold text-paper transition hover:border-accent hover:text-accent"
          >
            <Download className="size-4" />
            Download resume
          </MagneticButton>

          <MagneticButton
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 border border-paper/15 px-6 py-4 text-sm font-semibold text-paper transition hover:border-accent hover:text-accent"
          >
            LinkedIn
            <ArrowUpRight className="size-4" />
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
