export enum DateFormatTypeEnum {
  DateWithDots = 'yyyy.MM.dd',
  DateWithSlash = 'yyyy/MM/dd',
  YearAndMonth = 'yyyy.MM',
  MonthAndDay = 'MM.dd',
  DateWithKorean = 'yyyy년 MM월 dd일',
}

export type ModalProps = {
  onClose: () => void
}
