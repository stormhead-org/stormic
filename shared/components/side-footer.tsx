'use client'

import packageJson from '@/package.json'
import { Button } from '@/shared/components/ui/button'
import { Book, CodeXml, Gem } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { cn } from '../lib/utils'

interface Props {
	className?: string
}

export const SideFooter: React.FC<Props> = ({ className }) => {
	const version = packageJson.version
	const router = useRouter()
	const pathname = usePathname()

	const platformFooter = [
		{
			id: 2,
			text: 'Правила',
			icon: (isActive: boolean) => (
				<Book
					size={22}
					className={cn('text-foreground', isActive && 'text-theme')}
				/>
			),
			path: '/about',
			disabled: false
		},
		{
			id: 3,
			text: `v${version}`,
			icon: (isActive: boolean) => (
				<CodeXml
					size={22}
					className={cn('text-foreground', isActive && 'text-theme')}
				/>
			),
			path: 'https://github.com/stormhead-org/stormic',
			disabled: false
		},
		{
			id: 4,
			text: 'powered by Stormic',
			icon: (isActive: boolean) => (
				<Gem
					size={22}
					className={cn('text-foreground', isActive && 'text-theme')}
				/>
			),
			path: 'https://stormic.app/about/',
			disabled: false
		}
	]

	const handleNavigation = (path: string) => {
		if (path.startsWith('http') || path.startsWith('https')) {
			window.open(path, '_blank', 'noopener,noreferrer')
		} else {
			router.push(path)
		}
	}

	return (
		<div className={cn('', className)}>
			{platformFooter.map(item => {
				const isActive = pathname === item.path
				return (
					<Button
						key={item.id}
						variant='blue'
						type='button'
						disabled={item.disabled}
						className={cn(
							'flex gap-2 justify-start w-full mb-1 h-12 text-base font-normal bg-transparent hover:bg-secondary text-foreground rounded-xl',
							isActive && 'bg-secondary hover:bg-secondary'
						)}
						onClick={() => handleNavigation(item.path)}
					>
						{typeof item.icon === 'function' ? item.icon(isActive) : item.icon}
						{item.text}
					</Button>
				)
			})}
		</div>
	)
}
