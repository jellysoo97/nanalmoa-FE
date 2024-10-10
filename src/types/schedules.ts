import { Categories } from './category'

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
}

export interface IMediaAnalysisResult {
  userUuid: string
  startDate: Date
  endDate: Date
  title: string
  place: string
  isAllDay: boolean
  category: {
    categoryId: number
    categoryName: Categories
  }
}

export interface GetScheduleByIdRes extends ISchedule {}

export interface GetSchedulesRes extends Array<ISchedule> {}

export interface PostUploadAudioFileReq {
  audio: File
  currentDateTime: Date
}

export interface PostUploadAudioFileRes extends Array<IMediaAnalysisResult> {}

export interface IScheduleForm {
  categoryId: number
  startDate: Date
  endDate: Date
  title: string
  place: string
  memo?: string
  isGroupSchedule?: boolean
  isAllDay: boolean
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
