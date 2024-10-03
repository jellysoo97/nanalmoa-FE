export enum CategoryEnum {
  병원 = 'bg-blue-500',
  가족 = 'bg-red-400',
  종교 = 'bg-violet-500',
  운동 = 'bg-teal-600',
  경조사 = 'bg-pink-400',
  복약 = 'bg-sky-500',
  기타 = 'bg-stone-400',
}

export type Categories = keyof typeof CategoryEnum
