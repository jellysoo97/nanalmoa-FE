import { Controller, useFormContext } from 'react-hook-form'
import CategoryTag from '../../CategoryTag'
import { Categories, CategoryEnum } from '@/types/category'
import Select, { components } from 'react-select'

const CategoryField = () => {
  const { control } = useFormContext()

  const options = Object.keys(CategoryEnum).map((key, idx) => ({
    value: idx,
    label: key,
  }))

  return (
    <div className="mb-4 flex justify-between">
      <label
        htmlFor="categoryId"
        className="w-36 py-5 text-base font-bold text-gray-700"
      >
        카테고리
      </label>

      <div>
        <Controller
          name="categoryId"
          control={control}
          // rules={{ required: '카테고리를 선택해주세요!' }}
          render={({
            field: { onChange, value, ref, ...rest },
            fieldState: { error },
          }) => (
            <div className="flex-grow py-4">
              <Select
                {...rest}
                ref={ref}
                aria-label="카테고리 선택"
                options={options}
                value={options.find((option) => option.value === value)}
                onChange={(selectedOption) => onChange(selectedOption?.value)}
                placeholder="카테고리 선택"
                classNamePrefix="react-select"
                components={{
                  Option: ({ ...props }) => (
                    <components.Option {...props}>
                      <CategoryTag label={props.data.label as Categories} />
                    </components.Option>
                  ),
                  SingleValue: ({ data }) => (
                    <CategoryTag
                      label={data.label as Categories}
                      className="px-2 py-1 text-center"
                    />
                  ),
                }}
                styles={{
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
              {error && (
                <p className="mt-2 text-xs text-red-600">{error.message}</p>
              )}
            </div>
          )}
        />
      </div>
    </div>
  )
}

export default CategoryField
