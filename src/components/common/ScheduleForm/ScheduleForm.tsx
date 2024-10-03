import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import TextInputField from './FieldComponents/TextInputField'
import DateTimeField from './FieldComponents/DateTimeField'
import CategoryField from './FieldComponents/CategoryField'
import { useState } from 'react'
import DownArrowIcon from '@/components/icons/DownArrowIcon'
import { ISchedule } from '@/types/schedules'

type Props<T> = {
  defaultValue?: Partial<ISchedule>
  onSubmit?: (data: T) => void
}

// TODO: form background 색상 수정

const ScheduleForm = <T extends {}>({ defaultValue, onSubmit }: Props<T>) => {
  type FormData = Omit<Partial<T>, 'userId'>

  const getDefaultValues = () => {
    if (!defaultValue) return {}

    const { title, isAllDay, startDate, endDate, category } = defaultValue
    return {
      title,
      categoryId: category?.categoryId,
      isAllDay,
      startDate,
      endDate,
    }
  }

  const methods = useForm<FormData>({
    // TODO: Type 수정
    defaultValues: getDefaultValues(),
  })

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    const payload = {
      ...data,
      title: data.title ? data.title : '새로운 일정',
      userId: 1,
    } as T
    onSubmit(payload)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="p-10">
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
                placeholder="일정의 장소를 입력해주세요"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="mx-auto mt-5 block flex rounded bg-primary-500 px-4 py-2 text-white"
        >
          등록하기
        </button>
      </form>
    </FormProvider>
  )
}
export default ScheduleForm
