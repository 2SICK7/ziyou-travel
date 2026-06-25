
import { motion } from 'framer-motion'
import { GeneratedRoute } from '../utils/generateRoute'
import { attractions, Attraction } from '../data/attractions'

interface Props {
  route: GeneratedRoute
}

function AttractionCard({ a, index }: { a: Attraction; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="glass-card rounded-2xl overflow-hidden group hover:border-gold/30 transition-all"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={a.image}
          alt={a.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-serif text-cream text-lg font-semibold">{a.name}</h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {a.tags.map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-gold/20 text-gold/80 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <p className="text-cream/50 text-sm leading-relaxed line-clamp-3">{a.description}</p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-cream/40">
            <span>⏱</span>
            <span>{a.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-cream/40">
            <span>🎫</span>
            <span>{a.ticket}</span>
          </div>
          <div className="flex items-center gap-1.5 text-cream/40">
            <span>👥</span>
            <span>{a.crowd}</span>
          </div>
          <div className="flex items-center gap-1.5 text-cream/40">
            <span>✨</span>
            <span>{a.suitable[0]}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="pt-2 border-t border-cream/5">
          <p className="text-cream/30 text-xs mb-1.5">亮点</p>
          <div className="flex flex-wrap gap-1">
            {a.highlights.map(h => (
              <span key={h} className="text-[10px] px-2 py-0.5 rounded bg-cream/5 text-cream/50">
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Tips */}
        {a.tips && (
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-gold/5 border border-gold/10">
            <span className="text-gold text-xs mt-0.5">💡</span>
            <p className="text-gold/60 text-xs leading-relaxed">{a.tips}</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function AttractionShowcase({ route }: Props) {
  // Get unique attraction IDs from the route
  const usedIds = new Set<string>()
  route.dailyPlans.forEach(plan => {
    plan.slots.forEach(slot => {
      slot.places.forEach(p => {
        if (attractions.find(a => a.id === p)) {
          usedIds.add(p)
        }
      })
    })
  })

  const usedAttractions = attractions.filter(a => usedIds.has(a.id))
  const displayAttractions = usedAttractions.length > 0 ? usedAttractions : attractions

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-cream mb-2">景点详解</h2>
        <p className="text-cream/40 text-sm">路线中涉及的景点详细介绍</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {displayAttractions.map((a, i) => (
          <AttractionCard key={a.id} a={a} index={i} />
        ))}
      </div>
    </motion.div>
  )
}
