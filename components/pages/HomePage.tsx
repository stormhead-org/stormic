import Header from '../ui/header/Header'
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
						<p>левый</p>
					</div>

					<div className={styles.CenterBlock}>
						<Banner />
						<TrendSwitch />
					</div>

					<div className={styles.RightSide}>
						<p>правый</p>
					</div>
				</div>
			</div>
		</>
	)
}
