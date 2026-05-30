import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BeeVisionSimulator({ onBack }) {
  const [isBeeMode, setIsBeeMode] = useState(false);
  const beeEye = "https://pub-f49117188c264b3ab3f0ebf703c9eb51.r2.dev/bee_sight.jpg";
  const humanEye = "https://pub-f49117188c264b3ab3f0ebf703c9eb51.r2.dev/people.jpg";

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <div className="container-wide">
        <motion.button className="btn-ghost mb-8" onClick={onBack} whileHover={{ x: -4 }}>
          <span style={{ fontSize: '1.2rem' }}>←</span>
          <span>RETURN</span>
        </motion.button>

        <motion.div className="text-center mb-10" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <p className="label text-uv-blue mb-3">◈ VISUAL PERCEPTION SIMULATOR ◈</p>
          <h1 className="title-xl">蜜蜂视觉模拟器</h1>
          <p className="body-lg text-dim mt-3">切换视角，体验蜜蜂眼中的色彩世界</p>
        </motion.div>

        <motion.div className="flex-center mb-10" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="toggle-group">
            <button className={`btn-toggle ${!isBeeMode ? 'active-honey' : ''}`} onClick={() => setIsBeeMode(false)}>
              👁️ HUMAN VISION
            </button>
            <button className={`btn-toggle ${isBeeMode ? 'active-blue' : ''}`} onClick={() => setIsBeeMode(true)}>
              🐝 BEE VISION
            </button>
          </div>
        </motion.div>

        {/* Image viewport */}
        <motion.div
          className="glass hud-corners"
          style={{ minHeight: 500, position: 'relative', overflow: 'hidden' }}
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={isBeeMode ? 'bee' : 'human'}
              src={isBeeMode ? beeEye : humanEye}
              alt={isBeeMode ? '蜜蜂视角' : '人类视角'}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </AnimatePresence>

          {/* HUD overlay */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div className="absolute top-5 left-5 right-5 flex-between">
              <div className="status-badge">
                MODE: <span style={{ fontWeight: 600, color: isBeeMode ? '#4FC3F7' : '#F5A623' }}>
                  {isBeeMode ? 'APIS MELLIFERA' : 'HOMO SAPIENS'}
                </span>
              </div>
              <div className="status-badge">λ: {isBeeMode ? '300-650nm' : '380-700nm'}</div>
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex-between">
              <div className="status-badge" style={{ maxWidth: 400 }}>
                {isBeeMode ? '🔴 Red suppressed · UV active · Polarization visible' : '👁️ Trichromatic · Red active'}
              </div>
              <div className="status-badge">EYES: {isBeeMode ? '5 (2C+3O)' : '2'}</div>
            </div>
          </div>

          <div className="hud-frame-corner tl" />
          <div className="hud-frame-corner tr" />
          <div className="hud-frame-corner bl" />
          <div className="hud-frame-corner br" />
        </motion.div>

        <motion.div className="grid-3 mt-8" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
          <div className="glass" style={{ padding: 24 }}>
            <h4 className="label-sm text-danger mb-3">🔴 RED-BLIND</h4>
            <p className="body-md text-dim">蜜蜂看不见红色。红色花朵在蜜蜂眼中会变暗，接近黑色。蜜蜂的感光细胞只能感知蓝、绿、紫外线。</p>
          </div>
          <div className="glass" style={{ padding: 24 }}>
            <h4 className="label-sm text-uv-blue mb-3">🔵 UV VISION</h4>
            <p className="body-md text-dim">蜜蜂能看到紫外线。花朵上的紫外线纹路是"导航图案"，引导蜜蜂找到花蜜。人类肉眼无法看到。</p>
          </div>
          <div className="glass" style={{ padding: 24 }}>
            <h4 className="label-sm text-uv-purple mb-3">🟣 POLARIZATION</h4>
            <p className="body-md text-dim">蜜蜂能感知偏振光。即使阴天看不见太阳，也能通过天空偏振光模式确定方向，实现精准导航。</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
