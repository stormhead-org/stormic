'use client'

import { CategoryGroup } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'

export function CategorySetInPostWriteToggle() {
	
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className='bg-transparent hover:bg-transparent text-md'
					variant='secondary'
					type='button'>
					Категория <ChevronDown />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='bg-secondary'>
				<CategoryGroup hasPost={true} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
