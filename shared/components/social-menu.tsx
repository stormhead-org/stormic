'use client'

import { SocialNavigation } from '@/payload-types'
import { Facebook, Github, Globe, Instagram, Twitch, Twitter } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
	const router = useRouter()

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
					src="/icons/social/mastodon-icon.svg"
					alt="Mastodon icon"
					className="w-6 h-6 group-hover:filter group-hover:brightness-0 group-hover:invert dark:filter dark:brightness-0 dark:invert"
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
		<div className={cn('', className)}>
			<div className='flex flex-1 justify-evenly items-center'>
				{socialMenu.length !== 0 &&
					socialMenu.map(item => (
						<Link
							key={item.id}
							href={item.path}
							target='_blank'
							className='group text-black dark:text-white hover:bg-blue-700 hover:text-white cursor-pointer rounded-full items-center p-2 justify-center'
							title={item.name}
						>
							{item.icon}
						</Link>
					))}
			</div>
		</div>
	)
}
