import styles from './Avatar.module.scss'

export default function Avatar() {
	return (
		<>
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
		</>
	)
}
