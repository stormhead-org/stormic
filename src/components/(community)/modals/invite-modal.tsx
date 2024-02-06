'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useModal } from '@/hooks/use-modal-store'
import { useOrigin } from '@/hooks/use-origin'
import axios from 'axios'
import { Check, Copy, RefreshCw } from 'lucide-react'
import { useState } from 'react'

export const InviteModal = () => {
	const { onOpen, isOpen, onClose, type, data } = useModal()
	const origin = useOrigin()

	const isModalOpen = isOpen && type === 'invite'
	const { server } = data

	const [copied, setCopied] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const inviteUrl = `${origin}/community/invite/${server?.inviteCode}`

	const onCopy = () => {
		navigator.clipboard.writeText(inviteUrl)
		setCopied(true)

		setTimeout(() => {
			setCopied(false)
		}, 1000)
	}

	const onNew = async () => {
		try {
			setIsLoading(true)
			const response = await axios.patch(
				`/api/servers/${server?.id}/invite-code`
			)

			onOpen('invite', { server: response.data })
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
						Создать приглашение
					</DialogTitle>
				</DialogHeader>
				<div className='p-6'>
					<Label className='uppercase text-xs font-bold text-zinc-500 dark:text-zinc-200'>
						Ссылка на приглашение
					</Label>
					<div className='flex items-center mt-2 gap-x-2'>
						<Input
							readOnly
							disabled={isLoading}
							className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
							value={inviteUrl}
						/>
						<Button
							className='dark:bg-bgColorUiItem/60 dark:hover:bg-bgColorUiItem'
							disabled={isLoading}
							onClick={onCopy}
							size='icon'
						>
							{copied ? <Check /> : <Copy className='w-4 h-4 text-white' />}
						</Button>
					</div>
					<Button
						onClick={onNew}
						disabled={isLoading}
						variant='link'
						size='sm'
						className='text-xs text-zinc-500 mt-4'
					>
						Создать новое приглашение
						<RefreshCw className='w-4 h-4 ml-2' />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
