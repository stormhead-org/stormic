'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import * as React from 'react'
import { useIntl } from 'react-intl'

export function FeedToggle() {
	const { formatMessage } = useIntl()
	return (
		<Select
			// onValueChange={(value) => handleLanguageChange(value)}
			// value={locale}
		>
			<SelectTrigger className='w-auto h-12 border-none font-bold'>
				<SelectValue
					placeholder={formatMessage({ id: 'feedToggle.sort' })}
					className='font-bold' />
			</SelectTrigger>
			<SelectContent
				className='bg-secondary'
			>
				<SelectItem value='1' className='font-bold'>
					{formatMessage({ id: 'feedToggle.fresh' })}
				</SelectItem>
				<SelectItem value='2' className='font-bold'>
					{formatMessage({ id: 'feedToggle.hot' })}
				</SelectItem>
				<SelectItem value='3' className='font-bold'>
					{formatMessage({ id: 'feedToggle.topOfTheM' })}
				</SelectItem>
				<SelectItem value='4' className='font-bold'>
					{formatMessage({ id: 'feedToggle.topOfTheY' })}
				</SelectItem>
			</SelectContent>
		</Select>
	
	)
}
