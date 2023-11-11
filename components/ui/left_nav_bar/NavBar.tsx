import { Bookmark, Fire, HighVoltage, RedCircle, Rocket } from 'fluent-emoji'
import Link from 'next/link'
import styles from './NavBar.module.scss'

export default function NavBar() {
	return (
		<>
			<div className={styles.NavBarLeftSide}>
				<div className={styles.BarFrame}>
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
				</div>
			</div>
		</>
	)
}
