import { motion } from 'framer-motion'
import {
  Briefcase,
  Check,
  Copy,
  Download,
  ExternalLink,
  Mail,
  Phone,
  Send,
  type LucideIcon,
} from 'lucide-react'
import { siWhatsapp } from 'simple-icons'
import { useState, type ReactNode } from 'react'
import { profile } from '../../../../shared/data/resume'
import { PortraitBackdrop } from '../shared/PortraitBackdrop'

const WHATSAPP_URL = `https://wa.me/${profile.phoneHref.replace(/\D/g, '')}`

function LinkedInMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  )
}

function WhatsAppMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={`#${siWhatsapp.hex}`} aria-hidden>
      <path d={siWhatsapp.path} />
    </svg>
  )
}

type Action = {
  label: string
  href: string
  icon: ReactNode
  external?: boolean
  download?: string
}

type ContactRowProps = {
  color: string
  icon: LucideIcon | ((p: { className?: string }) => ReactNode)
  label: string
  title: ReactNode
  note: string
  action: Action
  featured?: boolean
  index: number
}

function ContactRow({ color, icon: Icon, label, title, note, action, featured, index }: ContactRowProps) {
  return (
    <motion.div
      className="group relative flex flex-wrap items-center gap-4 rounded-2xl border p-4 transition-[border-color,box-shadow] duration-300 sm:flex-nowrap sm:p-5"
      style={{
        borderColor: featured ? `${color}73` : 'rgba(243,242,238,0.1)',
        background: featured
          ? `linear-gradient(120deg, ${color}1f 0%, ${color}08 45%, rgba(255,255,255,0.02) 100%)`
          : 'rgba(255,255,255,0.025)',
        boxShadow: featured ? `0 0 0 1px ${color}1a, 0 20px 50px -25px ${color}80` : undefined,
      }}
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + index * 0.07, type: 'spring', stiffness: 260, damping: 26 }}
      whileHover={{ x: 3 }}
    >
      {!featured && (
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${color}66, 0 16px 40px -24px ${color}80` }}
          aria-hidden
        />
      )}

      <span
        className="flex size-14 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105"
        style={{
          color,
          borderColor: `${color}59`,
          background: `linear-gradient(135deg, ${color}33, ${color}0a)`,
          boxShadow: `0 0 26px -8px ${color}99`,
        }}
      >
        <Icon className="size-6" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color }}>
          {label}
        </p>
        <div className="mt-0.5 text-lg font-bold text-paper sm:text-xl">{title}</div>
        <p className="mt-0.5 text-sm text-paper/55">{note}</p>
      </div>

      <a
        href={action.href}
        target={action.external ? '_blank' : undefined}
        rel={action.external ? 'noreferrer' : undefined}
        download={action.download}
        className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border bg-(--btn-soft) px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-(--btn) hover:text-void sm:w-auto"
        style={{
          borderColor: `${color}66`,
          ['--btn' as string]: color,
          ['--btn-soft' as string]: `${color}14`,
        }}
      >
        {action.label}
        {action.icon}
      </a>
    </motion.div>
  )
}

function CopyableEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="truncate">{profile.email}</span>
      <button
        type="button"
        onClick={copy}
        className="flex size-7 shrink-0 items-center justify-center rounded-md text-paper/50 transition hover:bg-paper/10 hover:text-paper"
        aria-label={copied ? 'Email copied' : 'Copy email'}
        title={copied ? 'Copied!' : 'Copy email'}
      >
        {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
      </button>
    </span>
  )
}

export function ContactShowcase() {
  return (
    <div className="relative grid md:grid-cols-[1.45fr_1fr]">
      <div
        className="pointer-events-none absolute -top-32 -left-24 size-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <div className="relative p-6 sm:p-9">
        <div
          className="absolute top-10 right-10 hidden h-10 w-16 md:block"
          style={{
            backgroundImage: 'radial-gradient(rgba(243,242,238,0.22) 1px, transparent 1.2px)',
            backgroundSize: '9px 9px',
          }}
          aria-hidden
        />

        <p className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] text-paper/70 uppercase">
          <span className="size-2 rounded-full bg-accent shadow-[0_0_8px_#c8f542]" />
          Let&apos;s connect
          <span className="h-px w-8 bg-paper/40" />
        </p>

        <h2 id="section-modal-title" className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Get In{' '}
          <span className="bg-gradient-to-r from-accent to-[#4ade80] bg-clip-text text-transparent">
            Touch
          </span>
        </h2>

        <p className="mt-3 max-w-lg text-base leading-relaxed text-paper/65">
          Open to full-stack roles, collaborations, and exciting opportunities. Feel free to reach out
          — I&apos;d love to hear from you!
        </p>

        <div className="mt-7 space-y-3">
          <ContactRow
            index={0}
            featured
            color="#4ade80"
            icon={Mail}
            label="Email"
            title={<CopyableEmail />}
            note="Drop a message anytime — I usually reply within 24 hours."
            action={{
              label: 'Send Email',
              href: `mailto:${profile.email}`,
              icon: <Send className="size-4" />,
            }}
          />
          <ContactRow
            index={1}
            color="#60a5fa"
            icon={Phone}
            label="Phone"
            title={
              <a href={profile.phoneHref} className="hover:underline">
                {profile.phone}
              </a>
            }
            note="Available for calls and WhatsApp."
            action={{
              label: 'Call / WhatsApp',
              href: WHATSAPP_URL,
              icon: <WhatsAppMark className="size-4" />,
              external: true,
            }}
          />
          <ContactRow
            index={2}
            color="#38bdf8"
            icon={LinkedInMark}
            label="LinkedIn"
            title="View my LinkedIn Profile"
            note="Let's connect professionally."
            action={{
              label: 'Visit Profile',
              href: profile.linkedin,
              icon: <ExternalLink className="size-4" />,
              external: true,
            }}
          />
          <ContactRow
            index={3}
            color="#a78bfa"
            icon={Download}
            label="Resume"
            title="Download Resume"
            note="Get a detailed overview of my experience."
            action={{
              label: 'Download PDF',
              href: profile.resumeUrl,
              icon: <Download className="size-4" />,
              download: profile.resumeFileName,
            }}
          />
        </div>
      </div>

      <div className="relative hidden min-h-[600px] md:block">
        <PortraitBackdrop halo />

        <motion.div
          className="absolute top-12 left-[20%] z-10 -rotate-[8deg] font-hand text-[1.65rem] leading-[1.05] font-bold text-paper drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          Let&apos;s build
          <br />
          something amazing
          <br />
          <span className="ml-6">together!</span>
          <svg viewBox="0 0 40 40" className="mt-1 size-9 text-accent" aria-hidden>
            <path
              d="M24 2 C 10 10, 6 22, 12 36 M12 36 l-5 -7 M12 36 l7 -4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute right-6 bottom-6 left-[12%] z-10 rounded-2xl border border-accent/40 bg-void/80 p-4 shadow-[0_0_40px_-12px_rgba(200,245,66,0.5)] backdrop-blur-md"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold text-paper/65">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#4ade80] opacity-75" />
                  <span className="relative size-2 rounded-full bg-[#4ade80]" />
                </span>
                Currently Open To
              </p>
              <p className="mt-1.5 text-lg font-bold text-paper">Full Stack Developer Roles</p>
            </div>
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
              <Briefcase className="size-5" />
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-paper/60">
            Open to exciting opportunities, freelance projects, and collaborations.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
