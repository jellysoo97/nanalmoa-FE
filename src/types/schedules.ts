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
  isGroupSchedule: boolean
  isAllDay: boolean
  scheduleId: number
  isRecurring: boolean
  repeatType: RecurringOptionValue
  recurringInterval: number
  repeatEndDate: Date
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
  isGroupSchedule?: boolean
  isAllDay: boolean
  isRecurring: boolean
  repeatType?: RecurringOptionValue
  recurringInterval?: number
  repeatEndDate?: Date
}

export interface PostSchedulesReq {
  userUuid: string
  categoryId?: number
  startDate: Date
  endDate: Date
  title?: string
  place?: string
  memo?: string
  isGroupSchedule?: boolean
  isAllDay?: boolean
}

export interface PostSchedulesRes extends PostSchedulesReq {
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
  isGroupSchedule?: boolean
  isAllDay?: boolean
}

export interface UpdateScheduleRes extends ISchedule {}

export interface PostAnalyzeImageReq {
  image: File
  currentDateTime: Date
}

export interface PostAnalyzeImageRes extends Array<IMediaAnalysisResult> {}
