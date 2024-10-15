import { API_DOMAINS } from '@/constants/api'
import { baseAPI } from '../axios-instance'
import { AxiosResponse } from 'axios'
import { PostEmailSend, PostEmailVerify } from '@/types/auth'

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
