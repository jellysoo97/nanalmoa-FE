import { API_DOMAINS } from '@/constants/api'
import { path } from '@/routes/path'
import {
  getAccessToken,
  getRefreshToken,
  removeToken,
  setToken,
} from '@/utils/handle-token'
import { AxiosError, HttpStatusCode, InternalAxiosRequestConfig } from 'axios'
import { postRefreshToken } from './auth/post-refresh-token'
import { baseAPI } from './axios-instance'

export const checkAccessToken = (config: InternalAxiosRequestConfig) => {
  const accessToken = getAccessToken()

  if (!accessToken) {
    window.location.href = path.login
    throw new Error('토큰이 유효하지 않습니다.')
  }

  config.headers.Authorization = `Bearer ${accessToken}`

  return config
}

export const handleAuthError = async (error: AxiosError) => {
  if (error.response?.status === HttpStatusCode.InternalServerError)
    return Promise.reject(error)

  const originalRequest = error.config!
  const isRefreshTokenRequest = originalRequest.url?.includes(
    `${API_DOMAINS.AUTH}/refresh`
  )

  if (
    error.response?.status === HttpStatusCode.Unauthorized &&
    isRefreshTokenRequest
  ) {
    removeToken()
    return Promise.reject(error)
  }

  if (
    error.response?.status === HttpStatusCode.Unauthorized &&
    !isRefreshTokenRequest
  ) {
    const refreshToken = getRefreshToken()

    if (!refreshToken) {
      window.location.href = path.login
      return Promise.reject(error)
    }

    try {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await postRefreshToken({
          refreshToken,
        })
      setToken({ accessToken: newAccessToken, refreshToken: newRefreshToken })

      originalRequest.headers.retry = true
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
    } catch (error) {
      return Promise.reject(error)
    }

    return baseAPI(originalRequest)
  }
}
