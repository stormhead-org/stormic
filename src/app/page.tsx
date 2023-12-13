import MainBanner from '../components/ui/banners/main_banner/MainBanner'
import MainLayout from '../components/ui/custom_layouts/main_layout/MainLayout'
import Post from '../components/ui/post/Post'
import TrendSwitch from '../components/ui/trend_switch/TrendSwitch'
import styles from './root_module/HomePage.module.scss'

export default function Home() {
	return (
		<>
			<MainLayout>
				<div className={styles.PageFrame}>
					<MainBanner />
					<TrendSwitch />
					<Post />
				</div>
			</MainLayout>
		</>
	)
}
