/**
 * Generador de efectos de sonido sintéticos para la ruleta sagrada
 * mediante Web Audio API (100% nativo, sin dependencias ni archivos externos).
 */
class WheelAudioManager {
  constructor() {
    this.audioCtx = null;
  }

  init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  /**
   * Sonido de 'click' o trinquete de madera al pasar cada sector de la ruleta
   */
  playTick() {
    try {
      this.init();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      // Frecuencia corta y aguda similar a trinquete de madera litúrgica
      osc.frequency.setValueAtTime(520, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch {
      // Ignorar fallos de audio si el navegador bloquea autoplay
    }
  }

  /**
   * Campanilla o acorde litúrgico suave cuando la ruleta se detiene
   */
  playChime() {
    try {
      this.init();
      if (!this.audioCtx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // Acorde mayor C5 - E5 - G5 - C6 celestial
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.12, this.audioCtx.currentTime + idx * 0.07 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + idx * 0.07 + 1.2);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(this.audioCtx.currentTime + idx * 0.07);
        osc.stop(this.audioCtx.currentTime + idx * 0.07 + 1.2);
      });
    } catch {
      // Degrada silenciosamente
    }
  }
}

export const wheelAudio = new WheelAudioManager();
