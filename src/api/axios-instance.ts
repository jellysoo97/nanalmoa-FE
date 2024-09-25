import axios, { CreateAxiosDefaults } from 'axios'
import { checkAccessToken, handleAuthError } from './interceptors'

const createAxiosInstance = (config: CreateAxiosDefaults) => {
  const axiosInstance = axios.create(config)
  const useAuth = config.withCredentials

  if (useAuth) {
    axiosInstance.interceptors.request.use(checkAccessToken)
    axiosInstance.interceptors.response.use(
      (response) => response,
      handleAuthError
    )
  }

  return axiosInstance
}

export const authAPI = createAxiosInstance({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const baseAPI = createAxiosInstance({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
