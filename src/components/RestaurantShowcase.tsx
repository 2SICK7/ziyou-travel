
import { motion } from 'framer-motion'
import { GeneratedRoute } from '../utils/generateRoute'
import { restaurants, Restaurant } from '../data/restaurants'

interface Props {
  route: GeneratedRoute
}

const timeLabels: Record<string, string> = {
  breakfast: '早餐',
  lunch: '午餐',
  dinner: '晚餐',
  night: '夜宵',
}

function RestaurantCard({ r, index }: { r: Restaurant; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="glass-card rounded-2xl overflow-hidden group hover:border-gold/30 transition-all"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-32 h-32 sm:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={r.image}
            alt={r.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-cream font-semibold">{r.name}</h3>
              <p className="text-cream/40 text-xs">{r.cuisine} · {r.location}</p>
            </div>
            <div className="text-right">
              <span className="text-sand font-bold">¥{r.price}</span>
              <span className="text-cream/30 text-xs block">人均</span>
            </div>
          </div>

          <p className="text-cream/50 text-xs leading-relaxed line-clamp-2">{r.description}</p>

          {/* Dishes */}
          <div className="flex flex-wrap gap-1">
            {r.dishes.map(d => (
              <span key={d} className="text-[10px] px-2 py-0.5 rounded bg-sand/10 text-sand/70">
                {d}
              </span>
            ))}
          </div>

          {/* Time badges */}
          <div className="flex gap-1.5">
            {r.time.map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-cream/5 text-cream/40">
                {timeLabels[t]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function RestaurantShowcase({ route }: Props) {
  const displayRestaurants = route.restaurantList.length > 0
    ? restaurants.filter(r => route.restaurantList.includes(r.id))
    : restaurants.slice(0, 6)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-cream mb-2">美食推荐</h2>
        <p className="text-cream/40 text-sm">凉州味道，从一碗三套车开始</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {displayRestaurants.map((r, i) => (
          <RestaurantCard key={r.id} r={r} index={i} />
        ))}
      </div>

      {/* API placeholder comment */}
      {/* TODO: 接入高德地图 POI API / 美团 API / 大众点评 API 获取真实餐厅数据 */}
      {/* 预留接口: fetchRestaurantsFromAPI(lat, lng, radius, category) */}
    </motion.div>
  )
}
