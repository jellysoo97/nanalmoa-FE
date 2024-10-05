import { Categories } from './category'

export interface ISchedule {
  userId: number
  category: {
    categoryId: number
    categoryName: Categories
  }
  startDate: Date
  endDate: Date
  title: string
  place: string
  memo?: string
  isGroupSchedule: boolean
  isAllDay: boolean
  scheduleId: number
}

export interface IMediaAnalysisResult {
  userId: number
  startDate: Date
  endDate: Date
  title: string
  place: string
  isAllDay: boolean
  categoryId: number
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
  userId: number
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
