import { ChevronUp, User2 } from 'lucide-react'

import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/shared/components/ui/sidebar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../../ui/dropdown-menu'

export function UserProfile() {
	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton>
								<User2 /> Nims
								<ChevronUp className='ml-auto' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side='top'
							className='w-[--radix-popper-anchor-width]'
						>
							<DropdownMenuItem>
								<span>Черновик</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	)
}
