import type { CollectionAfterReadHook } from 'payload'

export const userData: CollectionAfterReadHook = async ({ doc, req }) => {
	// Проверяем, есть ли `req.user`, чтобы избежать проброса данных неавторизованным пользователям
	if (!req.user) {
		// return {
		// 	id: doc.id,
		// 	name: doc.name,
		// 	userAvatar: doc.userAvatar?.url || null,
		// 	userBanner: doc.userBanner?.url || null,
		// 	userDescription: doc.userDescription || '',
		// 	createdAt: doc.createdAt,
		// }
		return doc
	}

	// Формируем объект, который будет доступен в API
	// return {
	// 	id: doc.id,
	// 	name: doc.name,
	// 	userAvatar: doc.userAvatar?.url || null,
	// 	userDescription: doc.userDescription || '',
	// 	createdAt: doc.createdAt,
	// }
	return doc
}
