import { sendPostViewMessage } from '@/shared/lib/rabbitmq-client'
import { PayloadRequest } from 'payload'

interface Result {
	success: boolean
}

export const postView = async (req: PayloadRequest): Promise<Result> => {
	// Проверяем наличие routeParams и id
	if (!req.routeParams || !req.routeParams.id) {
		throw new Error('Post ID is required in path')
	}

	const postIdParam = req.routeParams.id as string // Приводим unknown к string
	const postId = parseInt(postIdParam, 10)

	// Проверяем валидность postId
	if (isNaN(postId)) {
		throw new Error('Valid postId is required')
	}

	await sendPostViewMessage(postId)

	return { success: true }
}
