'use client'

import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/shared/components/ui/dialog'
import { useModal } from '@/shared/hooks/use-modal-store'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useState } from 'react'

export const DeleteCommentModal = () => {
	const { isOpen, onClose, type, data } = useModal()
	const router = useRouter()
	
	const isModalOpen = isOpen && type === 'deleteComment'
	const { apiUrl, query } = data
	
	const [isLoading, setIsLoading] = useState(false)
	
	const onClick = async () => {
		try {
			setIsLoading(true)
			const url = qs.stringifyUrl({
				url: apiUrl || '',
				query
			})
			
			await axios.delete(url)
			
			onClose()
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}
	
	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className='p-0 overflow-hidden'>
				<DialogHeader className='pt-8 px-6'>
					<DialogTitle className='text-2xl text-center font-bold'>
						Удалить комментарий
					</DialogTitle>
					<DialogDescription className='text-center text-zinc-500'>
						Вы уверены, что хотите удалить комментарий?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='bg-secondary px-6 py-4'>
					<div className='flex items-center justify-between w-full dark:text-zinc-200'>
						<Button disabled={isLoading} variant='secondary' onClick={onClick}>
							Да
						</Button>
						<Button disabled={isLoading} onClick={onClose} variant='blue'>
							Нет
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
