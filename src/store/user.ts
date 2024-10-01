import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type UserState = {
  user: {
    isLoggedIn: boolean
    userId: number | null
  }
}

type UserActions = {
  setUser: (userId: number | null) => void
}

const initialState: UserState = {
  user: { isLoggedIn: false, userId: null },
}

export const useUserStore = create<UserState & UserActions>()(
  devtools(
    immer((set) => ({
      user: initialState.user,
      setUser: (userId) =>
        set((state) => {
          if (userId) {
            state.user = {
              isLoggedIn: true,
              userId,
            }
          } else {
            state.user = initialState.user
          }
        }),
    })),
    { name: 'user' }
  )
)
