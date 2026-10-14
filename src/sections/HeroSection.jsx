import React from 'react';
import { motion } from 'framer-motion';
import { Search, Menu, ChevronDown, Cross, Sparkles, BookOpen } from 'lucide-react';
import '../styles/hero.css';
import logo from '../assets/logo-vatican.png';
export const HeroSection = () => {
  const scrollToNotes = (e) => {
    e.preventDefault();
    const elem = document.getElementById('notas');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToQuiz = (e) => {
    e.preventDefault();
    const elem = document.getElementById('quiz');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="vatican-hero-section">
      {/* 1. Header superior idéntico a "La SANTA SEDE" */}
      <header className="vatican-topbar">
        <a href="#hero" className="vatican-logo-text">
          <em>Gaudete et</em> exsultate
        </a>

        {/* Emblema Vaticano central */}
        <div className="vatican-center-emblem" title="Santa Sede">
          <img style={{ width: '80%', height: '80%' }} src={logo} alt="Logo de la Santa Sede" />
        </div>

        <div className="vatican-topbar-right">
          <a href="#hero" className="vatican-logo-text">
          <em>Formación </em> humanistica IV
        </a>
        </div>
      </header>

      {/* 2. Grid de Contenido Principal */}
      <div className="vatican-hero-grid">
        {/* Columna Izquierda: Título y Textos solemnes */}
        <motion.div
          className="vatican-hero-text"
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          <h1 className="vatican-pope-title">
            <span>PAPA</span>
            <span>FRANCISCO</span>
          </h1>

          <div className="vatican-document-subtitle">
            Gaudete et Exsultate • La Santidad en Zapatillas
          </div>

          <p className="vatican-hero-description">
            Capítulo 4: «Algunas notas de la santidad en el mundo actual». 
            Cinco expresiones del amor a Dios y al prójimo para una santidad accesible, 
            llena de paciencia, alegría comunitaria y oración en el día a día.
          </p>

          <div className="vatican-hero-actions">
            <a href="#notas" onClick={scrollToNotes} className="btn-sacred-primary">
              <BookOpen size={18} />
              <span>Explorar las 5 Notas</span>
            </a>
            <a href="#quiz" onClick={scrollToQuiz} className="btn-sacred-secondary">
              <Sparkles size={18} />
              <span>Iniciar Reflexión</span>
            </a>
          </div>
        </motion.div>

        {/* Columna Derecha: Foto del Papa Francisco con marco y halo sagrado */}
        <motion.div
          className="vatican-hero-image-col"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="vatican-pope-frame">
            <img
              src="/pope_francis.jpg"
              alt="Papa Francisco - Gaudete et Exsultate"
              className="vatican-pope-img"
            />
            <div className="vatican-pope-halo" />
          </div>
        </motion.div>
      </div>

      {/* 3. Botón / Badge central dorado "MAGISTERIUM" */}
      <div className="vatican-magisterium-badge-wrap">
        <a href="#notas" onClick={scrollToNotes} className="vatican-magisterium-badge">
          <div className="vatican-badge-emblem">
            <Cross size={15} />
          </div>
          <span>MAGISTERIUM</span>
        </a>
      </div>

      {/* 4. Curva cóncava inferior suave hacia el contenido litúrgico oscuro */}
      <div className="vatican-bottom-curve">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
  );
};
