import { User } from '@/payload-types'
import { sendCommunityFollowMessage } from '@/shared/lib/rabbitmq-client'
import { PayloadRequest } from 'payload'

interface Result {
	success: boolean
}

export const followCommunity = async (req: PayloadRequest): Promise<Result> => {
	if (!req.user) {
		throw new Error('Unauthorized')
	}

	// Проверяем наличие routeParams и id
	if (!req.routeParams || !req.routeParams.id) {
		throw new Error('Post ID is required in path')
	}

	// ID сообщества, от которого отписываемся, из пути
	const communityIdParam = req.routeParams.id as string // Приводим unknown к string
	const communityId = parseInt(communityIdParam, 10)

	// Проверяем валидность postId
	if (isNaN(communityId)) {
		throw new Error('Valid postId is required')
	}

	// ID текущего пользователя из req.user
	const userId = (req.user as User).id

	await sendCommunityFollowMessage({ action: 'follow', communityId, userId })

	return { success: true }
}
