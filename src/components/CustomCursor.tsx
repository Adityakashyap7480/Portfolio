import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '../hooks/useActiveSection'

export function CustomCursor() {
  const reduce = useReducedMotion()
  const isFine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isFine || reduce) return

    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const interactive = target?.closest('a, button, [data-cursor="interactive"]')
      setHovering(Boolean(interactive))
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [isFine, reduce])

  if (!isFine || reduce) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[70] mix-blend-difference"
      animate={{
        x: pos.x - (hovering ? 22 : 6),
        y: pos.y - (hovering ? 22 : 6),
        width: hovering ? 44 : 12,
        height: hovering ? 44 : 12,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.35 }}
      aria-hidden
    >
      <div className="h-full w-full rounded-full bg-paper" />
    </motion.div>
  )
}
