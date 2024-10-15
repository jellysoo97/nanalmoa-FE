import { useRouteError } from 'react-router-dom'
import errorImg from '@/assets/imgs/error.png'

const NotFoundPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError()

  console.error(error)

  return (
    <div className="container flex flex-col items-center justify-center gap-y-10 px-6 py-2 sm:px-12">
      <img src={errorImg} alt="error" width={128} height={128} />
      <div className="flex flex-col items-center gap-y-4">
        <h2 className="text-xl font-bold">에러가 발생했습니다.</h2>
        <h2 className="text-lg font-semibold">status: {error?.status}</h2>
      </div>
    </div>
  )
}

export default NotFoundPage
