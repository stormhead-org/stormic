import { ChevronUp, CircleUser } from 'lucide-react'

import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/shared/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../../ui/dropdown-menu'

interface Props {
	authorName: string
	authorAvatar?: string
	className?: string
}

export const UserProfile: React.FC<Props> = ({
	authorName,
	authorAvatar,
	className
}) => {
	return (
		<SidebarFooter className='mb-2'>
			<SidebarMenu className='p-0 m-0 bg-transparent'>
				<SidebarMenuItem className='bg-transparent'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton className='w-full justify-between bg-transparent text-primary hover:bg-secondary'>
								<Avatar className='rounded-ful'>
									<AvatarImage
										className='m-auto rounded-full'
										src={authorAvatar}
										style={{ width: 34, height: 34 }}
									/>
									<AvatarFallback>
										<CircleUser />
									</AvatarFallback>
								</Avatar>
								<span>{authorName}</span>
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
