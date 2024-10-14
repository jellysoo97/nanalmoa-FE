export const ACCESS_TOKEN_KEY = 'accessToken'

export const REFRESH_TOKEN_KEY = 'refreshToken'

export const REFRESH_TOKEN_DURATION = 24

export const KAKAO_AUTH_API_URL = 'https://kauth.kakao.com/oauth/authorize'

export const NAVER_AUTH_API_URL = 'https://nid.naver.com/oauth2.0/authorize'

export const API_DOMAINS = {
  AUTH: '/auth',
  USERS: '/users',
  SCHEDULES: '/schedules',
  GROUP: '/groups',
  ROUTINE: '/users-routine',
  MANAGER: '/manager',
}

export const QUERY_KEYS = {
  POST_LOGIN: 'login',
  GET_KAKAO_LOGIN: 'kakaoLogin',
  GET_NAVER_LOGIN: 'naverLogin',
  GET_USER_ME: 'me',
  GET_USER_SEARCH: 'userSearch',
  GET_SCHEDULES: 'schedules',
  GET_SCHEDULE_BY_ID: 'scheduleById',
  GET_SCHEDULE_BY_RANGE: 'scheduleByRange',
  POST_AUDIO_FILE: 'postAudioFile',
  POST_SCHEDULES: 'postSchedules',
  UPDATE_SCHEDULES: 'updateSchedules',
  GET_GROUP_USER: 'groupUsers',
  PUT_MYPAGE: 'mypage',
  POST_SMS_SEND: 'smsSend',
  POST_SMS_VERIFY: 'smsVerify',
  POST_EMAIL_SEND: 'emailSend',
  POST_EMAIL_VERIFY: 'emailVerify',
  GET_ROUTINE: 'routine',
  GET_MANAGER_INVITATION_SEND: 'managerInvitationSend',
  GET_MANAGER_INVITATION_RECEIVED: 'managerInvitationReceived',
}
