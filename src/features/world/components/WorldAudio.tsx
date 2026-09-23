import { useEffect, useRef } from 'react'
import { useExperience } from '../context/ExperienceContext'

/**
 * Soft procedural audio — always on.
 * Unlocks after first user gesture (browser autoplay policy).
 */
export function WorldAudio() {
  const { mode } = useExperience()
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const ambientNodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([])
  const lastModeRef = useRef(mode)
  const ambientStarted = useRef(false)

  const ensureContext = () => {
    if (typeof window === 'undefined') return null
    if (!ctxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      ctxRef.current = new Ctx()
      const master = ctxRef.current.createGain()
      master.gain.value = 0.35
      master.connect(ctxRef.current.destination)
      masterRef.current = master
    }
    return ctxRef.current
  }

  const stopAmbient = () => {
    for (const node of ambientNodesRef.current) {
      try {
        node.gain.gain.cancelScheduledValues(0)
        node.gain.gain.setValueAtTime(node.gain.gain.value, ctxRef.current?.currentTime ?? 0)
        node.gain.gain.exponentialRampToValueAtTime(
          0.0001,
          (ctxRef.current?.currentTime ?? 0) + 0.4,
        )
        node.osc.stop((ctxRef.current?.currentTime ?? 0) + 0.45)
      } catch {
        /* ignore */
      }
    }
    ambientNodesRef.current = []
    ambientStarted.current = false
  }

  const startAmbient = async () => {
    const ctx = ensureContext()
    const master = masterRef.current
    if (!ctx || !master) return
    await ctx.resume()
    if (ambientStarted.current && ambientNodesRef.current.length > 0) return
    stopAmbient()

    const voices = [
      { freq: 110, type: 'sine' as OscillatorType, vol: 0.028 },
      { freq: 164.81, type: 'sine' as OscillatorType, vol: 0.018 },
      { freq: 220, type: 'triangle' as OscillatorType, vol: 0.012 },
    ]

    const now = ctx.currentTime
    for (const v of voices) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 680
      osc.type = v.type
      osc.frequency.value = v.freq
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(v.vol, now + 1.2)
      osc.connect(filter)
      filter.connect(gain)
      gain.connect(master)
      osc.start(now)
      ambientNodesRef.current.push({ osc, gain })
    }
    ambientStarted.current = true
  }

  const playGateWhoosh = async () => {
    const ctx = ensureContext()
    const master = masterRef.current
    if (!ctx || !master) return
    await ctx.resume()

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(280, now)
    filter.frequency.exponentialRampToValueAtTime(1400, now + 0.35)
    filter.Q.value = 0.7
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(180, now)
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.28)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.09, now + 0.06)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55)
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(master)
    osc.start(now)
    osc.stop(now + 0.6)
  }

  useEffect(() => {
    const unlock = () => {
      void startAmbient()
    }
    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      stopAmbient()
      void ctxRef.current?.close()
      ctxRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const prev = lastModeRef.current
    lastModeRef.current = mode
    if ((mode === 'entering' || mode === 'exiting') && prev !== mode) {
      void playGateWhoosh()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  return null
}
