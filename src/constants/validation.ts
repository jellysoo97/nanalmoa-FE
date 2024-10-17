export const validationSchema = {
  phoneNumber: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
}

export const errorMessages = {
  default: '에러가 발생했습니다.\n 다시 시도해주세요.',
  name: '이름은 필수 정보입니다. 이름을 입력해주세요.',
  phoneNumber: '잘못된 전화번호입니다. 다시 입력해주세요.',
  login:
    '등록되지 않은 회원이거나\n 인증코드 유효시간이 지났습니다.\n 다시 시도해주세요.',
  smsVerify: '잘못된 인증코드입니다. 다시 입력해주세요.',
  email: '잘못된 이메일 형식입니다. 다시 입력해주세요.',
}
