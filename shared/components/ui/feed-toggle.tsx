'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'
// import { useIntl } from 'react-intl'

export function FeedToggle() {
	// const { formatMessage } = useIntl()
	return (
		<Select
		// onValueChange={(value) => handleLanguageChange(value)}
		// value={locale}
		>
			<SelectTrigger className='w-auto h-12 border-none font-bold'>
				<SelectValue
					// placeholder={formatMessage({ id: 'feedToggle.sort' })}
					placeholder={'Сортировать'}
					className='font-bold'
				/>
			</SelectTrigger>
			<SelectContent className='bg-secondary'>
				<SelectItem value='1' className='font-bold'>
					{/* {formatMessage({ id: 'feedToggle.fresh' })} */}
					Свежее
				</SelectItem>
				<SelectItem value='2' className='font-bold'>
					{/* {formatMessage({ id: 'feedToggle.hot' })} */}
					Горячее
				</SelectItem>
				<SelectItem value='3' className='font-bold'>
					{/* {formatMessage({ id: 'feedToggle.topOfTheM' })} */}
					Лучшее за месяц
				</SelectItem>
				<SelectItem value='4' className='font-bold'>
					{/* {formatMessage({ id: 'feedToggle.topOfTheY' })} */}
					Лучшее за год
				</SelectItem>
			</SelectContent>
		</Select>
	)
}
