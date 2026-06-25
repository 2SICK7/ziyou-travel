import { motion } from 'framer-motion'
import { GeneratedRoute } from '../utils/generateRoute'

interface Props {
  route: GeneratedRoute
}

const categories = [
  { key: 'hotel' as const, label: '住宿', icon: '🏨', color: '#C9A961' },
  { key: 'food' as const, label: '餐饮', icon: '🍜', color: '#D4764E' },
  { key: 'tickets' as const, label: '门票', icon: '🎫', color: '#8B4D3B' },
  { key: 'transport' as const, label: '交通', icon: '🚗', color: '#6B8E7B' },
  { key: 'backup' as const, label: '备用金', icon: '💰', color: '#7B8E6B' },
]

export default function BudgetChart({ route }: Props) {
  const { budgetBreakdown } = route
  const total = Object.values(budgetBreakdown).reduce((a, b) => a + b, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-cream mb-2">预算拆分</h2>
        <p className="text-cream/40 text-sm">每一分钱都花得明明白白</p>
      </div>

      <div className="glass-card rounded-3xl p-6 md:p-8">
        {/* Visual bar */}
        <div className="mb-8">
          <div className="flex rounded-full overflow-hidden h-8 bg-cream/5">
            {categories.map((cat) => {
              const value = budgetBreakdown[cat.key]
              const pct = (value / total) * 100
              return (
                <motion.div
                  key={cat.key}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-full relative group"
                  style={{ backgroundColor: cat.color }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {Math.round(pct)}%
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Detail grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat, i) => {
            const value = budgetBreakdown[cat.key]
            const pct = Math.round((value / total) * 100)
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="text-center p-4 rounded-2xl bg-cream/5 border border-cream/5"
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <div className="text-cream/40 text-xs mb-1">{cat.label}</div>
                <div className="text-xl font-bold" style={{ color: cat.color }}>
                  ¥{value}
                </div>
                <div className="text-cream/30 text-xs mt-1">{pct}%</div>
              </motion.div>
            )
          })}
        </div>

        {/* Total */}
        <div className="mt-6 pt-4 border-t border-cream/10 flex items-center justify-between">
          <span className="text-cream/50 text-sm">总计</span>
          <span className="text-2xl font-bold sand-text">¥{total}</span>
        </div>
      </div>
    </motion.div>
  )
}
