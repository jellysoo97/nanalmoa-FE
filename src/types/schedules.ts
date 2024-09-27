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

export interface GetScheduleByIdRes extends ISchedule {}

export interface GetSchedulesRes extends Array<ISchedule> {}

export interface PostUploadAudioFileReq {
  audio: File
  currentDateTime: Date
}

export interface PostUploadAudioFileRes {
  userId: number
  startDate: Date
  endDate: Date
  title: string
  place: string
  isAllDay: boolean
}

export interface PostSchedulesReq {
  categoryId: number
  startDate: Date
  endDate: Date
  title: string
  place: string
  memo: string
  isGroupSchedule: boolean
}

export interface PostSchedulesRes {}
