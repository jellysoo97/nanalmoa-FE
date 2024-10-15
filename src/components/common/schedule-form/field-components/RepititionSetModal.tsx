import { RecurringOptionValue } from '@/types/schedules'
import Modal from '../../Modal'
import { TModal } from '@/types/common'
import { Controller, useFormContext } from 'react-hook-form'
import Divider from '../../Divider'
import 'react-datepicker/dist/react-datepicker.css'
import './react-datepicker.css'
import DatePicker from 'react-datepicker'
import React, { useState } from 'react'

type Props = {
  repeatType: RecurringOptionValue
  setSelected: (selected: string) => void
} & TModal

const CustomInput = React.forwardRef<
  HTMLDivElement,
  { value?: string; onClick?: () => void }
>(({ value, onClick }, ref) => (
  <div
    className="mt-1 flex cursor-pointer space-x-1"
    onClick={onClick}
    ref={ref}
  >
    <div className="w-28 rounded-lg bg-neutral-200 px-3 py-3 text-center text-xs text-neutral-700 sm:w-36 sm:py-2 sm:text-base">
      {value ? value.split(' ').slice(0, 3).join(' ') : '날짜 선택'}
    </div>
  </div>
))

const dateString = (repeatType: RecurringOptionValue): string => {
  switch (repeatType) {
    case 'daily':
      return '일'
    case 'weekly':
      return '주'
    case 'monthly':
      return '개월'
    case 'yearly':
      return '년'
    default:
      return ''
  }
}

const RepititionBottomComponent = ({
  repeatType,
  setSelected,
  onClose,
}: Props) => {
  const { register, control, setValue, watch } = useFormContext()

  const recurringInterval = watch('recurringInterval')

  return (
    <div className="pt-3">
      <div className="flex pb-3">
        <input
          className="h-7 w-14 rounded border bg-neutral-300 py-2 pl-4 pr-3 outline-none sm:h-10 sm:w-20 sm:w-24"
          type="number"
          min="1"
          step="1"
          {...register('recurringInterval', {
            min: {
              value: 1,
              message: '1 이상의 숫자를 입력해주세요.',
            },
            validate: (value) =>
              Number.isInteger(Number(value)) || '정수만 입력 가능합니다.',
          })}
        />
        <div className="pl-2 pt-2 text-sm sm:pl-3 sm:pt-3 sm:text-base">
          <span>{dateString(repeatType)}</span>
          <span> 간격으로 반복</span>
        </div>
      </div>

      <Divider />

      <div className="pt-3">
        <div className="flex justify-between">
          <label className="mb-1 block w-28 py-3 text-base font-medium text-neutral-700 sm:w-36">
            <span>반복 종료</span>
            <span className="hidden sm:inline"> 일자</span>
          </label>
          <Controller
            name="repeatEndDate"
            control={control}
            render={({ field }) => (
              <div className="relative w-60 text-right">
                <DatePicker
                  selected={field.value}
                  onChange={(date) => setValue('repeatEndDate', date)}
                  timeFormat="HH:mm"
                  timeCaption="시간"
                  locale="ko"
                  dateFormat={'yyyy. MM. dd.'}
                  customInput={<CustomInput />}
                  calendarClassName="custom-datepicker"
                />
              </div>
            )}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => {
            setSelected(`${recurringInterval}${dateString(repeatType)}간 반복`)
            onClose()
          }}
          className="rounded bg-primary-500 px-3 py-1 text-neutral-100"
        >
          설정 완료
        </button>
      </div>
    </div>
  )
}

const RepititionSetModal = ({ repeatType, onClose, setSelected }: Props) => {
  const [recurringSelected, setRecurringSelected] = useState<number[]>([])

  const toggleWeekday = (idx: number) => {
    if (setRecurringSelected) {
      setRecurringSelected((prev) =>
        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      )
    }
  }

  if (repeatType === 'none') {
    setSelected('없음')
    return null
  }

  if (repeatType === 'daily')
    return (
      <>
        <Modal onClose={onClose} title="일간 반복 설정">
          <div className="px-10 py-12">
            <RepititionBottomComponent
              repeatType={repeatType}
              setSelected={setSelected}
              onClose={onClose}
            />
          </div>
        </Modal>
      </>
    )

  if (repeatType === 'weekly')
    return (
      <>
        <Modal onClose={onClose} title="주간 반복 설정">
          <div className="p-4">
            <div className="flex flex-col">
              <div className="mx-auto text-sm sm:text-base">
                🍀 일정을 반복할 요일을 선택하세요
              </div>
              <div className="mx-auto my-3 flex gap-2">
                {['일', '월', '화', '수', '목', '금', '토'].map(
                  (weekday, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleWeekday(idx)}
                      className={`w-5 rounded py-1 text-center text-sm sm:w-7 sm:text-base ${
                        recurringSelected.includes(idx)
                          ? 'bg-primary-500 text-white'
                          : 'bg-neutral-300'
                      }`}
                    >
                      {weekday}
                    </button>
                  )
                )}
              </div>
            </div>

            <RepititionBottomComponent
              repeatType={repeatType}
              setSelected={setSelected}
              onClose={onClose}
            />
          </div>
        </Modal>
      </>
    )

  if (repeatType === 'monthly')
    return (
      <>
        <Modal onClose={onClose} title="월간 반복 설정">
          <div className="p-4">
            <RepititionBottomComponent
              repeatType={repeatType}
              setSelected={setSelected}
              onClose={onClose}
            />
          </div>
        </Modal>
      </>
    )

  if (repeatType === 'yearly')
    return (
      <>
        <Modal onClose={onClose} title="연간 반복 설정">
          <div className="p-4">
            <RepititionBottomComponent
              repeatType={repeatType}
              setSelected={setSelected}
              onClose={onClose}
            />
          </div>
        </Modal>
      </>
    )
}

export default RepititionSetModal
