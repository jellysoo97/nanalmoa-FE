import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import TextInputField from './FieldComponents/TextInputField'
import DateTimeField from './FieldComponents/DateTimeField'
import CategoryField from './FieldComponents/CategoryField'
import { useCallback, useEffect, useState } from 'react'
import DownArrowIcon from '@/components/icons/DownArrowIcon'
import { ISchedule, IScheduleForm } from '@/types/schedules'
import TextAreaField from './FieldComponents/TextAreaField'
import GroupField from './FieldComponents/GroupField'
import RepetitionField from './FieldComponents/RepetitionField'

type Props = {
  defaultValue?: Partial<ISchedule>
  onSubmit: (data: IScheduleForm) => void
  buttonMessage?: string
}

// TODO: form background 색상 수정
const ScheduleForm = ({
  defaultValue,
  onSubmit,
  buttonMessage = '등록하기',
}: Props) => {
  const getDefaultValues = useCallback(() => {
    if (!defaultValue) return {}

    const { title, isAllDay, startDate, endDate, category, memo } = defaultValue
    return {
      title,
      categoryId: category?.categoryId,
      isAllDay,
      startDate: new Date(startDate!),
      endDate: new Date(endDate!),
      memo,
    }
  }, [defaultValue])

  const methods = useForm<IScheduleForm>({
    defaultValues: getDefaultValues(),
  })

  const { reset } = methods

  useEffect(() => {
    reset(getDefaultValues())
  }, [defaultValue, reset, getDefaultValues])

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleFormSubmit: SubmitHandler<IScheduleForm> = async (
    data: IScheduleForm
  ) => {
    const payload = {
      ...data,
      title: data.title ? data.title : '새로운 일정',
    } as IScheduleForm

    onSubmit(payload)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="px-10 pb-10 pt-5"
      >
        <TextInputField
          id="title"
          label="일정 제목"
          placeholder="일정 제목을 입력해주세요"
        />
        <DateTimeField />
        <CategoryField />

        <div className="rounded border-b border-gray-200 pb-3">
          <button
            className="flex w-full items-center justify-between pt-4 text-left"
            type="button"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            <span className="font-medium">+ 상세 설정 추가</span>
            <DownArrowIcon
              className={`h-5 w-5 transition-transform duration-200 ${
                isOpen ? 'rotate-180 transform' : ''
              }`}
            />
          </button>

          {isOpen && (
            <div className="py-6">
              <TextInputField
                id="place"
                label="장소"
                placeholder="장소를 입력해주세요"
              />

              <GroupField />
              <RepetitionField />

              <TextAreaField
                id="memo"
                label="메모"
                placeholder="자유롭게 작성해주세요"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="mx-auto mt-5 block flex rounded bg-primary-500 px-4 py-2 text-white"
        >
          {buttonMessage}
        </button>
      </form>
    </FormProvider>
  )
}
export default ScheduleForm
