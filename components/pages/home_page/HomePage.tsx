import Banner from '../../ui/main_banner/Banner'
import Post from '../../ui/post/post_body/Post'
import TrendSwitch from '../../ui/trend_switch/TrendSwitch'
import styles from './HomePage.module.scss'

export default function HomePage() {
	return (
		<>
			<div className={styles.Container}>
				<Banner />
				<TrendSwitch />
				<Post />
				<Post />
			</div>
		</>
	)
}
