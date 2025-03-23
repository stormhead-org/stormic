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
import { CommunitiesPostForm } from '../communities/list-items/communities-post-form'

export interface Props {
	communities: Community[]
	selectedCommunityId: number | null
	setSelectedCommunityId: (id: number) => void
	className?: string
}

export const CommunitySetInPostWriteToggle: React.FC<Props> = ({
	communities,
	selectedCommunityId,
	setSelectedCommunityId,
	className
}) => {
	const selectedCommunity = communities.find(c => c.id === selectedCommunityId)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className='bg-transparent hover:bg-transparent text-md'
					variant='secondary'
					type='button'
				>
					{selectedCommunity ? selectedCommunity.title : 'Сообщество'}{' '}
					<ChevronDown />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='bg-secondary'>
				<CommunitiesPostForm
					limit={5}
					defaultItems={communities.slice(0, 5)}
					items={communities}
					setSelectedCommunityId={setSelectedCommunityId}
					selectedCommunityId={selectedCommunityId} // Передаем для выделения выбранного элемента
					className='mt-4'
					hasPost={false}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
