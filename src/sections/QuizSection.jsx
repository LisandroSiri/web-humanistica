import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '../data/quizData';
import { triggerConfetti } from '../components/ConfettiBurst';
import { 
  HelpCircle, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight,
  Cross,
  Sparkles,
  Compass
} from 'lucide-react';
import '../styles/quiz.css';

export const QuizSection = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = quizQuestions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleSelectOption = (index) => {
    if (showFeedback) return;
    setSelectedOption(index);
    setShowFeedback(true);

    if (currentQ.options[index].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
      setTimeout(() => {
        triggerConfetti();
      }, 250);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <section id="quiz" className="quiz-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <div className="badge-sacred">
            <HelpCircle size={14} />
            <span>Examen de Conciencia & Discernimiento</span>
          </div>

          <h2 className="section-title font-cinzel">
            ¿Cómo se encarna la fe en tu <span className="text-gold-gradient">Caminar Diario</span>?
          </h2>

          <div className="ornament-divider">
            <span>✠</span>
          </div>

          <p className="section-subtitle">
            Un itinerario breve para confrontar nuestra vida con la luz del Evangelio y las notas de santidad propuestas por el Papa Francisco.
          </p>
        </motion.div>

        <div className="quiz-container-box">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={`q-${currentQuestionIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                {/* Barra de progreso con oro viejo */}
                <div className="quiz-progress-bar-wrap">
                  <div
                    className="quiz-progress-bar-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="quiz-header-meta">
                  <span className="quiz-counter">
                    Pregunta {currentQuestionIndex + 1} de {quizQuestions.length}
                  </span>
                  <span className="badge-sacred" style={{ margin: 0, padding: '0.2rem 0.8rem' }}>
                    Gaudete et Exsultate
                  </span>
                </div>

                <h3 className="quiz-question-title">{currentQ.question}</h3>

                {/* Lista de opciones */}
                <div className="quiz-options-list">
                  {currentQ.options.map((option, idx) => {
                    const romanNumerals = ['I', 'II', 'III', 'IV'];
                    let optionClass = 'quiz-option-btn';

                    if (showFeedback) {
                      if (option.correct) {
                        optionClass += ' correct';
                      } else if (selectedOption === idx) {
                        optionClass += ' wrong';
                      }
                    } else if (selectedOption === idx) {
                      optionClass += ' selected';
                    }

                    return (
                      <motion.button
                        key={idx}
                        className={optionClass}
                        onClick={() => handleSelectOption(idx)}
                        disabled={showFeedback}
                        whileHover={!showFeedback ? { scale: 1.008 } : {}}
                        whileTap={!showFeedback ? { scale: 0.992 } : {}}
                      >
                        <span className="option-marker">{romanNumerals[idx]}</span>
                        <span style={{ flex: 1 }}>{option.text}</span>
                        {showFeedback && option.correct && (
                          <CheckCircle2 size={22} color="#059669" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Retroalimentación formativa */}
                {showFeedback && (
                  <motion.div
                    className="quiz-feedback-box"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <strong style={{ fontFamily: 'var(--font-heading-cinzel)', display: 'block', marginBottom: '0.3rem', color: 'var(--color-gold-primary)' }}>
                      Enseñanza pastoral:
                    </strong>
                    <span>{currentQ.options[selectedOption].feedback}</span>
                  </motion.div>
                )}

                {/* Siguiente paso */}
                {showFeedback && (
                  <motion.div
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <button onClick={handleNextQuestion} className="btn-sacred-primary">
                      <span>{currentQuestionIndex + 1 < quizQuestions.length ? 'Siguiente Pregunta' : 'Ver Conclusión Pastoral'}</span>
                      <ArrowRight size={18} />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              /* PANTALLA DE RESULTADOS & GRACIA INCONDICIONAL */
              <motion.div
                key="results-screen"
                className="results-card"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65 }}
              >
                <div className="celebration-icon-wrapper">
                  <Cross size={42} />
                </div>

                <h3 className="section-title font-cinzel" style={{ marginBottom: '0.8rem' }}>
                  ¡Gracias por participar!
                </h3>

                <div className="score-badge">
                  Tu puntuación en este ejercicio: {score} de {quizQuestions.length} aciertos
                </div>

                {/* MENSAJE CRÍTICO DEL DOCUMENTO Y LA GUÍA */}
                <div className="grace-message-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                    <Sparkles size={24} color="var(--color-gold-primary)" />
                    <h4 className="font-cinzel" style={{ color: 'var(--color-gold-light)', fontSize: '1.35rem', margin: 0 }}>
                      La Lección Fundamental del Evangelio
                    </h4>
                  </div>

                  <p>
                    Tu puntaje fue de <strong>{score} sobre {quizQuestions.length}</strong>, pero ¿sabes qué? La verdadera lección del Capítulo 4 es que Dios no es un juez con una calculadora de méritos.
                  </p>
                  
                  <p>
                    <strong>Él te ama incondicionalmente, te perdona y te invita a su reino.</strong> Su gracia nos levanta siempre. No estamos llamados a una perfección obsesiva sin tropiezos, sino a caminar con alegría, pedir perdón cuando caemos y confiar ciegamente en Su infinita misericordia.
                  </p>

                  <span className="grace-quote-highlight">
                    «¡La santidad es dejarse amar por Dios e intentarlo de nuevo todos los días!»
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <button onClick={handleRestart} className="btn-sacred-secondary">
                    <RotateCcw size={18} />
                    <span>Reanudar el Cuestionario</span>
                  </button>

                  <a
                    href="#ruleta-compromiso"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('ruleta-compromiso')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-sacred-primary"
                  >
                    <Compass size={18} />
                    <span>Asumir un Compromiso en la Ruleta</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
