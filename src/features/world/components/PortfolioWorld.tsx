import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { ExperienceProvider } from '../context/ExperienceContext'
import { HelpGuideUI } from './HelpGuideUI'
import { HUD } from './HUD'
import { PortalTransition } from './PortalTransition'
import { SectionOverlay } from './SectionOverlay'
import { WelcomeIntro } from './WelcomeIntro'
import { WorldScene } from './WorldScene'

export function PortfolioWorld() {
  return (
    <ExperienceProvider>
      <div className="relative h-svh w-full overflow-hidden bg-[#87b5d9]">
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ position: [0, 9, 18], fov: 50, near: 0.1, far: 200 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <WorldScene />
          </Suspense>
        </Canvas>

        <HUD />
        <HelpGuideUI />
        <SectionOverlay />
        <WelcomeIntro />
        <PortalTransition />
      </div>
    </ExperienceProvider>
  )
}
