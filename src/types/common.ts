export enum DateFormatTypeEnum {
  DateWithDots = 'yyyy.MM.dd',
  DateWithSlash = 'yyyy/MM/dd',
  DateWithHypen = 'yyyy-MM-dd',
  YearAndMonth = 'yyyy.MM',
  YearAndMonthKo = 'yyyy년 MM월',
  MonthAndDay = 'MM.dd',
  MonthAndDayKo = 'MM월 dd일',
  DateWithKorean = 'yyyy년 MM월 dd일',
  MonthKo = 'MM월',
  Time24 = 'HH:mm',
  FullDateTimeKR = 'yyyy년 MM월 dd일 HH:mm',
  CurrentDateTime = "yyyy-MM-dd'T'HH:mm:ss'Z'",
  DayOfTheWeek = 'EEEE',
}

export enum CreateScheduleStepEnum {
  Info,
  UploadMedia,
  AnalysisResult,
  RegisterResult,
}

export enum TabEnum {
  Daily = '일간',
  Monthly = '월간',
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

export type TLabel = {
  label: string
  value: string
}
