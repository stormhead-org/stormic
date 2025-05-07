'use client'

import { Community, SidebarNavigation, SocialNavigation } from '@/payload-types'
import { SettingsProfileSideMenu } from '@/shared/components/profiles/settings/user/settings-page-items/personal-profile-settings-items/settings-profile-side-menu'
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent
} from '@/shared/components/ui/sidebar-tablet'
import React from 'react'
import { Sidebar } from '../ui/sidebar-tablet'

interface Props {
	className?: string
}

export const MobileSidebarUserSettings: React.FC<Props> = ({ className }) => {
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
						<SettingsProfileSideMenu />
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
