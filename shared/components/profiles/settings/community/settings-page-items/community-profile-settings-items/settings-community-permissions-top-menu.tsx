'use client'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	communityId: number
	className?: string
}

export const SettingsCommunityPermissionsTopMenu: React.FC<Props> = ({
	communityId,
	className
}) => {
	// const { formatMessage } = useIntl()
	const pathname = usePathname()
	const router = useRouter()

	const topMenuButtons = [
		{
			id: 1,
			// text: formatMessage({ id: 'profileAuthTopMenu.accountSettings' }),
			text: 'Роли',
			path: `/settings/community/${communityId}/permissions/roles`,
			disabled: false
		},
		{
			id: 2,
			// text: formatMessage({ id: 'profileAuthTopMenu.2FactorAuth' }),
			text: 'Заблокированные',
			path: `/settings/community/${communityId}/permissions/bans`,
			disabled: false
		},
		{
			id: 3,
			// text: formatMessage({ id: 'profileAuthTopMenu.authorizedApps' }),
			text: 'Заглушенные',
			path: `/settings/community/${communityId}/permissions/mutes`,
			disabled: false
		}
	]

	return (
		<div
			className={cn(
				'flex flex-1 rounded-xl gap-1 overflow-x-auto no-scrollbar',
				className
			)}
		>
			{topMenuButtons.map(item => (
				<Button
					key={item.id}
					variant='blue'
					type='button'
					disabled={item.disabled}
					className={cn(
						'h-12 flex-1 text-md font-bold bg-secondary hover:bg-theme-hover text-foreground hover:text-background rounded-xl',
						`${
							pathname === item.path
								? 'bg-theme/80 hover:bg-theme-hover text-background'
								: ''
						}`
					)}
					onClick={() => router.push(item.path)}
				>
					{item.text}
				</Button>
			))}
		</div>
	)
}
