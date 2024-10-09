import Select, { components } from 'react-select'
import BaseField from './BaseField'
import { useState } from 'react'
import { useModal } from '@/hooks/use-modal'
import RepititionSetModal from '@/components/create-schedule/RepititionSetModal'

const options = [
  {
    value: 0,
    label: '없음',
    setting: '없음',
  },
  {
    value: 1,
    label: '매일',
    setting: '매일 14회 동안',
  },
  {
    value: 2,
    label: '매주',
    setting: '매주 3달 동안',
  },
  {
    value: 3,
    label: '매월',
    setting: '매월 1년 동안',
  },
  {
    value: 4,
    label: '매년',
    setting: '매년 6년 동안',
  },
  {
    value: 5,
    label: '자세한 설정',
    setting: '자세한 설정',
  },
]

const CustomPlaceholder = () => (
  <div>
    <span className="hidden sm:inline">반복</span>
    <span> 선택</span>
  </div>
)

const RepetitionField = () => {
  const { isModalOpen, openModal, closeModal } = useModal()

  const [selected, setSelected] = useState<string>('없음')

  return (
    <>
      <BaseField
        id="repitition"
        label="반복"
        renderInput={() => (
          <div className="flex-growd">
            <Select
              aria-label="반복 선택"
              options={options}
              placeholder={<CustomPlaceholder />}
              classNamePrefix="react-select"
              className="select-placeholder"
              menuPlacement="auto"
              menuPosition="fixed"
              components={{
                Option: ({ ...props }) => (
                  <components.Option {...props}>
                    {props.data.label !== '자세한 설정' && (
                      <div onClick={() => setSelected(props.data.setting)}>
                        {props.data.label}
                      </div>
                    )}
                    {props.data.label === '자세한 설정' && (
                      <div onClick={openModal}>{props.data.label}</div>
                    )}
                  </components.Option>
                ),
                SingleValue: () => (
                  <div className="px-2 py-1 text-center sm:text-sm">
                    {selected}
                  </div>
                ),
              }}
              styles={{
                placeholder: (base) => ({
                  ...base,
                  fontSize: 'inherit',
                  lineHeight: 'inherit',
                }),
                control: (base) => ({
                  ...base,
                  height: '36px',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  boxShadow: 'none',
                  width: 'auto',
                  minWidth: '120px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  '&:hover': {
                    borderColor: '#9ca3af',
                  },
                }),
                valueContainer: (base) => ({
                  ...base,
                  padding: '0 8px',
                  display: 'flex',
                }),
                singleValue: (base) => ({
                  ...base,
                  margin: '0',
                }),
                input: (base) => ({
                  ...base,
                  margin: '0',
                  padding: '0',
                  caretColor: 'transparent',
                }),
                indicatorSeparator: () => ({
                  display: 'none',
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  padding: '4px',
                }),
                option: (base) => ({
                  ...base,
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  },
                }),
              }}
            />
          </div>
        )}
      />

      {isModalOpen && <RepititionSetModal onClose={closeModal} />}
    </>
  )
}

export default RepetitionField
