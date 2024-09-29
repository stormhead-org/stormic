import type { Comment } from '@/shared/components/comments/comment-full-post-group';
import { FormTextarea } from '@/shared/components/form';
import { cn } from '@/shared/lib/utils';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

interface Props {
	postId?: number;
	parentCommentId?: number;
	className?: string;
	onCommentAdded?: (newComment: Comment) => void;
}

export const CommentInputAnswerForm: React.FC<Props> = ({ postId, parentCommentId, className, onCommentAdded }) => {
	const { formatMessage } = useIntl();
	const [newComment, setNewComment] = useState('');
	
	const handleAddComment = async () => {
		if (!newComment.trim()) return;
		
		const response = await fetch(`/api/posts/${postId}/comments/post`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				content: newComment,
				post_id: postId,
				parent_comment_id: parentCommentId,
			}),
		});
		
		if (response.ok) {
			const addedComment: Comment = await response.json();
			setNewComment(''); // Очищаем поле ввода
			onCommentAdded && onCommentAdded(addedComment);
		} else {
			console.error('Не удалось добавить комментарий');
		}
	};
	
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleAddComment();
		}
	};
	
	return (
		<div className={cn('', className)}>
			<FormTextarea
				name='comment'
				className='text-base mt-2'
				value={newComment}
				onChange={(e) => setNewComment(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder={formatMessage({ id: 'commentInputForm.textareaPlaceholder' })}
				rows={5}
				sideButton={true}
				onClickValue={handleAddComment}
			/>
		</div>
	);
};
