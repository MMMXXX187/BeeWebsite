import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 flex-col flex-center"
      style={{ zIndex: 9999, background: '#0A0C10' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative mb-10"
        style={{ width: 128, height: 128 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <polygon points="50,2 93,25 93,75 50,98 7,75 7,25" fill="none" stroke="#F5A623" strokeWidth="1.5" opacity="0.6" />
          <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" fill="none" stroke="#4FC3F7" strokeWidth="1" opacity="0.4" />
        </svg>
        <motion.div
          className="absolute inset-0 flex-center"
          style={{ fontSize: '2.8rem' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🐝
        </motion.div>
      </motion.div>

      <motion.h1
        className="title-md text-honey mb-4"
        style={{ letterSpacing: '0.4em' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Discover the Wonders of Bees
      </motion.h1>

      <motion.p
        className="body-lg text-dim mb-10"
        style={{ letterSpacing: '0.3em' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        走进蜜蜂的奇妙天地
      </motion.p>

      <motion.div style={{ width: 220, height: 3, background: 'var(--border)', borderRadius: 999, overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', background: 'var(--honey)', borderRadius: 999 }}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.p
        className="mono mt-5 text-dim"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{ delay: 0.8, duration: 1.5, repeat: Infinity }}
      >
        INITIALIZING NEURAL INTERFACE...
      </motion.p>
    </motion.div>
  );
}
