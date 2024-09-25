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
  audio: string
  currentDateTime: Date
}

export interface PostUploadAudioFileRes extends Array<ISchedule> {}

export interface PostConfirmScheduleReq {}

export interface PostConfirmScheduleRes {}

// TODO: 중간발표 이후
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
