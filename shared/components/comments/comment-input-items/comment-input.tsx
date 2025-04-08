'use client'

import { Media } from '@/payload-types'
import { EmojiPicker } from '@/shared/components/emoji-picker'
import {
	Form,
	FormControl,
	FormField,
	FormItem
} from '@/shared/components/ui/form'
import { useModal } from '@/shared/hooks/use-modal-store'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { ImageUploader } from './image-uploader'

interface ChatInputProps {
	apiUrl: string
	query: Record<string, any>
}

const formSchema = z.object({
	content: z.string().min(1)
})

export const CommentInput = ({ apiUrl, query }: ChatInputProps) => {
	const { onOpen } = useModal()
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: ''
		}
	})

	const [commentImage, setCommentImage] = useState<Media | undefined>(undefined)
	const [isUploading, setIsUploading] = useState(false)

	const isLoading = form.formState.isSubmitting || isUploading

	const handleRemove = () => {
		setCommentImage(undefined)
	}

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const url = qs.stringifyUrl({
				url: apiUrl,
				query
			})
			const data = {
				content: values.content,
				media: commentImage?.id || null // Отправляем ID изображения
			}
			console.log('Отправляемые данные:', data) // Логируем для отладки
			await axios.post(url, data)
			form.reset()
			setCommentImage(undefined)
			router.refresh()
		} catch (error) {
			console.log('Ошибка при отправке:', error)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className='relative p-4 pb-6'>
									<div className='flex group cursor-pointer items-center'>
										<ImageUploader
											setCommentImage={setCommentImage}
											setIsUploading={setIsUploading}
										/>
									</div>
									<Input
										disabled={isLoading}
										className='px-14 py-6 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
										placeholder='Оставить комментарий'
										{...field}
									/>
									<div className='absolute top-7 right-8'>
										<EmojiPicker
											onChange={(emoji: string) =>
												field.onChange(`${field.value} ${emoji}`)
											}
										/>
									</div>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>
				{commentImage && (
					<div
						className='relative w-full h-32 bg-secondary rounded-md flex items-center justify-center cursor-pointer px-2'
						style={{
							backgroundImage: commentImage
								? `url(${commentImage.url})`
								: undefined,
							backgroundSize: 'cover',
							backgroundPosition: 'center'
						}}
					>
						{commentImage && (
							<button
								className='bg-red-500 text-primary p-1 rounded-full'
								onClick={e => {
									e.stopPropagation()
									handleRemove()
								}}
							>
								<X size={36} />
							</button>
						)}
						{isUploading && (
							<div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
								<p className='text-white'>Загрузка...</p>
							</div>
						)}
					</div>
				)}
				<Button type='submit' disabled={isLoading}>
					{isUploading ? 'Загрузка...' : 'Отправить'}
				</Button>
			</form>
		</Form>
	)
}
