'use client'

import { Button } from '@/shared/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function FeedToggle() {
	const { setTheme } = useTheme()
	
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className='bg-transparent hover:bg-transparent text-md text-primary hover:text-a-color-hover cursor-pointer'
					variant='blue'
					type='button'>
					Свежее <ChevronDown />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='bg-secondary'>
				<DropdownMenuItem
					className='cursor-pointer'
					// onClick={() => setTheme('light')}
				>
					Свежее
				</DropdownMenuItem>
				<DropdownMenuItem
					className='cursor-pointer'
					// onClick={() => setTheme('dark')}
				>
					Популярное
				</DropdownMenuItem>
				<DropdownMenuItem
					className='cursor-pointer'
					// onClick={() => setTheme('system')}
				>
					Топ за месяц
				</DropdownMenuItem>
				<DropdownMenuItem
					className='cursor-pointer'
					// onClick={() => setTheme('system')}
				>
					Топ за год
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
