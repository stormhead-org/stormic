'use client'

import { ClearButton } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { Textarea } from '@/shared/components/ui/textarea'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { useFormContext } from 'react-hook-form'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string
	label?: string
	required?: boolean
	sideButton?: boolean
	loading?: boolean
	variant?:
		| 'link'
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'blue'
	onClickValue?: () => void
	className?: string
}

export const FormTextarea: React.FC<Props> = ({
	name,
	label,
	required,
	sideButton,
	onClickValue,
	loading,
	variant,
	className,
	...props
}) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue
	} = useFormContext()

	const value = watch(name)
	const errorText = errors[name]?.message as string

	const onClickClear = () => {
		setValue(name, '')
	}

	return (
		<div>
			<p className='font-medium mb-2'>
				{label} {required && <span className='text-red-500'>*</span>}
			</p>

			<div className='relative'>
				<Textarea
					className={cn(
						className,
						`${sideButton ? 'min-h-24 text-md pb-14' : 'min-h-24 text-md'} border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0`
					)}
					{...register(name)}
					{...props}
				/>

				<ClearButton
					className='absolute top-4 right-2'
					onClick={onClickClear}
				/>
				{sideButton && (
					<Button
						variant={variant}
						className='absolute bottom-2 right-2 h-10 w-26 text-sm font-bold'
						loading={loading}
						onClick={onClickValue}
						type='button'
					>
						Отправить
					</Button>
				)}
			</div>

			{errorText && <p className='text-red-500 text-sm mt-2'>{errorText}</p>}
		</div>
	)
}
