'use client'

import { Post } from '@/payload-types'
import { BookmarksEmpty } from '@/shared/components/info-blocks/bookmarks-empty'
import { PostForm } from '@/shared/components/posts/post-items/post-form'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	data: Post[];
	className?: string;
}

export const UserBookmarksPostGroup: React.FC<Props> = ({
	                                                        data,
	                                                        className
                                                        }) => {
	return (
		<>
			<div className={cn("", className)}>
				<PostForm
					limit={5}
					post={data}
					// loading={loading}
				/>
			</div>
		</>
	)
}
