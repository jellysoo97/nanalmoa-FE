import { postAnalyzeImage } from '@/api/schedules/post-analyze-image'
import { postSchedules } from '@/api/schedules/post-schedules'
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
import { IMediaAnalysisResult } from '@/types/schedules'
import { useMutation } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

const CreatePhotoSchedulePage = () => {
  const [currentStep, setCurrentStep] = useState<CreateScheduleStepEnum>(
    CreateScheduleStepEnum.Info
  )
  const [analysisResult, setAnalysisResult] =
    useState<Array<IMediaAnalysisResult> | null>(null)

  const analyzeImageMutation = useMutation({
    mutationFn: postAnalyzeImage,
    onSuccess: (data) => {
      setAnalysisResult(data)
    },
    onError: () => {
      setAnalysisResult(null)
      analyzeImageMutation.reset()
    },
    onSettled: () => {
      moveStep(CreateScheduleStepEnum.AnalysisResult)
    },
  })
  const createScheduleMutation = useMutation({
    mutationFn: postSchedules,
    onError: () => {
      createScheduleMutation.reset()
    },
    onSettled: () => {
      moveStep(CreateScheduleStepEnum.RegisterResult)
    },
  })

  const isNextDisabled = useMemo(
    () =>
      (currentStep === CreateScheduleStepEnum.UploadMedia &&
        analyzeImageMutation.status === 'idle') ||
      (currentStep === CreateScheduleStepEnum.AnalysisResult &&
        createScheduleMutation.status === 'idle'),
    [currentStep, analyzeImageMutation.status, createScheduleMutation.status]
  )
  const moveStep = (step: CreateScheduleStepEnum) => {
    setCurrentStep(step)
  }

  return (
    <div className="flex h-full flex-col items-center gap-y-6">
      <Stepper steps={createPhotoScheduleSteps} currentStep={currentStep} />
      <div className="flex flex-1 flex-col">
        {currentStep === CreateScheduleStepEnum.Info && <InfoStep />}
        {currentStep === CreateScheduleStepEnum.UploadMedia && (
          <UploadPhotoStep
            analyzeImageMutation={analyzeImageMutation}
            moveStep={moveStep}
          />
        )}
        {currentStep === CreateScheduleStepEnum.AnalysisResult && (
          <AnalysisResultStep
            analysisResult={analysisResult}
            createScheduleMutation={createScheduleMutation}
            moveStep={moveStep}
          />
        )}
        {currentStep === CreateScheduleStepEnum.RegisterResult && (
          <RegisterResultStep
            isSuccess={createScheduleMutation.isSuccess}
            createScheduleMutation={createScheduleMutation}
            moveStep={moveStep}
          />
        )}
      </div>
      <MoveStepButtons
        currentStep={currentStep}
        disabled={isNextDisabled}
        moveStep={moveStep}
      />
    </div>
  )
}

export default CreatePhotoSchedulePage
