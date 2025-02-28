import { User } from '@/payload-types'
import { sendFollowMessage } from '@/shared/lib/rabbitmq-client'
import { PayloadRequest } from 'payload'

interface Result {
	success: boolean
}

export const followUser = async (req: PayloadRequest): Promise<Result> => {
	if (!req.user) {
		throw new Error('Unauthorized')
	}

	// Проверяем наличие routeParams и id
	if (!req.routeParams || !req.routeParams.id) {
		throw new Error('User ID is required in path')
	}

	// ID пользователя, на которого подписываемся, из пути
	const followingId = req.routeParams.id as string // Приводим unknown к string
	const followingIdNum = parseInt(followingId, 10)

	// Проверяем валидность followingId
	if (isNaN(followingIdNum)) {
		throw new Error('Valid followingId is required')
	}

	// ID текущего пользователя из req.user
	const followerId = (req.user as User).id

	await sendFollowMessage({
		action: 'follow',
		followerId,
		followingId: followingIdNum
	})

	return { success: true }
}
