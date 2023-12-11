import MainLayout from '../components/ui/custom_layouts/main_layout/MainLayout'
import Banner from '../components/ui/main_banner/Banner'
import Post from '../components/ui/post/Post'
import TrendSwitch from '../components/ui/trend_switch/TrendSwitch'
import styles from './root_module/HomePage.module.scss'

export default function Home() {
	return (
		<>
			<MainLayout>
				<div className={styles.PageFrame}>
					<Banner />
					<TrendSwitch />
					<Post />
				</div>
			</MainLayout>
		</>
	)
}
