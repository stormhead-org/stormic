import Link from 'next/link'
import Avatar from '../../avatar/Avatar'
import styles from './LiveCommentItem.module.scss'

interface CommentItemProps {
	id: number
	user: {
		id: number
		fullname: string
		avatarUrl: string
	}
	text: string
	post: {
		id: number
		title: string
	}
}

export const LiveCommentItem: React.FC<CommentItemProps> = ({
	id,
	user,
	text,
	post
}) => {
	return (
		<>
			<div className={styles.LiveCommentItem}>
				<div className={styles.CommentTopBar}>
					<div className={styles.LeftSideBar}>
						<Avatar />
					</div>
					<div className={styles.RightSideBar}>
						<div className={styles.TopBarAuthor}>
							<Link
								className={styles.CommentAuthorLink}
								href={`/u/${user.fullname}`}
							>
								<b>{user.fullname}</b>
							</Link>
							<p>в посте</p>
						</div>
						<Link className={styles.CommentLocate} href={`/${post.id}`}>
							<span className={styles.postTitle}>{post.title}</span>
						</Link>
					</div>
				</div>
				<div className={styles.CommentContent}>
					<Link className={styles.CommentTxtContent} href={`/${id}`}>
						{text}
					</Link>
				</div>
			</div>
		</>
	)
}

export default LiveCommentItem
