import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
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

function WorldCanvas() {
  const { mode } = useExperience()
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      // Outside the hub the world is covered by the portal or a section, so stop the render loop
      frameloop={mode === 'hub' ? 'always' : 'demand'}
      camera={{ position: [0, 9, 18], fov: 50, near: 0.1, far: 200 }}
      gl={{ antialias: true, powerPreference: 'high-performance', stencil: false }}
    >
      <Suspense fallback={null}>
        <WorldScene />
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
