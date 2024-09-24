import { cn } from '@/utils/cn'
import React from 'react'

type Props = {
  direction: 'horizontal' | 'vertical'
  icon: string | React.ReactNode
  text?: string
} & React.ComponentProps<'button'>

const IconButton = ({
  direction,
  icon,
  text = '',
  className,
  ...props
}: Props) => {
  return (
    <button
      className={cn(
        direction === 'horizontal'
          ? 'flex items-center'
          : 'flex flex-col items-center',
        'text-neutral-700',
        className
      )}
      {...props}
    >
      {typeof icon === 'string' ? <img src={icon} alt="icon" /> : <>{icon}</>}
      <span className={cn(!className && 'text-sm')}>{text}</span>
    </button>
  )
}

export default IconButton
