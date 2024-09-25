import PrevIcon from '@/components/icons/PrevIcon'

const ScheduleDetailPage = () => {
  return (
    <>
      <div>
        <button>
          <PrevIcon color="#000000" />
          <span>돌아가기</span>
        </button>

        <div>
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
