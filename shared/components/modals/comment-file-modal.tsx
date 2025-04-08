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
import {
	Form,
	FormControl,
	FormField,
	FormItem
} from '@/shared/components/ui/form'
import { useModal } from '@/shared/hooks/use-modal-store'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
	fileUrl: z.string().min(1, {
		message: 'Прикрепите файл'
	})
})

export const CommentFileModal = () => {
	const { isOpen, onClose, type, data } = useModal()
	const router = useRouter()

	const isModalOpen = isOpen && type === 'messageFile'
	const { apiUrl, query } = data

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fileUrl: ''
		}
	})

	const handleClose = () => {
		form.reset(), onClose()
	}

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const url = qs.stringifyUrl({
				url: apiUrl || '',
				query
			})

			await axios.post(url, {
				...values,
				content: values.fileUrl
			})

			form.reset()
			router.refresh()
			handleClose()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={handleClose}>
			<DialogContent className='p-0 overflow-hidden'>
				<DialogHeader className='pt-8 px-6'>
					<DialogTitle className='text-2xl text-center font-bold'>
						Прикрепить файл
					</DialogTitle>
					<DialogDescription className='text-center text-zinc-500'>
						Отправить файл в сообщении
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<div className='space-y-8 px-6'>
							<div className='flex items-center justify-center text-center'>
								<FormField
									control={form.control}
									name='fileUrl'
									render={({ field }) => (
										<FormItem>
											<FormControl>Загрузка файла</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</div>
						<DialogFooter className='bg-secondary px-6 py-4'>
							<Button variant='blue' disabled={isLoading}>
								Отправить
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
