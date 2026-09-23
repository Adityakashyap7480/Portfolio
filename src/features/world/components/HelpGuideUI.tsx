import { HelpCircle, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useExperience } from '../context/ExperienceContext'
import { GATES } from '../data/gates'

export function HelpGuideUI() {
  const {
    mode,
    guidePhase,
    showFirstVisitPrompt,
    showWelcomeIntro,
    startGuide,
    cancelGuide,
    selectGuideSection,
    dismissFirstVisitPrompt,
    acceptFirstVisitGuide,
  } = useExperience()

  const showHelpBtn = mode === 'hub' && guidePhase === 'idle' && !showWelcomeIntro
  const showAsking = guidePhase === 'asking'
  const showLeading = guidePhase === 'leading'
  const showSummoning = guidePhase === 'summoning'

  return (
    <>
      {/* Help button — right side */}
      {showHelpBtn && (
        <button
          type="button"
          onClick={startGuide}
          className="pointer-events-auto fixed top-1/2 right-4 z-[35] flex -translate-y-1/2 flex-col items-center gap-1 border border-void/10 bg-paper/95 px-3 py-3 text-void shadow-lg backdrop-blur-md transition hover:border-accent sm:right-6"
        >
          <HelpCircle className="size-5 text-accent-ink" fill="#c8f542" />
          <span className="text-[10px] font-extrabold tracking-[0.18em] uppercase">Help</span>
        </button>
      )}

      {/* First-visit prompt */}
      <AnimatePresence>
        {showFirstVisitPrompt &&
          mode === 'hub' &&
          guidePhase === 'idle' &&
          !showWelcomeIntro && (
          <motion.div
            className="pointer-events-auto fixed bottom-24 left-1/2 z-40 w-[min(92vw,360px)] -translate-x-1/2 border border-void/10 bg-paper/95 p-4 text-void shadow-xl backdrop-blur-md sm:bottom-28"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <p className="text-base font-extrabold tracking-tight">Need a guide?</p>
            <p className="mt-1 text-sm text-muted">
              A helper can run over and walk you to any section.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={acceptFirstVisitGuide}
                className="flex-1 bg-accent px-3 py-2.5 text-sm font-bold text-accent-ink"
              >
                Yes, guide me
              </button>
              <button
                type="button"
                onClick={dismissFirstVisitPrompt}
                className="border border-void/15 px-3 py-2.5 text-sm font-semibold"
              >
                No thanks
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summoning / leading status */}
      <AnimatePresence>
        {(showSummoning || showLeading) && (
          <motion.div
            className="pointer-events-auto fixed bottom-24 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 border border-void/10 bg-paper/95 px-4 py-2.5 text-void shadow-lg backdrop-blur-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-sm font-semibold">
              {showSummoning
                ? 'Guide is running to you…'
                : 'Follow the guide · press WASD to cancel'}
            </p>
            <button
              type="button"
              onClick={cancelGuide}
              className="text-[10px] font-bold tracking-wide text-muted uppercase hover:text-void"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Asking modal */}
      <AnimatePresence>
        {showAsking && (
          <motion.div
            className="pointer-events-auto fixed inset-0 z-40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-void/45"
              aria-label="Close help"
              onClick={cancelGuide}
            />
            <motion.div
              className="relative z-10 w-full max-w-md border border-paper/10 bg-void/95 p-5 text-paper shadow-2xl"
              initial={{ scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 8 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                    Guide
                  </p>
                  <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
                    Where would you like to go?
                  </h2>
                  <p className="mt-1 text-base text-paper/65">
                    Select a section — I&apos;ll lead you there.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={cancelGuide}
                  className="flex size-9 items-center justify-center border border-paper/15 hover:border-accent"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {GATES.map((gate) => (
                  <button
                    key={gate.id}
                    type="button"
                    onClick={() => selectGuideSection(gate.id)}
                    className="border border-paper/12 px-4 py-3 text-left transition hover:border-accent hover:bg-paper/5"
                  >
                    <span
                      className="mb-1 block size-2"
                      style={{ background: gate.color }}
                    />
                    <span className="text-base font-bold tracking-wide uppercase">{gate.label}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={cancelGuide}
                className="mt-4 w-full text-center text-xs font-semibold text-paper/45 hover:text-paper"
              >
                Skip — I&apos;ll explore myself
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
