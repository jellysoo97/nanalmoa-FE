import { useFormContext } from 'react-hook-form'
import BaseField from './BaseField'

type Prop = {
  id: string
  label: string
  placeholder: string
}

const TextAreaField = ({ id, label, placeholder }: Prop) => {
  const { register } = useFormContext()

  return (
    <BaseField
      id={id}
      label={label}
      renderInput={() => (
        <div className="w-full rounded border-2 border-neutral-300 p-3">
          <textarea
            id={id}
            {...register(id)}
            placeholder={placeholder}
            className="h-20 w-full resize-none bg-transparent focus:outline-none"
          ></textarea>
        </div>
      )}
    />
  )
}

export default TextAreaField
