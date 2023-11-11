import { Bookmark } from 'fluent-emoji'
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
				<div className={styles.SidebarFrame}>
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
					<div className={styles.MenuBlock}>
						<div className={styles.MenuFrame}>
							<div className={styles.LeftSideDiv}>
								<div className={styles.Icon}>
									<Bookmark width={24} />
								</div>
								<button className={styles.LeftSideButton}>
									<Link href='/#'>Видео</Link>
								</button>
							</div>
							<div className={styles.LeftSideDiv}>
								<div className={styles.Icon}>
									<Bookmark width={24} />
								</div>
								<button className={styles.LeftSideButton}>
									<Link href='/#'>Подкасты</Link>
								</button>
							</div>
							<div className={styles.LeftSideDiv}>
								<div className={styles.Icon}>
									<Bookmark width={24} />
								</div>
								<button className={styles.LeftSideButton}>
									<Link href='/#'>Контакты</Link>
								</button>
							</div>
							<div className={styles.LeftSideDiv}>
								<div className={styles.Icon}>
									<Bookmark width={24} />
								</div>
								<button className={styles.LeftSideButton}>
									<Link href='/#'>FAQ</Link>
								</button>
							</div>
						</div>
					</div>
					<div className={styles.AboutContainer}>
						<div className={styles.ShortAbout}>
							<p>
								<a href='https://mustel.ru'>Mustel</a> - платформа для
								разработчиков программного обеспечения. С Вами на каждом этапе
								Вашего пути.
								<br />
								<br />
								Построена на базе{' '}
								<a href='https://github.com/nimscore/mustel'>Mustel</a> -
								программного обеспечения с открытым исходным кодом, на котором
								базируется <a href='https://mustel.ru'>Mustel</a> и другие
								сообщества.
								<br />
								<br />
								Сделано с любовью и <a href='https://nextjs.org'>NextJS</a>.
								<br />
								Сообщество Mustel © 2023 - 2024.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
