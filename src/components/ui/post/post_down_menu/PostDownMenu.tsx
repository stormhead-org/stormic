import { ArrowDown, Bookmark, Heart, MessageCircle, Redo2 } from 'lucide-react'
import styles from './PostDownMenu.module.scss'

export default function PostDownMenu() {
	return (
		<>
			<div className={styles.PostDownMenu}>
				<div className={styles.PostDownMenuFrame}>
					<div className={styles.DownMenuTopBar}>
						<div className={styles.View}>
							<p className={styles.ViewCount}>8.6к</p>
							<p> показов</p>
						</div>
						<div className={styles.Open}>
							<p className={styles.OpenCount}>3.5к</p>
							<p>открытий</p>
						</div>
						<div className={styles.Repost}>
							<p className={styles.RepostCount}>87</p>
							<p>репостов</p>
						</div>
					</div>
					<div className={styles.DownMenuBotBar}>
						<div className={styles.BotBarLeft}>
							<div className={styles.Likes}>
								<button className={styles.LikesButton}>
									<Heart size={20} />
								</button>
								<p className={styles.LikesCount}>2.3к</p>
							</div>

							<div className={styles.Comments}>
								<button className={styles.CommentsButton}>
									<MessageCircle size={20} />
								</button>
								<p className={styles.CommentsCount}>88</p>
							</div>

							<div className={styles.Bookmarks}>
								<button className={styles.BookmarksButton}>
									<Bookmark size={20} />
								</button>
								<p className={styles.BookmarksCount}>28</p>
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
		</>
	)
}
