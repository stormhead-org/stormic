import {
	Bell,
	LightBulb,
	Megaphone,
	PageFacingUp,
	Rocket,
	VictoryHand,
	WaxingCrescentMoon
} from 'fluent-emoji'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.scss'

export default function Header() {
	return (
		<>
			<header className={styles.Header}>
				<div className={styles.HeaderContainer}>
					<div className={styles.Left}>
						<Link href='/' aria-label='Главная'>
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
						<div className={styles.ItemHeaderMenu}>
							<Link href='/wiki' aria-label='Руководства'>
								<PageFacingUp width={24} />
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/groups' aria-label='Сообщества'>
								<Rocket width={24} />
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/users' aria-label='Участники'>
								<VictoryHand width={24} />
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/community' aria-label='Общение'>
								<Megaphone width={24} />
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/about' aria-label='О Нас'>
								<LightBulb width={24} />
							</Link>
						</div>
					</div>

					<div className={styles.Right}>
						<div className={styles.ItemHeaderMenu}>
							<Link
								className={styles.ThemeSwitch}
								href='/#'
								aria-label='Темная тема'
							>
								<WaxingCrescentMoon width={24} />
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<a
								href='/notifications'
								className={styles.notifications_link}
								aria-label='Уведомления'
							>
								<Bell width={24} />
								<span className={styles.notifications_number}>8</span>
							</a>
						</div>

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
