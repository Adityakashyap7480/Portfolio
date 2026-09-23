import { About } from './components/About'
import { Contact } from './components/Contact'
import { CustomCursor } from './components/CustomCursor'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Positioning } from './components/Positioning'
import { Projects } from './components/Projects'
import { ScrollProgress } from './components/ScrollProgress'
import { Skills } from './components/Skills'

export default function App() {
  return (
    <div id="top" className="min-h-svh bg-paper text-void">
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Positioning />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
