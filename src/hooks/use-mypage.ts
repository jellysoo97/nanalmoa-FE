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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PUT_MYPAGE] })
    },
    onError: (err) => {
      console.log(err)
      toast.error(err.message)
    },
  })

  const mutationSmsSend = useMutation({
    mutationKey: [QUERY_KEYS.POST_SMS_SEND],
    mutationFn: postSmsCode,
    onSuccess: () => {
      toast.success('인증번호가 발송되었습니다. 5분 이내에 인증해주세요')
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const mutationSmsVerify = useMutation({
    mutationKey: [QUERY_KEYS.POST_SMS_VERIFY],
    mutationFn: postSmsVerify,
    onSuccess: () => {
      toast.success('인증 완료되었습니다')
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const mutationEmailSend = useMutation({
    mutationKey: [QUERY_KEYS.POST_EMAIL_SEND],
    mutationFn: postEmailSend,
    onSuccess: () => {
      toast.success('인증번호가 발송되었습니다.\n 5분 이내에 인증해주세요')
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const mutationEmailVerify = useMutation({
    mutationKey: [QUERY_KEYS.POST_EMAIL_VERIFY],
    mutationFn: postEmailVerify,
    onSuccess: () => {
      toast.success('인증 완료되었습니다')
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const mutationDeleteUser = useMutation({
    mutationKey: [QUERY_KEYS.DELETE_USER],
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('삭제 성공')
      // 추가적인 성공 후 작업 (예: 로그아웃)
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
