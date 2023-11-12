import { Bookmark } from 'fluent-emoji'
import Link from 'next/link'
import styles from './NavMenu.module.scss'

export default function NavBar() {
	return (
		<>
			<div className={styles.NavBar}>
				<div className={styles.NavBarFrame}>
					<div className={styles.MenuBlock}>
						<div className={styles.MenuFrame}>
							<div className={styles.LeftSideDiv}>
								<div className={styles.Icon}>
									<Bookmark width={24} />
								</div>
								<button className={styles.LeftSideButton}>
									<Link href='/#'>Self-Host</Link>
								</button>
							</div>
							<div className={styles.LeftSideDiv}>
								<div className={styles.Icon}>
									<Bookmark width={24} />
								</div>
								<button className={styles.LeftSideButton}>
									<Link href='/#'>Mustel Admin Doc</Link>
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
			</div>
		</>
	)
}
