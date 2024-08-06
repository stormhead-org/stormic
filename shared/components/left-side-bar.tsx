'use client'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import {
	BookmarkCheck,
	CheckCheck,
	Dot,
	Facebook,
	Flame,
	Github,
	Instagram,
	Twitch,
	Twitter,
	Zap,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const LeftSideMenu = [
	{ id: 1, text: 'Популярное', icon: <Zap size={22} />, path: '/' },
	{
		id: 2,
		text: 'Свежее',
		icon: <Flame size={22} />,
		path: '/new',
		dot: <Dot size={32} className='text-blue-400' />,
	},
	{ id: 3, text: 'Моя лента', icon: <CheckCheck size={22} />, path: '/my' },
	{
		id: 4,
		text: 'Закладки',
		icon: <BookmarkCheck size={22} />,
		path: '/bookmarks',
	},
]

const LeftSocialMenu = [
	{ id: 1, icon: <Twitter size={24} />, path: '/placeholder#1' },
	{ id: 2, icon: <Facebook size={24} />, path: '/placeholder#2' },
	{ id: 3, icon: <Github size={24} />, path: '/placeholder#3' },
	{ id: 4, icon: <Instagram size={24} />, path: '/placeholder#4' },
	{ id: 5, icon: <Twitch size={24} />, path: '/placeholder#5' },
]

interface Props {
	className?: string
}

export const LeftSideBar: React.FC<Props> = ({ className }) => {
	const router = useRouter()
	const pathname = usePathname()
	const handleClick = (link: string) => {
		router.push(link)
	}

	return (
		<div className={className}>
			<ul>
				{LeftSideMenu.map(obj => (
					<li
						key={obj.id}
						className={cn(
							'flex items-center justify-between w-full h-12 rounded-[6px] hover:bg-blue-600 mb-[1px] cursor-pointer',
							`${pathname === obj.path ? 'bg-blue-600' : ''}`
						)}
						onClick={() => {
							handleClick(obj.path)
						}}
					>
						<div className='flex items-center gap-2 ml-2'>
							{obj.icon}
							<Link href={obj.path} className='text-lg font-bold'>
								{obj.text}
							</Link>
						</div>
						{obj.dot}
					</li>
				))}
			</ul>
			<div className='flex flex-1 justify-evenly items-center my-4'>
				{LeftSocialMenu.map(obj => (
					<Link
						key={obj.id}
						onClick={() => {
							handleClick(obj.path)
						}}
						href={obj.path}
						className='hover:bg-blue-600 cursor-pointer rounded-[6px] items-center p-2 justify-center'
					>
						{obj.icon}
					</Link>
				))}
			</div>

			<Button
				variant='secondary'
				className='h-12 w-full text-lg font-bold'
				type='button'
				onClick={() => router.push('/write')}
			>
				Новый пост
			</Button>
		</div>
	)
}
