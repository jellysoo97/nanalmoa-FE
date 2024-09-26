import { TStep } from '@/types/common'
import Divider from './Divider'
import { cn } from '@/utils/cn'
import { CheckIcon } from '../icons'

type Props = {
  steps: TStep[]
  currentStep: number
}

const Stepper = ({ steps, currentStep }: Props) => {
  return (
    <div className="relative flex w-fit gap-x-4 sm:gap-x-10">
      {steps.map((step, index) => {
        const isCurrentStep = index === currentStep
        const isDoneStep = index < currentStep

        return (
          <div
            key={step.value}
            className="z-10 flex flex-col items-center gap-y-2"
          >
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-500 bg-white text-neutral-500',
                isDoneStep &&
                  'border border-primary-base bg-primary-base text-white',
                isCurrentStep &&
                  'border-2 border-primary-base text-primary-base'
              )}
            >
              {isDoneStep ? (
                <CheckIcon />
              ) : (
                <span className="font-bold">{step.value + 1}</span>
              )}
            </div>
            <span
              className={cn(
                'text-nowrap text-sm',
                isCurrentStep && 'text-primary-base'
              )}
            >
              {step.label}
            </span>
          </div>
        )
      })}
      <Divider className="absolute left-0 top-5 z-0 h-[2px] w-full" />
    </div>
  )
}

export default Stepper
