
import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import BudgetPlanner from '../components/BudgetPlanner'
import FeatureShowcase from '../components/FeatureShowcase'

interface Props {
  onGenerate: (budget: number, days: number, preferences: string[]) => void
}

export default function HomePage({ onGenerate }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <BudgetPlanner onGenerate={onGenerate} />
      <FeatureShowcase />
    </motion.div>
  )
}
