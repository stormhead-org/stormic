import Link from 'next/link'
import Avatar from '../../avatar/Avatar'
import styles from './LiveCommentItem.module.scss'

export default function LiveCommentItem() {
	return (
		<>
			<div className={styles.LiveCommentItem}>
				<div className={styles.CommentTopBar}>
					<div className={styles.LeftSideBar}>
						<Avatar />
					</div>
					<div className={styles.RightSideBar}>
						<div className={styles.TopBarAuthor}>
							<Link className={styles.CommentAuthorLink} href='/#'>
								Nims
							</Link>
							<p>в посте</p>
						</div>
						<Link className={styles.CommentLocate} href='/#'>
							Сколько научных открытий...
						</Link>
					</div>
				</div>
				<div className={styles.CommentContent}>
					<Link className={styles.CommentTxtContent} href='/#'>
						Нолан точно гений. Однако, все еще не такой гений как Габэн!
					</Link>
				</div>
			</div>
		</>
	)
}
