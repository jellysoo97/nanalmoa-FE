export interface IUser {
  id: number
  email: string
  name: string
  profileImage: string
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
  userId: number
  refreshToken: string
  socialProvider: string
}

export interface PostRefreshTokenRes {
  accessToken: string
  refreshToken: string
}

export interface GetUserMeRes extends PostLoginRes {}
