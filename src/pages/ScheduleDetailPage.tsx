import PrevIcon from '@/components/icons/PrevIcon'
import { path } from '@/routes/path'
import { Link } from 'react-router-dom'

const ScheduleDetailPage = () => {
  return (
    <>
      <div className="flex justify-between px-3 py-2">
        <Link
          to={path.schedules}
          className="w-25 flex rounded border-gray-700 px-3 py-2"
        >
          <PrevIcon color="#000000" className="mt-1 h-5" />
          <div className="text-base text-gray-600 hover:text-gray-900">
            돌아가기
          </div>
        </Link>

        <div className="flex p-2 text-base">
          <button>
            <div>수정</div>
          </button>

          <button>
            <div>삭제</div>
          </button>
        </div>
      </div>
    </>
  )
}

export default ScheduleDetailPage
