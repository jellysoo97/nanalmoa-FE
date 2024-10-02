import { IUser } from '@/types/auth'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type UserState = {
  user: {
    isLoggedIn: boolean
    info: IUser | null
  }
}

type UserActions = {
  setUser: (user: IUser | null) => void
}

const initialState: UserState = {
  user: { isLoggedIn: false, info: null },
}

export const useUserStore = create<UserState & UserActions>()(
  devtools(
    immer((set) => ({
      user: initialState.user,
      setUser: (user) =>
        set((state) => {
          if (user) {
            state.user = {
              isLoggedIn: true,
              info: user,
            }
          } else {
            state.user = initialState.user
          }
        }),
    })),
    { name: 'user' }
  )
)
