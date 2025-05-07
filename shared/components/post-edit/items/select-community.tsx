'use client'

import { Community } from '@/payload-types'
import { cn } from '@/shared/lib/utils'
import { truncateText } from '@/shared/utils/textUtils'
import { Check, ChevronsUpDown, Component, Users } from 'lucide-react'
import * as React from 'react'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '../../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import {
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '../../ui/sidebar'

interface SelectCommunityProps {
	communities: Community[]
	selectedCommunityId: number | null
	setSelectedCommunityId: (id: number) => void
}

export function SelectCommunity({
	communities,
	selectedCommunityId,
	setSelectedCommunityId
}: SelectCommunityProps) {
	const [open, setOpen] = React.useState(false)

	// Находим выбранное сообщество по ID
	const selectedCommunity = communities.find(c => c.id === selectedCommunityId)

	return (
		<SidebarHeader className='mt-2'>
			<SidebarMenu className='p-0 m-0 bg-transparent'>
				<SidebarMenuItem className='bg-transparent'>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<SidebarMenuButton
								variant='default'
								role='combobox'
								aria-expanded={open}
								className='w-full justify-between bg-transparent text-primary hover:bg-secondary'
							>
								<Component size={16} />
								{selectedCommunity
									? truncateText(selectedCommunity.title, 18)
									: 'Сообщество...'}
								<ChevronsUpDown className='opacity-50' />
							</SidebarMenuButton>
						</PopoverTrigger>
						<PopoverContent className='w-full p-0'>
							<Command>
								<CommandInput placeholder='Поиск...' className='h-9' />
								<CommandList>
									<CommandEmpty>Сообщество не найдено</CommandEmpty>
									<CommandGroup>
										{communities.map(community => (
											<CommandItem
												key={community.id}
												value={community.title.toLowerCase()}
												onSelect={() => {
													setSelectedCommunityId(community.id)
													setOpen(false)
												}}
											>
												{community.title}
												<Check
													className={cn(
														'ml-auto',
														selectedCommunityId === community.id
															? 'opacity-100'
															: 'opacity-0'
													)}
												/>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	)
}
