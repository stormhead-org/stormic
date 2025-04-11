import { User } from '@/payload-types'
import { sendCommentLikeMessage } from '@/shared/lib/rabbitmq-client'
import { PayloadRequest } from 'payload'

interface Result {
	success: boolean
}

export const unlikeComment = async (req: PayloadRequest): Promise<Result> => {
	if (!req.user) {
		throw new Error('Unauthorized')
	}

	// Проверяем наличие routeParams и id
	if (!req.routeParams || !req.routeParams.id) {
		throw new Error('Comment ID is required in path')
	}

	// ID comment, который анлайкаем, из пути
	const commentIdParam = req.routeParams.id as string // Приводим unknown к string
	const commentId = parseInt(commentIdParam, 10)

	// Проверяем валидность postId
	if (isNaN(commentId)) {
		throw new Error('Valid postId is required')
	}

	// ID текущего пользователя из req.user
	const userId = (req.user as User).id

	await sendCommentLikeMessage({ action: 'unlike', commentId, userId })

	return { success: true }
}
