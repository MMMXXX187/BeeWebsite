import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { beeQuizData } from '../data/knowledge';

function InsectCard({ insect, onSelect, revealed, isCorrect }) {
  const borderColor = !revealed ? 'transparent' : isCorrect ? '#66BB6A' : '#EF5350';
  const bgColor = !revealed ? 'transparent' : isCorrect ? 'rgba(102, 187, 106, 0.08)' : 'rgba(239, 83, 80, 0.08)';

  return (
    <motion.button
      className="card"
      style={{ padding: 24, textAlign: 'left', cursor: 'pointer', borderColor, background: bgColor || undefined }}
      onClick={() => !revealed && onSelect(insect)}
      whileHover={!revealed ? { scale: 1.03, y: -4 } : {}}
      whileTap={!revealed ? { scale: 0.97 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {!revealed && (
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.04), transparent)', opacity: 0, transition: 'opacity 0.3s', borderRadius: 16 }} />
      )}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ fontSize: '2.8rem', marginBottom: 16 }}>{insect.emoji}</div>
        <h4 className="body-lg" style={{ fontWeight: 700, marginBottom: 4 }}>{insect.name}</h4>
        <p className="mono-sm" style={{ fontStyle: 'italic', marginBottom: 12 }}>{insect.latin}</p>
        <p className="body-md text-dim mb-4" style={{ lineHeight: 1.6 }}>{insect.features}</p>

        {revealed && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className={`result-badge ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}
            </div>
            <p className="body-md mt-5" style={{ lineHeight: 1.7 }}>{insect.detail}</p>
          </motion.div>
        )}

        {!revealed && (
          <div className="label-sm text-honey mt-3" style={{ opacity: 0, transition: 'opacity 0.3s' }}>JUDGE →</div>
        )}
      </div>
    </motion.button>
  );
}

export default function BeeQuizGame({ onBack }) {
  const [selections, setSelections] = useState({});
  const [score, setScore] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = useCallback((insect) => {
    setSelections((prev) => ({ ...prev, [insect.id]: insect.isBee }));
  }, []);

  const handleSubmit = () => {
    let correct = 0;
    beeQuizData.forEach((insect) => { if (selections[insect.id] === insect.isBee) correct++; });
    setScore(correct);
    setShowResult(true);
  };

  const handleReset = () => { setSelections({}); setScore(null); setShowResult(false); };

  const allSelected = Object.keys(selections).length === beeQuizData.length;

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <div className="container-wide">
        <motion.button className="btn-ghost mb-8" onClick={onBack} whileHover={{ x: -4 }}>
          <span style={{ fontSize: '1.2rem' }}>←</span>
          <span>RETURN</span>
        </motion.button>

        <motion.div className="text-center mb-10" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <p className="label text-honey mb-3">◈ SPECIES IDENTIFICATION CHALLENGE ◈</p>
          <h1 className="title-xl">真假蜜蜂鉴定器</h1>
          <p className="body-lg text-dim mt-3">哪些是真正的蜜蜂属（Apis）？根据膝状触角、花粉篮、复眼结构来判断</p>
        </motion.div>

        <motion.div className="glass mx-auto mb-8" style={{ padding: '14px 28px', maxWidth: 500, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}>
          <span className="mono">IDENTIFIED: <span className="text-honey" style={{ fontWeight: 600 }}>{Object.keys(selections).length}</span> / {beeQuizData.length}</span>
          {showResult && score !== null && (
            <span className="mono">SCORE: <span style={{ fontWeight: 600, color: score >= 6 ? 'var(--success)' : 'var(--danger)' }}>{score}</span> / {beeQuizData.length}</span>
          )}
        </motion.div>

        <motion.div className="glass mx-auto mb-10" style={{ padding: 24, maxWidth: 700, borderRadius: 16, textAlign: 'center' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <p className="body-md text-dim">
            <span className="text-honey" style={{ fontWeight: 700 }}>点击卡片</span> 选择你认为是 <span className="text-success" style={{ fontWeight: 700 }}>真正的蜜蜂</span> 的昆虫，再次点击取消选择。选完后提交答案。
          </p>
        </motion.div>

        <div className="grid-4">
          {beeQuizData.map((insect, i) => (
            <motion.div key={insect.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.4 }}
              className={selections[insect.id] === true ? 'ring-selected' : ''}>
              <InsectCard insect={insect} onSelect={handleSelect} revealed={showResult}
                isCorrect={showResult ? selections[insect.id] === insect.isBee : undefined} />
            </motion.div>
          ))}
        </div>

        <motion.div className="flex-center mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          {!showResult ? (
            <button className={`btn ${!allSelected ? 'disabled' : ''}`} onClick={allSelected ? handleSubmit : undefined} disabled={!allSelected}>
              SUBMIT ANSWERS
            </button>
          ) : (
            <button className="btn" onClick={handleReset}>TRY AGAIN</button>
          )}
        </motion.div>

        <AnimatePresence>
          {showResult && score !== null && (
            <motion.div className="glass-strong mx-auto mt-10 text-center" style={{ padding: 40, maxWidth: 500 }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }} transition={{ type: 'spring', stiffness: 150 }}>
              <motion.div className="inline-block mb-5" style={{ fontSize: '3.5rem' }}
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
                {score >= 7 ? '🏆' : score >= 5 ? '🐝' : '🔬'}
              </motion.div>
              <h3 className="title-md mb-3" style={{ color: score >= 6 ? 'var(--success)' : 'var(--honey)' }}>
                {score >= 7 ? 'BEE EXPERT!' : score >= 5 ? 'GOOD JOB!' : 'KEEP LEARNING!'}
              </h3>
              <p className="body-md text-dim" style={{ lineHeight: 1.7 }}>
                {score >= 7
                  ? '你已经掌握了蜜蜂鉴定的关键特征！'
                  : score >= 5
                  ? '不错的尝试！记住：膝状触角、花粉篮、复眼结构是鉴定蜜蜂的关键。'
                  : '继续学习！真正的蜜蜂属于蜜蜂属（Apis），拥有膝状触角和花粉篮。'}
              </p>
              <div className="data-line mx-auto mt-5" style={{ width: 100 }} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="glass mx-auto mt-10" style={{ padding: 32, maxWidth: 800, borderRadius: 16 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <h4 className="label-sm text-honey mb-4">◈ IDENTIFICATION KEY ◈</h4>
          <div className="grid-2">
            <div className="info-box"><span className="info-bullet">•</span><span><strong>膝状触角</strong> — 真正的蜜蜂触角呈膝状弯曲</span></div>
            <div className="info-box"><span className="info-bullet">•</span><span><strong>花粉篮</strong> — 后足特化用于携带花粉</span></div>
            <div className="info-box"><span className="info-bullet">•</span><span><strong>复眼结构</strong> — 大型复眼感知紫外线</span></div>
            <div className="info-box"><span className="info-bullet">•</span><span><strong>背板颜色</strong> — 黄黑相间的条纹模式</span></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
