export const path = {
  login: '/login',
  loginRedirect: '/login/redirect',
  signup: '/signup',
  signupResult: '/signup/result',
  schedules: '/schedules',
  createSchedule: {
    base: 'create',
    audio: '/schedules/create/audio',
    photo: '/schedules/create/photo',
    manual: '/schedules/create/manual',
  },
  scheduleDetail: ':id',
  settings: {
    base: '/settings',
    mypage: 'mypage',
    alarmPermission: 'alarmPermission',
    activityTime: 'activityTime',
    group: 'group',
    manager: 'manager',
  },
  groupDetail: ':id',
}
