'use client'

import { InfoBlock } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const BookmarksEmpty: React.FC<Props> = ({
	                                                className
                                                }) => {
	const { formatMessage } = useIntl()
	return (
		<div
			className={cn('flex w-full h-[80%]', className)}>
			<InfoBlock
				title={formatMessage({ id: 'bookmarksEmpty.title' })}
				text={formatMessage({ id: 'bookmarksEmpty.description' })}
				imageUrl='/assets/images/empty-box.png'
			/>
		</div>
	)
}
