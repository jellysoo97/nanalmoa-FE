export enum DateFormatTypeEnum {
  DateWithDots = 'yyyy.MM.dd',
  DateWithSlash = 'yyyy/MM/dd',
  YearAndMonth = 'yyyy.MM',
  MonthAndDay = 'MM.dd',
  DateWithKorean = 'yyyy년 MM월 dd일',
}

export enum CreateScheduleStepEnum {
  Info,
  UploadMedia,
  AnalysisResult,
  RegisterResult,
}

export type TModal = {
  onClose: () => void
}

export type TStep = {
  label: string
  value: CreateScheduleStepEnum
}
