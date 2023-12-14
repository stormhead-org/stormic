import { ScanSearch } from 'lucide-react'
import Image from 'next/image'
import BannerData from '../../../../../data.js'
import styles from './MainBanner.module.scss'

export default function MainBanner() {
	const BannerSrc = BannerData
	return (
		<>
			<div className={styles.BannerItem}>
				{BannerSrc.environment.media.project.map(obj => (
					<div key={obj.selfproject.bannerimg}>
						<Image
							className={styles.BannerItemFrame}
							src={obj.selfproject.bannerimg}
							alt='BannerImg'
							width={1920}
							height={1080}
							style={{ objectFit: 'cover' }}
							priority={true}
						/>
					</div>
				))}
				{BannerSrc.environment.media.project.map(obj => (
					<div key={obj.selfproject.communityname}>
						<h1 className={styles.communityName}>
							{obj.selfproject.communityname}
						</h1>
					</div>
				))}
				<div className={styles.Search}>
					<div className={styles.SearchFrame}>
						<div className={styles.Icon}>
							<ScanSearch />
						</div>
						<input
							className={styles.Input}
							type='text'
							placeholder='Поиск...'
						></input>
					</div>
				</div>
			</div>
		</>
	)
}
