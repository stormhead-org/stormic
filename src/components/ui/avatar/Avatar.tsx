import styles from './Avatar.module.scss'

interface AvatarItemProps {
	user: {
		avatarUrl: string
	}
}

export default function Avatar() {
	return (
		<>
			<div className={styles.Avatar}>
				<div className={styles.AvatarInner}>
					<div className={styles.AvatarFrame}>
						{/* <Image
							src='../../../../public/social/avatar.svg'
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
