import { postLogin } from '@/api/auth/post-login'
import kakaoLogin from '@/assets/imgs/kakaoLogin.png'
import { Input } from '@/components/common'
import Divider from '@/components/common/Divider'
import {
  ACCESS_TOKEN_KEY,
  KAKAO_AUTH_API_URL,
  QUERY_KEYS,
  REFRESH_TOKEN_KEY,
} from '@/constants/api'
import { errorMessages } from '@/constants/validation'
import { path } from '@/routes/path'
import { PostLoginReq, PostLoginRes } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, HttpStatusCode } from 'axios'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const kakaoUrl = `${KAKAO_AUTH_API_URL}?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${window.origin}${path.loginRedirect}?at=kakao&response_type=code`
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PostLoginReq>()
  const { mutate } = useMutation<PostLoginRes, AxiosError, PostLoginReq>({
    mutationKey: [QUERY_KEYS.POST_LOGIN],
    mutationFn: postLogin,
    onSuccess: (data) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken)
      Cookies.set(REFRESH_TOKEN_KEY, data.refreshToken)

      setTimeout(() => {
        window.location.href = path.schedules
      }, 1000)
    },
    onError: (error) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        setError(
          'phoneNumber',
          { message: errorMessages.phoneNumber },
          { shouldFocus: true }
        )
      }
    },
  })

  const onSubmit = handleSubmit((data) => mutate(data))

  return (
    <div className="container flex flex-col justify-center gap-y-10 px-3 py-2">
      <div className="flex flex-col items-center gap-y-10">
        <h2 className="text-xl font-bold">환영합니다!🍀</h2>
        <div className="flex w-full flex-col items-center gap-y-4">
          <form onSubmit={onSubmit}>
            {/* TODO: validation */}
            <Input
              direction="vertical"
              label="전화번호"
              placeholder="010-XXXX-XXXX"
              errorMessage={errors.phoneNumber?.message}
              className="w-80"
              {...register('phoneNumber')}
            />
          </form>
          <div className="flex items-center gap-x-4 text-sm">
            <p className="text-neutral-600">회원이 아니신가요?</p>
            <Divider direction="vertical" className="bg-neutral-400" />
            <Link to={path.signup}>
              <p className="text-neutral-600 underline underline-offset-2">
                회원가입
              </p>
            </Link>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col items-center gap-y-4">
        <h3>편리한 로그인</h3>
        <Link to={kakaoUrl}>
          <img src={kakaoLogin} />
        </Link>
        {/* naver */}
      </div>
    </div>
  )
}

export default LoginPage
