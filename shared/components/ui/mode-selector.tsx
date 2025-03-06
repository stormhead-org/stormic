'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/components/ui/select'
import { cn } from '@/shared/lib/utils'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const ModeSelector: React.FC<Props> = ({ className }) => {
	// const { formatMessage } = useIntl()
	const { theme, setTheme } = useTheme()

	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	const handleThemeChange = (value: string) => {
		setTheme(value)
	}

	return (
		<Select onValueChange={handleThemeChange} value={theme}>
			<SelectTrigger
				className={cn(
					'w-auto h-[25px] border-none bg-secondary rounded-full font-bold',
					className
				)}
			>
				<SelectValue
					// placeholder={formatMessage({ id: 'modeSelector.themePlaceholder' })}
					placeholder='Тема'
					className='font-bold'
				/>
			</SelectTrigger>
			<SelectContent className='bg-secondary'>
				<SelectItem value='dark' className='font-bold'>
					{/* {formatMessage({ id: 'modeSelector.dark' })} */}
					Темная
				</SelectItem>
				<SelectItem value='light' className='font-bold'>
					{/* {formatMessage({ id: 'modeSelector.light' })} */}
					Светлая
				</SelectItem>
				{/* <SelectItem value='system' className='font-bold'>
					{formatMessage({ id: 'modeSelector.system' })}
				</SelectItem> */}
			</SelectContent>
		</Select>
	)
}
