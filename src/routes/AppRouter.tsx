import { DesktopLayout, Layout } from '@/components/layout'
import {
  HomePage,
  LandingPage,
  LoginPage,
  ScheduleDetailPage,
  SettingsPage,
  DateCreatePage,
  AudioAboutPage,
  AudioCreatePage,
  PhotoCreatePage,
} from '@/pages'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import { path } from './path'

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
        children: [
          {
            path: path.DateCreate,
            element: <DateCreatePage />,
          },
          {
            path: path.AudioAbout,
            element: <AudioAboutPage />,
          },
          {
            path: path.AudioCreate,
            element: <AudioCreatePage />,
          },
          {
            path: path.PhotoCreate,
            element: <PhotoCreatePage />,
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
])

export default AppRouter
