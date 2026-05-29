import { motion } from 'framer-motion';

const features = [
  {
    id: 'vision',
    icon: '👁️',
    title: '蜜蜂视觉模拟器',
    subtitle: 'BEE VISION SIMULATOR',
    description: '体验蜜蜂眼中的世界：红色盲模拟、紫外线高亮、偏振光导航。切换人类/蜜蜂视角，感受完全不同的色彩宇宙。',
    color: '#4FC3F7',
    tag: 'VISUAL PERCEPTION',
  },
  {
    id: 'quiz',
    icon: '🔍',
    title: '真假蜜蜂鉴定器',
    subtitle: 'SPECIES IDENTIFIER',
    description: '你能分辨真正的蜜蜂吗？根据膝状触角、花粉篮、复眼结构等特征，鉴定哪些昆虫属于蜜蜂属（Apis）。',
    color: '#F5A623',
    tag: 'IDENTIFICATION',
  },
];

export default function LabPage({ onBack, onStartVision, onStartQuiz }) {
  const handleSelect = (id) => {
    if (id === 'vision') onStartVision();
    else onStartQuiz();
  };

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container grow flex-col">
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
            <span style={{ fontSize: '1.8rem' }}>🎮</span>
            <div style={{ textAlign: 'right' }}>
              <p className="label-sm text-danger">INTERACTIVE LAB</p>
              <p className="body-md" style={{ fontWeight: 500 }}>互动实验室</p>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="data-line mx-auto mb-8" style={{ width: 160 }} />
          <motion.span
            className="inline-block mb-6"
            style={{ fontSize: '3.5rem' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.35, type: 'spring', stiffness: 200 }}
          >
            🎮
          </motion.span>
          <p className="label text-danger mb-3">◈ EXPERIENCE AS A BEE ◈</p>
          <h1 className="title-xl mb-4">互动实验室</h1>
          <p className="body-lg text-dim">亲自体验"成为蜜蜂" — 选择一个实验开始</p>
          <div className="data-line mx-auto mt-8" style={{ width: 160 }} />
        </motion.div>

        {/* Feature cards */}
        <div className="grow flex-center">
          <div className="grid-2 w-full">
            {features.map((feat, i) => (
              <motion.button
                key={feat.id}
                className="card"
                style={{ padding: 36, textAlign: 'left', cursor: 'pointer' }}
                onClick={() => handleSelect(feat.id)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.15, type: 'spring', stiffness: 100 }}
                whileHover={{ scale: 1.03, y: -6 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="card-accent-top" style={{ background: `linear-gradient(90deg, transparent, ${feat.color}, transparent)` }} />

                <div className="flex gap-3 mb-6" style={{ alignItems: 'center' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: feat.color, boxShadow: `0 0 10px ${feat.color}40` }} />
                  <span className="label-sm" style={{ color: feat.color }}>{feat.tag}</span>
                </div>

                <span className="inline-block mb-6" style={{ fontSize: '2.8rem' }}>{feat.icon}</span>

                <h3 className="title-md mb-2">{feat.title}</h3>
                <p className="label-sm mb-5" style={{ color: feat.color }}>{feat.subtitle}</p>

                <p className="body-md text-dim mb-8" style={{ lineHeight: 1.7 }}>{feat.description}</p>

                <div className="label-sm transition" style={{ color: feat.color, opacity: 0 }}>
                  LAUNCH →
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          className="text-center pt-10 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="mono-sm" style={{ opacity: 0.5 }}>SELECT AN EXPERIMENT TO BEGIN</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
