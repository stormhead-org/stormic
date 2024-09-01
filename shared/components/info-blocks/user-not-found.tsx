'use client'

import { InfoBlock } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const UserNotFound: React.FC<Props> = ({
	                                              className
                                              }) => {
	const { formatMessage } = useIntl()
	return (
		<div
			className={cn('flex w-full h-[80%]', className)}>
			<InfoBlock
				title={formatMessage({ id: 'userNotFound.title' })}
				text={formatMessage({ id: 'userNotFound.description' })}
				imageUrl='/assets/images/empty-box.png'
			/>
		</div>
	)
}
