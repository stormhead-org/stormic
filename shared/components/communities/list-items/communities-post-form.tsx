'use client'

import { Community } from '@/payload-types'
import { Title } from '@/shared/components/title'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Input } from '../../ui/input'
import { Skeleton } from '../../ui/skeleton'

interface Props {
	items: Community[]
	defaultItems?: Community[]
	limit?: number
	loading?: boolean
	searchInputPlaceholder?: string
	name?: string
	hasPost: boolean
	className?: string
	selectedCommunityId: number | null
	setSelectedCommunityId: (id: number) => void
}

export const CommunitiesPostForm: React.FC<Props> = ({
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	name,
	className,
	hasPost,
	loading,
	selectedCommunityId,
	setSelectedCommunityId
}) => {
	const [showAll, setShowAll] = React.useState(false)
	const [searchValue, setSearchValue] = React.useState('')

	const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	if (loading) {
		return (
			<div className={className}>
				{Array(limit)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />
					))}
				<Skeleton className='w-28 h-6 mb-4 rounded-[8px]' />
			</div>
		)
	}

	const list = showAll
		? items.filter(item =>
				item.title.toLowerCase().includes(searchValue.toLowerCase())
			)
		: (defaultItems || items).slice(0, limit)

	return (
		<div className={cn(hasPost && 'max-w-[200px]', className)}>
			{showAll && (
				<div className={cn(hasPost ? 'mb-2' : 'mb-5', className)}>
					<Input
						onChange={onChangeSearchInput}
						placeholder={searchInputPlaceholder}
						className='bg-secondary'
					/>
				</div>
			)}

			<div className='flex flex-col max-h-[415px] p-1 overflow-auto scrollbar'>
				{list.map(item => (
					<div
						key={item.id}
						onClick={() => setSelectedCommunityId(item.id)}
						className={cn(
							'cursor-pointer p-2 flex items-center hover:bg-gray-700 rounded',
							selectedCommunityId === item.id && 'bg-gray-700'
						)}
					>
						<img
							src={getMediaUrl(item.logo, 'medium', '/logo.png')}
							alt={item.title}
							className='w-8 h-8 rounded-full mr-2'
						/>
						<span>{item.title}</span>
					</div>
				))}
			</div>

			{items.length > limit && (
				<div className='border-b border-b-secondary'>
					<button
						onClick={() => setShowAll(!showAll)}
						className='text-primary mb-3 mt-3 w-full'
					>
						{showAll ? (
							<div className='flex flex-1 items-center hover:text-a-color-hover'>
								<ChevronUp className='mx-3' />
								<p className='font-bold'>Скрыть</p>
							</div>
						) : (
							<div className='flex flex-1 items-center hover:text-a-color-hover'>
								<ChevronDown className='mx-3' />
								<p className='font-bold'>Показать</p>
							</div>
						)}
					</button>
				</div>
			)}
		</div>
	)
}
