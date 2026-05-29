import { motion } from 'framer-motion';

export default function FloatingBee() {
  return (
    <motion.div
      style={{ position: 'fixed', zIndex: 5, pointerEvents: 'none', userSelect: 'none', right: '8%', top: '15%' }}
      animate={{
        x: [0, 30, -10, 20, 0],
        y: [0, -20, -40, -10, 0],
        rotate: [0, 5, -3, 4, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        {/* Wings */}
        <motion.ellipse
          cx="18" cy="14" rx="8" ry="12"
          fill="rgba(79, 195, 247, 0.25)"
          stroke="rgba(79, 195, 247, 0.4)"
          strokeWidth="0.5"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 0.08, repeat: Infinity }}
          style={{ transformOrigin: '18px 26px' }}
        />
        <motion.ellipse
          cx="30" cy="14" rx="8" ry="12"
          fill="rgba(79, 195, 247, 0.25)"
          stroke="rgba(79, 195, 247, 0.4)"
          strokeWidth="0.5"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 0.08, repeat: Infinity, delay: 0.04 }}
          style={{ transformOrigin: '30px 26px' }}
        />
        {/* Body */}
        <ellipse cx="24" cy="28" rx="7" ry="10" fill="#1A1A2E" />
        {/* Stripes */}
        <rect x="17" y="24" width="14" height="2" rx="1" fill="#FFD54F" opacity="0.9" />
        <rect x="17" y="28" width="14" height="2" rx="1" fill="#FFD54F" opacity="0.9" />
        <rect x="18" y="32" width="12" height="2" rx="1" fill="#FFD54F" opacity="0.9" />
        {/* Head */}
        <circle cx="24" cy="18" r="4" fill="#1A1A2E" />
        {/* Eyes */}
        <circle cx="22" cy="17" r="1" fill="#F5A623" />
        <circle cx="26" cy="17" r="1" fill="#F5A623" />
        {/* Antennae */}
        <path d="M22 14 Q20 8 17 6" stroke="#F5A623" strokeWidth="0.8" fill="none" />
        <path d="M26 14 Q28 8 31 6" stroke="#F5A623" strokeWidth="0.8" fill="none" />
        <circle cx="17" cy="6" r="1" fill="#F5A623" />
        <circle cx="31" cy="6" r="1" fill="#F5A623" />
      </svg>
    </motion.div>
  );
}
