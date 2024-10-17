import camera from '@/assets/imgs/camera.png'
import { Button } from '@/components/common'

type Props = {
  title: string
  description?: React.ReactNode
  leftButtonText: string
  rightButtonText: string
  hasImage?: boolean
  leftButtonCallback: () => void
  rightButtonCallback: () => void
}

const SelectOptions = ({
  title,
  description,
  leftButtonText,
  rightButtonText,
  hasImage,
  leftButtonCallback,
  rightButtonCallback,
}: Props) => {
  return (
    <>
      {hasImage && (
        <div className="relative">
          <div className="absolute -left-2 h-32 w-32 rounded-full bg-violet-300 blur-xl" />
          <div className="bg-white-400 absolute left-4 top-4 h-20 w-20 rounded-full blur-lg" />
          <img
            src={camera}
            alt="camera"
            width={128}
            height={128}
            className="relative"
          />
        </div>
      )}

      <div className="flex flex-col gap-y-4">
        <p className="mb-2 whitespace-pre-wrap text-center text-lg font-bold">
          {title}
        </p>
        {description && description}
        <div className="flex flex-col gap-y-4">
          <Button
            text={leftButtonText}
            theme="solid"
            className="py-2 sm:py-3"
            onClick={leftButtonCallback}
          />
          <Button
            text={rightButtonText}
            theme="outline"
            className="py-2 sm:py-3"
            onClick={rightButtonCallback}
          />
        </div>
      </div>
    </>
  )
}

export default SelectOptions
