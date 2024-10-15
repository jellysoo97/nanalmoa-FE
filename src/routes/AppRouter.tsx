import { DesktopLayout, Layout } from '@/components/layout'
import {
  CreateAudioSchdulePage,
  CreateManualSchedulePage,
  CreatePhotoSchedulePage,
  ErrorBoundary,
  HomePage,
  LandingPage,
  LoginPage,
  LoginRedirectPage,
  MyPage,
  ScheduleDetailPage,
  SettingActivityPage,
  SettingAlarmPage,
  SettingGroupPage,
  SettingGroupDetailPage,
  SettingManagerPage,
  SettingsPage,
  SignupPage,
  SignupResultPage,
} from '@/pages'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import { path } from './path'

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage isLanding />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: path.signup,
    element: (
      <DesktopLayout>
        <Outlet />
      </DesktopLayout>
    ),
    children: [
      {
        path: '',
        element: <SignupPage />,
      },
      {
        path: 'result',
        element: <SignupResultPage />,
      },
    ],
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
