import { path } from '@/routes/path'
import { Link } from 'react-router-dom'

const SettingsPage = () => {
  return (
    <div className="w-full px-5">
      <Link to={path.settings.mypage} className="mt-4 block border-b-2 py-4">
        <p className="ml-3">나의 정보 보기</p>
      </Link>
      <Link
        to={path.settings.alarmPermission}
        className="block border-b-2 py-4"
      >
        <p className="ml-3">알림권한</p>
      </Link>
      <Link to={path.settings.activityTime} className="block border-b-2 py-4">
        <p className="ml-3">활동시간</p>
      </Link>
      <Link to={path.settings.group} className="block border-b-2 py-4">
        <p className="ml-3">그룹 관리</p>
      </Link>
      <Link to={path.settings.manager} className="block border-b-2 py-4">
        <p className="ml-3">관리자 관리</p>
      </Link>
    </div>
  )
}

export default SettingsPage
