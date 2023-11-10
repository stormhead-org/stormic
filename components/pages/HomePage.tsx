import Header from '../ui/header/Header'
import styles from './HomePage.module.scss'

export default function HomePage() {
	return (
		<>
			<Header />
			<div className={styles.Main}>
				<p>Это мейн!</p>
			</div>
		</>
	)
}
