export enum DateFormatTypeEnum {
  DateWithDots = 'yyyy.MM.dd',
  DateWithSlash = 'yyyy/MM/dd',
  YearAndMonth = 'yyyy.MM',
  MonthAndDay = 'MM.dd',
  DateWithKorean = 'yyyy년 MM월 dd일',
  currentDateTime = "yyyy-MM-dd'T'HH:mm:ss'Z'",
}

export type ModalProps = {
  onClose: () => void
}
