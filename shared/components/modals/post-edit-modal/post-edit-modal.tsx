'use client'

import { Community, Media, Post } from '@/payload-types'
import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/shared/components/ui/dialog'
import { useCurrentTime } from '@/shared/hooks/useCurrentTime'
import {
	deletePost,
	removePostFromPublication,
	restorePost
} from '@/shared/utils/api/posts/post-utils'
import { OutputData } from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { FormInput } from '../../form'
import { MetaSidebar } from '../../post-edit/items/meta-sidebar'
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

export const PostEditModal: React.FC<Props> = ({
	authorId,
	authorAvatar,
	authorName,
	communities,
	post,
	authorUrl,
	open,
	onClose
}) => {
	const router = useRouter()

	const form = useForm<TFormTitleValues>({
		resolver: zodResolver(formTitleSchema),
		defaultValues: { title: post?.title || '' }
	})

	const [content, setContent] = useState<OutputData | null>(
		post?.content ? (post.content as unknown as OutputData) : null
	)
	const [selectedCommunityId, setSelectedCommunityId] = useState<number | null>(
		post?.community && typeof post.community === 'object'
			? post.community.id
			: null
	)
	const [heroImage, setHeroImage] = useState<Media | undefined>(
		post?.heroImage && typeof post.heroImage === 'object'
			? (post.heroImage as Media)
			: undefined
	)
	const [seotitle, setSeoTitle] = useState<string>(post?.meta?.title || '')
	const [seodescription, setSeoDescription] = useState<string>(
		post?.meta?.description || ''
	)
	const [seoImage, setSeoImage] = useState<Media | undefined>(
		post?.meta?.image && typeof post.meta.image === 'object'
			? (post.meta.image as Media)
			: undefined
	)

	const handleChange = useCallback((newContent: OutputData) => {
		setContent(newContent)
	}, [])

	const currentTime = useCurrentTime()

	const savePost = async (action: 'publish' | 'draft') => {
		if (!content) return

		const postData = {
			title: form.getValues().title,
			heroImage: heroImage?.id,
			author: authorId,
			community: selectedCommunityId,
			content,
			meta: {
				title: seotitle,
				description: seodescription,
				image: seoImage?.id
			},
			publishedAt:
				action === 'publish'
					? post?.publishedAt || currentTime
					: post?.publishedAt,
			_status: action === 'publish' ? 'published' : 'draft',
			hasDeleted: post?.hasDeleted ?? false
		}

		try {
			const url = post ? `/api/posts/${post.id}` : '/api/posts'
			const method = post ? 'PATCH' : 'POST'
			const response = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(postData)
			})
			if (response.ok) {
				toast.success(
					action === 'publish'
						? post
							? 'Пост успешно опубликован'
							: 'Пост успешно опубликован'
						: post
							? 'Черновик успешно обновлен'
							: 'Черновик успешно сохранен',
					{ icon: '✅' }
				)
				onClose()
				router.refresh()
			} else {
				toast.error('Ошибка при сохранении', { icon: '❌' })
			}
		} catch (error) {
			toast.error('Ошибка при отправке запроса', { icon: '❌' })
		}
	}

	const handlePublish = async (e: React.FormEvent) => {
		e.preventDefault()
		await savePost('publish')
	}

	const handleSaveDraft = async (e: React.FormEvent) => {
		e.preventDefault()
		if (post && post._status === 'published') {
			await removePostFromPublication(post, router)
		} else {
			await savePost('draft')
		}
	}

	const handleToggleDelete = async (e: React.FormEvent) => {
		e.preventDefault()
		if (post) {
			if (post.hasDeleted) {
				await restorePost(post, router) // Используем утилиту для восстановления
			} else {
				await deletePost(post, router) // Используем утилиту для удаления
			}
		}
	}

	const isExistingPostPublished = post?._status === 'published'
	const isPostDeleted = post?.hasDeleted ?? false

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='bg-secondary p-4 w-full max-w-[100vw] h-[100vh] flex flex-col m-0'>
				<DialogHeader className='hidden'>
					<DialogTitle />
				</DialogHeader>
				<SidebarProvider>
					<div className='flex h-full w-full'>
						<MetaSidebar
							authorName={authorName}
							authorAvatar={authorAvatar}
							communities={communities}
							selectedCommunityId={selectedCommunityId}
							setSelectedCommunityId={setSelectedCommunityId}
							heroImage={heroImage}
							setHeroImage={setHeroImage}
							seotitle={seotitle}
							setSeoTitle={setSeoTitle}
							seodescription={seodescription}
							setSeoDescription={setSeoDescription}
							seoImage={seoImage}
							setSeoImage={setSeoImage}
							className='w-64 flex-shrink-0'
						/>
						<div className='flex-1 flex flex-col items-center p-4'>
							<div className='w-full max-w-3xl flex flex-col h-full'>
								<SidebarTrigger className='mb-4' />
								<div className='flex-1 overflow-y-auto space-y-1'>
									<FormProvider {...form}>
										<form>
											<FormInput
												name='title'
												placeholder='Заголовок'
												className='bg-transparent text-lg border-none focus:ring-0 placeholder-gray-500'
												required
											/>
										</form>
									</FormProvider>
									<div className='flex-1'>
										<Editor
											data={content}
											onChange={handleChange}
											holder='editorjs'
											className='w-full h-full'
										/>
									</div>
								</div>
								<div className='my-4 flex justify-start gap-4'>
									{!isPostDeleted && (
										<>
											<Button
												variant='blue'
												type='submit'
												onClick={handlePublish}
												className='px-10'
											>
												{post && isExistingPostPublished
													? 'Сохранить изменения'
													: 'Опубликовать'}
											</Button>
											<Button
												variant='outline'
												type='submit'
												onClick={handleSaveDraft}
												className='px-10'
											>
												{post && isExistingPostPublished
													? 'Снять с публикации'
													: 'Сохранить черновик'}
											</Button>
										</>
									)}
									{post && (
										<Button
											variant={isPostDeleted ? 'outline' : 'destructive'}
											type='submit'
											onClick={handleToggleDelete}
											className='px-10'
										>
											{isPostDeleted ? 'Вернуть пост' : 'Удалить'}
										</Button>
									)}
								</div>
							</div>
						</div>
					</div>
				</SidebarProvider>
			</DialogContent>
		</Dialog>
	)
}
