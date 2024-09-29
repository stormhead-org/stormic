import { prisma } from '@/prisma/prisma-client';
import { format } from 'date-fns';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { postId: string } }) {
	const { postId } = params;
	
	const comments = await prisma.comment.findMany({
		where: {
			post_id: Number(postId)
		},
		include: {
			author: {
				select: {
					fullName: true,
					profile_picture: true
				}
			},
			post: {
				select: {
					title: true
				}
			},
			likes: true // Включаем лайки для каждого комментария
		}
	});
	
	// Создаем словарь для быстрого доступа к комментариям по id
	const commentMap = new Map<number, any>();
	
	// Преобразуем плоский список комментариев в иерархическую структуру
	comments.forEach(comment => {
		commentMap.set(comment.comment_id, {
			comment_id: comment.comment_id,
			content: comment.content,
			publication_date: format(new Date(comment.publication_date), 'dd.MM.yy'),
			update_date: comment.update_date ? format(new Date(comment.update_date), 'dd.MM.yy') : null,
			post_id: comment.post_id,
			post_title: comment.post?.title,
			author_id: comment.author_id,
			author_fullName: comment.author.fullName,
			author_profile_picture: comment.author.profile_picture,
			parent_comment_id: comment.parent_comment_id,
			likes_count: comment.likes.length, // Количество лайков
			children: []  // Изначально дети пустые
		});
	});
	
	// Заполняем детей для каждого комментария
	commentMap.forEach(comment => {
		if (comment.parent_comment_id) {
			const parentComment = commentMap.get(comment.parent_comment_id);
			if (parentComment) {
				parentComment.children.push(comment);
			}
		}
	});
	
	// Получаем корневые комментарии (те, у которых нет родителя)
	const rootComments = Array.from(commentMap.values()).filter(comment => !comment.parent_comment_id);
	
	return NextResponse.json(rootComments);
}
