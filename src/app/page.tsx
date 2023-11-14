import MainLayout from '../components/ui/custom_layouts/main_layout/MainLayout'
import Banner from '../components/ui/main_banner/Banner'
import Post from '../components/ui/post/post_body/Post'
import TrendSwitch from '../components/ui/trend_switch/TrendSwitch'
import Layout from './layout'
import styles from './system_module/HomePage.module.scss'

export default function Home() {
	return (
		<>
			<Layout>
				<MainLayout>
					<div className={styles.PageFrame}>
						<Banner />
						<TrendSwitch />
						<Post />
						<Post />
					</div>
				</MainLayout>
			</Layout>
		</>
	)
}
