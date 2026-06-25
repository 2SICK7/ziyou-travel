import { useState } from 'react'
import { motion } from 'framer-motion'
import { GeneratedRoute } from '../utils/generateRoute'
import { getAttractionById } from '../data/attractions'
import { getRestaurantById } from '../data/restaurants'
import { hotels } from '../data/hotels'

interface Props {
  route: GeneratedRoute
}

export default function CopyGuide({ route }: Props) {
  const [copied, setCopied] = useState(false)

  const generateText = (): string => {
    let text = ''
    text += `🏜️ 自游旅行攻略\n`
    text += `━━━━━━━━━━━━━━━\n`
    text += `📍 ${route.city}\n`
    text += `📅 ${route.days}天 | 💰 ¥${route.totalBudget} | ${route.budgetLevel}型\n`
    text += `🏷️ ${route.personalityLabel}\n`
    text += `━━━━━━━━━━━━━━━\n\n`

    text += `📝 路线简介\n`
    text += `${route.routeDescription}\n\n`

    route.dailyPlans.forEach(plan => {
      text += `━━━ D${plan.day}: ${plan.theme} ━━━\n\n`
      plan.slots.filter(s => s.places.length > 0).forEach(slot => {
        const timeMap: Record<string, string> = {
          morning: '🌅 上午',
          noon: '☀️ 中午',
          afternoon: '🌤️ 下午',
          evening: '🌙 晚上',
        }
        const placeId = slot.places[0]
        const attraction = getAttractionById(placeId)
        const restaurant = getRestaurantById(placeId)
        const name = attraction?.name || restaurant?.name || placeId

        text += `${timeMap[slot.type]}: ${name}\n`
        if (attraction) text += `   ${attraction.ticket} | ${attraction.duration}\n`
        if (restaurant) text += `   人均¥${restaurant.price}\n`
        text += `\n`
      })
    })

    const hotel = hotels.find(h => h.id === route.hotelRecommendation)
    if (hotel) {
      text += `━━━ 🏨 住宿推荐 ━━━\n`
      text += `${hotel.name} | ${hotel.priceRange}\n`
      text += `${hotel.area} · ${hotel.convenience}\n\n`
    }

    text += `━━━ 💰 预算拆分 ━━━\n`
    text += `住宿: ¥${route.budgetBreakdown.hotel}\n`
    text += `餐饮: ¥${route.budgetBreakdown.food}\n`
    text += `门票: ¥${route.budgetBreakdown.tickets}\n`
    text += `交通: ¥${route.budgetBreakdown.transport}\n`
    text += `备用: ¥${route.budgetBreakdown.backup}\n\n`

    if (route.warnings.length > 0) {
      text += `━━━ ⚠️ 避坑提示 ━━━\n`
      route.warnings.forEach(w => { text += `${w}\n` })
      text += `\n`
    }

    text += `━━━━━━━━━━━━━━━\n`
    text += `由「自游」生成\n`
    text += `祝旅途愉快！🐫`

    return text
  }

  const handleCopy = async () => {
    const text = generateText()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center space-y-4"
    >
      <h2 className="font-serif text-2xl text-cream">复制攻略</h2>
      <p className="text-cream/40 text-sm">一键复制完整攻略，分享到微信、小红书或备忘录</p>

      <button
        onClick={handleCopy}
        className={`px-8 py-3 rounded-full text-sm font-semibold transition-all ${
          copied
            ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30'
            : 'gold-gradient text-ink hover:shadow-[0_0_30px_rgba(201,169,97,0.3)]'
        }`}
      >
        {copied ? '✓ 已复制到剪贴板' : '📋 复制完整攻略'}
      </button>
    </motion.div>
  )
}
