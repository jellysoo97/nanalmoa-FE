import { cn } from '@/utils/cn'
import { LoadingSpinner } from '.'

type Props = {
  theme?: 'outline' | 'solid'
  text: string
  isLoading?: boolean
} & React.ComponentProps<'button'>

const Button = ({
  type,
  theme = 'solid',
  className,
  text,
  disabled,
  isLoading,
  ...props
}: Props) => {
  return (
    <button
      type={type || 'button'}
      className={cn(
        'flex items-center justify-center text-nowrap rounded-md px-3 py-2',
        theme === 'outline'
          ? 'border border-primary-base bg-white text-primary-base'
          : 'bg-primary-base text-white',
        disabled &&
          theme === 'outline' &&
          'border border-neutral-400 bg-white text-neutral-400',
        disabled && theme === 'solid' && 'bg-neutral-400 text-white',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {isLoading ? <LoadingSpinner className="h-5 w-5" /> : text}
    </button>
  )
}

export default Button
