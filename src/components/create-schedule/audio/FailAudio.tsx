import { IconButton } from '@/components/common'
import FailFace from '@/assets/imgs/FailFace.png'
import { HomeIcon, InfoIcon } from '@/components/icons'
import { Link } from 'react-router-dom'
import { path } from '@/routes/path'
import { useModal } from '@/hooks/use-modal'
import SelectMethodModal from '../SelectMethodModal'

const FailAudio = () => {
  const { isModalOpen, openModal, closeModal } = useModal()
  return (
    <>
      <div className="flex h-full flex-col p-5">
        <div className="ml-auto flex h-10 items-center text-red-500">
          <InfoIcon />
          <p>도움말</p>
        </div>
        <div className="mt-3 flex justify-evenly">
          <div className="flex flex-col items-center justify-center">
            <div className="mx-auto my-1 flex h-7 w-7 items-center justify-center rounded-full bg-gray-400 font-bold text-white">
              <p className="mt-1">1</p>
            </div>
            등록안내
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="mx-auto my-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary-base font-bold text-white">
              <p className="mt-1">2</p>
            </div>
            음성등록
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="mx-auto my-1 flex h-7 w-7 items-center justify-center rounded-full bg-gray-400 font-bold text-white">
              <p className="mt-1">3</p>
            </div>
            등록완료
          </div>
        </div>
        <div className="-mt-10 flex flex-col items-center justify-center pb-5">
          <img
            src={FailFace}
            alt="FailFace"
            className="relative mx-auto mb-5 mt-10 w-1/3"
            width={240}
            height={240}
          />
          <p className="-mt-2 mb-3 text-xl">음성 분석에 실패하였습니다.</p>
          <div className="flex h-52 w-full flex-col items-center justify-between pt-5">
            <div>
              <p>다시 음성으로 등록하여 볼까요?</p>
              <div
                className="mx-auto mb-2 flex h-12 w-48 items-center rounded bg-primary-coral"
                onClick={() => window.location.reload()}
              >
                <p className="mx-auto text-lg">다시 녹음하기</p>
              </div>
            </div>
            <div>
              <p>다른 방법으로 등록할까요?</p>
              <div
                onClick={openModal}
                className="mx-auto mb-2 flex h-12 w-48 cursor-pointer items-center rounded bg-orange-200"
              >
                <p className="mx-auto text-lg">다른 방법 선택</p>
              </div>
            </div>
          </div>
        </div>
        <Link
          to={path.schedules}
          className="mx-auto mb-8 mt-auto w-1/3 rounded bg-gray-300 p-2 font-semibold"
        >
          <IconButton
            direction="horizontal"
            icon={<HomeIcon />}
            text="처음으로"
            className="mx-auto gap-x-1"
          />
        </Link>
      </div>
      ß{isModalOpen && <SelectMethodModal onClose={closeModal} />}
    </>
  )
}

export default FailAudio
