
import { motion } from 'framer-motion'
import { GeneratedRoute } from '../utils/generateRoute'
import RouteOverview from '../components/RouteOverview'
import RouteTimeline from '../components/RouteTimeline'
import AttractionShowcase from '../components/AttractionShowcase'
import RestaurantShowcase from '../components/RestaurantShowcase'
import HotelShowcase from '../components/HotelShowcase'
import BudgetChart from '../components/BudgetChart'
import WarningsPanel from '../components/WarningsPanel'
import CopyGuide from '../components/CopyGuide'
import MapPreview from '../components/MapPreview'

interface Props {
  route: GeneratedRoute
  onRegenerate: () => void
  onBack: () => void
}

export default function ResultPage({ route, onRegenerate, onBack }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pb-20"
    >
      {/* Top Bar */}
      <div className="sticky top-0 z-50 glass-card border-b border-gold/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-cream/70 hover:text-gold transition-colors text-sm flex items-center gap-2"
          >
            <span>←</span> 返回规划
          </button>
          <div className="text-sm text-cream/50 font-serif">自游｜武威旅行规划助手</div>
          <button
            onClick={onRegenerate}
            className="text-sm px-4 py-1.5 rounded-full border border-gold/40 text-gold hover:bg-gold/10 transition-all"
          >
            重新生成
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-8 space-y-12">
        <RouteOverview route={route} />
        <RouteTimeline route={route} />
        <AttractionShowcase route={route} />
        <RestaurantShowcase route={route} />
        <HotelShowcase route={route} />
        <BudgetChart route={route} />
        <MapPreview />
        <WarningsPanel warnings={route.warnings} />
        <CopyGuide route={route} />
      </div>
    </motion.div>
  )
}
