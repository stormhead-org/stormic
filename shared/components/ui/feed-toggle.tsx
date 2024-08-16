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
					className='bg-transparent hover:bg-transparent text-md'
					variant='secondary'
					type='button'>
					Свежее <ChevronDown />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='bg-secondary'>
				<DropdownMenuItem
					// onClick={() => setTheme('light')}
				>
					Свежее
				</DropdownMenuItem>
				<DropdownMenuItem
					// onClick={() => setTheme('dark')}
				>
					Популярное
				</DropdownMenuItem>
				<DropdownMenuItem
					// onClick={() => setTheme('system')}
				>
					Топ за месяц
				</DropdownMenuItem>
				<DropdownMenuItem
					// onClick={() => setTheme('system')}
				>
					Топ за год
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
