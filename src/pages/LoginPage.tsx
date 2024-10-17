import { postLogin } from '@/api/auth/post-login'
import kakaoLogin from '@/assets/imgs/kakaoLogin.png'
import naverLogin from '@/assets/imgs/naverLogin.png'
import { Button, PhoneNumberInput } from '@/components/common'
import Divider from '@/components/common/Divider'
import Toast from '@/components/common/Toast'
import {
  KAKAO_AUTH_API_URL,
  NAVER_AUTH_API_URL,
  QUERY_KEYS,
} from '@/constants/api'
import { errorMessages } from '@/constants/validation'
import { path } from '@/routes/path'
import { PostLoginReq, PostLoginRes } from '@/types/auth'
import { generateRandomState } from '@/utils/generate-random-state'
import { setToken } from '@/utils/handle-token'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, HttpStatusCode } from 'axios'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const naverRandomState = generateRandomState()
  const kakaoUrl = `${KAKAO_AUTH_API_URL}?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${window.origin}${path.loginRedirect}?at=kakao`
  const naverUrl = `${NAVER_AUTH_API_URL}?response_type=code&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&state=${naverRandomState}&redirect_uri=${window.origin}${path.loginRedirect}?at=naver`

  const [isVerificationSuccess, setIsVerificationSuccess] =
    useState<boolean>(false)
  const methods = useForm<PostLoginReq>()
  const { handleSubmit, resetField } = methods
  const {
    mutate: handleLogin,
    isIdle,
    isError,
  } = useMutation<PostLoginRes, AxiosError, PostLoginReq>({
    mutationKey: [QUERY_KEYS.POST_LOGIN],
    mutationFn: postLogin,
    onSuccess: ({ accessToken, refreshToken }) => {
      setToken({ accessToken, refreshToken })
      setTimeout(() => {
        window.location.href = path.schedules
      }, 1000)
    },
    onError: (error) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        resetField('phoneNumber')
        resetField('verificationCode')
        toast.error(errorMessages.login)
      }
    },
  })
  const handleVerification = (isSuccess: boolean) => {
    setIsVerificationSuccess(isSuccess)
  }

  return (
    <>
      <div className="container flex flex-col justify-center gap-y-4 px-6 py-2 sm:gap-y-8 sm:px-12">
        <div className="flex flex-col items-center gap-y-5 sm:gap-y-10">
          <h2 className="text-xl font-bold">환영합니다!🍀</h2>
          <FormProvider {...methods}>
            <form
              className="flex w-full flex-col gap-2 sm:flex-nowrap sm:gap-5"
              onSubmit={handleSubmit((data) => handleLogin(data))}
            >
              <div className="flex flex-col gap-y-6">
                <PhoneNumberInput
                  isRetry={!isIdle && isError}
                  handleVerification={handleVerification}
                />
                <div className="flex flex-col items-center gap-y-4">
                  <Button
                    type="submit"
                    text="로그인"
                    className="w-full py-2 sm:py-3"
                    disabled={!isVerificationSuccess}
                  />
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
            </form>
          </FormProvider>
        </div>
        <Divider />
        <div className="flex flex-col items-center gap-y-2">
          <h3>편리한 로그인</h3>
          <Link to={kakaoUrl}>
            <img src={kakaoLogin} />
          </Link>
          <Link to={naverUrl}>
            <img src={naverLogin} className="h-[45px] w-[183px]" />
          </Link>
        </div>
      </div>

      <Toast />
    </>
  )
}

export default LoginPage
