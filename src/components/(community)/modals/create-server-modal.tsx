'use client'

import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useModal } from '@/hooks/use-modal-store'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
	name: z.string().min(1, {
		message: 'Название сервера - обязательно',
	}),
	imageUrl: z.string().min(1, {
		message: 'Логотип сервера - обязательный',
	}),
	imageSrvUrl: z.string().min(1, {
		message: 'Баннер сервера - обязательный',
	}),
})

export const CreateServerModal = () => {
	const { isOpen, onClose, type } = useModal()
	const isModalOpen = isOpen && type === 'createServer'
	const router = useRouter()

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			imageUrl: '',
			imageSrvUrl: '',
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.post('/api/servers', values)
			form.reset()
			router.refresh()
			onClose()
		} catch (error) {
			console.log(error)
		}
	}

	const handleClose = () => {
		form.reset()
		onClose()
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={handleClose}>
			<DialogContent className='bg-white text-black p-0 overflow-hidden'>
				<DialogHeader className='pt-8 px-6'>
					<DialogTitle className='text-2xl text-center font-bold'>
						Создание нового сервера
					</DialogTitle>
					<DialogDescription className='text-center text-zinc-500'>
						Разнообразьте свой сервер, добавив ему название, логотип и
						уникальный баннер. Вы всегда сможете изменить это позднее
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<div className='space-y-8 px-6'>
							<div className='flex justify-evenly'>
								<div className='text-center mb-2'>
									<DialogDescription className='text-center text-zinc-500 mb-2 dark:text-zinc-200'>
										Логотип
									</DialogDescription>
									<div className='flex items-center justify-center text-center'>
										<FormField
											control={form.control}
											name='imageUrl'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<FileUpload
															endpoint='serverImage'
															value={field.value}
															onChange={field.onChange}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								</div>
								<div className='text-center mb-2'>
									<DialogDescription className='text-center text-zinc-500 mb-2 dark:text-zinc-200'>
										Баннер (16x9)
									</DialogDescription>
									<div className='flex items-center justify-center text-center'>
										<FormField
											control={form.control}
											name='imageSrvUrl'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<FileUpload
															endpoint='serverBanner'
															value={field.value}
															onChange={field.onChange}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>

							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-zinc-200'>
											Название сервера
										</FormLabel>
										<FormControl>
											<Input
												disabled={isLoading}
												className='bg-zinc-300/50 border-0 focus-visible:ring-offset-0'
												placeholder='Название сервера'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter className='bg-gray-100 px-6 py-4'>
							<Button variant='primary' disabled={isLoading}>
								Создать
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
