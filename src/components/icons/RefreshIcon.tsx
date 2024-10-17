import React from 'react'
import { cn } from '@/utils/cn'

const RefreshIcon = ({ className, ...props }: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="64px"
      height="64px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-5 w-5', className)}
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="currentColor"
          d="M22.719 12A10.719 10.719 0 0 1 1.28 12h.838a9.916 9.916 0 1 0 1.373-5H8v1H2V2h1v4.2A10.71 10.71 0 0 1 22.719 12z"
        ></path>
        <path fill="none" d="M0 0h24v24H0z"></path>
      </g>
    </svg>
  )
}

export default RefreshIcon
