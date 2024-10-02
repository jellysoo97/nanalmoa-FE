import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_DURATION,
  REFRESH_TOKEN_KEY,
  SOCIAL_PROVIDER_KEY,
} from '@/constants/api'
import Cookies from 'js-cookie'

type TStorageToken = {
  accessToken: string
  refreshToken: string
  socialProvider?: string
}

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN_KEY)
}

export const getSocialProvider = () => {
  return localStorage.getItem(SOCIAL_PROVIDER_KEY)
}

export const setToken = ({
  accessToken,
  refreshToken,
  socialProvider,
}: TStorageToken) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  if (socialProvider) localStorage.setItem(SOCIAL_PROVIDER_KEY, socialProvider)
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    expires: REFRESH_TOKEN_DURATION,
  })
}

export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  Cookies.remove(REFRESH_TOKEN_KEY)
}
