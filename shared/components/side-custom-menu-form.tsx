'use client'

import { SideCustomMenu } from '@prisma/client'
import { LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { cn } from '../lib/utils'

interface Props {
	data: SideCustomMenu[]
	className?: string
}

export const SideCustomMenuForm: React.FC<Props> = ({ data, className }) => {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<div className={className}>
			{data.map(item => (
				<li
					key={item.id}
					className={cn(
						'flex items-center justify-between w-full h-12 rounded-[6px] hover:bg-blue-600 mb-[1px] cursor-pointer',
						`${pathname === item.pageUrl ? 'bg-blue-600' : ''}`
					)}
					onClick={() => router.push(item.pageUrl)}
				>
					<div className='flex items-center gap-2 ml-2'>
						<LinkIcon size={22} />
						<Link href={item.pageUrl} className='text-lg font-bold'>
							{item.name}
						</Link>
					</div>
				</li>
			))}
		</div>
	)
}
