import { motion } from 'framer-motion'
import { GeneratedRoute } from '../utils/generateRoute'
import { hotels } from '../data/hotels'

interface Props {
  route: GeneratedRoute
}

const typeColors: Record<string, string> = {
  '经济': 'border-emerald-400/30 bg-emerald-400/5',
  '舒适': 'border-gold/30 bg-gold/5',
  '高级': 'border-sand/30 bg-sand/5',
}

const typeBadgeColors: Record<string, string> = {
  '经济': 'bg-emerald-400/10 text-emerald-400',
  '舒适': 'bg-gold/10 text-gold',
  '高级': 'bg-sand/10 text-sand',
}

export default function HotelShowcase({ route }: Props) {
  const recommendedId = route.hotelRecommendation
  const recommended = hotels.find(h => h.id === recommendedId)
  const others = hotels.filter(h => h.id !== recommendedId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-cream mb-2">住宿推荐</h2>
        <p className="text-cream/40 text-sm">根据你的预算，精选最适合的住宿</p>
      </div>

      {/* Recommended hotel - featured */}
      {recommended && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`glass-card rounded-3xl overflow-hidden border-2 ${typeColors[recommended.type]} relative`}
        >
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-gold text-ink text-xs font-bold">
            ✦ 推荐
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-72 h-48 md:h-auto flex-shrink-0 overflow-hidden">
              <img
                src={recommended.image}
                alt={recommended.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${typeBadgeColors[recommended.type]}`}>
                  {recommended.type}
                </span>
                <h3 className="font-serif text-cream text-xl">{recommended.name}</h3>
              </div>
              <p className="text-cream/50 text-sm leading-relaxed">{recommended.description}</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-cream/40">
                  <span>💰</span> {recommended.priceRange}
                </div>
                <div className="flex items-center gap-1.5 text-cream/40">
                  <span>📍</span> {recommended.area}
                </div>
                <div className="flex items-center gap-1.5 text-cream/40">
                  <span>🚶</span> {recommended.convenience}
                </div>
                <div className="flex items-center gap-1.5 text-cream/40">
                  <span>👥</span> {recommended.suitable[0]}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {recommended.facilities.map(f => (
                  <span key={f} className="text-[10px] px-2 py-0.5 rounded bg-cream/5 text-cream/40">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Other options */}
      <div className="grid md:grid-cols-3 gap-4">
        {others.slice(0, 3).map((h, i) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl overflow-hidden group hover:border-gold/20 transition-all"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={h.image} alt={h.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <span className={`absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full ${typeBadgeColors[h.type]}`}>
                {h.type}
              </span>
            </div>
            <div className="p-4 space-y-2">
              <h4 className="text-cream font-semibold text-sm">{h.name}</h4>
              <p className="text-cream/40 text-xs">{h.area} · {h.priceRange}</p>
              <p className="text-cream/30 text-xs line-clamp-2">{h.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
