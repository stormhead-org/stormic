'use client'

import { InfoBlock } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import { signOut } from '@/shared/utils/api/users/signOut'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
// import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const UserBanLogin: React.FC<Props> = ({ className }) => {
	// const { formatMessage } = useIntl()
	const router = useRouter()

	const handleSignOut = useCallback(async () => {
		let toastMessage = ''
		try {
			const result = await signOut()
			if (result.message) {
				toastMessage = 'Вы успешно вышли из аккаунта!'
				toast.error(toastMessage, {
					duration: 3000
				})
				router.refresh()
			}
		} catch (error) {
			console.error('Не удалось выйти:', error)
			toastMessage = 'Ошибка при выходе из аккаунта!'
			toast.error(toastMessage, {
				duration: 3000
			})
		}
	}, [router])

	return (
		<div className={cn('w-full h-[80%]', className)}>
			<InfoBlock
				// title={formatMessage({ id: 'communityNotFound.title' })}
				// text={formatMessage({ id: 'communityNotFound.description' })}
				buttonsHide={true}
				mediaHide={true}
				title='Упс. Заблокирован...'
				text='Кажется эта платформа решила ограничить себя от вашего общества. Платформа вас недостойна, а вы у мамы один...'
				imageUrl='/assets/images/empty-box.png'
			/>
			<div className='flex w-full justify-center mt-4'>
				<Button
					variant='blue'
					onClick={() => handleSignOut()}
					className='text-sm font-bold bg-secondary px-20 hover:bg-blue-700 text-primary hover:text-white'
				>
					{/* {formatMessage({ id: 'infoBlock.reloadPage' })} */}
					Выйти
				</Button>
			</div>
			<div className='flex w-full mt-2'>
				<img
					className='mx-auto'
					src='/assets/images/empty-box.png'
					width={200}
				/>
			</div>
		</div>
	)
}
