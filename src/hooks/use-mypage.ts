import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postEmailSend, postEmailVerify } from '@/api/mypage/post-mypage-auth'
import { deleteUser, putMypage } from '@/api/mypage/put-mypage'
import { postSmsCode } from '@/api/auth/post-sms-code'
import { postSmsVerify } from '@/api/auth/post-sms-verify'
import { QUERY_KEYS } from '@/constants/api'
import { toast } from 'react-toastify'

export const useMypageMutations = () => {
  const queryClient = useQueryClient()

  const mutationPutMypage = useMutation({
    mutationKey: [QUERY_KEYS.PUT_MYPAGE],
    mutationFn: putMypage,
    onSuccess: () => {
      toast.success('수정되었습니다.')
    },
    onError: (err) => {
      toast.error(err.message)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PUT_MYPAGE] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USER_ME] })
    },
  })

  const mutationSmsSend = useMutation({
    mutationKey: [QUERY_KEYS.POST_SMS_SEND],
    mutationFn: postSmsCode,
    onSuccess: () => {
      toast.success('인증번호가 발송되었습니다. 5분 이내에 인증해주세요.')
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const mutationSmsVerify = useMutation({
    mutationKey: [QUERY_KEYS.POST_SMS_VERIFY],
    mutationFn: postSmsVerify,
    onSuccess: () => {
      toast.success('인증 완료되었습니다.')
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const mutationEmailSend = useMutation({
    mutationKey: [QUERY_KEYS.POST_EMAIL_SEND],
    mutationFn: postEmailSend,
    onSuccess: () => {
      toast.success('인증번호가 발송되었습니다.\n 5분 이내에 인증해주세요.')
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const mutationEmailVerify = useMutation({
    mutationKey: [QUERY_KEYS.POST_EMAIL_VERIFY],
    mutationFn: postEmailVerify,
    onSuccess: () => {
      toast.success('인증 완료되었습니다.')
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const mutationDeleteUser = useMutation({
    mutationKey: [QUERY_KEYS.DELETE_USER],
    mutationFn: deleteUser,
    onSuccess: () => {
      localStorage.clear()
    },
    onError: () => {
      toast.error('유저 삭제에 실패했습니다.')
    },
  })

  return {
    mutationPutMypage,
    mutationSmsSend,
    mutationSmsVerify,
    mutationEmailSend,
    mutationEmailVerify,
    mutationDeleteUser,
  }
}
