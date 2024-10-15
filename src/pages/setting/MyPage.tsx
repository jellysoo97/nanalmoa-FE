import {
  postEmailSend,
  postEmailVerify,
  postSMSSend,
  postSMSVerify,
} from '@/api/mypage/post-mypage-auth'
import { deleteUser, putMypage } from '@/api/mypage/put-mypage'
import SuccessFace from '@/assets/imgs/success.png'
import { Button } from '@/components/common'
import { QUERY_KEYS } from '@/constants/api'
import { useUser } from '@/hooks/use-user'
import { path } from '@/routes/path'
import { PutMypage } from '@/types/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Toast from '@/components/common/Toast'
import Modal from '@/components/common/Modal'
import { useModal } from '@/hooks/use-modal'
import Divider from '@/components/common/Divider'
import TrashCanIcon from '@/components/icons/TrashCanIcon'

const MyPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isModalOpen, openModal, closeModal } = useModal()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isSMSSent, setIsSMSSent] = useState<boolean>(false)
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false)

  const [name, setName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [address, setAddress] = useState<string>('')

  const [smsVerify, setSmsVerify] = useState<string>('')
  const [emailVerify, setEmailVerify] = useState<string>('')

  const { user } = useUser()
  const userInfo = user.info
  const userProfile = userInfo?.profileImage || SuccessFace
  const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/

  useEffect(() => {
    if (isEdit) {
      setName('')
      setPhoneNumber('')
      setEmail('')
      setAddress('')
    }
  }, [isEdit])

  //정보 수정
  const mutation = useMutation({
    mutationKey: [QUERY_KEYS.PUT_MYPAGE],
    mutationFn: putMypage,
    onSuccess: () => {
      setIsEdit(false)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PUT_MYPAGE] })
      window.location.reload()
    },
    onError: (err) => {
      console.log(err)
      toast.error(err.message)
    },
  })

  const handlePutMy = () => {
    const payload: PutMypage = {}

    // 전화번호 형식 검사
    if (!phoneRegex.test(phoneNumber)) {
      toast.error('전화번호 형식이 틀렸습니다. 올바른 형식으로 입력해 주세요.')
      return
    }

    if (!payload.phoneVerificationCode || !payload.emailVerificationCode) {
      toast.error('인증 후 수정할 수 있습니다')
      return
    }

    // 변경된 필드만
    if (name) payload.name = name
    if (phoneNumber) {
      payload.phoneNumber = phoneNumber
      payload.phoneVerificationCode = smsVerify
    }
    if (email) {
      payload.email = email
      payload.emailVerificationCode = emailVerify
    }
    if (address) payload.address = address

    if (Object.keys(payload).length > 0) {
      mutation.mutate(payload)
    } else {
      toast.error('변경된 값이 없습니다.')
    }
  }

  //전화번호 인증
  const smsSendMutation = useMutation({
    mutationKey: [QUERY_KEYS.POST_SMS_SEND],
    mutationFn: postSMSSend,
    onSuccess: () => {
      toast.success('인증번호가 발송되었습니다. 5분 이내에 인증해주세요')
      setIsSMSSent(true)
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const smsVerifyMutation = useMutation({
    mutationKey: [QUERY_KEYS.POST_SMS_VERIFY],
    mutationFn: postSMSVerify,
    onSuccess: () => {
      toast.success('인증 완료되었습니다')
      setIsSMSSent(false)
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const handleSMSSend = () => {
    if (!phoneNumber) {
      toast.error('전화번호를 입력해 주세요.')
      return
    }

    // 전화번호 형식 검사
    if (!phoneRegex.test(phoneNumber)) {
      toast.error('전화번호 형식이 틀렸습니다. 올바른 형식으로 입력해 주세요.')
      return
    }

    const payload = { phoneNumber: phoneNumber }
    smsSendMutation.mutate(payload)
  }

  const handleSMSVerify = () => {
    if (!smsVerify) {
      toast.error('인증번호를 입력해 주세요.')
      return
    }
    const payload = { phoneNumber: phoneNumber, code: smsVerify }
    smsVerifyMutation.mutate(payload)
  }

  //이메일 인증
  const emailSendMutation = useMutation({
    mutationKey: [QUERY_KEYS.POST_EMAIL_SEND],
    mutationFn: postEmailSend,
    onSuccess: () => {
      toast.success('인증번호가 발송되었습니다. 5분 이내에 인증해주세요')
      setIsEmailSent(true)
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const emailVerifyMutation = useMutation({
    mutationKey: [QUERY_KEYS.POST_EMAIL_VERIFY],
    mutationFn: postEmailVerify,
    onSuccess: () => {
      toast.success('인증 완료되었습니다')
      setIsEmailSent(false)
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const handleEmailSend = () => {
    if (!email) {
      toast.error('이메일을 입력해 주세요.')
      return
    }
    const payload = { email: email }
    emailSendMutation.mutate(payload)
  }

  const handleEmailVerify = () => {
    if (!smsVerify) {
      toast.error('인증번호를 입력해 주세요.')
      return
    }
    const payload = { email: phoneNumber, code: emailVerify }
    emailVerifyMutation.mutate(payload)
  }

  //회원탈퇴
  const userDeleteMutation = useMutation({
    mutationKey: [QUERY_KEYS.DELETE_USER],
    mutationFn: deleteUser,
    onSuccess: () => {
      console.log('삭제 성공')
      navigate(`${path.login}`)
      localStorage.clear()
    },
    onError: () => {
      toast.error('유저 삭제에 실패했습니다.')
    },
  })

  const handleDeleteUser = () => {
    userDeleteMutation.mutate()
  }
  return (
    <div className="h-full w-full p-4">
      <div className="flex justify-between">
        {isEdit ? (
          <Button
            text="X 취소"
            onClick={() => {
              setIsEdit(false)
            }}
          />
        ) : (
          <Button
            text="이전으로"
            onClick={() => {
              navigate(path.settings.base)
            }}
          />
        )}
        <Button
          text="수정하기"
          onClick={() => {
            if (!isEdit) {
              setIsEdit(true)
            } else {
              handlePutMy()
            }
          }}
        />
      </div>
      <div className="my-10 flex flex-col items-center justify-center">
        <div className="w-30 h-30 mb-4 flex items-center justify-center rounded-full">
          <img
            src={userProfile}
            alt="Profile"
            className="rounded-full object-cover"
            style={{ width: '200px', height: '200px' }}
          />
        </div>
        <div className="w-full">
          <div className="mb-4">
            <label className="block font-medium text-neutral-700">이름</label>
            {isEdit ? (
              <input
                type="text"
                className="mt-1 block w-[70%] rounded-md border border-neutral-300 p-2 shadow-sm"
                defaultValue={userInfo?.name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <div className="flex w-full justify-between">
                <p className="mt-2 w-1/2 text-xl">{userInfo?.name}</p>
                {userInfo?.isManager && (
                  <label className="flex items-center rounded-md bg-primary-coral px-3 py-2 text-center text-white">
                    관리자
                  </label>
                )}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-medium text-neutral-700">
              전화번호
              {isEdit && (
                <span className="ml-2 text-sm text-neutral-400">
                  (010-XXXX-XXXX 형식)
                </span>
              )}
            </label>
            {isEdit ? (
              <>
                <div className="flex justify-between">
                  <input
                    type="tel"
                    className="mt-1 block w-[70%] rounded-md border border-neutral-300 p-2 shadow-sm"
                    defaultValue={userInfo?.phoneNumber || ''}
                    placeholder="정보 없음"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {!isSMSSent && <Button text="인증" onClick={handleSMSSend} />}
                </div>
                {/* 인증버튼 */}
                {isSMSSent && (
                  <>
                    <input
                      className="mt-1 block w-[70%] rounded-md border border-neutral-300 p-2 shadow-sm"
                      placeholder="000000"
                      type="text"
                      autoComplete="one-time-code"
                      inputMode="numeric"
                      maxLength={6}
                      pattern="\d{6}"
                      onChange={(e) => setSmsVerify(e.target.value)}
                    />
                    <Button text="인증완료" onClick={handleSMSVerify} />
                  </>
                )}
              </>
            ) : (
              <p className="mt-2 text-xl">
                {userInfo?.phoneNumber || '정보 없음'}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-medium text-neutral-700">이메일</label>
            {isEdit ? (
              <>
                <div className="flex justify-between">
                  <input
                    type="email"
                    className="mt-1 block w-[70%] rounded-md border border-neutral-300 p-2 shadow-sm"
                    defaultValue={userInfo?.email || ''}
                    placeholder="정보 없음"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!isEmailSent && (
                    <Button text="인증" onClick={handleEmailSend} />
                  )}
                </div>
                {/* 인증버튼 */}
                {isEmailSent && (
                  <>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      pattern="\d{6}"
                      className="mt-1 block w-[70%] rounded-md border border-neutral-300 p-2 shadow-sm"
                      placeholder="000000"
                      onChange={(e) => {
                        const value = e.target.value
                        if (value.length <= 6) {
                          setEmailVerify(value)
                        }
                      }}
                    />
                    <Button text="인증완료" onClick={handleEmailVerify} />
                  </>
                )}
              </>
            ) : (
              <p className="mt-2 text-xl">{userInfo?.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-medium text-neutral-700">주소</label>
            {isEdit ? (
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-neutral-300 p-2 shadow-sm"
                defaultValue={userInfo?.address || ''}
                placeholder="정보 없음"
                onChange={(e) => setAddress(e.target.value)}
              />
            ) : (
              <p className="mt-2 text-xl">{userInfo?.address || '정보 없음'}</p>
            )}
          </div>
        </div>
      </div>
      <Button
        text="회원 탈퇴"
        className="bg-primary-coral"
        onClick={openModal}
      />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className="px-6">
            <div className="mx-auto py-3">
              <p>
                기존 일정, 복약,
                <br />
                관리자, 그룹이 모두 삭제됩니다.
              </p>
            </div>
            <Divider />
            <div className="py-4 text-center text-lg">
              정말 탈퇴하시겠습니까?
            </div>
            <div className="mx-auto flex w-2/3 flex-col">
              <Button text="취소" onClick={closeModal} />
              <button
                onClick={handleDeleteUser}
                className="mx-auto mt-2 flex w-full items-center justify-center rounded bg-primary-coral"
              >
                <TrashCanIcon className="w-6" />
                <div className="text-center font-medium">탈퇴하기</div>
              </button>
            </div>
          </div>
        </Modal>
      )}
      <Toast />
    </div>
  )
}

export default MyPage
