import event from '@/assets/imgs/event.png'
import { Link } from 'react-router-dom'
import { path } from '@/routes/path'
import { Button } from '@/components/common'

const SuccessPostAudio = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-6">
      <img src={event} alt="event" />
      <p className="text-lg font-bold">일정 등록에 성공했습니다!</p>
      <Link to={path.schedules}>
        <Button text="일정 확인하러 가기" className="px-5 py-3" />
      </Link>
    </div>
  )
}

export default SuccessPostAudio
