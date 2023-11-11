import {
	BellRing,
	BookMarked,
	Component,
	Flame,
	MessagesSquare,
	User2
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.scss'

export default function Header() {
	return (
		<>
			<header className={styles.Header}>
				<div className={styles.HeaderContainer}>
					<div className={styles.Left}>
						<Link href='/'>
							<Image
								className={styles.Logo}
								src='../../logo/logo.svg'
								priority
								alt='logo'
								width={40}
								height={50}
							/>
						</Link>
					</div>

					<div className={styles.Center}>
						<Link href='/wiki'>
							<BookMarked />
						</Link>
						<Link href='/groups'>
							<Component />
						</Link>
						<Link href='/users'>
							<User2 />
						</Link>
						<Link href='/community'>
							<MessagesSquare />
						</Link>
						<Link href='/about'>
							<Flame />
						</Link>
					</div>

					<div className={styles.Right}>
						<button className={styles.CreatePost}>Новый пост</button>

						<a
							href='/notifications'
							className={styles.notifications_link}
							aria-label='Уведомления'
						>
							<BellRing />
							<span className={styles.notifications_number}>8</span>
						</a>

						<div className={styles.Avatar}>
							<div className={styles.AvatarInner}>
								<div className={styles.AvatarFrame}>
									{/* <Image
										src='../../social/avatar.svg'
										priority
										alt='avatar'
										width={50}
										height={50}
									/> */}
								</div>
							</div>
							<div className={styles.UserMenuDropdown}></div>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}
