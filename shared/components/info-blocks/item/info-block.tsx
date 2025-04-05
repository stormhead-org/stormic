'use client'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React from 'react'
// import { useIntl } from 'react-intl'
import { useRouter } from 'next/navigation'
import { Title } from '../../title'

interface Props {
	title: string
	text: string
	className?: string
	imageUrl?: string
	buttonsHide?: boolean
	mediaHide?: boolean
}

export const InfoBlock: React.FC<Props> = ({
	className,
	title,
	text,
	imageUrl,
	buttonsHide,
	mediaHide
}) => {
	// const { formatMessage } = useIntl()
	const router = useRouter()
	return (
		<div className={cn('m-auto max-w-[440px]', className)}>
			<div className='flex flex-col'>
				<div className='w-full'>
					<div className='flex '>
						<Title size='lg' text={title} className='font-extrabold mx-auto' />
					</div>
					<div className='flex '>
						<p className='text-gray-400 text-lg mx-auto'>{text}</p>
					</div>
				</div>

				{!buttonsHide && (
					<div className='flex w-full justify-around mt-4'>
						<Link href='/'>
							<Button
								variant='blue'
								className='flex items-center gap-2 text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white'
							>
								{/* <ArrowLeft size={18} />
							{formatMessage({ id: 'infoBlock.home' })} */}
								Домой
							</Button>
						</Link>
						<Button
							variant='blue'
							onClick={() => router.refresh()}
							className='flex items-center gap-2 text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white'
						>
							{/* {formatMessage({ id: 'infoBlock.reloadPage' })} */}
							Обновить
						</Button>
					</div>
				)}
			</div>
			{!mediaHide && (
				<div className='flex w-full mt-2'>
					<img className='mx-auto' src={imageUrl} alt={title} width={200} />
				</div>
			)}
		</div>
	)
}
