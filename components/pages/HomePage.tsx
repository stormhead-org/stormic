import Header from '../ui/header/Header'
import NavBar from '../ui/left_nav_bar/NavBar'
import LeftSidebar from '../ui/left_sidebar/LeftSidebar'
import Banner from '../ui/main_banner/Banner'
import TrendSwitch from '../ui/trend_switch/TrendSwitch'
import styles from './HomePage.module.scss'

export default function HomePage() {
	return (
		<>
			<Header />
			<div className={styles.Container}>
				<div className={styles.MainContainer}>
					<div className={styles.LeftSide}>
						<NavBar />
						<LeftSidebar />
					</div>

					<div className={styles.CenterBlock}>
						<Banner />
						<TrendSwitch />
					</div>

					<div className={styles.RightSide}>
						<p>Сейчас обсуждают</p>
					</div>
				</div>
			</div>
		</>
	)
}
