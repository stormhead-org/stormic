import { prisma } from '@/prisma/prisma-client'
import { Container } from '@/shared/components'

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
			<Container className='flex flex-col my-10'>
				<p>Пользователь не найден</p>
			</Container>
		)
	}
	
	return (
		<Container className='flex flex-col my-10'>
			<p>User ID: {user.id}</p>
			<p>Full Name: {user.fullName}</p>
			<p>Email: {user.email}</p>
		</Container>
	)
}
