import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

export default function SectionPage({ section, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const cards = section.cards;
  const total = cards.length;
  const card = cards[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < total - 1) {
      setFlipped(false);
      setDirection(1);
      setTimeout(() => setCurrentIndex((i) => i + 1), 50);
    }
  }, [currentIndex, total]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setFlipped(false);
      setDirection(-1);
      setTimeout(() => setCurrentIndex((i) => i - 1), 50);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlipped((f) => !f); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.92 }),
  };

  const pct = Math.round(((currentIndex + 1) / total) * 100);

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container-narrow grow flex-col">
        {/* Top bar */}
        <motion.div
          className="flex-between mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button className="btn-ghost" onClick={onBack}>
            <span style={{ fontSize: '1.2rem' }}>←</span>
            <span>RETURN</span>
          </button>

          <div className="flex gap-3" style={{ alignItems: 'center' }}>
            <span style={{ fontSize: '1.8rem' }}>{section.icon}</span>
            <div style={{ textAlign: 'right' }}>
              <p className="label-sm" style={{ color: section.color }}>{section.subtitle.toUpperCase()}</p>
              <p className="body-md" style={{ fontWeight: 500 }}>{section.title}</p>
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex-between mb-3">
            <span className="mono">NODE {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
            <span className="mono">{pct}%</span>
          </div>
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              style={{ background: section.color }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Central card */}
        <div className="grow flex-center" style={{ padding: '24px 0' }}>
          <div className="w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="w-full"
              >
                <div
                  className="flip-card w-full"
                  style={{ minHeight: 380, cursor: 'pointer' }}
                  onClick={() => setFlipped(!flipped)}
                >
                  <div className={`flip-card-inner w-full ${flipped ? 'flipped' : ''}`} style={{ minHeight: 380 }}>
                    {/* FRONT */}
                    <div className="flip-card-front">
                      <div className="glass w-full h-full" style={{ padding: '40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 380, borderRadius: 16 }}>
                        <div className="card-accent-top" style={{ background: `linear-gradient(90deg, transparent, ${section.color}, transparent)` }} />

                        <div className="flex gap-4 mb-8" style={{ alignItems: 'center' }}>
                          <div style={{
                            width: 48, height: 48, borderRadius: 10,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700,
                            background: `${section.color}15`, color: section.color,
                            border: `1px solid ${section.color}30`,
                          }}>
                            {String(currentIndex + 1).padStart(2, '0')}
                          </div>
                          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, var(--border), transparent)' }} />
                        </div>

                        <div className="grow flex-center" style={{ padding: '16px 0' }}>
                          <h2 className="title-xl" style={{ lineHeight: 1.5 }}>
                            {card.front}
                          </h2>
                        </div>

                        <div className="flex-between mt-8 pt-4" style={{ borderTop: '1px solid rgba(30, 34, 48, 0.3)' }}>
                          <span className="mono-sm">TAP TO REVEAL</span>
                          <span className="text-dim" style={{ fontSize: '1.2rem' }}>⟳</span>
                        </div>
                      </div>
                    </div>

                    {/* BACK */}
                    <div className="flip-card-back">
                      <div style={{
                        minHeight: 380, borderRadius: 16, padding: '40px 48px',
                        display: 'flex', flexDirection: 'column', justifyContent: 'center',
                        background: `linear-gradient(135deg, rgba(18, 21, 28, 0.97), rgba(${hexToRgb(section.color)}, 0.06))`,
                        border: `1px solid ${section.color}25`,
                        position: 'relative', overflow: 'hidden',
                      }}>
                        <div className="card-accent-top" style={{ background: `linear-gradient(90deg, transparent, ${section.color}, transparent)` }} />
                        <div className="card-corner" style={{ background: `linear-gradient(135deg, transparent 50%, ${section.color} 50%)` }} />

                        <div className="flex gap-4 mb-8" style={{ alignItems: 'center' }}>
                          <div style={{
                            width: 10, height: 10, borderRadius: '50%',
                            background: section.color, boxShadow: `0 0 12px ${section.color}60`,
                            animation: 'pulse 2s infinite',
                          }} />
                          <span className="label" style={{ color: section.color }}>ANSWER</span>
                          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, var(--border), transparent)' }} />
                        </div>

                        <p className="body-lg">{card.back}</p>

                        <div className="mt-10 pt-4" style={{ borderTop: '1px solid rgba(30, 34, 48, 0.3)', textAlign: 'right' }}>
                          <span className="mono-sm">TAP TO FLIP BACK</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <motion.div
          className="flex-between pt-8 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            className={`btn-nav ${currentIndex === 0 ? 'disabled' : ''}`}
            onClick={goPrev}
            disabled={currentIndex === 0}
          >
            <span style={{ fontSize: '1.2rem' }}>←</span>
            <span className="hide-mobile">PREV</span>
          </button>

          <div className="dots">
            {cards.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === currentIndex ? 'active' : ''}`}
                style={{
                  background: i === currentIndex ? section.color : undefined,
                  boxShadow: i === currentIndex ? `0 0 8px ${section.color}40` : undefined,
                }}
                onClick={() => {
                  setFlipped(false);
                  setDirection(i > currentIndex ? 1 : -1);
                  setTimeout(() => setCurrentIndex(i), 50);
                }}
              />
            ))}
          </div>

          <button
            className={`btn-nav ${currentIndex === total - 1 ? 'disabled' : ''}`}
            onClick={goNext}
            disabled={currentIndex === total - 1}
          >
            <span className="hide-mobile">NEXT</span>
            <span style={{ fontSize: '1.2rem' }}>→</span>
          </button>
        </motion.div>

        <motion.div
          className="text-center pt-2 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="mono-sm" style={{ opacity: 0.5 }}>← → NAVIGATE · SPACE FLIP</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
