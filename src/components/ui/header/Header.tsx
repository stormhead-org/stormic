'use client'

import Image from 'next/image'
import Link from 'next/link'
import SiteLogoData from '../../../../data.js'
import { useAppSelector } from '../../../../redux/hooks'
import { selectUserData } from '../../../../redux/slices/user'
import Avatar from '../avatar/Avatar'
import LoginButton from '../login_button/LoginButton'
import ModalLogin from '../modals/login/ModalLogin'
import ThemeSwitch from '../theme_switch/ThemeSwitch'
import styles from './Header.module.scss'

export const Header: React.FC = () => {
	const userData = useAppSelector(selectUserData)
	const SiteLogoSrc = SiteLogoData
	return (
		<>
			<div className={styles.Header}>
				<ModalLogin />
				<div className={styles.HeaderContainer}>
					<div className={styles.Left}>
						<Link href='/' aria-label='Home'>
							{SiteLogoSrc.environment.media.project.map(obj => (
								<div key={obj.selfproject.sitelogo}>
									<Image
										className={styles.Logo}
										src={obj.selfproject.sitelogo}
										priority
										alt='SiteLogo'
										width={44}
										height={44}
										style={{ objectFit: 'contain' }}
									/>
								</div>
							))}
						</Link>
					</div>

					<div className={styles.Center}>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/wiki' aria-label='Руководства'>
								<Image
									src='../../../icons/page.svg'
									alt='Руководства'
									height={24}
									width={24}
								/>
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/groups' aria-label='Сообщества'>
								<Image
									src='../../../icons/rocket.svg'
									alt='Сообщества'
									height={24}
									width={24}
								/>
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/users' aria-label='Участники'>
								<Image
									src='../../../icons/peace.svg'
									alt='Участники'
									height={24}
									width={24}
								/>
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/community' aria-label='Общение'>
								<Image
									src='../../../icons/megaphone.svg'
									alt='общение'
									height={24}
									width={24}
								/>
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/about' aria-label='О Нас'>
								<Image
									src='../../../icons/bulb.svg'
									alt='О Нас'
									height={24}
									width={24}
								/>
							</Link>
						</div>
					</div>

					<div className={styles.Right}>
						<ThemeSwitch />
						{userData ? <Avatar /> : <LoginButton />}
						{/* <NotificationsBell /> */}
						{/* <Avatar /> */}
					</div>
				</div>
			</div>
		</>
	)
}

export default Header
