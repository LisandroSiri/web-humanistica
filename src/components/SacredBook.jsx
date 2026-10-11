import React, { useEffect, useRef, useState, useId } from 'react';
import { PageFlip } from 'page-flip';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  Hand,
  Shield,
  Smile,
  Flame,
  Users,
  Cross
} from 'lucide-react';
import { notesData } from '../data/notesData';
import '../styles/book-flip.css';

const iconMap = {
  Shield,
  Smile,
  Flame,
  Users,
  Cross
};

export const SacredBook = () => {
  const containerRef = useRef(null);
  const templateRef = useRef(null);
  const pageFlipInstance = useRef(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(8);
  const [orientation, setOrientation] = useState('landscape');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !templateRef.current) return;

    // Crear el elemento DOM donde PageFlip montará el libro
    const mountElement = document.createElement('div');
    mountElement.className = 'book-mount-container';
    containerRef.current.appendChild(mountElement);

    // Clonar las páginas desde la plantilla para no alterar el árbol de React
    const sourcePages = templateRef.current.querySelectorAll('.book-page-soft');
    const clonedPages = Array.from(sourcePages).map((el) => el.cloneNode(true));

    let flip = null;

    try {
      flip = new PageFlip(mountElement, {
        width: 460,
        height: 640,
        size: 'stretch',
        minWidth: 300,
        maxWidth: 540,
        minHeight: 460,
        maxHeight: 700,
        drawShadow: true,
        maxShadowOpacity: 0.55,
        showCover: false, // Fundamental: para que todas las páginas sean blandas
        showPageCorners: true,
        usePortrait: true,
        mobileScrollSupport: true,
        startPage: 0,
        flippingTime: 850,
        swipeDistance: 30,
        useMouseEvents: true,
      });

      // Cargar las páginas blandas
      flip.loadFromHTML(clonedPages);
      pageFlipInstance.current = flip;

      flip.on('init', (e) => {
        setIsReady(true);
        if (e && e.data) {
          setCurrentPage(e.data.page || 0);
          setOrientation(e.data.mode || 'landscape');
        }
        setTotalPages(flip.getPageCount());
      });

      flip.on('flip', (e) => {
        setCurrentPage(e.data);
      });

      flip.on('changeOrientation', (e) => {
        setOrientation(e.data);
      });
    } catch (err) {
      console.error('Error inicializando PageFlip:', err);
    }

    return () => {
      if (flip) {
        try {
          flip.destroy();
        } catch (e) {
          // Captura segura si ya fue destruido
        }
      }
      if (mountElement && mountElement.parentNode) {
        mountElement.parentNode.removeChild(mountElement);
      }
      pageFlipInstance.current = null;
    };
  }, []);

  const handlePrev = () => {
    if (pageFlipInstance.current) {
      pageFlipInstance.current.flipPrev();
    }
  };

  const handleNext = () => {
    if (pageFlipInstance.current) {
      pageFlipInstance.current.flipNext();
    }
  };

  const handleGoToPage = (targetPageIndex) => {
    if (pageFlipInstance.current) {
      pageFlipInstance.current.flip(targetPageIndex);
    }
  };

  // Determinar texto del indicador de páginas
  const renderPageIndicator = () => {
    if (orientation === 'landscape') {
      const leftPage = currentPage % 2 === 0 ? currentPage + 1 : currentPage;
      const rightPage = Math.min(leftPage + 1, totalPages);
      return `Páginas ${leftPage} - ${rightPage} de ${totalPages}`;
    }
    return `Página ${currentPage + 1} de ${totalPages}`;
  };

  // Pestañas de acceso rápido a los capítulos
  const tabs = [
    { label: 'Prólogo', page: 0 },
    { label: 'Nota I', page: 1 },
    { label: 'Nota II', page: 2 },
    { label: 'Nota III', page: 3 },
    { label: 'Nota IV', page: 4 },
    { label: 'Nota V', page: 5 },
    { label: 'Oración', page: 6 },
    { label: 'Colofón', page: 7 },
  ];

  const isTabActive = (targetPage) => {
    if (orientation === 'landscape') {
      const currentSpreadFirst = currentPage % 2 === 0 ? currentPage : currentPage - 1;
      return targetPage === currentSpreadFirst || targetPage === currentSpreadFirst + 1;
    }
    return currentPage === targetPage;
  };

  return (
    <div className="sacred-book-wrapper">
      {/* Barra de control y navegación litúrgica */}
      <div className="book-controls-bar">
        <div className="book-controls-main">
          <button
            type="button"
            className="book-btn"
            onClick={handlePrev}
            disabled={currentPage <= 0}
            title="Página anterior"
          >
            <ChevronLeft size={18} />
            <span>Anterior</span>
          </button>

          <div className="book-page-indicator">
            <BookOpen size={16} />
            <span>{renderPageIndicator()}</span>
          </div>

          <button
            type="button"
            className="book-btn"
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
            title="Página siguiente"
          >
            <span>Siguiente</span>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Pestañas de acceso rápido a cada nota */}
        <div className="book-tabs-nav">
          {tabs.map((tab) => (
            <button
              key={tab.page}
              type="button"
              className={`book-tab-btn ${isTabActive(tab.page) ? 'active' : ''}`}
              onClick={() => handleGoToPage(tab.page)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Escenario de montaje de PageFlip */}
      <div className="book-stage" ref={containerRef}>
        {/* PageFlip montará aquí su contenedor dinámico */}
      </div>

      <div className="book-hint-text">
        <Hand size={15} />
        <span>Pasa las páginas arrastrando desde las esquinas o usando los controles superiores</span>
      </div>

      {/* Plantilla oculta en React: 8 páginas blandas (data-density="soft") */}
      <div className="book-source-template" ref={templateRef}>
        {/* PÁGINA 1: Portada Blanda & Prólogo */}
        <div className="book-page-soft page-cover-soft" data-density="soft" data-side="left">
          <div className="book-page-border" />
          <div className="book-page-inner">
            <div className="cover-sacred-cross">✠</div>
            <div className="cover-magisterium-badge">Capítulo Cuarto del Magisterio</div>
            <h3 className="cover-main-title">
              Cinco Expresiones de la Santidad en el Mundo Actual
            </h3>
            <div className="cover-ornament">✦ ✦ ✦</div>
            <p className="cover-intro-text page-dropcap">
              El Santo Padre Francisco nos ofrece en la Exhortación Apostólica <em>Gaudete et Exsultate</em> estas cinco notas espirituales no como preceptos inalcanzables, sino como señales vivas del camino. Son expresiones del amor concreto de Dios para sostenernos con paciencia, alegría comunitaria y oración en medio de las fatigas y desafíos del mundo contemporáneo.
            </p>
            <div className="cover-sign">
              Exhortación Apostólica · Gaudete et Exsultate
            </div>
            <div className="page-footer-row">
              <span className="page-roman-num">Prólogo</span>
              <span className="page-num">— 1 —</span>
              <span>GE 110</span>
            </div>
          </div>
        </div>

        {/* PÁGINAS 2 a 6: Notas Espirituales I a V */}
        {notesData.map((note, index) => {
          const pageNum = index + 2;
          const isLeft = pageNum % 2 !== 0; // en spread landscape
          const IconComp = iconMap[note.icon] || Cross;

          return (
            <div
              key={note.id}
              className="book-page-soft"
              data-density="soft"
              data-side={isLeft ? 'left' : 'right'}
            >
              <div className="book-page-border" />
              <div className="book-page-inner">
                {/* Cabecera de la página */}
                <div className="page-header-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <IconComp size={16} color="#8c6717" />
                    <span className="page-roman-num">Nota {note.number}</span>
                  </div>
                  <span className="page-badge-pill">{note.badge}</span>
                  <span className="page-ref-text">{note.sectionRef}</span>
                </div>

                {/* Título y Subtítulo */}
                <div>
                  <h3 className="page-title">{note.title}</h3>
                  <span className="page-subtitle">{note.subtitle}</span>
                </div>

                {/* Contenido Teológico */}
                <div className="page-content-body">
                  {note.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className={`page-p ${pIdx === 0 ? 'page-dropcap' : ''}`}
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Cita Bíblica */}
                {note.quote && (
                  <div className="page-quote-box">
                    {note.quote}
                  </div>
                )}

                {/* Pie de Página */}
                <div className="page-footer-row">
                  <span className="page-roman-num">Cap. IV</span>
                  <span className="page-num">— {pageNum} —</span>
                  <span>✠</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* PÁGINA 7: Epílogo y Oración de Santo Tomás Moro */}
        <div className="book-page-soft" data-density="soft" data-side="left">
          <div className="book-page-border" />
          <div className="book-page-inner">
            <div className="page-header-row">
              <span className="page-roman-num">Epílogo Espiritual</span>
              <span className="page-badge-pill">Meditación Diaria</span>
              <span className="page-ref-text">GE 126</span>
            </div>

            <div>
              <h3 className="page-title">Oración del Sentido del Humor</h3>
              <span className="page-subtitle">Santo Tomás Moro (rezada diariamente por el Papa Francisco)</span>
            </div>

            <div className="page-content-body">
              <div className="page-prayer-body">
                «Dame, Señor, una buena digestión, y también algo que digerir. Dame la salud del cuerpo, con el buen humor necesario para mantenerla.<br /><br />
                Dame, Señor, un alma santa que sepa aprovechar lo que es bueno y puro, para que no se asuste ante el pecado, sino que encuentre el modo de poner las cosas de nuevo en orden.<br /><br />
                Concédeme un alma que no conozca el aburrimiento, las quejas, los suspiros y los lamentos; y no permitas que me tome demasiado en serio esa cosa tan invasora que se llama "yo".<br /><br />
                Dame, Señor, el sentido del humor. Concédeme la gracia de comprender las bromas, para que conozca en la vida un poco de alegría y pueda comunicársela a los demás. Amén.»
              </div>
            </div>

            <div className="page-footer-row">
              <span className="page-roman-num">Plegaria</span>
              <span className="page-num">— 7 —</span>
              <span>✠</span>
            </div>
          </div>
        </div>

        {/* PÁGINA 8: Colofón y Bendición Final */}
        <div className="book-page-soft page-cover-soft" data-density="soft" data-side="right">
          <div className="book-page-border" />
          <div className="book-page-inner">
            <div className="cover-sacred-cross">✠</div>
            <div className="cover-magisterium-badge">Colofón Pastoral</div>
            <h3 className="cover-main-title">
              Laus Deo Semper
            </h3>
            <div className="cover-ornament">✦ ✦ ✦</div>
            <p className="cover-intro-text" style={{ textAlign: 'center' }}>
              «No tengas miedo de apuntar más alto, de dejarte amar y liberar por Dios. No tengas miedo de dejarte guiar por el Espíritu Santo. La santidad no te hace menos humano, porque es el encuentro de tu debilidad con la fuerza de la gracia.»
            </p>
            <div className="cover-sign" style={{ marginTop: '0.8rem' }}>
              — Papa Francisco, Gaudete et Exsultate 34
            </div>
            <div className="page-footer-row">
              <span className="page-roman-num">Conclusión</span>
              <span className="page-num">— 8 —</span>
              <span>Vaticano</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
