import { ScanSearch } from 'lucide-react'
import Image from 'next/image'
import BannerData from '../../../../../data.js'
import styles from './MainBanner.module.scss'

export default function MainBanner() {
	const BannerSrc = BannerData
	return (
		<>
			{BannerSrc.environment.media.project.map(obj => (
				<div key={obj.selfProject.bannerImg} {...obj}>
					<div className={styles.BannerItem}>
						<Image
							className={styles.BannerItemFrame}
							src={obj.selfProject.bannerImg}
							alt='BannerImg'
							width={1920}
							height={1080}
							style={{ objectFit: 'cover' }}
							priority={true}
						/>

						<h1 className={styles.communityName}>
							{obj.selfProject.communityName}
						</h1>

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
				</div>
			))}
		</>
	)
}
