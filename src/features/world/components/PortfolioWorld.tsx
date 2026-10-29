import { PerformanceMonitor, Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import portraitCutout from '../../../assets/portrait_cutout.webp'
import { projects } from '../../../shared/data/resume'
import { ExperienceProvider, useExperience } from '../context/ExperienceContext'
import { HelpGuideUI } from './HelpGuideUI'
import { HUD } from './HUD'
import { PortalTransition } from './PortalTransition'
import { SectionOverlay } from './SectionOverlay'
import { WelcomeIntro } from './WelcomeIntro'
import { WorldAudio } from './WorldAudio'
import { WorldScene } from './WorldScene'

const MAX_DPR = Math.min(typeof window === 'undefined' ? 1 : window.devicePixelRatio, 1.5)

function WorldCanvas() {
  const { mode } = useExperience()
  const [dpr, setDpr] = useState(MAX_DPR)
  return (
    <Canvas
      shadows
      dpr={dpr}
      // Outside the hub the world is covered by the portal or a section, so stop the render loop
      frameloop={mode === 'hub' ? 'always' : 'demand'}
      camera={{ position: [0, 9, 18], fov: 50, near: 0.1, far: 200 }}
      gl={{ antialias: true, powerPreference: 'high-performance', stencil: false }}
    >
      {/* Drop render resolution on devices that can't hold a steady frame rate */}
      <PerformanceMonitor
        flipflops={3}
        onIncline={() => setDpr(MAX_DPR)}
        onDecline={() => setDpr(1)}
        onFallback={() => setDpr(1)}
      />
      <Suspense fallback={null}>
        <WorldScene />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}

/** Warm the image cache during idle time so opening a section never waits on a decode */
function usePreloadSectionImages() {
  useEffect(() => {
    const urls = [portraitCutout, ...new Set(projects.map((p) => p.cover))]
    const run = () => {
      for (const url of urls) {
        const img = new Image()
        img.decoding = 'async'
        img.src = url
        img.decode().catch(() => {})
      }
    }
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(run, { timeout: 4000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(run, 2000)
    return () => clearTimeout(id)
  }, [])
}

export function PortfolioWorld() {
  usePreloadSectionImages()
  return (
    <ExperienceProvider>
      <div className="relative h-svh w-full overflow-hidden bg-[#e9c9a4]">
        <WorldCanvas />

        <HUD />
        <HelpGuideUI />
        <SectionOverlay />
        <WelcomeIntro />
        <PortalTransition />
        <WorldAudio />
      </div>
    </ExperienceProvider>
  )
}
