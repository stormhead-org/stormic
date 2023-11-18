'use client'

import {
	Atom,
	BookmarkCheck,
	CheckCheck,
	Dot,
	Facebook,
	Flame,
	Github,
	Instagram,
	Twitch,
	Twitter,
	Zap
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styles from './LeftSidebar.module.scss'

const LeftSideMenu = [
	{ text: 'Популярное', icon: <Zap size={22} />, path: '/' },
	{
		text: 'Свежее',
		icon: <Flame size={22} />,
		path: '/new',
		dot: <Dot size={32} />
	},
	{ text: 'Моя лента', icon: <CheckCheck size={22} />, path: '/my' },
	{ text: 'Закладки', icon: <BookmarkCheck size={22} />, path: '/bookmarks' }
]

const LeftSocialMenu = [
	{ icon: <Twitter size={24} />, path: '/' },
	{ icon: <Facebook size={24} />, path: '/' },
	{ icon: <Github size={24} />, path: '/' },
	{ icon: <Instagram size={24} />, path: '/' },
	{ icon: <Twitch size={24} />, path: '/' },
	{ icon: <Atom size={24} />, path: '/' }
]

export default function LeftSideBar() {
	const router = useRouter()
	const pathname = usePathname()

	const handleClick = (link: string) => {
		router.push(link)
	}

	return (
		<>
			<div className={styles.LeftSidebar}>
				<div className={styles.MenuBlock}>
					<ul>
						{LeftSideMenu.map(obj => (
							<li
								key={obj.path}
								className={`${styles.MenuBlockItem} ${
									pathname === obj.path ? `${styles.activeItemMenu}` : ''
								}`}
								onClick={() => {
									handleClick(obj.path)
								}}
							>
								<div className={styles.IconItemMenu}>{obj.icon}</div>
								<Link href={obj.path}>{obj.text}</Link>
								<div className={styles.IconItemMenuDot}>{obj.dot}</div>
							</li>
						))}
					</ul>
				</div>
				<div className={styles.SocialBlock}>
					{LeftSocialMenu.map(obj => (
						<div
							key={obj.path}
							onClick={() => {
								handleClick(obj.path)
							}}
						>
							<div className={styles.IconItemSocialMenu}>{obj.icon}</div>
							<Link href={obj.path}></Link>
						</div>
					))}
				</div>
				<div className={styles.CreatePost}>
					<button type='button' onClick={() => router.push('/write')}>
						Новый пост
					</button>
				</div>
			</div>
		</>
	)
}
