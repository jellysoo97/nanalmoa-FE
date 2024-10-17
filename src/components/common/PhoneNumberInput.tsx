import { postSmsCode } from '@/api/auth/post-sms-code'
import { postSmsVerify } from '@/api/auth/post-sms-verify'
import { errorMessages, validationSchema } from '@/constants/validation'
import { INTERVAL, SEC_IN_MIN, useTimer } from '@/hooks/use-timer'
import { useMutation } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button, Input } from '.'
import { useEffect, useState } from 'react'

type Props = {
  isRetry?: boolean
  isRequired?: boolean
  handleVerification?: (isSuccess: boolean) => void
}

const TIME_LIMIT = 5 * SEC_IN_MIN * INTERVAL

const PhoneNumberInput = ({
  isRequired,
  isRetry,
  handleVerification,
}: Props) => {
  const [isTimerStart, setIsTimerStart] = useState<boolean>(false)
  const {
    register,
    getValues,
    resetField,
    trigger,
    formState: { errors, touchedFields },
  } = useFormContext()
  const sendCodeMutation = useMutation({
    mutationFn: postSmsCode,
    onSuccess: () => {
      setIsTimerStart(true)
      toast.success('인증코드가 발송되었습니다.')
    },
    onError: () => {
      setIsTimerStart(false)
      toast.error(errorMessages.default)
      resetField('phoneNumber')
    },
  })
  const verifyCodeMutation = useMutation({
    mutationFn: postSmsVerify,
    onSuccess: () => {
      setIsTimerStart(false)
      toast.success('인증 성공했습니다.')
      if (handleVerification) {
        handleVerification(true)
      }
    },
    onError: () => {
      setIsTimerStart(false)
      resetField('verificationCode')
      toast.error(errorMessages.smsVerify)
      if (handleVerification) {
        handleVerification(false)
      }
    },
    onSettled: () => {
      trigger()
    },
  })
  const { minutes, seconds } = useTimer({
    timeLimit: TIME_LIMIT,
    isStart: isTimerStart,
    isDone: !isTimerStart,
  })

  const handleVerify = async () => {
    await trigger()

    if (!errors.phoneNumber?.type) {
      sendCodeMutation.mutate({ phoneNumber: getValues('phoneNumber') })
    }
  }
  const handleConfirm = async () => {
    await trigger()

    if (!errors.verificationCode?.type) {
      verifyCodeMutation.mutate({
        phoneNumber: getValues('phoneNumber'),
        code: getValues('verificationCode'),
      })
    }
  }

  useEffect(() => {
    if (isRetry) {
      setIsTimerStart(false)
    }
  }, [isRetry])

  return (
    <div className="flex flex-col gap-y-5">
      <div className="relative">
        <Input
          label="전화번호"
          placeholder="'-' 없이 번호만 입력해주세요."
          errorMessage={
            touchedFields.phoneNumber
              ? (errors.phoneNumber?.message as string)
              : ''
          }
          required={isRequired}
          {...register('phoneNumber', {
            required: true,
            pattern: {
              value: validationSchema.phoneNumber,
              message: errorMessages.phoneNumber,
            },
          })}
        />
        <Button
          text={isTimerStart ? `${minutes}:${seconds}` : '인증'}
          disabled={!isRetry && verifyCodeMutation.isSuccess}
          isLoading={sendCodeMutation.isPending}
          className="absolute bottom-[6px] right-[6px] z-10 h-8 max-w-14 px-2 py-2 text-sm"
          onClick={handleVerify}
        />
      </div>
      <div className="relative">
        <Input
          placeholder="인증코드를 입력해주세요"
          {...register('verificationCode', { required: true })}
        />
        <Button
          text="확인"
          theme="outline"
          disabled={!isRetry && verifyCodeMutation.isSuccess}
          className="absolute bottom-[6px] right-[6px] z-10 h-8 max-w-14 px-2 py-2 text-sm"
          onClick={handleConfirm}
        />
      </div>
    </div>
  )
}

export default PhoneNumberInput
