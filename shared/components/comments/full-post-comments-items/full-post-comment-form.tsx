import type { Comment } from '@/shared/components/comments/comment-full-post-group';
import { CommentItem } from '@/shared/components/comments/comments-items/comment-item';
import type { User } from '@prisma/client';
import { Skeleton } from '../../ui/skeleton';

interface CommentComponentProps {
	postId: number
	comments: Comment[];
	loading?: boolean;
	onCommentAdded: (newComment: Comment) => void;
	onClickDeleteValue: (commentId: number) => void;
	hasMe?: boolean;
	user?: User | undefined;
	level?: number;
}

export const FullPostCommentForm: React.FC<CommentComponentProps> = ({ postId, comments, loading, onClickDeleteValue, onCommentAdded, user, level = 0 }) => {
	const indentation = `ml-${level * 2}`;
	
	if (loading) {
		return <Skeleton className='h-6 mb-4 rounded-[8px]' />;
	}
	
	return (
		<div className={`${indentation} mt-4`}>
			{comments.length !== 0 &&
				comments.map(comment => (
					<div key={comment.comment_id}>
						<CommentItem
							postId={postId}
							hasPost={true}
							hasMe={user?.id === Number(comment.author_id)}
							className='mt-4 p-0 pl-4 cursor-default border-l-4 border-blue-600'
							content={comment.content}
							authorName={comment.author_fullName}
							authorUrl={`/u/${comment.author_id}`}
							authorAvatar={comment.author_profile_picture}
							commentId={comment.comment_id}
							onCommentAdded={() => onCommentAdded(comment)}
							onClickDeleteValue={() => onClickDeleteValue(comment.comment_id)}
							publicationDate={comment.publication_date} />
						{comment.children && comment.children.length > 0 && (
							<FullPostCommentForm
								postId={postId}
								comments={comment.children}
								onCommentAdded={onCommentAdded}
								onClickDeleteValue={onClickDeleteValue}
								user={user}
								level={level + 1}/>
						)}
					</div>
				))
			}
		</div>
	);
};
