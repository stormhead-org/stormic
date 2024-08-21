import { prisma } from '@/prisma/prisma-client'
import { Container } from '@/shared/components'
import { FullPostPage } from '@/shared/components/posts/full-post-page'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Stormic Community'
}

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
		
		<FullPostPage postId={String(postId)} />
	)
}
