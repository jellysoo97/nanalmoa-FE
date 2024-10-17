import { CreateScheduleStepEnum, TStep } from '@/types/common'
import { InvitationStatusEnum, InvitationTypeEnum } from '@/types/invitations'
import { RecurringOptionValue } from '@/types/schedules'

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
  },
]

export const invitationTypeLabels: Record<InvitationTypeEnum, string> = {
  [InvitationTypeEnum.Group]: '그룹',
  [InvitationTypeEnum.Manager]: '관리자',
}

export const invitationStatusLabels: Record<string, string> = {
  [InvitationStatusEnum.ACCEPTED]: '수락',
  [InvitationStatusEnum.REJECTED]: '거절',
  [InvitationStatusEnum.CANCELED]: '취소',
}

export const repeatTypeLabels: Record<RecurringOptionValue, string> = {
  daily: '하루',
  weekly: '일주일',
  monthly: '한달',
  yearly: '1년',
  none: '',
}

export const categoryLabels: Record<number, string> = {
  1: '병원',
  2: '가족',
  3: '종교',
  4: '운동',
  5: '경조사',
  6: '복약',
  7: '기타',
}
