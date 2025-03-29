'use client'

import { Community, Media, Post } from '@/payload-types'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { useCurrentTime } from '@/shared/hooks/useCurrentTime'
import { createMedia } from '@/shared/utils/api/media/createMedia'
import { OutputData } from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import React, { useCallback, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { FormInput } from '../../form'
import { MetaSidebar } from '../../post-write/items/meta-sidebar'
import { SidebarProvider, SidebarTrigger } from '../../ui/sidebar'
import { formTitleSchema, TFormTitleValues } from './schemas'

interface Props {
	authorId: number
	authorAvatar: string
	authorName: string
	communities: Community[]
	post?: Post
	authorUrl: string
	open: boolean
	onClose: () => void
}

const Editor = dynamic(() => import('../../editorjs/Editor'), { ssr: false })

export const WriteModal: React.FC<Props> = ({
	authorId,
	authorAvatar,
	authorName,
	communities,
	post,
	authorUrl,
	open,
	onClose
}) => {
	const form = useForm<TFormTitleValues>({
		resolver: zodResolver(formTitleSchema),
		defaultValues: {
			title: ''
		}
	})

	const [content, setContent] = useState<OutputData | null>(null)

	const [isFullScreen, setIsFullScreen] = useState(true)

	const [selectedCommunityId, setSelectedCommunityId] = useState<number | null>(
		null
	)

	const [heroImage, setHeroImage] = useState<Media | undefined>(
		post?.heroImage && typeof post.heroImage === 'object'
			? (post.heroImage as Media)
			: undefined
	)

	const handleToggleSize = () => {
		setIsFullScreen(!isFullScreen)
	}

	const handleChange = useCallback((newContent: OutputData) => {
		setContent(newContent)
	}, [])

	const heroImageInputRef = useRef<HTMLInputElement>(null)

	const currentTime = useCurrentTime()

	const handleUploadHeroImage = async () => {
		const file = heroImageInputRef.current?.files?.[0]
		if (!file) {
			toast.error('Выберите файл для загрузки заглавного изображения', {
				icon: '⚠️'
			})
			return
		}

		const formData = new FormData()
		formData.append('file', file)

		try {
			const result = await createMedia(formData)
			const newHeroImage = result.doc
			setHeroImage(newHeroImage)
			toast.success('Изображение успешно загружено', { icon: '✅' })
		} catch (error) {
			console.error('Error uploading image:', error)
			toast.error('Ошибка при загрузке изображения', { icon: '❌' })
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (content) {
			console.log(content)
			const { title } = form.getValues()

			const postData = {
				title: title,
				heroImage: heroImage?.id,
				author: authorId,
				community: selectedCommunityId,
				content,
				publishedAt: currentTime
			}

			try {
				const response = await fetch('/api/posts', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(postData)
				})
				console.log(postData)
				if (response.ok) {
					toast.success('Пост успешно опубликован', { icon: '✅' })
					onClose()
				} else {
					toast.error('Ошибка при публикации', { icon: '❌' })
				}
			} catch (error) {
				toast.error('Ошибка при отправке запроса', { icon: '❌' })
			}
		}
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent
				className={`bg-secondary transition-all duration-300 p-2 ${
					isFullScreen ? 'min-w-[100vw] h-[100vh]' : 'min-w-[90vw] h-[90vh]'
				}`}
			>
				<SidebarProvider>
					<div className='flex gap-4'>
						{/* Левая часть */}
						<div className='w-1/4'>
							{isFullScreen && (
								<MetaSidebar
									authorName={authorName}
									authorAvatar={authorAvatar}
									communities={communities}
									selectedCommunityId={selectedCommunityId}
									setSelectedCommunityId={setSelectedCommunityId}
									heroImage={heroImage}
									setHeroImage={setHeroImage}
								/>
							)}
						</div>

						{/* Центральная часть */}
						<div className='w-2/4 h-full overflow-auto no-scrollbar rounded-md'>
							<div className='p-2'>
								{isFullScreen && <SidebarTrigger />}
								<FormProvider {...form}>
									<form>
										<FormInput
											name='title'
											placeholder='Заголовок'
											className='bg-transparent'
											required
										/>
									</form>
								</FormProvider>
								<form onSubmit={handleSubmit}>
									<div
										className={`${
											isFullScreen
												? 'min-w-[100vw] h-[56vh] overflow-auto bg-red-600'
												: 'w-[90vw] h-[46vh] overflow-auto'
										}`}
									>
										<Editor
											data={content}
											onChange={handleChange}
											holder='editorjs'
											className='w-full bg-blue-600'
										/>
									</div>
									<Button variant='blue' type='submit' className='mt-4'>
										Опубликовать
									</Button>
								</form>
							</div>
						</div>

						{/* Правая часть */}
						<div className='w-1/4'></div>
					</div>
				</SidebarProvider>
				{/* <SidebarTrigger className='absolute top-4 right-20' /> */}
				{/* {isFullScreen ? (
					<Minimize2
						onClick={handleToggleSize}
						className='cursor-pointer absolute top-4 right-10 hover:text-a-color'
						size={15}
					/>
				) : (
					<Maximize2
						onClick={handleToggleSize}
						className='cursor-pointer absolute top-4 right-10 hover:text-a-color'
						size={15}
					/>
				)} */}
			</DialogContent>
		</Dialog>
	)
}
