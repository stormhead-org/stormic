import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';
import { format } from 'date-fns'

export async function GET() {
	const posts = await prisma.post.findMany({
		include: {
			author: {
				select: {
					fullName: true,
					profile_picture: true,
				},
			},
			category: {
				select: {
					category_name: true,
				}
			}
		},
	});
	
	// Новый массив постов с включением ссылки на аватар автора
	const postsWithAuthorAvatar = posts.map((post) => ({
		...post,
		publication_date: format(new Date(post.publication_date), 'dd.MM.yy'),
	}));
	
	return NextResponse.json(postsWithAuthorAvatar);
}
