import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  Copy, 
  Check, 
  Quote, 
  HeartHandshake,
  BookOpen,
  Award
} from 'lucide-react';
import { CommitmentWheel } from '../components/CommitmentWheel';
import { triggerConfetti } from '../components/ConfettiBurst';
import '../styles/roulette.css';

export const RouletteSection = () => {
  const [selectedCommitment, setSelectedCommitment] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [acceptedList, setAcceptedList] = useState([]);

  const handleCommitmentSelected = (commitment) => {
    setSelectedCommitment(commitment);
    setHasAccepted(false);
    setCopied(false);
    // Disparo festivo de gracia al caer en un compromiso
    setTimeout(() => {
      triggerConfetti();
    }, 200);
  };

  const handleAcceptCommitment = () => {
    if (!selectedCommitment) return;
    setHasAccepted(true);
    triggerConfetti();

    // Registrar en la lista si no está ya
    if (!acceptedList.some((item) => item.id === selectedCommitment.id)) {
      setAcceptedList((prev) => [...prev, selectedCommitment]);
    }
  };

  const handleCopy = () => {
    if (!selectedCommitment) return;
    const textToCopy = `«Compromiso de Santidad en Zapatillas»: ${selectedCommitment.title}\n\nReto de hoy: ${selectedCommitment.challenge}\n\nInspiración: ${selectedCommitment.quote} — Papa Francisco (${selectedCommitment.reference})`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      // Fallback manual si el navegador restringe el portapapeles
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="ruleta-compromiso" className="roulette-section">
      <div className="container">
        {/* Encabezado eclesial solemne */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <div className="badge-sacred roulette-badge-pulse">
            <Compass size={15} />
            <span>Itinerario de Conversión y Vida Práctica</span>
          </div>

          <h2 className="section-title font-cinzel">
            La Ruleta del <span className="text-gold-gradient">Compromiso Diario</span>
          </h2>

          <div className="ornament-divider">
            <span>✠</span>
          </div>

          <p className="section-subtitle">
            El Papa Francisco nos enseña en <em>Gaudete et Exsultate</em> que la santidad no es una idea abstracta, 
            sino un paso valiente en lo cotidiano. Haz girar la ruleta, discierne el propósito que la Providencia 
            te propone hoy y asume el reto de mejorar tu vida en el amor a Dios y al prójimo.
          </p>
        </motion.div>

        {/* Layout en dos columnas: Ruleta a la izquierda, Tarjeta de revelación a la derecha */}
        <div className="roulette-layout-grid">
          {/* Columna Izquierda: Ruleta Interactiva */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <CommitmentWheel
              onCommitmentSelected={handleCommitmentSelected}
              isSpinning={isSpinning}
              setIsSpinning={setIsSpinning}
            />
          </motion.div>

          {/* Columna Derecha: Tarjeta de Revelación del Compromiso */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="commitment-card-box">
              <AnimatePresence mode="wait">
                {!selectedCommitment ? (
                  /* Estado Inicial de Invitación */
                  <motion.div
                    key="placeholder"
                    className="commitment-placeholder-content"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="placeholder-icon-wrap">
                      <Sparkles size={36} />
                    </div>

                    <h3 className="placeholder-title font-cinzel">
                      Tu Compromiso de Santidad
                    </h3>

                    <p className="placeholder-desc">
                      Haz girar la ruleta para discernir qué expresión de santidad estás llamado a vivir hoy con mayor generosidad: 
                      mansedumbre en redes, alegría contagiosa, perdón de corazón o un momento íntimo de oración.
                    </p>

                    <div className="badge-sacred" style={{ margin: '0 auto', fontSize: '0.74rem' }}>
                      <BookOpen size={13} />
                      <span>«La santidad de la puerta de al lado»</span>
                    </div>
                  </motion.div>
                ) : (
                  /* Estado Revelado: Compromiso Activo */
                  <motion.div
                    key={`commitment-${selectedCommitment.id}`}
                    className="commitment-revealed-wrap"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <div className="commitment-header-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span className="commitment-roman-pill">
                          {selectedCommitment.roman}
                        </span>
                        <span className="badge-sacred" style={{ margin: 0, padding: '0.25rem 0.85rem' }}>
                          {selectedCommitment.badge}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-gold-light)', fontStyle: 'italic' }}>
                        {selectedCommitment.reference}
                      </span>
                    </div>

                    <h3 className="commitment-title-main">
                      {selectedCommitment.title}
                    </h3>

                    <p style={{ fontSize: '1.12rem', color: 'var(--color-text-body)', margin: '0.3rem 0 1rem 0' }}>
                      {selectedCommitment.description}
                    </p>

                    {/* Cita del Magisterio */}
                    <div className="commitment-quote-block">
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <Quote size={18} color="var(--color-gold-primary)" />
                        <span>{selectedCommitment.quote}</span>
                      </div>
                      <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-gold-light)', textAlign: 'right', marginTop: '0.4rem' }}>
                        — Papa Francisco, Gaudete et Exsultate
                      </span>
                    </div>

                    {/* Reto Práctico Concreto */}
                    <div className="commitment-challenge-box">
                      <div className="challenge-title">
                        <Sparkles size={16} color="var(--color-gold-primary)" />
                        <span>Tu Reto Práctico para Hoy</span>
                      </div>
                      <p className="challenge-text">
                        {selectedCommitment.challenge}
                      </p>
                    </div>

                    {/* Notificación de Compromiso Asumido */}
                    {hasAccepted && (
                      <motion.div
                        className="accepted-badge-notification"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <CheckCircle2 size={20} color="#10B981" />
                        <span>
                          <strong>¡Compromiso asumido con el corazón!</strong> Lleva esta semilla hoy a tus acciones con la ayuda de la gracia divina.
                        </span>
                      </motion.div>
                    )}

                    {/* Botones de Acción */}
                    <div className="commitment-actions-row">
                      <button
                        className={`btn-accept-commitment ${hasAccepted ? 'accepted' : ''}`}
                        onClick={handleAcceptCommitment}
                        disabled={isSpinning}
                      >
                        {hasAccepted ? (
                          <>
                            <CheckCircle2 size={18} />
                            <span>Compromiso Sellado</span>
                          </>
                        ) : (
                          <>
                            <HeartHandshake size={18} />
                            <span>{selectedCommitment.actionLabel}</span>
                          </>
                        )}
                      </button>

                      <button
                        className="btn-share-commitment"
                        onClick={handleCopy}
                        title="Copiar reto al portapapeles"
                      >
                        {copied ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                        <span>{copied ? "¡Copiado!" : "Copiar Reto"}</span>
                      </button>
                    </div>

                    {/* Insignia de Progreso Personal */}
                    {acceptedList.length > 0 && (
                      <div style={{ marginTop: '1.4rem', borderTop: '1px dashed rgba(212, 175, 55, 0.25)', paddingTop: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <Award size={15} color="var(--color-gold-primary)" />
                          <span>Compromisos asumidos en tu sesión:</span>
                        </span>
                        <strong style={{ color: 'var(--color-gold-light)', fontFamily: 'var(--font-heading-cinzel)' }}>
                          {acceptedList.length} de 8
                        </strong>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
