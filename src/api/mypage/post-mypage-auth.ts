import { API_DOMAINS } from '@/constants/api'
import { baseAPI } from '../axios-instance'
import { AxiosResponse } from 'axios'
import {
  PostEmailSend,
  PostEmailVerify,
  PostSmsCodeReq,
  PostSmsVerifyReq,
} from '@/types/auth'

export const postSMSSend = async (payload: PostSmsCodeReq) => {
  const { data } = await baseAPI.post<PostSmsCodeReq, AxiosResponse>(
    `${API_DOMAINS.AUTH}/sms/send`,
    payload
  )

  return data
}

export const postSMSVerify = async (payload: PostSmsVerifyReq) => {
  const { data } = await baseAPI.post<PostSmsVerifyReq, AxiosResponse>(
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
