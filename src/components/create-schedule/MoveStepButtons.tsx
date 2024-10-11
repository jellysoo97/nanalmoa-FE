import { CreateScheduleStepEnum } from '@/types/common'
import { IconButton } from '../common'
import { NextIcon, PrevIcon } from '../icons'
import { useMemo } from 'react'
import { cn } from '@/utils/cn'

type Props = {
  currentStep: CreateScheduleStepEnum
  disabled?: boolean
  moveStep: (step: CreateScheduleStepEnum) => void
}

const MoveStepButtons = ({ currentStep, disabled, moveStep }: Props) => {
  const isFirstStep = useMemo(
    () => currentStep === CreateScheduleStepEnum.Info,
    [currentStep]
  )
  const isLastStep = useMemo(
    () => currentStep === CreateScheduleStepEnum.RegisterResult,
    [currentStep]
  )
  // const isUploadMediaStep = useMemo(
  //   () => currentStep === CreateScheduleStepEnum.UploadMedia,
  //   [currentStep]
  // )
  // const isAnalysisResultStep = useMemo(
  //   () => currentStep === CreateScheduleStepEnum.AnalysisResult,
  //   [currentStep]
  // )

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between',
        isFirstStep && 'justify-end',
        isLastStep && 'justify-start'
      )}
    >
      {!isFirstStep && !isLastStep && (
        <IconButton
          direction="horizontal"
          icon={<PrevIcon className="h-4 w-4" />}
          text="이전 단계로"
          className="rounded-md border border-primary-base px-3 py-2 text-primary-base"
          onClick={() => moveStep(currentStep - 1)}
        />
      )}
      {!isLastStep && (
        <IconButton
          direction="horizontal"
          icon={<NextIcon className="h-4 w-4" />}
          text="다음 단계로"
          className="rounded-md bg-primary-500 px-3 py-2 text-white"
          isIconFront={false}
          disabled={disabled}
          onClick={() => moveStep(currentStep + 1)}
        />
      )}
    </div>
  )
}

export default MoveStepButtons
