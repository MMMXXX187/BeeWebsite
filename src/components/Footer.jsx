import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="text-center"
      style={{ position: 'relative', zIndex: 10, padding: '56px 32px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      <div className="data-line mx-auto mb-8" style={{ width: 160 }} />

      <p className="body-lg text-dim mb-3" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
        谢谢来到蜜蜂文明 🐝
      </p>
      <p className="body-md text-dim mb-8 mx-auto" style={{ maxWidth: 500, lineHeight: 1.8 }}>
        它们不仅会采蜜，它们还会建立社会、使用语言、学习知识、解决问题、改变现代科技。
        <br />
        蜜蜂，远比人类想象中更加伟大。
      </p>

      <div className="flex-center gap-8 mb-8">
        <span className="label-sm text-honey">BEE SMART</span>
        <span className="text-dim">•</span>
        <span className="label-sm text-uv-blue">BEE CURIOUS</span>
        <span className="text-dim">•</span>
        <span className="label-sm text-success">SAVE THE BEES</span>
      </div>

      <p className="mono-sm" style={{ opacity: 0.5 }}>保护蜜蜂，保护自然。</p>

      <div className="data-line mx-auto mt-8" style={{ width: 160 }} />
    </motion.footer>
  );
}
