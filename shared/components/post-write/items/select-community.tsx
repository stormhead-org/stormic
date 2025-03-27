'use client'

import { ChevronDown } from 'lucide-react'
import * as React from 'react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../../ui/dropdown-menu'
import {
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '../../ui/sidebar'

const frameworks = [
	{
		value: 'next.js',
		label: 'Next.js'
	},
	{
		value: 'sveltekit',
		label: 'SvelteKit'
	},
	{
		value: 'nuxt.js',
		label: 'Nuxt.js'
	},
	{
		value: 'remix',
		label: 'Remix'
	},
	{
		value: 'astro',
		label: 'Astro'
	}
]

export function SelectCommunity() {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState('')

	return (
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton>
								Сообщество
								<ChevronDown className='ml-auto' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-[--radix-popper-anchor-width]'>
							<DropdownMenuItem>
								<span>Acme Inc</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<span>Acme Corp.</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	)
}
