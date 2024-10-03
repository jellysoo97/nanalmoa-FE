import { getKakaoLogin } from '@/api/auth/get-kakao-login'
import { getNaverLogin } from '@/api/auth/get-naver-login'
import { LoadingSpinner } from '@/components/common'
import { QUERY_KEYS } from '@/constants/api'
import { path } from '@/routes/path'
import { GetKaKaoLoginRes, GetNaverLoginRes } from '@/types/auth'
import { setToken } from '@/utils/handle-token'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, HttpStatusCode } from 'axios'
import { useEffect } from 'react'

const LoginRedirectPage = () => {
  const params = new URL(window.location.href).searchParams
  const at = params.get('at')
  const code = params.get('code')
  const isNaver = at === 'naver'
  const isKakao = at === 'kakao'
  const state = isNaver ? params.get('state') : ''

  const { data: kakaoData, error: kakaoError } = useQuery<
    GetKaKaoLoginRes,
    AxiosError,
    GetKaKaoLoginRes
  >({
    queryKey: [QUERY_KEYS.GET_KAKAO_LOGIN, code],
    queryFn: () => getKakaoLogin(code || ''),
    enabled: !!code && isKakao,
  })
  const { data: naverData, error: naverError } = useQuery<
    GetNaverLoginRes,
    AxiosError,
    GetNaverLoginRes
  >({
    queryKey: [QUERY_KEYS.GET_NAVER_LOGIN, code],
    queryFn: () => getNaverLogin(code || '', state || ''),
    enabled: !!code && isNaver,
  })

  const handleLoginSuccess = ({
    accessToken,
    refreshToken,
  }: GetKaKaoLoginRes | GetNaverLoginRes) => {
    setToken({ accessToken, refreshToken })

    setTimeout(() => {
      window.location.href = path.schedules
    }, 1000)
  }
  const handleLoginError = (error: AxiosError) => {
    if (error.status === HttpStatusCode.Unauthorized) {
      alert('로그인에 실패했습니다. 다시 시도해주세요.')
      setTimeout(() => {
        window.location.href = path.login
      }, 1000)

      return
    }

    throw new Error('로그인 실패')
  }

  useEffect(() => {
    if (isKakao) {
      if (kakaoData) handleLoginSuccess(kakaoData)
      else if (kakaoError) handleLoginError(kakaoError)
    }

    if (isNaver) {
      if (naverData) handleLoginSuccess(naverData)
      else if (naverError) handleLoginError(naverError)
    }
  }, [
    isKakao,
    isNaver,
    kakaoData,
    naverData,
    kakaoError,
    naverError,
    handleLoginSuccess,
    handleLoginError,
  ])

  return (
    <div className="container flex flex-col items-center justify-center">
      <LoadingSpinner className="h-10 w-10 fill-primary-base" />
    </div>
  )
}

export default LoginRedirectPage
