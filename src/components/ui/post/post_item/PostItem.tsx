import {
	ArrowDown,
	Bookmark,
	GripHorizontal,
	Heart,
	MessageCircle,
	Redo2
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './PostItem.module.scss'

interface PostItemProps {
	id: number
	user: {
		id: number
		fullname: string
		avatarUrl: string
	}
	title: string
	img: string
	text: string
	category: {
		id: number
		title: string
	}
	interaction: {
		views: number
		opens: number
		reposts: number
	}
	indicators: {
		likes: number
		comments: number
		bookmarks: number
	}
}

export const PostItem: React.FC<PostItemProps> = ({
	id,
	user,
	title,
	img,
	text,
	category,
	interaction,
	indicators
}) => {
	const PostText = text
	const PostTextLength =
		PostText.length > 235 ? PostText.slice(0, 235) + '...' : PostText
	return (
		<>
			<div className={styles.Post}>
				<div className={styles.PostFrame}>
					<div className={styles.PostTopBar}>
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
							</div>
						</div>
						<div className={styles.CenterBar}>
							<div>
								<Link
									className={styles.PostAuthorLink}
									href={`/u/${user.fullname}`}
								>
									<b>{user.fullname}</b>
								</Link>
							</div>
							<div className={styles.SubCenterBar}>
								<Link
									className={styles.PostCategoryLink}
									href={`/c/${category.title}`}
								>
									{category.title}
								</Link>
								<p className={styles.PostTimeCreate}>Вчера</p>
							</div>
						</div>
						<div className={styles.RightSideBar}>
							<button className={styles.Subscribe}>Подписаться</button>
							<button className={styles.Other}>
								<GripHorizontal />
							</button>
						</div>
					</div>
					<Link className={styles.PostBody} href={`/p/${title}`}>
						<div className={styles.PostContent}>
							<h3 className={styles.PostName}>{title}</h3>
							<p className={styles.PostTxtPreview}>{PostTextLength}</p>
						</div>
						<Image
							className={styles.PostImgPreview}
							src={img}
							alt='PostPreview'
							width={1920}
							height={1080}
							style={{ objectFit: 'cover' }}
						/>
					</Link>
				</div>

				<div className={styles.PostDownMenu}>
					<div className={styles.PostDownMenuFrame}>
						<div className={styles.DownMenuTopBar}>
							<div className={styles.View}>
								<p className={styles.ViewCount}>{interaction.views}</p>
								<p> показов</p>
							</div>
							<div className={styles.Open}>
								<p className={styles.OpenCount}>{interaction.opens}</p>
								<p>открытий</p>
							</div>
							<div className={styles.Repost}>
								<p className={styles.RepostCount}>{interaction.reposts}</p>
								<p>репостов</p>
							</div>
						</div>
						<div className={styles.DownMenuBotBar}>
							<div className={styles.BotBarLeft}>
								<div className={styles.Likes}>
									<button className={styles.LikesButton}>
										<Heart size={20} />
									</button>
									<p className={styles.LikesCount}>{indicators.likes}</p>
								</div>

								<div className={styles.Comments}>
									<button className={styles.CommentsButton}>
										<MessageCircle size={20} />
									</button>
									<p className={styles.CommentsCount}>{indicators.comments}</p>
								</div>

								<div className={styles.Bookmarks}>
									<button className={styles.BookmarksButton}>
										<Bookmark size={20} />
									</button>
									<p className={styles.BookmarksCount}>
										{indicators.bookmarks}
									</p>
								</div>

								<button className={styles.ShareButton}>
									<Redo2 size={20} />
								</button>
							</div>
							<div className={styles.BotBarRight}>
								<button className={styles.DownButton}>
									<ArrowDown size={20} />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default PostItem
