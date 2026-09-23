import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  if (reduce) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
