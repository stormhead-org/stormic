import { Bookmark, Fire, HighVoltage, RedCircle, Rocket } from 'fluent-emoji'
import {
	Atom,
	Facebook,
	Github,
	Instagram,
	Twitch,
	Twitter
} from 'lucide-react'
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
							<HighVoltage width={24} />
						</div>
						<button className={styles.LeftSideButton}>
							<Link href='/#'>Популярное</Link>
						</button>
					</div>

					<div className={styles.LeftSideDiv}>
						<div className={styles.Icon}>
							<Fire width={24} />
						</div>
						<button className={styles.LeftSideButton}>
							<Link href='/#'>Свежее</Link>
						</button>
						<div className={styles.IconDot}>
							<RedCircle width={12} />
						</div>
					</div>

					<div className={styles.LeftSideDiv}>
						<div className={styles.Icon}>
							<Bookmark width={24} />
						</div>
						<button className={styles.LeftSideButton}>
							<Link href='/#'>Избранное</Link>
						</button>
					</div>

					<div className={styles.LeftSideDiv}>
						<div className={styles.Icon}>
							<Rocket width={24} />
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
