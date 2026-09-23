import { ArrowUp } from 'lucide-react'
import { profile } from '../data/resume'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-paper/10 bg-void text-paper">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-10">
        <div>
          <p className="text-lg font-extrabold tracking-tight">{profile.name}</p>
          <p className="mt-1 text-sm text-muted-light">
            {profile.role} · {profile.experience} · {profile.location}
          </p>
          <div className="mt-4 flex gap-5 text-sm font-medium text-muted-light">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-accent"
              data-cursor="interactive"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="transition hover:text-accent"
              data-cursor="interactive"
            >
              Email
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
          <p className="text-xs text-muted-light">© {year} {profile.name}</p>
          <a
            href="#top"
            data-cursor="interactive"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-paper uppercase transition hover:text-accent"
          >
            Back to top
            <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
