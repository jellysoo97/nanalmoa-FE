import { Categories } from './category'

export type RecurringOptionValue =
  | 'none'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'

export interface IGroup {
  groupId: number
  userUuids: string[]
}

export interface ICategory {
  categoryId: number
  categoryName: Categories
}

export interface IRepeatInfo {
  recurringInterval?: number
  repeatEndDate?: Date
  recurringDaysOfWeek?: number[] | null
  recurringDayOfMonth?: number | null
  recurringMonthOfYear?: number | null
  groupInfo?: Array<IGroup>
}

export interface ISchedule extends IRepeatInfo {
  scheduleId: number
  userUuid: string
  startDate: Date
  endDate: Date
  title: string
  place: string
  memo: string
  isAllDay: boolean
  category: ICategory
}

export interface IMediaAnalysisResult extends IRepeatInfo {
  title: string
  place: string
  startDate: Date
  endDate: Date
  memo?: string
  isAllDay: boolean
  categoryId: number
  isRecurring: boolean
  repeatType: RecurringOptionValue
}

export interface GetScheduleByIdRes extends ISchedule {}

export interface GetSchedulesRes extends Array<ISchedule> {}

export interface PostUploadAudioFileReq {
  audio: File
  currentDateTime: Date
}

export interface PostUploadAudioFileRes extends Array<IMediaAnalysisResult> {}

export interface IPartialScheduleForm {
  startDate: Date
  endDate: Date
  title: string
  place: string
  memo?: string
  isAllDay: boolean
  categoryId: number
  isRecurring: boolean
  repeatType: RecurringOptionValue
}

export interface PostSchedulesReq extends IRepeatInfo {
  startDate: Date
  endDate: Date
  title: string
  place: string
  memo?: string
  isAllDay: boolean
  categoryId: number
  isRecurring: boolean
  repeatType: RecurringOptionValue
}

export interface PostSchedulesRes extends ISchedule {
  isGroupSchedule: boolean
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
