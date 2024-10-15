import { API_DOMAINS } from '@/constants/api'
import { baseAPI } from '../axios-instance'
import { AxiosResponse } from 'axios'
import { authAPI } from '../axios-instance'

export interface PostEmailSend {
  email: string
}
export interface PostEmailVerify extends PostEmailSend {
  code: string
}

export const postSMSSend = async (payload: PostLoginReq) => {
  const { data } = await baseAPI.post<PostLoginReq, AxiosResponse>(

    `${API_DOMAINS.AUTH}/sms/send`,
    payload
  )

  return data
}

export const postSMSVerify = async (payload: PostSMSVerify) => {
  const { data } = await baseAPI.post<PostSMSVerify, AxiosResponse>(
    `${API_DOMAINS.AUTH}/sms/verify`,
    payload
  )

  return data
}

export const postEmailSend = async (payload: PostEmailSend) => {
  const { data } = await baseAPI.post<PostEmailSend, AxiosResponse>(
    `${API_DOMAINS.AUTH}/email/send`,
    payload
  )

  return data
}

export const postEmailVerify = async (payload: PostEmailVerify) => {
  const { data } = await baseAPI.post<PostEmailVerify, AxiosResponse>(
    `${API_DOMAINS.AUTH}/email/verify`,
    payload
  )

  return data
}
