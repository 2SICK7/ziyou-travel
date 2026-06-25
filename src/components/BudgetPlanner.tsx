
import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onGenerate: (budget: number, days: number, preferences: string[]) => void
}

const PRESETS = [
  { label: '穷游体验', budget: 500, days: 2 },
  { label: '周末舒适', budget: 1000, days: 2 },
  { label: '深度探索', budget: 1500, days: 3 },
  { label: '品质之旅', budget: 3000, days: 4 },
]

const PREFERENCES = [
  { id: '历史文化', icon: '🏛️', label: '历史文化' },
  { id: '美食优先', icon: '🍜', label: '美食优先' },
  { id: '拍照出片', icon: '📸', label: '拍照出片' },
  { id: '低预算穷游', icon: '💰', label: '低预算穷游' },
  { id: '舒适休闲', icon: '☕', label: '舒适休闲' },
  { id: '亲子家庭', icon: '👨‍👩‍👧', label: '亲子家庭' },
  { id: '深度文化游', icon: '📜', label: '深度文化游' },
]

export default function BudgetPlanner({ onGenerate }: Props) {
  const [budget, setBudget] = useState<number>(1000)
  const [days, setDays] = useState<number>(2)
  const [preferences, setPreferences] = useState<string[]>(['历史文化'])
  const [isGenerating, setIsGenerating] = useState(false)

  const togglePreference = (id: string) => {
    setPreferences(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    )
  }

  const handleGenerate = () => {
    if (preferences.length === 0) return
    setIsGenerating(true)
    setTimeout(() => {
      onGenerate(budget, days, preferences)
      setIsGenerating(false)
    }, 800)
  }

  return (
    <section id="planner" className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-cream mb-3">
            定制你的<span className="sand-text">凉州之旅</span>
          </h2>
          <p className="text-cream/40 text-sm">选择预算、天数和旅行偏好，AI 将为你规划最佳路线</p>
        </motion.div>

        {/* Quick presets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => { setBudget(preset.budget); setDays(preset.days) }}
              className={`px-5 py-2.5 rounded-full text-sm transition-all border ${
                budget === preset.budget && days === preset.days
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-cream/10 text-cream/50 hover:border-gold/30 hover:text-cream/70'
              }`}
            >
              {preset.label}
              <span className="ml-2 text-xs opacity-60">¥{preset.budget}/{preset.days}天</span>
            </button>
          ))}
        </motion.div>

        {/* Main planner card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 md:p-10 space-y-8"
        >
          {/* Budget input */}
          <div>
            <label className="block text-cream/70 text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xs">¥</span>
              总预算
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={200}
                max={5000}
                step={100}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="flex-1 h-2 rounded-full appearance-none bg-cream/10 accent-gold cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(201,169,97,0.5)]
                  [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="min-w-[100px] text-right">
                <span className="text-3xl font-bold sand-text">¥{budget}</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-cream/30 mt-2 px-1">
              <span>¥200 极限穷游</span>
              <span>¥5000 品质之旅</span>
            </div>
          </div>

          {/* Days selector */}
          <div>
            <label className="block text-cream/70 text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xs">☀</span>
              旅行天数
            </label>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`flex-1 py-3 rounded-xl text-center transition-all ${
                    days === d
                      ? 'gold-gradient text-ink font-bold shadow-[0_0_20px_rgba(201,169,97,0.3)]'
                      : 'bg-cream/5 text-cream/50 hover:bg-cream/10 border border-cream/10'
                  }`}
                >
                  <div className="text-xl font-bold">{d}</div>
                  <div className="text-xs mt-0.5 opacity-70">天</div>
                </button>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div>
            <label className="block text-cream/70 text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xs">✦</span>
              旅行偏好
              <span className="text-cream/30 text-xs ml-auto">可多选</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {PREFERENCES.map((pref) => (
                <button
                  key={pref.id}
                  onClick={() => togglePreference(pref.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 ${
                    preferences.includes(pref.id)
                      ? 'bg-gold/15 border border-gold/40 text-gold'
                      : 'bg-cream/5 border border-cream/10 text-cream/50 hover:border-cream/20'
                  }`}
                >
                  <span>{pref.icon}</span>
                  <span>{pref.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Summary bar */}
          <div className="flex items-center justify-between py-4 px-5 rounded-2xl bg-cream/5 border border-cream/10">
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-cream/40">预算</span>
                <span className="ml-2 text-gold font-semibold">¥{budget}</span>
              </div>
              <div>
                <span className="text-cream/40">天数</span>
                <span className="ml-2 text-gold font-semibold">{days}天</span>
              </div>
              <div>
                <span className="text-cream/40">日均</span>
                <span className="ml-2 text-sand font-semibold">¥{Math.round(budget / days)}</span>
              </div>
            </div>
            <div className="text-xs text-cream/30">
              {budget < 600 ? '经济型' : budget < 1500 ? '舒适型' : '高级型'}
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || preferences.length === 0}
            className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all relative overflow-hidden ${
              isGenerating || preferences.length === 0
                ? 'bg-cream/10 text-cream/30 cursor-not-allowed'
                : 'gold-gradient text-ink hover:shadow-[0_0_40px_rgba(201,169,97,0.4)] active:scale-[0.98]'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  ⟳
                </motion.span>
                正在规划路线...
              </span>
            ) : (
              '生成我的旅行路线'
            )}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
