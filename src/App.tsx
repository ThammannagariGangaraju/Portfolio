import { MotionConfig } from 'framer-motion'
import Background from './components/layout/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import CodingProfiles from './components/CodingProfiles'
import Projects from './components/Projects'
import Education from './components/Education'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { initSmoothScroll, scrollToSection } from './lib/smoothScroll'
import BackToTop from './components/ui/BackToTop'
import { useEffect } from 'react'

export default function App() {
  useEffect(() => initSmoothScroll(), [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[#0a0a0a]"
        onClick={(e) => {
          e.preventDefault()
          scrollToSection('#main')
        }}
      >
        Skip to content
      </a>

      <Background />

      <Navbar />

      <main id="main" className="relative z-10">
        <Hero />
        <Marquee />
        <CodingProfiles />
        <Projects />
        <Education />
        <Skills />
        <Achievements />
        <Certifications />
        <Contact />
      </main>

      <Footer />

      <BackToTop />
    </MotionConfig>
  )
}
