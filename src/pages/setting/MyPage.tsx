import {
  postEmailSend,
  postEmailVerify,
  postSMSSend,
  postSMSVerify,
} from '@/api/mypage/post-mypage-auth'
import { putMypage } from '@/api/mypage/put-mypage'
import SuccessFace from '@/assets/imgs/SuccessFace.png'
import { Button } from '@/components/common'
import { QUERY_KEYS } from '@/constants/api'
import { useUser } from '@/hooks/use-user'
import { path } from '@/routes/path'
import { PutMypage } from '@/types/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
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
    },
  })

  const handlePutMy = () => {
    const payload: PutMypage = {}

    // 변경된 필드만 추가
    if (name) payload.name = name
    if (phoneNumber) {
      payload.phoneNumber = phoneNumber
      payload.phoneVerificationCode = smsVerify // 인증번호 추가
    }
    if (email) {
      payload.email = email
      payload.emailVerificationCode = emailVerify // 인증번호 추가
    }
    if (address) payload.address = address

    // PUT 요청
    if (Object.keys(payload).length > 0) {
      mutation.mutate(payload)
    } else {
      alert('변경된 값이 없습니다.')
    }
  }

  //전화번호 인증
  const smsSendMutation = useMutation({
    mutationKey: [QUERY_KEYS.POST_SMS_SEND],
    mutationFn: postSMSSend,
    onSuccess: () => {
      alert('인증번호가 발송되었습니다. 5분 이내에 인증해주세요')
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
      alert('인증 완료되었습니다')
      setIsSMSSent(false)
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const handleSMSSend = () => {
    if (!phoneNumber) {
      alert('전화번호를 입력해 주세요.')
      return
    }
    const payload = { phoneNumber: phoneNumber }
    smsSendMutation.mutate(payload)
  }

  const handleSMSVerify = () => {
    if (!smsVerify) {
      alert('인증번호를 입력해 주세요.')
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
      alert('인증번호가 발송되었습니다. 5분 이내에 인증해주세요')
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
      alert('인증 완료되었습니다')
      setIsSMSSent(true)
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const handleEmailSend = () => {
    if (!email) {
      alert('이메일을 입력해 주세요.')
      return
    }
    const payload = { email: email }
    emailSendMutation.mutate(payload)
  }

  const handleEmailVerify = () => {
    if (!smsVerify) {
      alert('인증번호를 입력해 주세요.')
      return
    }
    const payload = { email: phoneNumber, code: emailVerify }
    emailVerifyMutation.mutate(payload)
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
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="w-full">
          <div className="mb-4">
            <label className="block font-medium text-gray-700">이름</label>
            {isEdit ? (
              <input
                type="text"
                className="mt-1 block w-[70%] rounded-md border border-gray-300 p-2 shadow-sm"
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
            <label className="block font-medium text-gray-700">
              전화번호
              {isEdit && (
                <span className="ml-2 text-sm text-neutral-400">
                  (010-0000-0000 형식)
                </span>
              )}
            </label>
            {isEdit ? (
              <>
                <div className="flex justify-between">
                  <input
                    type="tel"
                    className="mt-1 block w-[70%] rounded-md border border-gray-300 p-2 shadow-sm"
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
                      className="mt-1 block w-[70%] rounded-md border border-gray-300 p-2 shadow-sm"
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
            <label className="block font-medium text-gray-700">이메일</label>
            {isEdit ? (
              <>
                <div className="flex justify-between">
                  <input
                    type="email"
                    className="mt-1 block w-[70%] rounded-md border border-gray-300 p-2 shadow-sm"
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
                      className="mt-1 block w-[70%] rounded-md border border-gray-300 p-2 shadow-sm"
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
            <label className="block font-medium text-gray-700">주소</label>
            {isEdit ? (
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
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
        onClick={() => {
          alert('탈퇴하시겠습니까?')
        }}
      />
    </div>
  )
}

export default MyPage
