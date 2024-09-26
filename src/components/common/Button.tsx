import { cn } from '@/utils/cn'

type Props = {
  theme?: 'outline' | 'solid'
  text: string
} & React.ComponentProps<'button'>

const Button = ({ theme = 'solid', className, text, ...props }: Props) => {
  return (
    <button
      className={cn(
        'flex items-center justify-center rounded-md px-2 py-1',
        theme === 'outline'
          ? 'border border-primary-base bg-white text-primary-base'
          : 'bg-primary-base text-white',
        className
      )}
      {...props}
    >
      {text}
    </button>
  )
}

export default Button
