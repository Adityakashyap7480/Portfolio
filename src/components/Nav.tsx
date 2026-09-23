import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/resume'
import { useActiveSection } from '../hooks/useActiveSection'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(navLinks.map((l) => l.id))

  // Transparent over dark hero → light text; frosted bar on scroll → dark text
  const onDark = !scrolled && !open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'glass-nav border-b border-void/8'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <a
          href="#top"
          className={`group relative text-sm font-extrabold tracking-tight transition-colors ${
            onDark ? 'text-paper' : 'text-void'
          }`}
          data-cursor="interactive"
        >
          {profile.initials}
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-cursor="interactive"
                  className={`relative text-[13px] font-medium transition-colors ${
                    onDark
                      ? isActive
                        ? 'text-paper'
                        : 'text-paper/55 hover:text-paper'
                      : isActive
                        ? 'text-void'
                        : 'text-muted hover:text-void'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            data-cursor="interactive"
            className={`hidden text-[13px] font-semibold transition md:inline ${
              onDark ? 'text-paper hover:text-accent' : 'text-void hover:text-void/70'
            }`}
          >
            Resume
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            data-cursor="interactive"
            className={`hidden text-[13px] font-semibold transition sm:inline ${
              onDark ? 'text-paper hover:text-accent' : 'text-void hover:text-void/70'
            }`}
          >
            LinkedIn
          </a>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute h-px w-5 transition ${
                onDark ? 'bg-paper' : 'bg-void'
              } ${open ? 'translate-y-0 rotate-45' : '-translate-y-1.5'}`}
            />
            <span
              className={`absolute h-px w-5 transition ${
                onDark ? 'bg-paper' : 'bg-void'
              } ${open ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`absolute h-px w-5 transition ${
                onDark ? 'bg-paper' : 'bg-void'
              } ${open ? 'translate-y-0 -rotate-45' : 'translate-y-1.5'}`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-void/8 bg-paper md:hidden">
          <ul className="flex flex-col px-5 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-2xl font-bold tracking-tight text-void"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.resumeUrl}
                download={profile.resumeFileName}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg font-semibold text-muted"
              >
                Download resume
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="block py-3 text-lg font-semibold text-muted"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
