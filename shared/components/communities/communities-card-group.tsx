'use client'

import { CommunitiesCardForm } from '@/shared/components/communities/card-items/communities-card-form'
import { useCategories } from '@/shared/hooks/use-categories'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	className?: string
}

export const CommunitiesCardGroup: React.FC<Props> = ({
	                                                      className
                                                      }) => {
	const { categories, loading } = useCategories()
	
	const items = categories.map((item: any) => ({
		categoryId: item.category_id,
		image: item.category_image,
		name: item.category_name,
		description: item.category_description,
		url: item.category_url,
		postCount: item.posts,
		followersCount: item.followers
	}))
	
	return (
		<div className={cn('', className)}>
			<CommunitiesCardForm
				items={items}
				loading={loading}
			/>
		</div>
	)
}
