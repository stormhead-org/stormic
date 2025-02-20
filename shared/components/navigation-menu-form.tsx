'use client'

import { Post, SidebarNavigation } from '@/payload-types'
import { LinkIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { cn } from '../lib/utils'

interface Props {
	data: SidebarNavigation[]
	className?: string
}

export const NavigationMenuForm: React.FC<Props> = ({ data, className }) => {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<div className={cn('', className)}>
			{data.map(sidebar => (
				<div key={sidebar.id}>
					{sidebar.items
						?.filter(
							item => typeof item.post === 'object' && item.post !== null
						)
						.map(item => {
							const post = item.post as Post
							return (
								<div
									key={item.id || post.id} // Уникальный key
									className={cn(
										'flex gap-2 pl-2 text-lg font-bold items-center justify-start w-full h-12 rounded-md hover:bg-blue-700 hover:text-white cursor-pointer mb-1',
										pathname === `/p/${post.id}`
											? 'bg-blue-800 text-white hover:bg-blue-800'
											: ''
									)}
									onClick={() => router.push(`/p/${post.id}`)}
								>
									<LinkIcon size={22} />
									{post.title}
								</div>
							)
						})}
				</div>
			))}
		</div>
	)
}
