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
import { IMediaAnalysisResult, PostAnalyzeImageRes } from '@/types/schedules'
import { useMutation } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

const DUMMY: PostAnalyzeImageRes = [
  {
    title: '복약',
    place: '',
    memo: '',
    isAllDay: false,
    categoryId: 6,
    repeatEndDate: new Date('2024-10-20T04:10:11.349Z'),
    startDate: new Date('2024-10-15T09:08:00.000Z'),
    endDate: new Date('2024-10-15T09:38:00.000Z'),
    isRecurring: true,
    repeatType: 'daily',
    recurringInterval: 1,
  },
  {
    title: '복약',
    place: '',
    memo: '',
    isAllDay: false,
    categoryId: 6,
    repeatEndDate: new Date('2024-10-20T04:10:11.349Z'),
    startDate: new Date('2024-10-15T11:17:00.000Z'),
    endDate: new Date('2024-10-15T11:47:00.000Z'),
    isRecurring: true,
    repeatType: 'daily',
    recurringInterval: 1,
  },
  {
    title: '복약',
    place: '',
    memo: '',
    isAllDay: false,
    categoryId: 6,
    repeatEndDate: new Date('2024-10-20T04:10:11.349Z'),
    startDate: new Date('2024-10-15T13:25:00.000Z'),
    endDate: new Date('2024-10-15T13:55:00.000Z'),
    isRecurring: true,
    repeatType: 'daily',
    recurringInterval: 1,
  },
  {
    title: '복약',
    place: '',
    memo: '',
    isAllDay: false,
    categoryId: 6,
    repeatEndDate: new Date('2024-10-20T04:10:11.349Z'),
    startDate: new Date('2024-10-14T15:34:00.000Z'),
    endDate: new Date('2024-10-14T16:04:00.000Z'),
    isRecurring: true,
    repeatType: 'daily',
    recurringInterval: 1,
  },
  {
    title: '복약',
    place: '',
    memo: '',
    isAllDay: false,
    categoryId: 6,
    repeatEndDate: new Date('2024-10-20T04:10:11.349Z'),
    startDate: new Date('2024-10-14T17:42:00.000Z'),
    endDate: new Date('2024-10-14T18:12:00.000Z'),
    isRecurring: true,
    repeatType: 'daily',
    recurringInterval: 1,
  },
  {
    title: '복약',
    place: '',
    memo: '',
    isAllDay: false,
    categoryId: 6,
    repeatEndDate: new Date('2024-10-20T04:10:11.349Z'),
    startDate: new Date('2024-10-14T19:51:00.000Z'),
    endDate: new Date('2024-10-14T20:21:00.000Z'),
    isRecurring: true,
    repeatType: 'daily',
    recurringInterval: 1,
  },
]

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
  console.log(analysisResult)

  return (
    <div className="flex h-full flex-col items-center gap-y-6">
      <Stepper steps={createPhotoScheduleSteps} currentStep={currentStep} />
      <div className="flex flex-1 flex-col">
        {currentStep === CreateScheduleStepEnum.Info && <InfoStep />}
        {currentStep === CreateScheduleStepEnum.UploadMedia && (
          <UploadPhotoStep analyzeImageMutation={analyzeImageMutation} />
        )}
        {currentStep === CreateScheduleStepEnum.AnalysisResult && (
          <AnalysisResultStep
            // TODO: 사진 분석 실패로 더미데이터로 임시조치
            analysisResult={DUMMY}
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
