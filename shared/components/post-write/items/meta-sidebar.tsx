import {
	Calendar,
	ChevronDown,
	Home,
	Inbox,
	Search,
	Settings
} from 'lucide-react'

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel
} from '@/shared/components/ui/sidebar'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '../../ui/collapsible'
import { SelectCommunity } from './select-community'
import { UserProfile } from './user-profile'

// Menu items.
const items = [
	{
		title: 'Home',
		url: '#',
		icon: Home
	},
	{
		title: 'Inbox',
		url: '#',
		icon: Inbox
	},
	{
		title: 'Calendar',
		url: '#',
		icon: Calendar
	},
	{
		title: 'Search',
		url: '#',
		icon: Search
	},
	{
		title: 'Settings',
		url: '#',
		icon: Settings
	}
]

export function MetaSidebar() {
	return (
		<Sidebar side='right' collapsible='icon'>
			<SelectCommunity />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className='text-sm'>Мета</SidebarGroupLabel>
					<SidebarGroupContent>
						<Collapsible defaultOpen className='group/collapsible'>
							<SidebarGroup>
								<SidebarGroupLabel asChild>
									<CollapsibleTrigger>
										Help
										<ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
									</CollapsibleTrigger>
								</SidebarGroupLabel>
								<CollapsibleContent>
									<SidebarGroupContent />
								</CollapsibleContent>
							</SidebarGroup>
						</Collapsible>
						{/* <SidebarMenu>
							{items.map(item => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu> */}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<UserProfile />
		</Sidebar>
	)
}
