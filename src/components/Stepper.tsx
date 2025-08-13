
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface StepperProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function Stepper({ currentStep, totalSteps, className }: StepperProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}
