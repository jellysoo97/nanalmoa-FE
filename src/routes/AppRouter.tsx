import { DesktopLayout, Layout } from '@/components/layout'
import {
  CreateSchedulePage,
  HomePage,
  LandingPage,
  LoginPage,
  ScheduleDetailPage,
  SettingsPage,
} from '@/pages'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import { path } from './path'
import AudioRecorderPage from '@/pages/AudioRecordPage'

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage isLanding />,
  },
  {
    path: path.login,
    element: (
      <DesktopLayout>
        <LoginPage />
      </DesktopLayout>
    ),
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
        path: path.createSchedule,
        element: <CreateSchedulePage />,
      },
      {
        path: path.scheduleDetail,
        element: <ScheduleDetailPage />,
      },
    ],
  },
  {
    path: path.settings,
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
    ],
  },
  {
    path: path.audioRecord,
    element: (
      <DesktopLayout>
        <Layout>
          <AudioRecorderPage />
        </Layout>
      </DesktopLayout>
    ),
  },
])

export default AppRouter
