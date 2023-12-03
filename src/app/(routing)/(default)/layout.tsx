import Header from '../../../components/ui/header/Header'
import NavBar from '../../../components/ui/left_nav_menu/NavMenu'
import LeftSidebar from '../../../components/ui/left_sidebar/LeftSidebar'
import LiveComments from '../../../components/ui/live_comments/LiveComments'
import styles from './layout.module.scss'

export default function MainLayout({
	children,
	hideLeftSideBar,
	hideRightSideBar,
	className
}: {
	children: React.ReactNode
	hideLeftSideBar?: boolean
	hideRightSideBar?: boolean
	className?: string
}) {
	return (
		<>
			<Header />
			<div className={`${styles.Container} ${className}`}>
				<div className={styles.MainContainer}>
					{!hideLeftSideBar && (
						<div className={styles.LeftSide}>
							<LeftSidebar />
							<NavBar />
						</div>
					)}

					<div className={styles.CenterBlock}>{children}</div>

					{!hideRightSideBar && (
						<div className={styles.RightSide}>
							<LiveComments />
						</div>
					)}
				</div>
			</div>
		</>
	)
}
