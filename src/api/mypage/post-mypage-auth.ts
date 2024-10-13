import { API_DOMAINS } from '@/constants/api'
import { authAPI } from '../axios-instance'
import { AxiosResponse } from 'axios'
import { PostLoginReq } from '@/types/auth'

export interface PostSMSVerify extends PostLoginReq {
  code: string
}

export interface PostEmailSend {
  email: string
}
export interface PostEmailVerify extends PostEmailSend {
  code: string
}

export const postSMSSend = async (payload: PostLoginReq) => {
  const { data } = await authAPI.post<PostLoginReq, AxiosResponse>(
    `${API_DOMAINS.AUTH}/sms/send`,
    payload
  )

  return data
}

export const postSMSVerify = async (payload: PostSMSVerify) => {
  const { data } = await authAPI.post<PostSMSVerify, AxiosResponse>(
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