import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import HoneycombNav from './components/HoneycombNav';
import SectionPage from './components/SectionPage';
import LabPage from './components/LabPage';
import BeeVisionSimulator from './components/BeeVisionSimulator';
import BeeQuizGame from './components/BeeQuizGame';
import LoadingScreen from './components/LoadingScreen';
import ParticleField from './components/ParticleField';
import FloatingBee from './components/FloatingBee';
import Footer from './components/Footer';
import { sections } from './data/knowledge';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(null);
  const [labView, setLabView] = useState(null); // null | 'vision' | 'quiz'

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (sectionId) => {
    setLabView(null);
    setCurrentSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (labView) {
      // Back from vision/quiz → lab page
      setLabView(null);
    } else {
      // Back from any section → home
      setCurrentSection(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sectionData = sections.find((s) => s.id === currentSection);

  const renderContent = () => {
    // Home page
    if (!currentSection) {
      return <HoneycombNav key="home" onNavigate={handleNavigate} />;
    }

    // Lab sub-pages
    if (currentSection === 'lab') {
      if (labView === 'vision') {
        return <BeeVisionSimulator key="vision" onBack={handleBack} />;
      }
      if (labView === 'quiz') {
        return <BeeQuizGame key="quiz" onBack={handleBack} />;
      }
      return (
        <LabPage
          key="lab"
          onBack={handleBack}
          onStartVision={() => { setLabView('vision'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          onStartQuiz={() => { setLabView('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        />
      );
    }

    // Knowledge sections
    if (sectionData) {
      return <SectionPage key={currentSection} section={sectionData} onBack={handleBack} />;
    }

    return null;
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="honeycomb-bg" />
      <ParticleField />
      <div className="noise-overlay" />
      <div className="scanline" />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>

      <FloatingBee />
    </div>
  );
}

export default App;
