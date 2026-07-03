import NeonGridBackground from './components/NeonGridBackground'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import InteractiveConsole from './components/InteractiveConsole'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Global neon grid background + data pipelines */}
      <NeonGridBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <InteractiveConsole />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
