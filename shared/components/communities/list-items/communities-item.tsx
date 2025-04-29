'use client'

import type { Community } from '@/payload-types'
import { ProfileAvatar } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { truncateText } from '@/shared/utils/textUtils'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export interface Props {
	community: Community
	className?: string
}

export const CommunitiesItem: React.FC<Props> = ({ community, className }) => {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<div className={cn('', className)}>
			<Button
				variant='blue'
				type='button'
				className={cn(
					'flex gap-2 justify-start w-full h-12 text-base font-medium bg-transparent hover:bg-secondary text-foreground rounded-xl',
					pathname === `/c/${community.id}`
						? 'bg-secondary hover:bg-secondary'
						: ''
				)}
				onClick={() => router.push(`/c/${community.id}`)}
			>
				<ProfileAvatar
					avatarImage={getMediaUrl(community.logo, '/logo.png')}
					className='hover:bg-transparent'
				/>
				{truncateText(community.title, 18)}
			</Button>
		</div>
	)
}
