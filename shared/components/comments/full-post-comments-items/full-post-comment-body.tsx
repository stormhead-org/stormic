import { Media } from '@/payload-types'
import CommentImageGallery from '@/shared/components/comments/comment-image-gallery'
import { CommentInputAnswer } from '@/shared/components/comments/comment-input-items/comment-input-answer'
import { EmojiPicker } from '@/shared/components/emoji-picker'
import { Button } from '@/shared/components/ui/button'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle
} from '@/shared/components/ui/drawer'
import {
	Form,
	FormControl,
	FormField,
	FormItem
} from '@/shared/components/ui/form'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import { cn } from '@/shared/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Link2, X } from 'lucide-react'
import Link from 'next/link'
import qs from 'query-string'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FormTextarea } from '../../form'
import { ImageUploader } from '../comment-input-items/image-uploader'

export interface CommentItemProps {
	id: string
	content: string
	media?: Media
	deleted: boolean
	isUpdated: boolean
	socketUrl: string
	socketQuery: Record<string, string>
	isEditing: boolean
	setIsEditing: (isEditing: boolean) => void
	className?: string
}

const formSchema = z.object({
	content: z.string().min(1)
})

export const FullPostCommentBody: React.FC<CommentItemProps> = ({
	id,
	content,
	media,
	deleted,
	isUpdated,
	socketUrl,
	socketQuery,
	isEditing,
	setIsEditing,
	className
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: content
		}
	})

	const [commentImage, setCommentImage] = useState<Media | undefined>(
		media || undefined
	)
	const [isUploading, setIsUploading] = useState(false)

	const isLoading = form.formState.isSubmitting || isUploading

	const isMobile = useIsMobile()

	useEffect(() => {
		form.reset({ content })
		setCommentImage(media || undefined)
	}, [content, media, form])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' || event.keyCode === 27) {
				setIsEditing(false)
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [setIsEditing])

	const handleRemove = () => {
		setCommentImage(undefined)
	}

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const url = qs.stringifyUrl({
				url: `${socketUrl}/${id}`,
				query: socketQuery
			})
			const data = {
				content: values.content,
				media: commentImage?.id || null,
				hasUpdated: true
			}
			await axios.patch(url, data)
			setIsEditing(false)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={cn('mt-2', className)}>
			{!isEditing && (
				<p className={cn(deleted && 'italic text-zinc-500 dark:text-zinc-400')}>
					{content}
					{isUpdated && !deleted && (
						<span className='text-[10px] mx-2 text-zinc-500 dark:text-zinc-400'>
							(ред.)
						</span>
					)}
				</p>
			)}
			{isEditing &&
				(!isMobile ? (
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name='content'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className='relative p-2 lg:p-4 lg:pb-2'>
												<div className='flex pl-3 lg:pl-0 gap-4 lg:block lg:absolute lg:z-10 lg:top-[3.2rem] lg:left-8'>
													<div className='cursor-pointer'>
														<EmojiPicker
															onChange={(emoji: string) =>
																field.onChange(`${field.value} ${emoji}`)
															}
														/>
													</div>
													<div className='group cursor-pointer -mt-[0.1rem] lg:mt-0 lg:-ml-[0.1rem]'>
														<ImageUploader
															setCommentImage={setCommentImage}
															setIsUploading={setIsUploading}
														/>
													</div>
												</div>
												<FormTextarea
													className='lg:px-14 py-6 rounded-xl bg-secondary lg:bg-background'
													placeholder='Редактировать комментарий'
													loading={isLoading}
													variant='blue'
													{...field}
												/>
											</div>
										</FormControl>
									</FormItem>
								)}
							/>
							{commentImage && (
								<div
									className='relative w-24 h-16 rounded-xl flex items-center justify-center cursor-pointer px-2 ml-4 mb-4'
									style={{
										backgroundImage: commentImage
											? `url(${commentImage.url})`
											: undefined,
										backgroundSize: 'cover',
										backgroundPosition: 'center'
									}}
								>
									<button
										className='bg-red-500 text-foreground p-1 rounded-xl'
										onClick={e => {
											e.stopPropagation()
											handleRemove()
										}}
									>
										<X size={36} />
									</button>
								</div>
							)}
						</form>
						<span className='text-[14px] mt-1 text-zinc-400'>
							Нажмите Esc для отмены
						</span>
						<div className='mx-2 lg:mx-4'>
							<Button
								variant='blue'
								className='w-full h-12 my-2 text-base font-bold rounded-xl text-background'
								loading={isLoading}
								type='button'
								onClick={form.handleSubmit(onSubmit)}
							>
								{/* {formatMessage({ id: 'newPostButton' })} */}
								<span>Сохранить</span>
							</Button>
						</div>
					</Form>
				) : (
					<Drawer open={isEditing} onOpenChange={() => setIsEditing(false)}>
						<DrawerContent className={cn(className, '')}>
							<DrawerHeader className='hidden'>
								<DrawerTitle />
							</DrawerHeader>
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)}>
									<FormField
										control={form.control}
										name='content'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className='relative p-2 lg:p-4 lg:pb-2'>
														<div className='flex pl-3 lg:pl-0 gap-4 lg:block lg:absolute lg:z-10 lg:top-[3.2rem] lg:left-8'>
															<div className='cursor-pointer'>
																<EmojiPicker
																	onChange={(emoji: string) =>
																		field.onChange(`${field.value} ${emoji}`)
																	}
																/>
															</div>
															<div className='group cursor-pointer -mt-[0.1rem] lg:mt-0 lg:-ml-[0.1rem]'>
																<ImageUploader
																	setCommentImage={setCommentImage}
																	setIsUploading={setIsUploading}
																/>
															</div>
														</div>
														<FormTextarea
															className='lg:px-14 py-6 rounded-xl bg-secondary lg:bg-background'
															placeholder='Редактировать комментарий'
															loading={isLoading}
															variant='blue'
															{...field}
														/>
													</div>
												</FormControl>
											</FormItem>
										)}
									/>
									{commentImage && (
										<div
											className='relative w-24 h-16 rounded-xl flex items-center justify-center cursor-pointer px-2 ml-4 mb-4'
											style={{
												backgroundImage: commentImage
													? `url(${commentImage.url})`
													: undefined,
												backgroundSize: 'cover',
												backgroundPosition: 'center'
											}}
										>
											<button
												className='bg-red-500 text-foreground p-1 rounded-xl'
												onClick={e => {
													e.stopPropagation()
													handleRemove()
												}}
											>
												<X size={36} />
											</button>
										</div>
									)}
								</form>
								<div className='mx-2 lg:mx-4'>
									<Button
										variant='blue'
										className='w-full h-12 my-2 text-base font-bold rounded-xl text-background'
										type='button'
										loading={isLoading}
										onClick={form.handleSubmit(onSubmit)}
									>
										{/* {formatMessage({ id: 'newPostButton' })} */}
										<span>Сохранить</span>
									</Button>
								</div>
							</Form>
						</DrawerContent>
					</Drawer>
				))}
			{!isEditing && media && (
				<div className=''>
					<div className='relative rounded-md overflow-hidden flex items-center justify-center bg-primary/10 mb-1 mt-2 h-60 w-full'>
						{media?.url && (
							<div>
								<CommentImageGallery images={[media.url]} />
								<Link
									href={media.url}
									target='_blank'
									rel='noopener noreferrer'
									className='absolute bottom-2 right-2 rounded-md bg-secondary p-1 cursor-pointer text-foreground'
								>
									<Link2 />
								</Link>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
