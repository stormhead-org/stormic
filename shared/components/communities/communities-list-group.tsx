'use client'

import { CommunitiesForm } from '@/shared/components/communities/list-items/communities-form'
import { useCategories } from '@/shared/hooks/use-categories'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { useIntl } from 'react-intl'

interface Props {
	hasPost: boolean
	className?: string
}

export const CommunitiesListGroup: React.FC<Props> = ({
	                                                      hasPost,
	                                                      className
                                                      }) => {
	const { formatMessage } = useIntl()
	const { categories, loading } = useCategories()
	
	const items = categories.map(item => ({
		value: String(item.category_id),
		text: item.category_name,
		url: item.category_url,
		image: item.category_image
	}))
	
	return (
		<div className={cn('', className)}>
			<CommunitiesForm
				title={formatMessage({ id: 'categoryGroup.communitiesPageLink' })}
				limit={5}
				defaultItems={items.slice(0, 5)}
				items={items}
				loading={loading}
				className='mt-4'
				hasPost={hasPost} />
		</div>
	)
}
