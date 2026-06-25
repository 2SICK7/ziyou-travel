import { motion } from 'framer-motion'

interface Props {
  warnings: string[]
}

export default function WarningsPanel({ warnings }: Props) {
  if (warnings.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <div className="text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-cream mb-2">避坑提示</h2>
        <p className="text-cream/40 text-sm">来自本地旅行者的真诚建议</p>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-3">
        {warnings.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-cream/5 border border-cream/5"
          >
            <span className="text-sm flex-shrink-0 mt-0.5">{w.slice(0, 2)}</span>
            <p className="text-cream/60 text-sm leading-relaxed">{w.slice(2)}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
