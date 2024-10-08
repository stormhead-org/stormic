'use client'

import { useLocale } from '@/shared/components/providers/items/locale-provider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const LocaleToggle: React.FC<Props> = ({ className }) => {
	const { formatMessage } = useIntl()
	const { locale, setLocale } = useLocale()
	
	// Функция для переключения языка
	const handleLanguageChange = (newLocale: string) => {
		setLocale(newLocale)
	}
	
	return (
		<Select onValueChange={(value) => handleLanguageChange(value)} value={locale}>
			<SelectTrigger className={cn('w-auto h-[25px] border-none bg-secondary rounded-full font-bold', className)}>
				<SelectValue placeholder={formatMessage({ id: 'localeToggle.languagePlaceholder' })} className='font-bold' />
			</SelectTrigger>
			<SelectContent className='bg-secondary'>
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
