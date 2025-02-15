'use client'

import { InfoBlock } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const CommunityNotFound: React.FC<Props> = ({ className }) => {
	// const { formatMessage } = useIntl()
	return (
		<div className={cn('flex w-full h-[80%]', className)}>
			<InfoBlock
				// title={formatMessage({ id: 'communityNotFound.title' })}
				// text={formatMessage({ id: 'communityNotFound.description' })}
				title='Сообщество не найдено'
				text='Прилетело НЛО и его больше никто не видел...'
				imageUrl='/assets/images/empty-box.png'
			/>
		</div>
	)
}
