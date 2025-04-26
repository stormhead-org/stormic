'use client'

import { Community, SidebarNavigation, SocialNavigation } from '@/payload-types'
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenuItem
} from '@/shared/components/ui/sidebar-tablet'
import { CommunitiesForm } from '../communities/list-items/communities-form'
import { FeedUserMenu } from '../feed-user-menu'
import { NavigationMenuForm } from '../navigation-menu-form'
import { SideFooter } from '../side-footer'
import { SocialMenu } from '../social-menu'
import { Sidebar } from '../ui/sidebar-tablet'

interface Props {
	communities: Community[]
	sideBarNavigation: SidebarNavigation
	socialNavigation: SocialNavigation
	className?: string
}

export const MobileSidebar: React.FC<Props> = ({
	communities,
	sideBarNavigation,
	socialNavigation,
	className
}) => {
	return (
		<Sidebar
			variant='floating'
			side='left'
			collapsible='offcanvas'
			className={className}
		>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenuItem className='bg-transparent px-1 m-0'>
							<FeedUserMenu />
						</SidebarMenuItem>

						<SidebarMenuItem className='bg-transparent px-1 m-0'>
							<SocialMenu
								socialNavigation={socialNavigation}
								className='my-2'
							/>
						</SidebarMenuItem>

						<SidebarMenuItem className='bg-transparent px-1 m-0'>
							<NavigationMenuForm className='mt-4' data={sideBarNavigation} />
						</SidebarMenuItem>

						<SidebarMenuItem className='bg-transparent px-1 m-0'>
							<CommunitiesForm
								title={'Сообщества'}
								limit={5}
								defaultItems={communities.slice(0, 5)}
								items={communities}
								className='mt-4'
								hasPost={false}
							/>
						</SidebarMenuItem>

						<SidebarMenuItem className='bg-transparent px-1 m-0'>
							<SideFooter className='mt-4' />
						</SidebarMenuItem>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
