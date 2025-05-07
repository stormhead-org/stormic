'use client'

import { ClearButton } from '@/shared/components'
import { AutoResizeTextarea } from '@/shared/components/form/AutoResizeTextarea'
import { Button } from '@/shared/components/ui/button'
import { Textarea } from '@/shared/components/ui/textarea'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { useFormContext } from 'react-hook-form'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string
	label?: string
	required?: boolean
	loading?: boolean
	variant?:
		| 'link'
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'blue'
	className?: string
}

export const FormTextarea: React.FC<Props> = ({
	name,
	label,
	required,
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
				<AutoResizeTextarea
					className={cn(
						className,
						`text-base border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0`
					)}
					{...register(name)}
					{...props}
					maxHeight={300}
				/>

				<ClearButton
					className='absolute top-4 right-2'
					onClick={onClickClear}
				/>
			</div>

			{errorText && <p className='text-red-500 text-sm mt-2'>{errorText}</p>}
		</div>
	)
}
