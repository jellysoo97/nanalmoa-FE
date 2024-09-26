import React from 'react'

import { cn } from '@/utils/cn'

type Props = {
  direction?: 'horizontal' | 'vertical'
} & React.ComponentProps<'div'>

const Divider = ({ direction = 'horizontal', className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={cn(
        'bg-neutral-200',
        direction === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
    />
  )
}

export default Divider
