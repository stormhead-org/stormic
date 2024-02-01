'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal-store'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const DeleteServerModal = () => {
	const { isOpen, onClose, type, data } = useModal()
	const router = useRouter()

	const isModalOpen = isOpen && type === 'deleteServer'
	const { server } = data

	const [isLoading, setIsLoading] = useState(false)

	const onClick = async () => {
		try {
			setIsLoading(true)

			await axios.delete(`/api/servers/${server?.id}`)

			onClose()
			router.refresh()
			router.push('/community')
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className='bg-white text-black p-0 overflow-hidden'>
				<DialogHeader className='pt-8 px-6'>
					<DialogTitle className='text-2xl text-center font-bold'>
						Удалить сервер
					</DialogTitle>
					<DialogDescription className='text-center text-zinc-500'>
						Вы уверены, что хотите{' '}
						<span className='font-semibold text-rose-500 uppercase'>
							удалить
						</span>{' '}
						<span className='font-semibold text-indigo-500'>
							{server?.name}
						</span>
						?
						<br />
						Сервер будет удален без возможности восстановления
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='bg-gray-100 px-6 py-4'>
					<div className='flex items-center justify-between w-full'>
						<Button disabled={isLoading} variant='ghost' onClick={onClick}>
							Да
						</Button>
						<Button disabled={isLoading} onClick={onClose} variant='primary'>
							Нет
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
