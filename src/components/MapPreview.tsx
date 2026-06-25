import { motion } from 'framer-motion'

/**
 * MapPreview - 地图路线模块
 * 
 * 当前为静态占位组件。
 * 
 * 接入高德地图 API 步骤：
 * 1. 在 https://console.amap.com 注册开发者账号并获取 Key
 * 2. 在 index.html 中引入高德地图 JS API:
 *    <script src="https://webapi.amap.com/maps?v=2.0&key=YOUR_KEY"></script>
 * 3. 使用 AMap.Map 初始化地图实例
 * 4. 使用 AMap.Marker 标注景点、餐厅、酒店
 * 5. 使用 AMap.Driving 或 AMap.Walking 规划路线
 * 
 * 配置入口：
 * const AMAP_KEY = 'your_amap_key_here'
 */

const AMAP_KEY = '' // TODO: 在此填入高德地图 API Key

export default function MapPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <div className="text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-cream mb-2">路线地图</h2>
        <p className="text-cream/40 text-sm">景点分布与交通路线一览</p>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden">
        {/* Map placeholder */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] bg-dark flex items-center justify-center">
          {/* Decorative map background */}
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 800 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Grid lines */}
              {Array.from({ length: 20 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 20} x2="800" y2={i * 20} stroke="#C9A961" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 40 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="400" stroke="#C9A961" strokeWidth="0.5" />
              ))}
              {/* Route lines */}
              <path d="M 200 200 Q 300 150 400 180 Q 500 210 600 170" fill="none" stroke="#C9A961" strokeWidth="2" strokeDasharray="8 4" />
              <path d="M 150 250 Q 250 280 350 260 Q 450 240 550 270" fill="none" stroke="#D4764E" strokeWidth="2" strokeDasharray="8 4" />
            </svg>
          </div>

          {/* Map points */}
          <div className="relative z-10 flex items-center justify-center gap-8 md:gap-16 flex-wrap p-8">
            {[
              { name: '雷台汉墓', x: 'left', color: 'bg-gold' },
              { name: '武威文庙', x: 'center-left', color: 'bg-sand' },
              { name: '天梯山石窟', x: 'center', color: 'bg-terracotta' },
              { name: '沙漠公园', x: 'center-right', color: 'bg-emerald-500' },
              { name: '明清街夜市', x: 'right', color: 'bg-indigo-400' },
            ].map((point, i) => (
              <motion.div
                key={point.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-4 h-4 rounded-full ${point.color} shadow-[0_0_12px_rgba(201,169,97,0.5)]`} />
                <span className="text-cream/60 text-xs whitespace-nowrap">{point.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Overlay message */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-cream/30 text-xs">
              {AMAP_KEY ? '🗺️ 高德地图已配置' : '🗺️ 地图预览模式'}
            </span>
            <span className="text-cream/20 text-[10px]">
              接入高德 API 后可查看实时路线
            </span>
          </div>
        </div>

        {/* Route info cards */}
        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: '市区核心景点', value: '步行/公交', icon: '🚶' },
            { label: '天梯山石窟', value: '约40km · 包车', icon: '🚗' },
            { label: '沙漠公园', value: '约15km · 打车', icon: '🚕' },
            { label: '白塔寺', value: '约20km · 拼车', icon: '🚌' },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-xl bg-cream/5 text-center">
              <div className="text-lg mb-1">{item.icon}</div>
              <div className="text-cream/60 text-xs">{item.label}</div>
              <div className="text-cream/40 text-[10px] mt-0.5">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
