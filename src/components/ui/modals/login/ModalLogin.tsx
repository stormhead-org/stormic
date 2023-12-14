'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import ModalLoginData from '../../../../../data.js'
import styles from './ModalLogin.module.scss'

export default function ModalLogin() {
	const ModalLoginSrc = ModalLoginData
	const searchParams = useSearchParams()
	const dialogRef = useRef<null | HTMLDialogElement>(null)
	const showDialog = searchParams.get('modal')

	useEffect(() => {
		if (showDialog === 'auth') {
			dialogRef.current?.showModal()
		}
	}, [showDialog])

	const dialog: JSX.Element | null =
		showDialog === 'auth' ? (
			<dialog ref={dialogRef} className={styles.Modal}>
				<div className={styles.ModalLogin}>
					<div className={styles.FrameLeft}>
						{ModalLoginSrc.environment.media.project.map(obj => (
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
					</div>
					<div className={styles.FrameRight}></div>
				</div>
			</dialog>
		) : null

	return dialog
}
