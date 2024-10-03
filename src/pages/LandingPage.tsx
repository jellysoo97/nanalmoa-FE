import landingLogo from '@/assets/logo/landingLogo.svg'
import { useUser } from '@/hooks/use-user'
import { path } from '@/routes/path'
import { cn } from '@/utils/cn'

type Props = {
  isLanding?: boolean
}

const LandingPage = ({ isLanding = false }: Props) => {
  const { user, isUserLoading } = useUser(isLanding)

  if (isLanding && !isUserLoading) {
    setTimeout(() => {
      window.location.href = user.isLoggedIn ? path.schedules : path.login
    }, 2000)
  }

  return (
    <div
      className={cn([
        'container flex flex-col items-center justify-center gap-y-10',
        !isLanding && 'hidden lg:flex',
      ])}
    >
      <div className="relative">
        <div className="absolute -left-2 h-64 w-64 rounded-full bg-primary-300 blur-xl" />
        <div className="absolute left-16 top-20 h-28 w-28 rounded-full bg-white blur-lg" />
        <img
          src={landingLogo}
          alt="Landing Logo"
          width={240}
          height={240}
          className="relative -left-2"
        />
      </div>
      <h3 className="relative text-neutral-700">
        시니어를 위한 일정 관리 서비스
      </h3>
    </div>
  )
}

export default LandingPage
