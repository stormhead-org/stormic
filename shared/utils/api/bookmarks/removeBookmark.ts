import { User } from '@/payload-types'
import { sendBookmarkAddMessage, sendPostLikeMessage } from '@/shared/lib/rabbitmq-client'
import { PayloadRequest } from 'payload'

interface Result {
	success: boolean
}

export const removeBookmark = async (req: PayloadRequest): Promise<Result> => {
	if (!req.user) {
		throw new Error('Unauthorized')
	}

	// Проверяем наличие routeParams и id
	if (!req.routeParams || !req.routeParams.id) {
		throw new Error('Post ID is required in path')
	}

	// ID поста, который удаляем из закладок, из пути
	const postIdParam = req.routeParams.id as string // Приводим unknown к string
	const postId = parseInt(postIdParam, 10)

	// Проверяем валидность postId
	if (isNaN(postId)) {
		throw new Error('Valid postId is required')
	}

	// ID текущего пользователя из req.user
	const userId = (req.user as User).id
	
	await sendBookmarkAddMessage({ action: 'delete', postId, userId })

	return { success: true }
}
