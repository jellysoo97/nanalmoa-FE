import { FieldError } from 'react-hook-form'

interface FormFieldProps {
  id: string
  label: string
  error?: FieldError
  renderInput: () => React.ReactNode
}

const BaseField = ({ id, label, error, renderInput }: FormFieldProps) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="mb-2 block text-base font-bold text-gray-700"
      >
        {label}
      </label>
      {renderInput()}
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  )
}

export default BaseField
