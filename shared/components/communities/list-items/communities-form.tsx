'use client'

import { CommunitiesItem } from '@/shared/components/communities/list-items/communities-item'
import { Title } from '@/shared/components/title'
import { cn } from '@/shared/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
// import { useIntl } from 'react-intl'
import { Community } from '@/payload-types'
import { Input } from '../../ui/input'
import { Skeleton } from '../../ui/skeleton'

interface Props {
	title: string
	items: Community[]
	defaultItems?: Community[]
	limit?: number
	loading?: boolean
	searchInputPlaceholder?: string
	name?: string
	hasPost: boolean
	className?: string
}

export const CommunitiesForm: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	name,
	className,
	hasPost,
	loading
}) => {
	// const { formatMessage } = useIntl()
	const [showAll, setShowAll] = React.useState(false)
	const [searchValue, setSearchValue] = React.useState('')
	const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	if (loading) {
		return (
			<div className={className}>
				<Title text={title} size='xs' className='mb-4' />

				{...Array(limit)
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
				item.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
			)
		: (defaultItems || items).slice(0, limit)

	return (
		<div className={cn(hasPost && 'max-w-[200px]', className)}>
			{!hasPost && (
				<Link href={`/c`}>
					<Title
						text={title}
						size='xs'
						className='font-bold text-a-color hover:text-a-color-hover mb-6'
					/>
				</Link>
			)}
			{showAll && (
				<div className={cn(hasPost ? 'mb-2]' : 'mb-5', className)}>
					<Input
						onChange={onChangeSearchInput}
						placeholder={searchInputPlaceholder}
						className='bg-secondary'
					/>
				</div>
			)}

			<div className='flex flex-col mt-4 max-h-[415px] pr-2 overflow-auto scrollbar'>
				{list.map((item, index) => (
					<CommunitiesItem
						key={index}
						text={item.title}
						image={item.communityLogo?.url}
						url={`/c/${item.id}`}
						name={item.title}
					/>
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
								<p className='font-bold'>
									{/* {formatMessage({ id: 'categoryGroup.communityListHide' })} */}
									Скрыть
								</p>
							</div>
						) : (
							<div className='flex flex-1 items-center hover:text-a-color-hover'>
								<ChevronDown className='mx-3' />
								<p className='font-bold'>
									{/* {formatMessage({ id: 'categoryGroup.communityListShow' })} */}
									Показать
								</p>
							</div>
						)}
					</button>
				</div>
			)}
		</div>
	)
}
