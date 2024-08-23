'use client'

import { CategoryForm } from '@/shared/components/categories/category-form'
import { useCategories } from '@/shared/hooks/use-categories'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	hasPost: boolean
	className?: string
}

export const CategoryGroup: React.FC<Props> = ({
	                                               hasPost,
	                                               className
                                               }) => {
	
	const { categories, loading } = useCategories()
	
	const items = categories.map(item => ({
		value: String(item.category_id),
		text: item.category_name,
		url: item.category_url,
		image: item.category_image
	}))
	
	return (
		<div className={cn('', className)}>
			<CategoryForm
				title='Сообщества'
				limit={5}
				defaultItems={items.slice(0, 5)}
				items={items}
				loading={loading}
				className='mt-4'
				hasPost={hasPost} />
		</div>
	)
}
