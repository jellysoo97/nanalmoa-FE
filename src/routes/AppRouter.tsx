import { DesktopLayout, Layout } from '@/components/layout'
import {
  HomePage,
  LandingPage,
  LoginPage,
  ScheduleDetailPage,
  SettingsPage,
  DateCreate,
  AudioAbout,
  AudioCreate,
  PhotoAbout,
  PhotoCreate,
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
            element: <DateCreate />,
          },
          {
            path: path.AudioAbout,
            element: <AudioAbout />,
          },
          {
            path: path.AudioCreate,
            element: <AudioCreate />,
          },
          {
            path: path.PhotoAbout,
            element: <PhotoAbout />,
          },
          {
            path: path.PhotoCreate,
            element: <PhotoCreate />,
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
