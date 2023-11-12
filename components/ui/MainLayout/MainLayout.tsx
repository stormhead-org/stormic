import LiveCommnets from '../LiveCommnets/LiveCommnets'
import Header from '../header/Header'
import NavBar from '../left_nav_menu/NavMenu'
import LeftSidebar from '../left_sidebar/LeftSidebar'
import styles from './MainLayout.module.scss'

export default function MainLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Header />
			<div className={styles.Container}>
				<div className={styles.MainContainer}>
					<div className={styles.LeftSide}>
						<LeftSidebar />
						<NavBar />
					</div>

					<div className={styles.CenterBlock}>{children}</div>

					<div className={styles.RightSide}>
						<LiveCommnets />
					</div>
				</div>
			</div>
		</>
	)
}
