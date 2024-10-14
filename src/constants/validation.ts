export const validationSchema = {
  phoneNumber: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
}

export const errorMessages = {
  name: '이름은 필수 정보입니다. 이름을 입력해주세요.',
  phoneNumber: '잘못된 전화번호입니다. 다시 입력해주세요.',
  smsVerify: '잘못된 인증코드입니다. 다시 입력해주세요.',
  email: '잘못된 이메일 형식입니다. 다시 입력해주세요.',
}
