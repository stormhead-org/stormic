'use client'

import { BookmarkCheck, CheckCheck, Flame, Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styles from './LeftSidebar.module.scss'

const LeftSideMenu = [
	{ text: 'Популярное', icon: <Zap size={22} />, path: '/' },
	{ text: 'Свежее', icon: <Flame size={22} />, path: '/new' },
	{ text: 'Моя лента', icon: <CheckCheck size={22} />, path: '/my' },
	{ text: 'Закладки', icon: <BookmarkCheck size={22} />, path: '/bookmarks' }
]

function LeftSideBar() {
	const router = useRouter()
	const pathname = usePathname()

	const handleClick = (link: string) => {
		router.push(link)
	}

	return (
		<>
			<div className={styles.LeftSideBarFrame}>
				<ul>
					{LeftSideMenu.map(obj => (
						<li
							key={obj.path}
							className={`${styles.LeftSideMenuItem} ${
								pathname === obj.path ? `${styles.activeItemMenu}` : ''
							}`}
							onClick={() => {
								handleClick(obj.path)
							}}
						>
							{obj.icon}
							<Link href={obj.path}>{obj.text}</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}

export default LeftSideBar
// export default function LeftSidebar() {
// 	return (
// 		<>
// 			<div className={styles.LeftSidebar}>
// 				<div className={styles.LeftSidebarFrame}>
// 					<div className={styles.MenuBlockItem}>
// 						<div className={styles.Icon}>
// 							<Image
// 								src='../../../icons/zap.svg'
// 								alt='Популярное'
// 								height={24}
// 								width={24}
// 							/>
// 						</div>
// 						<button className={styles.LeftSideButton}>
// 							<Link href='/#'>Популярное</Link>
// 						</button>
// 					</div>

// 					<div className={styles.MenuBlockItem}>
// 						<div className={styles.Icon}>
// 							<Image
// 								src='../../../icons/fire.svg'
// 								alt='Свежее'
// 								height={24}
// 								width={24}
// 							/>
// 						</div>
// 						<button className={styles.LeftSideButton}>
// 							<Link href='/#'>Свежее</Link>
// 						</button>
// 						<div className={styles.IconDot}>
// 							<Image
// 								src='../../../icons/dot.svg'
// 								alt='Уведомление поста'
// 								height={6}
// 								width={6}
// 							/>
// 						</div>
// 					</div>

// 					<div className={styles.MenuBlockItem}>
// 						<div className={styles.Icon}>
// 							<Image
// 								src='../../../icons/bookmark.svg'
// 								alt='Избранное'
// 								height={24}
// 								width={24}
// 							/>
// 						</div>
// 						<button className={styles.LeftSideButton}>
// 							<Link href='/#'>Избранное</Link>
// 						</button>
// 					</div>

// 					<div className={styles.MenuBlockItem}>
// 						<div className={styles.Icon}>
// 							<Image
// 								src='../../../icons/rocket.svg'
// 								alt='Мои сообщества'
// 								height={24}
// 								width={24}
// 							/>
// 						</div>
// 						<button className={styles.LeftSideButton}>
// 							<Link href='/#'>Мои сообщества</Link>
// 						</button>
// 					</div>

// 					<div className={styles.SocialBlock}>
// 						<div className={styles.SocialFrame}>
// 							<div className={styles.ItemSocial}>
// 								<Twitter size={24} />
// 							</div>
// 							<div className={styles.ItemSocial}>
// 								<Facebook size={24} />
// 							</div>
// 							<div className={styles.ItemSocial}>
// 								<Github size={24} />
// 							</div>
// 							<div className={styles.ItemSocial}>
// 								<Instagram size={24} />
// 							</div>
// 							<div className={styles.ItemSocial}>
// 								<Twitch size={24} />
// 							</div>
// 							<div className={styles.ItemSocial}>
// 								<Atom size={24} />
// 							</div>
// 						</div>
// 					</div>
// 					<div className={styles.CreatePost}>
// 						<Link className={styles.CreatePostLink} href='/write'>
// 							<button className={styles.CreatePostButton}>Новый пост</button>
// 						</Link>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	)
// }
