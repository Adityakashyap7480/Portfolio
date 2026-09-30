import { Maximize2 } from 'lucide-react'

type TiltedScreenshotProps = {
  src: string
  alt: string
  /** 6-digit hex used for glow and rim light */
  color?: string
  onExpand?: () => void
  /** Show a phone mockup overlay, cropped to this object-position */
  phoneFocus?: string
}

export function TiltedScreenshot({
  src,
  alt,
  color = '#c8f542',
  onExpand,
  phoneFocus,
}: TiltedScreenshotProps) {
  return (
    <button
      type="button"
      onClick={onExpand}
      className="relative block w-full text-left lg:-my-4 lg:-mr-24 lg:w-[calc(100%+6rem)]"
      aria-label={`Expand ${alt}`}
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[85%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px] transition-opacity duration-500 group-hover:opacity-100 lg:opacity-80"
        style={{ background: `${color}40` }}
        aria-hidden
      />

      <div className="relative transition-transform duration-700 ease-out [transform-origin:left_center] lg:[transform:perspective(1600px)_rotateY(-16deg)_rotateX(5deg)_rotateZ(-1deg)] lg:group-hover:[transform:perspective(1600px)_rotateY(-10deg)_rotateX(3deg)_rotateZ(-0.5deg)_translateY(-4px)]">
        <div
          className="relative rounded-[22px] border border-paper/15 bg-gradient-to-br from-[#1a1d1b] via-[#0b0d0c] to-[#050605] p-2 sm:p-2.5"
          style={{
            boxShadow: `0 0 0 1px ${color}2e, -30px 40px 90px -30px ${color}73, 0 40px 80px -30px rgba(0,0,0,0.95)`,
          }}
        >
          <span
            className="pointer-events-none absolute -bottom-px left-6 h-[2px] w-2/3 rounded-full blur-[1px]"
            style={{ background: `linear-gradient(to right, ${color}, ${color}99, transparent)` }}
            aria-hidden
          />
          <span
            className="pointer-events-none absolute top-8 -left-px h-2/3 w-[2px] rounded-full blur-[1px]"
            style={{ background: `linear-gradient(to bottom, transparent, ${color}b3, transparent)` }}
            aria-hidden
          />

          <div className="relative overflow-hidden rounded-[14px] bg-void">
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="block aspect-[1024/488] w-full object-cover object-top"
            />
            <span
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.08)_0%,transparent_35%,transparent_70%,rgba(0,0,0,0.35)_100%)]"
              aria-hidden
            />
            {onExpand && (
              <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-paper/15 bg-void/80 px-3 py-1.5 text-[11px] font-semibold text-paper opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                <Maximize2 className="size-3" />
                Expand
              </span>
            )}
          </div>
        </div>

        {phoneFocus && (
          <div
            className="absolute right-[18%] -bottom-[4%] hidden w-[22%] rounded-[20px] border border-paper/20 bg-[#050605] p-1.5 sm:block"
            style={{
              boxShadow: `0 0 0 1px ${color}40, 0 25px 50px -15px rgba(0,0,0,0.9), 0 0 40px -10px ${color}80`,
            }}
            aria-hidden
          >
            <span className="absolute top-2.5 left-1/2 z-10 h-1.5 w-8 -translate-x-1/2 rounded-full bg-void" />
            <div className="overflow-hidden rounded-[15px] bg-void">
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="block aspect-[9/19] w-full object-cover"
                style={{ objectPosition: phoneFocus }}
              />
            </div>
          </div>
        )}
      </div>
    </button>
  )
}
