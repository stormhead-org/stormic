import {
	BellRing,
	BookMarked,
	Component,
	Flame,
	MessagesSquare,
	User2
} from 'lucide-react'
import Image from 'next/image'
import styles from './Header.module.scss'

export default function Header() {
	return (
		<>
			<div className={styles.Header}>
				<div className={styles.Left}>
					<Image src='../../logo/logo.svg' alt='logo' width={45} height={50} />
				</div>

				<div className={styles.Center}></div>
				<User2 />
				<Component />
				<BookMarked />
				<MessagesSquare />
				<Flame />

				<div className={styles.Right}>
					<button className='CreatePost'>Новый пост</button>
					<BellRing />
					<Image
						src='../../../social/avatar.svg'
						alt='avatar'
						width={50}
						height={50}
					/>
				</div>
			</div>
		</>
	)
}
