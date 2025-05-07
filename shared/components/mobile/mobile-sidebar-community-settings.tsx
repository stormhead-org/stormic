'use client'

import { Community, SidebarNavigation, SocialNavigation } from '@/payload-types'
import { SettingsCommunitySideMenu } from '@/shared/components/profiles/settings/community/settings-page-items/community-profile-settings-items/settings-community-side-menu'
import { SettingsProfileSideMenu } from '@/shared/components/profiles/settings/user/settings-page-items/personal-profile-settings-items/settings-profile-side-menu'
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent
} from '@/shared/components/ui/sidebar-tablet'
import React from 'react'
import { Sidebar } from '../ui/sidebar-tablet'

interface Props {
	communityId: string
	className?: string
}

export const MobileSidebarCommunitySettings: React.FC<Props> = ({
	communityId,
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
						<SettingsCommunitySideMenu communityId={communityId} />
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
