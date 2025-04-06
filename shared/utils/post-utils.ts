'use client'

import { Post } from '@/payload-types'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Router = ReturnType<typeof useRouter>

export const removePostFromPublication = async (post: Post, router: Router) => {
	if (!post || post._status !== 'published') {
		toast.error('Пост уже не опубликован', { icon: '❌' })
		return
	}

	const postData = {
		...post,
		_status: 'draft',
		hasDeleted: post.hasDeleted ?? false
	}

	try {
		const response = await fetch(`/api/posts/${post.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postData)
		})

		if (response.ok) {
			toast.success('Пост снят с публикации', { icon: '✅' })
			router.refresh()
		} else {
			toast.error('Ошибка при снятии с публикации', { icon: '❌' })
		}
	} catch (error) {
		toast.error('Ошибка при отправке запроса', { icon: '❌' })
	}
}

export const deletePost = async (post: Post, router: Router) => {
	if (!post) {
		toast.error('Пост не найден', { icon: '❌' })
		return
	}

	const postData = {
		...post,
		hasDeleted: true
	}

	try {
		const response = await fetch(`/api/posts/${post.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postData)
		})

		if (response.ok) {
			toast.success('Пост успешно удален', { icon: '✅' })
			router.refresh()
		} else {
			toast.error('Ошибка при удалении поста', { icon: '❌' })
		}
	} catch (error) {
		toast.error('Ошибка при отправке запроса', { icon: '❌' })
	}
}

export const restorePost = async (post: Post, router: Router) => {
	if (!post || !post.hasDeleted) {
		toast.error('Пост не удален', { icon: '❌' })
		return
	}

	const postData = {
		...post,
		hasDeleted: false
	}

	try {
		const response = await fetch(`/api/posts/${post.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postData)
		})

		if (response.ok) {
			toast.success('Пост успешно восстановлен', { icon: '✅' })
			router.refresh()
		} else {
			toast.error('Ошибка при восстановлении поста', { icon: '❌' })
		}
	} catch (error) {
		toast.error('Ошибка при отправке запроса', { icon: '❌' })
	}
}
