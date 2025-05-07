'use client'

import { SocialNavigation } from '@/payload-types'
import { Github, Globe, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'
import React, { JSX } from 'react'
import { cn } from '../lib/utils'

interface Props {
	className?: string
	socialNavigation: SocialNavigation
}

export const SocialMenu: React.FC<Props> = ({
	className,
	socialNavigation
}) => {
	const socialMenu: {
		id: number
		icon: JSX.Element
		path: string
		name: string
	}[] = [
		{
			id: 1,
			icon: <Twitter size={24} />,
			path: socialNavigation.twitter,
			name: 'Twitter'
		},
		{
			id: 2,
			icon: (
				<img
					src='/icons/social/mastodon-icon.svg'
					alt='Mastodon icon'
					className='w-6 h-6 dark:filter dark:brightness-0 dark:invert'
				/>
			),
			path: socialNavigation.mastodon,
			name: 'Mastodon'
		},
		{
			id: 3,
			icon: <Github size={24} />,
			path: socialNavigation.github,
			name: 'GitHub'
		},
		{
			id: 4,
			icon: <Instagram size={24} />,
			path: socialNavigation.instagram,
			name: 'Instagram'
		},
		{
			id: 5,
			icon: <Globe size={24} />,
			path: socialNavigation.site,
			name: 'Сайт'
		}
	].filter(
		(
			item
		): item is { id: number; icon: JSX.Element; path: string; name: string } =>
			item.path != null && item.path.trim() !== ''
	)

	return (
		<div className={cn('mt-2', className)}>
			<div className='flex gap-2 items-center px-2'>
				{socialMenu.length !== 0 &&
					socialMenu.map(item => (
						<Link
							key={item.id}
							href={item.path}
							target='_blank'
							className='group text-foreground hover:text-foreground hover:bg-secondary cursor-pointer rounded-xl items-center p-2 justify-center'
							title={item.name}
						>
							{item.icon}
						</Link>
					))}
			</div>
		</div>
	)
}
