import { CreateScheduleStepEnum } from '@/types/common'
import { IconButton } from '../common'
import { NextIcon, PrevIcon } from '../icons'
import { useMemo } from 'react'
import { cn } from '@/utils/cn'

type Props = {
  currentStep: CreateScheduleStepEnum
  moveStep: (step: CreateScheduleStepEnum) => void
}

const MoveStepButtons = ({ currentStep, moveStep }: Props) => {
  const isFirstStep = useMemo(
    () => currentStep === CreateScheduleStepEnum.Info,
    [currentStep]
  )
  const isLastStep = useMemo(
    () => currentStep === CreateScheduleStepEnum.RegisterResult,
    [currentStep]
  )

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between',
        isFirstStep && 'justify-end',
        isLastStep && 'justify-start'
      )}
    >
      {!isFirstStep && (
        <IconButton
          direction="horizontal"
          icon={<PrevIcon className="h-4 w-4" />}
          text="이전 단계로"
          className="rounded-md border border-primary-blue px-3 py-2 text-primary-blue"
          onClick={() => moveStep(currentStep - 1)}
        />
      )}
      {!isLastStep && (
        <IconButton
          direction="horizontal"
          icon={<NextIcon className="h-4 w-4" />}
          text="다음 단계로"
          className="rounded-md bg-primary-blue px-3 py-2 text-white"
          isIconFront={false}
          onClick={() => moveStep(currentStep + 1)}
        />
      )}
    </div>
  )
}

export default MoveStepButtons
