import {
	Atom,
	Facebook,
	Github,
	Instagram,
	Twitch,
	Twitter
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './LeftSidebar.module.scss'

export default function LeftSidebar() {
	return (
		<>
			<div className={styles.LeftSidebar}>
				<div className={styles.LeftSidebarFrame}>
					<div className={styles.LeftSideDiv}>
						<div className={styles.Icon}>
							{/* <Zap size={20} /> */}
							<Image
								src='../../../icons/zap.svg'
								alt='Популярное'
								height={24}
								width={24}
							/>
						</div>
						<button className={styles.LeftSideButton}>
							<Link href='/#'>Популярное</Link>
						</button>
					</div>

					<div className={styles.LeftSideDiv}>
						<div className={styles.Icon}>
							<Image
								src='../../../icons/fire.svg'
								alt='Свежее'
								height={24}
								width={24}
							/>
						</div>
						<button className={styles.LeftSideButton}>
							<Link href='/#'>Свежее</Link>
						</button>
						<div className={styles.IconDot}>
							<Image
								src='../../../icons/dot.svg'
								alt='Уведомление поста'
								height={12}
								width={12}
							/>
						</div>
					</div>

					<div className={styles.LeftSideDiv}>
						<div className={styles.Icon}>
							<Image
								src='../../../icons/bookmark.svg'
								alt='Избранное'
								height={24}
								width={24}
							/>
						</div>
						<button className={styles.LeftSideButton}>
							<Link href='/#'>Избранное</Link>
						</button>
					</div>

					<div className={styles.LeftSideDiv}>
						<div className={styles.Icon}>
							<Image
								src='../../../icons/rocket.svg'
								alt='Мои сообщества'
								height={24}
								width={24}
							/>
						</div>
						<button className={styles.LeftSideButton}>
							<Link href='/#'>Мои сообщества</Link>
						</button>
					</div>

					<div className={styles.SocialBlock}>
						<div className={styles.SocialFrame}>
							<div className={styles.ItemSocial}>
								<Twitter size={24} />
							</div>
							<div className={styles.ItemSocial}>
								<Facebook size={24} />
							</div>
							<div className={styles.ItemSocial}>
								<Github size={24} />
							</div>
							<div className={styles.ItemSocial}>
								<Instagram size={24} />
							</div>
							<div className={styles.ItemSocial}>
								<Twitch size={24} />
							</div>
							<div className={styles.ItemSocial}>
								<Atom size={24} />
							</div>
						</div>
					</div>
					<div className={styles.CreatePost}>
						<button className={styles.CreatePostButton}>Новый пост</button>
					</div>
				</div>
			</div>
		</>
	)
}
