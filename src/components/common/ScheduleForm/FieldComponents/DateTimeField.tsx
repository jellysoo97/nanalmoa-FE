import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useFormContext } from 'react-hook-form'
import BaseField from './BaseField'

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
      className="flex cursor-pointer items-center space-x-2"
      onClick={onClick}
      ref={ref}
    >
      <div className="w-36 rounded-lg bg-gray-100 px-3 py-2 text-center text-gray-700">
        {value ? value.split(' ').slice(0, 3).join(' ') : '날짜 선택'}
      </div>
      {!isAllDay && (
        <div className="w-28 rounded-lg bg-gray-100 px-3 py-2 text-center text-gray-700">
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
        <div className="max-w-sm bg-white pt-5">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-base">하루 종일</h2>
            <Controller
              name="isAllDay"
              control={control}
              render={({ field }) => (
                <label className="switch">
                  <input type="checkbox" {...field} checked={field.value} />
                  <span className="slider round"></span>
                </label>
              )}
            />
          </div>

          <div className="space-y-4">
            <div className="sm:flex sm:justify-between">
              <label className="mb-1 block py-3 text-sm font-medium text-gray-700">
                시작 날짜
              </label>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: '시작 날짜를 입력해주세요.' }}
                render={({ field, fieldState: { error } }) => (
                  <div>
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
                      timeIntervals={30}
                      dateFormat={
                        isAllDay ? 'yyyy. MM. dd.' : 'yyyy. MM. dd. aa h:mm'
                      }
                      customInput={<CustomInput />}
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

            <div className="sm:flex sm:justify-between">
              <label className="mb-1 block py-3 text-sm font-medium text-gray-700">
                종료 날짜
              </label>
              <Controller
                name="endDate"
                control={control}
                rules={{ required: '종료 날짜를 입력해주세요.' }}
                render={({ field, fieldState: { error } }) => (
                  <div>
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
                      timeIntervals={30}
                      dateFormat={
                        isAllDay ? 'yyyy. MM. dd.' : 'yyyy. MM. dd. aa h:mm'
                      }
                      customInput={<CustomInput />}
                      minDate={startDate}
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

          {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
        </div>
      )}
    />
  )
}

export default DateTimeField
