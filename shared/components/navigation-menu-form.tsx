'use client'

import { SidebarNavigation } from '@/payload-types'
import { LinkIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { cn } from '../lib/utils'

// interface Sidebarnavigation {
//   id: string;
//   post: {
//     id: number;
//     title: string;
//     heroImage: number;
//     content: any;
//     communities: any[];
//     meta: any;
//     author: any[];
//     slug: string;
//     createdAt: string;
//   };
// }

interface Props {
	data: SidebarNavigation[]
	className?: string
}

export const NavigationMenuForm: React.FC<Props> = ({ data, className }) => {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<div className={cn('', className)}>
			{data.map(item => (
				<div
					key={item.id}
					className={cn(
						'flex gap-2 pl-2 text-lg font-bold items-center justify-start w-full h-12 rounded-md hover:bg-blue-700 hover:text-white cursor-pointer mb-1',
						`${
							pathname === `/posts/${item.post.slug}`
								? 'bg-blue-800 text-white hover:bg-blue-800'
								: ''
						}`
					)}
					onClick={() => router.push(`/posts/${item.post.slug}`)}
				>
					<LinkIcon size={22} />
					{item.post.title}
				</div>
			))}
		</div>
	)
}
