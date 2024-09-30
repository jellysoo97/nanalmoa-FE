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
}

export interface GetKaKaoLoginRes {
  accessToken: string
  refreshToken: string
  socialProvider: string
  user: IUser
}
