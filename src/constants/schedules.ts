import { CreateScheduleStepEnum, TStep } from '@/types/common'

export const createAudioScheduleSteps: TStep[] = [
  {
    label: '등록안내',
    value: CreateScheduleStepEnum.Info,
  },
  {
    label: '음성등록',
    value: CreateScheduleStepEnum.UploadMedia,
  },
  {
    label: '분석결과',
    value: CreateScheduleStepEnum.AnalysisResult,
  },
  {
    label: '등록완료',
    value: CreateScheduleStepEnum.RegisterResult,
  },
]

export const createPhotoScheduleSteps: TStep[] = [
  {
    label: '등록안내',
    value: CreateScheduleStepEnum.Info,
  },
  {
    label: '사진등록',
    value: CreateScheduleStepEnum.UploadMedia,
  },
  {
    label: '분석결과',
    value: CreateScheduleStepEnum.AnalysisResult,
  },
  {
    label: '등록완료',
    value: CreateScheduleStepEnum.RegisterResult,
  },
]

export const createManualScheduleSteps: TStep[] = [
  {
    label: '일정입력',
    value: CreateScheduleStepEnum.Info,
  },
  {
    label: '등록완료',
    value: CreateScheduleStepEnum.UploadMedia,
  }
]
