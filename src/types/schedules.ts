export interface ISchedule {
  userId: number
  categoryId: number
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
  currentDateTime: string
}

export interface PostUploadAudioFileRes extends ISchedule {}

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
