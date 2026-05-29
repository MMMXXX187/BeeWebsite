import { motion } from 'framer-motion';
import { hexNavItems } from '../data/knowledge';

function HexButton({ item, index, onClick, delay }) {
  return (
    <motion.button
      className="hex-btn"
      onClick={() => onClick(item.id)}
      initial={{ opacity: 0, scale: 0.5, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: delay + 0.1 * index, duration: 0.6, type: 'spring', stiffness: 120 }}
    >
      <div className="hex-btn-glow" />
      <div className="hex-btn-bg" />
      <div className="hex-btn-inner-glow" />
      <div className="hex-btn-content">
        <span className="hex-btn-icon">{item.icon}</span>
        <span className="hex-btn-label">{item.label}</span>
        <div className="hex-btn-line" />
      </div>
    </motion.button>
  );
}

export default function HoneycombNav({ onNavigate }) {
  return (
    <motion.div
      className="page-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="data-line mx-auto mb-8" style={{ width: 220 }} />

        <p className="mono mb-4 text-dim" style={{ letterSpacing: '0.5em',fontSize: '1rem',fontFamily: "'Noto Sans SC', sans-serif" }}>
          ◈ 蜜蜂 · 生态 · 人类 ◈
        </p>

        <h1 className="title-hero mb-4"> Discover the Wonders of Bees</h1>

        <h2 className="subtitle mb-3" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
          走进蜜蜂的奇妙天地
        </h2>

        <div className="data-line mx-auto mt-8" style={{ width: 220 }} />
      </motion.div>

      {/* Honeycomb Grid */}
      <motion.div
        className="hex-nav-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="hex-nav-row">
          <HexButton item={hexNavItems[0]} index={0} onClick={onNavigate} delay={0.4} />
          <HexButton item={hexNavItems[1]} index={1} onClick={onNavigate} delay={0.5} />
          <HexButton item={hexNavItems[2]} index={2} onClick={onNavigate} delay={0.6} />
        </div>
        <div className="hex-nav-row offset">
          <HexButton item={hexNavItems[3]} index={3} onClick={onNavigate} delay={0.7} />
          <HexButton item={hexNavItems[4]} index={4} onClick={onNavigate} delay={0.8} />
        </div>
      </motion.div>

      {/* Status */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
      </motion.div>
    </motion.div>
  );
}
