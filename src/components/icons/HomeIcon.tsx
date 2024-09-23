import { cn } from '@/utils/cn'

const HomeIcon = ({ className, ...props }: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="64px"
      height="64px"
      viewBox="0 0 32 32"
      enable-background="new 0 0 32 32"
      id="Editable-line"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={cn('h-8 w-8', className)}
      {...props}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d=" M27,29H5V17H3.235c-1.138,0-1.669-1.419-0.812-2.168L14.131,3.745c1.048-0.993,2.689-0.993,3.737,0l11.707,11.087 C30.433,15.58,29.902,17,28.763,17H27V29z"
          fill="none"
          id="XMLID_1_"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
        ></path>
        <path
          d=" M20,29h-8v-6c0-2.209,1.791-4,4-4h0c2.209,0,4,1.791,4,4V29z"
          fill="none"
          id="XMLID_2_"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
        ></path>
      </g>
    </svg>
  )
}

export default HomeIcon
