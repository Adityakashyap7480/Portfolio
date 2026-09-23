import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import {
  useRef,
  type MouseEvent,
  type ReactNode,
} from 'react'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  target?: string
  rel?: string
  download?: string | boolean
  strength?: number
}

export function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  target,
  rel,
  download,
  strength = 0.35,
}: MagneticButtonProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 280, damping: 22, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 280, damping: 22, mass: 0.4 })

  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const shared = {
    ref: ref as never,
    className,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: { x: springX, y: springY },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        download={download}
        data-cursor="interactive"
        {...shared}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" onClick={onClick} data-cursor="interactive" {...shared}>
      {children}
    </motion.button>
  )
}
