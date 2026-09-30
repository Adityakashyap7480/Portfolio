import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export type LightboxImage = { src: string; name: string }

export function ImageLightbox({
  image,
  onClose,
}: {
  image: LightboxImage | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!image) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopPropagation()
      onClose()
    }
    // capture so Esc closes the preview without also exiting the section
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [image, onClose])

  return createPortal(
    <AnimatePresence>
      {image && (
        <motion.div
          className="pointer-events-auto fixed inset-0 z-[60] flex items-center justify-center bg-void/85 p-4 backdrop-blur-sm sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.figure
            className="relative w-full max-w-6xl"
            initial={{ scale: 0.94, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image.src}
              alt={`${image.name} screenshot`}
              className="w-full rounded-xl border border-paper/15 shadow-2xl"
            />
            <figcaption className="mt-3 text-center text-sm font-semibold text-paper/70">
              {image.name}
            </figcaption>
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-3 -right-3 flex size-10 items-center justify-center rounded-full border border-paper/20 bg-void text-paper transition hover:border-accent hover:text-accent"
              aria-label="Close preview"
            >
              <X className="size-4" />
            </button>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
