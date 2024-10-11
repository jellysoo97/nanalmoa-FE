import error from '@/assets/imgs/error.png'
import { Button } from '@/components/common'
import { useModal } from '@/hooks/use-modal'
import { CreateScheduleStepEnum } from '@/types/common'
import SelectMethodModal from '../SelectMethodModal'

type FailProps = {
  moveStep: (step: CreateScheduleStepEnum) => void
}

const FailAudio = ({ moveStep }: FailProps) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  return (
    <>
      <div className="flex flex-col items-center gap-y-10">
        <img src={error} alt="error" width={128} height={128} />

        <div className="flex flex-col items-center gap-y-6">
          <p className="text-center text-lg font-bold">
            음성 분석에 실패하였습니다.
          </p>
          <div className="flex w-full flex-col gap-y-4">
            <Button
              theme="outline"
              text="다시 녹음하기"
              className="border-none bg-orange-200 text-neutral-700"
              onClick={() => moveStep(CreateScheduleStepEnum.UploadMedia)}
            />
            <Button
              theme="solid"
              text="다른 방법 선택하기"
              className="border-none bg-primary-coral text-neutral-700"
              onClick={openModal}
            />
          </div>
        </div>
        {/* <div className="-mt-10 flex flex-col items-center justify-center pb-5">
          <p className="-mt-2 mb-3 text-xl">음성 분석에 실패하였습니다.</p>
          <div className="flex h-52 w-full flex-col items-center justify-between pt-5">
            <div>
              <p>다시 음성으로 등록하여 볼까요?</p>
              <div
                className="mx-auto mb-2 flex h-12 w-48 items-center rounded bg-primary-coral"
                onClick={() => moveStep(CreateScheduleStepEnum.UploadMedia)}
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
          className="mx-auto mb-8 mt-auto w-1/2 rounded bg-neutral-300 p-2 font-semibold"
        >
          <IconButton
            direction="horizontal"
            icon={<HomeIcon />}
            text="처음으로"
            className="mx-auto gap-x-1"
          />
        </Link> */}
      </div>
      {isModalOpen && <SelectMethodModal onClose={closeModal} />}
    </>
  )
}

export default FailAudio
