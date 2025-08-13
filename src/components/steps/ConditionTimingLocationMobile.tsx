import { Chip } from '@/components/Chip'
import { MobileStepWrapper } from '@/components/ui/mobile-step-wrapper'
import { trackEvent } from '@/lib/utils'
import servicesConfig from '@/data/services.json'

interface ConditionTimingLocationMobileProps {
  condition: string
  timing: string
  onConditionChange: (condition: string) => void
  onTimingChange: (timing: string) => void
  onNext: () => void
  onBack: () => void
}

export function ConditionTimingLocationMobile({
  condition,
  timing,
  onConditionChange,
  onTimingChange,
  onNext,
  onBack
}: ConditionTimingLocationMobileProps) {
  const handleConditionSelect = (conditionId: string) => {
    onConditionChange(conditionId)
    trackEvent('select_condition', { condition: conditionId })
  }

  const handleTimingSelect = (timingId: string) => {
    onTimingChange(timingId)
    trackEvent('select_timing', { timing: timingId })
  }

  const handleNext = () => {
    if (condition && timing) {
      onNext()
    }
  }

  const canProceed = condition && timing

  const getNextButtonText = () => {
    if (!condition) return 'Select vehicle condition to continue'
    if (!timing) return 'Select timing to continue'
    return 'Next'
  }

  return (
    <MobileStepWrapper
      onNext={handleNext}
      onBack={onBack}
      nextDisabled={!canProceed}
      nextText={getNextButtonText()}
      showBackButton={true}
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
              onClick={() => handleConditionSelect(cond.id)}
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
              onClick={() => handleTimingSelect(time.id)}
            />
          ))}
        </div>
      </div>
    </MobileStepWrapper>
  )
}
