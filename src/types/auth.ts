export interface IUser {
  userUuid: string
  userId: number
  name: string
  profileImage: string
  createdAt: Date
  updatedAt: Date
  email: string
  isManager: boolean
  phoneNumber?: string
  address?: string
}

export interface PostLoginReq {
  phoneNumber: string
}

export interface PostLoginRes {
  accessToken: string
  refreshToken: string
  user: IUser
}

export interface GetKaKaoLoginRes {
  accessToken: string
  refreshToken: string
  socialProvider: string
  user: IUser
}

export interface GetNaverLoginRes extends GetKaKaoLoginRes {}

export interface PostRefreshTokenReq {
  refreshToken: string
}

export interface PostRefreshTokenRes {
  accessToken: string
  refreshToken: string
}

export interface GetUsersMeRes extends IUser {}

export interface PutMypage {
  name?: string
  phoneNumber?: string
  phoneVerificationCode?: string
  email?: string
  emailVerificationCode?: string
  address?: string
}

export interface GetRoutineRes {
  userUuid: string
  wakeUpTime: string
  breakfastTime: string
  lunchTime: string
  dinnerTime: string
  bedTime: string
}

export interface PostUserSearchReq {
  keyword: string
}

export interface UserWithPhoneNumber extends IUser {
  phoneNumber: string
}

export interface PostUserSearchRes extends Array<UserWithPhoneNumber> {}
