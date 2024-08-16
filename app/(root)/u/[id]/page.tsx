import { prisma } from '@/prisma/prisma-client'

export default async function UserPage({
	                                       params: { id }
                                       }: {
	params: { id: string }
}) {
	// Преобразуем id в число
	const userId = Number(id)
	
	// Ищем пользователя по id
	const user = await prisma.user.findUnique({
		where: { id: userId }
	})
	
	// Проверяем, найден ли пользователь
	if (!user) {
		return (
			<p>Пользователь не найден</p>
		)
	}
	
	return (
		<>
			<p>User ID: {user.id}</p>
			<p>Full Name: {user.fullName}</p>
			<p>Email: {user.email}</p>
		</>
	)
}
