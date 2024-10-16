import React from 'react'
import { cn } from '@/utils/cn'

const ManagerIcon = ({ className, ...props }: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="64px"
      height="64px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-6 w-6 sm:h-8 sm:w-8', className)}
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
          d="M1 21h22V3H1zm1-1V7h20v13zM22 4v2H2V4zM9.355 13.16a2.5 2.5 0 1 0-3.71 0A2.496 2.496 0 0 0 4 15.5V18h7v-2.5a2.496 2.496 0 0 0-1.645-2.34zM7.5 10A1.5 1.5 0 1 1 6 11.5 1.502 1.502 0 0 1 7.5 10zm2.5 7H5v-1.5A1.502 1.502 0 0 1 6.5 14h2a1.502 1.502 0 0 1 1.5 1.5zm3-7h7v1h-7zm0 3h7v1h-7zm1 3h5v1h-5z"
        ></path>
        <path fill="none" d="M0 0h24v24H0z"></path>
      </g>
    </svg>
  )
}

export default ManagerIcon
