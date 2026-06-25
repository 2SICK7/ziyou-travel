
import { motion } from 'framer-motion'
import { GeneratedRoute } from '../utils/generateRoute'

interface Props {
  route: GeneratedRoute
}

const pressureColors: Record<string, string> = {
  '轻松': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  '合理': 'text-gold bg-gold/10 border-gold/20',
  '偏紧': 'text-sand bg-sand/10 border-sand/20',
  '极限': 'text-red-400 bg-red-400/10 border-red-400/20',
}

export default function RouteOverview({ route }: Props) {
  const perDay = Math.round(route.totalBudget / route.days)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      {/* Title area */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5">
          <span className="text-gold text-xs">{route.personalityLabel}</span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl text-cream">
          你的<span className="sand-text">凉州</span>旅行路线
        </h1>
        <p className="text-cream/40 text-sm max-w-2xl mx-auto leading-relaxed">
          {route.routeDescription}
        </p>
      </div>

      {/* Route tags */}
      <div className="flex flex-wrap justify-center gap-2">
        {route.routeTags.map(tag => (
          <span key={tag} className="px-3 py-1 rounded-full text-xs bg-cream/5 text-cream/50 border border-cream/10">
            #{tag}
          </span>
        ))}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass-card rounded-2xl p-5 text-center">
          <div className="text-cream/40 text-xs mb-1">旅行天数</div>
          <div className="text-2xl font-bold text-cream">{route.days}<span className="text-sm text-cream/40 ml-1">天</span></div>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <div className="text-cream/40 text-xs mb-1">总预算</div>
          <div className="text-2xl font-bold sand-text">¥{route.totalBudget}</div>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <div className="text-cream/40 text-xs mb-1">日均预算</div>
          <div className="text-2xl font-bold text-cream">¥{perDay}</div>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <div className="text-cream/40 text-xs mb-1">预算压力</div>
          <div className={`text-lg font-bold px-3 py-1 rounded-full border inline-block ${pressureColors[route.pressureIndex]}`}>
            {route.pressureIndex}
          </div>
        </div>
      </div>

      {/* Budget level badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-card">
          <span className="text-cream/40 text-sm">预算评级</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            route.budgetLevel === '经济' ? 'bg-emerald-400/10 text-emerald-400' :
            route.budgetLevel === '舒适' ? 'bg-gold/10 text-gold' :
            'bg-sand/10 text-sand'
          }`}>
            {route.budgetLevel}型旅行
          </span>
        </div>
      </div>
    </motion.div>
  )
}
