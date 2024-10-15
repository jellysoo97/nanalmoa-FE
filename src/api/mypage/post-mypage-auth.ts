import { API_DOMAINS } from '@/constants/api'
import { PostSmsCodeReq, PostSmsVerifyReq } from '@/types/auth'
import { AxiosResponse } from 'axios'
import { authAPI } from '../axios-instance'

export interface PostEmailSend {
  email: string
}
export interface PostEmailVerify extends PostEmailSend {
  code: string
}

export const postSMSSend = async (payload: PostSmsCodeReq) => {
  const { data } = await authAPI.post<PostSmsCodeReq, AxiosResponse>(
    `${API_DOMAINS.AUTH}/sms/send`,
    payload
  )

  return data
}

export const postSMSVerify = async (payload: PostSmsVerifyReq) => {
  const { data } = await authAPI.post<PostSmsVerifyReq, AxiosResponse>(
    `${API_DOMAINS.AUTH}/sms/verify`,
    payload
  )

  return data
}

export const postEmailSend = async (payload: PostEmailSend) => {
  const { data } = await authAPI.post<PostEmailSend, AxiosResponse>(
    `${API_DOMAINS.AUTH}/email/send`,
    payload
  )

  return data
}

export const postEmailVerify = async (payload: PostEmailVerify) => {
  const { data } = await authAPI.post<PostEmailVerify, AxiosResponse>(
    `${API_DOMAINS.AUTH}/email/verify`,
    payload
  )

  return data
}
