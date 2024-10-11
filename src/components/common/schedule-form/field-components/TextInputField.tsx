import { FieldError, useFormContext } from 'react-hook-form'
import BaseField from './BaseField'
import { Input } from '../..'
import { cn } from '@/utils/cn'

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
      length={watchId?.length || 0}
      error={errors[id] as FieldError}
      renderInput={() => (
        <div className="flex w-full">
          <Input
            id={id}
            type="text"
            placeholder={placeholder}
            {...(defaultValue !== undefined ? { defaultValue } : {})}
            {...register(id, registerOptions)}
            className={cn(
              'animate-border focus:shadow-outline appearance-none border-neutral-300 leading-tight',
              'text-neutral-700 transition-colors duration-300 ease-in-out focus:border-green-800 focus:outline-none'
            )}
          />
        </div>
      )}
    />
  )
}

export default TextInputField
