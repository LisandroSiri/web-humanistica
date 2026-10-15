import React from 'react';
import { Cross, BookOpen } from 'lucide-react';

export const FooterSection = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--color-gold-primary)' }}>
          <Cross size={24} />
        </div>

        <h3 className="footer-title font-cinzel">
          Gaudete et Exsultate
        </h3>
        <p className="footer-subtitle">
          Exhortación Apostólica del Santo Padre Francisco sobre el llamado a la santidad en el mundo contemporáneo. Capítulo IV: «Algunas notas de la santidad en el mundo actual».
        </p>

        <div className="footer-divider" />

        <p className="footer-credits">
          Espacio de divulgación y catequesis eclesial • «Alégrense y regocíjense, porque su recompensa será grande en los cielos» (Mt 5,12)
        </p>
        <p className="footer-credits">
          © 2026 • Developed by Ronda & FinDEv • <a href="https://www.vatican.va/content/francesco/es/apost_exhortations/documents/papa-francesco_esortazione-ap_20180319_gaudete-et-exsultate.html" target="_blank" rel="noopener noreferrer">Texto completo de la Exhortación Apostólica</a>
        </p>
      </div>
    </footer>
  );
}

