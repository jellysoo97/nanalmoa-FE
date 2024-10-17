import { FieldError } from 'react-hook-form'

interface FormFieldProps {
  id: string
  label: string
  length?: number
  error?: FieldError
  renderInput: () => React.ReactNode
}

const TEXT_MAX_LENGTH = 240

const BaseField = ({
  id,
  label,
  length,
  error,
  renderInput,
}: FormFieldProps) => {
  const hasLength = typeof length === 'number'

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div
          id={id}
          className="mb-2 block text-base font-bold text-neutral-700"
        >
          {label}
        </div>
        {hasLength && (
          <p className="text-xs text-neutral-500">
            {length} / {TEXT_MAX_LENGTH}
          </p>
        )}
      </div>

      {renderInput()}
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  )
}

export default BaseField
