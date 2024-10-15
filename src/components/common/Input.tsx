import { cn } from '@/utils/cn'
import React, { forwardRef } from 'react'

type Props = {
  label?: string
  direction?: 'horizontal' | 'vertical'
  errorMessage?: string
} & React.ComponentProps<'input'>

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      direction = 'vertical',
      errorMessage,
      required,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          'w-full',
          direction === 'horizontal' && 'flex items-center gap-x-3',
          direction === 'vertical' && 'flex flex-col gap-y-2'
        )}
      >
        {label && (
          <label className="inline-block min-w-40 text-left text-neutral-600">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              'w-full rounded-md border border-neutral-300 px-3 py-2',
              className
            )}
            {...props}
          />
          {!!errorMessage && (
            <p className="absolute -bottom-5 text-xs text-red-500">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
