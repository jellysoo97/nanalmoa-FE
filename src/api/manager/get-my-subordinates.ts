import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'
import { IGetMySubordinatesRes } from '@/types/manager'

export const getMySubordinates = async () => {
  const { data } = await baseAPI.get<IGetMySubordinatesRes>(
    `${API_DOMAINS.MANAGER}/subordinates`
  )

  return data
}
