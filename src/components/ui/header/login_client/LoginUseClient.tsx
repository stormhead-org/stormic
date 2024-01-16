'use client'

import { useAppSelector } from '../../../../../redux/hooks'
import { selectUserData } from '../../../../../redux/slices/user'
import Avatar from '../../avatar/Avatar'
import LoginButton from '../../login_button/LoginButton'
import NotificationsBell from '../../notifications_bell/NotificationsBell'
import ThemeSwitch from '../../theme_switch/ThemeSwitch'
import styles from '../Header.module.scss'

export default function LoginUseClient() {
	const userData = useAppSelector(selectUserData)
	return (
		<>
			{userData ? (
				<div className={styles.Right}>
					<ThemeSwitch /> <NotificationsBell /> <Avatar />
				</div>
			) : (
				<LoginButton />
			)}
		</>
	)
}
