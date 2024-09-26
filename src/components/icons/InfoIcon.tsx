import { cn } from '@/utils/cn'

const InfoIcon = ({ className, ...props }: React.ComponentProps<'svg'>) => {
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
        <rect width="24" height="24" fill="white"></rect>{' '}
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></circle>{' '}
        <path
          d="M12 11V17"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
        <path
          d="M11.75 8V7H12.25V8H11.75Z"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
      </g>
    </svg>
  )
}

export default InfoIcon
