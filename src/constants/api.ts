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
  INVITATIONS: '/invitations',
}

export const QUERY_KEYS = {
  POST_LOGIN: 'login',
  GET_KAKAO_LOGIN: 'kakaoLogin',
  GET_NAVER_LOGIN: 'naverLogin',
  GET_USER_ME: 'me',
  GET_USER_SEARCH: 'userSearch',
  DELETE_USER: 'deleteUser',
  GET_SCHEDULES: 'schedules',
  GET_SCHEDULE_BY_ID: 'scheduleById',
  GET_SCHEDULE_BY_RANGE: 'scheduleByRange',
  POST_AUDIO_FILE: 'postAudioFile',
  POST_SCHEDULES: 'postSchedules',
  UPDATE_SCHEDULES: 'updateSchedules',
  GET_GROUP_USER: 'groupUsers',
  GET_GROUP_INVITATION_SEND: 'groupInvitationSend',
  GET_GROUP_INVITATION_RECEIVED: 'groupInvitationReceived',
  GET_GROUP_DETAIL: 'groupDetail',
  DELETE_GROUP: 'deleteGroup',
  DELETE_GROUP_USER: 'deleteGroupUser',
  POST_GROUP: 'group',
  POST_GROUP_INVITE: 'groupInvite',
  PUT_MYPAGE: 'mypage',
  POST_SMS_SEND: 'smsSend',
  POST_SMS_VERIFY: 'smsVerify',
  POST_EMAIL_SEND: 'emailSend',
  POST_EMAIL_VERIFY: 'emailVerify',
  GET_ROUTINE: 'getRoutine',
  PUT_ROUTINE: 'putRoutine',
  GET_MANAGER_INVITATION_SEND: 'managerInvitationSend',
  GET_MANAGER_INVITATION_RECEIVED: 'managerInvitationReceived',
  GET_MANAGER_MANAGERS: 'myManagers',
  GET_MANAGER_SUBORDINATES: 'mySubordinates',
  GET_INVITATIONS_USER: 'invitationsUser',
}
