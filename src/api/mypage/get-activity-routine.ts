import { baseAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'
import { GetRoutineRes } from '@/types/auth'

export const getActivityRoutine = async () => {
  const { data } = await baseAPI.get<GetRoutineRes>(`${API_DOMAINS.ROUTINE}`)

  return data
}
