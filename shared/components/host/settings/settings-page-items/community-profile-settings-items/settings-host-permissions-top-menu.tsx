'use client'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const SettingsHostPermissionsTopMenu: React.FC<Props> = ({
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
			path: '/settings/host/permissions/roles',
			disabled: false
		},
		{
			id: 2,
			// text: formatMessage({ id: 'profileAuthTopMenu.2FactorAuth' }),
			text: 'Удаленные',
			path: '/settings/host/permissions/deleted',
			disabled: false
		},
		{
			id: 3,
			// text: formatMessage({ id: 'profileAuthTopMenu.2FactorAuth' }),
			text: 'Заблокированные',
			path: '/settings/host/permissions/bans',
			disabled: false
		},
		{
			id: 4,
			// text: formatMessage({ id: 'profileAuthTopMenu.authorizedApps' }),
			text: 'Заглушенные',
			path: '/settings/host/permissions/mutes',
			disabled: true
		}
	]

	return (
		<div className={cn('flex flex-1 rounded-md gap-1', className)}>
			{topMenuButtons.map(item => (
				<Button
					key={item.id}
					variant='blue'
					type='button'
					disabled={item.disabled}
					className={cn(
						'h-12 flex-1 text-md font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white',
						`${
							pathname === item.path
								? 'bg-blue-800 hover:bg-blue-800 text-white'
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
