import { postSignup } from '@/api/auth/post-signup'
import { postSmsCode } from '@/api/auth/post-sms-code'
import { postSmsVerify } from '@/api/auth/post-sms-verify'
import error from '@/assets/imgs/error.png'
import success from '@/assets/imgs/success.png'
import { Button, Input } from '@/components/common'
import Toast from '@/components/common/Toast'
import { errorMessages } from '@/constants/validation'
import { path } from '@/routes/path'
import { PostSignupReq } from '@/types/auth'
import { setToken } from '@/utils/handle-token'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

type TSignupMode = 'form' | 'success' | 'error'

const INTERVAL = 1000
const SEC_IN_MIN = 60
const TIME_LIMIT = 5 * SEC_IN_MIN * INTERVAL

const SignupPage = () => {
  const [mode, setMode] = useState<TSignupMode>('form')
  const [leftTime, setLeftTime] = useState<number>(TIME_LIMIT)
  const {
    register,
    getValues,
    trigger,
    resetField,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<PostSignupReq>({
    mode: 'onBlur',
  })
  const sendCodeMutation = useMutation({
    mutationFn: () => postSmsCode({ phoneNumber: getValues('phoneNumber') }),
    onSuccess: () => {
      toast.success('인증코드가 발송되었습니다.')
    },
    onError: () => {
      toast.error('에러가 발생했습니다. 다시 시도해주세요.')
      resetField('phoneNumber')
    },
  })
  const verifyCodeMutation = useMutation({
    mutationFn: () =>
      postSmsVerify({
        phoneNumber: getValues('phoneNumber'),
        code: getValues('verificationCode'),
      }),
    onSuccess: () => {
      toast.success('인증 성공했습니다.')
    },
    onError: () => {
      resetField('verificationCode')
      toast.error('인증 실패했습니다. 다시 시도해주세요.')
    },
  })
  const signupMutation = useMutation({
    mutationFn: () =>
      postSignup({
        ...getValues(),
        email: getValues('email') ? getValues('email') : null,
        profileImage: null,
      }),
    onSuccess: ({ accessToken, refreshToken }) => {
      setToken({ accessToken, refreshToken })
      setMode('success')
    },
    onError: () => {
      setMode('error')
    },
  })
  const leftTimeMinutes = String(
    Math.floor((leftTime / (INTERVAL * SEC_IN_MIN)) % SEC_IN_MIN)
  ).padStart(2, '0')
  const leftTimeSeconds = String(
    Math.floor((leftTime / INTERVAL) % SEC_IN_MIN)
  ).padStart(2, '0')
  const isValid = useMemo(
    () =>
      !errors.name?.type &&
      !errors.phoneNumber?.type &&
      !errors.verificationCode?.type,
    [errors]
  )
  const onSubmit = () => {
    signupMutation.mutate()
  }

  useEffect(() => {
    trigger()
  }, [])
  useEffect(() => {
    if (sendCodeMutation.isSuccess) {
      const intervalId = setInterval(() => {
        setLeftTime((prev) => prev - INTERVAL)
      }, INTERVAL)

      if (leftTime <= 0 || verifyCodeMutation.isSuccess) {
        clearInterval(intervalId)
      }

      return () => clearInterval(intervalId)
    }
  }, [leftTime, sendCodeMutation.isSuccess])

  return (
    <div className="container flex flex-col justify-center gap-y-10 px-6 py-2 sm:px-12">
      {mode === 'form' && (
        <div className="flex flex-col items-center gap-y-10">
          <h2 className="text-xl font-bold">회원가입</h2>
          <form
            className="flex w-full flex-col gap-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="이름"
              placeholder="본명을 입력해주세요"
              errorMessage={touchedFields.name ? errors.name?.message : ''}
              required
              {...register('name', {
                required: { value: true, message: errorMessages.name },
              })}
            />
            <div className="flex flex-col gap-y-4">
              <div className="flex items-end gap-x-5">
                <Input
                  label="전화번호"
                  placeholder="'-' 없이 번호만 입력해주세요."
                  errorMessage={
                    touchedFields.phoneNumber ? errors.phoneNumber?.message : ''
                  }
                  required
                  {...register('phoneNumber', {
                    required: true,
                    pattern: {
                      value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                      message: errorMessages.phoneNumber,
                    },
                  })}
                />
                <Button
                  text={
                    sendCodeMutation.isIdle || verifyCodeMutation.isSuccess
                      ? '인증하기'
                      : `${leftTimeMinutes}:${leftTimeSeconds}`
                  }
                  theme="outline"
                  disabled={
                    sendCodeMutation.isSuccess || !!errors.phoneNumber?.type
                  }
                  isLoading={sendCodeMutation.isPending}
                  onClick={() => {
                    sendCodeMutation.mutate()
                  }}
                />
              </div>
              {sendCodeMutation.isSuccess && (
                <div className="flex items-end gap-x-5">
                  <Input
                    placeholder="인증코드를 입력해주세요"
                    {...register('verificationCode', { required: true })}
                  />
                  <Button
                    text="확인하기"
                    theme="outline"
                    disabled={
                      verifyCodeMutation.isSuccess || verifyCodeMutation.isError
                    }
                    isLoading={verifyCodeMutation.isPending}
                    onClick={() => {
                      verifyCodeMutation.mutate()
                    }}
                  />
                </div>
              )}
            </div>
            <Input
              label="이메일"
              placeholder="이메일 없이도 가입이 가능합니다"
              errorMessage={touchedFields.email ? errors.email?.message : ''}
              {...register('email', {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: errorMessages.email,
                },
              })}
            />
            <Button
              type="submit"
              text="가입하기"
              className="mx-auto mt-4 w-fit px-10 py-3"
              disabled={!isValid}
              isLoading={signupMutation.isPending}
            />
          </form>
        </div>
      )}

      {mode === 'success' && (
        <div className="flex flex-col items-center gap-y-10">
          <img src={success} alt="success" />
          <div className="flex flex-col items-center gap-y-6">
            <h2 className="text-xl font-bold">회원가입에 성공했습니다!</h2>
            <Button
              text="홈으로 가기"
              className="w-full py-3"
              onClick={() => {
                window.location.href = path.schedules
              }}
            />
          </div>
        </div>
      )}

      {mode === 'error' && (
        <div className="flex flex-col items-center gap-y-10">
          <img src={error} alt="error" />
          <div className="flex flex-col items-center gap-y-6">
            <h2 className="text-xl font-bold">회원가입에 실패했습니다.</h2>
            <Button
              text="다시 시도하기"
              className="w-full py-3"
              onClick={() => {
                window.location.href = path.signup
              }}
            />
          </div>
        </div>
      )}

      <Toast />
    </div>
  )
}

export default SignupPage
