import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cross, Sparkles, RefreshCw } from 'lucide-react';
import { commitmentsData } from '../data/commitmentsData';
import { wheelAudio } from '../utils/wheelAudio';

export const CommitmentWheel = ({ onCommitmentSelected, isSpinning, setIsSpinning }) => {
  const [currentRotation, setCurrentRotation] = useState(0);
  const animRef = useRef(null);
  const lastSectorRef = useRef(0);

  const numSlices = commitmentsData.length;
  const sliceAngle = 360 / numSlices; // 45 deg
  const size = 500;
  const center = size / 2;
  const radius = 230;

  // Limpiar animación si se desmonta
  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Seleccionar aleatoriamente un compromiso ganador
    const targetIndex = Math.floor(Math.random() * numSlices);
    
    // Cálculo exacto del ángulo final para que el centro del sector quede bajo el puntero superior (270°)
    const sliceCenter = targetIndex * sliceAngle + sliceAngle / 2;
    const targetAngle = (270 - sliceCenter + 360) % 360;

    // Entre 6 y 8 giros completos para suspenso majestuoso
    const extraSpins = (6 + Math.floor(Math.random() * 3)) * 360;
    const startRotation = currentRotation;
    
    // Asegurar rotación siempre hacia adelante
    const currentModulo = startRotation % 360;
    const forwardDistance = ((targetAngle - currentModulo + 360) % 360);
    // Agregamos una ligera variación sutil para realismo (±10° dentro de los 45° del sector)
    const jitter = (Math.random() - 0.5) * 16;
    const endRotation = startRotation + extraSpins + forwardDistance + jitter;

    const duration = 4800; // 4.8 segundos
    const startTime = performance.now();

    // Easing cúbico desacelerado natural (ease-out quintic)
    const easeOut = (t) => 1 - Math.pow(1 - t, 4);

    lastSectorRef.current = Math.floor(startRotation / sliceAngle);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      
      const nextRotation = startRotation + (endRotation - startRotation) * easedProgress;
      setCurrentRotation(nextRotation);

      // Detectar paso de sector para emitir sonido de trinquete
      const currentSector = Math.floor(nextRotation / sliceAngle);
      if (currentSector !== lastSectorRef.current) {
        wheelAudio.playTick();
        lastSectorRef.current = currentSector;
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const winner = commitmentsData[targetIndex];
        wheelAudio.playChime();
        if (onCommitmentSelected) {
          onCommitmentSelected(winner);
        }
      }
    };

    animRef.current = requestAnimationFrame(animate);
  };

  // Construcción de los arcos SVG
  const slices = commitmentsData.map((item, index) => {
    const startAngle = index * sliceAngle;
    const endAngle = (index + 1) * sliceAngle;
    const midAngle = startAngle + sliceAngle / 2;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

    // Alternar elegantes tonalidades litúrgicas
    const isEven = index % 2 === 0;
    const sliceBg = isEven ? '#2A1F13' : '#1D160E';
    const textColor = isEven ? '#F4E2A6' : '#E8DEC8';

    return {
      ...item,
      index,
      midAngle,
      pathData,
      sliceBg,
      textColor
    };
  });

  return (
    <div className="wheel-wrapper">
      {/* Puntero Superior con halo dorado */}
      <div className="wheel-pointer-container">
        <motion.div
          animate={isSpinning ? { rotate: [-4, 6, -5, 4, 0], y: [0, 2, 0] } : { rotate: 0, y: 0 }}
          transition={{ repeat: isSpinning ? Infinity : 0, duration: 0.15 }}
        >
          <svg
            className="wheel-pointer-arrow"
            viewBox="0 0 40 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 50L4 12C2 7.5 5.5 2 10.5 2H29.5C34.5 2 38 7.5 36 12L20 50Z"
              fill="url(#goldPointerGrad)"
              stroke="#FFF3CD"
              strokeWidth="2"
            />
            <circle cx="20" cy="14" r="5" fill="#1A1305" stroke="#D4AF37" strokeWidth="1.5" />
            <defs>
              <linearGradient id="goldPointerGrad" x1="20" y1="2" x2="20" y2="50" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFF2C6" />
                <stop offset="0.5" stopColor="#D4AF37" />
                <stop offset="1" stopColor="#8A6412" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Rueda exterior con marco y tachas sacras */}
      <div className="wheel-outer-ring">
        <div className="wheel-studs" />

        <div className="wheel-svg-container">
          <svg
            className="wheel-svg"
            viewBox={`0 0 ${size} ${size}`}
            style={{
              transform: `rotate(${currentRotation}deg)`
            }}
          >
            <defs>
              <radialGradient id="hubShine" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF9E6" />
                <stop offset="70%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#7A5812" />
              </radialGradient>
            </defs>

            {/* Sectores de la ruleta */}
            {slices.map((slice) => (
              <g key={slice.id}>
                {/* Sector Path */}
                <path
                  d={slice.pathData}
                  fill={slice.sliceBg}
                  stroke="rgba(212, 175, 55, 0.45)"
                  strokeWidth="1.5"
                />

                {/* Resalte decorativo perimetral */}
                <path
                  d={slice.pathData}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth="4"
                  strokeDasharray="4 8"
                  opacity="0.3"
                />

                {/* Texto del sector orientado radialmente hacia afuera */}
                <g transform={`rotate(${slice.midAngle}, ${center}, ${center})`}>
                  {/* Número Romano cerca del borde exterior */}
                  <text
                    x={center + radius - 24}
                    y={center}
                    fill="#F4E2A6"
                    fontSize="13"
                    fontFamily="var(--font-heading-cinzel)"
                    fontWeight="800"
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={`rotate(90, ${center + radius - 24}, ${center})`}
                    style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                  >
                    {slice.roman}
                  </text>

                  {/* Nombre breve del compromiso */}
                  <text
                    x={center + radius - 80}
                    y={center}
                    fill={slice.textColor}
                    fontSize="11.5"
                    fontFamily="var(--font-heading-cinzel)"
                    fontWeight="700"
                    letterSpacing="0.06em"
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={`rotate(0, ${center + radius - 80}, ${center})`}
                    style={{ textShadow: '0 2px 5px rgba(0,0,0,0.9)' }}
                  >
                    {slice.shortLabel}
                  </text>

                  {/* Cruz pequeña ornamental de separación */}
                  <text
                    x={center + 65}
                    y={center}
                    fill="rgba(212, 175, 55, 0.6)"
                    fontSize="9"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    ✠
                  </text>
                </g>
              </g>
            ))}

            {/* Borde circular interior decorativo */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Medallón central dorado que también sirve de pulsador */}
        <button
          className="wheel-center-hub"
          onClick={spinWheel}
          disabled={isSpinning}
          title={isSpinning ? "Girando hacia tu compromiso..." : "¡Haz clic para girar la ruleta!"}
          aria-label="Girar Ruleta del Compromiso"
        >
          <div className="wheel-hub-icon">
            {isSpinning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              >
                <RefreshCw size={24} />
              </motion.div>
            ) : (
              <Cross size={26} />
            )}
          </div>
          <span className="wheel-hub-text">
            {isSpinning ? "DISCIERNE" : "GIRAR"}
          </span>
        </button>
      </div>

      {/* Controles y llamado a la acción debajo de la ruleta */}
      <div className="wheel-controls">
        <button
          className="wheel-spin-cta"
          onClick={spinWheel}
          disabled={isSpinning}
        >
          <Sparkles size={20} />
          <span>{isSpinning ? "Buscando tu llamada..." : "Girar la Ruleta de la Santidad"}</span>
        </button>

        <span className="wheel-helper-text">
          <span>✠</span> Haz clic en el centro o en el botón para recibir tu compromiso
        </span>
      </div>
    </div>
  );
};
