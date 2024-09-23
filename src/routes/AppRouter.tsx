import { DesktopLayout, Layout } from '@/components/layout'
import {
  CreateSchedulePage,
  HomePage,
  LandingPage,
  LoginPage,
  ScheduleDetailPage,
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
        element: <CreateSchedulePage />,
      },
      {
        path: path.scheduleDetail,
        element: <ScheduleDetailPage />,
      },
    ],
  },
])

export default AppRouter
