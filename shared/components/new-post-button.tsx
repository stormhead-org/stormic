'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { cn } from '../lib/utils'
import { Button } from './ui/button'

interface Props {
	className?: string
}

export const NewPostButton: React.FC<Props> = ({ className }) => {
	const router = useRouter()

	return (
		<div className={cn('', className)}>
			<Button
				variant='secondary'
				className='h-12 w-full text-lg font-bold'
				type='button'
				onClick={() => router.push('/write')}
			>
				Новый пост
			</Button>
		</div>
	)
}
