'use client'

import { Facebook, Github, Instagram, Twitch, Twitter } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { cn } from '../lib/utils'

const socialMenu = [
	{ id: 1, icon: <Twitter size={24} />, path: '/placeholder1' },
	{ id: 2, icon: <Facebook size={24} />, path: '/placeholder2' },
	{ id: 3, icon: <Github size={24} />, path: '/placeholder3' },
	{ id: 4, icon: <Instagram size={24} />, path: '/placeholder4' },
	{ id: 5, icon: <Twitch size={24} />, path: '/placeholder5' },
]

interface Props {
	className?: string
}

export const SocialMenu: React.FC<Props> = ({ className }) => {
	const router = useRouter()

	return (
		<div className={cn('', className)}>
			<div className='flex flex-1 justify-evenly items-center'>
				{socialMenu.map(item => (
					<Link
						key={item.id}
						onClick={() => router.push(item.path)}
						href={item.path}
						className='hover:bg-secondary/50 cursor-pointer rounded-[6px] items-center p-2 justify-center'
					>
						{item.icon}
					</Link>
				))}
			</div>
		</div>
	)
}
