
import { motion } from 'framer-motion'
import { attractions } from '../data/attractions'

const FEATURES = [
  {
    icon: '🏛️',
    title: 'AI 智能路线',
    desc: '根据预算和偏好，自动生成最优游览路线',
  },
  {
    icon: '💰',
    title: '预算精算',
    desc: '住宿、餐饮、门票、交通逐项拆分，心中有数',
  },
  {
    icon: '🗺️',
    title: '文化深度',
    desc: '不只是打卡，每条路线都讲述凉州的故事',
  },
  {
    icon: '📸',
    title: '场景推荐',
    desc: '最佳拍照时间、角度，帮你记录最美瞬间',
  },
]

export default function FeatureShowcase() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center hover:border-gold/30 transition-all group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="text-cream font-semibold text-sm mb-1">{f.title}</h3>
              <p className="text-cream/40 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Attractions preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-cream mb-3">
            武威<span className="sand-text">八景</span>
          </h2>
          <p className="text-cream/40 text-sm">从汉墓到石窟，从大漠到夜市，一座城市的完整画卷</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {attractions.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <img
                src={a.image}
                alt={a.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-cream text-lg font-semibold mb-1">{a.name}</h3>
                <div className="flex flex-wrap gap-1">
                  {a.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-gold/20 text-gold/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-cream/30 text-sm mb-4 font-serif italic">
            "劝君更尽一杯酒，西出阳关无故人"
          </p>
          <a
            href="#planner"
            className="inline-flex items-center gap-2 text-gold/60 hover:text-gold transition-colors text-sm"
          >
            开始规划你的凉州之旅 →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
