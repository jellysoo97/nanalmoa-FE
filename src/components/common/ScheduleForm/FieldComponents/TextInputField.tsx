import { FieldError, useFormContext } from 'react-hook-form'
import BaseField from './BaseField'

type Props = {
  id: string
  label: string
  placeholder: string
  ruleMessage?: string
  default?: string
}

const TextInputField = ({
  id,
  label,
  placeholder,
  ruleMessage,
  default: defaultValue,
}: Props) => {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext()

  const watchId = watch(id)

  const registerOptions = {
    maxLength: { value: 240, message: '240자를 초과할 수 없습니다.' },
    ...(ruleMessage ? { required: ruleMessage } : {}),
  }

  return (
    <BaseField
      id={id}
      label={label}
      error={errors[id] as FieldError}
      renderInput={() => (
        <div className="flex w-full">
          <input
            id={id}
            type="text"
            placeholder={placeholder}
            {...(defaultValue !== undefined ? { defaultValue } : {})}
            {...register(id, registerOptions)}
            className="animate-border focus:shadow-outline w-3/4 w-full appearance-none border-b-2 border-gray-300 bg-transparent px-3 py-2 leading-tight text-gray-700 transition-colors duration-300 ease-in-out focus:border-green-800 focus:outline-none"
          />
          <p className="mt-1 w-1/5 text-right text-xs text-gray-500">
            {watchId?.length ?? 0}/240
          </p>
        </div>
      )}
    />
  )
}

export default TextInputField
