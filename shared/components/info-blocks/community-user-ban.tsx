'use client'

import { InfoBlock } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const CommunityUserBan: React.FC<Props> = ({ className }) => {
	// const { formatMessage } = useIntl()
	return (
		<div className={cn('flex w-full h-[80%]', className)}>
			<InfoBlock
				// title={formatMessage({ id: 'communityNotFound.title' })}
				// text={formatMessage({ id: 'communityNotFound.description' })}
				title='Упс. Нельзя'
				text='Видимо вы вели себя не очень достойно и это сообщество решило ограничить себя от вашего общества...'
				imageUrl='/assets/images/empty-box.png'
			/>
		</div>
	)
}
