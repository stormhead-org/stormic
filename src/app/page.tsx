import HomePage from '../../components/pages/HomePage'
import MainLayout from '../../components/ui/MainLayout/MainLayout'
import Layout from './layout'
import styles from './layout.module.scss'

export default function Home() {
	return (
		<Layout>
			<MainLayout>
				<div className={styles.MainPage}>
					<HomePage />
				</div>
			</MainLayout>
		</Layout>
	)
}
