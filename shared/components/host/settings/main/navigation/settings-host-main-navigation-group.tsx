'use client'

import { Post, SidebarNavigation, User } from '@/payload-types'
import { Container, Title } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { updateSidebarNavigation } from '@/shared/utils/api/host/updateSidebarNavigation'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface Props {
	initialData: SidebarNavigation
	posts: Post[]
}

export const SettingsHostMainNavigationGroup: React.FC<Props> = ({
	initialData,
	posts
}) => {
	const form = useForm<{ items: { post: number }[] }>({
		defaultValues: {
			items: (initialData.items || []).map(item => ({
				post:
					typeof item.post === 'object' && item.post
						? (item.post as Post).id
						: (item.post as number)
			}))
		}
	})
	const router = useRouter()

	const {
		fields: itemFields,
		append: appendItem,
		remove: removeItem
	} = useFieldArray({
		control: form.control,
		name: 'items'
	})

	const [searchQuery, setSearchQuery] = useState('')

	// Фильтрация постов: по поисковому запросу и исключая уже добавленные посты
	const searchResults = useMemo(() => {
		if (searchQuery.trim() === '') return []
		const addedPostIds = new Set(itemFields.map(field => field.post))
		return posts.filter(
			post =>
				post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
				!addedPostIds.has(post.id)
		)
	}, [searchQuery, posts, itemFields])

	// Добавление поста в массив
	const handleAddPost = (post: Post) => {
		if (itemFields.length >= 10) {
			toast.error('Максимум 10 постов в навигации', { icon: '⚠️' })
			return
		}
		appendItem({ post: post.id })
		setSearchQuery('') // Очистка поля поиска после добавления
	}

	// Удаление поста из массива
	const handleRemovePost = (index: number) => {
		removeItem(index)
	}

	// Получение заголовка поста по ID
	const getPostTitle = (postId: number) => {
		const post = posts.find(p => p.id === postId)
		return post ? post.title : `Пост ID: ${postId}`
	}

	// Получение аватарки автора по ID поста
	const getAuthorAvatar = (postId: number) => {
		const post = posts.find(p => p.id === postId)
		if (!post || !post.author || typeof post.author !== 'object') {
			return '/logo.png' // Запасной URL
		}
		const author = post.author as User
		return getMediaUrl(author.avatar, '/logo.png')
	}

	// Сохранение изменений
	const onSubmit = async (data: { items: { post: number }[] }) => {
		try {
			console.log('Submitting items:', data.items)
			await updateSidebarNavigation(data.items)
			toast.success('Навигация успешно обновлена', { icon: '✅' })
			router.refresh()
		} catch (error) {
			console.error('Ошибка при сохранении навигации:', error)
			toast.error('Ошибка при обновлении навигации', { icon: '❌' })
		}
	}

	// Отладка
	console.log('initialData.items:', initialData.items)
	console.log('itemFields:', itemFields)

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<Container className='bg-secondary rounded-md mt-1 p-4'>
				<p className='text-justify'>
					Добавьте до 10 постов в левое меню навигации. Используйте поиск, чтобы
					найти нужные посты.
				</p>
				
				<div className='w-full border-b-2 border-b-blue-600 pb-4'>
					<Title
						// text={formatMessage({ id: 'profilePageEditGroup.titleBaseInfo' })}
						text='Редактирование навигации'
						size='sm'
						className='mt-2'
					/>
				</div>

				{/* Поиск постов */}
				<div className='mt-4'>
					<p>
						Поиск постов
					</p>
					<Input
						id='search'
						type='text'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						placeholder='Введите заголовок поста'
						className='mt-2'
					/>
				</div>

				{/* Результаты поиска */}
				{searchResults.length > 0 && (
					<div className='mt-4'>
						<p>Результаты поиска:</p>
						{searchResults.map(post => (
							<div
								key={post.id}
								className='flex items-center gap-4 border p-2 rounded-md mt-2'
							>
								<img
									src={getAuthorAvatar(post.id)}
									alt='Author avatar'
									className='w-8 h-8 rounded-full object-cover'
								/>
								<span className='flex-1'>{post.title}</span>
								<Button
									variant='blue'
									type='button'
									onClick={() => handleAddPost(post)}
								>
									Добавить
								</Button>
							</div>
						))}
					</div>
				)}

				{/* Добавленные посты */}
				<div className='mt-4'>
					<p>Добавленные посты:</p>
					{itemFields.length === 0 && (
						<p className='text-gray-400'>Пока нет добавленных постов</p>
					)}
					{itemFields.map((field, index) => (
						<div
							key={field.id}
							className='flex items-center gap-4 border p-2 rounded-md mt-2'
						>
							<img
								src={getAuthorAvatar(field.post)}
								alt='Author avatar'
								className='w-8 h-8 rounded-full object-cover'
							/>
							<span className='flex-1'>{getPostTitle(field.post)}</span>
							<Button
								variant='destructive'
								type='button'
								onClick={() => handleRemovePost(index)}
							>
								Удалить
							</Button>
						</div>
					))}
				</div>

				{/* Кнопка сохранения */}
				<Button
					variant='blue'
					loading={form.formState.isSubmitting}
					className='text-base mt-6 w-full'
					type='submit'
				>
					Сохранить
				</Button>
			</Container>
		</form>
	)
}
