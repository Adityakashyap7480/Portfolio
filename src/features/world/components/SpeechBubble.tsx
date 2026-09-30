import { Html } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'

type SpeechBubbleProps = {
  text: string
  visible: boolean
  accent?: boolean
  y?: number
}

export function SpeechBubble({ text, visible, accent = false, y = 2.9 }: SpeechBubbleProps) {
  return (
    <Html position={[0, y, 0]} center zIndexRange={[30, 0]} style={{ pointerEvents: 'none' }}>
      <AnimatePresence>
        {visible && (
          <motion.div
            className={`relative w-max max-w-[220px] border px-3 py-2 text-sm font-bold leading-snug shadow-xl ${
              accent
                ? 'border-void/20 bg-accent text-accent-ink'
                : 'border-paper/15 bg-void/95 text-paper'
            }`}
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
          >
            {text}
            <span
              className={`absolute top-full left-1/2 size-0 -translate-x-1/2 border-x-[7px] border-t-[8px] border-x-transparent ${
                accent ? 'border-t-accent' : 'border-t-void'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  )
}
