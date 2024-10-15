import { DesktopLayout, Layout } from '@/components/layout'
import {
  CreateAudioSchdulePage,
  CreateManualSchedulePage,
  CreatePhotoSchedulePage,
  HomePage,
  LandingPage,
  LoginPage,
  LoginRedirectPage,
  ScheduleDetailPage,
  SettingsPage,
} from '@/pages'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import { path } from './path'
import MyPage from '@/pages/setting/MyPage'
import SettingAlarmPage from '@/pages/setting/SettingAlarmPage'
import SettingGroupPage from '@/pages/setting/SettingGroupPage'
import SettingManagerPage from '@/pages/setting/SettingManagerPage'
import SettingActivityPage from '@/pages/setting/SettingActivityPage'
import SettingGroupDetailPage from '@/pages/setting/SettingGroupDetailPage'

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage isLanding />,
  },
  {
    path: path.login,
    element: (
      <DesktopLayout>
        <Outlet />
      </DesktopLayout>
    ),
    children: [
      {
        path: '',
        element: <LoginPage />,
      },
      {
        path: path.loginRedirect,
        element: <LoginRedirectPage />,
      },
    ],
  },
  {
    path: path.schedules,
    element: (
      <DesktopLayout>
        <Layout>
          <Outlet />
        </Layout>
      </DesktopLayout>
    ),
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: path.createSchedule.base,
        children: [
          {
            path: path.createSchedule.audio,
            element: <CreateAudioSchdulePage />,
          },
          {
            path: path.createSchedule.photo,
            element: <CreatePhotoSchedulePage />,
          },
          {
            path: path.createSchedule.manual,
            element: <CreateManualSchedulePage />,
          },
        ],
      },
      {
        path: path.scheduleDetail,
        element: <ScheduleDetailPage />,
      },
    ],
  },
  {
    path: path.settings.base,
    element: (
      <DesktopLayout>
        <Layout>
          <Outlet />
        </Layout>
      </DesktopLayout>
    ),
    children: [
      {
        path: '',
        element: <SettingsPage />,
      },
      {
        path: path.settings.mypage,
        element: <MyPage />,
      },
      {
        path: path.settings.alarmPermission,
        element: <SettingAlarmPage />,
      },
      {
        path: path.settings.activityTime,
        element: <SettingActivityPage />,
      },
      {
        path: path.settings.group,
        element: <SettingGroupPage />,
      },
      {
        path: path.settings.manager,
        element: <SettingManagerPage />,
      },
      {
        path: `${path.settings.base}/${path.settings.group}/${path.groupDetail}`,
        element: <SettingGroupDetailPage />,
      },
    ],
  },
])

export default AppRouter
