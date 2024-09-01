'use client'

import { InfoBlock } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const MyFeedEmpty: React.FC<Props> = ({
	                                             className
                                             }) => {
	const { formatMessage } = useIntl()
	return (
		<div
			className={cn('flex w-full h-[80%]', className)}>
			<InfoBlock
				title={formatMessage({ id: 'myFeedEmpty.title' })}
				text={formatMessage({ id: 'myFeedEmpty.description' })}
				imageUrl='/assets/images/empty-box.png'
			/>
		</div>
	)
}
