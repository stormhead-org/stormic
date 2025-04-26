'use client'

import { type Post, SidebarNavigation } from '@/payload-types'
import { getRelationProp } from '@/shared/utils/payload/getTypes'
import { LinkIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { cn } from '../lib/utils'

interface Props {
	data: SidebarNavigation
	className?: string
}

const truncateText = (text: string, maxLength: number | undefined) => {
	if (maxLength && text.length > maxLength) {
		return text.slice(0, maxLength) + '...'
	}
	return text
}

export const NavigationMenuForm: React.FC<Props> = ({ data, className }) => {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<div className={cn('', className)}>
			{data.items?.map(item => {
				const postId = getRelationProp<Post, 'id'>(item.post, 'id', 0)
				if (!postId) {
					return null
				}

				return (
					<div
						key={item.id}
						className={cn(
							'flex gap-2 pl-2 text-base items-center justify-start w-full h-12 rounded-md text-primary hover:bg-secondary cursor-pointer mb-1',
							pathname === `/p/${postId}`
								? 'bg-secondary hover:bg-secondary'
								: ''
						)}
						onClick={() => router.push(`/p/${postId}`)}
					>
						<LinkIcon size={22} />
						{truncateText(
							getRelationProp<Post, 'title'>(item.post, 'title', 'Untitled'),
							28
						)}
					</div>
				)
			})}
		</div>
	)
}
