import { API_DOMAINS } from '@/constants/api'
import { GetNaverLoginRes } from '@/types/auth'
import { authAPI } from '../axios-instance'

export const getNaverLogin = async (code: string, state: string) => {
  const { data } = await authAPI.get<GetNaverLoginRes>(
    `${API_DOMAINS.AUTH}/naver/callback`,
    {
      params: { code, state },
    }
  )

  return data
}
