'use client'

import { useLocale } from '@/shared/components/locale-provider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import React from 'react'

export function LocaleToggle() {
	const { locale, setLocale } = useLocale()
	
	// Функция для переключения языка
	const handleLanguageChange = (newLocale: string) => {
		setLocale(newLocale)
	}
	
	return (
		<Select
			onValueChange={(value) => handleLanguageChange(value)}
			value={locale}
		>
			<SelectTrigger className='w-auto h-[25px] border-none bg-secondary rounded-full font-bold'>
				<SelectValue placeholder='Язык' className='font-bold' />
			</SelectTrigger>
			<SelectContent
				className='bg-secondary'
			>
				<SelectItem value='en' className='font-bold'>
					English
				</SelectItem>
				<SelectItem value='ru' className='font-bold'>
					Русский
				</SelectItem>
			</SelectContent>
		</Select>
	)
}
