import { cn } from '@/shared/lib/utils'
import * as React from 'react'

const Input: React.FC<
	{
		ref?: React.Ref<HTMLInputElement>
	} & React.InputHTMLAttributes<HTMLInputElement>
> = ({ type, className, ref, ...props }) => {
	return (
		<input
			className={cn(
				'flex h-10 w-full rounded border border-border bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			ref={ref}
			type={type}
			{...props}
		/>
	)
}

export { Input }
