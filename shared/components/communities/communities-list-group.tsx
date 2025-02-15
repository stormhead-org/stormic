'use client'

import { Community } from '@/payload-types'
import { CommunitiesForm } from '@/shared/components/communities/list-items/communities-form'
import { cn } from '@/shared/lib/utils'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	data: Community[]
	hasPost: boolean
	className?: string
}

export const CommunitiesListGroup: React.FC<Props> = ({
	data,
	hasPost,
	className,
}) => {
	// const { formatMessage } = useIntl()

	return (
		<div className={cn('', className)}>
			<CommunitiesForm
				// title={formatMessage({ id: 'categoryGroup.communitiesPageLink' })}
				title={'Сообщества'}
				limit={5}
				defaultItems={data.slice(0, 5)}
				items={data}
				// loading={loading}
				className='mt-4'
				hasPost={hasPost}
			/>
		</div>
	)
}
