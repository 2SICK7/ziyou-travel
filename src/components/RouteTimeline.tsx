
import { motion } from 'framer-motion'
import { GeneratedRoute } from '../utils/generateRoute'
import { getAttractionById } from '../data/attractions'
import { getRestaurantById } from '../data/restaurants'

interface Props {
  route: GeneratedRoute
}

const timeLabels: Record<string, { label: string; icon: string; color: string }> = {
  morning: { label: '上午', icon: '🌅', color: 'from-amber-500/20 to-transparent' },
  noon: { label: '中午', icon: '☀️', color: 'from-orange-500/20 to-transparent' },
  afternoon: { label: '下午', icon: '🌤️', color: 'from-gold/20 to-transparent' },
  evening: { label: '晚上', icon: '🌙', color: 'from-indigo-500/20 to-transparent' },
}

export default function RouteTimeline({ route }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-cream mb-2">每日路线</h2>
        <p className="text-cream/40 text-sm">时间轴展示，合理安排每一刻</p>
      </div>

      {route.dailyPlans.map((plan, dayIdx) => (
        <motion.div
          key={plan.day}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: dayIdx * 0.1 }}
          className="glass-card rounded-3xl overflow-hidden"
        >
          {/* Day header */}
          <div className="px-6 py-4 border-b border-cream/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-ink font-bold text-sm">
                D{plan.day}
              </div>
              <div>
                <h3 className="font-serif text-cream text-lg">{plan.theme}</h3>
                <p className="text-cream/40 text-xs">第{plan.day}天</p>
              </div>
            </div>
          </div>

          {/* Timeline slots */}
          <div className="p-6 space-y-4">
            {plan.slots.filter(s => s.places.length > 0).map((slot, slotIdx) => {
              const timeInfo = timeLabels[slot.type]
              const placeId = slot.places[0]
              const attraction = getAttractionById(placeId)
              const restaurant = getRestaurantById(placeId)
              const item = attraction || restaurant

              return (
                <div key={slotIdx} className="flex gap-4">
                  {/* Time indicator */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-cream/5 flex items-center justify-center text-sm">
                      {timeInfo.icon}
                    </div>
                    {slotIdx < plan.slots.filter(s => s.places.length > 0).length - 1 && (
                      <div className="w-px flex-1 bg-cream/10 mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 rounded-2xl p-4 bg-gradient-to-r ${timeInfo.color} border border-cream/5`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cream/50 text-xs">{timeInfo.label}</span>
                      {slot.duration && (
                        <span className="text-cream/30 text-xs">{slot.duration}</span>
                      )}
                    </div>

                    {item && (
                      <div className="flex gap-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-cream font-semibold text-sm">{item.name}</h4>
                          {attraction && (
                            <>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {attraction.tags.slice(0, 2).map(tag => (
                                  <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-gold/10 text-gold/70">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <p className="text-cream/40 text-xs mt-1 line-clamp-2">{attraction.description}</p>
                            </>
                          )}
                          {restaurant && (
                            <>
                              <p className="text-cream/40 text-xs mt-1">人均 ¥{restaurant.price}</p>
                              <p className="text-cream/40 text-xs line-clamp-1">{restaurant.dishes.join('、')}</p>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {!item && slot.places[0] && (
                      <div>
                        <h4 className="text-cream font-semibold text-sm">{slot.places[0]}</h4>
                        <p className="text-cream/40 text-xs mt-1">{slot.activity}</p>
                      </div>
                    )}

                    {slot.tips && (
                      <p className="text-gold/50 text-xs mt-2 flex items-center gap-1">
                        <span>💡</span> {slot.tips}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
