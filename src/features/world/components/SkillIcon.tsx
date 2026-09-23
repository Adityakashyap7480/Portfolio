import { getBrandIcon } from '../data/skillBrands'

const ICON_SIZE = 'size-4'

function isDarkHex(hex: string): boolean {
  const n = parseInt(hex.replace('#', ''), 16)
  if (Number.isNaN(n)) return false
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.28
}

export function SkillIcon({ name, className = '' }: { name: string; className?: string }) {
  const icon = getBrandIcon(name)
  if (!icon) return null

  if (icon.svg) {
    return (
      <span
        role="img"
        aria-label={icon.title}
        className={`inline-flex ${ICON_SIZE} shrink-0 [&>svg]:size-full ${className}`}
        dangerouslySetInnerHTML={{ __html: icon.svg }}
      />
    )
  }

  const dark = isDarkHex(icon.hex)

  const mark = (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-hidden
      className={`${dark ? 'size-2.5' : ICON_SIZE} shrink-0 ${className}`}
      fill={`#${icon.hex}`}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  )

  if (!dark) return mark

  return (
    <span
      className={`inline-flex ${ICON_SIZE} shrink-0 items-center justify-center rounded-[2px] bg-paper`}
      aria-hidden
    >
      {mark}
    </span>
  )
}
