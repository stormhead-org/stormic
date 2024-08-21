'use client'

import { BookCheck, Component, Lightbulb, Pencil, Rocket } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const HeaderButtonsArray = [
	{ id: 1, icon: <Pencil size={24} />, path: '/placeholder#1' },
	{ id: 2, icon: <Rocket size={24} />, path: '/placeholder#2' },
	{ id: 3, icon: <BookCheck size={24} />, path: '/placeholder#3' },
	{ id: 4, icon: <Component size={24} />, path: '/placeholder#4' },
	{ id: 5, icon: <Lightbulb size={24} />, path: '/placeholder#5' },
]

interface Props {
	className?: string
}

export const HeaderButtons: React.FC<Props> = ({ className }) => {
	const router = useRouter()
	const handleClick = (link: string) => {
		router.push(link)
	}

	return (
		<div className={className}>
			<div className='flex flex-1 justify-evenly items-center'>
				{HeaderButtonsArray.map(obj => (
					<Link
						key={obj.id}
						onClick={() => {
							handleClick(obj.path)
						}}
						href={obj.path}
						className='hover:bg-secondary/50 cursor-pointer rounded-[6px] items-center p-2 justify-center'
					>
						{obj.icon}
					</Link>
				))}
			</div>
		</div>
	)
}
