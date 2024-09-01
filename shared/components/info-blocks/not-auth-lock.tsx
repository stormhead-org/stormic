'use client'

import { InfoBlock } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const NotAuthLock: React.FC<Props> = ({
	                                             className
                                             }) => {
	const { formatMessage } = useIntl()
	return (
		<div
			className={cn('flex w-full h-[80%]', className)}>
			<InfoBlock
				title={formatMessage({ id: 'notAuthLock.title' })}
				text={formatMessage({ id: 'notAuthLock.description' })}
				imageUrl='/assets/images/lock.png'
			/>
		</div>
	)
}
