import { ArrowRight, Compass, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useExperience } from "../context/ExperienceContext";
import { GuideSectionPicker } from "./GuideSectionPicker";

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
  } = useExperience();

  const showHelpBtn =
    mode === "hub" && guidePhase === "idle" && !showWelcomeIntro;

  useEffect(() => {
    if (!showHelpBtn) return;
    const onKey = (e: KeyboardEvent) => {
      if (
        e.code === "KeyH" &&
        !e.repeat &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      )
        startGuide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showHelpBtn, startGuide]);
  const showAsking = guidePhase === "asking";
  const showLeading = guidePhase === "leading";
  const showSummoning = guidePhase === "summoning";

  return (
    <>
      {/* Help button — right side */}
      <AnimatePresence>
        {showHelpBtn && (
          <motion.div
            className="pointer-events-auto fixed top-1/2 right-4 z-[35] -translate-y-1/2 sm:right-6"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <motion.button
              type="button"
              onClick={startGuide}
              aria-label="Open guide (H)"
              className="group relative cursor-pointer flex flex-col items-center gap-2 rounded-2xl border border-accent/40 bg-void/85 px-3 pt-3 pb-2.5 text-paper shadow-[0_0_30px_-8px_rgba(200,245,66,0.55)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_0_44px_-6px_rgba(200,245,66,0.85)]"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileTap={{ scale: 0.94 }}
            >
              <span className="relative flex size-11 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent/35 [animation-duration:2.4s]" />
                <span className="absolute -inset-1.5 rounded-full border border-accent/25" />
                <span className="relative flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#4ade80] text-accent-ink shadow-[inset_0_-3px_6px_rgba(0,0,0,0.25)]">
                  <Compass
                    className="size-5 transition-transform duration-700 ease-out group-hover:rotate-[360deg]"
                    strokeWidth={2.4}
                  />
                </span>
              </span>
              <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase">
                Help
              </span>
              <kbd className="rounded-md border border-paper/20 bg-paper/5 px-1.5 py-px font-sans text-[9px] font-bold text-paper/60">
                H
              </kbd>

              <span className="pointer-events-none absolute top-1/2 right-full mr-3 w-max -translate-y-1/2 translate-x-2 rounded-xl border border-paper/10 bg-void/95 px-3.5 py-2.5 text-left opacity-0 shadow-xl backdrop-blur-md transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <span className="block text-sm font-bold text-paper">
                  Need a guide?
                </span>
                <span className="mt-0.5 block text-xs text-paper/60">
                  I&apos;ll walk you to any section
                </span>
                <span className="absolute top-1/2 -right-1.5 size-3 -translate-y-1/2 rotate-45 border-t border-r border-paper/10 bg-void/95" />
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* First-visit prompt */}
      <AnimatePresence>
        {showFirstVisitPrompt &&
          mode === "hub" &&
          guidePhase === "idle" &&
          !showWelcomeIntro && (
            <motion.div
              className="pointer-events-auto fixed bottom-24 left-1/2 z-40 w-[min(92vw,380px)] -translate-x-1/2 sm:bottom-28"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              role="dialog"
              aria-labelledby="first-visit-guide-title"
            >
              <div className="relative overflow-hidden rounded-2xl border border-paper/10 bg-gradient-to-b from-[#161a1f]/95 to-void/95 p-4 text-paper shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
                <span className="pointer-events-none absolute -top-16 -left-10 size-40 rounded-full bg-accent/15 blur-3xl" />

                <button
                  type="button"
                  onClick={dismissFirstVisitPrompt}
                  aria-label="Dismiss"
                  className="absolute top-3 right-3 flex size-7 cursor-pointer items-center justify-center rounded-lg text-paper/40 transition hover:bg-paper/10 hover:text-paper"
                >
                  <X className="size-4" />
                </button>

                <div className="relative flex items-start gap-3 pr-6">
                  <span className="relative flex size-11 shrink-0 items-center justify-center">
                    <span className="absolute inset-0 animate-ping rounded-full bg-accent/30 [animation-duration:2.4s]" />
                    <span className="relative flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#4ade80] text-accent-ink shadow-[inset_0_-3px_6px_rgba(0,0,0,0.25)]">
                      <Compass className="size-5" strokeWidth={2.4} />
                    </span>
                  </span>
                  <div className="min-w-0">
                    <p
                      id="first-visit-guide-title"
                      className="text-base font-extrabold tracking-tight"
                    >
                      Need a guide?
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-paper/60">
                      A helper can run over and walk you to any section.
                    </p>
                  </div>
                </div>

                <div className="relative mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={acceptFirstVisitGuide}
                    className="group inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-accent px-3 py-2.5 text-sm font-extrabold text-accent-ink shadow-[0_8px_24px_-8px_rgba(200,245,66,0.7)] transition hover:brightness-110"
                  >
                    Yes, guide me
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={2.6}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={dismissFirstVisitPrompt}
                    className="cursor-pointer rounded-xl border border-paper/15 bg-paper/[0.04] px-4 py-2.5 text-sm font-semibold text-paper/75 transition hover:border-paper/30 hover:bg-paper/10 hover:text-paper"
                  >
                    No thanks
                  </button>
                </div>

                <p className="relative mt-3 flex items-center justify-center gap-1.5 text-[11px] text-paper/40">
                  Press
                  <kbd className="rounded border border-paper/20 bg-paper/[0.06] px-1.5 py-px font-sans text-[9px] font-bold text-paper/70">
                    H
                  </kbd>
                  anytime to call the guide
                </p>
              </div>
            </motion.div>
          )}
      </AnimatePresence>

      {/* Summoning / leading status */}
      <AnimatePresence>
        {(showSummoning || showLeading) && (
          <motion.div
            className="pointer-events-auto fixed bottom-24 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-accent/30 bg-void/85 py-2 pr-2 pl-4 text-paper shadow-[0_12px_36px_-12px_rgba(0,0,0,0.8),0_0_24px_-10px_rgba(200,245,66,0.6)] backdrop-blur-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/70" />
              <span className="relative size-2.5 rounded-full bg-accent" />
            </span>
            <p className="text-sm font-semibold whitespace-nowrap">
              {showSummoning ? (
                "Guide is running to you…"
              ) : (
                <>
                  Follow the guide
                  <span className="ml-2 hidden text-paper/45 sm:inline">
                    WASD to cancel
                  </span>
                </>
              )}
            </p>
            <button
              type="button"
              onClick={cancelGuide}
              className="cursor-pointer rounded-full border border-paper/15 bg-paper/[0.05] px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-paper/70 uppercase transition hover:border-paper/30 hover:bg-paper/10 hover:text-paper"
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
              className="absolute inset-0 bg-void/60 backdrop-blur-[3px]"
              aria-label="Close help"
              onClick={cancelGuide}
            />
            <GuideSectionPicker
              onSelect={selectGuideSection}
              onClose={cancelGuide}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
