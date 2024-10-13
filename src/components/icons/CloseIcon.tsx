import { cn } from '@/utils/cn'

const CloseIcon = ({ className, ...props }: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="64px"
      height="64px"
      viewBox="0 0 24 24"
      fill="none"
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
        {' '}
        <rect width="24" height="24"></rect>{' '}
        <path
          d="M7 17L16.8995 7.10051"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
        <path
          d="M7 7.00001L16.8995 16.8995"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
      </g>
    </svg>
  )
}

export default CloseIcon
