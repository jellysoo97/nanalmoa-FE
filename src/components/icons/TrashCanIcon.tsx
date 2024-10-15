import { cn } from '@/utils/cn'
import React from 'react'

const TrashCanIcon = ({ className, ...props }: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="64px"
      height="42px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
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
          d="M18.87 6h1.007l-.988 16.015A1.051 1.051 0 0 1 17.84 23H6.158a1.052 1.052 0 0 1-1.048-.984v-.001L4.123 6h1.003l.982 15.953a.05.05 0 0 0 .05.047h11.683zM9.5 19a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-1 0v10a.5.5 0 0 0 .5.5zm5 0a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-1 0v10a.5.5 0 0 0 .5.5zM5.064 5H3V4h5v-.75A1.251 1.251 0 0 1 9.25 2h5.5A1.251 1.251 0 0 1 16 3.25V4h5v1H5.064zM9 4h6v-.75a.25.25 0 0 0-.25-.25h-5.5a.25.25 0 0 0-.25.25z"
        ></path>
        <path fill="none" d="M0 0h24v24H0z"></path>
      </g>
    </svg>
  )
}

export default TrashCanIcon
