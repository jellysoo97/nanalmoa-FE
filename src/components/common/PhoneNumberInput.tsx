import { postSmsCode } from '@/api/auth/post-sms-code'
import { postSmsVerify } from '@/api/auth/post-sms-verify'
import { errorMessages, validationSchema } from '@/constants/validation'
import { INTERVAL, SEC_IN_MIN, useTimer } from '@/hooks/use-timer'
import { useMutation } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button, Input } from '.'

type Props = {
  isRequired?: boolean
  handleVerification?: (isSuccess: boolean) => void
}

const TIME_LIMIT = 5 * SEC_IN_MIN * INTERVAL

const PhoneNumberInput = ({ isRequired, handleVerification }: Props) => {
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
      toast.success('인증코드가 발송되었습니다.')
    },
    onError: () => {
      toast.error('에러가 발생했습니다. 다시 시도해주세요.')
      resetField('phoneNumber')
    },
  })
  const verifyCodeMutation = useMutation({
    mutationFn: postSmsVerify,
    onSuccess: () => {
      toast.success('인증 성공했습니다.')
      if (handleVerification) {
        handleVerification(true)
      }
    },
    onError: () => {
      resetField('verificationCode')
      toast.error('인증 실패했습니다. 다시 시도해주세요.')
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
    isStart: sendCodeMutation.isSuccess,
    isDone: verifyCodeMutation.isSuccess || verifyCodeMutation.isError,
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

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-wrap items-end justify-end gap-5 sm:flex-nowrap">
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
          onBlur={() => trigger()}
        />
        <Button
          text={
            sendCodeMutation.isIdle || verifyCodeMutation.isSuccess
              ? '인증하기'
              : `${minutes}:${seconds}`
          }
          disabled={sendCodeMutation.isSuccess || !!errors.phoneNumber?.type}
          isLoading={sendCodeMutation.isPending}
          className="text-right"
          onClick={handleVerify}
        />
      </div>
      <div className="flex flex-wrap items-end justify-end gap-5 sm:flex-nowrap">
        <Input
          placeholder="인증코드를 입력해주세요"
          {...register('verificationCode', { required: true })}
        />
        <Button
          text="확인하기"
          theme="outline"
          disabled={verifyCodeMutation.isSuccess || verifyCodeMutation.isError}
          isLoading={verifyCodeMutation.isPending}
          onClick={handleConfirm}
        />
      </div>
    </div>
  )
}

export default PhoneNumberInput
