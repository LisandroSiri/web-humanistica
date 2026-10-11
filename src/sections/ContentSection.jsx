import React from 'react';
import { motion } from 'framer-motion';
import { Scroll } from 'lucide-react';
import { SacredBook } from '../components/SacredBook';
import '../styles/scroll-stack.css';

export const ContentSection = () => {
  return (
    <section id="notas" className="scroll-stack-section">
      <div className="container">
        {/* Encabezado eclesial solemne */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <div className="badge-sacred">
            <Scroll size={14} />
            <span>Capítulo Cuarto del Magisterio</span>
          </div>

          <h2 className="section-title font-cinzel">
            Cinco Expresiones de la <span className="text-gold-gradient">Santidad en el Mundo Actual</span>
          </h2>

          <div className="ornament-divider">
            <span>✠</span>
          </div>

          <p className="section-subtitle">
            El Santo Padre nos ofrece estas cinco notas espirituales no como preceptos inalcanzables, sino como señales del camino para que la fe se traduzca en amor concreto, paciencia, alegría y oración cotidiana en medio de la sociedad actual.
          </p>
        </motion.div>

        {/* Libro interactivo con páginas blandas (page-flip) */}
        <SacredBook />
      </div>
    </section>
  );
};
