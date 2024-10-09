import React, { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { Controller, useFormContext } from 'react-hook-form'
import BaseField from './BaseField'
import { ko } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import './react-datepicker.css'

registerLocale('ko', ko)

const DateTimeField = () => {
  const { watch, control, setValue } = useFormContext()

  const isAllDay = watch('isAllDay')
  const startDate = watch('startDate')
  const endDate = watch('endDate')

  const [error, setError] = useState<string | null>(null)

  const CustomInput = React.forwardRef<
    HTMLDivElement,
    { value?: string; onClick?: () => void }
  >(({ value, onClick }, ref) => (
    <div
      className="mt-1 flex cursor-pointer space-x-1"
      onClick={onClick}
      ref={ref}
    >
      <div className="w-28 sm:w-36 rounded-lg bg-gray-200 px-3 py-3 text-center text-xs text-gray-700 sm:py-2 sm:text-base">
        {value ? value.split(' ').slice(0, 3).join(' ') : '날짜 선택'}
      </div>
      {!isAllDay && (
        <div className="w-24 sm:w-28 rounded-lg bg-gray-200 px-3 py-3 text-center text-xs text-gray-700 sm:py-2 sm:text-base">
          {value ? value.split(' ').slice(3, 5).join(' ') : '시간 선택'}
        </div>
      )}
    </div>
  ))

  const validateEndDate = (endDate: Date | null, startDate: Date | null) => {
    if (startDate && endDate && endDate < startDate) {
      setError('종료 시간은 시작 시간보다 늦어야 합니다.')
      return false
    }
    setError(null)
    return true
  }

  return (
    <BaseField
      id="date"
      label="날짜와 시간"
      renderInput={() => (
        <div className="pt-5">
          <div className="mb-6 flex justify-between">
            <h2 className="text-sm sm:text-base">하루 종일</h2>
            <Controller
              name="isAllDay"
              control={control}
              render={({ field }) => (
                <label className="switch">
                  {/* TODO: checkbox -> toggle로 수정 예정 */}
                  <input type="checkbox" {...field} checked={field.value} />
                  <span className="slider round"></span>
                </label>
              )}
            />
          </div>

          {error && (
            <div className="mb-4 mt-4 text-xs text-red-500 sm:text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="mb-1 block w-7 py-3 text-sm text-xs font-medium text-gray-700 sm:w-20 sm:text-base">
                <span>시작</span>
                <span className="hidden sm:inline"> 일자</span>
              </label>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: '시작 날짜를 입력해주세요.' }}
                render={({ field, fieldState: { error } }) => (
                  <div className="relative w-60 text-right">
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => {
                        if (endDate) {
                          if (validateEndDate(endDate, date)) {
                            field.onChange(date)
                          }
                        } else {
                          field.onChange(date)
                        }
                      }}
                      showTimeSelect={!isAllDay}
                      timeFormat="HH:mm"
                      timeCaption="시간"
                      locale="ko"
                      timeIntervals={10}
                      dateFormat={
                        isAllDay ? 'yyyy. MM. dd.' : 'yyyy. MM. dd. aa h:mm'
                      }
                      customInput={<CustomInput />}
                      calendarClassName="custom-datepicker"
                    />
                    {error && (
                      <p className="mt-1 text-sm text-red-500 sm:text-right">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="flex justify-between">
              <label className="mb-1 block w-7 py-3 text-xs font-medium text-gray-700 sm:w-20 sm:text-base">
                <span>종료</span>
                <span className="hidden sm:inline"> 일자</span>
              </label>
              <Controller
                name="endDate"
                control={control}
                rules={{ required: '종료 날짜를 입력해주세요.' }}
                render={({ field, fieldState: { error } }) => (
                  <div className="relative w-60 text-right">
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => {
                        if (validateEndDate(date, startDate)) {
                          field.onChange(date)
                        } else {
                          setValue('endDate', field.value)
                        }
                      }}
                      showTimeSelect={!isAllDay}
                      timeFormat="HH:mm"
                      timeCaption="시간"
                      locale="ko"
                      timeIntervals={10}
                      dateFormat={
                        isAllDay ? 'yyyy. MM. dd.' : 'yyyy. MM. dd. aa h:mm'
                      }
                      customInput={<CustomInput />}
                      minDate={startDate}
                      calendarClassName="custom-datepicker"
                    />
                    {error && (
                      <p className="mt-1 text-sm text-red-500 sm:text-right">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      )}
    />
  )
}

export default DateTimeField
