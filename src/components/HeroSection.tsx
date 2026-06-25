
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-dark to-ink" />
        
        {/* Decorative pattern - Silk Road inspired */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A961' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent" />
        
        {/* Floating particles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-gold/30"
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-sand/40"
          animate={{ y: [10, -10, 10], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-gold/50"
          animate={{ y: [-5, 15, -5], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Decorative top element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-gold/20 bg-gold/5">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold/80 text-sm tracking-wider">一站式旅行规划向导</span>
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          </div>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="sand-text">自游</span>
          <span className="text-cream/30 mx-3 md:mx-5">·</span>
          <br className="md:hidden" />
          <span className="text-cream text-3xl md:text-5xl lg:text-6xl font-normal">
            一站式武威旅行规划助手
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-cream/50 text-lg md:text-xl mb-4 font-light max-w-2xl mx-auto leading-relaxed"
        >
          输入预算与天数，让 AI 为你生成专属武威旅游路线，覆盖景点、美食、住宿与每日花费。
        </motion.p>

        {/* Poetic line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gold/40 text-sm md:text-base mb-12 font-serif italic"
        >
          "葡萄美酒夜光杯，欲饮琵琶马上催" —— 王翰《凉州词》
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#planner"
            className="group relative px-8 py-4 rounded-full gold-gradient text-ink font-semibold text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(201,169,97,0.3)]"
          >
            <span className="relative z-10">开始规划</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-full border border-cream/20 text-cream/70 hover:border-gold/40 hover:text-gold transition-all text-lg"
          >
            探索路线
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-cream/20 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-gold/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
