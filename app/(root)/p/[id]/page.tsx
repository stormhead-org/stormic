import { prisma } from '@/prisma/prisma-client'
import { Container } from '@/shared/components'

export default async function PostPage({
	                                       params: { id }
                                       }: {
	params: { id: string }
}) {
	// Преобразуем id в число
	const postId = Number(id)
	
	// Ищем пост по id
	const post = await prisma.post.findUnique({
		where: { post_id: postId }
	})
	
	// Проверяем, найдена ли публикация
	if (!post) {
		return (
			<Container className='flex flex-col my-10'>
				<p>Публикация не найдена</p>
			</Container>
		)
	}
	
	return (
		<>
			<img src={String(post.post_image)} alt='PostLogo' />
			<p>Название поста: {post.title}</p>
			<p>Содержание поста: {post.content}</p>
		</>
	)
}
