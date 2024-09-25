import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/api'
import { path } from '@/routes/path'
import { AxiosError, HttpStatusCode, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { baseAPI } from './axios-instance'

export const checkAccessToken = (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)

  if (!accessToken) {
    window.location.href = path.login
    throw new Error('토큰이 유효하지 않습니다.')
  }

  config.headers.Authorization = `Bearer ${accessToken}`

  return config
}

export const handleAuthError = async (error: AxiosError) => {
  if (
    !error.response ||
    !error.config ||
    error.response.status !== HttpStatusCode.Unauthorized
  )
    return Promise.reject(error)

  const originalRequest = error.config

  if (error.response.status === HttpStatusCode.Unauthorized) {
    const cookie = Cookies.get(REFRESH_TOKEN_KEY)

    if (!cookie) {
      window.location.href = path.login
      return Promise.reject(error)
    }

    try {
      // TODO: refresh token
      originalRequest.headers.retry = true
      originalRequest.headers.Authorization = `Bearer`
    } catch (error) {
      return Promise.reject(error)
    }

    return baseAPI(originalRequest)
  }
}
