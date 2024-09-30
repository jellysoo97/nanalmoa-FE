import { GetKaKaoLoginRes } from '@/types/auth'
import { authAPI } from '../axios-instance'
import { API_DOMAINS } from '@/constants/api'

export const getKakaoLogin = async (code: string) => {
  const { data } = await authAPI.get<GetKaKaoLoginRes>(
    `${API_DOMAINS.AUTH}/kakao/callback`,
    {
      params: { code },
    }
  )

  return data
}
