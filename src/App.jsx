import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ContentSection } from './sections/ContentSection';
import { QuizSection } from './sections/QuizSection';
import { RouletteSection } from './sections/RouletteSection';
import { FooterSection } from './sections/FooterSection';
import './styles/index.css';

function App() {
  return (
    <div className="app-container">
      {/* Hero Section con diseño oficial de La Santa Sede */}
      <HeroSection />

      {/* Fondo sagrado contemplativo para el resto de la lectura */}
      <div style={{ position: 'relative', width: '100%' }}>
        <AnimatedBackground />
        <main>
          <ContentSection />
          <QuizSection />
          <RouletteSection />
        </main>
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}

export default App;
