'use client'

import { ClearButton } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { Textarea } from '@/shared/components/ui/textarea'
import React from 'react'
import { useFormContext } from 'react-hook-form'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string
	label?: string
	required?: boolean
	className?: string
}

export const FormTextarea: React.FC<Props> = ({
	                                              name,
	                                              label,
	                                              required,
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
		<div className={className}>
			<p className='font-medium'>
				{label} {required && <span className='text-red-500'>*</span>}
			</p>
			
			<div className='relative'>
				<Textarea className='min-h-24 text-md pb-14' {...register(name)} {...props} />
				
				{value && value.length > 0 ? (
					<>
						<ClearButton className='absolute top-4 right-2' onClick={onClickClear} />
						<Button
							variant='secondary'
							className='absolute bottom-2 right-2 h-10 w-26 text-sm font-bold bg-blue-600 hover:bg-blue-500'
							type='button'
						>
							Отправить
						</Button>
					</>
				) : null}
			</div>
			
			{errorText && <p className='text-red-500 text-sm mt-2'>{errorText}</p>}
		</div>
	)
}
