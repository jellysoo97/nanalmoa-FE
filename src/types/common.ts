export enum DateFormatTypeEnum {
  DateWithDots = 'yyyy.MM.dd',
  DateWithSlash = 'yyyy/MM/dd',
  DateWithHypen = 'yyyy-MM-dd',
  YearAndMonth = 'yyyy.MM',
  MonthAndDay = 'MM.dd',
  DateWithKorean = 'yyyy년 MM월 dd일',
  Time24 = 'HH:mm',
  FullDateTimeKR = 'yyyy년 MM월 dd일 HH:mm',
  CurrentDateTime = "yyyy-MM-dd'T'HH:mm:ss'Z'",
}

export enum CreateScheduleStepEnum {
  Info,
  UploadMedia,
  AnalysisResult,
  RegisterResult,
}

export type TModal = {
  onClose: () => void
  onRetry?: () => void
  onManualInput?: () => void
}

export type TStep = {
  label: string
  value: CreateScheduleStepEnum
}
