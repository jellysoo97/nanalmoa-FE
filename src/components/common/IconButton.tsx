import { cn } from '@/utils/cn'
import React from 'react'

type Props = {
  direction: 'horizontal' | 'vertical'
  icon: string | React.ReactNode
  text?: string
  isIconFront?: boolean
} & React.ComponentProps<'button'>

const IconButton = ({
  direction,
  icon,
  text = '',
  className,
  disabled,
  isIconFront = true,
  ...props
}: Props) => {
  return (
    <button
      className={cn(
        direction === 'horizontal'
          ? 'flex items-center'
          : 'flex flex-col items-center',
        'text-neutral-700',
        className,
        disabled && 'bg-neutral-400 text-white'
      )}
      {...props}
    >
      {isIconFront && (
        <>
          {typeof icon === 'string' ? (
            <img src={icon} alt="icon" />
          ) : (
            <>{icon}</>
          )}
          <span className={cn(!className && 'text-sm', 'text-nowrap')}>
            {text}
          </span>
        </>
      )}
      {!isIconFront && (
        <>
          <span className={cn(!className && 'text-sm', 'text-nowrap')}>
            {text}
          </span>
          {typeof icon === 'string' ? (
            <img src={icon} alt="icon" />
          ) : (
            <>{icon}</>
          )}
        </>
      )}
    </button>
  )
}

export default IconButton
