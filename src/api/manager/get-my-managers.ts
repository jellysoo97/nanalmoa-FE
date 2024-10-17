import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'
import { IGetMyManagersRes } from '@/types/manager'

export const getMyManagers = async () => {
  const { data } = await baseAPI.get<IGetMyManagersRes>(
    `${API_DOMAINS.MANAGER}/managers`
  )

  return data
}
