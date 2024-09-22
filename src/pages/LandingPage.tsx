import { cn } from '@/utils/cn'

type Props = {
  isLanding?: boolean
}

const LandingPage = ({ isLanding = false }: Props) => {
  return (
    <div
      className={cn([
        'container bg-primary-50',
        !isLanding && 'hidden lg:block',
      ])}
    >
      나날모아 랜딩페이지
    </div>
  )
}

export default LandingPage
