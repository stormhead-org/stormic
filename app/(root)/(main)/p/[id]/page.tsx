import { prisma } from '@/prisma/prisma-client'
import { PostNotFound } from '@/shared/components/info-blocks/post-not-found'
import { FullPostPage } from '@/shared/components/posts/full-post-page'
import { getUserSession } from '@/shared/lib'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Stormic Community'
}

export default async function PostPage({ params: { id } }: {
	params: { id: string }
}) {
	
	const session = await getUserSession()
	
	const currentUser = session && await prisma.user.findFirst({ where: { id: Number(session?.id) } })
	
	// Ищем пост по id
	const post = await prisma.post.findUnique({
		where: { post_id: Number(id) }
	})
	
	// Проверяем, найдена ли публикация
	if (!post) {
		return <PostNotFound />
	}
	
	return (
		<div className='flex flex-col h-[91vh] overflow-auto no-scrollbar rounded-md'>
			<FullPostPage postId={Number(id)} currentUser={currentUser} />
		</div>
	)
}
