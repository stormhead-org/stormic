import CommentImageGallery from '@/shared/components/comments/comment-image-gallery'
import { EmojiPicker } from '@/shared/components/emoji-picker'
import { Button } from '@/shared/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { FileIcon, Link2 } from 'lucide-react'
import qs from 'query-string'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export interface CommentItemProps {
	id: string
	content: string
	fileUrl: string | null
	deleted: boolean
	isUpdated: boolean
	socketUrl: string
	socketQuery: Record<string, string>
	isEditing: boolean
	setIsEditing: (isEditing: boolean) => void;
	className?: string
}

const formSchema = z.object({
	content: z.string().min(1)
})

export const FullPostCommentBody: React.FC<CommentItemProps> = ({
	                                                                id,
	                                                                content,
	                                                                fileUrl,
	                                                                deleted,
	                                                                isUpdated,
	                                                                socketUrl,
	                                                                socketQuery,
	                                                                isEditing,
	                                                                setIsEditing,
	                                                                className
                                                                }) => {
	
	useEffect(() => {
		const handleKeyDown = (event: any) => {
			if (event.key === 'Escape' || event.keyCode === 27) {
				setIsEditing(false)
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		
		return () => window.removeEventListener('keyDown', handleKeyDown)
	}, [])
	
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: content
		}
	})
	
	const isLoading = form.formState.isSubmitting
	
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const url = qs.stringifyUrl({
				url: `${socketUrl}/${id}`,
				query: socketQuery
			})
			
			await axios.patch(url, values)
			
			form.reset()
			setIsEditing(false)
		} catch (error) {
			console.log(error)
		}
	}
	
	useEffect(() => {
		form.reset({
			content: content
		})
	}, [content])
	
	const fileType = fileUrl?.split('.').pop()
	const isPDF = fileType === 'pdf' && fileUrl
	const isImage = !isPDF && fileUrl
	
	return (
		<>
			<div className={cn('mt-2', className)}>
				{isImage && (
					<div
						className=''
					>
						<div
							className='relative rounded-md overflow-hidden flex items-center justify-center bg-primary/10 p-1 mb-1'>
							<CommentImageGallery images={fileUrl ? [fileUrl] : []} />
							<a
								href={fileUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='absolute bottom-2 right-2 rounded-md bg-secondary p-1 cursor-pointer'
							>
								<Link2 />
							</a>
							{/* <img */}
							{/* 	src={fileUrl} */}
							{/* 	alt={content} */}
							{/* 	sizes='100%' */}
							{/* 	className='object-contain rounded-md' */}
							{/* /> */}
						</div>
					
					</div>
				
				)}
				{isPDF && (
					<div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10'>
						<FileIcon className='h-10 w-10 fill-indigo-200 stroke-indigo-400' />
						<a
							href={fileUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
						>
							PDF файл
						</a>
					</div>
				)}
				{!fileUrl && !isEditing && (
					<p
						className={cn(deleted && 'italic text-zinc-500 dark:text-zinc-400'
						)}
					>
						{content}
						{isUpdated && deleted && (
							<span className='text-[10px] mx-2 text-zinc-500 dark:text-zinc-400'>
										(ред.)
							</span>
						)}
					</p>
				)}
				{!fileUrl && isEditing && (
					<Form {...form}>
						<form
							className='flex items-center w-full gap-x-2 pt-2'
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<FormField
								control={form.control}
								name='content'
								render={({ field }) => (
									<FormItem className='flex-1'>
										<FormControl>
											<div className='relative w-full'>
												<Input
													disabled={isLoading}
													className='py-2 pl-2 pr-10 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
													placeholder='Edited message'
													{...field}
												/>
												<div className='absolute top-2 right-2'>
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
							<Button disabled={isLoading} size='sm' variant='blue'>
								Сохранить
							</Button>
						</form>
						<span className='text-[10px] mt-1 text-zinc-400'>
									Нажмите Esc для отмены, enter чтобы сохранить
								</span>
					</Form>
				)}
			</div>
		</>
	)
}
