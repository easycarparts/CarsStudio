
import { motion } from 'framer-motion'
import { Chip } from '@/components/Chip'
import servicesConfig from '@/data/services.json'

interface ConditionTimingLocationProps {
  condition: string
  timing: string
  onConditionChange: (condition: string) => void
  onTimingChange: (timing: string) => void
  onNext: () => void
  onBack: () => void
}

export function ConditionTimingLocation({
  condition,
  timing,
  onConditionChange,
  onTimingChange,
  onNext,
  onBack
}: ConditionTimingLocationProps) {
  const handleNext = () => {
    if (condition && timing) {
      onNext()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Condition & Timing</h2>
        <p className="text-gray-400">Help us understand your needs better</p>
      </div>

      {/* Condition Selection */}
      <div className="space-y-3">
        <label className="text-white font-medium">Vehicle Condition</label>
        <div className="grid gap-3">
          {servicesConfig.conditions.map((cond) => (
            <Chip
              key={cond.id}
              label={cond.name}
              description={cond.description}
              isSelected={condition === cond.id}
              onClick={() => onConditionChange(cond.id)}
            />
          ))}
        </div>
      </div>

      {/* Timing Selection */}
      <div className="space-y-3">
        <label className="text-white font-medium">When do you need it?</label>
        <div className="grid gap-3">
          {servicesConfig.timing.map((time) => (
            <Chip
              key={time.id}
              label={time.name}
              description={time.description}
              isSelected={timing === time.id}
              onClick={() => onTimingChange(time.id)}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex-1 bg-gray-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-600 transition-all"
        >
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          disabled={!condition || !timing}
          className="flex-1 bg-primary text-white py-4 px-6 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  )
}
