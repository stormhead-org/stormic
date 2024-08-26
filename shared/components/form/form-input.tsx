'use client'

import { ClearButton, ErrorText, RequiredSymbol } from '@/shared/components'
import { Input } from '@/shared/components/ui/input'
import React from 'react'
import { useFormContext } from 'react-hook-form'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string
	label?: string
	required?: boolean
	className?: string
}

export const FormInput = React.forwardRef<HTMLInputElement, Props>(
	({ className, name, label, required, ...props }, ref) => {
		const {
			register,
			formState: { errors },
			watch,
			setValue
		} = useFormContext()
		
		const { ref: registerRef, ...rest } = register(name) // Извлекаем ref и остальные параметры
		
		const value = watch(name)
		const errorText = errors[name]?.message as string
		
		const onClickClear = () => {
			setValue(name, '', { shouldValidate: true })
		}
		
		return (
			<div className={className}>
				{label && (
					<p className='font-medium mb-2'>
						{label} {required && <RequiredSymbol />}
					</p>
				)}
				
				<div className='relative'>
					{/* Передаем registerRef как ref, и остальные параметры */}
					<Input
						ref={(el) => {
							registerRef(el) // Сначала передаем ref из register
							if (typeof ref === 'function') {
								ref(el)
							} else if (ref) {
								(ref as React.MutableRefObject<HTMLInputElement | null>).current = el
							}
						}}
						className='h-12 text-md'
						{...rest} // Передаем оставшиеся параметры из register
						{...props} // Передаем оставшиеся пропсы компонента
					/>
					
					{value && <ClearButton onClick={onClickClear} />}
				</div>
				
				{errorText && <ErrorText text={errorText} className='mt-2' />}
			</div>
		)
	}
)

FormInput.displayName = 'FormInput'
