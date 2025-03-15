'use client'

import { Community } from '@/payload-types'
import { Button } from '@/shared/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { CommunitiesForm } from '../communities/list-items/communities-form'

export interface Props {
	communities: Community[]
	className?: string
}

export const CommunitySetInPostWriteToggle: React.FC<Props> = ({
	communities,
	className
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className='bg-transparent hover:bg-transparent text-md'
					variant='secondary'
					type='button'
				>
					Сообщество <ChevronDown />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='bg-secondary'>
				<CommunitiesForm
					// title={formatMessage({ id: 'categoryGroup.communitiesPageLink' })}
					title={'Сообщества'}
					limit={5}
					defaultItems={communities.slice(0, 5)}
					items={communities}
					// loading={loading}
					className='mt-4'
					hasPost={false}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
