import { postSignup } from '@/api/auth/post-signup'
import { Button, Input, PhoneNumberInput } from '@/components/common'
import Toast from '@/components/common/Toast'
import { errorMessages, validationSchema } from '@/constants/validation'
import { path } from '@/routes/path'
import { PostSignupReq } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const navigate = useNavigate()
  const methods = useForm<PostSignupReq>({
    mode: 'onBlur',
  })
  const {
    register,
    getValues,
    trigger,
    handleSubmit,
    formState: { errors, touchedFields },
  } = methods
  const isValid = useMemo(
    () =>
      !errors.name?.type &&
      !errors.phoneNumber?.type &&
      !errors.verificationCode?.type,
    [errors.name, errors.phoneNumber, errors.verificationCode]
  )

  const signupMutation = useMutation({
    mutationFn: () =>
      postSignup({
        ...getValues(),
        email: getValues('email') ? getValues('email') : null,
        profileImage: null,
      }),
    onSuccess: () => {
      navigate(`${path.signupResult}?q=true`)
    },
    onError: () => {
      navigate(`${path.signupResult}?q=false`)
    },
  })

  useEffect(() => {
    trigger()
  }, [])

  return (
    <>
      <div className="container flex flex-col justify-center gap-y-10 px-6 py-2 sm:px-12">
        <div className="flex flex-col items-center gap-y-10">
          <h2 className="text-xl font-bold">회원가입</h2>
          <FormProvider {...methods}>
            <form
              className="flex w-full flex-col gap-y-6"
              onSubmit={handleSubmit(() => signupMutation.mutate())}
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
              <PhoneNumberInput isRequired />
              <Input
                label="이메일"
                placeholder="이메일 없이도 가입이 가능합니다"
                errorMessage={touchedFields.email ? errors.email?.message : ''}
                {...register('email', {
                  pattern: {
                    value: validationSchema.email,
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
          </FormProvider>
        </div>
      </div>

      <Toast />
    </>
  )
}

export default SignupPage
