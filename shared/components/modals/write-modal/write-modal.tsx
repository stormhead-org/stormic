'use client'

import { Community, Media, Post } from '@/payload-types'
import { PostWriteHeader } from '@/shared/components/post-write/items/post-write-header'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { useCurrentTime } from '@/shared/hooks/useCurrentTime'
import { createMedia } from '@/shared/utils/api/media/createMedia'
import { OutputData } from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { Maximize2, Minimize2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import React, { useCallback, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { FormInput } from '../../form'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
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

// const EditorWithContext: React.FC<{
// 	onSave: (content: any) => void
// 	isFullScreen: boolean
// }> = ({ onSave, isFullScreen }) => {
// 	const [editor] = useLexicalComposerContext()

// 	const handleSave = () => {
// 		const editorState = editor.getEditorState()
// 		const jsonState = editorState.toJSON()
// 		onSave(jsonState)
// 	}

// 	return (
// 		<>
// 			<div
// 				className={`max-w-[74rem] my-2 ${
// 					isFullScreen ? 'min-w-full min-h-full' : 'min-w-[71rem] min-h-[20rem]'
// 				}`}
// 			>
// 				<Editor />
// 			</div>
// 			<Button onClick={handleSave} variant='blue' className='my-4 px-4 py-2'>
// 				Опубликовать
// 			</Button>
// 		</>
// 	)
// }

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

	const handleChange = useCallback((newContent: OutputData) => {
		setContent(newContent)
	}, [])

	const [isFullScreen, setIsFullScreen] = useState(false)

	const [selectedCommunityId, setSelectedCommunityId] = useState<number | null>(
		null
	)

	const [heroImage, setHeroImage] = useState<Media | undefined>(
		post?.heroImage && typeof post.heroImage === 'object'
			? (post.heroImage as Media)
			: undefined
	)

	const heroImageInputRef = useRef<HTMLInputElement>(null)

	const currentTime = useCurrentTime()

	const handleToggleSize = () => {
		setIsFullScreen(!isFullScreen)
	}

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

	// const handleSave = async (content: any) => {
	// 	if (!content?.root?.children?.length) {
	// 		console.error('Контент пустой')
	// 		return
	// 	}

	// 	const { title } = form.getValues()

	// 	const postData = {
	// 		title: title,
	// 		heroImage: heroImage?.id,
	// 		author: authorId,
	// 		community: selectedCommunityId,
	// 		content,
	// 		publishedAt: currentTime
	// 	}

	// 	try {
	// 		const response = await fetch('/api/posts', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify(postData)
	// 		})
	// 		console.log(postData)
	// 		if (response.ok) {
	// 			console.log('Пост успешно опубликован')
	// 			onClose()
	// 		} else {
	// 			console.error('Ошибка при публикации:', response.statusText)
	// 		}
	// 	} catch (error) {
	// 		console.error('Ошибка при отправке запроса:', error)
	// 	}
	// }

	// const initialConfig = {
	// 	namespace: 'NewPost',
	// 	nodes: [...PlaygroundNodes],
	// 	theme: PlaygroundEditorTheme,
	// 	onError: (error: Error) => {
	// 		console.error(error)
	// 	}
	// }

	let Editor = dynamic(() => import('../../editorjs/Editor'), { ssr: false })

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
					console.log('Пост успешно опубликован')
					onClose()
				} else {
					console.error('Ошибка при публикации:', response.statusText)
				}
			} catch (error) {
				console.error('Ошибка при отправке запроса:', error)
			}
		}
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent
				className={`bg-secondary transition-all duration-300-p-2 ${
					isFullScreen ? 'min-w-full min-h-full' : 'min-w-[75rem] min-h-[20rem]'
				}`}
			>
				{isFullScreen ? (
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
				)}
				<div className='flex mx-auto'>
					<div className='p-2'>
						<PostWriteHeader
							authorName={authorName}
							authorUrl={authorUrl}
							authorAvatar={authorAvatar}
							communities={communities}
							selectedCommunityId={selectedCommunityId}
							setSelectedCommunityId={setSelectedCommunityId}
						/>
						<div className='flex w-full max-w-sm items-end space-x-2 mt-2'>
							<Avatar>
								<AvatarImage src={heroImage?.url || ''} />
								<AvatarFallback>SH</AvatarFallback>
							</Avatar>
							<div className='grid w-full max-w-sm items-center gap-1.5'>
								<Label htmlFor='heroImage'>Заглавное изображение</Label>
								<Input
									id='heroImage'
									type='file'
									accept='image/*'
									ref={heroImageInputRef}
								/>
							</div>
							<Button
								variant='blue'
								type='button'
								onClick={handleUploadHeroImage}
							>
								Загрузить
							</Button>
						</div>
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
							<Editor
								data={content}
								onChange={handleChange}
								holder='editor_create'
							/>
							<button type='submit'>Создать пост</button>
						</form>
						{/* <LexicalComposer initialConfig={initialConfig}>
							<SharedHistoryContext>
								<ToolbarContext>
									<div className='min-h-[20rem] max-w-[74rem]'>
										<EditorWithContext
											onSave={handleSave}
											isFullScreen={isFullScreen}
										/>
									</div>
								</ToolbarContext>
							</SharedHistoryContext>
						</LexicalComposer> */}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
