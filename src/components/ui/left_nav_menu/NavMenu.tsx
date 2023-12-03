'use client'

import { BookmarkCheck } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styles from './NavMenu.module.scss'

const LeftSideCustomMenu = [
	{
		text: 'Self-Host',
		icon: <BookmarkCheck size={24} />,
		path: '/placeholder#1'
	},
	{
		text: 'Mustel Admin Doc',
		icon: <BookmarkCheck size={24} />,
		path: '/placeholder#2'
	},
	{
		text: 'Контакты',
		icon: <BookmarkCheck size={24} />,
		path: '/placeholder#3'
	},
	{ text: 'FAQ', icon: <BookmarkCheck size={24} />, path: '/placeholder#4' }
]

export default function NavBar() {
	const router = useRouter()
	const pathname = usePathname()

	const handleClick = (link: string) => {
		router.push(link)
	}

	return (
		<>
			<div className={styles.NavBar}>
				<div className={styles.MenuBlock}>
					<ul>
						{LeftSideCustomMenu.map(obj => (
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
							</li>
						))}
					</ul>
				</div>
				<div className={styles.AboutContainer}>
					<div className={styles.ShortAbout}>
						<p>
							<a href='https://mustel.ru'>Mustel</a> - домашняя платформа
							проекта. Место, где мы развиваем Mustel сообща.
							<br />
							<br />
							Сообщество построено на базе Mustel - программного обеспечения с{' '}
							<a href='https://github.com/nimscore/mustel'>
								открытым исходным кодом
							</a>
							, на котором базируется <a href='https://mustel.ru'>Mustel</a> и
							другие сообщества.
							<br />
							<br />
							Сделано с любовью и <a href='https://nextjs.org'>NextJS</a>.
							<br />
							Сообщество Mustel © 2023 - 2024.
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
