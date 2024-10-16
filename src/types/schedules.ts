import { Categories } from './category'

export type RecurringOptionValue =
  | 'none'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'

export interface ISchedule {
  userUuid: string
  category: {
    categoryId: number
    categoryName: Categories
  }
  startDate: Date
  endDate: Date
  title: string
  place: string
  memo: string
  isAllDay: boolean
  scheduleId: number
  isRecurring: boolean
  repeatType?: RecurringOptionValue
  recurringInterval?: number
  repeatEndDate?: Date
  recurringDaysOfWeek: number[]
  recurringDayOfMonth: number
  recurringMonthOfYear: number
  groupInfo?: [
    {
      groupId: number
      userUuids: string[]
    },
  ]
}

export interface IMediaAnalysisResult {
  userUuid: string
  categoryId: number
  startDate: Date
  endDate: Date
  title: string
  place: string
  memo: string
  isAllDay: boolean
  isGroupSchedule: boolean
}

export interface GetScheduleByIdRes extends ISchedule {}

export interface GetSchedulesRes extends Array<ISchedule> {}

export interface PostUploadAudioFileReq {
  audio: File
  currentDateTime: Date
}

export interface PostUploadAudioFileRes extends Array<IMediaAnalysisResult> {}

export interface IScheduleForm {
  categoryId?: number
  startDate: Date
  endDate: Date
  title?: string
  place?: string
  memo?: string
  isAllDay: boolean
  isRecurring: boolean
  repeatType?: RecurringOptionValue
}

export interface PostSchedulesReq {
  userUuid?: string
  categoryId?: number
  startDate: Date
  endDate: Date
  title?: string
  place?: string
  memo?: string
  isAllDay: boolean
  isRecurring: boolean
  repeatType?: RecurringOptionValue
  recurringInterval?: number
  repeatEndDate?: Date
  recurringDaysOfWeek?: number[]
  recurringDaysOfMonth?: number[]
  recurringDayOfYear?: number[]
  groupInfo?: [
    {
      groupId: number
      userUuids: string[]
    },
  ]
}

export interface PostSchedulesRes extends PostSchedulesReq {
  userUuid: string
  scheduleId: number
  category: {
    categoryId: number
    categoryName: string
  }
}

export interface UpdateScheduleReq {
  categoryId?: number
  startDate?: Date
  endDate?: Date
  title?: string
  place?: string
  memo?: string
  isAllDay?: boolean
  isRecurring?: boolean
}

export interface UpdateScheduleRes extends ISchedule {}

export interface PostAnalyzeImageReq {
  image: File
  currentDateTime: Date
}

export interface PostAnalyzeImageRes extends Array<IMediaAnalysisResult> {}
