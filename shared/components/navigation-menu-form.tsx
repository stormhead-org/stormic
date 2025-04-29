'use client'

import { type Post, SidebarNavigation } from '@/payload-types'
import { Button } from '@/shared/components/ui/button'
import { getRelationProp } from '@/shared/utils/payload/getTypes'
import { truncateText } from '@/shared/utils/textUtils'
import { Link2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { cn } from '../lib/utils'

interface Props {
	data: SidebarNavigation
	className?: string
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

				const isActive = pathname === `/p/${postId}`

				return (
					<Button
						key={item.id}
						variant='blue'
						type='button'
						className={cn(
							'flex gap-2 justify-start w-full mt-1 h-12 text-base font-normal bg-transparent hover:bg-secondary text-foreground rounded-xl',
							pathname === `/p/${postId}`
								? 'bg-secondary hover:bg-secondary'
								: ''
						)}
						onClick={() => router.push(`/p/${postId}`)}
					>
						<Link2
							size={22}
							className={cn('text-foreground', isActive && 'text-theme')}
						/>
						<span>
							{truncateText(
								getRelationProp<Post, 'title'>(item.post, 'title', 'Untitled'),
								24
							)}
						</span>
					</Button>
				)
			})}
		</div>
	)
}
