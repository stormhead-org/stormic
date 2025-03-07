'use client'

import { InfoBlock } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const AccessDenied: React.FC<Props> = ({ className }) => {
	// const { formatMessage } = useIntl()
	return (
		<div className={cn('flex w-full h-[80%]', className)}>
			<InfoBlock
				// title={formatMessage({ id: 'notAuthLock.title' })}
				// text={formatMessage({ id: 'notAuthLock.description' })}
				title='Доступ запрещен'
				text='Вы не можете просматривать эту страницу'
				imageUrl='/assets/images/lock.png'
			/>
		</div>
	)
}
