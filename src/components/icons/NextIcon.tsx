import { cn } from '@/utils/cn'

const NextIcon = ({ className, ...props }: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="54px"
      height="54px"
      viewBox="0 0 1024 1024"
      className={cn('h-6 w-6', className)}
      {...props}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M364.8 106.666667L298.666667 172.8 637.866667 512 298.666667 851.2l66.133333 66.133333L768 512z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  )
}

export default NextIcon
