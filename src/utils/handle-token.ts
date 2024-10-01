import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_DURATION,
  REFRESH_TOKEN_KEY,
} from '@/constants/api'
import Cookies from 'js-cookie'

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN_KEY)
}

export const setToken = (access: string, refresh: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, access)
  Cookies.set(REFRESH_TOKEN_KEY, refresh, {
    expires: REFRESH_TOKEN_DURATION,
  })
}

export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  Cookies.remove(REFRESH_TOKEN_KEY)
}
