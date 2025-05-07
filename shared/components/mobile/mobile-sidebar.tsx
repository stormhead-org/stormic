'use client'

import { Community, SidebarNavigation, SocialNavigation } from '@/payload-types'
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent
} from '@/shared/components/ui/sidebar-tablet'
import React from 'react'
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
			<SidebarContent className='bg-background'>
				<SidebarGroup>
					<SidebarGroupContent>
						<FeedUserMenu />

						<CommunitiesForm
							limit={10}
							items={communities}
							// loading={loading}
						/>

						<NavigationMenuForm data={sideBarNavigation} />

						<SocialMenu socialNavigation={socialNavigation} />

						<SideFooter />
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
