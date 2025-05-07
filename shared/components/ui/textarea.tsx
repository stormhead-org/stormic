import { cn } from '@/shared/lib/utils'
import * as React from 'react'

const Textarea: React.FC<
	{
		ref?: React.Ref<HTMLTextAreaElement>
	} & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, ref, ...props }) => {
	return (
		<textarea
			className={cn(
				'flex min-h-[80px] w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			ref={ref}
			{...props}
		/>
	)
}

export { Textarea }
