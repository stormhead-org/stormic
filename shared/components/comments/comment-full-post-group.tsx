'use client';

import { CommentInputForm } from '@/shared/components/comments/comment-input-items/comment-input-form';
import { FullPostCommentForm } from '@/shared/components/comments/full-post-comments-items/full-post-comment-form';
import { cn } from '@/shared/lib/utils';
import type { User } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

export interface Comment {
	postId: number;
	comment_id: number;
	content: string;
	author_id: number;
	author_fullName: string;
	author_profile_picture: string;
	publication_date: string;
	parent_comment_id: number | null;
	children: Comment[];
}

interface Props {
	postId: number;
	user?: User | undefined;
	commentsHeader: string;
	className?: string;
}

const socket = io('http://localhost:3001');

export const CommentFullPostGroup: React.FC<Props> = ({
	                                                      postId,
	                                                      user,
	                                                      commentsHeader,
	                                                      className,
                                                      }) => {
	const [comments, setComments] = useState<Comment[]>([]);
	
	const handleCommentAdded = (newComment: Comment) => {
		setComments((prev) => [...prev, newComment]);
	};
	
	const handleDeleteComment = async (commentId: number) => {
		const response = await fetch(`/api/posts/${postId}/comments/delete`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ commentId }),
		});
		
		if (response.ok) {
			setComments((prev) => prev.filter((comment) => comment.comment_id !== commentId));
		} else {
			console.error('Не удалось удалить комментарий');
		}
	};
	
	useEffect(() => {
		const fetchComments = async () => {
			const response = await fetch(`/api/posts/${postId}/comments`);
			const data: Comment[] = await response.json();
			setComments(data);
		};
		
		fetchComments();
		socket.emit('joinPost', postId);
		
		socket.on('newComment', (newComment: Comment) => {
			handleCommentAdded(newComment);
		});
		
		socket.on('commentDeleted', (commentId: number) => {
			setComments((prev) => prev.filter(comment => comment.comment_id !== commentId));
		});
		
		return () => {
			socket.off('newComment');
			socket.off('commentDeleted');
		};
	}, [postId]);
	
	return (
		<div className={cn('bg-secondary rounded-md p-4', className)}>
			<CommentInputForm
				commentsHeader={commentsHeader}
				postId={postId}
				onCommentAdded={handleCommentAdded}
			/>
			<FullPostCommentForm
				postId={postId}
				comments={comments}
				onClickDeleteValue={handleDeleteComment}
				user={user}
			  onCommentAdded={handleCommentAdded}/>
		</div>
	);
};
