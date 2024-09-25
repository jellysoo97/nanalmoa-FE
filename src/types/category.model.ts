// backend에서 들어오는 정보 형태에 따라 수정

export enum CategoryEnum {
  가족 = 'bg-red-400',
  병원 = 'bg-blue-500',
  복약 = 'bg-sky-500',
  운동 = 'bg-teal-600',
  경조사 = 'bg-pink-400',
  약속 = 'bg-violet-500',
  기타 = 'bg-stone-400',
}

export type Categories = keyof typeof CategoryEnum
