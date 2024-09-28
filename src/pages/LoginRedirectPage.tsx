import { getKakaoLogin } from '@/api/auth/get-kakao-login'
import { LoadingSpinner } from '@/components/common'
import {
  ACCESS_TOKEN_KEY,
  QUERY_KEYS,
  REFRESH_TOKEN_DURATION,
  REFRESH_TOKEN_KEY,
} from '@/constants/api'
import { path } from '@/routes/path'
import { GetKaKaoLoginRes } from '@/types/auth'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, HttpStatusCode } from 'axios'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

const LoginRedirectPage = () => {
  const code = new URL(window.location.href).searchParams.get('code')
  const { data, isPending, isSuccess, isError, error } = useQuery<
    GetKaKaoLoginRes,
    AxiosError,
    GetKaKaoLoginRes
  >({
    queryKey: [QUERY_KEYS.GET_KAKAO_LOGIN, code],
    queryFn: () => getKakaoLogin(code || ''),
    enabled: !!code,
  })

  useEffect(() => {
    if (!isPending && isSuccess) {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken)
      Cookies.set(REFRESH_TOKEN_KEY, data.refreshToken, {
        expires: REFRESH_TOKEN_DURATION,
      })
      window.location.href = path.schedules
    }

    if (!isPending && isError) {
      if (error.status === HttpStatusCode.Unauthorized) {
        alert('로그인에 실패했습니다. 다시 시도해주세요.')

        setTimeout(() => {
          window.location.href = path.login
        }, 1000)
      } else {
        throw new Error('로그인 실패')
      }
    }
  }, [isPending])

  return (
    <div className="container flex flex-col items-center justify-center">
      <LoadingSpinner className="h-10 w-10 fill-primary-base" />
    </div>
  )
}

export default LoginRedirectPage
