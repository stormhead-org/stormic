'use client'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const topMenuButtons = [
	{ id: 1, text: 'Управление учётной записью', path: '/settings/auth' },
	{ id: 2, text: 'Подтверждение входа', path: '/settings/auth#2' },
	{ id: 3, text: 'Приложения', path: '/settings/auth#3' }
]

interface Props {
	className?: string
}

export const SettingsProfileAuthTopMenu: React.FC<Props> = ({ className }) => {
	const pathname = usePathname()
	const router = useRouter()
	
	return (
		<div className={cn('flex flex-1 rounded-md gap-1', className)}>
			{topMenuButtons.map(item => (
				<Button
					key={item.id}
					variant='blue'
					type='button'
					className={cn(
						'h-12 flex-1 text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white',
						`${pathname === item.path ? 'bg-blue-800 hover:bg-blue-800 text-white' : ''}`
					)}
					onClick={() => router.push(item.path)}
				>
					{item.text}
				</Button>
			))}
		</div>
	)
}
