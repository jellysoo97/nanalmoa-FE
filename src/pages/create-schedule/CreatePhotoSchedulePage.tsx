import { Stepper } from '@/components/common'
import MoveStepButtons from '@/components/create-schedule/MoveStepButtons'
import {
  AnalysisResultStep,
  InfoStep,
  RegisterResultStep,
  UploadPhotoStep,
} from '@/components/create-schedule/photo'
import { createPhotoScheduleSteps } from '@/constants/schedules'
import { CreateScheduleStepEnum } from '@/types/common'
import { useState } from 'react'

const CreatePhotoSchedulePage = () => {
  const [currentStep, setCurrentStep] = useState<CreateScheduleStepEnum>(
    CreateScheduleStepEnum.Info
  )

  const moveStep = (step: CreateScheduleStepEnum) => {
    setCurrentStep(step)
  }

  return (
    <div className="flex h-full flex-col items-center px-2 py-4">
      <Stepper steps={createPhotoScheduleSteps} currentStep={currentStep} />
      <div className="flex flex-1 flex-col">
        {currentStep === CreateScheduleStepEnum.Info && <InfoStep />}
        {currentStep === CreateScheduleStepEnum.UploadMedia && (
          <UploadPhotoStep />
        )}
        {currentStep === CreateScheduleStepEnum.AnalysisResult && (
          <AnalysisResultStep />
        )}
        {currentStep === CreateScheduleStepEnum.RegisterResult && (
          <RegisterResultStep />
        )}
      </div>
      <MoveStepButtons currentStep={currentStep} moveStep={moveStep} />
    </div>
  )
}

export default CreatePhotoSchedulePage
