import { getKakaoLogin } from '@/api/auth/get-kakao-login'
import { LoadingSpinner } from '@/components/common'
import { QUERY_KEYS } from '@/constants/api'
import { path } from '@/routes/path'
import { GetKaKaoLoginRes } from '@/types/auth'
import { setToken } from '@/utils/handle-token'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, HttpStatusCode } from 'axios'
import { useEffect } from 'react'

const LoginRedirectPage = () => {
  const params = new URL(window.location.href).searchParams
  const code = params.get('code')
  const at = params.get('at')

  const { data, isPending, isSuccess, isError, error } = useQuery<
    GetKaKaoLoginRes,
    AxiosError,
    GetKaKaoLoginRes
  >({
    queryKey: [QUERY_KEYS.GET_KAKAO_LOGIN, code],
    queryFn: () => getKakaoLogin(code || ''),
    enabled: !!code && at === 'kakao',
  })

  useEffect(() => {
    if (!isPending && isSuccess) {
      setToken(data.accessToken, data.refreshToken)

      setTimeout(() => {
        window.location.href = path.schedules
      }, 1000)
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
