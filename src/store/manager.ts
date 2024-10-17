import { create } from 'zustand'
import { IGetMySubordinatesRes, IManagerUser } from '@/types/manager'

type ManagerState = {
  mySubordinates: IGetMySubordinatesRes
  hasSubordinates: boolean
  selectedSubordinate: IManagerUser | null
  setMySubordinates: (data: IGetMySubordinatesRes) => void
  setSelectedSubordinate: (data: IManagerUser | null) => void
}

const useManagerStore = create<ManagerState>((set) => ({
  mySubordinates: [],
  hasSubordinates: false,
  selectedSubordinate: null,
  setMySubordinates: (data) =>
    set(() => ({
      mySubordinates: data,
      hasSubordinates: data.length > 0,
    })),
  setSelectedSubordinate: (data) =>
    set(() => ({
      selectedSubordinate: data,
    })),
}))

export default useManagerStore
