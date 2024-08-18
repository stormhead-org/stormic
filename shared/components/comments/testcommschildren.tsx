import React from 'react'

interface Comment {
	comment_id: number;
	content: string;
	author: {
		fullName: string;
	};
	children?: Comment[]; // Дочерние комментарии могут быть необязательными
}

interface CommentProps {
	comment: Comment;
	level?: number; // Уровень вложенности комментария
}

const CommentComponent: React.FC<CommentProps> = ({ comment, level = 0 }) => {
	const indentation = `ml-${level * 2}` // Отступ на основе уровня вложенности
	
	return (
		<div className={`${indentation} mt-2`}>
			<div>
				<strong>{comment.author.fullName}</strong>
			</div>
			<div>{comment.content}</div>
			
			{/* Отображаем дочерние комментарии, если они существуют */}
			{comment.children?.length > 0 && (
				<div className='ml-2'>
					{comment.children.map((childComment) => (
						<CommentComponent key={childComment.comment_id} comment={childComment} level={level + 1} />
					))}
				</div>
			)}
		</div>
	)
}

interface CommentListProps {
	comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
	return (
		<div>
			{comments.map((comment) => (
				<CommentComponent key={comment.comment_id} comment={comment} />
			))}
		</div>
	)
}
