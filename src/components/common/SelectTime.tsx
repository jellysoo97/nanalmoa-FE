type Props = {
  period: string
  hour: string
  minute: string
  onPeriodChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onHourChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onMinuteChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const formatToTwoDigits = (value: string) => {
  return value.length === 1 ? `0${value}` : value
}
const SelectTime = ({
  period,
  hour,
  minute,
  onPeriodChange,
  onHourChange,
  onMinuteChange,
}: Props) => {
  return (
    <div className="flex items-center">
      <select
        value={period}
        onChange={onPeriodChange}
        className="mr-2 w-1/3 rounded-md border border-neutral-300 p-2"
      >
        <option value="오전">오전</option>
        <option value="오후">오후</option>
      </select>
      <input
        type="number"
        min="1"
        max="12"
        value={hour}
        onChange={onHourChange}
        onBlur={(e) =>
          onHourChange({
            target: { value: formatToTwoDigits(e.target.value) },
          } as React.ChangeEvent<HTMLInputElement>)
        }
        className="block w-[20%] rounded-md border border-neutral-300 p-2"
        placeholder="00"
      />
      <span className="mx-2">시</span>
      <input
        type="number"
        min="0"
        max="59"
        value={minute}
        onChange={onMinuteChange}
        onBlur={(e) =>
          onMinuteChange({
            target: { value: formatToTwoDigits(e.target.value) },
          } as React.ChangeEvent<HTMLInputElement>)
        }
        className="block w-[20%] rounded-md border border-neutral-300 p-2"
        placeholder="00"
      />
      <span className="mx-2">분</span>
    </div>
  )
}

export default SelectTime
