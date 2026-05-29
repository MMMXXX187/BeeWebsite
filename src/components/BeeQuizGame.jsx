import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { beeQuizData } from '../data/knowledge';

const images = import.meta.glob('../assets/bees/*.png', { eager: true, import: 'default' });

function getImage(filename) {
  const key = `../assets/bees/${filename}`;
  return images[key] || null;
}

export default function BeeQuizGame({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { id: { choice: bool, correct: bool } }
  const [direction, setDirection] = useState(0);

  const items = beeQuizData;
  const total = items.length;
  const item = items[currentIndex];
  const currentAnswer = answers[item.id]; // undefined | { choice, correct }
  const isJudged = currentAnswer !== undefined;
  const allDone = Object.keys(answers).length === total;

  const judge = useCallback((choice) => {
    if (answers[item.id] !== undefined) return; // already judged
    const correct = choice === item.isBee;
    setAnswers((prev) => ({ ...prev, [item.id]: { choice, correct } }));
  }, [item, answers]);

  const goNext = useCallback(() => {
    if (currentIndex < total - 1) {
      setDirection(1);
      setTimeout(() => setCurrentIndex((i) => i + 1), 50);
    }
  }, [currentIndex, total]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setTimeout(() => setCurrentIndex((i) => i - 1), 50);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!isJudged) {
        if (e.key === '1' || e.key === 'y') judge(true);
        if (e.key === '2' || e.key === 'n') judge(false);
      } else {
        if (e.key === 'ArrowRight' || e.key === 'Enter') goNext();
        if (e.key === 'ArrowLeft') goPrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isJudged, judge, goNext, goPrev]);

  const correctCount = Object.values(answers).filter((a) => a.correct).length;

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setDirection(0);
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.92 }),
  };

  const imgSrc = getImage(item.image);

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <div className="container-narrow grow flex-col">
        {/* Top bar */}
        <motion.div className="flex-between mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <button className="btn-ghost" onClick={onBack}>
            <span style={{ fontSize: '1.2rem' }}>←</span>
            <span>RETURN</span>
          </button>
          <div className="flex gap-3" style={{ alignItems: 'center' }}>
            <span style={{ fontSize: '1.8rem' }}>🔍</span>
            <div style={{ textAlign: 'right' }}>
              <p className="label-sm text-honey">SPECIES IDENTIFIER</p>
              <p className="body-md" style={{ fontWeight: 500 }}>真假蜜蜂鉴定器</p>
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="flex-between mb-3">
            <span className="mono">SPECIMEN {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
            <span className="mono">
              {allDone
                ? <span style={{ color: correctCount >= 7 ? 'var(--success)' : 'var(--honey)', fontWeight: 600 }}>{correctCount} / {total} CORRECT</span>
                : `${Object.keys(answers).length} / ${total} JUDGED`
              }
            </span>
          </div>
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              style={{ background: 'var(--honey)' }}
              animate={{ width: `${(Object.keys(answers).length / total) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Card area */}
        <div className="grow flex-center" style={{ padding: '16px 0' }}>
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
                <div className="glass" style={{ borderRadius: 20, overflow: 'hidden' }}>
                  {/* Image */}
                  <div style={{ position: 'relative', width: '100%', height: 400, background: '#0D1117', overflow: 'hidden' }}>
                    {imgSrc ? (
                      <img src={imgSrc} alt={isJudged ? item.name : '未知昆虫'} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                      <div className="flex-center" style={{ width: '100%', height: '100%', fontSize: '4rem' }}>🐝</div>
                    )}

                    {/* Number badge */}
                    <div style={{
                      position: 'absolute', top: 16, left: 16,
                      padding: '6px 14px', borderRadius: 8,
                      background: 'rgba(10, 12, 16, 0.7)', backdropFilter: 'blur(10px)',
                      border: '1px solid var(--glass-border)',
                      fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 600,
                      color: 'var(--honey)', letterSpacing: '0.1em',
                    }}>
                      #{String(currentIndex + 1).padStart(2, '0')}
                    </div>

                    {/* Result overlay */}
                    {isJudged && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        style={{
                          position: 'absolute', inset: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: currentAnswer.correct ? 'rgba(102, 187, 106, 0.12)' : 'rgba(239, 83, 80, 0.12)',
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
                          style={{
                            padding: '14px 32px', borderRadius: 12,
                            fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700,
                            letterSpacing: '0.1em',
                            background: currentAnswer.correct ? 'rgba(102, 187, 106, 0.9)' : 'rgba(239, 83, 80, 0.9)',
                            color: '#fff',
                            boxShadow: currentAnswer.correct
                              ? '0 0 30px rgba(102, 187, 106, 0.4)'
                              : '0 0 30px rgba(239, 83, 80, 0.4)',
                          }}
                        >
                          {currentAnswer.correct ? '✓ CORRECT' : '✗ WRONG'}
                        </motion.div>
                      </motion.div>
                    )}
                  </div>

                  {/* Content area */}
                  <div style={{ padding: '28px 32px 32px' }}>
                    {/* Before judging: only show hint */}
                    {!isJudged && (
                      <>
                        <p className="body-lg text-dim text-center mb-6" style={{ lineHeight: 1.8 }}>
                          观察图片中的昆虫，判断它是否是真正的蜜蜂属（Apis）
                        </p>
                        <div className="flex gap-4">
                          <button className="btn" style={{ flex: 1, justifyContent: 'center', padding: '18px 20px', fontSize: '1rem' }} onClick={() => judge(true)}>
                            🐝 真蜜蜂
                          </button>
                          <button className="btn" style={{ flex: 1, justifyContent: 'center', padding: '18px 20px', fontSize: '1rem' }} onClick={() => judge(false)}>
                            🪰 不是蜜蜂
                          </button>
                        </div>
                        <p className="mono-sm text-center mt-5" style={{ opacity: 0.4 }}>Y = 真蜜蜂 · N = 不是蜜蜂</p>
                      </>
                    )}

                    {/* After judging: show all info */}
                    {isJudged && (
                      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
                        <h3 className="title-lg mb-1">{item.name}</h3>
                        <p className="mono-sm mb-3" style={{ fontStyle: 'italic' }}>{item.latin}</p>
                        <p className="body-md text-dim mb-5">{item.features}</p>

                        <div style={{
                          padding: '18px 22px', borderRadius: 12,
                          background: currentAnswer.correct ? 'rgba(102, 187, 106, 0.06)' : 'rgba(239, 83, 80, 0.06)',
                          border: `1px solid ${currentAnswer.correct ? 'rgba(102, 187, 106, 0.2)' : 'rgba(239, 83, 80, 0.2)'}`,
                        }}>
                          <p className="body-md" style={{ lineHeight: 1.8 }}>{item.detail}</p>
                        </div>

                        {!allDone && currentIndex < total - 1 && (
                          <div className="flex-center mt-6">
                            <button className="btn" onClick={goNext} style={{ padding: '14px 32px' }}>
                              下一题 →
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation dots */}
        <motion.div className="flex-center pb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="dots">
            {items.map((it, i) => {
              const ans = answers[it.id];
              let dotColor;
              if (ans) dotColor = ans.correct ? 'var(--success)' : 'var(--danger)';
              return (
                <button
                  key={it.id}
                  className={`dot ${i === currentIndex ? 'active' : ''}`}
                  style={{
                    background: i === currentIndex ? (dotColor || 'var(--honey)') : dotColor,
                    boxShadow: i === currentIndex ? `0 0 8px ${dotColor || 'var(--honey)'}40` : undefined,
                  }}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setTimeout(() => setCurrentIndex(i), 50);
                  }}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Bottom: final result or reset */}
        {allDone && (
          <motion.div
            className="text-center pb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="glass-strong mx-auto" style={{ padding: '28px 36px', maxWidth: 420, borderRadius: 16, marginBottom: 20 }}>
              <p style={{ fontSize: '2.5rem', marginBottom: 8 }}>{correctCount >= 8 ? '🏆' : correctCount >= 6 ? '🐝' : '🔬'}</p>
              <p className="title-md" style={{ color: correctCount >= 7 ? 'var(--success)' : 'var(--honey)', marginBottom: 8 }}>
                {correctCount >= 8 ? 'BEE EXPERT!' : correctCount >= 6 ? 'GOOD JOB!' : 'KEEP LEARNING!'}
              </p>
              <p className="body-md text-dim" style={{ lineHeight: 1.7 }}>
                {correctCount >= 8
                  ? '你已经掌握了蜜蜂鉴定的关键特征！'
                  : correctCount >= 6
                  ? '不错的尝试！记住：膝状触角、花粉篮、复眼结构是鉴定蜜蜂的关键。'
                  : '继续学习！真正的蜜蜂属于蜜蜂属（Apis），拥有膝状触角和花粉篮。'}
              </p>
            </div>
            <button className="btn" onClick={handleReset}>TRY AGAIN</button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
