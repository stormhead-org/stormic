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
		<div className={cn('flex flex-1 bg-secondary rounded-md', className)}>
			{topMenuButtons.map(item => (
				<Button
					key={item.id}
					variant='secondary'
					type='button'
					className={cn(
						'h-12 flex-1 text-sm font-bold cursor-pointer hover:bg-[#f4f7fa] dark:hover:bg-[#162033]',
						`${pathname === item.path ? 'bg-blue-600' : ''}`
					)}
					onClick={() => router.push(item.path)}
				>
					{item.text}
				</Button>
			))}
		</div>
	)
}
