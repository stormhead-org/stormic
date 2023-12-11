import Image from 'next/image'
import Link from 'next/link'
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
	const PostTitle = post.title
	const PostTitleLength =
		PostTitle.length > 24 ? PostTitle.slice(0, 24) + '...' : PostTitle
	return (
		<>
			<div className={styles.LiveCommentItem}>
				<div className={styles.CommentTopBar}>
					<div className={styles.LeftSideBar}>
						<div className={styles.Avatar}>
							<div className={styles.AvatarInner}>
								<Link href={`/u/${user.fullname}`}>
									<Image
										className={styles.AvatarImg}
										src={user.avatarUrl}
										alt='UserAvatar'
										width={34}
										height={34}
									/>
								</Link>
							</div>
							<div className={styles.UserMenuDropdown}></div>
						</div>
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
						<Link className={styles.CommentLocate} href={`/p/${post.title}`}>
							<span className={styles.postTitle}> {PostTitleLength} </span>
						</Link>
					</div>
				</div>
				<div className={styles.CommentContent}>
					<Link
						className={styles.CommentTxtContent}
						href={`/p/${post.title}/comment#${id}`}
					>
						{text}
					</Link>
				</div>
			</div>
		</>
	)
}

export default LiveCommentItem
