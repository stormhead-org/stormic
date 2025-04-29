'use client'

import { cn } from '@/shared/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader } from 'lucide-react'
import * as React from 'react'

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md active:translate-y-[1px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 disabled:bg-transparent',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-primary text-primary bg-transparent hover:bg-secondary',
				secondary: 'bg-secondary text-white hover:bg-primary/5',
				ghost: 'hover:bg-secondary hover:text-secondary-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				blue: 'bg-theme/80 text-foreground hover:bg-theme-hover',
				yellow: 'text-white bg-theme hover:bg-theme-hover'
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-xl px-3',
				lg: 'h-11 rounded-xl px-8',
				icon: 'h-10 w-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			children,
			disabled,
			loading,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				disabled={disabled || loading}
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			>
				{!loading ? children : <Loader className='w-5 h-5 animate-spin' />}
			</Comp>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
