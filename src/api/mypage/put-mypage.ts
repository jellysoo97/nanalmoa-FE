import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'
import { PutMypage } from '@/types/auth'
import { AxiosResponse } from 'axios'

export const putMypage = async (payload: PutMypage) => {
  const { data } = await baseAPI.put<PutMypage, AxiosResponse>(
    `${API_DOMAINS.USERS}/update`,
    payload
  )

  return data
}
