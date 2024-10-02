export interface IUser {
  userUuid: string
  userId: number
  name: string
  profileImage: string
  createdAt: Date
  updatedAt: Date
  email: string
  isManager: boolean
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
  socialProvider: string
}

export interface PostRefreshTokenRes {
  accessToken: string
  refreshToken: string
}

export interface GetUsersMeRes extends IUser {}
