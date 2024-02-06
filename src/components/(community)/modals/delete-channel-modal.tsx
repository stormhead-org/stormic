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
import qs from 'query-string'
import { useState } from 'react'

export const DeleteChannelModal = () => {
	const { isOpen, onClose, type, data } = useModal()
	const router = useRouter()

	const isModalOpen = isOpen && type === 'deleteChannel'
	const { server, channel } = data

	const [isLoading, setIsLoading] = useState(false)

	const onClick = async () => {
		try {
			setIsLoading(true)
			const url = qs.stringifyUrl({
				url: `/api/channels/${channel?.id}`,
				query: {
					serverId: server?.id,
				},
			})

			await axios.delete(url)

			onClose()
			router.refresh()
			router.push(`/community/servers/${server?.id}`)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className='bg-white text-black p-0 overflow-hidden dark:bg-card dark:text-zinc-200'>
				<DialogHeader className='pt-8 px-6'>
					<DialogTitle className='text-2xl text-center font-bold'>
						Удалить канал
					</DialogTitle>
					<DialogDescription className='text-center text-zinc-500'>
						Вы уверены, что хотите{' '}
						<span className='font-semibold text-rose-500'>удалить</span>{' '}
						<span className='font-semibold text-indigo-500'>
							#{channel?.name}
						</span>
						?
						<br />
						Канал будет удален без возможности восстановления
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='bg-gray-100 px-6 py-4 dark:bg-bgColorUiItem'>
					<div className='flex items-center justify-between w-full dark:text-zinc-200'>
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
